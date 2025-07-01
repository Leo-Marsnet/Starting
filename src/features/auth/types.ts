/**
 * 用户认证相关的类型定义
 */

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
} 