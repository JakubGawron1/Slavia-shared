/**
 * Kategorie wagowe PZPC — dane z `data/pzpc-weight-classes.json` (źródło prawdy).
 *
 * Regulamin od 1 stycznia 2026 r. — szczegóły w JSON i testach parity.
 */
import catalog from '../../data/pzpc-weight-classes.json' with { type: 'json' }

export type PzpcAgeGroupId = 'U15' | 'U17' | 'U20' | 'U23' | 'Senior'

type PzpcCatalog = {
  ageGroups: { id: PzpcAgeGroupId, label: string }[]
  classesByAge: Record<PzpcAgeGroupId, { male: string[], female: string[] }>
}

const data = catalog as PzpcCatalog

export const PZPC_AGE_GROUPS = data.ageGroups

/** Etykiety klas wagowych do selecta (bez „kg” w wartości — dopisujemy w UI). */
export function pzpcWeightClassLabels(age: PzpcAgeGroupId, gender: 'male' | 'female'): string[] {
  const bucket = data.classesByAge[age]
  if (!bucket) return []
  return gender === 'male' ? bucket.male : bucket.female
}

export function formatPzpcWeightCategory(
  age: PzpcAgeGroupId,
  gender: 'male' | 'female',
  classLabel: string
): string {
  const g = gender === 'male' ? 'M' : 'K'
  const kg = classLabel.startsWith('+') ? `${classLabel} kg` : `${classLabel} kg`
  return `${age} ${g} — ${kg}`
}

/** Odczyt wartości zapisanej przez `formatPzpcWeightCategory`. */
export function parsePzpcWeightCategoryStored(raw: string | null | undefined): {
  age: PzpcAgeGroupId
  gender: 'male' | 'female'
  classLabel: string
} | null {
  if (!raw?.trim()) return null
  const m = /^(\w+)\s+([MK])\s+—\s+(.+)$/u.exec(raw.trim())
  if (!m) return null
  const ageId = m[1] as PzpcAgeGroupId
  if (!PZPC_AGE_GROUPS.some(x => x.id === ageId)) return null
  const mk = m[2]
  const tail = m[3]
  if (mk == null || tail == null) return null
  const gender = mk === 'M' ? 'male' : 'female'
  const cls = tail.replace(/\s*kg\s*$/iu, '').trim()
  if (!cls) return null
  return { age: ageId, gender, classLabel: cls }
}
