import { describe, expect, it } from 'vitest'
import catalog from '../data/pzpc-weight-classes.json' with { type: 'json' }
import { PZPC_AGE_GROUPS, pzpcWeightClassLabels } from '../src/logic/pzpcWeightCategories'

type PzpcCatalog = {
  ageGroups: { id: string }[]
  classesByAge: Record<string, { male?: string[], female?: string[] }>
}

describe('pzpc catalog parity JSON ↔ TS', () => {
  const data = catalog as PzpcCatalog

  it('age groups match catalog keys', () => {
    const jsonIds = data.ageGroups.map(g => g.id)
    const tsIds = PZPC_AGE_GROUPS.map(g => g.id)
    expect(tsIds).toEqual(jsonIds)
  })

  it('male senior labels match JSON catalog', () => {
    const jsonSeniorMale = data.classesByAge.Senior?.male ?? []
    const tsLabels = pzpcWeightClassLabels('Senior', 'male')
    expect(tsLabels).toEqual(jsonSeniorMale)
  })

  it('female U17 labels match JSON catalog', () => {
    const jsonU17Female = data.classesByAge.U17?.female ?? []
    const tsLabels = pzpcWeightClassLabels('U17', 'female')
    expect(tsLabels).toEqual(jsonU17Female)
  })
})
