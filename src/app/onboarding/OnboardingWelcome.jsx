"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OnboardingQuestions from "./OnboardingQuestions";

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

  const [showQuestions, setShowQuestions] = useState(false);

  function proceed() {
    setShowQuestions(true);
  }

  if (showQuestions) {
    return <OnboardingQuestions />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16" style={{
      backgroundImage: "url('/wlecome.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 place-items-center gap-10">
        <div className="order-2 md:order-1 flex justify-center">
          <img src="/hello.gif" alt="Hello animation" className="" style={{maxWidth: '460px', border: 0, outline: 'none', boxShadow: 'none'}} />
        </div>
        <div className="order-1 md:order-2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{color: 'var(--feelheal-purple)'}}>
            Welcome to FeelHeal, {name}! 🌸
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto md:mx-0" style={{color: 'var(--feelheal-purple)'}}>
            We're so glad you're here — this is your safe space to relax, reflect, and heal.
          </p>
          <div className="mt-8">
            <button onClick={proceed} className="btn-primary text-base px-8 py-3">Let's Get Started →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
