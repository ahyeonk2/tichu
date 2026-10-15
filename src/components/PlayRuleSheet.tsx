import dragonImage from '../assets/cards/dragon.png';
import phoenixImage from '../assets/cards/phoenix.png';
import dogImage from '../assets/cards/dog.png';
const specialImages:Record<string,string>={dragon:dragonImage,phoenix:phoenixImage,dog:dogImage,mahjong:`${import.meta.env.BASE_URL}figma/sparrow.png`};
import {useState} from 'react';
import {Sheet} from './RuleBottomSheet';
import {ruleById,combinations} from '../data/rules';
import {Hand} from './PlayingCard';
import {CardCombination} from './CardCombination';
// 핵심 역할은 이미지 옆에 한 번만, 아래에는 조건과 예외만 표시합니다.
const specialContent:Record<string,{roles:string[];details:string[]}>={
 phoenix:{
  roles:['조합에서 2~A의 일반 카드 한 장을 대신합니다.','한 장으로 내면 앞 카드보다 0.5 높습니다.'],
  details:['폭탄을 만들거나 특수 카드를 대신할 수 없습니다.','새 트릭에서 먼저 내면 1.5입니다. A는 이기지만 용은 못 이깁니다.','카드 점수는 −25점입니다.']
 },
 dragon:{
  roles:['일반 싱글 중 가장 강합니다.','이긴 트릭 전체를 상대 한 명에게 줍니다.'],
  details:['한 장으로만 냅니다. 스트레이트에는 넣을 수 없고, 폭탄에는 집니다.','트릭을 넘겨도 다음 트릭을 시작할 권리는 유지합니다.','용 위에 폭탄이 나오면 폭탄으로 이긴 사람이 트릭을 가져갑니다. 이때는 상대에게 주지 않습니다.','카드 점수는 +25점입니다.']
 },
 dog:{
  roles:['새 트릭의 시작 차례를 팀원에게 넘깁니다.'],
  details:ruleById.dog.details
 },
 mahjong:{
  roles:['숫자 1입니다.','원하는 숫자(2~A)를 소원으로 지정합니다.'],
  details:['소원은 참새를 낼 때 말합니다. 특수 카드는 지정할 수 없습니다.',...ruleById.mahjong.details.slice(1).map(text=>text.replace('참새은','참새는'))]
 },
 bomb:{
  roles:['일반 조합을 모두 이깁니다.'],
  details:ruleById.bomb.details
 }
};
const descriptions=['카드 1장','같은 숫자 2장','같은 숫자 3장','연속된 숫자의 페어 2쌍 이상','같은 숫자 3장 + 다른 숫자 2장','연속된 숫자 5장 이상'];
export function PlayRuleSheet({kind,onClose,initialTab}:{kind:'combos'|'special';onClose:()=>void;initialTab?:string}){const ids=kind==='combos'?['combos']:['dragon','phoenix','dog','mahjong','bomb'];const [tab,setTab]=useState(initialTab&&ids.includes(initialTab)?initialTab:ids[0]);const rule=ruleById[tab];return <Sheet label={kind==='combos'?'조합내기':'특수카드'} onClose={onClose}><div className="play-rule-sheet"><h2>{kind==='combos'?'조합내기':'특수카드'}</h2><div className="rule-tabs" role="tablist" aria-label="규칙 종류">{ids.map((id,i)=><button key={id} role="tab" id={`tab-${id}`} aria-selected={tab===id} aria-controls="play-tabpanel" tabIndex={tab===id?0:-1} onClick={()=>setTab(id)} onKeyDown={e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?ids.length-1:(i+(e.key==='ArrowRight'?1:-1)+ids.length)%ids.length;setTab(ids[next]);requestAnimationFrame(()=>document.getElementById(`tab-${ids[next]}`)?.focus())}}}>{id==='combos'?'기본 조합':ruleById[id].title}</button>)}</div><div role="tabpanel" id="play-tabpanel" aria-labelledby={`tab-${tab}`} tabIndex={0}>{tab==='combos'?<><p>기본 카드 조합은 여섯 가지입니다. 폭탄은 특수카드에서 확인하세요.</p>{combinations.map((c,i)=><section className="combination-explained" key={c.name}><div className="combination-heading"><h3><span>{String(i+1).padStart(2,'0')}</span> {c.name}</h3><p>{descriptions[i]}</p></div><Hand cards={c.cards}/></section>)}</>:<><h3>{rule.title}</h3><div className={`special-card-intro ${specialImages[tab]?'has-image':''}`}>{specialImages[tab]&&<img className="special-card-image" src={specialImages[tab]} alt={`${rule.title} 카드`}/>}<div className="special-card-role">{specialContent[tab]?.roles.map(role=><p key={role}><strong>{role}</strong></p>)}</div></div>{rule.example&&<CardCombination kind={rule.example}/>}<div className="plain-rule-details">{specialContent[tab].details.map(d=><p key={d}>{d}</p>)}</div></>}</div></div></Sheet>}
