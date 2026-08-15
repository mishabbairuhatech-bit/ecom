"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const register = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      "luxe-user",
      JSON.stringify({ name: form.name, email: form.email })
    );
    router.push("/account");
  };

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="bg-cream py-4 lg:py-5 text-center">
        <h1 className="display-serif text-3xl">Create Account</h1>
        <p className="eyebrow text-stone mt-3">
          <Link href="/" className="hover:opacity-60">Home</Link> / Register
        </p>
      </div>

      <div className="mx-auto max-w-md px-5 py-4 lg:py-5">
        <form onSubmit={register} className="space-y-4">
          <input
            required
            placeholder="Full name"
            className="input"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            type="email"
            required
            placeholder="Email address"
            className="input"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password (min 6 characters)"
            className="input"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
          <button type="submit" className="btn btn-dark w-full">Create Account</button>
        </form>
        <p className="text-sm font-light text-stone text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-ink link-underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
