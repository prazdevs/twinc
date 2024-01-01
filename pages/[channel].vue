<script setup lang="ts">
const route = useRoute()
const channel = ref(route.params.channel as string)

const { open, queue } = useChat(channel)

onMounted(open)
</script>

<template>
  <div>
    <div>
      <TwitchMessage v-for="m in queue" :key="m.message" :message="m" />
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #1e1e2e;
  color: white;
}
</style>
