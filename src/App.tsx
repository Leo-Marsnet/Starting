import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Outlet, Route, Routes, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, Languages, LogIn, Rocket } from "lucide-react";

// 1. 登录表单的验证规则 (使用 Zod)
const formSchema = z.object({
  email: z.string().email({
    message: "请输入有效的电子邮件地址。",
  }),
  password: z.string().min(6, {
    message: "密码必须至少包含6个字符。",
  }),
});

// 2. 语言切换器组件
function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-1">
      <Languages className="h-4 w-4" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => changeLanguage("en")}
        disabled={i18n.resolvedLanguage === "en"}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => changeLanguage("zh")}
        disabled={i18n.resolvedLanguage === "zh"}
      >
        ZH
      </Button>
    </div>
  );
}

// 3. 整体应用布局
function Layout() {
  const { t } = useTranslation();
  return (
    <div>
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <Rocket className="h-6 w-6" />
            <span className="text-lg">项目模版</span>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  {t("nav.home")}
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  {t("nav.login")}
                </Link>
              </Button>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}

// 4. 首页组件
function HomePage() {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("homePage.title")}</CardTitle>
        <CardDescription>{t("homePage.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{t("homePage.cta")}</p>
      </CardContent>
    </Card>
  );
}

// 5. 登录页组件
function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // 使用 useForm hook 来创建表单
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 表单提交处理函数
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("表单提交成功:", values);
    toast.success("登录成功！", {
      description: `欢迎回来, ${values.email}`,
      action: {
        label: t("nav.home"),
        onClick: () => navigate("/"),
      },
    });
  }

  return (
    <div className="mx-auto max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>{t("loginPage.title")}</CardTitle>
          <CardDescription>{t("loginPage.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>电子邮件</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {t("nav.login")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

// 6. 应用主路由配置
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
