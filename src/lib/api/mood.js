// Mood Insights API Helpers
// Functions for managing anonymized mood data

import { supabase } from '../supabase'

/**
 * Save mood insight (anonymized)
 * @param {string} userId - User ID
 * @param {string} moodCategory - Mood category (e.g., "happy", "calm", "anxious")
 * @param {string} emotionalState - Anonymized emotional state (e.g., "positive", "neutral", "needs_support")
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<{mood: object, error: object}>}
 */
export async function saveMoodInsight(userId, moodCategory, emotionalState, date = null) {
  const moodDate = date || new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('mood_insights')
    .insert({
      user_id: userId,
      mood_category: moodCategory,
      emotional_state: emotionalState,
      date: moodDate
    })
    .select()
    .single()

  return { mood: data, error }
}

/**
 * Save current user's mood insight
 * @param {string} moodCategory - Mood category
 * @param {string} emotionalState - Anonymized emotional state
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<{mood: object, error: object}>}
 */
export async function saveCurrentMoodInsight(moodCategory, emotionalState, date = null) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { mood: null, error: { message: 'Not authenticated' } }
  
  return saveMoodInsight(user.id, moodCategory, emotionalState, date)
}

/**
 * Get mood insights for date range
 * @param {string} userId - User ID
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {Promise<{moods: array, error: object}>}
 */
export async function getMoodInsights(userId, startDate = null, endDate = null) {
  let query = supabase
    .from('mood_insights')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })

  if (startDate) {
    query = query.gte('date', startDate)
  }

  if (endDate) {
    query = query.lte('date', endDate)
  }

  const { data, error } = await query

  return { moods: data, error }
}

/**
 * Get current user's mood insights
 * @param {string} startDate - Start date
 * @param {string} endDate - End date
 * @returns {Promise<{moods: array, error: object}>}
 */
export async function getCurrentMoodInsights(startDate = null, endDate = null) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { moods: null, error: { message: 'Not authenticated' } }
  
  return getMoodInsights(user.id, startDate, endDate)
}

/**
 * Delete mood insights
 * @param {string} userId - User ID
 * @returns {Promise<{error: object}>}
 */
export async function deleteMoodInsights(userId) {
  const { error } = await supabase
    .from('mood_insights')
    .delete()
    .eq('user_id', userId)

  return { error }
}

/**
 * Delete current user's mood insights
 * @returns {Promise<{error: object}>}
 */
export async function deleteCurrentMoodInsights() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { message: 'Not authenticated' } }
  
  return deleteMoodInsights(user.id)
}

/**
 * Anonymize mood data before saving
 * Maps detailed mood descriptions to categories
 * @param {string} moodValue - Detailed mood value from frontend
 * @returns {object} - {moodCategory, emotionalState}
 */
export function anonymizeMood(moodValue) {
  const moodMap = {
    // Positive moods
    'happy': { category: 'happy', state: 'positive' },
    'joyful': { category: 'happy', state: 'positive' },
    'excited': { category: 'happy', state: 'positive' },
    'calm': { category: 'calm', state: 'positive' },
    'peaceful': { category: 'calm', state: 'positive' },
    'content': { category: 'calm', state: 'positive' },
    
    // Neutral moods
    'neutral': { category: 'neutral', state: 'neutral' },
    'okay': { category: 'neutral', state: 'neutral' },
    'fine': { category: 'neutral', state: 'neutral' },
    
    // Negative moods (anonymized)
    'sad': { category: 'sad', state: 'needs_support' },
    'anxious': { category: 'anxious', state: 'needs_support' },
    'stressed': { category: 'anxious', state: 'needs_support' },
    'angry': { category: 'angry', state: 'needs_support' },
    'frustrated': { category: 'angry', state: 'needs_support' },
    'tired': { category: 'tired', state: 'neutral' }
  }

  const normalized = moodValue.toLowerCase().trim()
  return moodMap[normalized] || { category: 'neutral', state: 'neutral' }
}

