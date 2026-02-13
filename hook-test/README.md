# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

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
