'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import * as React from 'react';

type BaseTemplateProps = {
  children: ReactNode;
  leftNav?: ReactNode;
  rightNav?: ReactNode;
};

export function BaseTemplate({ children, leftNav, rightNav }: BaseTemplateProps) {
  return (
    <div className="w-full">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold">
                ZyCash Dashboard
              </Link>

              {leftNav && (
                <nav className="hidden md:ml-10 md:flex md:space-x-8">
                  <ul className="flex space-x-6">{leftNav}</ul>
                </nav>
              )}
            </div>

            {rightNav && (
              <div className="hidden md:flex md:items-center">
                <ul className="flex space-x-6">{rightNav}</ul>
              </div>
            )}

            <div className="flex md:hidden">{/* Mobile menu button would go here */}</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">{children}</main>

      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} ZyCash Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
