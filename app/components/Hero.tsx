import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Hero() {
  return (
    <div className="h-[550px] sm:h-[500px] px-5 sm:space-y-5 md:space-y-2  max-w-[1000px] mx-auto motion-preset-confetti ">
      <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-bold text-center mt-4 capitalize">
        Invoicing made easy
      </h1>

      <div className="flex flex-col sm:flex-row justify-around items-center p-2">
        <div>
          <Image
            src="/hero.png"
            alt="hero"
            width={300}
            height={500}
            className=" sm:hidden"
          />
        </div>
        <div className="flex flex-col space-y-8 sm:space-y-6 items-center sm:items-start justify max-w-[400px]">
          <div className="flex flex-col items-center sm:items-start space-y-2 sm:space-y-5">
            <h1 className="text-white text-xl text-center sm:text-left sm:text-3xl md:text-5xl font-bold ">
              Simplify Your Invoicing Process
            </h1>
            <p className="text-gray-50 text-xs sm:text-base text-center sm:text-left">
              Effortlessly create, manage, and track your invoices in one
              intuitive platform. Stay organized and get paid faster.
            </p>
          </div>
          <div>
            <Link
              href="/dashboard"
              className="px-3 py-2  rounded-full text-white bg-gradient-to-l from-[#fc7474]  to-[#e78e19] shadow   hover:shadow-lg "
            >
              Create Your First Invoice
            </Link>
          </div>
        </div>
        <div>
          <Image
            src="/hero.png"
            alt="hero"
            width={400}
            height={500}
            className="hidden sm:block min-w-[350px]"
          />
        </div>
      </div>
    </div>
  );
}
