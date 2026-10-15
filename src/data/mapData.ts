import type {StageId} from './theme';
export const WORLD={width:402,height:874};
export const routes:{id:StageId;d:string}[]=[{id:'preparation',d:'M260 0V360'},{id:'play',d:'M260 360V690'},{id:'scoring',d:'M260 690V815'}];
export type MapNode={id:string;stage:StageId;x:number;y:number;extra?:boolean};
export const nodes:MapNode[]=[
 ...['team','deal','exchange','start','grand','small'].map((id,i)=>({id,stage:'preparation' as const,x:260,y:[182,280,280,116,280,326][i]})),
 ...['combos','compare','pass','trick','repeat','mahjong','phoenix','dragon','dog','bomb'].map((id,i)=>({id,stage:'play' as const,x:i>4?300:260,y:[587,533,506,587,587,568,568,568,568,568][i]})),
 ...['end','points','declarations','win','double','last'].map(id=>({id,stage:'scoring' as const,x:260,y:id==='win'?825:711})),
];
