'use client';

import { useState, useCallback, useMemo } from 'react';
import { Copy, RefreshCw, Settings, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { generatePassword, evaluatePasswordStrength } from '@/lib/passwordGenerator';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import { Button } from '@/components/ui/button';
import { getTranslation } from '@/lib/i18n';
import type { PasswordType } from '@/types';

export default function PasswordGenerator() {
  const {
    currentPassword,
    setCurrentPassword,
    settings,
    updateSettings,
    addToHistory,
    language,
  } = useAppStore();

  const t = getTranslation(language);

  const passwordTypes: { value: PasswordType; label: string; description: string }[] = [
    { 
      value: 'random', 
      label: t.passwordTypes.random.label, 
      description: t.passwordTypes.random.description 
    },
    { 
      value: 'memorable', 
      label: t.passwordTypes.memorable.label, 
      description: t.passwordTypes.memorable.description 
    },
    { 
      value: 'pin', 
      label: t.passwordTypes.pin.label, 
      description: t.passwordTypes.pin.description 
    },
    { 
      value: 'passphrase', 
      label: t.passwordTypes.passphrase.label, 
      description: t.passwordTypes.passphrase.description 
    },
    { 
      value: 'uuid', 
      label: t.passwordTypes.uuid.label, 
      description: t.passwordTypes.uuid.description 
    },
  ];

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
          {t.passwordTypes.title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {passwordTypes.map((type) => (
            <Button
              key={type.value}
              onClick={() => updateType(type.value)}
              variant={settings.type === type.value ? "default" : "outline"}
              className={`p-3 h-auto text-left justify-start ${
                settings.type === type.value
                  ? ''
                  : 'hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex flex-col items-start">
                <div className="font-medium text-sm">
                  {type.label}
                </div>
                <div className="text-xs opacity-70 mt-1">
                  {type.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* 密码选项 (仅对随机密码显示) */}
      {settings.type === 'random' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {t.passwordOptions.title}
          </h3>
          
          {/* 密码长度 */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t.passwordOptions.length}
              </label>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {settings.options.length} {t.passwordOptions.lengthUnit}
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
                {t.passwordOptions.uppercase}
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
                {t.passwordOptions.lowercase}
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
                {t.passwordOptions.numbers}
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
                {t.passwordOptions.symbols}
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
                {t.passwordOptions.excludeSimilar}
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
                {t.passwordOptions.excludeAmbiguous}
              </span>
            </label>
          </div>
        </div>
      )}

      {/* 生成的密码 */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t.generatedPassword.title}
          </h3>
          <div className="flex space-x-2">
            <Button
              onClick={() => setShowPassword(!showPassword)}
              variant="ghost"
              size="icon"
              title={showPassword ? t.generatedPassword.hidePassword : t.generatedPassword.showPassword}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
            <Button
              onClick={copyToClipboard}
              disabled={!currentPassword}
              variant="ghost"
              size="icon"
              className={copySuccess ? 'text-green-500' : ''}
              title={t.generatedPassword.copyPassword}
            >
              <Copy size={18} />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={showPassword ? currentPassword : '•'.repeat(currentPassword.length)}
              readOnly
              className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-lg text-gray-900 dark:text-gray-100 focus:outline-none"
              placeholder={t.generatedPassword.placeholder}
            />
          </div>

          <Button
            onClick={generateNewPassword}
            disabled={isGenerating}
            size="lg"
            className={`w-full ${
              isGenerating ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw size={18} className={isGenerating ? 'animate-spin' : ''} />
            <span>{isGenerating ? t.generatedPassword.generating : t.generatedPassword.generate}</span>
          </Button>

          {copySuccess && (
            <div className="text-center text-sm text-green-600 dark:text-green-400">
              {t.generatedPassword.copied}
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