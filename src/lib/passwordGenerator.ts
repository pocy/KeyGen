import type { PasswordOptions, PasswordStrength, PasswordType } from '@/types';

// 字符集定义
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const SIMILAR_CHARS = '0O1lI';
const AMBIGUOUS_CHARS = '{}[]()\/\\\'"`~,;.<>';

// 常用单词库（用于生成记忆密码）
const WORDS = [
  'apple', 'brave', 'cloud', 'dream', 'eagle', 'fire', 'green', 'happy',
  'island', 'jungle', 'king', 'light', 'mountain', 'ocean', 'peace', 'quiet',
  'river', 'storm', 'tiger', 'unity', 'victory', 'water', 'wisdom', 'yellow'
];

/**
 * 生成安全的随机数
 */
function getRandomValues(array: Uint32Array): Uint32Array {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    return crypto.getRandomValues(array);
  }
  // Fallback for environments without crypto API
  for (let i = 0; i < array.length; i++) {
    array[i] = Math.floor(Math.random() * 0x100000000);
  }
  return array;
}

/**
 * 生成随机整数
 */
function randomInt(min: number, max: number): number {
  const array = new Uint32Array(1);
  getRandomValues(array);
  return Math.floor((array[0] / 0x100000000) * (max - min)) + min;
}

/**
 * 从字符串中随机选择字符
 */
function randomChar(str: string): string {
  return str[randomInt(0, str.length)];
}

/**
 * 构建字符池
 */
function buildCharacterPool(options: PasswordOptions): string {
  let pool = '';
  
  if (options.includeUppercase) pool += UPPERCASE;
  if (options.includeLowercase) pool += LOWERCASE;
  if (options.includeNumbers) pool += NUMBERS;
  if (options.includeSymbols) pool += SYMBOLS;
  
  if (options.excludeSimilar) {
    pool = pool.split('').filter(char => !SIMILAR_CHARS.includes(char)).join('');
  }
  
  if (options.excludeAmbiguous) {
    pool = pool.split('').filter(char => !AMBIGUOUS_CHARS.includes(char)).join('');
  }
  
  return pool;
}

/**
 * 生成随机密码
 */
export function generateRandomPassword(options: PasswordOptions): string {
  const pool = buildCharacterPool(options);
  
  if (!pool) {
    throw new Error('No character types selected');
  }
  
  let password = '';
  const requiredChars: string[] = [];
  
  // 确保至少包含每种所选字符类型的一个字符
  if (options.includeUppercase) {
    let chars = UPPERCASE;
    if (options.excludeSimilar) chars = chars.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
    if (options.excludeAmbiguous) chars = chars.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
    if (chars) requiredChars.push(randomChar(chars));
  }
  
  if (options.includeLowercase) {
    let chars = LOWERCASE;
    if (options.excludeSimilar) chars = chars.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
    if (options.excludeAmbiguous) chars = chars.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
    if (chars) requiredChars.push(randomChar(chars));
  }
  
  if (options.includeNumbers) {
    let chars = NUMBERS;
    if (options.excludeSimilar) chars = chars.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
    if (chars) requiredChars.push(randomChar(chars));
  }
  
  if (options.includeSymbols) {
    let chars = SYMBOLS;
    if (options.excludeAmbiguous) chars = chars.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
    if (chars) requiredChars.push(randomChar(chars));
  }
  
  // 添加必需字符
  password += requiredChars.join('');
  
  // 填充剩余长度
  for (let i = password.length; i < options.length; i++) {
    password += randomChar(pool);
  }
  
  // 打乱密码字符顺序
  return password.split('').sort(() => randomInt(0, 2) - 1).join('');
}

/**
 * 生成记忆密码
 */
export function generateMemorablePassword(length: number = 16): string {
  const numWords = Math.max(2, Math.floor(length / 6));
  const words: string[] = [];
  
  for (let i = 0; i < numWords; i++) {
    const word = WORDS[randomInt(0, WORDS.length)];
    // 随机大写首字母
    words.push(randomInt(0, 2) === 1 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
  }
  
  let password = words.join('');
  
  // 添加数字和符号以达到所需长度
  while (password.length < length) {
    if (randomInt(0, 2) === 1) {
      password += randomInt(0, 10).toString();
    } else {
      password += randomChar('!@#$%^&*');
    }
  }
  
  return password.slice(0, length);
}

/**
 * 生成PIN码
 */
export function generatePIN(length: number = 6): string {
  let pin = '';
  for (let i = 0; i < length; i++) {
    pin += randomInt(0, 10).toString();
  }
  return pin;
}

/**
 * 生成密码短语
 */
export function generatePassphrase(wordCount: number = 4): string {
  const selectedWords: string[] = [];
  
  for (let i = 0; i < wordCount; i++) {
    selectedWords.push(WORDS[randomInt(0, WORDS.length)]);
  }
  
  return selectedWords.join('-');
}

/**
 * 生成UUID
 */
export function generateUUID(): string {
  const hex = '0123456789abcdef';
  let uuid = '';
  
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += '-';
    } else if (i === 14) {
      uuid += '4'; // UUID version 4
    } else if (i === 19) {
      uuid += hex[randomInt(8, 12)]; // UUID variant
    } else {
      uuid += hex[randomInt(0, 16)];
    }
  }
  
  return uuid;
}

/**
 * 根据类型生成密码
 */
export function generatePassword(type: PasswordType, options: PasswordOptions): string {
  switch (type) {
    case 'random':
      return generateRandomPassword(options);
    case 'memorable':
      return generateMemorablePassword(options.length);
    case 'pin':
      return generatePIN(options.length);
    case 'passphrase':
      return generatePassphrase(Math.max(2, Math.floor(options.length / 6)));
    case 'uuid':
      return generateUUID();
    default:
      return generateRandomPassword(options);
  }
}

/**
 * 评估密码强度
 */
export function evaluatePasswordStrength(password: string): PasswordStrength {
  let score = 0;
  const feedback: string[] = [];
  
  // 长度检查
  if (password.length >= 12) {
    score += 1;
  } else if (password.length >= 8) {
    score += 0.5;
  } else {
    feedback.push('密码长度至少应该8位');
  }
  
  // 字符类型检查
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  const charTypeCount = [hasLowercase, hasUppercase, hasNumbers, hasSymbols].filter(Boolean).length;
  
  if (charTypeCount >= 4) {
    score += 1;
  } else if (charTypeCount >= 3) {
    score += 0.7;
  } else if (charTypeCount >= 2) {
    score += 0.4;
  } else {
    feedback.push('建议使用多种字符类型（大小写字母、数字、符号）');
  }
  
  // 字符重复检查
  const uniqueChars = new Set(password.split('')).size;
  const uniqueRatio = uniqueChars / password.length;
  
  if (uniqueRatio >= 0.8) {
    score += 1;
  } else if (uniqueRatio >= 0.6) {
    score += 0.5;
  } else {
    feedback.push('避免使用重复字符');
  }
  
  // 常见模式检查
  const commonPatterns = [
    /123/g, /abc/g, /qwe/g, /asd/g, /zxc/g,
    /password/gi, /admin/gi, /login/gi
  ];
  
  let hasCommonPattern = false;
  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      hasCommonPattern = true;
      break;
    }
  }
  
  if (!hasCommonPattern) {
    score += 1;
  } else {
    feedback.push('避免使用常见模式或单词');
  }
  
  // 确定最终分数和标签
  const finalScore = Math.min(4, Math.max(0, Math.round(score)));
  
  let label: PasswordStrength['label'];
  
  switch (finalScore) {
    case 0:
    case 1:
      label = 'Very Weak';
      break;
    case 2:
      label = 'Weak';
      break;
    case 3:
      label = 'Fair';
      break;
    case 4:
      label = 'Good';
      break;
    default:
      label = 'Strong';
  }
  
  if (finalScore >= 4 && password.length >= 16) {
    label = 'Strong';
  }
  
  return {
    score: finalScore,
    label,
    feedback: feedback.length > 0 ? feedback : ['密码强度良好']
  };
} 