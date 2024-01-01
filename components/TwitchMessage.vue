<script setup lang="ts">
const props = defineProps<{ message: TwitchMessage }>()

const tokens = tokenizeMessage(props.message)
</script>

<template>
  <div class="message">
    <span class="username">{{ message.username }}</span>
    <span class="message-content">
      <span v-for="t, i in tokens" :key="i" class="message-token">
        <template v-if="t.type === 'text'">
          {{ t.content }}
        </template>
        <TwitchEmote v-else-if="t.type === 'emote'" :emote="t.content" />
      </span>
    </span>
  </div>
</template>
