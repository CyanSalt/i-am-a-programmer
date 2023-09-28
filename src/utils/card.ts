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
  { name: '一度可乐', rarity: 'normal', price: 15, properties: { health: -1, mentality: 1, opportunity: 2 } },
  { name: '小会员', rarity: 'normal', price: 35, properties: { mentality: 2, opportunity: -2 } },
  // rare (51-200)
  { name: '电瓶车', rarity: 'rare', price: 110, properties: { health: 6, mentality: 2 } },
  { name: 'JavaScript精粹', rarity: 'rare', price: 70, properties: { skill: 8, mentality: -2 } },
  { name: '烤串', rarity: 'rare', price: 55, properties: { health: -4, mentality: 2, opportunity: 10 } },
  // epic (201-300)
  { name: '五月那天的门票', rarity: 'epic', price: 220, properties: { mentality: 5, opportunity: 20 } },
  { name: '思维驰学习机', rarity: 'epic', price: 280, properties: { skill: 5, mentality: 8, opportunity: -5 } },
  { name: '猫', rarity: 'epic', price: 240, properties: { health: -4, mentality: 6, opportunity: 10 } },
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
  const rareProbability = Math.max(Math.sqrt(opportunity) + 1, 0) / 25
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
