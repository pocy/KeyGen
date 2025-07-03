'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import PasswordGenerator from '@/components/PasswordGenerator';
import ClientWrapper from '@/components/ClientWrapper';
import { useAppStore } from '@/lib/store';

export default function HomePage() {
  const { isDarkMode, history, clearHistory } = useAppStore();

  // 初始化暗色模式
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ClientWrapper>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* 主标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            智能密码生成器
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            安全、简单、高效的密码生成解决方案。所有密码在本地生成，保护您的隐私安全。
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
                    密码历史记录
                  </h2>
                  <button
                    onClick={clearHistory}
                    className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    清空历史
                  </button>
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
                          {new Date(item.timestamp).toLocaleString('zh-CN')} • 
                          强度: {item.strength.label === 'Very Weak' ? '极弱' :
                                 item.strength.label === 'Weak' ? '弱' :
                                 item.strength.label === 'Fair' ? '一般' :
                                 item.strength.label === 'Good' ? '良好' : '强'}
                        </div>
                      </div>
                      <button
                        onClick={() => navigator.clipboard.writeText(item.password)}
                        className="ml-3 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        title="复制密码"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
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
              主要特性
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  安全可靠
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  使用Web Crypto API生成真随机数，确保密码的安全性和不可预测性
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  隐私保护
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  所有密码在本地生成，不会发送到任何服务器，完全保护您的隐私
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  快速便捷
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  一键生成密码，支持多种类型，实时强度评估，操作简单高效
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 关于区域 */}
        <section id="about" className="mb-16">
          <div className="max-w-2xl mx-auto card text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              关于 KeyGen
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              KeyGen 是一个开源的密码生成器，致力于为用户提供安全、便捷的密码生成服务。
              我们相信安全不应该以牺牲便利性为代价，因此设计了这个简单易用但功能强大的工具。
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>查看源码</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 KeyGen. Made with ❤️ for better security.</p>
            <p className="text-sm mt-2">
              开源项目 • 隐私保护 • 完全免费
            </p>
          </div>
        </div>
      </footer>
    </div>
    </ClientWrapper>
  );
} 