import React, {useMemo} from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {useTheme} from '@shopify/restyle';

import {Theme} from '@alpha/theme';
import {StylesGenerator, useStyles} from '@alpha/hooks';

const DEFAULT_RADIUS = 23;

type RoundButtonProps = {
  radius?: number;
  style?: StyleProp<ViewStyle>;
} & TouchableOpacityProps;
export const RoundButton: React.FC<RoundButtonProps> = React.memo(
  ({children, style, radius = DEFAULT_RADIUS, disabled, ...props}) => {
    const {colors} = useTheme<Theme>();
    const s = useStyles(makeStyles);

    const containerStyles: ViewStyle = useMemo(
      () => ({
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
      }),
      [radius],
    );

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        {...{disabled}}
        {...props}
        style={[
          s.container,
          containerStyles,
          StyleSheet.flatten(style),
          {
            backgroundColor: disabled
              ? colors.sendButtonInactive
              : colors.sendButtonActive,
          },
        ]}>
        {children}
      </TouchableOpacity>
    );
  },
);

const makeStyles: StylesGenerator = () =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
