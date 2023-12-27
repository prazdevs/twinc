// Utilities for parsing Twitch IRC events

/**
 * Supported Twitch IRC commands
 * @see https://dev.twitch.tv/docs/irc/#supported-irc-messages
 */
const IRC_COMMANDS = [
  'NOTICE',
  'PART',
  'PRIVMSG',
  'PING',
  'CLEARCHAT',
  'ROOMSTATE',
] as const

type IrcCommand = typeof IRC_COMMANDS[number]

/**
 * Parses supported Twitch IRC message
 * @see https://dev.twitch.tv/docs/irc/#parsing-messages
 */
export function parseIrcMessage(message: string) {
  const parsed = message.match(createRegExp(
    maybe('@', oneOrMore(not.whitespace).groupedAs('tags'), whitespace),
    maybe(':', oneOrMore(not.whitespace).groupedAs('src'), whitespace),
    exactly(anyOf(...IRC_COMMANDS)).groupedAs('cmd').and(whitespace),
    maybe('#', oneOrMore(not.whitespace).groupedAs('chan'), whitespace),
    maybe(':', oneOrMore(char).groupedAs('msg')),
  ))

  if (!parsed)
    return null

  return {
    command: parsed.groups.cmd as IrcCommand,
    tags: parsed.groups.tags ?? '',
    message: parsed.groups.msg ?? '',
  }
}

export type IrcMessage = NonNullable<ReturnType<typeof parseIrcMessage>>

/**
 * Parses Twitch IRC message tags
 * @see https://dev.twitch.tv/docs/irc/tags/#twitch-irc-tags
 */
export function parseIrcTags(tags: string): Record<string, string> {
  return tags
    .split(';')
    .map(t => t.split('=', 2))
    .reduce((t, [k, v]) => ({ ...t, [k]: v }), {})
}
