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
import Link from 'next/link';
import React, { useActionState, useEffect, useState } from 'react';
import SubmitButton from './SubmitButtons';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { invoiceSchema } from '../utils/zodSchemas';
import { editInvoice } from '../actions';
import { formatCurrency } from '../utils/helperFunctions';
import { Prisma } from '@prisma/client';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  invoiceData: Prisma.InvoiceGetPayload<{}>;
};

function EditInvoice({ invoiceData }: Props) {
  const [lastResult, action] = useActionState(editInvoice, undefined);
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

  const [selectedDate, setSelectedDate] = useState(invoiceData.date);
  const [rate, setRate] = useState(invoiceData.invoiceRate.toString());
  const [quantity, setQuantity] = useState(
    invoiceData.invoiceQuantity.toString()
  );
  const [currency, setCurrency] = useState(invoiceData.currency);
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
              Edit invoice #{invoiceData.invoiceNumber}
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
                  defaultValue={invoiceData.invoiceNumber}
                />

                <input type="hidden" name="id" value={invoiceData.id} />
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
                defaultValue={invoiceData.invoiceName}
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
                  defaultValue={invoiceData.fromName}
                />
                <p className="text-sm text-rose-500">
                  {fields.fromName.errors}
                </p>
                <Input
                  placeholder="Your Email"
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  defaultValue={invoiceData.fromEmail}
                />
                <p className="text-sm text-rose-500">
                  {fields.fromEmail.errors}
                </p>
                <Input
                  placeholder="Your Address"
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  defaultValue={invoiceData.fromAddress}
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
                  defaultValue={invoiceData.recipientName}
                />
                <p className="text-sm text-rose-500">
                  {fields.recipientName.errors}
                </p>
                <Input
                  placeholder="Recipient Email"
                  name={fields.recipientEmail.name}
                  key={fields.recipientEmail.key}
                  defaultValue={invoiceData.recipientEmail}
                />
                <p className="text-sm text-rose-500">
                  {fields.recipientEmail.errors}
                </p>
                <Input
                  placeholder="Recipient Address"
                  name={fields.recipientAddress.name}
                  key={fields.recipientAddress.key}
                  defaultValue={invoiceData.recipientAddress}
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
                defaultValue={invoiceData.dueDate.toString()}
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
                  defaultValue={invoiceData.invoiceDescription}
                />
                <p className="text-sm text-rose-500">
                  {fields.invoiceName.errors}
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
              defaultValue={invoiceData.note as string}
            />
            <p className="text-sm text-rose-500">{fields.note.errors}</p>
          </div>

          <div className="flex items-center justify-end">
            <div>
              <SubmitButton text="Update Invoice" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default EditInvoice;
