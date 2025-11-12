// Profile API Helpers
// Functions for managing user profiles

import { supabase } from '../supabase'

/**
 * Get user profile
 * @param {string} userId - User ID
 * @returns {Promise<{profile: object, error: object}>}
 */
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return { profile: data, error }
}

/**
 * Get current user's profile
 * @returns {Promise<{profile: object, error: object}>}
 */
export async function getCurrentProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { profile: null, error: { message: 'Not authenticated' } }
  
  return getProfile(user.id)
}

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {object} updates - Profile updates
 * @returns {Promise<{profile: object, error: object}>}
 */
export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single()

  return { profile: data, error }
}

/**
 * Update current user's profile
 * @param {object} updates - Profile updates
 * @returns {Promise<{profile: object, error: object}>}
 */
export async function updateCurrentProfile(updates) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { profile: null, error: { message: 'Not authenticated' } }
  
  return updateProfile(user.id, updates)
}

/**
 * Create profile if it doesn't exist
 * @param {string} userId - User ID
 * @param {string} displayName - Display name
 * @returns {Promise<{profile: object, error: object}>}
 */
export async function createProfile(userId, displayName) {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      display_name: displayName,
      last_active_date: new Date().toISOString().split('T')[0]
    })
    .select()
    .single()

  return { profile: data, error }
}

/**
 * Update last active date
 * @param {string} userId - User ID
 * @returns {Promise<{error: object}>}
 */
export async function updateLastActiveDate(userId) {
  const { error } = await supabase
    .from('profiles')
    .update({
      last_active_date: new Date().toISOString().split('T')[0]
    })
    .eq('id', userId)

  return { error }
}

/**
 * Create or update profile (upsert)
 * @param {string} userId - User ID
 * @param {string} displayName - Display name
 * @param {boolean} onboardingCompleted - Whether onboarding is completed
 * @returns {Promise<{profile: object, error: object}>}
 */
export async function upsertProfile(userId, displayName, onboardingCompleted = null) {
  const updateData = {
    id: userId,
    display_name: displayName,
    last_active_date: new Date().toISOString().split('T')[0],
    updated_at: new Date().toISOString()
  }
  
  // Only update onboarding_completed if explicitly provided
  if (onboardingCompleted !== null) {
    updateData.onboarding_completed = onboardingCompleted
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .upsert(updateData, {
      onConflict: 'id'
    })
    .select()
    .single()

  return { profile: data, error }
}

/**
 * Mark onboarding as completed
 * @param {string} userId - User ID
 * @returns {Promise<{error: object}>}
 */
export async function completeOnboarding(userId) {
  const { error } = await supabase
    .from('profiles')
    .update({
      onboarding_completed: true,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

  return { error }
}

/**
 * Upload profile picture
 * @param {string} userId - User ID
 * @param {File} file - Image file
 * @returns {Promise<{url: string, error: object}>}
 */
export async function uploadProfilePicture(userId, file) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('profile-pictures')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) return { url: null, error }

  const { data: { publicUrl } } = supabase.storage
    .from('profile-pictures')
    .getPublicUrl(fileName)

  // Update profile with new picture URL
  await updateProfile(userId, { profile_picture_url: publicUrl })

  return { url: publicUrl, error: null }
}

/**
 * Delete profile picture
 * @param {string} userId - User ID
 * @param {string} filePath - File path in storage
 * @returns {Promise<{error: object}>}
 */
export async function deleteProfilePicture(userId, filePath) {
  const { error } = await supabase.storage
    .from('profile-pictures')
    .remove([filePath])

  if (error) return { error }

  // Update profile to remove picture URL
  await updateProfile(userId, { profile_picture_url: null })

  return { error: null }
}

