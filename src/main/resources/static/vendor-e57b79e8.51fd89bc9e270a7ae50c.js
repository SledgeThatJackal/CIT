"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[584],{3905:(e,r,t)=>{t.d(r,{c:()=>l});var n=(e,r,t=1)=>{if(!Number.isInteger(e))throw new TypeError("start should be an integer");if(!Number.isInteger(r))throw new TypeError("end should be an integer");if(!Number.isInteger(t))throw new TypeError("step should be an integer");if(r<e)throw new RangeError("end should be greater than start");if(t<1)throw new RangeError("step should be a positive integer");return Array.from({length:(r-e)/t+1},((r,n)=>e+n*t))},l=(e,r,t=2,l=2,i="…")=>{let g=1+2*l+2*t+2,h=Math.min(e,r),u=[];if(r<=g)u=n(1,r);else{let e=t>0?1:h,o={leftEdge:null,glueLeftCenter:null,centerPiece:null,glueCenterRight:null,rightEdge:null};h<g/2?(o.leftEdge=n(1,Math.ceil(g/2)+l),o.centerPiece=[i],t>0&&(o.rightEdge=n(r-(t-1),r))):h>r-g/2?(t>0&&(o.leftEdge=n(e,t)),o.centerPiece=[i],o.rightEdge=n(Math.min(r-Math.floor(g/2)-l,h-l),r)):(o.centerPiece=n(h-l,h+l),t>0&&(o.leftEdge=n(e,t)),t>0&&(o.rightEdge=n(r-(t-1),r)),o.glueLeftCenter=o.centerPiece[0]==t+2?[t+1]:[i],o.glueCenterRight=[i]),u=Object.values(o).filter((e=>null!==e)).flat()}return u}}}]);