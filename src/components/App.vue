<script lang="ts" setup>
import { RGridGuide, RSpace } from 'roughness'
import { reactive, watchEffect } from 'vue'
import type { Card } from '../utils/card'
import { validateCards } from '../utils/card'
import { createPerson } from '../utils/person'
import type { Project } from '../utils/project'
import CardSelect from './CardSelect.vue'
import PersonInfo from './PersonInfo.vue'
import SettlementInfo from './SettlementInfo.vue'
import WorkingInfo from './WorkingInfo.vue'

validateCards()

const properties = createPerson()
const cards = reactive<Card[]>([])
let lockedCards = $ref<Card[]>([])

let finishedLevels = $ref(0)
let level = $ref(0)
let condition = $ref(properties.health)

function solveProject(project: Project) {
  properties.money += project.money
}

let isSelectingCard = $ref(true)
let isSettling = $ref(false)

function rollCards(price: number) {
  properties.money -= price
}

function selectCard(card: Card) {
  cards.push(card)
  properties.money -= card.price
  Object.entries(card.properties).forEach(([name, value]) => {
    properties[name] += value
  })
}

function enterBreakpoint() {
  isSelectingCard = true
}

function enterNextLevel() {
  isSelectingCard = false
  level += 1
}

watchEffect(() => {
  if (condition <= 0) {
    finishedLevels = level - 1
    level = 0
    isSettling = true
  }
})
</script>

<template>
  <div class="app">
    <RGridGuide />
    <RSpace vertical class="container">
      <PersonInfo
        :properties="properties"
        :condition="condition"
      />
      <SettlementInfo
        v-if="isSettling"
        :level="finishedLevels"
      />
      <WorkingInfo
        v-else
        v-model:condition="condition"
        :level="level"
        :properties="properties"
        @solve="solveProject"
        @finish="enterBreakpoint"
      />
      <CardSelect
        v-if="isSelectingCard"
        v-model:locked-cards="lockedCards"
        :level="level"
        :properties="properties"
        @roll="rollCards"
        @select="selectCard"
        @finish="enterNextLevel"
      />
    </RSpace>
  </div>
</template>

<style lang="scss" scoped>
:global(body) {
  margin: 0;
}
.app {
  padding: 8px;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
.container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
