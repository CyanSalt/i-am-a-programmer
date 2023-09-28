<script lang="ts" setup>
import { RButton, RCard, RText } from 'roughness'
import type { Card } from '../utils/card'
import { translateProperty } from '../utils/person'

const { card } = defineProps<{
  card: Card,
}>()

const type = $computed(() => {
  switch (card.rarity) {
    case 'legendary': return 'error'
    case 'epic': return 'primary'
    case 'rare': return 'success'
    default: return undefined
  }
})
</script>

<template>
  <RButton html-type="button" class="card-card">
    <RCard :type="type" footer class="card-content">
      <template #title>{{ card.name }}</template>
      <div class="card-properties">
        <div v-for="value, name in card.properties" :key="name" class="card-property">
          {{ translateProperty(name) }}
          <RText :type="value! > 0 ? 'success' : 'error'">{{ value! > 0 ? '+' : '' }}{{ value }}</RText>
        </div>
      </div>
      <template #footer>$ {{ card.price }}</template>
    </RCard>
  </RButton>
</template>

<style lang="scss" scoped>
.card-content {
  --r-card-border-width: 0;
}
.card-properties {
  color: var(--r-common-text-color);
}
</style>
