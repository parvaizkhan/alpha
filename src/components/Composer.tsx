import React from 'react';
import {View, StyleSheet, TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {TextInput} from './TextInput';
import {RoundButton} from './RoundButton';
import {useTheme, useStyles, Theme} from '@alpha/hooks';
import {FORM_CONTROL_RADIUS, FORM_CONTROL_HEIGHT} from '@alpha/constants';

const BUTTON_OFFSET = 3;
const BUTTON_RADIUS = FORM_CONTROL_RADIUS - BUTTON_OFFSET;

type ComposerProps = {
  message: string;
  onChangeMessage(text: string): void;
} & Omit<TextInputProps, 'value' | 'onChangeText'>;
export const Composer: React.FC<ComposerProps> = React.memo(
  ({message, onChangeMessage, ...props}) => {
    const {colors} = useTheme();
    const s = useStyles(makeStyles);

    return (
      <View style={s.container}>
        <View>
          <TextInput
            multiline
            scrollEnabled
            style={s.textInput}
            selectionColor={colors.inputTextSelection}
            {...props}
            value={message}
            onChangeText={onChangeMessage}
          />
          <RoundButton
            disabled={!message}
            radius={BUTTON_RADIUS}
            style={s.button}>
            <Icon name={'send'} color={'white'} size={25} style={s.icon} />
          </RoundButton>
        </View>
      </View>
    );
  },
);

const makeStyles = ({spacing}: Theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: spacing.m,
      marginHorizontal: spacing.s,
      minHeight: FORM_CONTROL_HEIGHT,
    },
    textInput: {
      maxHeight: 148,
    },
    button: {
      right: BUTTON_OFFSET,
      bottom: BUTTON_OFFSET,
      position: 'absolute',
    },
    icon: {
      marginLeft: spacing.s,
    },
  });
