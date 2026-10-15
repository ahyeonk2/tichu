import {useState,useEffect} from 'react';
import {motion,useScroll,useTransform} from 'motion/react';

const origin='translate(171.5 68.25) scale(.25)';
export function PreparationBackdrop(){return <g transform={origin} aria-hidden="true"><g transform="translate(352 1731.5) rotate(-90) translate(-898.5 -889)"><image href={`${import.meta.env.BASE_URL}figma/deal-oval.png`} width="1797" height="889"/></g></g>}
export function PreparationDetail({initialOpen}:{initialOpen?:string|null}){
 const {scrollY}=useScroll();const teamOpacity=useTransform(scrollY,[450,620],[1,0]);
 const [grand,setGrand]=useState(initialOpen==='grand');const [small,setSmall]=useState(initialOpen==='small');
 useEffect(()=>{if(initialOpen==='grand')setGrand(true);if(initialOpen==='small')setSmall(true)},[initialOpen]);
 const exchangeY=669+(grand?524:469),smallY=669+(grand?687:632);
 return <g transform={origin} className="preparation-detail figma-type">
 <circle cx="354" cy="191" r="40" fill="#6ac6b3"/><text x="354" y="191" fill="white" textAnchor="middle" dominantBaseline="central" fontSize="36.923" fontWeight="700">1</text>
 <image href={`${import.meta.env.BASE_URL}figma/ellipse9.svg`} x="334" y="435" width="43.662" height="43.662"/>
 <image href={`${import.meta.env.BASE_URL}figma/ellipse9.svg`} x="334" y="827" width="43.662" height="43.662"/>
 <motion.g style={{opacity:teamOpacity}}><g data-scroll-reveal><image href={`${import.meta.env.BASE_URL}figma/team-diagram.svg`} x="32.5" y="542.5" width="272" height="205"/></g></motion.g>
 <foreignObject x="66" y="169" width="228" height="220"><div className="prep-copy" data-scroll-reveal><h1>시작하기</h1><p>인원: 4명<br/>목표: 1000점 달성하기<br/>플레이 시간: 약 60분</p><p className="prep-intro">빠르게 손에 있는 카드를 없애거나,<br/>팀원이 카드를 버리는 것을 도우세요</p></div></foreignObject>
 <foreignObject x="66" y="441" width="228" height="90"><div className="prep-copy" data-scroll-reveal><h2>팀 분배</h2><p>2명씩 팀을 꾸리세요<br/>같은 팀끼리 마주보고 앉습니다</p></div></foreignObject>
 <foreignObject x="50" y="907" width="244" height="44"><div className="deal-cards" data-scroll-reveal aria-label="처음 받는 카드 8장">{Array.from({length:8},(_,i)=><i key={i} style={{'--card-order':i} as React.CSSProperties}/>)}</div></foreignObject>
 <foreignObject x="50" y={exchangeY+48} width="244" height="86"><div className="deal-cards exchange-cards" data-scroll-reveal aria-label="14장 중 3장을 주고 새 카드 3장을 받습니다">{Array.from({length:14},(_,i)=><i key={i} style={{'--card-order':i} as React.CSSProperties}>{i<3&&<span className="incoming-card" aria-hidden="true"/>}</i>)}</div></foreignObject>
 <foreignObject x="66" y="839" width="228" height="110"><div className="prep-copy" data-scroll-reveal><h2>카드 분배</h2><p>먼저 8장의 카드를 나눠받습니다</p></div></foreignObject>
 <path d="M368 843V1543" stroke="#6ac6b3" strokeWidth="4" strokeDasharray="10 10" fill="none"/>
 <image href={`${import.meta.env.BASE_URL}figma/grand-star.svg`} x="333" y="992" width="42" height="42"/>
 <circle cx="354" cy={exchangeY+10.5} r="4.5" fill="white"/>
 <circle cx="354" cy={smallY+9.5} r="4.5" fill="#d51d2f"/>
 <foreignObject x="46" y="989" width="262" height="170"><div className="declaration"><button aria-expanded={grand} aria-controls="grand-inline" onClick={()=>setGrand(v=>!v)}>라지티츄<img src={`${import.meta.env.BASE_URL}figma/toggle.svg`} alt="" style={{transform:grand?'rotate(180deg)':undefined}}/></button>{grand&&<div className="declaration-panel" id="grand-inline">처음 8장만 보고 선언합니다<br/>내가 1등이면 <b>성공 +200점</b><br/>그렇지 않으면 <b>실패 −200점</b></div>}</div></foreignObject>
 <foreignObject x="66" y={exchangeY} width="228" height="95"><div className="prep-copy" data-scroll-reveal><p>남은 6장을 받아 14장이 된 카드를<br/>다른 3명에게 1장씩 주고, 3장을 받습니다</p></div></foreignObject>
 <foreignObject x="46" y={smallY-12} width="262" height="175"><div className="declaration"><button aria-expanded={small} aria-controls="small-inline" onClick={()=>setSmall(v=>!v)}>스몰티츄<img src={`${import.meta.env.BASE_URL}figma/toggle.svg`} alt="" style={{transform:small?'rotate(180deg)':undefined}}/></button>{small&&<div className="declaration-panel" id="small-inline">내 첫 카드를 내기 전까지 선언할 수 있어요<br/>내가 1등이면 <b>성공 +100점</b><br/>그렇지 않으면 <b>실패 −100점</b></div>}</div></foreignObject>
 </g>
}
