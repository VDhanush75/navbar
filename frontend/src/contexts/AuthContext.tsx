import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import toast from 'react-hot-toast';

interface UserData {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'customer' | 'admin' | 'delivery';
  createdAt: Date;
  orders?: string[];
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  signup: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  updateUserProfile: (data: Partial<UserData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string, name: string, phone?: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      
      const newUserData: UserData = {
        uid: user.uid,
        name,
        email,
        phone: phone || '',
        address: '',
        role: 'customer',
        createdAt: new Date(),
        orders: [],
      };

      await setDoc(doc(db, 'users', user.uid), newUserData);
      setUserData(newUserData);
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      
      // Check if user data exists, if not create it
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        const newUserData: UserData = {
          uid: user.uid,
          name: user.displayName || 'User',
          email: user.email || '',
          phone: '',
          address: '',
          role: 'customer',
          createdAt: new Date(),
          orders: [],
        };
        await setDoc(doc(db, 'users', user.uid), newUserData);
        setUserData(newUserData);
      }
      toast.success('Signed in with Google!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in with Google');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error('Failed to logout');
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<UserData>) => {
    if (!currentUser || !userData) return;
    
    try {
      const updatedData = { ...userData, ...data };
      await setDoc(doc(db, 'users', currentUser.uid), updatedData, { merge: true });
      setUserData(updatedData);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error('Failed to update profile');
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userData,
    loading,
    signup,
    login,
    logout,
    googleSignIn,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};