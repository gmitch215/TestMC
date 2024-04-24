import {expect, test, describe} from '@jest/globals'

import { latest, versions, similar, isAvailable } from '../../../src/assets/versions/minecraft'

describe('minecraft properties', () => {
    test('minecraft.latest', () => {
        expect(latest).toBe(versions.versions[0])
    })
})

describe('minecraft functions', () => {
    test('minecraft#similar', () => {
        expect(similar(latest)).toBe(latest)

        expect(similar('1.20.3')).toBe('1.20.4')
        expect(similar('1.19')).toBe('1.19.1')
        expect(similar('1.18')).toBe('1.18.1')

        expect(similar('1.17.1')).toBe('1.17.1')
        expect(similar('1.18.2')).toBe('1.18.2')
        expect(similar('1.19.4')).toBe('1.19.4')
    })

    test('minecraft#isAvailable', () => {
        expect(isAvailable(latest)).toBe(true)

        expect(isAvailable('1.20.5')).toBe(true)
        expect(isAvailable('1.20.4')).toBe(true)
        expect(isAvailable('1.19.1')).toBe(true)
        expect(isAvailable('1.19')).toBe(true)
        expect(isAvailable('1.18')).toBe(true)
        expect(isAvailable('1.18.2')).toBe(true)

        expect(isAvailable('1.7.10')).toBe(false)
        expect(isAvailable('2.0')).toBe(false)
    })
})
