(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const u={PNG:"image/png",JPEG:"image/jpeg",GIF:"image/gif"};function m(o){return new Promise((r,n)=>{const s=new Image;s.onload=()=>r(s),s.onerror=()=>n(new Error("objectURL(): objectURL is illegal")),s.src=o})}function f(o){return new Worker("/ff-worker-issue/assets/worker-WjL2vs95.js",{name:o==null?void 0:o.name})}async function d(o){return new Promise((r,n)=>{const s=new f;s.postMessage(o,[o.buffer]),s.onmessage=({data:e})=>{const t=new Blob([e.buffer],{type:o.config.type});r(t)},s.onerror=e=>{n(e)}})}async function p(o,r={}){r.type??(r.type=u.JPEG),r.quality??(r.quality=.92);const n=URL.createObjectURL(o),{width:s,height:e}=await m(n);URL.revokeObjectURL(n);const t={originalType:o.type,...r},l={buffer:await o.arrayBuffer(),img:{width:s,height:e},config:t};return await d(l)}const c=document.getElementById("file-upload");c==null||c.addEventListener("change",g);let a=0;async function y(o){const r=await p(o),n=new File([r],"compressed",{type:"image/jpeg"});return a++,console.log(a),n}async function g(){if(!(c instanceof HTMLInputElement)){console.error("input not found!");return}console.log("Starting compression..."),console.log("The counter should reach 16");const r=Array.from(c.files??[]).map(y),n=await Promise.all(r);console.log("finished!",n)}
