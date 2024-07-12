"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[401],{5310:(e,t,n)=>{n.d(t,{A:()=>o});var a=n(1601),r=n.n(a),l=n(6314),c=n.n(l)()(r());c.push([e.id,".collapsing {\n    transition: none !important;\n}",""]);const o=c},401:(e,t,n)=>{n.r(t),n.d(t,{default:()=>D});var a=n(6540),r=n(4976),l=n(1083),c=n(5076),o=n(3552),i=n(1118);const s=function(e){var t=e.data,n=e.onDataUpdate,r=(0,a.useRef)(null);return a.createElement("div",{className:"modal fade",id:"editModal",tabIndex:-1,"aria-labelledby":"editModalLabel","aria-hidden":"true"},a.createElement("div",{className:"modal-dialog"},a.createElement("div",{className:"modal-content"},a.createElement("div",{className:"modal-header"},a.createElement("h1",{className:"modal-title fs-5",id:"editModalLabel"},"Edit"),a.createElement("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})),a.createElement("div",{className:"modal-body"},a.createElement(i.default,{itemCreationDTO:t,reference:r})),a.createElement("div",{className:"modal-footer"},a.createElement("button",{type:"button",className:"btn btn-secondary","data-bs-dismiss":"modal"},"Cancel"),a.createElement("button",{type:"button",onClick:function(){var e;null===(e=r.current)||void 0===e||e.click(),setTimeout((function(){n()}),50)},className:"btn btn-info","data-bs-dismiss":"modal"},"Update")))))};var u=n(5072),m=n.n(u),d=n(7825),b=n.n(d),f=n(7659),p=n.n(f),E=n(5056),h=n.n(E),v=n(540),g=n.n(v),y=n(1113),N=n.n(y),w=n(5310),k={};k.styleTagTransform=N(),k.setAttributes=h(),k.insert=p().bind(null,"head"),k.domAPI=b(),k.insertStyleElement=g(),m()(w.A,k),w.A&&w.A.locals&&w.A.locals;const S=function(e){var t=e.onSearch;return a.createElement("div",{className:"container mt-5"},a.createElement("div",{className:"input-group mb-3"},a.createElement("input",{type:"text",className:"form-control","aria-label":"Search",id:"searchInput",placeholder:"Search",onChange:function(e){t(e.target.value)}})))};var A=n(8917),C=function(e,t,n,a){return new(n||(n=Promise))((function(r,l){function c(e){try{i(a.next(e))}catch(e){l(e)}}function o(e){try{i(a.throw(e))}catch(e){l(e)}}function i(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,o)}i((a=a.apply(e,t||[])).next())}))},x=function(e,t){var n,a,r,l,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return l={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function o(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;l&&(l=0,o[0]&&(c=0)),c;)try{if(n=1,a&&(r=2&o[0]?a.return:o[0]?a.throw||((r=a.return)&&r.call(a),0):a.next)&&!(r=r.call(a,o[1])).done)return r;switch(a=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return c.label++,{value:o[1],done:!1};case 5:c.label++,a=o[1],o=[0];continue;case 7:o=c.ops.pop(),c.trys.pop();continue;default:if(!((r=(r=c.trys).length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){c=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){c.label=o[1];break}if(6===o[0]&&c.label<r[1]){c.label=r[1],r=o;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(o);break}r[2]&&c.ops.pop(),c.trys.pop();continue}o=t.call(e,c)}catch(e){o=[6,e],a=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}};const D=function(){var e=this,t=(0,a.useState)(0),n=t[0],i=t[1],u=(0,a.useState)(1),m=u[0],d=u[1],b=(0,a.useState)([]),f=b[0],p=b[1],E=(0,a.useState)(""),h=E[0],v=E[1],g=(0,a.useState)(-1),y=g[0],N=g[1],w=(0,a.useState)(void 0),k=w[0],D=w[1];(0,a.useEffect)((function(){I()}),[n,h]);var I=function(){return C(e,void 0,void 0,(function(){var e,t,a;return x(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),e="/api/item?page=".concat(n,"&search=").concat(h),[4,l.A.get(e)];case 1:return t=r.sent(),p(t.data.content),d(t.data.totalPages),[3,3];case 2:return a=r.sent(),console.error("Request failed: ",a),[3,3];case 3:return[2]}}))}))};return a.createElement("div",null,a.createElement(S,{onSearch:v}),a.createElement(o.A,{onDelete:function(){return C(e,void 0,void 0,(function(){var e;return x(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,l.A.delete("/api/item/delete?id=".concat(y))];case 1:return t.sent(),p(f.filter((function(e){return e.item.id!==y}))),[3,3];case 2:return e=t.sent(),console.error("Error deleteing entry: ",e),[3,3];case 3:return[2]}}))}))}}),"\\",a.createElement(s,{data:k,onDataUpdate:I}),a.createElement("table",{className:"table table-secondary table-hover"},a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",{scope:"col"},"id"),a.createElement("th",{scope:"col"},"Name"),a.createElement("th",{scope:"col"},"Description"),a.createElement("th",{scope:"col"},"Tag(s)"),a.createElement("th",{scope:"col"},a.createElement(r.k2,{to:"/item/form",className:"btn btn-primary btn-sm",role:"button"},"Create")))),a.createElement("tbody",{className:"table-group-divider"},f.map((function(t,n){return a.createElement(a.Fragment,null,a.createElement("tr",{key:"item-".concat(n),"data-bs-toggle":"collapse","data-bs-target":"#containers-".concat(t.item.id),"aria-expanded":!1,"aria-controls":"containers-".concat(t.item.id)},a.createElement("th",{scope:"row"},t.item.id),a.createElement("td",null,t.item.name),a.createElement("td",null,t.item.description),a.createElement("td",null,t.item.tags&&t.item.tags.length>0&&a.createElement(a.Fragment,null,t.item.tags.map((function(e,t){return a.createElement(A.A,{key:"tag-".concat(n,"-").concat(t),tag:e})})))),a.createElement("td",null,a.createElement("div",{className:"btn-group"},a.createElement("button",{type:"button",className:"btn btn-info btn-sm",onClick:function(){return n=t.item.id,C(e,void 0,void 0,(function(){var e,t;return x(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,l.A.get("/api/item/edit?itemId=".concat(n))];case 1:return e=a.sent().data,D(e),[3,3];case 2:return t=a.sent(),console.error("Error fetching item: ",t),[3,3];case 3:return[2]}}))}));var n},"data-bs-toggle":"modal","data-bs-target":"#editModal"},"Edit"),a.createElement("button",{type:"button",onClick:function(){return N(t.item.id)},className:"btn btn-danger btn-sm","data-bs-toggle":"modal","data-bs-target":"#confirmationModal"},"Delete")))),t.containers.length>0&&a.createElement("tr",null,a.createElement("td",{colSpan:5,className:"collapse",id:"containers-".concat(t.item.id)},a.createElement("table",{className:"table table-info table-hover table-striped"},a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",{scope:"col"},"id"),a.createElement("th",{scope:"col"},"Name"),a.createElement("th",{scope:"col"},"Description"),a.createElement("th",{scope:"col"},"Scanner ID"))),a.createElement("tbody",null,t.containers.map((function(e,t){return a.createElement("tr",{key:"container-".concat(n,"-").concat(t)},a.createElement("th",{scope:"row"},e.id),a.createElement("td",null,e.name),a.createElement("td",null,e.description),a.createElement("td",null,e.scannerId))})))))))})))),a.createElement(c.A,{currentPage:n,totalPages:m,onPageChange:i}))}}}]);