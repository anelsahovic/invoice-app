'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

interface Props {
  text: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
}

export default function SubmitButton({ text, variant }: Props) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant={`${variant ? variant : 'default'}`}
          disabled
          className="w-full"
        >
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button
          variant={`${variant ? variant : 'default'}`}
          type="submit"
          className="w-full"
        >
          {text}
        </Button>
      )}
    </>
  );
}
