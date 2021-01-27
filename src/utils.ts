import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {User} from '@alpha/types';

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
