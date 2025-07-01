/**
 * 应用常量定义
 */

// 路由常量
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const

// API 端点常量
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
} as const

// 本地存储键名
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const

// 主题配置
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

// 语言配置
export const LANGUAGES = {
  ZH: 'zh',
  EN: 'en',
} as const

// 表单验证消息
export const VALIDATION_MESSAGES = {
  REQUIRED: '此字段为必填项',
  EMAIL_INVALID: '请输入有效的电子邮件地址',
  PASSWORD_MIN_LENGTH: '密码必须至少包含6个字符',
  PASSWORD_CONFIRM_MISMATCH: '两次输入的密码不一致',
} as const

// HTTP 状态码
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

// 应用配置
export const APP_CONFIG = {
  NAME: '项目模版',
  VERSION: '1.0.0',
  DESCRIPTION: '基于 React + TypeScript 的现代化项目模版',
  AUTHOR: '开发团队',
  CONTACT_EMAIL: 'support@example.com',
} as const 