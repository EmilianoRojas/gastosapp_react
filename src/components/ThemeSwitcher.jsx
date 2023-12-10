'use client';

import { useTheme } from 'next-themes';
import React from 'react';
import { useEffect, useState } from 'react';
import { Switch } from '@nextui-org/react';
import { MoonIcon } from '../assets/Icons/MoonIcon';
import { SunIcon } from '../assets/Icons/SunIcon';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Determine if the current theme is dark
  const isDarkMode = theme === 'dark';

  return (
    <Switch
      defaultSelected
      size="lg"
      color="primary"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      isSelected={isDarkMode}
      onValueChange={toggleTheme}
    />
  );
}
