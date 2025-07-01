/**
 * 环境变量配置
 * 统一管理和验证环境变量
 */

interface EnvConfig {
  // 应用配置
  APP_TITLE: string
  APP_VERSION: string
  
  // API 配置
  API_BASE_URL: string
  
  // 开发配置
  DEV_TOOLS: boolean
  MOCK_API: boolean
  
  // 第三方服务
  ANALYTICS_ID?: string
  SENTRY_DSN?: string
  
  // 功能开关
  ENABLE_PWA: boolean
  ENABLE_OFFLINE: boolean
  
  // 运行环境
  NODE_ENV: 'development' | 'production' | 'test'
  DEV: boolean
  PROD: boolean
}

/**
 * 解析布尔值环境变量
 */
function parseBoolean(value: string | undefined, defaultValue: boolean = false): boolean {
  if (!value) return defaultValue
  return value.toLowerCase() === 'true'
}

/**
 * 获取环境变量配置
 */
function getEnvConfig(): EnvConfig {
  return {
    // 应用配置
    APP_TITLE: import.meta.env.VITE_APP_TITLE || '项目模版',
    APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
    
    // API 配置
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
    
    // 开发配置
    DEV_TOOLS: parseBoolean(import.meta.env.VITE_DEV_TOOLS, true),
    MOCK_API: parseBoolean(import.meta.env.VITE_MOCK_API, false),
    
    // 第三方服务
    ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID,
    SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
    
    // 功能开关
    ENABLE_PWA: parseBoolean(import.meta.env.VITE_ENABLE_PWA, false),
    ENABLE_OFFLINE: parseBoolean(import.meta.env.VITE_ENABLE_OFFLINE, false),
    
    // 运行环境
    NODE_ENV: import.meta.env.MODE as EnvConfig['NODE_ENV'],
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
  }
}

/**
 * 验证必需的环境变量
 */
function validateEnv(config: EnvConfig): void {
  const requiredVars: (keyof EnvConfig)[] = [
    'APP_TITLE',
    'API_BASE_URL',
  ]
  
  const missingVars = requiredVars.filter(key => !config[key])
  
  if (missingVars.length > 0) {
    console.error('缺少必需的环境变量:', missingVars)
    throw new Error(`缺少必需的环境变量: ${missingVars.join(', ')}`)
  }
}

// 创建配置实例
export const env = getEnvConfig()

// 开发环境下验证配置
if (env.DEV) {
  try {
    validateEnv(env)
  } catch (error) {
    console.warn('环境变量验证失败:', error)
  }
}

// 导出类型供其他模块使用
export type { EnvConfig } 