"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface User {
  name: string;
  email: string;
  points: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => void;
  signup: (name: string, email: string, pass: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const login = (email: string, pass: string) => {
    // Mock login logic
    if (email && pass) {
      const mockUser = {
        name: "Alex Doe",
        email: email,
        points: 150,
      };
      setUser(mockUser);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
      router.push("/dashboard");
    } else {
        toast({
            title: "Login Failed",
            description: "Please check your email and password.",
            variant: "destructive",
        });
    }
  };
  
  const signup = (name: string, email: string, pass: string) => {
    // Mock signup logic
    if (name && email && pass) {
        const newUser = {
            name,
            email,
            points: 50, // Starting points
        };
        setUser(newUser);
        toast({
            title: "Account Created!",
            description: `Welcome to ReWear Revolution, ${name}!`,
        });
        router.push('/dashboard');
    } else {
        toast({
            title: "Signup Failed",
            description: "Please fill in all fields.",
            variant: "destructive",
        });
    }
  };

  const logout = () => {
    setUser(null);
    router.push("/");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
