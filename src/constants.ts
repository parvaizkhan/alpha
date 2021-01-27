import {User} from './types';

export const BRANDING = 'alpha';

export const FORM_CONTROL_HEIGHT = 52;
export const FORM_CONTROL_RADIUS = FORM_CONTROL_HEIGHT / 2;

export const EMPTY_USER: User = {
  uid: '',
  displayName: null,
  email: null,
  emailVerified: false,
  isAnonymous: false,
  phoneNumber: null,
  photoURL: null,
  providerId: '',
};
