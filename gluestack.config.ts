import { config as defaultConfig } from '@gluestack-ui/config';
import { createConfig } from '@gluestack-ui/themed';

import { colors, fonts, fontSizes, space } from './src/theme';

export const config = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      ...colors,
    },
    fonts: {
      ...defaultConfig.tokens.fonts,
      ...fonts,
    },
    fontSizes: {
      ...defaultConfig.tokens.fontSizes,
      ...fontSizes,
    },
    space: {
      ...defaultConfig.tokens.space,
      ...space,
    },
  },
});
