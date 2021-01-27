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

export type Message = {
  id: string;
  ownerID: string;
  text: string;
};
