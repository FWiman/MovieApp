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
  /// FIXA SÅ ATT MAN FAKTISKT LOGGAS IN. TEX ATT SÅ FORT DITT KONTO
  /// "GODKÄNTS SÅ SKA NAVBAREN MED ANNARS STANNAR MAN PÅ LOGINPAGEN"
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  return (
    <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
