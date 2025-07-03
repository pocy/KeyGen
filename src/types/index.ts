export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
}

export interface PasswordHistory {
  id: string;
  password: string;
  strength: PasswordStrength;
  timestamp: number;
  options: PasswordOptions;
}

export interface PasswordStrength {
  score: number; // 0-4
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong';
  feedback: string[];
}

export interface PasswordTemplate {
  id: string;
  name: string;
  description: string;
  options: PasswordOptions;
  isDefault?: boolean;
}

export type PasswordType = 'random' | 'memorable' | 'pin' | 'passphrase' | 'uuid';

export interface GeneratorSettings {
  type: PasswordType;
  options: PasswordOptions;
  batchCount: number;
  saveHistory: boolean;
} 