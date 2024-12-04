import { z } from 'zod';

export const onboardingSchema = z.object({
  firstName: z.string().min(2, 'First name needs min 2 chars.'),
  lastName: z.string().min(2, 'First name needs min 2 chars.'),
  address: z.string().min(5, 'Address needs min 5 chars'),
});
