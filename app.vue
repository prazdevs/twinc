<script setup lang="ts">
const channel = ref('vicksy')

const { open, close, queue } = useChat(channel)
</script>

<template>
  <div>
    <input v-model="channel">
    <button @click="open">
      open
    </button>
    <button @click="() => close()">
      close
    </button>
    <div>
      <div v-for="m, i in queue" :key="i">
        <b>{{ m.tags['display-name'] }}</b> <span>{{ m.message }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #1e1e2e;
  color: white;
}
</style>
