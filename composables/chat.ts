const TWITCH_IRC = 'ws://irc-ws.chat.twitch.tv'

export function useChat(channel: MaybeRefOrGetter<string>) {
  const { push, queue } = useQueue<TwitchMessage>(5)

  function onConnected(ws: WebSocket) {
    ws.send(`NICK ${generateUsername()}`)
    ws.send('CAP REQ :twitch.tv/commands twitch.tv/tags')
    ws.send(`JOIN #${toValue(channel)}`)
  }

  function onMessage(ws: WebSocket, { data }: MessageEvent<string>) {
    const ircMessages = data.split('\r\n').filter(Boolean)

    for (const m of ircMessages) {
      const message = parseIrcMessage(m)

      if (message?.command === 'PING')
        ws.send(`PONG :${message.message}`)

      if (message?.command === 'PRIVMSG')
        push(createTwitchMessage(message))
    }
  }

  const { open, close } = useWebSocket(TWITCH_IRC, {
    immediate: false,
    onConnected,
    onMessage,
  })

  return { open, close, queue }
}
