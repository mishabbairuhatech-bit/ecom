"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    const name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    localStorage.setItem("luxe-user", JSON.stringify({ name, email }));
    router.push("/account");
  };

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="bg-cream py-4 lg:py-5 text-center">
        <h1 className="display-serif text-3xl">Sign In</h1>
        <p className="eyebrow text-stone mt-3">
          <Link href="/" className="hover:opacity-60">Home</Link> / Account
        </p>
      </div>

      <div className="mx-auto max-w-md px-5 py-4 lg:py-5">
        <form onSubmit={login} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email address"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-dark w-full">Sign In</button>
        </form>
        <div className="text-center mt-6 space-y-3">
          <p className="text-sm font-light text-stone">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-ink link-underline">Create one</Link>
          </p>
          <p className="text-xs font-light text-stone">
            Demo store — any email and password will sign you in.
          </p>
        </div>
      </div>
    </div>
  );
}
