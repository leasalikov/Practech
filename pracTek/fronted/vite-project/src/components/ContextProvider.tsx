import React, { createContext, useState, ReactNode, useEffect } from 'react';

type User = {
  first_name: string;
  last_name: string;
  email: string;
};

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  createUser: (userData: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const createUser = (userData: User) => {
    setUser(userData);
  };
  useEffect(() => {
    const postUserData = async () => {
      if (user) {
        if (!user.first_name || !user.last_name) {
          console.error('Missing required fields');
          return;
        }
        console.log("Sending user data to server:", user);
      }
    };
    postUserData();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, createUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };