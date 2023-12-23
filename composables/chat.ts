const TWITCH_IRC = 'ws://irc-ws.chat.twitch.tv'

export function useChat(channel: MaybeRefOrGetter<string>) {
  const { parseEvent, parseMessage } = useParser()
  const { push, queue } = useQueue<Message>(5)

  function onConnected(ws: WebSocket) {
    ws.send(`NICK ${generateUsername()}`)
    ws.send('CAP REQ :twitch.tv/commands twitch.tv/tags')
    ws.send(`JOIN #${toValue(channel)}`)
  }

  function onMessage(ws: WebSocket, { data }: MessageEvent<string>) {
    const messages = parseEvent(data)

    for (const m of messages) {
      const message = parseMessage(m)
      if (message) {
        if (message.command === 'PING')
          ws.send(`PONG :${message.message}`)

        if (message.command === 'PRIVMSG')
          push(message)
      }
    }
  }

  const { open, close } = useWebSocket(TWITCH_IRC, {
    immediate: false,
    onConnected,
    onMessage,
  })

  return { open, close, queue }
}
