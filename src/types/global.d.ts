/**
 * 全局类型定义
 */

// 通用API响应类型
export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  code: number;
  success: boolean;
}

// 分页数据类型
export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 表单字段类型
export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio";
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// 路由元信息类型
export interface RouteMeta {
  title?: string;
  requiresAuth?: boolean;
  roles?: string[];
  icon?: string;
  hidden?: boolean;
}

// 菜单项类型
export interface MenuItem {
  id: string;
  title: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
  meta?: RouteMeta;
}

// 主题颜色类型
export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

// 环境变量类型扩展
declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_VERSION: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_DEV_TOOLS: string;
    readonly VITE_MOCK_API: string;
    readonly VITE_ANALYTICS_ID: string;
    readonly VITE_SENTRY_DSN: string;
    readonly VITE_ENABLE_PWA: string;
    readonly VITE_ENABLE_OFFLINE: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// 通用工具类型
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Recordable<T = unknown> = Record<string, T>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 函数类型
export type VoidFunction = () => void;
export type AnyFunction = (...args: unknown[]) => unknown;
export type PromiseFunction<T = unknown> = (...args: unknown[]) => Promise<T>;

// 组件Props类型
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

// 表格列定义类型
export interface TableColumn<T = unknown> {
  key: keyof T | string;
  title: string;
  dataIndex?: keyof T;
  width?: number | string;
  align?: "left" | "center" | "right";
  fixed?: "left" | "right";
  sorter?: boolean;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
}
