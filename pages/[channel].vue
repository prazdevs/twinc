<script setup lang="ts">
const route = useRoute()
const channel = ref(route.params.channel as string)

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
        <b>{{ m.username }}</b><span>{{ m.message }}</span>
        <div>
          <pre>
            {{ m.emotes }}
          </pre>
        </div>
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
