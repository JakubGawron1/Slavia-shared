import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const openapiPath = resolve(import.meta.dirname, '../openapi/openapi.json')
const shaPath = resolve(import.meta.dirname, '../openapi/openapi.sha256')

describe('openapi snapshot', () => {
  it('openapi.json hash matches openapi.sha256', () => {
    const raw = readFileSync(openapiPath)
    const hash = createHash('sha256').update(raw).digest('hex')
    const expected = readFileSync(shaPath, 'utf8').trim().split(/\s+/)[0]
    expect(hash).toBe(expected)
  })

  it('documents core API groups', () => {
    const doc = JSON.parse(readFileSync(openapiPath, 'utf8'))
    const paths = Object.keys(doc.paths ?? {})
    expect(paths.length).toBeGreaterThanOrEqual(100)
    expect(paths.some(p => p.startsWith('/api/auth'))).toBe(true)
    expect(paths.some(p => p.startsWith('/api/ai/coach'))).toBe(true)
    expect(doc.components?.schemas?.LoginRequest).toBeDefined()
    expect(doc.components?.securitySchemes?.BearerAuth).toBeDefined()
    expect(doc.info?.version).toMatch(/^\d+\.\d+\.\d+/)
  })
})
