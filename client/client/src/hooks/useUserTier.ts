import { useState, useEffect } from 'react';

export type UserTier = 'basic' | 'pro';

export function useUserTier() {
  const [userTier, setUserTier] = useState<UserTier>('basic');
  
  useEffect(() => {
    // Get user tier from localStorage or default to basic
    const savedTier = localStorage.getItem('userTier') as UserTier;
    if (savedTier && (savedTier === 'basic' || savedTier === 'pro')) {
      setUserTier(savedTier);
    }
  }, []);
  
  const switchTier = (newTier: UserTier) => {
    console.log("Switching to", newTier, "mode");
    setUserTier(newTier);
    localStorage.setItem('userTier', newTier);
  };
  
  return {
    userTier,
    switchTier,
    isBasic: userTier === 'basic',
    isPro: userTier === 'pro'
  };
}