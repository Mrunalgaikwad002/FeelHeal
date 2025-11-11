"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "@/lib/api/auth";
import { getCurrentProfile } from "@/lib/api/profiles";

const moodOptions = ["Calm", "Energetic", "Sad", "Anxious", "Neutral"];

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [mood, setMood] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    if (!name || !email || !password || !confirm) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }
    
    if (confirm && password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    if (!agree) {
      setError("Please accept the terms to continue");
      setLoading(false);
      return;
    }

    try {
      // Sign up with Supabase
      const { user, error: signUpError } = await signUp(
        email.trim().toLowerCase(),
        password,
        name.trim()
      );

      if (signUpError) {
        setError(signUpError.message || "Sign up failed. Please try again.");
        setLoading(false);
        return;
      }

      if (!user) {
        setError("Account creation failed. Please try again.");
        setLoading(false);
        return;
      }

      // Profile is automatically created by database trigger
      // Clear onboarding flags for new users
      localStorage.removeItem("feelheal_seen_onboarding");
      localStorage.removeItem("feelheal_seen_dashboard");
      localStorage.removeItem("feelheal_onboarding_responses");

      // Redirect to onboarding for new users
      window.location.replace("/onboarding");
    } catch (err) {
      console.error("Signup error:", err);
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
          <h1 className="text-3xl font-semibold text-center" style={{color: '#ffffff'}}>Create Account</h1>
          <p className="text-center mt-1" style={{color: '#ffffff'}}>Start your mindful journey with a gentle setup.</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium" style={{color: '#ffffff'}}>Full name</label>
              <input required type="text" value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full rounded-xl px-3 py-2 placeholder-black/60" style={{color: '#000000', background: '#ffffff', border: '1px solid #e5e7eb'}} placeholder="Mrunal"/>
            </div>
            <div>
              <label className="block text-sm font-medium" style={{color: '#ffffff'}}>Email address</label>
              <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl px-3 py-2 placeholder-black/60" style={{color: '#000000', background: '#ffffff', border: '1px solid #e5e7eb'}} placeholder="you@example.com"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium" style={{color: '#ffffff'}}>Password</label>
                <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full rounded-xl px-3 py-2 placeholder-black/60" style={{color: '#000000', background: '#ffffff', border: '1px solid #e5e7eb'}} placeholder="••••••••"/>
              </div>
              <div>
                <label className="block text-sm font-medium" style={{color: '#ffffff'}}>Confirm</label>
                <input required type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} className="mt-1 w-full rounded-xl px-3 py-2 placeholder-black/60" style={{color: '#000000', background: '#ffffff', border: '1px solid #e5e7eb'}} placeholder="••••••••"/>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium" style={{color: '#ffffff'}}>Mood preference (optional)</label>
              <select value={mood} onChange={(e)=>setMood(e.target.value)} className="mt-1 w-full rounded-xl px-3 py-2 bg-white" style={{color: '#000000', background: '#ffffff', border: '1px solid #e5e7eb'}}>
                <option value="">Select a mood</option>
                {moodOptions.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm" style={{color: '#ffffff'}}>
              <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} className="rounded" />
              I agree to the terms & privacy policy
            </label>
            {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
            <button 
              type="submit" 
              disabled={!agree || !name || !email || !password || !confirm || loading} 
              aria-disabled={!agree || !name || !email || !password || !confirm || loading} 
              className="w-full btn-primary" 
              style={{
                opacity: (agree && name && email && password && confirm && !loading) ? 1 : 0.6, 
                cursor: (agree && name && email && password && confirm && !loading) ? 'pointer' : 'not-allowed'
              }}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-3 text-center text-sm" style={{color: '#ffffff'}}>
            Already have an account? <a href="/login" className="font-medium" style={{color: '#ffffff', textDecoration: 'underline'}}>Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}


