import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface IUserContext {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: Dispatch<SetStateAction<boolean>>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
