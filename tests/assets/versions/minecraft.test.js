import { describe, expect, test } from '@jest/globals';

import { isAvailable, latest, similar, versions } from '../../../src/assets/versions/minecraft';

describe('minecraft versions', () => {
	test('minecraft.versions', () => {
		// ensure they exist at all

		for (const version of versions.versions) {
			expect(version).toBeTruthy();
			expect(isAvailable(version)).toBe(true);

			// perform fetch request
			fetch(`https://hub.spigotmc.org/versions/${version}.json`)
				.then((response) => {
					expect(response.status).toBe(200);
				})
				.catch((error) => {
					// ignore if offline
					if (error instanceof TypeError) {
						expect(error.message).toMatch(/Failed to fetch/);
					} else {
						throw error;
					}
				});
		}
	});
});

describe('minecraft properties', () => {
	test('minecraft.latest', () => {
		expect(latest).toBe(versions.versions[0]);
	});
});

describe('minecraft functions', () => {
	test('minecraft#similar', () => {
		expect(similar(latest)).toBe(latest);

		expect(similar('1.20.3')).toBe('1.20.4');
		expect(similar('1.19')).toBe('1.19.1');
		expect(similar('1.18')).toBe('1.18.1');

		expect(similar('1.17.1')).toBe('1.17.1');
		expect(similar('1.18.2')).toBe('1.18.2');
		expect(similar('1.19.4')).toBe('1.19.4');
	});

	test('minecraft#isAvailable', () => {
		expect(isAvailable(latest)).toBe(true);

		expect(isAvailable('1.20.5')).toBe(true);
		expect(isAvailable('1.20.4')).toBe(true);
		expect(isAvailable('1.19.1')).toBe(true);
		expect(isAvailable('1.19')).toBe(true);
		expect(isAvailable('1.18')).toBe(true);
		expect(isAvailable('1.18.2')).toBe(true);

		expect(isAvailable('1.7.10')).toBe(false);
		expect(isAvailable('2.0')).toBe(false);
	});
});
