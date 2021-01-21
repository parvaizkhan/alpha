import React from 'react';
import {ThemeProvider} from '@shopify/restyle';

import theme from './theme';

import Alpha from './Alpha';

export default () => {
  return (
    <ThemeProvider {...{theme}}>
      <Alpha />
    </ThemeProvider>
  );
};
