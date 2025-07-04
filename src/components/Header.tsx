'use client';

import { useState } from 'react';
import { Moon, Sun, Menu, X, Shield } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getTranslation } from '@/lib/i18n';

export default function Header() {
  const { isDarkMode, toggleDarkMode, language } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = getTranslation(language);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t.title}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#generator"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
            >
              {t.nav.generator}
            </a>
            <a
              href="#history"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
            >
              {t.nav.history}
            </a>
            <a
              href="#templates"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
            >
              {t.nav.templates}
            </a>
            <a
              href="#about"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
            >
              {t.nav.about}
            </a>
          </nav>

          {/* 操作按钮 */}
          <div className="flex items-center space-x-3">
            {/* 语言切换 */}
            <LanguageSwitcher />

            {/* 主题切换 */}
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="icon"
              title={isDarkMode ? t.theme.light : t.theme.dark}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            {/* 移动端菜单按钮 */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* 移动端导航菜单 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-3">
              <a
                href="#generator"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.generator}
              </a>
              <a
                href="#history"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.history}
              </a>
              <a
                href="#templates"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.templates}
              </a>
              <a
                href="#about"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.about}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 