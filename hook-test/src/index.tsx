// index.tsx：应用入口，负责挂载根组件与性能上报
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import App2 from './App2';
import reportWebVitals from './reportWebVitals';

// 创建根节点并挂载到 id 为 root 的 DOM 元素
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// 渲染根组件。可切换为 <App /> 或 <App2 /> 进行不同示例演示
root.render(
  // <React.StrictMode>
    // <App />
    <App2 />
  // </React.StrictMode>
);

// 启用性能上报：可传入回调（如 console.log）查看指标
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
