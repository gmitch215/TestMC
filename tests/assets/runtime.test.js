import {expect, test} from '@jest/globals'

import {runtimes} from '../../src/assets/runtime.js'

test('runtime.download', () => {
    for (const k in runtimes) {
        const runtime = runtimes[k]

        const download = runtime['download'] ?? 'url'
        if (download === 'url' || download === 'git')
            expect(runtime).toHaveProperty('url')

        if (download === 'buildtools') {
            expect(runtime).toHaveProperty('flags')
            expect(runtime).toHaveProperty('output')
        }
    }
})

test('runtime.url', () => {
    for (const k in runtimes) {
        const runtime = runtimes[k]

        if (runtime['url']) {
            const url = runtime['url']
            expect(url.startsWith('https')).toBe(true)
        }
    }
})
