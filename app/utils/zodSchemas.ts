import { z } from 'zod';

export const onboardingSchema = z.object({
  firstName: z.string().min(2, 'First name needs min 2 chars.'),
  lastName: z.string().min(2, 'First name needs min 2 chars.'),
  address: z.string().min(5, 'Address needs min 5 chars'),
});

export const invoiceSchema = z.object({
  invoiceName: z.string().min(3, 'Minimum length is 3'),
  total: z.number().min(1, 'Minimum length is 1'),
  status: z.enum(['PAID', 'PENDING']).default('PENDING'),
  date: z.string(),
  dueDate: z.number(),
  fromName: z.string().min(4, 'Minimum length is 4'),
  fromEmail: z.string().email('Not a valid email address'),
  fromAddress: z.string().min(5, 'Minimum length is 5'),

  recipientName: z.string().min(4, 'Minimum length is 4'),
  recipientEmail: z.string().email('Not a valid email address'),
  recipientAddress: z.string().min(5, 'Minimum length is 5'),

  currency: z.string(),
  invoiceNumber: z.number().min(1, 'Minimum number is 1'),
  note: z.string().optional(),
  invoiceDescription: z.string().min(10, 'Minimum length is 10'),
  invoiceQuantity: z.number().min(1, 'Minimum quantity is 1'),
  invoiceRate: z.number(),
});
