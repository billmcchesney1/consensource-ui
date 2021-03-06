import React, { FC, createContext } from 'react';
import { stores, User } from 'stores';

/**
 * Setting the default value to `{} as User` is a hack to
 * prevent TS from complaining about a potentially null
 * default value.
 *
 * By default, React will only use the default value passed to
 * `createContext` if a provider is not found. Since we are
 * explicitly wrapping the app in an `AuthProvider`, this default
 * value will never be used.
 */
export const AuthContext = createContext({} as User);

export interface AuthProviderProps {
  user: User;
}

export const AuthProvider: FC<AuthProviderProps> = ({ user, children }) => {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const StoresContext = createContext(stores);
