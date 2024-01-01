<script setup lang="ts">
const channel = ref('')
</script>

<template>
  <div>
    <label>
      pick a channel to see chat
      <input v-model="channel">
    </label>
    <NuxtLink :to="`/${channel}`">
      open chat
    </NuxtLink>
  </div>
</template>
