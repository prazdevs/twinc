export function useQueue<T>(length: number) {
  const queue = ref([]) as Ref<T[]>

  function push(v?: T) {
    if (v)
      queue.value.push(v)
  }

  function clear() {
    queue.value = []
  }

  watchArray(queue, (n, _, a) => {
    if (a.length && n.length > length)
      queue.value.splice(0, a.length)
  }, {
    deep: true,
  })

  return {
    queue,
    push,
    clear,
  }
}
