/**
 * 统一的 API 客户端配置
 * 基于 fetch API 封装，提供统一的错误处理和请求配置
 */

// API 响应的基础类型
export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  code: number;
  success: boolean;
}

// API 错误类型
export class ApiError extends Error {
  constructor(
    public code: number,
    public message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// 请求配置类型
interface RequestConfig extends RequestInit {
  timeout?: number;
  baseURL?: string;
}

/**
 * HTTP 客户端类
 */
class HttpClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: HeadersInit;

  constructor(
    config: {
      baseURL?: string;
      timeout?: number;
      headers?: HeadersInit;
    } = {},
  ) {
    this.baseURL =
      config.baseURL || import.meta.env.VITE_API_BASE_URL || "/api";
    this.timeout = config.timeout || 10000;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...config.headers,
    };
  }

  /**
   * 处理请求超时
   */
  private createTimeoutPromise(timeout: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new ApiError(408, "请求超时")), timeout);
    });
  }

  /**
   * 处理响应
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get("content-type");

    let data: unknown;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(
        response.status,
        (data as { message?: string })?.message || "请求失败",
        data,
      );
    }

    return data as ApiResponse<T>;
  }

  /**
   * 发起请求
   */
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {},
  ): Promise<ApiResponse<T>> {
    const {
      timeout = this.timeout,
      baseURL = this.baseURL,
      ...fetchConfig
    } = config;

    const url = `${baseURL}${endpoint}`;
    const headers = { ...this.defaultHeaders, ...fetchConfig.headers };

    const fetchPromise = fetch(url, {
      ...fetchConfig,
      headers,
    });

    try {
      const response = await Promise.race([
        fetchPromise,
        this.createTimeoutPromise(timeout),
      ]);

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        0,
        error instanceof Error ? error.message : "网络错误",
      );
    }
  }

  /**
   * GET 请求
   */
  get<T>(endpoint: string, config?: RequestConfig) {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  /**
   * POST 请求
   */
  post<T>(endpoint: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT 请求
   */
  put<T>(endpoint: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE 请求
   */
  delete<T>(endpoint: string, config?: RequestConfig) {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }

  /**
   * 设置认证令牌
   */
  setAuth(token: string) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  /**
   * 移除认证令牌
   */
  removeAuth() {
    const { Authorization, ...headers } = this.defaultHeaders as Record<
      string,
      string
    >;
    this.defaultHeaders = headers;
  }
}

// 创建默认的 API 客户端实例
export const api = new HttpClient();

// 导出工厂函数，用于创建自定义配置的客户端
export const createHttpClient = (config?: {
  baseURL?: string;
  timeout?: number;
  headers?: HeadersInit;
}) => {
  return new HttpClient(config);
};
