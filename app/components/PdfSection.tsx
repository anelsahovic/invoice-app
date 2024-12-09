import Image from 'next/image';
import Link from 'next/link';

export default function PdfSection() {
  return (
    <div className="my-8 flex flex-col items-center justify-center space-y-8 py-3 px-6 max-w-[1000px] mx-auto motion-preset-blur-right motion-duration-2000">
      <div className="relative flex items-center justify-center w-full">
        <img
          src="/pdf.webp"
          alt="pdf"
          width={400}
          height={800}
          className="rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/50 rounded-lg space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Generate .pdf files
          </h1>
          <p className="text-slate-200 text-sm md:text-base max-w-[300px] leading-relaxed">
            Our platform ensures every invoice is accurately formatted and
            includes all the essential details, helping you maintain a
            professional image while simplifying your workflow.
          </p>
          <Link
            className="bg-gradient-to-r from-[#3da1f3] via-[#0ccfd6] to-[#099e83] text-white py-2 px-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
            href="/dashboard/invoices"
          >
            Generate PDF File
          </Link>
        </div>
      </div>
    </div>
  );
}
