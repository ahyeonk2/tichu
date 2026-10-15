import {useEffect,useRef,useState,type RefObject} from 'react';
import {stages,type StageId} from '../data/theme';

// Touch zoom changes the camera over the original SVG; it never replaces paths.
export function usePinchZoom(svg:RefObject<SVGSVGElement|null>,viewBox:string,focus:StageId|null,onFocus:(id:StageId,worldY?:number)=>void){
 const [preview,setPreview]=useState<string|null>(null);
 const [status,setStatus]=useState<{name:string;scale:number}|null>(null);
 const callback=useRef(onFocus);callback.current=onFocus;
 const suppressUntil=useRef(0);
 useEffect(()=>{
  const el=svg.current;if(!el)return;
  let gesture:{distance:number;box:number[];point:DOMPoint;stage:typeof stages[number];scale:number}|null=null;
  let frame=0;let pending:string|null=null;
  const reset=()=>{cancelAnimationFrame(frame);frame=0;pending=null;setPreview(null);setStatus(null)};
  const start=(event:TouchEvent)=>{
   if(focus||event.touches.length!==2)return;
   event.preventDefault();const [a,b]=Array.from(event.touches);const matrix=el.getScreenCTM();if(!matrix)return;
   const point=new DOMPoint((a.clientX+b.clientX)/2,(a.clientY+b.clientY)/2).matrixTransform(matrix.inverse());
   const stage=stages.find(s=>point.y>=s.start&&point.y<s.end)??(point.y<stages[0].start?stages[0]:stages[2]);
   gesture={distance:Math.max(1,Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)),box:viewBox.split(' ').map(Number),point,stage,scale:1};
   setStatus({name:stage.name,scale:1});
  };
  const move=(event:TouchEvent)=>{
   if(!gesture)return;event.preventDefault();if(event.touches.length!==2)return;
   const [a,b]=Array.from(event.touches);const g=gesture;
   const scale=Math.max(1,Math.min(2,Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)/g.distance));g.scale=scale;
   const [x,y,w,h]=g.box;pending=`${g.point.x-(g.point.x-x)/scale} ${g.point.y-(g.point.y-y)/scale} ${w/scale} ${h/scale}`;
   if(!frame)frame=requestAnimationFrame(()=>{frame=0;setPreview(pending);setStatus({name:g.stage.name,scale:g.scale})});
  };
  const end=(event:TouchEvent)=>{
   if(!gesture)return;event.preventDefault();if(event.touches.length)return;
   const g=gesture;gesture=null;suppressUntil.current=performance.now()+600;reset();
   if(g.scale>=1.25)callback.current(g.stage.id,g.point.y);
  };
  const cancel=()=>{gesture=null;suppressUntil.current=performance.now()+600;reset()};
  const click=(event:MouseEvent)=>{if(performance.now()<suppressUntil.current){event.preventDefault();event.stopPropagation()}};
  el.addEventListener('touchstart',start,{passive:false});el.addEventListener('touchmove',move,{passive:false});el.addEventListener('touchend',end,{passive:false});el.addEventListener('touchcancel',cancel);el.addEventListener('click',click,true);
  return()=>{cancelAnimationFrame(frame);el.removeEventListener('touchstart',start);el.removeEventListener('touchmove',move);el.removeEventListener('touchend',end);el.removeEventListener('touchcancel',cancel);el.removeEventListener('click',click,true)};
 },[svg,viewBox,focus]);
 return {preview,status};
}
