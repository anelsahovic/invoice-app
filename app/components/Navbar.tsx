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
            width={60}
            height={60}
            alt="logo"
            className=""
          />
          <p className="text-2xl font-bold ml-2 text-white">Invoice</p>
          <span className=" font-bold text-sm uppercase text-primary">App</span>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <Link
          href="/login"
          className="px-3 py-1 sm:py-2 text-sm sm:text-base  rounded-full text-white border border-white hover:bg-white hover:text-primary transition duration-500"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="px-3 py-1 sm:py-2 text-sm sm:text-base  rounded-full text-white bg-gradient-to-l from-[#fc7474]  to-[#e78e19] shadow   hover:shadow-lg "
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
