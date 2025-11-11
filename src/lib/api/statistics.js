// Statistics API Helpers
// Functions for managing user statistics

import { supabase } from '../supabase'

/**
 * Get goal statistics
 * @returns {Promise<{statistics: object, error: object}>}
 */
export async function getGoalStatistics() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { statistics: null, error: { message: 'Not authenticated' } }

  const { data, error } = await supabase
    .from('goal_statistics')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return { statistics: data, error }
}

/**
 * Update goal statistics
 * @param {object} updates - Statistics updates
 * @returns {Promise<{statistics: object, error: object}>}
 */
export async function updateGoalStatistics(updates) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { statistics: null, error: { message: 'Not authenticated' } }

  const { data, error } = await supabase
    .from('goal_statistics')
    .upsert({
      user_id: user.id,
      ...updates,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    })
    .select()
    .single()

  return { statistics: data, error }
}

/**
 * Get meditation statistics
 * @returns {Promise<{statistics: object, error: object}>}
 */
export async function getMeditationStatistics() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { statistics: null, error: { message: 'Not authenticated' } }

  const { data, error } = await supabase
    .from('meditation_statistics')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return { statistics: data, error }
}

/**
 * Update meditation statistics
 * @param {object} updates - Statistics updates
 * @returns {Promise<{statistics: object, error: object}>}
 */
export async function updateMeditationStatistics(updates) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { statistics: null, error: { message: 'Not authenticated' } }

  const { data, error } = await supabase
    .from('meditation_statistics')
    .upsert({
      user_id: user.id,
      ...updates,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    })
    .select()
    .single()

  return { statistics: data, error }
}

/**
 * Get game statistics
 * @returns {Promise<{statistics: object, error: object}>}
 */
export async function getGameStatistics() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { statistics: null, error: { message: 'Not authenticated' } }

  const { data, error } = await supabase
    .from('game_statistics')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return { statistics: data, error }
}

/**
 * Update game statistics
 * @param {object} updates - Statistics updates
 * @returns {Promise<{statistics: object, error: object}>}
 */
export async function updateGameStatistics(updates) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { statistics: null, error: { message: 'Not authenticated' } }

  const { data, error } = await supabase
    .from('game_statistics')
    .upsert({
      user_id: user.id,
      ...updates,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    })
    .select()
    .single()

  return { statistics: data, error }
}

/**
 * Get humor statistics
 * @returns {Promise<{statistics: object, error: object}>}
 */
export async function getHumorStatistics() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { statistics: null, error: { message: 'Not authenticated' } }

  const { data, error } = await supabase
    .from('humor_statistics')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return { statistics: data, error }
}

/**
 * Update humor statistics
 * @param {object} updates - Statistics updates
 * @returns {Promise<{statistics: object, error: object}>}
 */
export async function updateHumorStatistics(updates) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { statistics: null, error: { message: 'Not authenticated' } }

  const { data, error } = await supabase
    .from('humor_statistics')
    .upsert({
      user_id: user.id,
      ...updates,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    })
    .select()
    .single()

  return { statistics: data, error }
}

