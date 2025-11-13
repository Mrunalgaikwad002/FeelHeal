// Authentication API Helpers
// Functions for user authentication using Supabase Auth

import { supabase } from '../supabase'

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

