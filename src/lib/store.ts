import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { 
  PasswordOptions, 
  PasswordHistory, 
  PasswordTemplate, 
  GeneratorSettings,
  PasswordType 
} from '@/types';
import type { Language } from '@/lib/i18n';

interface AppState {
  // 当前生成的密码
  currentPassword: string;
  setCurrentPassword: (password: string) => void;

  // 生成器设置
  settings: GeneratorSettings;
  updateSettings: (settings: Partial<GeneratorSettings>) => void;

  // 密码历史
  history: PasswordHistory[];
  addToHistory: (item: PasswordHistory) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;

  // 密码模板
  templates: PasswordTemplate[];
  addTemplate: (template: PasswordTemplate) => void;
  removeTemplate: (id: string) => void;
  updateTemplate: (id: string, template: Partial<PasswordTemplate>) => void;

  // UI状态
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // 语言设置
  language: Language;
  setLanguage: (language: Language) => void;
  
  // 批量生成的密码
  batchPasswords: string[];
  setBatchPasswords: (passwords: string[]) => void;
  clearBatchPasswords: () => void;
}

// 默认密码选项
const defaultPasswordOptions: PasswordOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeSimilar: false,
  excludeAmbiguous: false,
};

// 默认生成器设置
const defaultSettings: GeneratorSettings = {
  type: 'random',
  options: defaultPasswordOptions,
  batchCount: 5,
  saveHistory: true,
};

// 默认模板
const defaultTemplates: PasswordTemplate[] = [
  {
    id: 'website',
    name: '网站密码',
    description: '适用于网站账户的强密码',
    options: {
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      excludeSimilar: true,
      excludeAmbiguous: false,
    },
    isDefault: true,
  },
  {
    id: 'simple',
    name: '简单密码',
    description: '只包含字母和数字的密码',
    options: {
      length: 12,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: false,
      excludeSimilar: true,
      excludeAmbiguous: false,
    },
    isDefault: true,
  },
  {
    id: 'secure',
    name: '高安全密码',
    description: '包含所有字符类型的超强密码',
    options: {
      length: 24,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      excludeSimilar: true,
      excludeAmbiguous: true,
    },
    isDefault: true,
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 密码状态
      currentPassword: '',
      setCurrentPassword: (password) => set({ currentPassword: password }),

      // 生成器设置
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      // 密码历史
      history: [],
      addToHistory: (item) =>
        set((state) => ({
          history: [item, ...state.history.slice(0, 99)], // 保留最近100条记录
        })),
      clearHistory: () => set({ history: [] }),
      removeFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),

      // 密码模板
      templates: defaultTemplates,
      addTemplate: (template) =>
        set((state) => ({
          templates: [...state.templates, template],
        })),
      removeTemplate: (id) =>
        set((state) => ({
          templates: state.templates.filter((template) => template.id !== id),
        })),
      updateTemplate: (id, updatedTemplate) =>
        set((state) => ({
          templates: state.templates.map((template) =>
            template.id === id ? { ...template, ...updatedTemplate } : template
          ),
        })),

      // UI状态
      isDarkMode: false,
      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),

      // 语言设置
      language: 'zh' as Language,
      setLanguage: (language) => set({ language }),

      // 批量生成
      batchPasswords: [],
      setBatchPasswords: (passwords) => set({ batchPasswords: passwords }),
      clearBatchPasswords: () => set({ batchPasswords: [] }),
    }),
    {
      name: 'keygen-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        settings: state.settings,
        history: state.history,
        templates: state.templates,
        isDarkMode: state.isDarkMode,
        language: state.language,
      }),
    }
  )
);

// 在客户端初始化暗色模式
if (typeof window !== 'undefined') {
  // 等待组件挂载后再初始化
  setTimeout(() => {
    const store = useAppStore.getState();
    if (store.isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, 0);
} 