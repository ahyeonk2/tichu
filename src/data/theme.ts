export type StageId = 'preparation' | 'play' | 'scoring';
export const stages = [
 {id:'preparation' as const,number:'01',name:'준비',en:'PREPARATION',color:'#BF3043',background:'#F1D9C8',dark:'#51242D',start:0,end:360,anchor:116,description:'카드를 나누고, 함께 시작할 준비.'},
 {id:'play' as const,number:'02',name:'플레이',en:'PLAY',color:'#B77A14',background:'#F0DDA9',dark:'#402C20',start:360,end:690,anchor:474,description:'내고, 넘기고, 다시 내 차례로.'},
 {id:'scoring' as const,number:'03',name:'점수 계산',en:'SCORING',color:'#2458BC',background:'#D7DFF0',dark:'#202C55',start:690,end:874,anchor:711,description:'함께 모은 점수로, 1,000점을 향해.'},
];
