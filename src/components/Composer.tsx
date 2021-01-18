import React from 'react';
import {
  Text,
  View,
  Platform,
  TextInput,
  StyleSheet,
  TextInputProps,
  InputAccessoryView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {RoundButton} from './RoundButton';

const BUTTON_OFFSET = 3;
const COMPOSER_HEIGHT = 52;
const COMPOSER_RADIUS = COMPOSER_HEIGHT / 2;
const BUTTON_RADIUS = COMPOSER_RADIUS - BUTTON_OFFSET;

type ComposerProps = {
  message: string;
  onChangeMessage(text: string): void;
} & Omit<TextInputProps, 'value' | 'onChangeText'>;
export const Composer: React.FC<ComposerProps> = React.memo(
  ({message, onChangeMessage, ...props}) => {
    const composer = (
      <View style={s.container}>
        <View>
          <TextInput
            multiline
            scrollEnabled
            style={s.textInput}
            selectionColor={'#ccc'}
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

    if (Platform.OS === 'ios') {
      return <InputAccessoryView>{composer}</InputAccessoryView>;
    }

    return composer;
  },
);

const s = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingHorizontal: 5,
    minHeight: COMPOSER_HEIGHT,
  },
  textInput: {
    flex: 1,
    padding: 0,
    fontSize: 16,
    color: '#555',
    maxHeight: 148,
    paddingTop: 15,
    borderWidth: 1,
    paddingBottom: 15,
    borderColor: '#ccc',
    paddingHorizontal: 18,
    backgroundColor: 'white',
    textDecorationColor: '#ccc',
    minHeight: COMPOSER_HEIGHT,
    borderRadius: COMPOSER_RADIUS,
  },
  button: {
    top: BUTTON_OFFSET,
    right: BUTTON_OFFSET,
    bottom: BUTTON_OFFSET,
    position: 'absolute',
  },
  icon: {
    marginLeft: 5,
  },
});
