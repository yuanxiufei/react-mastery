# Getting Started with Create React App

该项目使用 [Create React App](https://github.com/facebook/create-react-app) 初始化。

## 可用脚本（Available Scripts）

在项目根目录可运行：

### `npm start`
开发模式启动，默认打开 [http://localhost:3000](http://localhost:3000)。\
保存文件会自动热刷新，控制台会显示相关提示或错误。

### `npm test`
以交互式 watch 模式运行测试。\
更多说明见官方文档：[Running Tests](https://facebook.github.io/create-react-app/docs/running-tests)

### `npm run build`
为生产环境构建到 `build/` 目录，启用优化与压缩，文件名包含哈希。\
部署相关说明参考：[Deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run eject`
不可逆操作：将所有构建配置（webpack、Babel、ESLint 等）复制到项目中，需自行维护。\
通常不建议使用，除非确有自定义复杂构建的需要。

## 更多了解（Learn More）
CRA 文档：[Getting Started](https://facebook.github.io/create-react-app/docs/getting-started) \
React 文档：[https://reactjs.org/](https://reactjs.org/)

---

## React Hooks 与性能知识点（中文）

- useEffect
- 执行时机：浏览器完成绘制后异步执行，不阻塞首屏渲染
- 适用场景：数据请求、事件订阅、埋点日志、非布局相关 DOM 操作
- 依赖数组：`[]`（只在挂载时执行一次）、`[deps]`（依赖变化时执行）、省略依赖（每次渲染后都执行）
- 清理函数：在下一次 effect 执行前或组件卸载时运行，用于清除定时器/取消订阅等

- useLayoutEffect
- 执行时机：DOM 更新后、浏览器绘制前同步执行（可能阻塞绘制）
- 适用场景：读取/写入布局（如 getBoundingClientRect、滚动位置）、避免首屏闪烁
- 性能建议：仅做必要同步计算，耗时逻辑放到 useEffect；在开发环境的 React.StrictMode 下要确保副作用可重复且可清理
- SSR 注意：同构场景建议使用 useEffect 或封装“同构的 layout effect”，避免无意义警告

- useState 惰性初始化
- 行为：传入函数仅在首次渲染时计算初始值，避免每次渲染重复计算
- 示例：
```tsx
const [num, setNum] = useState(() => {
  const n1 = 1 + 2
  const n2 = 2 + 3
  return n1 + n2
})
```

- Web Vitals 性能上报
- 入口：`index.tsx` 中调用 `reportWebVitals()`；可传入回调查看 FCP/LCP/CLS/FID/TTFB 等指标
```ts
// index.tsx
reportWebVitals(console.log)
```

- 示例文件关联
- useLayoutEffect 与异步请求：[App2.tsx](file:///d:/code/React/react-mastery/hook-test/src/App2.tsx#L12-L29)
- useEffect 示例（已注释）：[App2.tsx](file:///d:/code/React/react-mastery/hook-test/src/App2.tsx#L30-L46)
- useState 惰性初始化：[App.tsx](file:///d:/code/React/react-mastery/hook-test/src/App.tsx#L6-L14)
- 性能上报入口：[index.tsx](file:///d:/code/React/react-mastery/hook-test/src/index.tsx#L18-L21) 与 [reportWebVitals.ts](file:///d:/code/React/react-mastery/hook-test/src/reportWebVitals.ts)

- 选择建议
- 优先使用 useEffect；仅当需要“绘制前”的精准布局处理时考虑 useLayoutEffect
- 有副作用就编写清理函数（定时器、订阅、事件监听等）
- 初始计算复杂时使用 useState 的函数形式以避免重复计算
