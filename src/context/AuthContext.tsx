import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '@/types';
import { mockUser } from '@/data/internships';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, profile: any) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  saveInternship: (internshipId: string) => void;
  unsaveInternship: (internshipId: string) => void;
  applyToInternship: (internshipId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  isSaved: (internshipId: string) => boolean;
  hasApplied: (internshipId: string) => boolean;
  getApplicationStatus: (internshipId: string) => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Simulate login with mock data
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call
    if (email && password) {
      setUser(mockUser);
      return true;
    }
    return false;
  }, []);

  // Simulate signup
  const signup = useCallback(async (name: string, email: string, _password: string, profile: any): Promise<boolean> => {
    // In a real app, this would make an API call
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      profile: {
        degree: profile.degree || '',
        year: profile.year || '',
        skills: profile.skills || [],
        interests: profile.interests || [],
        location: profile.location || ''
      },
      savedInternships: [],
      appliedInternships: [],
      notifications: []
    };
    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  const saveInternship = useCallback((internshipId: string) => {
    setUser(prev => {
      if (!prev) return null;
      if (prev.savedInternships.includes(internshipId)) return prev;
      return {
        ...prev,
        savedInternships: [...prev.savedInternships, internshipId]
      };
    });
  }, []);

  const unsaveInternship = useCallback((internshipId: string) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        savedInternships: prev.savedInternships.filter(id => id !== internshipId)
      };
    });
  }, []);

  const applyToInternship = useCallback((internshipId: string) => {
    setUser(prev => {
      if (!prev) return null;
      if (prev.appliedInternships.some(app => app.internshipId === internshipId)) return prev;
      return {
        ...prev,
        appliedInternships: [
          ...prev.appliedInternships,
          {
            internshipId,
            appliedDate: new Date().toISOString().split('T')[0],
            status: 'applied'
          }
        ]
      };
    });
  }, []);

  const markNotificationAsRead = useCallback((notificationId: string) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        notifications: prev.notifications.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      };
    });
  }, []);

  const isSaved = useCallback((internshipId: string): boolean => {
    return user?.savedInternships.includes(internshipId) || false;
  }, [user]);

  const hasApplied = useCallback((internshipId: string): boolean => {
    return user?.appliedInternships.some(app => app.internshipId === internshipId) || false;
  }, [user]);

  const getApplicationStatus = useCallback((internshipId: string): string | null => {
    const application = user?.appliedInternships.find(app => app.internshipId === internshipId);
    return application ? application.status : null;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
        saveInternship,
        unsaveInternship,
        applyToInternship,
        markNotificationAsRead,
        isSaved,
        hasApplied,
        getApplicationStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}