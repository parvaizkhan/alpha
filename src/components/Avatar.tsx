import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useStyles, Theme} from '@alpha/hooks';

export type AvatarProps = {
  uri?: string;
};
export const Avatar = React.memo<AvatarProps>(({uri}) => {
  const s = useStyles(makeStyles);
  return (
    <View style={s.container}>
      {uri ? (
        <Image source={{uri}} style={s.avatar} />
      ) : (
        <Icon name={'person-outline'} size={20} style={s.icon} />
      )}
    </View>
  );
});

const makeStyles = ({spacing, colors}: Theme) =>
  StyleSheet.create({
    container: {
      width: 33,
      height: 33,
      borderWidth: 1.5,
      borderRadius: 16.5,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: spacing.s,
      marginHorizontal: spacing.m,
      borderColor: colors.buttonPrimary,
    },
    avatar: {
      width: 33,
      height: 33,
      borderRadius: 16.5,
    },
    icon: {
      marginBottom: 2,
    },
  });
