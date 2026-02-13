// App.tsx：基础状态管理示例，展示 useState 的惰性初始化与点击自增
import React from 'react';
import './App.css';

import { useState } from 'react';

function App() {
  // 使用惰性初始化函数：仅在首次渲染时计算初始值
  const [num,setNum] = useState(()=>{
    const  num1= 1+2;
    const  num2= 2+3;
    return num1+num2;
  });
  // UI：显示当前数字，点击时让 num 自增
  return (
   <div onClick={()=>setNum(num+1)}>{num}</div>
  );
}

export default App;
