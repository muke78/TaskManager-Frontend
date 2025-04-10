import { useState } from 'react';
import { useEffect } from 'react';

export const useTheme = () => {
  const [changeTheme, setChangeTheme] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setChangeTheme(storedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', changeTheme);
      localStorage.setItem('theme', changeTheme);
    }
  }, [changeTheme, mounted]);

  return {
    changeTheme,
    setChangeTheme,
    mounted,
  };
};
