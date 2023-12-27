export function createTwitchMessage(source: IrcMessage) {
  const tags = parseIrcTags(source.tags)

  return {
    username: tags['display-name'],
    message: source.message,
  }
}
export type TwitchMessage = ReturnType<typeof createTwitchMessage>
