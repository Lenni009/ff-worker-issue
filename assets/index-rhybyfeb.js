(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();const d={PNG:"image/png",JPEG:"image/jpeg",GIF:"image/gif"};function b(t){return new Promise((e,o)=>{const s=new Image;s.onload=()=>e(s),s.onerror=()=>o(new Error("objectURL(): objectURL is illegal")),s.src=t})}const f="KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO29ubWVzc2FnZT1hc3luYyh7ZGF0YTpzfSk9Pntjb25zdCBlPXtidWZmZXI6YXdhaXQoYXdhaXQgbihzKSkuYXJyYXlCdWZmZXIoKX07cG9zdE1lc3NhZ2UoZSx7dHJhbnNmZXI6W2UuYnVmZmVyXX0pLGNsb3NlKCl9O2FzeW5jIGZ1bmN0aW9uIG4oe2ltZzp7d2lkdGg6cyxoZWlnaHQ6YX0sYnVmZmVyOm8sY29uZmlnOmV9KXtjb25zdCByPW5ldyBPZmZzY3JlZW5DYW52YXMocyxhKSx0PXIuZ2V0Q29udGV4dCgiMmQiKSxjPW5ldyBCbG9iKFtvXSx7dHlwZTplLm9yaWdpbmFsVHlwZX0pLGY9YXdhaXQgY3JlYXRlSW1hZ2VCaXRtYXAoYyk7cmV0dXJuIHQ9PW51bGx8fHQuZHJhd0ltYWdlKGYsMCwwKSxhd2FpdCByLmNvbnZlcnRUb0Jsb2IoZSl9fSkoKTsK",y=t=>Uint8Array.from(atob(t),e=>e.charCodeAt(0)),m=typeof window<"u"&&window.Blob&&new Blob([y(f)],{type:"text/javascript;charset=utf-8"});function L(t){let e;try{if(e=m&&(window.URL||window.webkitURL).createObjectURL(m),!e)throw"";const o=new Worker(e,{name:t==null?void 0:t.name});return o.addEventListener("error",()=>{(window.URL||window.webkitURL).revokeObjectURL(e)}),o}catch{return new Worker("data:text/javascript;base64,"+f,{name:t==null?void 0:t.name})}finally{e&&(window.URL||window.webkitURL).revokeObjectURL(e)}}async function g(t){return new Promise((e,o)=>{const s=new L;s.postMessage(t,[t.buffer]),s.onmessage=({data:r})=>{const n=new Blob([r.buffer],{type:t.config.type});e(n)},s.onerror=r=>{o(r)}})}async function h(t,e={}){e.type??(e.type=d.JPEG),e.quality??(e.quality=.92);const o=URL.createObjectURL(t),{width:s,height:r}=await b(o);URL.revokeObjectURL(o);const n={originalType:t.type,...e},l={buffer:await t.arrayBuffer(),img:{width:s,height:r},config:n};return await g(l)}const i=document.getElementById("file-upload");i==null||i.addEventListener("change",async()=>{if(!(i instanceof HTMLInputElement)){console.error("input is null");return}console.log("starting...");const t=Array.from(i.files??[]);let e=0;const o=t.map(c=>({id:e++,isCompressed:!1,file:c})),s=o.map(n),r=await Promise.all(s);console.log("done",r);async function n(c){const l=await p(c.file),a=o.find(w=>w.id===c.id);a&&(a.file=l,a.isCompressed=!0)}});const u=5e5;async function p(t,e=1){if(t.size<u)return t;const o=await h(t,{quality:e,type:d.JPEG});console.log(o.size,e);const s=e-.01;if(o.size>u&&e>0)return await p(t,s);const n=t.name.split(".").slice(0,-1).join(".")+"-min.jpg";return new File([o],n,{type:d.JPEG})}
