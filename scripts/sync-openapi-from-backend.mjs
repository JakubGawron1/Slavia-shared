#!/usr/bin/env node
/**
 * Kopiuje openapi.json z Slavia-backend do Slavia-shared/openapi/.
 * Uruchom po zmianie kontraktu API w backendzie.
 */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const backend = resolve(root, '../../Slavia-backend/src/embed/openapi.json')
const target = resolve(root, 'openapi/openapi.json')
const shaFile = resolve(root, 'openapi/openapi.sha256')

if (!existsSync(backend)) {
  console.error('Brak Slavia-backend/src/embed/openapi.json obok Slavia-shared.')
  process.exit(1)
}

copyFileSync(backend, target)
const raw = readFileSync(target)
const hash = createHash('sha256').update(raw).digest('hex')
writeFileSync(shaFile, `${hash}\n`, 'utf8')
console.log('OK: zsynchronizowano openapi/openapi.json')
console.log('SHA256:', hash)
