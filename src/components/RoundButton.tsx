import React, {useMemo} from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const DEFAULT_RADIUS = 23;

type RoundButtonProps = {
  radius?: number;
  style?: StyleProp<ViewStyle>;
} & TouchableOpacityProps;
export const RoundButton: React.FC<RoundButtonProps> = React.memo(
  ({children, style, radius = DEFAULT_RADIUS, disabled, ...props}) => {
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
          {backgroundColor: disabled ? '#ddd' : '#ccc'},
        ]}>
        {children}
      </TouchableOpacity>
    );
  },
);

const s = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    justifyContent: 'center',
  },
});
