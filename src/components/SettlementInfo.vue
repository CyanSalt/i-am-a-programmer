<script lang="ts" setup>
import { RDialog, RSpace, RText } from 'roughness'

const { level } = defineProps<{
  level: number,
}>()
</script>

<template>
  <RDialog class="settlement-info">
    <template #title>游戏结束</template>
    <RSpace>
      <RText>完成关卡</RText>
      <RText size="large">{{ level }}</RText>
    </RSpace>
  </RDialog>
</template>
