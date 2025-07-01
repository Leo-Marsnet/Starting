# 🚀 现代化 React 项目模板

一个功能完整、生产就绪的 React + TypeScript 项目模板，集成了现代开发工具链和最佳实践。

> **⚠️ Mac 用户跳过本段**  
> Windows 可能会遇到权限问题，可以先运行以下指令来避免权限问题：
> ```bash
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
> ```

## 🚀 快速开始

### 1. 环境要求
- Node.js 18+
- npm/yarn/pnpm

### 2. 安装依赖
```bash
npm install
```

### 3. 配置环境变量
```bash
# 复制环境变量模板
cp .env.example .env.local

# 根据需要修改配置
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_TITLE=我的项目
```

### 4. 开发模式
```bash
npm run dev
```

### 5. 构建生产版本
```bash
npm run build
```

## ✨ 特性

### 🏗️ 核心技术栈
- **⚡ Vite 7** - 极速构建工具
- **⚛️ React 19** - 最新版本的 React
- **📘 TypeScript** - 类型安全的 JavaScript
- **🎨 Tailwind CSS 4** - 原子化 CSS 框架
- **🧩 shadcn/ui** - 现代化组件库

### 🔧 开发工具
- **📏 ESLint + Prettier** - 代码规范和格式化
- **🐕 Husky + lint-staged** - Git 钩子和预提交检查
- **🧪 Vitest + Testing Library** - 单元测试和组件测试
- **🌍 i18next** - 国际化支持
- **📱 PWA 支持** - 渐进式 Web 应用

### 🚀 功能特性
- **🔐 身份认证** - 完整的登录/注册流程
- **🛣️ 路由管理** - React Router v7
- **📊 状态管理** - Zustand + React Query
- **📝 表单处理** - react-hook-form + zod 验证
- **🎭 主题切换** - 浅色/深色主题
- **🌐 国际化** - 中英文切换
- **⚡ 错误处理** - 错误边界和友好提示
- **📦 组件库** - 丰富的UI组件集合

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── ui/             # 基础UI组件
│   └── ...
├── features/           # 功能模块
│   ├── auth/          # 身份认证
│   └── ...
├── hooks/             # 自定义Hooks
├── lib/               # 工具函数库
│   ├── api.ts         # API客户端
│   ├── env.ts         # 环境变量
│   ├── constants.ts   # 常量定义
│   ├── formatters.ts  # 格式化工具
│   └── utils.ts       # 通用工具
├── stores/            # 状态管理
├── types/             # 类型定义
├── i18n.ts           # 国际化配置
└── main.tsx          # 应用入口

.cursor/rules/         # Cursor AI 协作规则
├── 00-project-overview.mdc
├── 01-project-context.mdc
├── 02-collaboration-process.mdc
├── 03-coding-standards.mdc
├── 04-tech-architecture.mdc
├── 05-ui-ux-guidelines.mdc
├── 06-internationalization.mdc
└── 07-ai-instructions.mdc

public/locales/        # 多语言文件
├── en/translation.json
└── zh/translation.json
```

## 📚 核心功能使用指南

### 🔌 API 调用
```typescript
import { api } from '@/lib/api'

// GET 请求
const response = await api.get<User[]>('/users')

// POST 请求
const newUser = await api.post<User>('/users', {
  name: '张三',
  email: 'zhangsan@example.com'
})

// 设置认证令牌
api.setAuth('your-jwt-token')
```

### 🗂️ 状态管理
```typescript
import { useAppStore } from '@/stores/appStore'

function MyComponent() {
  const { user, login, logout } = useAppStore()
  
  const handleLogin = async () => {
    await login('user@example.com', 'password')
  }
  
  return (
    <div>
      {user ? (
        <p>欢迎, {user.name}!</p>
      ) : (
        <button onClick={handleLogin}>登录</button>
      )}
    </div>
  )
}
```

### 📝 表单处理
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('请输入有效邮箱'),
  password: z.string().min(6, '密码至少6位')
})

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema)
  })
  
  const onSubmit = (data) => {
    console.log(data)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* 表单字段 */}
      </form>
    </Form>
  )
}
```

### 🌍 国际化
```typescript
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t, i18n } = useTranslation()
  
  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <button onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
    </div>
  )
}
```

### 🪝 自定义 Hooks
```typescript
import { useLocalStorage, useDebounce, useToggle } from '@/hooks'

function MyComponent() {
  const [value, setValue] = useLocalStorage('key', 'default')
  const debouncedValue = useDebounce(value, 300)
  const [isOpen, toggle] = useToggle(false)
  
  // 使用这些 hooks...
}
```

## 🎨 UI 组件

项目包含丰富的 UI 组件库：

- **Button** - 按钮组件
- **Card** - 卡片组件
- **Form** - 表单组件
- **Input** - 输入框组件
- **Modal** - 模态框组件
- **Loading** - 加载状态组件
- **EmptyState** - 空状态组件
- **ErrorBoundary** - 错误边界组件

## 🧪 测试

```bash
# 运行测试
npm run test

# 测试覆盖率
npm run test:coverage

# 监听模式
npm run test:watch
```

## 📦 构建和部署

```bash
# 构建
npm run build

# 预览构建结果
npm run preview

# 检查构建产物
npm run build:analyze
```

## 🔧 开发工具

### ESLint 配置
项目使用现代化的 ESLint 配置，支持：
- TypeScript 规则
- React Hooks 规则
- 导入排序
- 代码格式化

### Prettier 配置
统一的代码格式化规则，支持：
- 自动格式化
- 保存时格式化
- Git 提交前格式化

### Husky Git Hooks
自动运行代码检查：
- 提交前 lint 检查
- 提交前格式化
- 提交信息格式检查

## 🤖 AI 协作

项目包含完整的 Cursor AI 协作规则，确保：
- 一致的代码风格
- 最佳实践指导
- 自动化开发流程
- 团队协作规范

## 📝 开发规范

### 代码组织
- 使用 TypeScript 严格模式
- 组件采用函数式写法
- Hooks 优先于 Class 组件
- 统一的导入顺序

### 命名规范
- 组件：PascalCase
- 函数/变量：camelCase
- 常量：UPPER_SNAKE_CASE
- 文件：kebab-case 或 PascalCase

### 提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具链相关
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

## 🆘 常见问题

### Q: 如何添加新的 UI 组件？
A: 使用 shadcn/ui CLI 添加组件：
```bash
npx shadcn-ui@latest add [component-name]
```

### Q: 如何配置新的环境变量？
A: 
1. 在 `.env.example` 中添加示例
2. 在 `src/types/global.d.ts` 中添加类型
3. 在 `src/lib/env.ts` 中添加解析逻辑

### Q: 如何添加新的翻译？
A: 在 `public/locales/[lang]/translation.json` 中添加对应的键值对

---

⭐ 如果这个模板对你有帮助，请给项目点个星！