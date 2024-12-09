import Image from 'next/image';
import Link from 'next/link';

export default function DashboardSection() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center space-y-8 py-3 px-6 motion-preset-focus motion-duration-2000">
      <img
        src="/dashboard.webp"
        alt="dashboard.png"
        width={800}
        height={300}
        className="shadow-lg rounded-lg border border-zinc-200"
      />
      <h2 className="text-xl sm:text-3xl md:text-4xl text-center max-w-screen-md font-semibold bg-gradient-to-r from-[#3da1f3] via-[#0ccfd6] to-[#099e83] text-transparent bg-clip-text ">
        Track payments, monitor invoice statuses, and view key metrics—all in
        one place.
      </h2>
      <p className="text-sm text-center max-w-screen-md md:text-lg text-slate-700">
        Stay on top of your business finances with a clean and powerful
        dashboard designed for clarity and efficiency. Whether you&apos;re
        managing overdue payments or analyzing trends, your dashboard puts
        everything you need at your fingertips.
      </p>
      <Link
        className="bg-gradient-to-r from-[#3da1f3] via-[#0ccfd6] to-[#099e83] text-white py-2 px-3 rounded-full shadow-md hover:scale-105  transition-all duration-300"
        href="/dashboard"
      >
        Explore Your Dashboard
      </Link>
    </div>
  );
}
