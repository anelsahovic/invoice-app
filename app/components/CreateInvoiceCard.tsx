'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, CircleArrowLeft } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { userProps } from '../types/types';
import { createInvoice } from '../actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { invoiceSchema } from '../utils/zodSchemas';
import Link from 'next/link';
import { formatCurrency } from '../utils/helperFunctions';
import SubmitButton from './SubmitButtons';

interface Props {
  userData: userProps;
}

export default function CreateInvoiceCard({ userData }: Props) {
  const [lastResult, action] = useActionState(createInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rate, setRate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal((Number(quantity) || 0) * (Number(rate) || 0));
  }, [rate, quantity]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6 space-y-6">
        <form
          id={form.id}
          action={action}
          onSubmit={form.onSubmit}
          noValidate
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <Link href="/dashboard/invoices">
              <CircleArrowLeft />
            </Link>
            <p className="text-slate-500">{new Date().toLocaleDateString()}</p>
          </div>

          <div>
            <CardTitle className="text-2xl text-center capitalize">
              Create a new invoice
            </CardTitle>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label>Invoice No.</Label>
              <div className="flex">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                  #
                </span>
                <Input
                  className="rounded-l-none"
                  placeholder="4"
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={fields.invoiceNumber.initialValue}
                />
              </div>
              <p className="text-sm text-rose-500">
                {fields.invoiceNumber.errors}
              </p>
            </div>

            <div>
              <Label>Name</Label>
              <Input
                placeholder="Invoice name"
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={fields.invoiceName.initialValue}
              />
              <p className="text-sm text-rose-500">
                {fields.invoiceName.errors}
              </p>
            </div>

            <div>
              <Label>Currency</Label>
              <Select
                name={fields.currency.name}
                key={fields.currency.key}
                value={currency}
                onValueChange={setCurrency}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">$ USD</SelectItem>
                  <SelectItem value="eur">€ EURO</SelectItem>
                  <SelectItem value="yen">¥ YEN</SelectItem>
                  <SelectItem value="inr">₹ RUPEE</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-rose-500">{fields.currency.errors}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>From</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Your Name"
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  defaultValue={`${userData.firstName} ${userData.lastName}`}
                />
                <p className="text-sm text-rose-500">
                  {fields.fromName.errors}
                </p>
                <Input
                  placeholder="Your Email"
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  defaultValue={userData.email || ''}
                />
                <p className="text-sm text-rose-500">
                  {fields.fromEmail.errors}
                </p>
                <Input
                  placeholder="Your Address"
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  defaultValue={userData.address || ''}
                />
                <p className="text-sm text-rose-500">
                  {fields.fromAddress.errors}
                </p>
              </div>
            </div>
            <div>
              <Label>To</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Recipient Name"
                  name={fields.recipientName.name}
                  key={fields.recipientName.key}
                  defaultValue={fields.recipientName.initialValue}
                />
                <p className="text-sm text-rose-500">
                  {fields.recipientName.errors}
                </p>
                <Input
                  placeholder="Recipient Email"
                  name={fields.recipientEmail.name}
                  key={fields.recipientEmail.key}
                  defaultValue={fields.recipientEmail.initialValue}
                />
                <p className="text-sm text-rose-500">
                  {fields.recipientEmail.errors}
                </p>
                <Input
                  placeholder="Recipient Address"
                  name={fields.recipientAddress.name}
                  key={fields.recipientAddress.key}
                  defaultValue={fields.recipientAddress.initialValue}
                />
                <p className="text-sm text-rose-500">
                  {fields.recipientAddress.errors}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div>
                <Label>Date</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[280px] lg:w-[280px] md:w-[100%] justify-start text-left"
                  >
                    <CalendarIcon />
                    {selectedDate
                      ? `${selectedDate.toLocaleDateString()}`
                      : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    mode="single"
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                name={fields.date.name}
                key={fields.date.key}
                value={selectedDate.toISOString()}
              />
              <p className="text-sm text-rose-500">{fields.date.errors}</p>
            </div>

            <div>
              <Label>Invoice due</Label>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={fields.dueDate.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select due date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on Receipt</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-rose-500">{fields.dueDate.errors}</p>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
              <p className="col-span-6">Description</p>
              <p className="col-span-2">Quantity</p>
              <p className="col-span-2">Rate</p>
              <p className="col-span-2">Amount</p>
            </div>
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6">
                <Textarea
                  placeholder="Item description..."
                  name={fields.invoiceDescription.name}
                  key={fields.invoiceDescription.key}
                  defaultValue={fields.invoiceDescription.initialValue}
                />
                <p className="text-sm text-rose-500">
                  {fields.invoiceDescription.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="0"
                  name={fields.invoiceQuantity.name}
                  key={fields.invoiceQuantity.key}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  // defaultValue={fields.invoiceQuantity.initialValue}
                />
                <p className="text-sm text-rose-500">
                  {fields.invoiceQuantity.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="0"
                  name={fields.invoiceRate.name}
                  key={fields.invoiceRate.key}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  // defaultValue={fields.invoiceRate.initialValue}
                />
                <p className="text-sm text-rose-500">
                  {fields.invoiceRate.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input disabled value={formatCurrency(total, currency)} />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between items-center py-2">
                <span>Subtotal</span>
                <span>{formatCurrency(total, currency)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <span>Total</span>
                <span className="font-semibold underline underline-offset-2">
                  {formatCurrency(total, currency)}
                </span>

                <input
                  type="hidden"
                  name={fields.total.name}
                  key={fields.total.key}
                  value={total}
                />
              </div>
            </div>
          </div>

          <div>
            <Label>Note</Label>
            <Textarea
              placeholder="Type your notes..."
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={fields.note.initialValue}
            />
            <p className="text-sm text-rose-500">{fields.note.errors}</p>
          </div>

          <div className="flex items-center justify-end">
            <div>
              <SubmitButton text="Create Invoice" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
