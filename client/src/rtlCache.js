import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

export function createRtlCache() {
  return createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
  });
}
