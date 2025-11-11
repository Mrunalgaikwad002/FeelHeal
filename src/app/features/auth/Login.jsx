"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    try {
      // Normalize email to lowercase for comparison
      const normalizedEmail = email.trim().toLowerCase();
      
      // Get previous user data if it exists
      const previousRaw = localStorage.getItem("feelheal_user");
      const previous = previousRaw ? JSON.parse(previousRaw) : null;
      const previousEmail = previous?.email?.toLowerCase();
      const isReturningUser = previous && previousEmail === normalizedEmail;
      
      // Determine the name for this user
      let userName;
      if (isReturningUser && previous && previous.name) {
        // Returning user: use their stored name
        userName = previous.name;
      } else {
        // New user or email changed: derive name from email
        const localPart = normalizedEmail.split("@")[0] || "";
        userName = localPart
          .split(/[._-]+/)
          .filter(Boolean)
          .map(s => s.charAt(0).toUpperCase() + s.slice(1))
          .join(" ") || "Friend";
      }

      // If this is a different email (new user), clear ALL user-specific data first
      if (!isReturningUser) {
        // Explicitly remove old user data
        localStorage.removeItem("feelheal_user");
        // Clear onboarding flags for new users
        localStorage.removeItem("feelheal_seen_onboarding");
        localStorage.removeItem("feelheal_seen_dashboard");
        localStorage.removeItem("feelheal_onboarding_responses");
        // Clear any other user-specific data that might exist
        localStorage.removeItem("feelheal_mood_history");
        localStorage.removeItem("feelheal_journal_entries");
        localStorage.removeItem("feelheal_goals");
      }

      // Always save the current user data with the exact email and name
      // Use the normalized email for storage
      const user = { email: normalizedEmail, name: userName };
      localStorage.setItem("feelheal_user", JSON.stringify(user));
      
      // Verify the data was saved correctly
      const verify = localStorage.getItem("feelheal_user");
      if (verify) {
        const savedUser = JSON.parse(verify);
        console.log("Saved user data:", savedUser);
      }
      
      // Force a hard navigation to ensure dashboard picks up the new user data
      // Route based on user type
      if (isReturningUser) {
        // Returning users always go to dashboard
        window.location.replace("/dashboard");
      } else {
        // New users go to onboarding first
        window.location.replace("/onboarding");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
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
            {error && <div className="text-sm text-red-600">{error}</div>}
            <button type="submit" className="w-full btn-primary">Login</button>
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


