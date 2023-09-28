<script lang="ts" setup>
import { RCard, RSpace, RText } from 'roughness'
import type { Project } from '../utils/project'
import { translateProperty } from '../utils/project'

const { project, workload } = defineProps<{
  project: Project,
  workload: number,
}>()
</script>

<template>
  <RCard :type="workload ? undefined : 'comment'" class="project-card">
    <template #title>{{ project.code }} 项目</template>
    <RSpace>
      <RText>进度 {{ workload }}/{{ project.scale }}</RText>
      <RText>{{ translateProperty('difficulty') }} {{ project.difficulty }}</RText>
      <RText>$ {{ project.money }}</RText>
    </RSpace>
  </RCard>
</template>

<style lang="scss" scoped>
.project-card {
  &.comment {
    order: 1;
  }
}
</style>
