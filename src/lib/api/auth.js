// Authentication API Helpers
// Functions for user authentication using Supabase Auth

import { supabase } from '../supabase'

/**
 * Sign up a new user using Admin API (development only, bypasses rate limits)
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} displayName - Display name
 * @returns {Promise<{user: object, error: object}>}
 */
export async function signUpAdmin(email, password, displayName) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  
  try {
    const response = await fetch(`${backendUrl}/api/auth/signup-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, displayName }),
    });

    // If backend is not available, return a specific error that triggers fallback
    if (!response.ok && (response.status === 0 || response.status >= 500)) {
      return { user: null, error: { message: 'BACKEND_UNAVAILABLE', status: 'connection_error' } };
    }

    const result = await response.json();
    
    if (!response.ok) {
      return { user: null, error: result.error || { message: 'Signup failed' } };
    }

    // After admin creates user, sign them in with Supabase client
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      return { user: result.user, error: signInError };
    }

    return { user: data.user, error: null };
  } catch (err) {
    // Connection errors (backend not running) should trigger fallback
    if (err.message?.includes('Failed to fetch') || err.message?.includes('ERR_CONNECTION_REFUSED')) {
      return { user: null, error: { message: 'BACKEND_UNAVAILABLE', status: 'connection_error' } };
    }
    return { user: null, error: { message: err.message || 'Network error' } };
  }
}

/**
 * Sign up a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} displayName - Display name
 * @returns {Promise<{user: object, error: object}>}
 */
export async function signUp(email, password, displayName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName
      }
    }
  })

  return { user: data.user, error }
}

/**
 * Sign in an existing user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{user: object, session: object, error: object}>}
 */
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  return { user: data.user, session: data.session, error }
}

/**
 * Sign out current user
 * @returns {Promise<{error: object}>}
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

/**
 * Get current user
 * @returns {Promise<{user: object, error: object}>}
 */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    if (error.message?.includes('Invalid Refresh Token')) {
      console.warn('Supabase refresh token invalid or expired. Clearing local session.')
      await supabase.auth.signOut()
    }
    return { user: null, error }
  }

  return { user: data.user, error: null }
}

/**
 * Get current session
 * @returns {Promise<{session: object, error: object}>}
 */
export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    if (error.message?.includes('Invalid Refresh Token')) {
      console.warn('Supabase refresh token invalid or expired. Clearing local session.')
      await supabase.auth.signOut()
    }
    return { session: null, error }
  }

  return { session: data.session, error: null }
}

/**
 * Reset password
 * @param {string} email - User email
 * @returns {Promise<{error: object}>}
 */
export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  })
  return { error }
}

/**
 * Update password
 * @param {string} newPassword - New password
 * @returns {Promise<{error: object}>}
 */
export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })
  return { error }
}

/**
 * Listen to auth state changes
 * @param {function} callback - Callback function
 * @returns {function} - Unsubscribe function
 */
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback)
}

