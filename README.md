# 我的项目模版

这是一个功能强大、开箱即用的项目初始模版，基于 **Vite + React + TypeScript**，并已为您预装和配置好了一整套现代化的开发工具链。

## ✨ 核心技术栈

*   **构建工具**: Vite
*   **框架**: React 18
*   **语言**: TypeScript
*   **UI 组件库**: **shadcn/ui** - 已安装并配置完毕
*   **状态管理**: **Zustand** - 已安装
*   **数据请求**: **TanStack Query (React Query)** - 已安装
*   **虚拟化**: **TanStack Virtual** - 已安装
*   **CSS 方案**: **Tailwind CSS** - 已安装并配置完毕
*   **代码规范**: ESLint & Prettier

## 🚀 如何开始

> **⚠️ Windows 用户请注意**
> 如果您在 Windows 的 PowerShell 终端中运行命令时遇到权限问题 (例如 `npm` 或 `npx` 无法执行)，请先在终端中运行以下命令来获取临时权限。此命令是安全的，仅在当前窗口生效：
> ```bash
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
> ```

1.  **安装依赖**
    ```bash
    npm install
    ```

2.  **启动开发服务器**
    ```bash
    npm run dev
    ```
    应用将在 `http://localhost:5173` (或类似地址) 启动。

3.  **构建生产版本**
    ```bash
    npm run build
    ```

4.  **添加新组件**
    使用 `shadcn/ui` 的命令行工具可以轻松添加新组件：
    ```bash
    npx shadcn@latest add [组件名]
    ```

---

### ✅ 模版特性

*   **开箱即用**: 克隆仓库，`npm install` 即可开始开发，无需额外配置。
*   **路径别名**: 已配置 `@/*` 指向 `./src/*`，让导入更清晰。
*   **主题化**: 基于CSS变量的亮/暗双色主题已配置完成。
*   **最佳实践**: 集成了行业认可的库和开发模式。

以后每次开始新项目，只需要把这个文件夹复制一份，然后在新项目里运行 `npm install` 就可以立刻开始写代码了。希望这份超详细的指南对你有帮助！