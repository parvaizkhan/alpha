import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {StylesGenerator, useStyles} from '@alpha/hooks';
import {Button} from './Button';

export type LogoutButtonProps = {
  onPress?(): void;
};
export const LogoutButton = React.memo<LogoutButtonProps>(({onPress}) => {
  const s = useStyles(makeStyles);

  return (
    <Button vanilla {...{onPress}} style={s.container}>
      <Icon name={'exit-outline'} size={25} style={s.icon} />
    </Button>
  );
});

const makeStyles: StylesGenerator = ({spacing}) =>
  StyleSheet.create({
    icon: {
      marginHorizontal: spacing.m,
    },
  });
