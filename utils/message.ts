/**
 * Creates a readable Message object from an IRC message
 */
export function createTwitchMessage(source: IrcMessage) {
  const tags = parseIrcTags(source.tags)
  const emotes = parseIrcEmotes(tags.emotes)

  return {
    username: tags['display-name'],
    emotes,
    message: source.message,
  }
}
export type TwitchMessage = ReturnType<typeof createTwitchMessage>

/**
 * Generates a flat AST from a Twitch message and emotes
 */
export function tokenizeMessage({ emotes, message }: TwitchMessage) {
  const tokens = [] as Array<{ type: 'text' | 'emote', content: string }>
  let index = 0

  for (const { from, to, id } of emotes) {
    if (index < from)
      tokens.push({ type: 'text', content: message.slice(index, from) })
    tokens.push({ type: 'emote', content: id })

    index = to + 1
  }

  if (index < message.length)
    tokens.push({ type: 'text', content: message.slice(index) })

  return tokens
}
