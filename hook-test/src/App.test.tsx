// App.test.tsx：基础测试示例，断言页面包含指定文本
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  // 渲染被测组件
  render(<App />);
  // 通过文本匹配获取节点（正则忽略大小写）
  const linkElement = screen.getByText(/learn react/i);
  // 断言该节点存在于文档中
  expect(linkElement).toBeInTheDocument();
});
