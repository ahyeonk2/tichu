import {combinations} from '../data/rules';
import {Hand,PlayingCard} from './PlayingCard';
export function CardCombination({kind}:{kind:string}){
 if(kind==='team')return <div className="team-diagram"><span>팀 A</span><div>팀 B <b>✦</b> 팀 B</div><span>팀 A</span></div>;
 if(kind==='compare')return <div className="comparison"><div><small>앞사람</small><Hand cards={['5','5']}/></div><strong>→</strong><div><small>나</small><Hand cards={['8','8']}/></div><p>✓ 같은 페어, 더 높은 숫자. 낼 수 있어요.</p></div>;
 if(kind==='points')return <div className="point-cards">{[['5','+5'],['10','+10'],['K','+10'],['용','+25'],['봉황','−25']].map(([v,p],i)=><div key={v}><PlayingCard value={v} index={i}/><b>{p}</b></div>)}</div>;
 const list=kind==='bomb'?[{name:'같은 숫자 4장',cards:['9','9','9','9']},{name:'같은 무늬의 연속 5장 이상',cards:['3','4','5','6','7']}]:combinations;
 return <div className="combination-grid">{list.map((c,i)=><div key={c.name}><small>{String(i+1).padStart(2,'0')} / {c.name}</small><Hand cards={c.cards} sameSuit={kind==='bomb'&&i===1}/></div>)}</div>
}
