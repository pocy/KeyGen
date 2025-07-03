'use client';

import { useState, useCallback, useMemo } from 'react';
import { Copy, RefreshCw, Settings, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { generatePassword, evaluatePasswordStrength } from '@/lib/passwordGenerator';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import type { PasswordType } from '@/types';

const passwordTypes: { value: PasswordType; label: string; description: string }[] = [
  { value: 'random', label: '随机密码', description: '包含字母、数字和符号的强密码' },
  { value: 'memorable', label: '记忆密码', description: '基于单词的易记忆密码' },
  { value: 'pin', label: 'PIN码', description: '纯数字密码' },
  { value: 'passphrase', label: '密码短语', description: '多个单词组合的密码' },
  { value: 'uuid', label: 'UUID', description: '唯一标识符格式' },
];

export default function PasswordGenerator() {
  const {
    currentPassword,
    setCurrentPassword,
    settings,
    updateSettings,
    addToHistory,
  } = useAppStore();

  const [showPassword, setShowPassword] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // 计算密码强度
  const passwordStrength = useMemo(() => {
    return currentPassword ? evaluatePasswordStrength(currentPassword) : null;
  }, [currentPassword]);

  // 生成新密码
  const generateNewPassword = useCallback(async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100)); // 短暂延迟以显示动画
      
      const newPassword = generatePassword(settings.type, settings.options);
      setCurrentPassword(newPassword);
      
      // 添加到历史记录
      if (settings.saveHistory && newPassword) {
        const historyItem = {
          id: Date.now().toString(),
          password: newPassword,
          strength: evaluatePasswordStrength(newPassword),
          timestamp: Date.now(),
          options: settings.options,
        };
        addToHistory(historyItem);
      }
    } catch (error) {
      console.error('Failed to generate password:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [settings.type, settings.options, settings.saveHistory, setCurrentPassword, addToHistory]);

  // 复制密码到剪贴板
  const copyToClipboard = useCallback(async () => {
    if (!currentPassword) return;
    
    try {
      await navigator.clipboard.writeText(currentPassword);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy password:', error);
    }
  }, [currentPassword]);

  // 更新密码长度
  const updateLength = useCallback((length: number) => {
    updateSettings({
      options: { ...settings.options, length }
    });
  }, [settings.options, updateSettings]);

  // 更新密码类型
  const updateType = useCallback((type: PasswordType) => {
    updateSettings({ type });
  }, [updateSettings]);

  // 切换字符选项
  const toggleOption = useCallback((option: keyof typeof settings.options) => {
    updateSettings({
      options: { ...settings.options, [option]: !settings.options[option] }
    });
  }, [settings.options, updateSettings]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* 密码类型选择 */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          密码类型
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {passwordTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => updateType(type.value)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                settings.type === type.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                {type.label}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {type.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 密码选项 (仅对随机密码显示) */}
      {settings.type === 'random' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            密码选项
          </h3>
          
          {/* 密码长度 */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                密码长度
              </label>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {settings.options.length} 位
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="128"
              value={settings.options.length}
              onChange={(e) => updateLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>8</span>
              <span>128</span>
            </div>
          </div>

          {/* 字符选项 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.options.includeUppercase}
                onChange={() => toggleOption('includeUppercase')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                大写字母 (A-Z)
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.options.includeLowercase}
                onChange={() => toggleOption('includeLowercase')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                小写字母 (a-z)
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.options.includeNumbers}
                onChange={() => toggleOption('includeNumbers')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                数字 (0-9)
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.options.includeSymbols}
                onChange={() => toggleOption('includeSymbols')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                特殊字符 (!@#$...)
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.options.excludeSimilar}
                onChange={() => toggleOption('excludeSimilar')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                排除易混淆字符
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.options.excludeAmbiguous}
                onChange={() => toggleOption('excludeAmbiguous')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                排除模糊字符
              </span>
            </label>
          </div>
        </div>
      )}

      {/* 生成的密码 */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            生成的密码
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              title={showPassword ? '隐藏密码' : '显示密码'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <button
              onClick={copyToClipboard}
              disabled={!currentPassword}
              className={`p-2 transition-colors ${
                copySuccess
                  ? 'text-green-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              } disabled:opacity-50`}
              title="复制密码"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={showPassword ? currentPassword : '•'.repeat(currentPassword.length)}
              readOnly
              className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-lg text-gray-900 dark:text-gray-100 focus:outline-none"
              placeholder="点击下方按钮生成密码"
            />
          </div>

          <button
            onClick={generateNewPassword}
            disabled={isGenerating}
            className={`w-full btn-primary flex items-center justify-center space-x-2 py-3 ${
              isGenerating ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw size={18} className={isGenerating ? 'animate-spin' : ''} />
            <span>{isGenerating ? '生成中...' : '生成新密码'}</span>
          </button>

          {copySuccess && (
            <div className="text-center text-sm text-green-600 dark:text-green-400">
              密码已复制到剪贴板
            </div>
          )}
        </div>
      </div>

      {/* 密码强度指示器 */}
      {passwordStrength && (
        <div className="card">
          <PasswordStrengthIndicator strength={passwordStrength} />
        </div>
      )}
    </div>
  );
} 