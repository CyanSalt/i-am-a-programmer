export interface Project {
  code: string,
  scale: number,
  difficulty: number,
  money: number,
}

function createProject(level: number): Project {
  return {
    code: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
    scale: 5 + Math.floor(level * 4 * Math.random()),
    difficulty: 2 + Math.floor(level * 1.4 * Math.random()),
    money: 2 + Math.floor(level * 1.4 * Math.random()),
  }
}

export function createProjects(level: number) {
  return Array.from({ length: 1 + Math.floor(level * Math.random()) }, () => createProject(level))
}

export function translateProperty(name: keyof Project): string {
  switch (name) {
    case 'code': return '代号'
    case 'scale': return '规模'
    case 'difficulty': return '难度'
    case 'money': return '加班费'
    default: return name
  }
}
