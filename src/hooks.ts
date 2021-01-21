import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useTheme as UseAppTheme} from '@shopify/restyle';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';

import {Theme} from '@alpha/theme';

export const useTheme = () => UseAppTheme<Theme>();

type Styles = ReturnType<typeof StyleSheet.create>;
export type StylesGenerator = (theme: Theme, insets: EdgeInsets) => Styles;
export function useStyles(getThemedStyle: StylesGenerator): Styles {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return useMemo(() => getThemedStyle(theme, insets), [
    theme,
    insets,
    getThemedStyle,
  ]);
}
