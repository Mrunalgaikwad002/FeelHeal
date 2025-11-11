// Journal API Helpers
// Functions for managing journal entries (encrypted)

import { supabase } from '../supabase'
import { encryptJournalEntry, decryptJournalEntry } from '../encryption'

/**
 * Save journal entry (encrypted)
 * @param {string} content - Journal entry content
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} mood - Mood category (optional, stored in UI only)
 * @returns {Promise<{entry: object, error: object}>}
 */
export async function saveJournalEntry(content, date = null, mood = null) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { entry: null, error: { message: 'Not authenticated' } }

  const journalDate = date || new Date().toISOString().split('T')[0]
  const wordCount = content.split(/\s+/).filter(Boolean).length

  // Encrypt content before sending
  const encryptedContent = await encryptJournalEntry(content, user.id)

  const { data, error } = await supabase
    .from('journal_entries')
    .insert({
      user_id: user.id,
      encrypted_content: encryptedContent,
      date: journalDate,
      word_count: wordCount
    })
    .select()
    .single()

  return { entry: data, error }
}

/**
 * Get journal entries (decrypt after receiving)
 * @returns {Promise<{entries: array, error: object}>}
 */
export async function getJournalEntries() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { entries: null, error: { message: 'Not authenticated' } }

  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })

  if (error) return { entries: null, error }

  // Decrypt entries
  const decryptedEntries = await Promise.all(
    data.map(async (entry) => {
      try {
        const decryptedContent = await decryptJournalEntry(
          entry.encrypted_content,
          user.id
        )
        return {
          ...entry,
          text: decryptedContent,
          mood: 'calm' // Default mood since mood_category column doesn't exist in DB
        }
      } catch (err) {
        console.error('Decryption error:', err)
        return {
          ...entry,
          text: '[Unable to decrypt]',
          decryptError: true
        }
      }
    })
  )

  return { entries: decryptedEntries, error: null }
}

/**
 * Update journal entry
 * @param {string} entryId - Entry ID
 * @param {string} content - New content
 * @returns {Promise<{entry: object, error: object}>}
 */
export async function updateJournalEntry(entryId, content) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { entry: null, error: { message: 'Not authenticated' } }

  const wordCount = content.split(/\s+/).filter(Boolean).length
  const encryptedContent = await encryptJournalEntry(content, user.id)

  const { data, error } = await supabase
    .from('journal_entries')
    .update({
      encrypted_content: encryptedContent,
      word_count: wordCount
    })
    .eq('id', entryId)
    .eq('user_id', user.id)
    .select()
    .single()

  return { entry: data, error }
}

/**
 * Delete journal entry
 * @param {string} entryId - Entry ID
 * @returns {Promise<{error: object}>}
 */
export async function deleteJournalEntry(entryId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { message: 'Not authenticated' } }

  const { error } = await supabase
    .from('journal_entries')
    .delete()
    .eq('id', entryId)
    .eq('user_id', user.id)

  return { error }
}

/**
 * Delete all journal entries
 * @returns {Promise<{error: object}>}
 */
export async function deleteAllJournalEntries() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: { message: 'Not authenticated' } }

  const { error } = await supabase
    .from('journal_entries')
    .delete()
    .eq('user_id', user.id)

  return { error }
}

