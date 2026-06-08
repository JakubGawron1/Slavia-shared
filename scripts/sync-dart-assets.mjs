#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = resolve(root, 'data')
const dstDir = resolve(root, 'dart/assets')

if (!existsSync(dstDir)) mkdirSync(dstDir, { recursive: true })

for (const name of readdirSync(srcDir)) {
  if (!name.endsWith('.json')) continue
  copyFileSync(resolve(srcDir, name), resolve(dstDir, name))
}

// test vectors used by dart tests
const vecDst = resolve(dstDir, 'test-vectors')
if (!existsSync(vecDst)) mkdirSync(vecDst, { recursive: true })
for (const name of readdirSync(resolve(root, 'test-vectors'))) {
  if (!name.endsWith('.json')) continue
  copyFileSync(resolve(root, 'test-vectors', name), resolve(vecDst, name))
}

console.log('OK: zsynchronizowano dart/assets/')
