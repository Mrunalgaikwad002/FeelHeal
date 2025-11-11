// Settings API Helpers
// Functions for managing user settings

import { supabase } from '../supabase'

/**
 * Get user settings
 * @param {string} userId - User ID
 * @returns {Promise<{settings: object, error: object}>}
 */
export async function getSettings(userId) {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single()

  // If no settings exist, return default settings
  if (error && error.code === 'PGRST116') {
    return { settings: getDefaultSettings(), error: null }
  }

  return { settings: data, error }
}

/**
 * Get current user's settings
 * @returns {Promise<{settings: object, error: object}>}
 */
export async function getCurrentSettings() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { settings: null, error: { message: 'Not authenticated' } }
  
  return getSettings(user.id)
}

/**
 * Update user settings
 * @param {string} userId - User ID
 * @param {object} updates - Settings updates
 * @returns {Promise<{settings: object, error: object}>}
 */
export async function updateSettings(userId, updates) {
  const { data, error } = await supabase
    .from('user_settings')
    .upsert({
      user_id: userId,
      ...updates,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    })
    .select()
    .single()

  return { settings: data, error }
}

/**
 * Update current user's settings
 * @param {object} updates - Settings updates
 * @returns {Promise<{settings: object, error: object}>}
 */
export async function updateCurrentSettings(updates) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { settings: null, error: { message: 'Not authenticated' } }
  
  return updateSettings(user.id, updates)
}

/**
 * Get default settings
 * @returns {object} - Default settings object
 */
export function getDefaultSettings() {
  return {
    theme: 'light',
    font_style: 'calm',
    accent_animation_enabled: true,
    background_music_enabled: false,
    sound_effects_enabled: true,
    daily_mood_reminder_enabled: false,
    daily_mood_reminder_time: null,
    daily_affirmation_enabled: false,
    goal_reminders_enabled: true,
    motivational_tone: 'gentle',
    companion_personality: 'friendly'
  }
}

