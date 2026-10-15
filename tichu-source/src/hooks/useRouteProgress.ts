import {useEffect,type RefObject} from 'react';
export function useRouteProgress(ref:RefObject<SVGSVGElement|null>,camera:string,onStage:(id:string)=>void){
 useEffect(()=>{const svg=ref.current;if(!svg)return;let raf=0;const paths=[...svg.querySelectorAll<SVGPathElement>('[data-route]')];paths.forEach(p=>{p.style.strokeDasharray=String(p.getTotalLength())});
 const update=()=>{raf=0;const box=svg.viewBox.baseVal;const rect=svg.getBoundingClientRect();const y=box.y+((innerHeight*.78-rect.top)/rect.height)*box.height;
 paths.forEach(p=>{const len=p.getTotalLength();const samples=180;let done=0;for(let i=0;i<=samples;i++){const pt=p.getPointAtLength(len*i/samples);if(pt.y<=y)done=i/samples;else break;}p.style.strokeDashoffset=String(len*(1-done));});onStage(y<360?'preparation':y<690?'play':'scoring');};
 const tick=()=>{if(!raf)raf=requestAnimationFrame(update)};window.addEventListener('scroll',tick,{passive:true});window.addEventListener('resize',tick);update();const timer=setTimeout(update,760);return()=>{window.removeEventListener('scroll',tick);window.removeEventListener('resize',tick);cancelAnimationFrame(raf);clearTimeout(timer)};
 },[ref,camera,onStage]);
}
