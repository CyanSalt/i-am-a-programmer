import { reactive } from 'vue'

export interface Person {
  health: number,
  skill: number,
  mentality: number,
  opportunity: number,
  money: number,
}

export function createPerson(): Person {
  return reactive({
    health: 10,
    skill: 5,
    mentality: 0,
    opportunity: 0,
    money: 50,
  })
}

export function translateProperty(name: keyof Person): string {
  switch (name) {
    case 'health': return '健康'
    case 'skill': return '技能'
    case 'mentality': return '心态'
    case 'opportunity': return '机会'
    case 'money': return '钱'
    default: return name
  }
}
