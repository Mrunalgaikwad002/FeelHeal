// Companion API Helpers
// Functions for managing AI companion sessions

import { supabase } from '../supabase'

/**
 * Start new companion session
 * @returns {Promise<{session: object, error: object}>}
 */
export async function startCompanionSession() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { session: null, error: { message: 'Not authenticated' } }

  const { data, error } = await supabase
    .from('companion_sessions')
    .insert({
      user_id: user.id,
      session_started_at: new Date().toISOString(),
      is_active: true
    })
    .select()
    .single()

  return { session: data, error }
}

/**
 * End companion session
 * @param {string} sessionId - Session ID
 * @param {string} emotionalInsightSummary - Summary of emotional insight
 * @param {number} messageCount - Number of messages
 * @returns {Promise<{session: object, error: object}>}
 */
export async function endCompanionSession(sessionId, emotionalInsightSummary, messageCount) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { session: null, error: { message: 'Not authenticated' } }

  const { data, error } = await supabase
    .from('companion_sessions')
    .update({
      session_ended_at: new Date().toISOString(),
      emotional_insight_summary: emotionalInsightSummary,
      message_count: messageCount,
      is_active: false
    })
    .eq('id', sessionId)
    .eq('user_id', user.id)
    .select()
    .single()

  return { session: data, error }
}

/**
 * Get recent companion sessions
 * @param {number} limit - Number of sessions to retrieve
 * @returns {Promise<{sessions: array, error: object}>}
 */
export async function getCompanionSessions(limit = 10) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { sessions: null, error: { message: 'Not authenticated' } }

  const { data, error } = await supabase
    .from('companion_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('session_started_at', { ascending: false })
    .limit(limit)

  return { sessions: data, error }
}

