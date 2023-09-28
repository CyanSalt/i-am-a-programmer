<script lang="ts" setup>
import { Eye, EyeOff } from 'lucide'
import { RButton, RDialog, RIcon, RSpace } from 'roughness'
import { onMounted } from 'vue'
import type { Card } from '../utils/card'
import { pickCards } from '../utils/card'
import type { Person } from '../utils/person'
import CardCard from './CardCard.vue'

const { level, properties, lockedCards = (() => []) as never } = defineProps<{
  level: number,
  properties: Person,
  lockedCards?: Card[],
}>()

const emit = defineEmits<{
  (event: 'update:lockedCards', value: typeof lockedCards): void,
  (event: 'roll', value: number): void,
  (event: 'select', value: Card): void,
  (event: 'finish'): void,
}>()

const MAX_COUNT = 4

let hidden = $ref(false)
let times = $ref(0)
let randomCards = $ref<Card[]>([])

const rollingPrice = $computed(() => Math.round(level * 2 * 1.25 ** times))

function roll() {
  randomCards = pickCards(properties.opportunity, MAX_COUNT - lockedCards.length)
  emit('roll', rollingPrice)
  times += 1
}

const cards = $computed(() => [...lockedCards, ...randomCards])

function select(index: number) {
  emit('select', cards[index])
  if (index < lockedCards.length) {
    emit('update:lockedCards', lockedCards.filter((card, groupIndex) => groupIndex !== index))
  } else {
    const randomIndex = index - lockedCards.length
    randomCards = randomCards.filter((card, groupIndex) => groupIndex !== randomIndex)
  }
}

function lock(index: number, locked: boolean) {
  const target = cards[index]
  if (locked) {
    const randomIndex = index - lockedCards.length
    emit('update:lockedCards', lockedCards.concat([target]))
    randomCards = randomCards.filter((card, groupIndex) => groupIndex !== randomIndex)
  } else {
    emit('update:lockedCards', lockedCards.filter((card, groupIndex) => groupIndex !== index))
    randomCards = [target].concat(randomCards)
  }
}

function toggle() {
  hidden = !hidden
}

function finish() {
  emit('finish')
}

onMounted(() => {
  roll()
})
</script>

<template>
  <RDialog state="manual" :closable="false" class="card-select">
    <template #title>购买卡片</template>
    <template #header-end>
      <RButton html-type="button" @click="toggle">
        <RIcon :icon="hidden ? Eye : EyeOff" />
      </RButton>
    </template>
    <RSpace v-show="!hidden">
      <CardCard
        v-for="(card, index) in cards"
        :key="`${index}:${lockedCards.length}`"
        :card="card"
        :disabled="properties.money < card.price"
        :locked="index < lockedCards.length"
        @update:locked="lock(index, $event)"
        @select="select(index)"
      />
    </RSpace>
    <template #footer>
      <RButton html-type="button" @click="roll">换 ($ {{ rollingPrice }})</RButton>
      <RButton html-type="button" type="primary" @click="finish">加班</RButton>
    </template>
  </RDialog>
</template>
