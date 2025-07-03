import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { 
  PasswordOptions, 
  PasswordHistory, 
  PasswordTemplate, 
  GeneratorSettings,
  PasswordType 
} from '@/types';

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

      // 设置
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      // 历史记录
      history: [],
      addToHistory: (item) =>
        set((state) => {
          if (!state.settings.saveHistory) return state;
          
          const newHistory = [item, ...state.history.slice(0, 49)]; // 保留最近50条
          return { history: newHistory };
        }),
      clearHistory: () => set({ history: [] }),
      removeFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),

      // 模板
      templates: defaultTemplates,
      addTemplate: (template) =>
        set((state) => ({
          templates: [...state.templates, template],
        })),
      removeTemplate: (id) =>
        set((state) => ({
          templates: state.templates.filter((template) => template.id !== id),
        })),
      updateTemplate: (id, updates) =>
        set((state) => ({
          templates: state.templates.map((template) =>
            template.id === id ? { ...template, ...updates } : template
          ),
        })),

      // UI状态
      isDarkMode: false,
      toggleDarkMode: () =>
        set((state) => {
          const newDarkMode = !state.isDarkMode;
          // 更新DOM类名
          if (typeof document !== 'undefined') {
            if (newDarkMode) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
          return { isDarkMode: newDarkMode };
        }),

      // 批量密码
      batchPasswords: [],
      setBatchPasswords: (passwords) => set({ batchPasswords: passwords }),
      clearBatchPasswords: () => set({ batchPasswords: [] }),
    }),
    {
      name: 'keygen-storage',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        settings: state.settings,
        history: state.history,
        templates: state.templates,
        isDarkMode: state.isDarkMode,
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