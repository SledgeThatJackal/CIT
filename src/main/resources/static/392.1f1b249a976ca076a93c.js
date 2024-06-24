"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[392],{5310:(e,t,n)=>{n.d(t,{A:()=>o});var a=n(1601),r=n.n(a),c=n(6314),l=n.n(c)()(r());l.push([e.id,".collapsing {\n    transition: none !important;\n}",""]);const o=l},392:(e,t,n)=>{n.r(t),n.d(t,{default:()=>x});var a=n(6540),r=n(7767),c=n(4976),l=n(1083),o=n(5076),i=n(3552),s=n(5072),u=n.n(s),m=n(7825),d=n.n(m),p=n(7659),f=n.n(p),h=n(5056),b=n.n(h),E=n(540),g=n.n(E),y=n(1113),v=n.n(y),w=n(5310),k={};k.styleTagTransform=v(),k.setAttributes=b(),k.insert=f().bind(null,"head"),k.domAPI=d(),k.insertStyleElement=g(),u()(w.A,k),w.A&&w.A.locals&&w.A.locals;const S=function(e){var t=e.onSearch;return a.createElement("div",{className:"container mt-5"},a.createElement("div",{className:"input-group mb-3"},a.createElement("input",{type:"text",className:"form-control","aria-label":"Search",id:"searchInput",placeholder:"Search",onChange:function(e){t(e.target.value)}})))};var N=function(e,t,n,a){return new(n||(n=Promise))((function(r,c){function l(e){try{i(a.next(e))}catch(e){c(e)}}function o(e){try{i(a.throw(e))}catch(e){c(e)}}function i(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,o)}i((a=a.apply(e,t||[])).next())}))},A=function(e,t){var n,a,r,c,l={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return c={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function o(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;c&&(c=0,o[0]&&(l=0)),l;)try{if(n=1,a&&(r=2&o[0]?a.return:o[0]?a.throw||((r=a.return)&&r.call(a),0):a.next)&&!(r=r.call(a,o[1])).done)return r;switch(a=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return l.label++,{value:o[1],done:!1};case 5:l.label++,a=o[1],o=[0];continue;case 7:o=l.ops.pop(),l.trys.pop();continue;default:if(!((r=(r=l.trys).length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){l=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){l.label=o[1];break}if(6===o[0]&&l.label<r[1]){l.label=r[1],r=o;break}if(r&&l.label<r[2]){l.label=r[2],l.ops.push(o);break}r[2]&&l.ops.pop(),l.trys.pop();continue}o=t.call(e,l)}catch(e){o=[6,e],a=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}};const x=function(){var e=this,t=(0,a.useState)(0),n=t[0],s=t[1],u=(0,a.useState)(1),m=u[0],d=u[1],p=(0,a.useState)([]),f=p[0],h=p[1],b=(0,a.useState)(""),E=b[0],g=b[1],y=(0,a.useState)(-1),v=y[0],w=y[1],k=(0,r.Zp)();return(0,a.useEffect)((function(){N(e,void 0,void 0,(function(){var e,t,a;return A(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),e="/api/item?page=".concat(n,"&search=").concat(E),[4,l.A.get(e)];case 1:return t=r.sent(),h(t.data.content),d(t.data.totalPages),[3,3];case 2:return a=r.sent(),console.log("Request failed: ",a),[3,3];case 3:return[2]}}))}))}),[n,E]),a.createElement("div",null,a.createElement(S,{onSearch:g}),a.createElement(i.A,{onDelete:function(){return N(e,void 0,void 0,(function(){var e;return A(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,l.A.delete("/api/item/delete?id=".concat(v))];case 1:return t.sent(),h(f.filter((function(e){return e.item.id!==v}))),[3,3];case 2:return e=t.sent(),console.error("Error deleteing entry: ",e),[3,3];case 3:return[2]}}))}))}}),a.createElement("table",{className:"table table-secondary table-hover"},a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",{scope:"col"},"id"),a.createElement("th",{scope:"col"},"Name"),a.createElement("th",{scope:"col"},"Description"),a.createElement("th",{scope:"col"},a.createElement(c.k2,{to:"/item/form",className:"btn btn-primary btn-sm",role:"button"},"Create")),a.createElement("th",{scope:"col"},"Tag(s)"))),a.createElement("tbody",{className:"table-group-divider"},f.map((function(t,n){return a.createElement(a.Fragment,null,a.createElement("tr",{key:"item-".concat(n),"data-bs-toggle":"collapse","data-bs-target":"#containers-".concat(t.item.id),"aria-expanded":!1,"aria-controls":"containers-".concat(t.item.id)},a.createElement("th",{scope:"row"},t.item.id),a.createElement("td",null,t.item.name),a.createElement("td",null,t.item.description),a.createElement("td",null,a.createElement("div",{className:"btn-group"},a.createElement("button",{type:"button",className:"btn btn-info btn-sm",onClick:function(){return n=t.item.id,N(e,void 0,void 0,(function(){var e,t;return A(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,l.A.get("/api/item/edit?itemId=".concat(n))];case 1:return e=a.sent().data,k("/item/form",{state:{response:e}}),[3,3];case 2:return t=a.sent(),console.error("Error fetching item: ",t),[3,3];case 3:return[2]}}))}));var n}},"Edit"),a.createElement("button",{type:"button",onClick:function(){return w(t.item.id)},className:"btn btn-danger btn-sm","data-bs-toggle":"modal","data-bs-target":"#confirmationModal"},"Delete"))),a.createElement("td",null,t.item.tags&&t.item.tags.length>0&&a.createElement(a.Fragment,null,t.item.tags.map((function(e,t){return a.createElement("div",{key:"tag-".concat(n,"-").concat(t),className:"d-inline-flex badge rounded-pill align-items-center",style:{backgroundColor:e.color}},a.createElement("span",{style:{color:e.color,mixBlendMode:"multiply",whiteSpace:"nowrap"}},e.tag))}))))),t.containers.length>0&&a.createElement("tr",null,a.createElement("td",{colSpan:5,className:"collapse",id:"containers-".concat(t.item.id)},a.createElement("table",{className:"table table-info table-hover table-striped"},a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",{scope:"col"},"id"),a.createElement("th",{scope:"col"},"Name"),a.createElement("th",{scope:"col"},"Description"),a.createElement("th",{scope:"col"},"Scanner ID"))),a.createElement("tbody",null,t.containers.map((function(e,t){return a.createElement("tr",{key:"container-".concat(n,"-").concat(t)},a.createElement("th",{scope:"row"},e.id),a.createElement("td",null,e.name),a.createElement("td",null,e.description),a.createElement("td",null,e.scannerId))})))))))})))),a.createElement(o.A,{currentPage:n,totalPages:m,onPageChange:s}))}}}]);