import {createContext, useContext} from 'react';
import {User} from '@alpha/types';
import {EMPTY_USER} from '@alpha/constants';

type Store = {
  user: User;
};

export const StoreContext = createContext<Store>({
  user: EMPTY_USER,
});
export const useStore = () => useContext(StoreContext);
