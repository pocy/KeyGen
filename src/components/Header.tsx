'use client';

import { useState } from 'react';
import { Moon, Sun, Menu, X, Github, Shield } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                KeyGen
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                智能密码生成器
              </p>
            </div>
          </div>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#generator"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
            >
              密码生成器
            </a>
            <a
              href="#history"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
            >
              历史记录
            </a>
            <a
              href="#templates"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
            >
              密码模板
            </a>
            <a
              href="#about"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
            >
              关于
            </a>
          </nav>

          {/* 操作按钮 */}
          <div className="flex items-center space-x-3">
            {/* GitHub链接 */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              title="查看源码"
            >
              <Github size={20} />
            </a>

            {/* 主题切换 */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              title={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
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
                密码生成器
              </a>
              <a
                href="#history"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                历史记录
              </a>
              <a
                href="#templates"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                密码模板
              </a>
              <a
                href="#about"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                关于
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 