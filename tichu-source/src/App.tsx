import {useState,useEffect,useCallback} from 'react';
import {AnimatePresence} from 'motion/react';
import {RouteMap} from './components/RouteMap';
import {PlayRuleSheet} from './components/PlayRuleSheet';
import {useMapCamera} from './hooks/useMapCamera';
import {useDownwardReveal} from './hooks/useDownwardReveal';
import {rules,ruleById} from './data/rules';
import {nodes} from './data/mapData';
import {stages,type StageId} from './data/theme';
export default function App(){
 const camera=useMapCamera();const [declaration,setDeclaration]=useState<string|null>(null);const [detail,setDetail]=useState<string|null>(null);const [search,setSearch]=useState(false);const [query,setQuery]=useState('');const [sheet,setSheet]=useState<'combos'|'special'|null>(null);
 const [sheetTab,setSheetTab]=useState<string|undefined>();
 const [intro,setIntro]=useState(()=>{try{return localStorage.getItem('tichu-tour-v2')?0:1}catch{return 1}});
 const finishIntro=()=>{setIntro(0);try{localStorage.setItem('tichu-tour-v2','done')}catch{}};
 const closeSheet=useCallback(()=>setSheet(null),[]);
 useDownwardReveal(`${camera.focus}:${detail}`);
 useEffect(()=>{const pop=()=>{setDetail(null);setSearch(false);setSheet(null)};window.addEventListener('popstate',pop);return()=>window.removeEventListener('popstate',pop)},[]);
 const focusStage=(id:StageId,y?:number)=>{finishIntro();setDeclaration(null);setDetail(id==='preparation'?null:id==='play'?'play-overview':'score-overview');camera.focusStage(id,y)};
 const openRule=(id:string)=>{if(id==='win')return;finishIntro();setSearch(false);if(id==='combos'||id==='special'){setSheetTab(undefined);setSheet(id);return}if(['phoenix','dragon','dog','mahjong','bomb'].includes(id)){setSheetTab(id);setSheet('special');return}if(['pass','compare','play'].includes(id)){focusStage('play');return}if(ruleById[id]?.stage==='scoring'){focusStage('scoring');return}setDeclaration(['grand','small'].includes(id)?id:null);if(['grand','small','team','deal','exchange'].includes(id)){setDetail(null);camera.focusStage('preparation',id==='team'?116:280)}else{setDetail(id);camera.focusStage(ruleById[id].stage)}};
 const overview=()=>{setDeclaration(null);setDetail(null);setSearch(false);setSheet(null);camera.overview()};
 const effectiveDetail=detail??(camera.focus==='play'?'play-overview':camera.focus==='scoring'?'score-overview':null);
 const detailY=effectiveDetail==='play-overview'?426.25:effectiveDetail==='score-overview'?663.25:effectiveDetail?Math.max(0,(nodes.find(n=>n.id===effectiveDetail)?.y??116)-40):0;
 const detailHeight=effectiveDetail==='play-overview'?325:500;
 return <div className={`app mobile-service ${camera.focus?'focused preparation-focus':'overview'} ${!camera.focus&&intro?`onboarding onboarding-${intro}`:''}`}>
 {camera.focus&&<button className="map-back" aria-label="전체 지도로 돌아가기" onClick={overview}>↙</button>}
 <main><div ref={camera.mapRef} className="map-wrap"><RouteMap declaration={declaration} focus={camera.focus} detail={effectiveDetail} detailY={detailY} viewBox={effectiveDetail?`171.5 ${detailY} 100.5 ${detailHeight}`:camera.viewBox} ratio={effectiveDetail?100.5/detailHeight:camera.ratio} onFocus={focusStage} onRule={openRule} onStage={()=>{}}/></div>
 {search&&<section className="route-search"><button onClick={()=>setSearch(false)} aria-label="검색 닫기">닫기 ×</button><h2>규칙 찾기</h2><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="궁금한 규칙을 입력하세요" aria-label="규칙 검색어"/>{rules.filter(r=>r.id!=='win'&&`${r.title} ${r.summary} ${r.tags??''}`.includes(query)).map(r=><button key={r.id} onClick={()=>openRule(r.id)}>{r.title} ↗</button>)}</section>}
 </main>{!camera.focus&&intro>0&&<aside className="first-visit" role="dialog" aria-modal="false" aria-label="처음 방문 안내"><small>{intro} / 2</small>{intro===1?<><h2>티츄가 처음이라면<br/>이곳을 먼저보세요!</h2></>:<><p className="tour-red-copy">‘빨간 규칙’은 티츄의 메인 기능이지만 익숙해지면 살펴봐도 괜찮습니다.</p></>}<button onClick={()=>intro===1?setIntro(2):finishIntro()}>{intro===1?'다음 →':'지도 살펴보기'}</button></aside>}
 <nav className="home-access" aria-label="지도 탐색"><button onClick={overview}>전체 지도</button>{stages.map(s=><button key={s.id} onClick={()=>focusStage(s.id)} aria-label={`${s.name} 확대`}>{s.name}</button>)}<button onClick={()=>{finishIntro();setSearch(true);requestAnimationFrame(()=>document.querySelector('.route-search')?.scrollIntoView())}}>규칙 검색</button></nav><AnimatePresence>{sheet&&<PlayRuleSheet key={`${sheet}:${sheetTab}`} initialTab={sheetTab} kind={sheet} onClose={closeSheet}/>}</AnimatePresence></div>
}
