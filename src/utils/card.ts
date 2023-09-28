import type { Person } from './person'

export interface Card {
  name: string,
  rarity: 'normal' | 'rare' | 'epic' | 'legendary',
  price: number,
  properties: Partial<Person>,
}

const CARD_POOL: Card[] = [
  // normal (0-50)
  { name: '食堂的午餐', rarity: 'normal', price: 0, properties: { health: 4, mentality: -1 } },
  { name: '餐巾纸', rarity: 'normal', price: 10, properties: { health: 2 } },
  { name: '一度可乐', rarity: 'normal', price: 15, properties: { health: -1, mentality: 1, opportunity: 2 } },
  { name: 'D站小会员', rarity: 'normal', price: 35, properties: { mentality: 2, opportunity: -2 } },
  { name: '笔记本', rarity: 'normal', price: 20, properties: { skill: 2, opportunity: -2 } },
  { name: '雨伞', rarity: 'normal', price: 30, properties: { health: 1, skill: 1, opportunity: 3 } },
  { name: '交通卡', rarity: 'normal', price: 18, properties: { health: 3, mentality: -1, opportunity: 10 } },
  { name: '鼠标垫', rarity: 'normal', price: 20, properties: { skill: 2 } },
  { name: '腰托', rarity: 'normal', price: 20, properties: { health: 3 } },
  { name: 'Webpack官方文档', rarity: 'normal', price: 0, properties: { skill: 2, mentality: -1 } },
  { name: '枕头', rarity: 'normal', price: 22, properties: { mentality: 1 } },
  { name: '预约按摩', rarity: 'normal', price: 42, properties: { health: 2, mentality: 1 } },
  { name: '香芋计划', rarity: 'normal', price: 10, properties: { opportunity: 10 } },
  { name: 'AI聊天', rarity: 'normal', price: 0, properties: { mentality: 1, opportunity: -10 } },
  { name: '请客奶茶', rarity: 'normal', price: 25, properties: { opportunity: 20 } },
  // rare (51-200)
  { name: '电瓶车', rarity: 'rare', price: 110, properties: { health: 6, mentality: 2 } },
  { name: 'JavaScript精粹', rarity: 'rare', price: 70, properties: { skill: 8, mentality: -2 } },
  { name: '烤串', rarity: 'rare', price: 55, properties: { health: -4, mentality: 2, opportunity: 10 } },
  { name: 'AK运动鞋', rarity: 'rare', price: 120, properties: { health: 4, opportunity: 25 } },
  { name: '酱香美式', rarity: 'rare', price: 70, properties: { health: -2, skill: 3, opportunity: 10 } },
  { name: '行军床', rarity: 'rare', price: 100, properties: { health: 12 } },
  { name: '寸寸签名照', rarity: 'rare', price: 60, properties: { opportunity: 30 } },
  { name: '山寨耳机', rarity: 'rare', price: 88, properties: { health: -3, skill: 7, opportunity: 15 } },
  // epic (201-300)
  { name: '九月天演唱会门票', rarity: 'epic', price: 220, properties: { mentality: 5, opportunity: 20 } },
  { name: '思维驰学习机', rarity: 'epic', price: 280, properties: { skill: 5, mentality: 8, opportunity: -5 } },
  { name: '猫', rarity: 'epic', price: 240, properties: { health: -4, mentality: 6, opportunity: 10 } },
  { name: '原石礼包', rarity: 'epic', price: 288, properties: { mentality: 5, opportunity: 15 } },
  { name: '女装', rarity: 'epic', price: 233, properties: { health: -5, mentality: 5, opportunity: 25 } },
  // legendary (301-)
  { name: '女朋友', rarity: 'legendary', price: 330, properties: { health: -2, mentality: 3, opportunity: 50 } },
  { name: '显示器', rarity: 'legendary', price: 320, properties: { health: 16, skill: 6, opportunity: 4 } },
  { name: '键盘', rarity: 'legendary', price: 310, properties: { health: 5, skill: 8 } },
]

function validateCard(card: Card, ratio: number) {
  const score = (card.properties.skill ?? 0)
    + (card.properties.mentality ?? 0) * 2
    + (card.properties.health ?? 0) / 2
    + (card.properties.opportunity ?? 0) / 5
  const effectiveness = score ? card.price / (score * ratio) : (card.price ? NaN : 10)
  if (isNaN(effectiveness) || effectiveness < 5 || effectiveness > 15) {
    throw new Error(`${card.name} E: ${effectiveness}`)
  } else {
    console.debug(`${card.name} E: ${effectiveness}`)
  }
}

export function validateCards() {
  CARD_POOL.forEach(card => {
    validateCard(card, (() => {
      switch (card.rarity) {
        case 'legendary': return 2
        case 'epic': return 1.6
        case 'rare': return 1.2
        default: return 1
      }
    })())
  })
}

function pickCardFromPoll(poll: Card[]) {
  return poll[Math.floor(Math.random() * poll.length)]
}

function pickCard(opportunity: number) {
  // 0 -> 100
  // 100 -> 10
  const legendaryProbability = Math.max(Math.sqrt(opportunity) + 1, 0) / 100
  const epicProbability = Math.max(Math.sqrt(opportunity) + 1, 0) / 50
  const rareProbability = Math.max(Math.sqrt(opportunity) + 1, 0) / 10
  const randomNumber = Math.random()
  if (randomNumber < legendaryProbability) {
    return pickCardFromPoll(CARD_POOL.filter(card => card.rarity === 'legendary'))
  }
  if (randomNumber < epicProbability) {
    return pickCardFromPoll(CARD_POOL.filter(card => card.rarity === 'epic'))
  }
  if (randomNumber < rareProbability) {
    return pickCardFromPoll(CARD_POOL.filter(card => card.rarity === 'rare'))
  }
  return pickCardFromPoll(CARD_POOL.filter(card => card.rarity === 'normal'))
}

export function pickCards(opportunity: number, count: number) {
  return Array.from({ length: count }, () => pickCard(opportunity))
}
