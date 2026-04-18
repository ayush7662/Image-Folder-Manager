import { FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";

const AuthLayout = ({ title, subtitle, children, footerText, footerLinkText, footerLinkTo, mode }) => (
  <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 text-slate-100 md:py-10">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute -left-10 top-2/3 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />
    </div>
    <div className="relative mx-auto w-full max-w-6xl">
      <header className="mb-10 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 backdrop-blur md:px-6">
        <div className="flex items-center gap-3 text-slate-100">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-pink-500 text-xs font-bold text-white">
            IF
          </span>
          <span className="text-sm font-semibold md:text-base">Image Folder Manager</span>
        </div>
        <nav className="hidden items-center gap-7 text-sm text-slate-400 md:flex">
          <span>How it works</span>
          <span>Features</span>
          <span>Security</span>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-slate-300 transition hover:text-white">
            Sign in
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-400"
          >
            Create account
          </Link>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-12rem)] place-items-center">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/85 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl md:p-8">
          <div className="mb-2 flex items-center justify-center gap-2 text-pink-300">
            <FolderKanban size={16} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em]">
              {mode === "signup" ? "Join the workspace" : "Welcome back"}
            </span>
          </div>
          <h2 className="text-center text-3xl font-bold text-white">{title}</h2>
          <p className="mb-6 mt-2 text-center text-sm leading-6 text-slate-300">{subtitle}</p>
          {children}
          <p className="mt-6 text-center text-sm text-slate-400">
            {footerText}{" "}
            <Link className="font-semibold text-slate-200 transition hover:text-white" to={footerLinkTo}>
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default AuthLayout;
