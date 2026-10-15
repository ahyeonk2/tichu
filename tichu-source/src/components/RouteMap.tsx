import {PlayDetail,PlayBackdrop} from './PlayDetail';
import {ScoringDetail} from './ScoringDetail';
import {FocusedRule} from './FocusedRule';
import {PreparationDetail,PreparationBackdrop} from './PreparationDetail';
import {useRef} from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {stages,type StageId} from '../data/theme';
import {routes} from '../data/mapData';
import {homeAssets,homeLabels} from '../data/figmaHome';
import {useRouteProgress} from '../hooks/useRouteProgress';
import {usePinchZoom} from '../hooks/usePinchZoom';
type Props={declaration?:string|null;detail:string|null;detailY:number;focus:StageId|null;viewBox:string;ratio:number;onFocus:(id:StageId,worldY?:number)=>void;onRule:(id:string)=>void;onStage:(id:string)=>void};
export function RouteMap({declaration,detail,detailY,focus,viewBox,ratio,onFocus,onRule,onStage}:Props){
 const svg=useRef<SVGSVGElement>(null);const reduced=useReducedMotion();useRouteProgress(svg,viewBox,onStage);const pinch=usePinchZoom(svg,viewBox,focus,onFocus);
 return <div className="map-camera figma-camera" style={{aspectRatio:ratio}}><motion.svg ref={svg} className="route-map figma-route" animate={{viewBox:pinch.preview??viewBox}} initial={false} transition={{duration:pinch.preview||reduced?0:.65,ease:[.22,1,.36,1]}} aria-label="티츄 규칙 노선 지도" role="group">
 <rect width="600" height="950" x="0" y="-20" fill="#f8f8f8"/>
 <g className="home-art" visibility={focus?'hidden':'visible'}>
 {homeAssets.map((a,i)=><g key={i}><image href={`${import.meta.env.BASE_URL}figma/${a.file}`} x={a.x} y={a.y} width={a.w} height={a.h} transform={a.transform} data-asset={a.file} aria-hidden="true"/>{i===0&&<rect x="264" y="144" width="138" height="652" fill="#f8f8f8"/>}</g>)}
 </g>
 {focus&&<>{!detail&&<PreparationBackdrop/>}{detail==='play-overview'&&<PlayBackdrop y={detailY}/>}<path d={`M260 0V${detail?detailY+500:874}`} stroke="#56bfa9" strokeWidth="4" fill="none"/></>}
 {routes.map(r=><path key={r.id} data-route={r.id} d={r.d} stroke="#56bfa9" strokeWidth={focus==='preparation'?4:.65} fill="none" pointerEvents="none"/>)}
 <g visibility={focus?'hidden':'visible'} className="figma-type" fill="#2b2b2b">
 <text x="32" y="48" className="figma-logo" dominantBaseline="text-before-edge">TICHU</text>
 <text className="home-instruction" x="32" y="93" fontSize="11" letterSpacing="-.22" dominantBaseline="text-before-edge"><tspan x="32">배우고 싶은 구간을</tspan><tspan x="32" dy="15.4">눌러보세요</tspan></text>
 {stages.map((s,i)=><g key={s.id} className="major-node" role="button" tabIndex={0} onClick={()=>onFocus(s.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onFocus(s.id)}}} aria-label={`${s.name} 구간. 누르거나 두 손가락을 벌려 확대하세요.`}><circle cx={i===2?261:260} cy={s.anchor} r="10" fill="#6ac6b3"/><text x={i===2?261:260} y={s.anchor} dominantBaseline="central" textAnchor="middle" fill="white" fontSize="9.231" fontWeight="700">{i+1}</text><text x={[188,202,185][i]} y={[106,465,700][i]} dominantBaseline="text-before-edge" fontSize="16" fontWeight="700">{['시작하기','플레이','점수 계산'][i]}</text></g>)}
 {homeLabels.map((l,i)=><g key={i} role="button" tabIndex={0} aria-label={l.text} className={`home-rule ${l.red?'red-rule':''}`} onClick={()=>onRule(l.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onRule(l.id)}}}><rect x={l.x-8} y={l.y-9} width={Math.max(44,l.text.length*12+16)} height={focus?26:30} fill="transparent"/><text x={l.x} y={l.y} dominantBaseline="text-before-edge" fontSize="12" fontWeight={l.bold?600:500} letterSpacing="-.24" fill={l.red?'#d51d2f':l.bold?'#2b2b2b':'#626262'}>{l.text}</text></g>)}
 <text className="home-end" x="236" y="818" dominantBaseline="text-before-edge" fill="#474747" fontSize="14" letterSpacing="-.28" fontWeight="700">1000점!</text>
 <text className="round-label" x="79" y="420" fontSize="12" fill="#717171" transform="rotate(14.68 79 420)"><tspan x="79">라</tspan><tspan x="79" dy="18">운</tspan><tspan x="79" dy="18">드</tspan></text>
 <path className="round-flow" d="M260 280 C158 307 86 399 86 497 C86 597 157 684 260 711" fill="none" stroke="#bfc5c3" strokeWidth="1.6" strokeDasharray="8 8" pointerEvents="none"/>

 </g>{focus==='preparation'&&!detail&&<PreparationDetail initialOpen={declaration}/>} {detail==='play-overview'?<PlayDetail y={detailY} onRule={onRule}/>:detail==='score-overview'?<ScoringDetail y={detailY} onRepeat={()=>onFocus('preparation')}/>:detail&&<FocusedRule key={detail} id={detail} y={detailY} onRule={onRule}/>}</motion.svg>
 {pinch.status&&<div className="pinch-status" role="status">{pinch.status.name} · {Math.round(pinch.status.scale*100)}%<span>{pinch.status.scale>=1.25?'손을 떼면 상세 규칙이 나타나요':'두 손가락을 조금 더 벌려보세요'}</span></div>}
 </div>
}
