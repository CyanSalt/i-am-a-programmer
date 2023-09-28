<script lang="ts" setup>
import { RCard, RSpace } from 'roughness'
import { watch } from 'vue'
import type { Person } from '../utils/person'
import type { Project } from '../utils/project'
import { createProjects } from '../utils/project'
import ProjectCard from './ProjectCard.vue'

const { level, properties, condition } = defineProps<{
  level: number,
  properties: Person,
  condition: number,
}>()

const emit = defineEmits<{
  (event: 'update:condition', value: typeof condition): void,
  (event: 'solve', value: Project): void,
  (event: 'finish'): void,
}>()

const year = new Date().getFullYear()

const levelTime = $computed(() => 30 + 5 * level)
let restTime = $ref(0)

let projects = $ref<Project[]>([])
let workloads = $ref<number[]>([])

function start() {
  projects = []
  workloads = []
  restTime = levelTime as number
  let timer = setInterval(() => {
    restTime -= 1
    if (restTime <= 0) {
      clearInterval(timer)
      emit('finish')
      return
    }
    let changes = 0
    for (const [index, project] of projects.entries()) {
      if (workloads[index] > 0) {
        workloads[index] -= Math.min(Math.max(properties.skill - project.difficulty, 0), workloads[index])
        if (Math.random() < 0.1) {
          changes -= Math.min(Math.max(project.difficulty - properties.mentality, 0), condition)
        }
        if (workloads[index] <= 0) {
          emit('solve', project)
        }
      }
    }
    if (!(restTime % 5) || !workloads.some(value => value > 0)) {
      const items = createProjects(level)
      projects = projects.concat(items)
      workloads = workloads.concat(items.map(item => item.scale))
    }
    emit('update:condition', condition + changes)
  }, 1000)
}

watch($$(level), value => {
  if (!value) return
  emit('update:condition', properties.health)
  start()
})
</script>

<template>
  <RCard class="working-info">
    <template #title>{{ year }}年 Q{{ level }}</template>
    <template #header-end>{{ restTime }}s</template>
    <RSpace vertical>
      <ProjectCard
        v-for="(project, index) in projects"
        :key="index"
        :project="project"
        :workload="workloads[index]"
      />
    </RSpace>
  </RCard>
</template>
