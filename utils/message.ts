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
