import { describe, expect, it } from 'vitest'
import { escapeMarkdownHtml, renderMarkdownInline } from '../src/logic/markdownInline'

describe('markdownInline', () => {
  it('escapes HTML', () => {
    expect(escapeMarkdownHtml('<script>')).toBe('&lt;script&gt;')
  })

  it('renders bold, italic, strike, code, links', () => {
    const html = renderMarkdownInline('**bold** *it* ~~no~~ `x` [a](https://x.pl)')
    expect(html).toContain('<strong>bold</strong>')
    expect(html).toContain('<em>it</em>')
    expect(html).toContain('<s>no</s>')
    expect(html).toContain('<code')
    expect(html).toContain('href="https://x.pl"')
  })
})
