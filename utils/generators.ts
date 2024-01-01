import { customAlphabet } from 'nanoid'

/**
 * Generates an anonymous Twitch IRC username
 */
export function generateUsername() {
  return `justinfan${customAlphabet('1234567890', 6)}`
}
