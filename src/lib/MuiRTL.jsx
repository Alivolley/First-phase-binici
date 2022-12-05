import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export const MuiRTL = props => {
  return (
    <CacheProvider value={cacheRtl}>
      <div dir="rtl" style={{ width: '100%', direction: 'rtl' }}>
        {props.children}
      </div>
    </CacheProvider>
  );
};
