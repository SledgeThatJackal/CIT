"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[664],{664:(e,t,n)=>{n.r(t),n.d(t,{default:()=>d});var l=n(6540),r=n(9785),a=n(893),o=n(1083),c=n(5914),i=n(9668),s=function(){return s=Object.assign||function(e){for(var t,n=1,l=arguments.length;n<l;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},s.apply(this,arguments)},u=function(e,t,n,l){return new(n||(n=Promise))((function(r,a){function o(e){try{i(l.next(e))}catch(e){a(e)}}function c(e){try{i(l.throw(e))}catch(e){a(e)}}function i(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,c)}i((l=l.apply(e,t||[])).next())}))},m=function(e,t){var n,l,r,a,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(c){return function(i){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(o=0)),o;)try{if(n=1,l&&(r=2&c[0]?l.return:c[0]?l.throw||((r=l.return)&&r.call(l),0):l.next)&&!(r=r.call(l,c[1])).done)return r;switch(l=0,r&&(c=[2&c[0],r.value]),c[0]){case 0:case 1:r=c;break;case 4:return o.label++,{value:c[1],done:!1};case 5:o.label++,l=c[1],c=[0];continue;case 7:c=o.ops.pop(),o.trys.pop();continue;default:if(!((r=(r=o.trys).length>0&&r[r.length-1])||6!==c[0]&&2!==c[0])){o=0;continue}if(3===c[0]&&(!r||c[1]>r[0]&&c[1]<r[3])){o.label=c[1];break}if(6===c[0]&&o.label<r[1]){o.label=r[1],r=c;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(c);break}r[2]&&o.ops.pop(),o.trys.pop();continue}c=t.call(e,o)}catch(e){c=[6,e],l=0}finally{n=r=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,i])}}};function d(e){var t,n,d=this,f=e.itemDTO,p=e.reference,b=(0,r.mN)({defaultValues:f||{item:{},links:[{quantity:1}]},resolver:(0,a.u)(c.nE)}),v=b.register,h=b.handleSubmit,y=b.formState,E=y.errors,k=y.isSubmitting,g=b.control,N=b.reset,w=(0,r.jz)({control:g,name:"links"}),I=w.fields,x=w.append,A=w.remove,S=(0,r.FH)({control:g,name:"links"});return(0,l.useEffect)((function(){var e,t,n;(null===(e=null==S?void 0:S[S.length-1])||void 0===e?void 0:e.scannerId)&&(x({scannerId:"",quantity:1}),setTimeout((function(){var e;null===(e=document.getElementById("linkId-".concat(S.length-1)))||void 0===e||e.focus()}),0)),(null==S?void 0:S.length)>1&&!(null===(t=null==S?void 0:S[S.length-2])||void 0===t?void 0:t.scannerId)&&!(null===(n=null==S?void 0:S[S.length-1])||void 0===n?void 0:n.scannerId)&&A(S.length-1)}),[S]),(0,l.useEffect)((function(){f&&N(f)}),[f]),l.createElement("div",{className:"d-flex justify-content-center align-items-center"},l.createElement("form",{className:"w-75 p-3",onSubmit:h((function(e){return u(d,void 0,void 0,(function(){return m(this,(function(t){switch(t.label){case 0:return f?[4,o.A.patch("/api/item/edit",e)]:[3,2];case 1:return t.sent(),N(),[3,4];case 2:return[4,o.A.post("/api/item/create",e)];case 3:t.sent(),N(),t.label=4;case 4:return[2]}}))}))}),(function(e){console.error("Validation Errors: ",e)}))},l.createElement("div",{className:"mb-3"},l.createElement("label",{htmlFor:"nameInput",className:"form-label"},"Name"),l.createElement("input",s({},v("item.name"),{type:"text",id:"nameInput",className:"form-control",placeholder:"Item Name",autoFocus:!0})),(null===(t=E.item)||void 0===t?void 0:t.name)&&l.createElement("p",null,"".concat(E.item.name.message))),l.createElement("div",{className:"mb-3"},l.createElement("label",{htmlFor:"descriptionTextArea",className:"form-label"},"Description"),l.createElement("textarea",s({},v("item.description"),{id:"descriptionTextArea",className:"form-control",placeholder:"Item Description"})),(null===(n=E.item)||void 0===n?void 0:n.description)&&l.createElement("p",null,"".concat(E.item.description.message))),l.createElement(i.A,{control:g,name:"item.tags"}),l.createElement("table",{id:"linkTable",className:"table table-secondary table-hover table-striped"},l.createElement("thead",null,l.createElement("tr",null,l.createElement("th",{scope:"col"},"Scanner ID"),l.createElement("th",{scope:"col"},"Quantity"),l.createElement("th",{scope:"col"},"Remove"))),l.createElement("tbody",{id:"linkTableBody",className:"link"},I.map((function(e,t){var n;return l.createElement("tr",{key:e.id,"data-key":e.id},l.createElement("td",null,l.createElement("input",s({},v("links.".concat(t,".scannerId")),{id:"linkId-".concat(t),className:"form-control",defaultValue:e.scannerId}))),l.createElement("td",null,l.createElement("input",s({},v("links.".concat(t,".quantity"),{valueAsNumber:!0}),{className:"form-control",defaultValue:e.quantity}))),l.createElement("td",null,l.createElement("button",{type:"button",className:"btn-close","aria-label":"Close",onClick:function(){return function(e,t){return u(d,void 0,void 0,(function(){var n;return m(this,(function(l){switch(l.label){case 0:if(void 0===t)return A(e),[2];l.label=1;case 1:return l.trys.push([1,3,,4]),[4,o.A.delete("/api/link?id=".concat(t))];case 2:return l.sent(),A(e),[3,4];case 3:return n=l.sent(),console.error("Error deleting link: ",n),[3,4];case 4:return[2]}}))}))}(t,e.linkId?e.linkId:void 0)}})),E.links&&E.links[t]&&l.createElement("p",null,null===(n=E.links[t])||void 0===n?void 0:n.message))})))),l.createElement("button",{type:"submit",className:"btn btn-primary",disabled:k,ref:p,style:{display:p?"none":""}}," Create ")))}}}]);