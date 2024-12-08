import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center md:text-left flex flex-col items-center sm:items-start">
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
              <span className=" font-bold text-sm uppercase text-primary">
                App
              </span>
            </Link>
          </div>

          <div>
            <p className="text-sm mt-2">
              Create, manage, and track your invoices in one intuitive platform.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold text-white">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="hover:text-white transition duration-200"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-right">
          <h2 className="text-lg font-semibold text-white">Follow Us</h2>
          <div className="flex justify-center md:justify-end mt-2 space-x-4">
            <a
              href="https://github.com/anelsahovic"
              className="hover:text-white transition duration-200"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/anelsahovic/"
              className="hover:text-white transition duration-200"
            >
              LinkedIn
            </a>
          </div>
          <p className="text-sm mt-4 text-gray-500">
            &copy; {new Date().getFullYear()} Invoice App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
