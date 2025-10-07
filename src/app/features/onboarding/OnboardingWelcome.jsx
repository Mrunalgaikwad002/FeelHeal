"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingWelcome() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("feelheal_user");
      if (raw) {
        const u = JSON.parse(raw);
        setName(u?.name || u?.email?.split("@")[0] || "Friend");
      }
    } catch {}
  }, []);

  function proceed() {
    localStorage.setItem("feelheal_seen_onboarding", "true");
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen px-6 py-16 flex items-center" style={{
      backgroundImage: "url('/wlecome.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10 place-items-center">
        <div className="order-1 flex justify-center">
          <img src="/hello.gif" alt="Hello animation" className="" style={{maxWidth: '460px', border: 0, outline: 'none', boxShadow: 'none'}} />
        </div>
        <div className="order-2 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{color: 'var(--feelheal-purple)'}}>
            Welcome to FeelHeal, {name}! 🌸
          </h1>
          <p className="mt-4 text-lg md:text-xl mx-auto" style={{color: 'var(--feelheal-purple)'}}>
            We’re so glad you’re here — this is your safe space to relax, reflect, and heal.
          </p>
          <div className="mt-8">
            <button onClick={proceed} className="btn-primary text-base px-8 py-3">Let’s Get Started →</button>
          </div>
        </div>
      </div>
    </div>
  );
}


