import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// 用户信息类型
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// 应用状态类型
interface AppState {
  // 用户信息
  user: User | null;
  isAuthenticated: boolean;

  // UI 状态
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";

  // 应用配置
  language: string;

  // 加载状态
  isLoading: boolean;

  // 操作方法
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  toggleSidebar: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setLanguage: (language: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // 初始状态
        user: null,
        isAuthenticated: false,
        sidebarOpen: false,
        theme: "system",
        language: "zh",
        isLoading: false,

        // 操作方法
        setUser: (user) =>
          set({ user, isAuthenticated: !!user }, false, "setUser"),

        login: async (email) => {
          set({ isLoading: true }, false, "login/start");

          try {
            // 模拟登录API调用
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // 模拟用户数据
            const user: User = {
              id: "1",
              name: "用户名",
              email,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            };

            set(
              {
                user,
                isAuthenticated: true,
                isLoading: false,
              },
              false,
              "login/success",
            );
          } catch (error) {
            set({ isLoading: false }, false, "login/error");
            throw error;
          }
        },

        logout: () =>
          set(
            {
              user: null,
              isAuthenticated: false,
            },
            false,
            "logout",
          ),

        toggleSidebar: () =>
          set(
            (state) => ({
              sidebarOpen: !state.sidebarOpen,
            }),
            false,
            "toggleSidebar",
          ),

        setTheme: (theme) => set({ theme }, false, "setTheme"),

        setLanguage: (language) => set({ language }, false, "setLanguage"),

        setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),
      }),
      {
        name: "app-store",
        // 只持久化部分状态
        partialize: (state) => ({
          theme: state.theme,
          language: state.language,
          sidebarOpen: state.sidebarOpen,
        }),
      },
    ),
    {
      name: "app-store",
    },
  ),
);

// 选择器函数，用于优化性能
export const useUser = () => useAppStore((state) => state.user);
export const useAuth = () =>
  useAppStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    login: state.login,
    logout: state.logout,
  }));
export const useTheme = () =>
  useAppStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }));
