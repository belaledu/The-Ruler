'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Ruler, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/courses', label: 'الكورسات' },
  { href: '/dashboard', label: 'لوحة الطالب' },
  { href: '/dashboard/support', label: 'الدعم' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0F0F13]/85 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Ruler className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl leading-none">The Ruler</span>
              <span className="text-[10px] text-text-secondary">مع أستاذ نادر</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors font-medium ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/login" className="text-text-primary hover:text-primary transition-colors px-4 py-2 rounded-full border border-border hover:border-primary">
              سجّل دخولك
            </Link>
            <Link href="/auth/register" className="bg-primary hover:bg-primary-light text-white px-6 py-2 rounded-full transition-colors font-medium">
              اشترك الحين
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-text-primary hover:text-primary p-2"
              onClick={() => setIsOpen((open) => !open)}
              aria-label="فتح قائمة التنقل"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6">
            <div className="pt-4 flex flex-col gap-3 border-t border-border">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-3 transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-2 border-t border-border flex flex-col gap-3">
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="text-text-primary hover:text-primary transition-colors px-4 py-3 rounded-xl border border-border hover:border-primary text-center"
                >
                  سجّل دخولك
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="bg-primary hover:bg-primary-light text-white px-4 py-3 rounded-xl transition-colors font-medium text-center"
                >
                  اشترك الحين
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
