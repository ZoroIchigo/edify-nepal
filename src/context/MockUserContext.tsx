import { createContext, useContext, useState, ReactNode } from "react";

export interface MockUser {
  name: string;
  role: string;
  grade: string;
}

interface MockUserContextType {
  user: MockUser | null;
  login: (user: MockUser) => void;
  logout: () => void;
}

const MockUserContext = createContext<MockUserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useMockUser = () => useContext(MockUserContext);

export const MockUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  return (
    <MockUserContext.Provider value={{ user, login: setUser, logout: () => setUser(null) }}>
      {children}
    </MockUserContext.Provider>
  );
};
