export function useQueue<T = MaybeRefOrGetter<unknown>>(length: number) {
  const queue = ref([]) as Ref<T[]>

  const push = (v: T) => {
    const c = toValue(v)
    if (c)
      queue.value.push(v)
  }
  const clear = () => {
    queue.value = []
  }

  watchArray(queue, (n, _, a) => {
    if (a.length && n.length > length)
      queue.value.splice(0, a.length)
  }, {
    deep: true,
  })

  return {
    queue: readonly(queue),
    push,
    clear,
  }
}
