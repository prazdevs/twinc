/**
 * Generates an anonymous Twitch IRC username
 */
export function generateUsername() {
  return `justinfan${Math.floor(100000 + Math.random() * 900000)}`
}
