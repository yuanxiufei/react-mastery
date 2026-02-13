// reportWebVitals.ts：封装性能指标收集，基于 web-vitals
import { ReportHandler } from 'web-vitals';

/**
 * 上报 Web Vitals 性能指标
 * @param onPerfEntry 可选回调，用于接收各项指标（CLS/FID/FCP/LCP/TTFB）
 * 当传入有效函数时，按需动态加载 web-vitals 并触发回调
 */
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // 依次采集并上报关键性能指标
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
