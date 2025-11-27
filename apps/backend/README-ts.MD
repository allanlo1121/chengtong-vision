TYPESCRIPT 重构

Step 1：为你的 backend 启动 TypeScript 能力

（你可以马上执行，不会破坏任何现有逻辑）

✔️ 1. 安装 TypeScript 相关依赖

在 apps/backend 下执行：

```bash
pnpm add -D typescript ts-node @types/node
```


如果你的 pnpm workspace 是 monorepo（你是 TurboRepo），也可以直接在根目录执行：

```bash
pnpm -w add -D typescript ts-node @types/node
```


（-w 表示 workspace root）

2. 创建 tsconfig.json（关键配置：allowJs + ESM 兼容）

在 apps/backend/tsconfig.json 创建：

```json
{
  "compilerOptions": {
    "target": "ES2020",

    "module": "NodeNext",
    "moduleResolution": "NodeNext",

    "allowJs": true,
    "checkJs": false,

    "esModuleInterop": true,
    "resolveJsonModule": true,

    "strict": false,
    "skipLibCheck": true,

    "outDir": "dist",

    "noEmit": false
  },
  "include": [
    "./**/*.ts",
    "./**/*.js"
  ]
}

```



