'use client';

import { useMemo } from 'react';
import type { PasswordStrength } from '@/types';

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
  className?: string;
}

export default function PasswordStrengthIndicator({ 
  strength, 
  className = '' 
}: PasswordStrengthIndicatorProps) {
  const { colorClass, bgClass, textClass } = useMemo(() => {
    switch (strength.label) {
      case 'Very Weak':
        return {
          colorClass: 'bg-red-500',
          bgClass: 'bg-red-100 dark:bg-red-900/20',
          textClass: 'text-red-600 dark:text-red-400'
        };
      case 'Weak':
        return {
          colorClass: 'bg-orange-500',
          bgClass: 'bg-orange-100 dark:bg-orange-900/20',
          textClass: 'text-orange-600 dark:text-orange-400'
        };
      case 'Fair':
        return {
          colorClass: 'bg-yellow-500',
          bgClass: 'bg-yellow-100 dark:bg-yellow-900/20',
          textClass: 'text-yellow-600 dark:text-yellow-400'
        };
      case 'Good':
        return {
          colorClass: 'bg-blue-500',
          bgClass: 'bg-blue-100 dark:bg-blue-900/20',
          textClass: 'text-blue-600 dark:text-blue-400'
        };
      case 'Strong':
        return {
          colorClass: 'bg-green-500',
          bgClass: 'bg-green-100 dark:bg-green-900/20',
          textClass: 'text-green-600 dark:text-green-400'
        };
      default:
        return {
          colorClass: 'bg-gray-500',
          bgClass: 'bg-gray-100 dark:bg-gray-900/20',
          textClass: 'text-gray-600 dark:text-gray-400'
        };
    }
  }, [strength.label]);

  const strengthLabels = {
    'Very Weak': '极弱',
    'Weak': '弱',
    'Fair': '一般',
    'Good': '良好',
    'Strong': '强'
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* 强度条 */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            密码强度
          </span>
          <span className={`text-sm font-semibold ${textClass}`}>
            {strengthLabels[strength.label]}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${colorClass}`}
            style={{ width: `${(strength.score / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* 反馈信息 */}
      {strength.feedback.length > 0 && (
        <div className={`p-3 rounded-lg ${bgClass}`}>
          <h4 className={`text-sm font-medium mb-2 ${textClass}`}>
            建议：
          </h4>
          <ul className="space-y-1">
            {strength.feedback.map((feedback, index) => (
              <li key={index} className={`text-xs ${textClass}`}>
                • {feedback}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 