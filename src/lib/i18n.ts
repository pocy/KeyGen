export type Language = 'zh' | 'en' | 'ja' | 'ko';

export interface Translation {
  // Header
  title: string;
  subtitle: string;
  nav: {
    generator: string;
    history: string;
    templates: string;
    about: string;
  };
  
  // Main title
  mainTitle: string;
  mainSubtitle: string;
  
  // Password types
  passwordTypes: {
    title: string;
    random: {
      label: string;
      description: string;
    };
    memorable: {
      label: string;
      description: string;
    };
    pin: {
      label: string;
      description: string;
    };
    passphrase: {
      label: string;
      description: string;
    };
    uuid: {
      label: string;
      description: string;
    };
  };
  
  // Password options
  passwordOptions: {
    title: string;
    length: string;
    lengthUnit: string;
    uppercase: string;
    lowercase: string;
    numbers: string;
    symbols: string;
    excludeSimilar: string;
    excludeAmbiguous: string;
  };
  
  // Generated password
  generatedPassword: {
    title: string;
    placeholder: string;
    hidePassword: string;
    showPassword: string;
    copyPassword: string;
    generating: string;
    generate: string;
    copied: string;
  };
  
  // History
  history: {
    title: string;
    clear: string;
    strength: {
      veryWeak: string;
      weak: string;
      fair: string;
      good: string;
      strong: string;
    };
  };
  
  // Features
  features: {
    title: string;
    security: {
      title: string;
      description: string;
    };
    privacy: {
      title: string;
      description: string;
    };
    speed: {
      title: string;
      description: string;
    };
  };
  
  // About
  about: {
    title: string;
    description: string;
  };
  
  // Footer
  footer: {
    copyright: string;
    tagline: string;
  };
  
  // Theme
  theme: {
    light: string;
    dark: string;
  };
}

export const translations: Record<Language, Translation> = {
  zh: {
    title: 'KeyGen',
    subtitle: '智能密码生成器',
    nav: {
      generator: '密码生成器',
      history: '历史记录',
      templates: '密码模板',
      about: '关于',
    },
    mainTitle: '智能密码生成器',
    mainSubtitle: '安全、简单、高效的密码生成解决方案。所有密码在本地生成，保护您的隐私安全。',
    passwordTypes: {
      title: '密码类型',
      random: {
        label: '随机密码',
        description: '字母数字符号组合',
      },
      memorable: {
        label: '记忆密码',
        description: '基于单词易记忆',
      },
      pin: {
        label: 'PIN码',
        description: '纯数字密码',
      },
      passphrase: {
        label: '密码短语',
        description: '多单词组合',
      },
      uuid: {
        label: 'UUID',
        description: '唯一标识符格式',
      },
    },
    passwordOptions: {
      title: '密码选项',
      length: '密码长度',
      lengthUnit: '位',
      uppercase: '大写字母 (A-Z)',
      lowercase: '小写字母 (a-z)',
      numbers: '数字 (0-9)',
      symbols: '特殊字符 (!@#$...)',
      excludeSimilar: '排除易混淆字符',
      excludeAmbiguous: '排除模糊字符',
    },
    generatedPassword: {
      title: '生成的密码',
      placeholder: '点击下方按钮生成密码',
      hidePassword: '隐藏密码',
      showPassword: '显示密码',
      copyPassword: '复制密码',
      generating: '生成中...',
      generate: '生成新密码',
      copied: '密码已复制到剪贴板',
    },
    history: {
      title: '密码历史记录',
      clear: '清空历史',
      strength: {
        veryWeak: '极弱',
        weak: '弱',
        fair: '一般',
        good: '良好',
        strong: '强',
      },
    },
    features: {
      title: '主要特性',
      security: {
        title: '安全可靠',
        description: '使用Web Crypto API生成真随机数，确保密码的安全性和不可预测性',
      },
      privacy: {
        title: '隐私保护',
        description: '所有密码在本地生成，不会发送到任何服务器，完全保护您的隐私',
      },
      speed: {
        title: '快速便捷',
        description: '一键生成密码，支持多种类型，实时强度评估，操作简单高效',
      },
    },
    about: {
      title: '关于 KeyGen',
      description: 'KeyGen 是一个开源的密码生成器，致力于为用户提供安全、便捷的密码生成服务。我们相信安全不应该以牺牲便利性为代价，因此设计了这个简单易用但功能强大的工具。',
    },
    footer: {
      copyright: 'KeyGen. Made with ❤️ for better security.',
      tagline: '开源项目 • 隐私保护 • 完全免费',
    },
    theme: {
      light: '切换到浅色模式',
      dark: '切换到深色模式',
    },
  },
  en: {
    title: 'KeyGen',
    subtitle: 'Smart Password Generator',
    nav: {
      generator: 'Generator',
      history: 'History',
      templates: 'Templates',
      about: 'About',
    },
    mainTitle: 'Smart Password Generator',
    mainSubtitle: 'Secure, simple, and efficient password generation solution. All passwords are generated locally to protect your privacy.',
    passwordTypes: {
      title: 'Password Types',
      random: {
        label: 'Random',
        description: 'Letters, numbers & symbols',
      },
      memorable: {
        label: 'Memorable',
        description: 'Word-based passwords',
      },
      pin: {
        label: 'PIN Code',
        description: 'Numbers only',
      },
      passphrase: {
        label: 'Passphrase',
        description: 'Multiple words',
      },
      uuid: {
        label: 'UUID',
        description: 'Unique identifier',
      },
    },
    passwordOptions: {
      title: 'Password Options',
      length: 'Password Length',
      lengthUnit: 'characters',
      uppercase: 'Uppercase Letters (A-Z)',
      lowercase: 'Lowercase Letters (a-z)',
      numbers: 'Numbers (0-9)',
      symbols: 'Special Characters (!@#$...)',
      excludeSimilar: 'Exclude Similar Characters',
      excludeAmbiguous: 'Exclude Ambiguous Characters',
    },
    generatedPassword: {
      title: 'Generated Password',
      placeholder: 'Click the button below to generate password',
      hidePassword: 'Hide Password',
      showPassword: 'Show Password',
      copyPassword: 'Copy Password',
      generating: 'Generating...',
      generate: 'Generate New Password',
      copied: 'Password copied to clipboard',
    },
    history: {
      title: 'Password History',
      clear: 'Clear History',
      strength: {
        veryWeak: 'Very Weak',
        weak: 'Weak',
        fair: 'Fair',
        good: 'Good',
        strong: 'Strong',
      },
    },
    features: {
      title: 'Key Features',
      security: {
        title: 'Secure & Reliable',
        description: 'Uses Web Crypto API to generate true random numbers, ensuring password security and unpredictability',
      },
      privacy: {
        title: 'Privacy Protection',
        description: 'All passwords are generated locally and never sent to any server, completely protecting your privacy',
      },
      speed: {
        title: 'Fast & Convenient',
        description: 'One-click password generation, multiple types supported, real-time strength assessment, simple and efficient',
      },
    },
    about: {
      title: 'About KeyGen',
      description: 'KeyGen is an open-source password generator dedicated to providing users with secure and convenient password generation services. We believe security should not come at the expense of convenience, so we designed this simple yet powerful tool.',
    },
    footer: {
      copyright: 'KeyGen. Made with ❤️ for better security.',
      tagline: 'Open Source • Privacy Protected • Completely Free',
    },
    theme: {
      light: 'Switch to light mode',
      dark: 'Switch to dark mode',
    },
  },
  ja: {
    title: 'KeyGen',
    subtitle: 'スマートパスワードジェネレーター',
    nav: {
      generator: 'ジェネレーター',
      history: '履歴',
      templates: 'テンプレート',
      about: 'について',
    },
    mainTitle: 'スマートパスワードジェネレーター',
    mainSubtitle: '安全、シンプル、効率的なパスワード生成ソリューション。すべてのパスワードはローカルで生成され、プライバシーを保護します。',
    passwordTypes: {
      title: 'パスワードタイプ',
      random: {
        label: 'ランダム',
        description: '文字・数字・記号',
      },
      memorable: {
        label: '覚えやすい',
        description: '単語ベース',
      },
      pin: {
        label: 'PIN',
        description: '数字のみ',
      },
      passphrase: {
        label: 'パスフレーズ',
        description: '複数単語',
      },
      uuid: {
        label: 'UUID',
        description: '一意識別子',
      },
    },
    passwordOptions: {
      title: 'パスワードオプション',
      length: 'パスワード長',
      lengthUnit: '文字',
      uppercase: '大文字 (A-Z)',
      lowercase: '小文字 (a-z)',
      numbers: '数字 (0-9)',
      symbols: '特殊文字 (!@#$...)',
      excludeSimilar: '類似文字を除外',
      excludeAmbiguous: '曖昧な文字を除外',
    },
    generatedPassword: {
      title: '生成されたパスワード',
      placeholder: '下のボタンをクリックしてパスワードを生成',
      hidePassword: 'パスワードを非表示',
      showPassword: 'パスワードを表示',
      copyPassword: 'パスワードをコピー',
      generating: '生成中...',
      generate: '新しいパスワードを生成',
      copied: 'パスワードがクリップボードにコピーされました',
    },
    history: {
      title: 'パスワード履歴',
      clear: '履歴をクリア',
      strength: {
        veryWeak: '非常に弱い',
        weak: '弱い',
        fair: '普通',
        good: '良い',
        strong: '強い',
      },
    },
    features: {
      title: '主な機能',
      security: {
        title: '安全で信頼性が高い',
        description: 'Web Crypto APIを使用して真の乱数を生成し、パスワードの安全性と予測不可能性を保証',
      },
      privacy: {
        title: 'プライバシー保護',
        description: 'すべてのパスワードはローカルで生成され、サーバーに送信されることはなく、プライバシーを完全に保護',
      },
      speed: {
        title: '高速で便利',
        description: 'ワンクリックでパスワード生成、複数のタイプをサポート、リアルタイム強度評価、シンプルで効率的',
      },
    },
    about: {
      title: 'KeyGenについて',
      description: 'KeyGenは、ユーザーに安全で便利なパスワード生成サービスを提供することを目的としたオープンソースのパスワードジェネレーターです。セキュリティは利便性を犠牲にすべきではないと考え、このシンプルで強力なツールを設計しました。',
    },
    footer: {
      copyright: 'KeyGen. より良いセキュリティのために❤️で作成',
      tagline: 'オープンソース • プライバシー保護 • 完全無料',
    },
    theme: {
      light: 'ライトモードに切り替え',
      dark: 'ダークモードに切り替え',
    },
  },
  ko: {
    title: 'KeyGen',
    subtitle: '스마트 비밀번호 생성기',
    nav: {
      generator: '생성기',
      history: '기록',
      templates: '템플릿',
      about: '정보',
    },
    mainTitle: '스마트 비밀번호 생성기',
    mainSubtitle: '안전하고 간단하며 효율적인 비밀번호 생성 솔루션. 모든 비밀번호는 로컬에서 생성되어 개인정보를 보호합니다.',
    passwordTypes: {
      title: '비밀번호 유형',
      random: {
        label: '무작위',
        description: '문자·숫자·기호',
      },
      memorable: {
        label: '기억하기 쉬운',
        description: '단어 기반',
      },
      pin: {
        label: 'PIN',
        description: '숫자만',
      },
      passphrase: {
        label: '패스프레이즈',
        description: '여러 단어',
      },
      uuid: {
        label: 'UUID',
        description: '고유 식별자',
      },
    },
    passwordOptions: {
      title: '비밀번호 옵션',
      length: '비밀번호 길이',
      lengthUnit: '자',
      uppercase: '대문자 (A-Z)',
      lowercase: '소문자 (a-z)',
      numbers: '숫자 (0-9)',
      symbols: '특수문자 (!@#$...)',
      excludeSimilar: '유사한 문자 제외',
      excludeAmbiguous: '모호한 문자 제외',
    },
    generatedPassword: {
      title: '생성된 비밀번호',
      placeholder: '아래 버튼을 클릭하여 비밀번호 생성',
      hidePassword: '비밀번호 숨기기',
      showPassword: '비밀번호 보기',
      copyPassword: '비밀번호 복사',
      generating: '생성 중...',
      generate: '새 비밀번호 생성',
      copied: '비밀번호가 클립보드에 복사되었습니다',
    },
    history: {
      title: '비밀번호 기록',
      clear: '기록 지우기',
      strength: {
        veryWeak: '매우 약함',
        weak: '약함',
        fair: '보통',
        good: '좋음',
        strong: '강함',
      },
    },
    features: {
      title: '주요 기능',
      security: {
        title: '안전하고 신뢰할 수 있음',
        description: 'Web Crypto API를 사용하여 진정한 난수를 생성하고 비밀번호의 보안성과 예측 불가능성을 보장',
      },
      privacy: {
        title: '개인정보 보호',
        description: '모든 비밀번호는 로컬에서 생성되며 서버로 전송되지 않아 개인정보를 완전히 보호',
      },
      speed: {
        title: '빠르고 편리함',
        description: '원클릭 비밀번호 생성, 다양한 유형 지원, 실시간 강도 평가, 간단하고 효율적',
      },
    },
    about: {
      title: 'KeyGen 정보',
      description: 'KeyGen은 사용자에게 안전하고 편리한 비밀번호 생성 서비스를 제공하는 것을 목표로 하는 오픈소스 비밀번호 생성기입니다. 보안이 편의성을 희생해서는 안 된다고 믿으며, 이 간단하면서도 강력한 도구를 설계했습니다.',
    },
    footer: {
      copyright: 'KeyGen. 더 나은 보안을 위해 ❤️로 제작',
      tagline: '오픈소스 • 개인정보 보호 • 완전 무료',
    },
    theme: {
      light: '라이트 모드로 전환',
      dark: '다크 모드로 전환',
    },
  },
};

export function getTranslation(lang: Language): Translation {
  return translations[lang] || translations.zh;
} 