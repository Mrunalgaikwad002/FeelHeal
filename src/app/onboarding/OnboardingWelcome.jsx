"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OnboardingQuestions from "./OnboardingQuestions";
import { getCurrentUser } from "@/lib/api/auth";
import { getCurrentProfile } from "@/lib/api/profiles";

export default function OnboardingWelcome() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkOnboardingStatus() {
      try {
        // Check if user is authenticated
        const { user, error: userError } = await getCurrentUser();
        
        if (userError || !user) {
          // Not authenticated, redirect to login
          window.location.href = "/login";
          return;
        }

        // Get profile to check onboarding status
        const { profile, error: profileError } = await getCurrentProfile();
        
        // If onboarding already completed, redirect to dashboard
        if (profile?.onboarding_completed) {
          window.location.href = "/dashboard";
          return;
        }

        // Get name from profile or email
        if (profile?.display_name) {
          setName(profile.display_name);
        } else if (user.user_metadata?.display_name) {
          setName(user.user_metadata.display_name);
        } else if (user.email) {
          setName(user.email.split("@")[0]);
        } else {
          setName("Friend");
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }

    checkOnboardingStatus();
  }, []);

  const [showQuestions, setShowQuestions] = useState(false);

  function proceed() {
    setShowQuestions(true);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: "var(--feelheal-purple)"}}></div>
      </div>
    );
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
