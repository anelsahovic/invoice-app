import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center gap-2  text-gray-900 opacity-80">
      <Loader2 className="size-8 mr-2 animate-spin" />
      <p>Loading...</p>
    </div>
  );
}
