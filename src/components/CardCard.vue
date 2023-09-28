<script lang="ts" setup>
import { Lock } from 'lucide'
import { RButton, RCard, RIcon, RSpace, RSwitch, RText } from 'roughness'
import type { Card } from '../utils/card'
import { translateProperty } from '../utils/person'

const { card, locked, disabled } = defineProps<{
  card: Card,
  locked?: boolean,
  disabled?: boolean,
}>()

const emit = defineEmits<{
  (event: 'update:locked', value: typeof locked): void,
  (event: 'select', value: Card): void,
}>()

const lockedModel = $computed({
  get: () => locked,
  set: value => {
    if (value !== locked) {
      emit('update:locked', value)
    }
  },
})

const type = $computed(() => {
  switch (card.rarity) {
    case 'legendary': return 'error'
    case 'epic': return 'primary'
    case 'rare': return 'success'
    default: return undefined
  }
})

function select() {
  emit('select', card)
}
</script>

<template>
  <RSpace vertical align="center" class="card-card">
    <RButton html-type="button" :disabled="disabled" @click="select">
      <RCard :type="type" footer class="card-content">
        <template #title>{{ card.name }}</template>
        <RSpace vertical class="card-properties">
          <RText v-for="value, name in card.properties" :key="name" block>
            {{ translateProperty(name) }}
            <RText :type="value! > 0 ? 'success' : 'error'">{{ value! > 0 ? '+' : '' }}{{ value }}</RText>
          </RText>
        </RSpace>
        <template #footer>$ {{ card.price }}</template>
      </RCard>
    </RButton>
    <RSwitch v-model="lockedModel">
      <RIcon :icon="Lock" />
    </RSwitch>
  </RSpace>
</template>

<style lang="scss" scoped>
.card-content {
  --r-card-border-width: 0;
}
.card-properties {
  text-align: left;
  color: var(--r-common-text-color);
}
</style>
