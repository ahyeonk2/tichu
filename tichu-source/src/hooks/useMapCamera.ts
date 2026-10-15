import {useState,useRef,useEffect} from 'react';
import {type StageId} from '../data/theme';
import {stageCamera} from '../data/figmaHome';
export function useMapCamera(){
 const [focus,setFocus]=useState<StageId|null>(null);const saved=useRef(0);const mapRef=useRef<HTMLDivElement>(null);
 const focusStage=(id:StageId,worldY?:number)=>{if(!focus)saved.current=window.scrollY;history.pushState({tichuStage:id},'');setFocus(id);requestAnimationFrame(()=>{const map=mapRef.current;if(map)window.scrollTo({top:map.offsetTop+(id==='preparation'&&(worldY??0)>=240?669*map.clientWidth/402:0),behavior:'instant'})});};
 const overview=()=>{setFocus(null);history.replaceState({},'');requestAnimationFrame(()=>window.scrollTo({top:saved.current,behavior:'instant'}));};
 useEffect(()=>{const onPop=(e:PopStateEvent)=>{setFocus(e.state?.tichuStage??null);requestAnimationFrame(()=>window.scrollTo({top:e.state?.tichuStage?(mapRef.current?.offsetTop??0):saved.current,behavior:'instant'}));};window.addEventListener('popstate',onPop);return()=>window.removeEventListener('popstate',onPop)},[]);
 const stage=focus?stageCamera[focus]:null;
 return {focus,focusStage,overview,mapRef,viewBox:stage?stage.box:'0 0 402 874',ratio:stage?stage.ratio:402/874};
}
