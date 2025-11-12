"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/api/auth";
import { getCurrentProfile, updateLastActiveDate, upsertProfile } from "@/lib/api/profiles";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    if (!email || !password) {
      setError("Please enter email and password");
      setLoading(false);
      return;
    }

    try {
      // Sign in with Supabase
      const { user, session, error: signInError } = await signIn(
        email.trim().toLowerCase(),
        password
      );

      if (signInError) {
        setError(signInError.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      if (!user || !session) {
        setError("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // Derive display name from email (this is what user logged in with)
      const emailPrefix = email.split("@")[0];
      const displayName = emailPrefix
        .split(/[._-]+/)
        .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
        .join(" ") || "User";
      
      // Get current profile to check onboarding status
      const { profile: currentProfile } = await getCurrentProfile();
      
      // Always update profile with the display name from email
      // This ensures the name matches what they logged in with
      // Preserve onboarding_completed status
      const onboardingCompleted = currentProfile?.onboarding_completed ?? false;
      const { error: profileUpdateError } = await upsertProfile(user.id, displayName, onboardingCompleted);
      if (profileUpdateError) {
        console.error("Error updating profile:", profileUpdateError);
      }

      // Redirect based on onboarding completion status from database
      if (onboardingCompleted) {
        // Existing user - go to dashboard
        window.location.replace("/dashboard");
      } else {
        // New user - go to onboarding
        window.location.replace("/onboarding");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-6 py-16" style={{
      backgroundImage: "url('/sunset.png')",
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="w-full max-w-md mx-auto" style={{padding: '2px', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))'}}>
        <div style={{ borderRadius: '22px', padding: '28px', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: '0 20px 50px rgba(0,0,0,.25)' }}>
          <h1 className="text-3xl font-semibold text-center" style={{color: '#ffffff'}}>Welcome Back 🌸</h1>
          <p className="text-center mt-1" style={{color: '#ffffff'}}>Log in to continue your wellness journey.</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium" style={{color: '#ffffff'}}>Email address</label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl px-3 py-2 placeholder-[#eef]" style={{color: '#ffffff', background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.35)'}} placeholder="you@example.com"/>
            </div>
            <div>
              <label className="block text-sm font-medium" style={{color: '#ffffff'}}>Password</label>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full rounded-xl px-3 py-2 placeholder-[#eef]" style={{color: '#ffffff', background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.35)'}} placeholder="••••••••"/>
            </div>
            {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary"
              style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <a href="#" style={{color: '#ffffff'}}>Forgot password?</a>
          </div>
          <div className="mt-3 text-center text-sm" style={{color: '#ffffff'}}>
            Don’t have an account? <a href="/signup" className="font-medium" style={{color: '#ffffff', textDecoration: 'underline'}}>Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}


