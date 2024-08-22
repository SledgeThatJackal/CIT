"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[344],{5310:(e,t,n)=>{n.d(t,{A:()=>o});var a=n(1601),r=n.n(a),l=n(6314),c=n.n(l)()(r());c.push([e.id,".collapsing {\n    transition: none !important;\n}",""]);const o=c},1344:(e,t,n)=>{n.r(t),n.d(t,{default:()=>q});var a=n(6540),r=n(9785),l=n(4976),c=n(1083),o=n(893),i=n(5076),s=n(3552),u=n(5072),m=n.n(u),d=n(7825),f=n.n(d),p=n(7659),b=n.n(p),h=n(5056),E=n.n(h),v=n(540),y=n.n(v),g=n(1113),k=n.n(g),w=n(5310),N={};N.styleTagTransform=k(),N.setAttributes=E(),N.insert=b().bind(null,"head"),N.domAPI=f(),N.insertStyleElement=y(),m()(w.A,N),w.A&&w.A.locals&&w.A.locals;const S=function(e){var t=e.onSearch;return a.createElement("div",{className:"container mt-5"},a.createElement("div",{className:"input-group mb-3"},a.createElement("input",{type:"text",className:"form-control","aria-label":"Search",id:"searchInput",placeholder:"Search",onChange:function(e){t(e.target.value)}})))};var I=n(8917);const x=function(e){var t=e.containers,n=e.index,r=e.containerItems;return a.createElement(a.Fragment,null,a.createElement("table",{className:"table table-info table-hover table-striped"},a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",{scope:"col"},"Name"),a.createElement("th",{scope:"col"},"Description"),a.createElement("th",{scope:"col"},"Container ID"),a.createElement("th",{scope:"col"},"Quantity"))),a.createElement("tbody",null,t.map((function(e,t){var l;return a.createElement("tr",{key:"container-".concat(n,"-").concat(t)},a.createElement("th",{scope:"row"},e.name),a.createElement("td",null,e.description),a.createElement("td",null,e.scannerId),a.createElement("td",null,null===(l=null==r?void 0:r[t])||void 0===l?void 0:l.quantity)," ")})))))},A=function(e){var t=e.itemDTO,n=e.index,r=e.onDelete,l=e.onEdit;return a.createElement(a.Fragment,null,a.createElement("tr",{key:"item-".concat(n),className:"table-secondary","data-bs-toggle":"collapse","data-bs-target":"#containers-".concat(t.item.id),"aria-expanded":!1,"aria-controls":"containers-".concat(t.item.id)},a.createElement("th",{scope:"row"},t.item.name),a.createElement("td",null,t.item.description),a.createElement("td",null,t.item.tags&&t.item.tags.length>0&&a.createElement(a.Fragment,null,t.item.tags.map((function(e,t){return a.createElement(I.A,{key:"tag-".concat(n,"-").concat(t),tag:e})})))),a.createElement("td",null,a.createElement("div",{className:"btn-group"},a.createElement("button",{type:"button",className:"btn btn-info btn-sm",onClick:function(){return l(t.item.id)}},"Edit"),a.createElement("button",{type:"button",onClick:function(){return r(t.item.id)},className:"btn btn-danger btn-sm","data-bs-toggle":"modal","data-bs-target":"#confirmationModal"},"Delete")))),t.containers.length>0&&a.createElement("tr",{className:"table-secondary"},a.createElement("td",{colSpan:5,className:"collapse",id:"containers-".concat(t.item.id)},a.createElement(x,{containers:t.containers,index:n,containerItems:t.item.containerItems}))))};var D=n(9668),C=function(){return C=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},C.apply(this,arguments)};const T=function(e){var t,n,l=e.itemCreationDTO,c=(e.onSubmit,e.handleDelete),o=e.cancelEdit,i=(0,r.xW)(),s=i.register,u=i.formState,m=u.errors,d=u.isSubmitting,f=i.control,p=i.reset,b=(0,r.jz)({control:f,name:"links"}),h=b.fields,E=b.append,v=b.remove,y=(0,r.FH)({control:f,name:"links"});return(0,a.useEffect)((function(){var e,t,n;(null===(e=null==y?void 0:y[y.length-1])||void 0===e?void 0:e.scannerId)&&(E({scannerId:"",quantity:1}),setTimeout((function(){var e;null===(e=document.getElementById("linkId-".concat(y.length-1)))||void 0===e||e.focus()}),0)),(null==y?void 0:y.length)>1&&!(null===(t=null==y?void 0:y[y.length-2])||void 0===t?void 0:t.scannerId)&&!(null===(n=null==y?void 0:y[y.length-1])||void 0===n?void 0:n.scannerId)&&v(y.length-1)}),[y]),(0,a.useEffect)((function(){p(l)}),[l,p]),a.createElement(a.Fragment,null,a.createElement("tr",{key:"item-edit-".concat(null==l?void 0:l.item.id),className:"table-primary"},a.createElement("td",null,a.createElement("input",C({},s("item.name"),{type:"text",id:"nameInput",className:"form-control",placeholder:"Item Name",autoFocus:!0})),(null===(t=m.item)||void 0===t?void 0:t.name)&&a.createElement("p",null,"".concat(m.item.name.message))),a.createElement("td",null,a.createElement("textarea",C({},s("item.description"),{id:"descriptionTextArea",className:"form-control",placeholder:"Item Description"})),(null===(n=m.item)||void 0===n?void 0:n.description)&&a.createElement("p",null,"".concat(m.item.description.message))),a.createElement("td",null,a.createElement(D.A,{control:f,name:"item.tags"})),a.createElement("td",null,a.createElement("div",{className:"btn-group"},a.createElement("button",{type:"submit",className:"btn btn-primary btn-sm",disabled:d}," Save "),a.createElement("button",{type:"button",className:"btn btn-danger btn-sm",onClick:function(){return o(-1)}},"Discard")))),a.createElement("tr",{className:"table-primary"},a.createElement("td",{colSpan:5},a.createElement("table",{id:"linkTable",className:"table table-info table-striped"},a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",{scope:"col"},"Container ID"),a.createElement("th",{scope:"col"},"Quantity"),a.createElement("th",{scope:"col"},"Remove"))),a.createElement("tbody",{id:"linkTableBody",className:"link"},h.map((function(e,t){var n;return a.createElement("tr",{key:e.id,"data-key":e.id},a.createElement("td",null,a.createElement("input",C({},s("links.".concat(t,".scannerId")),{id:"linkId-".concat(t),className:"form-control",defaultValue:e.scannerId,disabled:""!==e.scannerId}))),a.createElement("td",null,a.createElement("input",C({},s("links.".concat(t,".quantity"),{valueAsNumber:!0}),{className:"form-control",defaultValue:e.quantity}))),a.createElement("td",null,a.createElement("button",{type:"button",className:"btn-close","aria-label":"Close",onClick:function(){return function(e,t){return n=void 0,a=void 0,l=function(){return function(e,t){var n,a,r,l,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return l={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function o(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;l&&(l=0,o[0]&&(c=0)),c;)try{if(n=1,a&&(r=2&o[0]?a.return:o[0]?a.throw||((r=a.return)&&r.call(a),0):a.next)&&!(r=r.call(a,o[1])).done)return r;switch(a=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return c.label++,{value:o[1],done:!1};case 5:c.label++,a=o[1],o=[0];continue;case 7:o=c.ops.pop(),c.trys.pop();continue;default:if(!((r=(r=c.trys).length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){c=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){c.label=o[1];break}if(6===o[0]&&c.label<r[1]){c.label=r[1],r=o;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(o);break}r[2]&&c.ops.pop(),c.trys.pop();continue}o=t.call(e,c)}catch(e){o=[6,e],a=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}}(this,(function(n){switch(n.label){case 0:return void 0===t?(v(e),[2]):[4,c(e,t)];case 1:return n.sent()&&v(e),[2]}}))},new((r=void 0)||(r=Promise))((function(e,t){function c(e){try{i(l.next(e))}catch(e){t(e)}}function o(e){try{i(l.throw(e))}catch(e){t(e)}}function i(t){var n;t.done?e(t.value):(n=t.value,n instanceof r?n:new r((function(e){e(n)}))).then(c,o)}i((l=l.apply(n,a||[])).next())}));var n,a,r,l}(t,e.linkId?e.linkId:void 0)}})),m.links&&m.links[t]&&a.createElement("p",null,null===(n=m.links[t])||void 0===n?void 0:n.message))})))))))};var O=n(5914),P=function(){return P=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},P.apply(this,arguments)},F=function(e,t,n,a){return new(n||(n=Promise))((function(r,l){function c(e){try{i(a.next(e))}catch(e){l(e)}}function o(e){try{i(a.throw(e))}catch(e){l(e)}}function i(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,o)}i((a=a.apply(e,t||[])).next())}))},j=function(e,t){var n,a,r,l,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return l={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function o(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;l&&(l=0,o[0]&&(c=0)),c;)try{if(n=1,a&&(r=2&o[0]?a.return:o[0]?a.throw||((r=a.return)&&r.call(a),0):a.next)&&!(r=r.call(a,o[1])).done)return r;switch(a=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return c.label++,{value:o[1],done:!1};case 5:c.label++,a=o[1],o=[0];continue;case 7:o=c.ops.pop(),c.trys.pop();continue;default:if(!((r=(r=c.trys).length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){c=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){c.label=o[1];break}if(6===o[0]&&c.label<r[1]){c.label=r[1],r=o;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(o);break}r[2]&&c.ops.pop(),c.trys.pop();continue}o=t.call(e,c)}catch(e){o=[6,e],a=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}};const q=function(){var e=this,t=(0,a.useState)(0),n=t[0],u=t[1],m=(0,a.useState)(1),d=m[0],f=m[1],p=(0,a.useState)([]),b=p[0],h=p[1],E=(0,a.useState)(""),v=E[0],y=E[1],g=(0,a.useState)(-1),k=g[0],w=g[1],N=(0,a.useState)(void 0),I=N[0],x=N[1],D=(0,a.useState)(),C=D[0],q=D[1],R=(0,r.mN)({defaultValues:{},resolver:(0,o.u)(O.nE)});(0,a.useEffect)((function(){V(),x(-1)}),[n,v]);var V=function(){return F(e,void 0,void 0,(function(){var e,t,a;return j(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),e="/api/item?page=".concat(n,"&search=").concat(v),[4,c.A.get(e)];case 1:return t=r.sent(),h(t.data.content),f(t.data.totalPages),[3,3];case 2:return a=r.sent(),console.error("Request failed: ",a),[3,3];case 3:return[2]}}))}))},B=function(t){return F(e,void 0,void 0,(function(){return j(this,(function(e){return c.A.patch("/api/item/edit",t),x(-1),[2]}))}))},G=function(t,n){return F(e,void 0,void 0,(function(){var e;return j(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,c.A.delete("/api/link?id=".concat(n))];case 1:return t.sent(),[2,!0];case 2:return e=t.sent(),console.error("Error deleting link: ",e),[2,!1];case 3:return[2]}}))}))},Q=function(t){return F(e,void 0,void 0,(function(){var e,n;return j(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,c.A.get("/api/item/edit?itemId=".concat(t))];case 1:return e=a.sent().data,q(e),x(e.item.id),[3,3];case 2:return n=a.sent(),console.error("Error fetching item: ",n),[3,3];case 3:return[2]}}))}))};return a.createElement("div",null,a.createElement(S,{onSearch:y}),a.createElement(s.A,{onDelete:function(){return F(e,void 0,void 0,(function(){var e;return j(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,c.A.delete("/api/item/delete?id=".concat(k))];case 1:return t.sent(),h(b.filter((function(e){return e.item.id!==k}))),[3,3];case 2:return e=t.sent(),console.error("Error deleteing entry: ",e),[3,3];case 3:return[2]}}))}))}}),a.createElement(r.Op,P({},R),a.createElement("form",{onSubmit:R.handleSubmit(B)},a.createElement("table",{className:"table table-secondary table-hover"},a.createElement("thead",null,a.createElement("tr",{className:"table-secondary"},a.createElement("th",{scope:"col"},"Name"),a.createElement("th",{scope:"col"},"Description"),a.createElement("th",{scope:"col"},"Tag(s)"),a.createElement("th",{scope:"col"},a.createElement(l.k2,{to:"/item/form",className:"btn btn-primary btn-sm",role:"button"},"Create")))),a.createElement("tbody",{className:"table-group-divider"},b.map((function(e,t){return a.createElement(a.Fragment,null,I===e.item.id?a.createElement(T,{key:"editRow",itemCreationDTO:C,onSubmit:B,handleDelete:G,cancelEdit:x}):a.createElement(A,{key:"readRow",itemDTO:e,index:t,onDelete:w,onEdit:Q}))})))))),a.createElement(i.A,{currentPage:n,totalPages:d,onPageChange:u}))}}}]);