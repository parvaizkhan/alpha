import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type ActionBase<K, V = void> = V extends void
  ? {type: K}
  : {type: K} & V;

export type Dictionary<T> = {
  [key: string]: T;
};

export type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
};

export type MessagePayload = {
  createdBy: {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
  };
  text: string;
  createdAt: FirebaseFirestoreTypes.Timestamp | null;
};
export type Message = FirebaseFirestoreTypes.QueryDocumentSnapshot<MessagePayload>;
