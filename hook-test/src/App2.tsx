import { useEffect,useLayoutEffect,useState } from 'react';
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
  useLayoutEffect(()=>{
    console.log('useEffect');
    queryData().then((data)=>{
      setNum(data);
    });
  },[]);
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
  
  return (
   <div onClick={()=>setNum(num+1)}>{num}</div>
  );
}

export default App;
