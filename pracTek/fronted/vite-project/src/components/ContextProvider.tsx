import React, { createContext, useState, ReactNode, useEffect } from 'react';

type User = {
  firstName: string;
  lastName: string;
  emailOrPhone: string;
  password: string;
  isCompany: boolean;
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
        console.log("Sending user data to server:", user);
        try {
          const response = await fetch('http://localhost:5000/api/msps', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });

          if (response.ok) {
            const data = await response.json();
            console.log("User created:", data);
          } else {
            const errorData = await response.json();  // קריאת המידע אם יש שגיאה
            console.error('Error creating user:', response.statusText, errorData);
          }
        } catch (error) {
          console.error('Error:', error);
        }
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
