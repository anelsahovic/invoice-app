import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="py-4 px-5 flex justify-between items-center max-w-[1000px] mx-auto ">
      <div>
        <Link href="/" className="flex items-center ">
          <Image
            src="/logo.png"
            width={10}
            height={10}
            alt="logo"
            className="size-10"
          />
          <p className="text-2xl font-bold ml-2 text-white">Invoice</p>
          <span className=" font-bold text-sm uppercase text-primary">App</span>
        </Link>
      </div>
      <div>
        <Link
          href="/dashboard"
          className="px-3 py-2 text-sm sm:text-base  rounded-full text-white border border-white hover:bg-white hover:text-primary transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
