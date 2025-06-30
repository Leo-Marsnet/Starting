import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Rocket } from "lucide-react"

function App() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-6 h-6" />
            <span>项目模版已就绪</span>
          </CardTitle>
          <CardDescription>
            一个功能完备的Vite + React + TypeScript模版
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            所有核心库 (shadcn/ui, Zustand, TanStack Query)
            均已安装并配置完毕。现在，您可以立即开始构建下一个出色的应用了。
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">开始使用</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
