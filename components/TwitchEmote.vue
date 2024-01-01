<script setup lang="ts">
import { resolveURL } from 'ufo'

const props = defineProps<{ emote: string }>()
const size = '1.0'

const src = computed(() => resolveURL(
  'https://static-cdn.jtvnw.net/emoticons/v2',
  props.emote,
  'default/dark',
  size,
))
</script>

<template>
  <img :src="src">
</template>
