import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {User, Message} from '@alpha/types';
import {formatRelative} from 'date-fns';
import enUS from 'date-fns/locale/en-US';

export const generateAppUser = ({
  uid,
  displayName,
  email,
  emailVerified,
  isAnonymous,
  phoneNumber,
  photoURL,
  providerId,
}: FirebaseAuthTypes.User): User => ({
  uid,
  displayName,
  email,
  emailVerified,
  isAnonymous,
  phoneNumber,
  photoURL,
  providerId,
});

export const groupMessagesByDate = (messages: Message[]) =>
  messages.reduce((messageGroups, currentMessage) => {
    const currentGroup = messageGroups[messageGroups.length - 1];
    const currentMessageDate = currentMessage.data().createdAt?.toDate();

    if (currentMessageDate) {
      currentMessageDate.setHours(0, 0, 0, 0);
      const nextGroup = {
        title: currentMessageDate.toISOString(),
        data: [currentMessage],
      };

      if (currentGroup) {
        const currentGroupDate = new Date(currentGroup.title);
        currentGroupDate.setHours(0, 0, 0, 0);

        if (currentMessageDate.getTime() === currentGroupDate.getTime()) {
          messageGroups[messageGroups.length - 1] = {
            ...currentGroup,
            data: [...currentGroup.data, currentMessage],
          };
        } else {
          messageGroups[messageGroups.length] = {
            index: messageGroups.length,
            ...nextGroup,
          };
        }
      } else {
        messageGroups[0] = {index: 0, ...nextGroup};
      }
    }

    return messageGroups;
  }, [] as {title: string; index: number; data: Message[]}[]);

const formatRelativeLocale = {
  lastWeek: 'MMMM dd, yyyy',
  yesterday: "'Yesterday'",
  today: "'Today'",
  tomorrow: "'Tomorrow'",
  nextWeek: 'MMMM dd, yyyy',
  other: 'MMMM dd, yyyy',
};

const locale: Locale = {
  ...enUS,
  formatRelative: (token) =>
    formatRelativeLocale[token as keyof typeof formatRelativeLocale],
};

export const formatDateRelative = (date: Date) => {
  return formatRelative(date, Date.now(), {
    locale,
  });
};
