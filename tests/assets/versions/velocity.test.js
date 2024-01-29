import {expect, test} from '@jest/globals'

import { latest, isAvailable } from '../../../src/assets/versions/velocity'

test('velocity#isAvailable', () => {
    expect(isAvailable(latest)).toBe(true)

    expect(isAvailable('3.3.0-SNAPSHOT')).toBe(true)
    expect(isAvailable('3.2.0-SNAPSHOT')).toBe(true)
})