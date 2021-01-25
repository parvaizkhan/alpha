import {useMemo} from 'react';
import {useTheme as UseAppTheme} from '@shopify/restyle';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';

import {Theme} from '@alpha/theme';

export type {Theme, EdgeInsets};

export const useTheme = () => UseAppTheme<Theme>();

export function useStyles<T>(
  getThemedStyle: (theme: Theme, insets: EdgeInsets) => T,
): T {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return useMemo(() => getThemedStyle(theme, insets), [
    theme,
    insets,
    getThemedStyle,
  ]);
}
