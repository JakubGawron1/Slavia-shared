#!/usr/bin/env node
/** Eksportuje tablicę EXERCISES z weightliftingRatios.ts do JSON (dla Flutter). */
import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'data/weightlifting-exercises.json')
const tmp = resolve(root, 'scripts/.extract-exercises-tmp.mts')

writeFileSync(
  tmp,
  `import { writeFileSync } from 'node:fs'
import { EXERCISES } from '../src/logic/weightliftingRatios.ts'
writeFileSync(${JSON.stringify(out)}, JSON.stringify({ exercises: EXERCISES }, null, 2) + '\\n', 'utf8')
console.log('OK:', EXERCISES.length)
`,
  'utf8'
)

execSync(`npx tsx ${tmp}`, { cwd: root, stdio: 'inherit' })
console.log(`Zapisano data/weightlifting-exercises.json`)
