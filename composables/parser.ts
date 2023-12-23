import {
  char,
  createRegExp,
  exactly,
  letter,
  maybe,
  not,
  oneOrMore,
  whitespace,
} from 'magic-regexp'

export interface Message {
  tags: Record<Tag, string>
  src?: string
  command?: string
  channel?: string
  message?: string
}

/**
 * Twitch IRC message RegExp
 * @see https://dev.twitch.tv/docs/irc/
 */
const messageRE = createRegExp(
  maybe('@', oneOrMore(not.whitespace).groupedAs('tags'), whitespace),
  maybe(':', oneOrMore(not.whitespace).groupedAs('src'), whitespace),
  exactly(oneOrMore(letter.uppercase)).groupedAs('cmd').and(whitespace),
  maybe('#', oneOrMore(not.whitespace).groupedAs('chan'), whitespace),
  maybe(':', oneOrMore(char).groupedAs('msg')),
)

/**
 * Transforms a WebSocket event data string into messages
 */
function parseEvent(event: string) {
  return event.split('\r\n').filter(Boolean)
}

const TAGS = ['display-name', 'emotes', 'subscriber', 'mod'] as const
type Tag = typeof TAGS[number]
function isTag(t: string | Tag): t is Tag {
  return TAGS.includes(t as Tag)
}

/**
 * Transforms a Message tags string into Tags object
 */
function parseTags(tags: string = '') {
  return Object.fromEntries(
    tags
      .split(';')
      .map(t => t.split('='))
      .filter(t => isTag(t[0]))
      ?? [],
  ) as Record<Tag, string>
}

/**
 * Transforms a Websocket message string into Message
 */
function parseMessage(message: string): Message | null {
  const match = message.match(messageRE)

  if (!match)
    return null

  return {
    tags: parseTags(match.groups.tags),
    src: match.groups.src,
    command: match.groups.cmd,
    channel: match.groups.chan,
    message: match.groups.msg,
  } satisfies Message
}

export function useParser() {
  return {
    parseEvent,
    parseMessage,
  }
}
