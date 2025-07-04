'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import PasswordGenerator from '@/components/PasswordGenerator';
import ClientWrapper from '@/components/ClientWrapper';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { getTranslation } from '@/lib/i18n';

export default function HomePage() {
  const { isDarkMode, history, clearHistory, language } = useAppStore();
  const t = getTranslation(language);

  // 初始化暗色模式
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 获取强度标签
  const getStrengthLabel = (label: string) => {
    switch (label) {
      case 'Very Weak': return t.history.strength.veryWeak;
      case 'Weak': return t.history.strength.weak;
      case 'Fair': return t.history.strength.fair;
      case 'Good': return t.history.strength.good;
      case 'Strong': return t.history.strength.strong;
      default: return label;
    }
  };

  return (
    <ClientWrapper>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* 主标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.mainTitle}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.mainSubtitle}
          </p>
        </div>

        {/* 主要功能区域 */}
        <section id="generator" className="mb-16">
          <PasswordGenerator />
        </section>

        {/* 历史记录区域 */}
        {history.length > 0 && (
          <section id="history" className="mb-16">
            <div className="max-w-2xl mx-auto">
              <div className="card">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {t.history.title}
                  </h2>
                  <Button
                    onClick={clearHistory}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    {t.history.clear}
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {history.slice(0, 10).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-sm text-gray-900 dark:text-gray-100 truncate">
                          {item.password}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(item.timestamp).toLocaleString(language === 'zh' ? 'zh-CN' : language === 'ja' ? 'ja-JP' : language === 'ko' ? 'ko-KR' : 'en-US')} • 
                          强度: {getStrengthLabel(item.strength.label)}
                        </div>
                      </div>
                      <Button
                        onClick={() => navigator.clipboard.writeText(item.password)}
                        variant="ghost"
                        size="icon"
                        className="ml-3"
                        title={t.generatedPassword.copyPassword}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 功能特性区域 */}
        <section id="features" className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              {t.features.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t.features.security.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t.features.security.description}
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t.features.privacy.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t.features.privacy.description}
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t.features.speed.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t.features.speed.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 关于区域 */}
        <section id="about" className="mb-16">
          <div className="max-w-2xl mx-auto card text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t.about.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t.about.description}
            </p>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
            <p className="text-sm mt-2">
              {t.footer.tagline}
            </p>
          </div>
        </div>
      </footer>
    </div>
    </ClientWrapper>
  );
} 