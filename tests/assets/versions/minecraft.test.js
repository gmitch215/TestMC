import { similar } from '../../../assets/versions/minecraft'

test('minecraft#similar', () => {
    expect(similar('1.19')).toBe('1.19.1')
    expect(similar('1.18')).toBe('1.18.1')

    expect(similar('1.18.2')).toBe('1.18.2')
})