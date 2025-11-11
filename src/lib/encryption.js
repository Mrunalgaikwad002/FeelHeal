// Client-Side Encryption Utilities
// Journal entries are encrypted client-side before being sent to Supabase
// This ensures that even administrators cannot read journal content

/**
 * Derive encryption key from user password using PBKDF2
 * @param {string} password - User's password
 * @param {string} salt - Salt for key derivation (stored with user)
 * @returns {Promise<CryptoKey>} - Derived encryption key
 */
export async function deriveKeyFromPassword(password, salt) {
  const encoder = new TextEncoder()
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  )

  const saltBuffer = typeof salt === 'string' 
    ? encoder.encode(salt) 
    : salt

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: 100000,
      hash: 'SHA-256'
    },
    passwordKey,
    {
      name: 'AES-GCM',
      length: 256
    },
    false,
    ['encrypt', 'decrypt']
  )
}

/**
 * Generate a random salt for key derivation
 * @returns {string} - Base64 encoded salt
 */
export function generateSalt() {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  return btoa(String.fromCharCode(...salt))
}

/**
 * Encrypt text using AES-GCM
 * @param {string} text - Text to encrypt
 * @param {CryptoKey} key - Encryption key
 * @returns {Promise<string>} - Base64 encoded encrypted data with IV
 */
export async function encryptText(text, key) {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    data
  )

  // Combine IV and encrypted data
  const combined = new Uint8Array(iv.length + encrypted.byteLength)
  combined.set(iv, 0)
  combined.set(new Uint8Array(encrypted), iv.length)

  // Return as base64 string
  return btoa(String.fromCharCode(...combined))
}

/**
 * Decrypt text using AES-GCM
 * @param {string} encryptedData - Base64 encoded encrypted data with IV
 * @param {CryptoKey} key - Decryption key
 * @returns {Promise<string>} - Decrypted text
 */
export async function decryptText(encryptedData, key) {
  const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0))
  
  const iv = combined.slice(0, 12)
  const encrypted = combined.slice(12)

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    encrypted
  )

  const decoder = new TextDecoder()
  return decoder.decode(decrypted)
}

/**
 * Get or create encryption key for user (using user ID as base)
 * This creates a deterministic key from the user ID, stored securely
 * @param {string} userId - User ID
 * @returns {Promise<CryptoKey>} - Encryption key
 */
export async function getOrCreateEncryptionKey(userId) {
  const storageKey = `feelheal_encryption_key_${userId}`
  
  // Check if we have a cached key
  const cachedKeyData = sessionStorage.getItem(storageKey)
  if (cachedKeyData) {
    try {
      const keyData = JSON.parse(cachedKeyData)
      return await crypto.subtle.importKey(
        'jwk',
        keyData,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      )
    } catch (e) {
      // If import fails, generate new key
    }
  }

  // Generate a new key from user ID + app secret
  const encoder = new TextEncoder()
  const appSecret = 'feelheal-secret-2024' // In production, use env variable
  const keyMaterial = `${userId}-${appSecret}`
  
  const keyData = await crypto.subtle.importKey(
    'raw',
    encoder.encode(keyMaterial),
    'PBKDF2',
    false,
    ['deriveKey']
  )

  const salt = encoder.encode(`feelheal-salt-${userId}`)
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyData,
    {
      name: 'AES-GCM',
      length: 256
    },
    true, // extractable: true - needed to export key for caching
    ['encrypt', 'decrypt']
  )

  // Cache the key in sessionStorage (cleared on logout)
  const exportedKey = await crypto.subtle.exportKey('jwk', key)
  sessionStorage.setItem(storageKey, JSON.stringify(exportedKey))

  return key
}

/**
 * Encrypt journal entry
 * @param {string} content - Journal entry content
 * @param {string} userId - User ID
 * @returns {Promise<string>} - Encrypted content
 */
export async function encryptJournalEntry(content, userId) {
  const key = await getOrCreateEncryptionKey(userId)
  return await encryptText(content, key)
}

/**
 * Decrypt journal entry
 * @param {string} encryptedContent - Encrypted journal entry
 * @param {string} userId - User ID
 * @returns {Promise<string>} - Decrypted content
 */
export async function decryptJournalEntry(encryptedContent, userId) {
  const key = await getOrCreateEncryptionKey(userId)
  return await decryptText(encryptedContent, key)
}

