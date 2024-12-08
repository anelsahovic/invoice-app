import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters.'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters.'),
  username: z.string().min(5, 'Username must be at least 5 characters.'),
  address: z.string().min(5, 'Address must be at least 5 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export const invoiceSchema = z.object({
  invoiceName: z.string().min(3, 'Invoice name must be at least 3 characters.'),
  total: z.number().min(1, 'Total amount must be at least 1.'),
  status: z.enum(['PAID', 'PENDING']).default('PENDING'),
  date: z.string(),
  dueDate: z.number().min(0, 'Due date required.'),
  fromName: z.string().min(4, 'Sender name must be at least 4 characters.'),
  fromEmail: z
    .string()
    .email('Please provide a valid email address for the sender.'),
  fromAddress: z
    .string()
    .min(5, 'Sender address must be at least 5 characters.'),

  recipientName: z
    .string()
    .min(4, 'Recipient name must be at least 4 characters.'),
  recipientEmail: z
    .string()
    .email('Please provide a valid email address for the recipient.'),
  recipientAddress: z
    .string()
    .min(5, 'Recipient address must be at least 5 characters.'),

  currency: z
    .string()
    .min(3, 'Currency must be at least 3 characters long (e.g., USD).'),
  invoiceNumber: z.number().min(1, 'Invoice number must be at least 1.'),
  note: z.string().optional(),
  invoiceDescription: z
    .string()
    .min(10, 'Description must be at least 10 characters.'),
  invoiceQuantity: z.number().min(1, 'Quantity must be at least 1.'),
  invoiceRate: z.number().min(0.01, 'Rate must be greater than 0.'),
});
