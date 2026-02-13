// App2.tsx：演示 useLayoutEffect 与 useEffect 的差异及异步数据请求
import { useEffect,useLayoutEffect,useState } from 'react';
/** 模拟异步请求：2 秒后返回一个数字 */
async function queryData() {
  const data = await new Promise<number>((resolve)=>{
    setTimeout(()=>{
      resolve(666);
    },2000);
  });
  return data;
}
function App() {
  const [num,setNum] = useState(0);
  // useLayoutEffect 的作用与使用建议：
  // - 执行时机：DOM 变更后、浏览器绘制前同步运行（会阻塞绘制）
  // - 适用场景：读取/写入布局（如 getBoundingClientRect、滚动位置）、避免首屏闪烁
  // - 性能考虑：尽量只做必要的同步计算，耗时逻辑建议放到 useEffect
  // - 清理函数：可用于撤销样式/布局修改、移除同步事件监听等
  // - 注意事项：
  //   * React.StrictMode 在开发环境可能触发额外的挂载/卸载流程，请保证副作用可重复且可清理
  //   * SSR 场景下建议改用 useEffect 或封装“同构的 layout effect”以避免无意义警告
  useLayoutEffect(()=>{
    // 此日志在布局副作用阶段输出（绘制发生前）
    console.log('useEffect');
    // 模拟从服务端拉取数据，拿到结果后更新状态
    queryData().then((data)=>{
      setNum(data);
    });
  },[]);
  // 下方示例：普通 useEffect 的使用方式（已注释，仅供参考）
  // useEffect 的作用：
  // - 在浏览器完成绘制后异步执行，不会阻塞首屏渲染
  // - 适合：数据请求、事件订阅、日志等非布局相关的副作用
  // - 依赖项 [num] 变化时重新运行；省略依赖数组则每次渲染后都会运行
  // - 返回的清理函数会在下一次 effect 触发前或组件卸载时执行，用于取消订阅/清除定时器等
  // useEffect(() => {
  //   console.log('effect')
  //   const timer = setInterval(() => {
  //     console.log(num);
  //   }, 1000);

  //   return () => {
  //     console.log('clean up')
  //     clearInterval(timer);
  //   }
  // }, [num]);
  
  // UI：显示当前数字，点击可使 num 自增
  return (
   <div onClick={()=>setNum(num+1)}>{num}</div>
  );
}

export default App;
