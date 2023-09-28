<script lang="ts" setup>
import { RButton, RDialog, RSpace } from 'roughness'
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

let times = $ref(0)
let randomCard = $ref<Card[]>([])

const rollingPrice = $computed(() => Math.round(level * 2 * 1.25 ** times))

function roll() {
  randomCard = pickCards(properties.opportunity, MAX_COUNT - lockedCards.length)
  emit('roll', rollingPrice)
  times += 1
}

const cards = $computed(() => [...lockedCards, ...randomCard])

function select(index: number) {
  emit('select', cards[index])
  if (index < lockedCards.length) {
    emit('update:lockedCards', lockedCards.filter((card, groupIndex) => groupIndex !== index))
  } else {
    const randomIndex = index - lockedCards.length
    randomCard = randomCard.filter((card, groupIndex) => groupIndex !== randomIndex)
  }
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
    <RSpace>
      <CardCard
        v-for="(card, index) in cards"
        :key="index"
        :card="card"
        :disabled="properties.money < card.price"
        @click="select(index)"
      />
    </RSpace>
    <template #footer>
      <RButton html-type="button" @click="roll">换 ($ {{ rollingPrice }})</RButton>
      <RButton html-type="button" type="primary" @click="finish">加班</RButton>
    </template>
  </RDialog>
</template>
