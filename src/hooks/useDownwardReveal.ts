import {useEffect} from 'react';
// Entry content is visible immediately; only offscreen content fades on downward scrolling.
export function useDownwardReveal(key:string){useEffect(()=>{
 let last=window.scrollY,armedUntil=0,touchY=0,frame=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const map=document.querySelector('.map-wrap');map?.classList.add('reveal-entering');
 const initial=setTimeout(()=>{document.querySelectorAll<HTMLElement>('[data-scroll-reveal]').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0){el.classList.add('is-revealed','is-initial')}else{el.classList.add('is-pending')}});map?.classList.remove('reveal-entering');last=scrollY},700);
 const reveal=()=>{document.querySelectorAll<HTMLElement>('[data-scroll-reveal]').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*.95&&r.bottom>0){el.classList.remove('is-pending');el.classList.add('is-revealed')}})};
 const scroll=()=>{const y=scrollY;if(y>last&&performance.now()<armedUntil){cancelAnimationFrame(frame);frame=requestAnimationFrame(reveal)}last=y};
 const wheel=(e:WheelEvent)=>{if(e.deltaY>0)armedUntil=performance.now()+1200};
 const start=(e:TouchEvent)=>{touchY=e.touches[0]?.clientY??0};
 const move=(e:TouchEvent)=>{const y=e.touches[0]?.clientY??touchY;if(y<touchY)armedUntil=performance.now()+1800;touchY=y};
 const keydown=(e:KeyboardEvent)=>{if(['ArrowDown','PageDown',' ','End'].includes(e.key))armedUntil=performance.now()+1200};
 if(reduced.matches)document.querySelectorAll('[data-scroll-reveal]').forEach(el=>el.classList.add('is-revealed'));
 window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('wheel',wheel,{passive:true});window.addEventListener('touchstart',start,{passive:true});window.addEventListener('touchmove',move,{passive:true});window.addEventListener('keydown',keydown);
 return()=>{clearTimeout(initial);map?.classList.remove('reveal-entering');cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('wheel',wheel);window.removeEventListener('touchstart',start);window.removeEventListener('touchmove',move);window.removeEventListener('keydown',keydown)};
 },[key])}
