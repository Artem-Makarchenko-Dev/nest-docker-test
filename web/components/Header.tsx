'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { canReadUsers } from '@/lib/permissions';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { logoutThunk } from '@/lib/store/auth.thunks';

function IconMenu(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function IconClose(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

const LANDING_ANCHORS = [
  { href: '#product', label: 'Product' },
  { href: '#security', label: 'Security' },
  { href: '#pricing', label: 'Pricing' },
] as const;

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setMobileMenuOpen(false), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isLoggedIn = Boolean(accessToken && user);
  const showUsersNav = isLoggedIn && canReadUsers(user);
  const isHome = pathname === '/';
  const showLandingNav = isHome && !isLoggedIn;

  const onLogout = async () => {
    await dispatch(logoutThunk());
    router.push('/login');
  };

  const headerSurface = isScrolled
    ? 'bg-gray-950/80 backdrop-blur-md border-b border-white/10'
    : 'bg-transparent border-b border-transparent';

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${headerSurface}`}>
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6 lg:px-8 md:h-16">
        {/* Mobile: burger (landing only) */}
        {showLandingNav ? (
          <button
            type="button"
            className="relative z-20 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-300 hover:bg-white/5 hover:text-white md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-landing-nav"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            {mobileMenuOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        ) : null}

        {/* Logo: centered on mobile when landing guest; left on desktop */}
        <Link
          href="/"
          className={`text-lg font-bold tracking-tight text-slate-50 transition-opacity hover:opacity-90 sm:text-xl ${
            showLandingNav
              ? 'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent md:static md:z-auto md:translate-x-0 md:translate-y-0'
              : 'relative z-10 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'
          }`}
        >
          File Cloud Lab
        </Link>

        {/* Desktop: landing section links — single row between logo and auth */}
        {showLandingNav ? (
          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex md:items-center md:gap-8"
            aria-label="Page sections"
          >
            {LANDING_ANCHORS.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                {a.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div className="relative z-20 ml-auto flex items-center gap-2 sm:gap-4">
          {isLoggedIn ? (
            <>
              {showUsersNav ? (
                <Link
                  href="/users"
                  className="hidden text-sm font-medium text-gray-300 hover:text-white transition-colors sm:inline"
                >
                  Users
                </Link>
              ) : null}
              <Link
                href="/files"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Files
              </Link>
              <span className="hidden max-w-[140px] truncate text-sm text-gray-300 lg:inline">{user?.email}</span>
              <button
                type="button"
                onClick={() => void onLogout()}
                className="text-sm font-medium bg-white text-black px-3 py-2 rounded-full hover:bg-gray-200 transition-colors sm:px-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium bg-white text-black px-3 py-2 rounded-full hover:bg-gray-200 transition-colors sm:px-4"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile: full-screen panel with anchor links (landing guests only) */}
      {showLandingNav && mobileMenuOpen ? (
        <div
          id="mobile-landing-nav"
          className="fixed inset-x-0 bottom-0 top-14 z-40 bg-[#08090f]/98 backdrop-blur-md md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <nav className="flex flex-col gap-1 p-4" aria-label="Page sections">
            {LANDING_ANCHORS.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="rounded-lg px-4 py-3 text-base font-medium text-slate-200 hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {a.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
