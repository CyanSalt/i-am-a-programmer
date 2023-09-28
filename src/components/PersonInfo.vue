<script lang="ts" setup>
import { RCard, RForm, RFormItem } from 'roughness'
import type { Person } from '../utils/person'
import { translateProperty } from '../utils/person'

const { properties, condition } = defineProps<{
  properties: Person,
  condition: number,
}>()
</script>

<template>
  <RCard :header="false" class="person-info">
    <RForm :label-inline="false" :vertical="false" justify="center">
      <RFormItem name="health">
        <template #label>{{ translateProperty('health') }}</template>
        {{ condition }}/{{ properties.health }}
      </RFormItem>
      <RFormItem name="skill">
        <template #label>{{ translateProperty('skill') }}</template>
        {{ properties.skill }}
      </RFormItem>
      <RFormItem name="mentality">
        <template #label>{{ translateProperty('mentality') }}</template>
        {{ properties.mentality }}
      </RFormItem>
      <RFormItem name="opportunity">
        <template #label>{{ translateProperty('opportunity') }}</template>
        {{ properties.opportunity }}
      </RFormItem>
      <RFormItem name="money">
        <template #label>{{ translateProperty('money') }}</template>
        {{ properties.money }}
      </RFormItem>
    </RForm>
  </RCard>
</template>
