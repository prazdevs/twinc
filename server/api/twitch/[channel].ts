export default defineEventHandler((event) => {
  const channel = getRouterParam(event, 'channel')

  return `Hi, ${channel}!`
})
