import Link from 'next/link';
import type { SVGProps } from 'react';

function IconShield(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
    </svg>
  );
}

function IconLock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function IconZap(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
    </svg>
  );
}

function IconUsers(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function IconChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const previewRows = [
  { file: 'Q4-report.pdf', owner: 'you@team.dev', status: 'UPLOADED', statusTone: 'emerald' as const, time: '2 min ago' },
  { file: 'assets/logo.png', owner: 'design@team.dev', status: 'PROCESSING', statusTone: 'amber' as const, time: 'Just now' },
];

const stats = [
  {
    value: '99.9%',
    label: 'Reliability your revenue can rely on',
    body: 'Keep proposals, closings, and compliance work moving: stakeholders see availability and progress instead of surprise downtime.',
    accent: 'text-pink-400',
  },
  {
    value: 'SOC 2',
    label: 'Diligence you can brief in a meeting',
    body: 'Shorten security and procurement cycles by showing clear separation of customers, traceable access, and retention that matches policy.',
    accent: 'text-orange-400',
  },
  {
    value: '45',
    label: 'Typical path to a live rollout',
    body: 'Stand up a governed client and partner experience in weeks—without waiting on a multi-quarter internal build.',
    accent: 'text-violet-300',
  },
  {
    value: '24/7',
    label: 'Always-on response path',
    body: 'When handoffs fail or access looks wrong, you escalate through a defined process—not whoever happens to be awake.',
    accent: 'text-red-300',
  },
];

const features = [
  {
    icon: IconLock,
    title: 'Customer boundaries you can defend',
    body: 'Keep each client’s world separate—contracts, regulators, and RFPs get crisp answers instead of everything living in one ambiguous pile.',
  },
  {
    icon: IconZap,
    title: 'Speed without internal bottlenecks',
    body: 'Shorten turnaround on packages, signatures, and deliverables by removing the wait on overloaded shared paths—buyers and partners feel the difference.',
  },
  {
    icon: IconUsers,
    title: 'Accountability that mirrors the org',
    body: 'Clear owners for every workspace, controlled guest access, and fewer inherited folders that nobody officially governs.',
  },
];

const faqs = [
  {
    q: 'Why move off a consumer drive for revenue-critical work?',
    a: 'Consumer tools hide who did what, for how long, and under which policy. You get clear ownership, a story clients and auditors can follow, and fewer fire drills when the wrong link gets forwarded.',
  },
  {
    q: 'Does what we prove in a pilot carry straight into enterprise-wide rollout?',
    a: 'Yes—the same operating model scales from one team to every office: one way of working, faster expansion, and far less retraining or rework between phases.',
  },
  {
    q: 'How do subscriptions stay predictable as we add people and usage?',
    a: 'Plans tie what you sell to named seats and agreed usage bands, so finance can forecast, sales can quote cleanly, and operations are not guessing where overages came from.',
  },
  {
    q: 'How do teams stay aligned on status without endless update calls?',
    a: 'Progress on files and commercial milestones surfaces to the people who need it—support, success, and leadership see movement as it happens instead of chasing updates in chat.',
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08090f] text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[20%] h-[720px] w-[720px] rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute -bottom-[25%] -right-[10%] h-[640px] w-[640px] rounded-full bg-fuchsia-600/10 blur-[110px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        {/* Hero — Product / Security / Pricing live in Header */}
        <section id="product" className="scroll-mt-28 pt-2 text-center sm:pt-4">
          <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Secure file management for teams that need control, not chaos
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Store, share, and collaborate with permissions, audit trails, and usage insight—without changing how your teams
            already work.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-[#7B61FF] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500"
            >
              Start free trial
            </Link>
            <a
              href="#faq"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium text-slate-100 transition hover:border-white/40 hover:bg-white/5"
            >
              Book a demo
            </a>
          </div>
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
            Pilot-friendly · No card required to start
          </p>
        </section>

        {/* Product preview */}
        <section className="mt-16 sm:mt-20" aria-labelledby="preview-heading">
          <p id="preview-heading" className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Product preview
          </p>
          <div className="mx-auto mt-4 max-w-4xl overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0f172a] p-4 sm:p-6">
            <div className="flex gap-1 border-b border-slate-700/80 pb-3 text-left text-[11px] font-semibold uppercase text-slate-500 sm:gap-2">
              <span className="w-[42%] min-w-0 sm:w-[38%]">File</span>
              <span className="w-[30%] min-w-0 sm:w-[26%]">Owner</span>
              <span className="hidden w-[18%] sm:inline">Status</span>
              <span className="hidden w-[18%] text-right sm:inline">Modified</span>
            </div>
            {previewRows.map((row) => (
              <div
                key={row.file}
                className="flex flex-wrap items-center gap-x-1 gap-y-2 border-b border-slate-800/80 py-3 text-sm last:border-0 sm:flex-nowrap sm:gap-2"
              >
                <span className="w-[42%] min-w-0 truncate font-medium text-slate-200 sm:w-[38%]">{row.file}</span>
                <span className="w-[30%] min-w-0 truncate text-slate-400 sm:w-[26%]">{row.owner}</span>
                <span className="w-full sm:hidden">
                  <span
                    className={
                      row.statusTone === 'emerald'
                        ? 'rounded-md bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-300'
                        : 'rounded-md bg-amber-950 px-2 py-0.5 text-[10px] font-semibold text-amber-200'
                    }
                  >
                    {row.status}
                  </span>
                  <span className="ml-2 text-slate-500">{row.time}</span>
                </span>
                <span className="hidden w-[18%] sm:inline">
                  <span
                    className={
                      row.statusTone === 'emerald'
                        ? 'rounded-md bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-300'
                        : 'rounded-md bg-amber-950 px-2 py-0.5 text-[10px] font-semibold text-amber-200'
                    }
                  >
                    {row.status}
                  </span>
                </span>
                <span className="hidden w-[18%] text-right text-slate-400 sm:inline">{row.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <span className="rounded-full border border-violet-500/40 bg-violet-950/40 px-3 py-1.5 text-[11px] text-violet-200">
              Richer context per file—less digging, faster answers
            </span>
          </div>
        </section>

        {/* Stats */}
        <section id="stats" className="mt-20 scroll-mt-28 sm:mt-24">
          <p className="mx-auto max-w-xl text-center text-base leading-relaxed text-slate-300">
            When files, access, and accountability live in one system, leadership stops guessing—and teams stop firefighting.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className={`text-4xl font-bold ${s.accent}`}>{s.value}</p>
                <p className={`mt-1 text-sm font-semibold ${s.accent}`}>{s.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Split */}
        <section id="security" className="mt-20 scroll-mt-28 sm:mt-28">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
            <div className="relative flex h-full min-h-0 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-700 via-fuchsia-600 to-rose-600 p-[1px]">
              <div className="flex h-full min-h-0 w-full flex-1 flex-col rounded-[15px] bg-[#0f172a]/95 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pinned for leadership</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li>• Board-summary.pdf · CFO review</li>
                  <li>• Vendor-MSA.docx · Legal queue</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col lg:h-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                <IconShield className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-2xl font-bold leading-snug text-white sm:text-3xl">
                Give legal and finance confidence—not another shared drive.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                Version history, expiring links, and activity you can export when leadership or clients ask hard questions.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-300">
                <li>✓ Retention and legal holds that match policy</li>
                <li>✓ Branded client portals for deliveries</li>
                <li>✓ Usage and export logs finance can reconcile</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-20 scroll-mt-28 sm:mt-24">
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
            Win on trust, speed, and control
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-400 sm:text-base">
            Protect margin from slow handoffs, tighten your compliance story, and give teams one governed place to work with files.
          </p>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {features.map((f) => {
              const Ico = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 shadow-sm shadow-black/20"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/40 to-fuchsia-500/30 text-white">
                    <Ico className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pricing CTA */}
        <section id="pricing" className="mt-20 scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center sm:mt-24 sm:p-10">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Start in minutes</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400">
            Start quickly, align your team when processes are ready, and scale packaging as usage grows.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex w-full items-center justify-center rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 sm:w-auto"
            >
              Create account
            </Link>
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-slate-100 sm:w-auto"
            >
              Log in
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-20 scroll-mt-28 sm:mt-24">
          <h2 className="text-center text-2xl font-bold text-white">FAQs</h2>
          <div className="mx-auto mt-8 max-w-2xl divide-y divide-slate-800">
            {faqs.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-sm font-medium text-slate-200 sm:text-base">
                  <span>{item.q}</span>
                  <IconChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="mt-16 border-t border-white/10 pt-8 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} File Cloud Lab. Built for teams who ship files with confidence.</p>
        </footer>
      </main>
    </div>
  );
}
