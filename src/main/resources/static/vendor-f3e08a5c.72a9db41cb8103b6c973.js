"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[353],{415:(e,t,n)=>{n.d(t,{Cc:()=>d});var r=n(6540);const u={prefix:String(Math.round(1e10*Math.random())),current:0},o=r.createContext(u),a=r.createContext(!1);let c=Boolean("undefined"!=typeof window&&window.document&&window.document.createElement),i=new WeakMap;const d="function"==typeof r.useId?function(e){let t=r.useId(),[n]=(0,r.useState)("function"==typeof r.useSyncExternalStore?r.useSyncExternalStore(f,l,s):(0,r.useContext)(a));return e||`${n?"react-aria":`react-aria${u.prefix}`}-${t}`}:function(e){let t=(0,r.useContext)(o);t!==u||c||console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");let n=function(e=!1){let t=(0,r.useContext)(o),n=(0,r.useRef)(null);if(null===n.current&&!e){var u,a;let e=null===(a=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)||void 0===a||null===(u=a.ReactCurrentOwner)||void 0===u?void 0:u.current;if(e){let n=i.get(e);null==n?i.set(e,{id:t.current,state:e.memoizedState}):e.memoizedState!==n.state&&(t.current=n.id,i.delete(e))}n.current=++t.current}return n.current}(!!e),a=`react-aria${t.prefix}`;return e||`${a}-${n}`};function l(){return!1}function s(){return!0}function f(e){return()=>{}}}}]);