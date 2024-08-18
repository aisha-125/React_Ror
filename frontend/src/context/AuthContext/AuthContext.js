import {
  createContext,
  useState
} from 'react';

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [userStatus, setUserStatus] = useState('visit');
  const [userData, setUserData] = useState();

  const loginContext = (user) => {
    if (!user.email.includes('@stillhigher.es')) {
      setUserStatus('client');
    } else {
      if (!user.admin) {
        setUserStatus('employee');
      } else {
        setUserStatus('admin');
      }
    }
    setUserData(user);
  };
  
  const logoutContext = () => {
    setUserStatus('visit');
    setUserData();
  };

  return (
    <AuthContext.Provider value={[userStatus, loginContext, logoutContext, userData, setUserData]}>
      {children}
    </AuthContext.Provider>
  );
};
