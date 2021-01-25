import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useStyles, Theme} from '@alpha/hooks';
import {Button} from './Button';

export type LogoutButtonProps = {
  onPress?(): void;
};
export const LogoutButton = React.memo<LogoutButtonProps>(({onPress}) => {
  const s = useStyles(makeStyles);

  return (
    <Button vanilla {...{onPress}}>
      <Icon name={'exit-outline'} size={25} style={s.icon} />
    </Button>
  );
});

const makeStyles = ({spacing}: Theme) =>
  StyleSheet.create({
    icon: {
      marginHorizontal: spacing.m,
    },
  });
