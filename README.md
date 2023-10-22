## Git 提交规范

| 规范名   | 描述                                                    |
| -------- | ------------------------------------------------------- |
| docs     | 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE 等等 |
| chore    | 改变构建流程、或者增加依赖库、工具等                    |
| feat     | 新增 feature                                            |
| fix      | 修复 bug                                                |
| merge    | 合并分之                                                |
| perf     | 优化相关，比如提升性能、体验                            |
| refactor | 代码重构，没有加新功能或者修复 bug                      |
| revert   | 回滚到上一个版本                                        |
| style    | 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑      |
| test     | 测试用例，包括单元测试、集成测试等                      |

## 登录

在 axios 配置中`@utils/http`添加基础路径/api

```js
  baseURL: "/api",
```

vite.config.ts

```ts
      proxy: {
        // http://localhost:8848/api/login -> http://localhost:8080/login
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, "")
        }
      }
```
