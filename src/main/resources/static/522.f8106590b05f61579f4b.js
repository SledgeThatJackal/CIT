"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[522],{2522:(e,t,n)=>{n.r(t),n.d(t,{default:()=>C});var r=n(6540),a=n(1083),o=n(3048),l=n(4479),c=n(1105),i=n(1364),u=n(5605),s=n(5615),d=n(180),f=n(3552),p=n(1100),m=n(8917);const h=function(e){var t=e.index,n=e.tag,a=e.setDeleteTag,o=e.handleOpen,i=e.setEditId;return r.createElement(l.A,{key:"tagRow-".concat(t),className:"text-light pt-3 pb-3",style:{background:"#4B555F",borderTop:"3px solid #7B8895",borderBottom:"3px solid #7B8895"}},r.createElement(c.A,{className:"d-flex align-items-center me-auto"},r.createElement(m.A,{tag:n}),": ",n.description),r.createElement(c.A,null,r.createElement(p.A,{className:"d-flex justify-content-end"},r.createElement(s.A,{type:"button",variant:"info",onClick:function(){return i(n.id)}},"Edit"),r.createElement(s.A,{type:"button",variant:"danger",onClick:function(){a(n),o()}},"Delete"))))};var b=n(9785),g=n(4476),E=n(893),v=n(7303),y=function(){return y=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},y.apply(this,arguments)},A=g.z.object({id:g.z.number().optional().nullable(),tag:g.z.string(),color:g.z.string(),description:g.z.string()});const w=function(e){var t,n,o=e.tag,i=e.onEdit,f=e.closeEdit,p=e.onCreate,h=e.closeCreate,g=(0,r.useState)(o||{id:-1,tag:"Example Name",color:"#00AAFF",description:"Example Description"}),w=g[0],x=g[1],k=(0,b.mN)({defaultValues:o||{color:"#00AAFF"},resolver:(0,E.u)(A)}),C=k.register,N=k.handleSubmit,S=k.formState,F=S.errors,B=S.isSubmitting,I=k.control,j=k.reset,D=k.setFocus,O=(0,b.FH)({control:I});return(0,r.useEffect)((function(){x((function(){var e,t,n,r;return{id:null!==(e=O.id)&&void 0!==e?e:-1,tag:null!==(t=O.tag)&&void 0!==t?t:"Example Name",color:null!==(n=O.color)&&void 0!==n?n:"#00AAFF",description:null!==(r=O.description)&&void 0!==r?r:"Example Description"}}))}),[O]),r.createElement(d.A,{onSubmit:N((function(e){return t=void 0,n=void 0,l=function(){var t;return function(e,t){var n,r,a,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]},l=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return l.next=c(0),l.throw=c(1),l.return=c(2),"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function c(c){return function(i){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;l&&(l=0,c[0]&&(o=0)),o;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return o.label++,{value:c[1],done:!1};case 5:o.label++,r=c[1],c=[0];continue;case 7:c=o.ops.pop(),o.trys.pop();continue;default:if(!((a=(a=o.trys).length>0&&a[a.length-1])||6!==c[0]&&2!==c[0])){o=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){o.label=c[1];break}if(6===c[0]&&o.label<a[1]){o.label=a[1],a=c;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(c);break}a[2]&&o.ops.pop(),o.trys.pop();continue}c=t.call(e,o)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,i])}}}(this,(function(n){switch(n.label){case 0:return n.trys.push([0,5,,6]),o?[4,a.A.patch("/api/tags/edit",e)]:[3,2];case 1:return n.sent(),i&&i(),[3,4];case 2:return[4,a.A.post("/api/tags/create",e)];case 3:n.sent(),j({id:void 0,tag:"",color:"#00AAFF",description:""}),p&&p(),D("tag"),n.label=4;case 4:return[3,6];case 5:return t=n.sent(),console.error("An error occured when trying to ".concat(o?"edit":"create"," a tag | Message: ").concat(t)),[3,6];case 6:return[2]}}))},new((r=void 0)||(r=Promise))((function(e,a){function o(e){try{i(l.next(e))}catch(e){a(e)}}function c(e){try{i(l.throw(e))}catch(e){a(e)}}function i(t){var n;t.done?e(t.value):(n=t.value,n instanceof r?n:new r((function(e){e(n)}))).then(o,c)}i((l=l.apply(t,n||[])).next())}));var t,n,r,l}))},r.createElement(l.A,{className:"text-light pt-3 pb-3 ".concat(!o&&"rounded w-75 mx-auto"),style:{background:"#4B555F",borderTop:"3px solid #7B8895",borderBottom:"3px solid #7B8895"}},r.createElement(c.A,{md:"auto",as:u.A,direction:"horizontal",gap:2},r.createElement(m.A,{tag:w}),r.createElement("div",{className:"vr"})),r.createElement(d.A.Group,{as:c.A,md:"3",controlId:"tagName"},r.createElement(v.A,{controlId:"floatingNameInput",label:"Name",className:"text-dark"},r.createElement(d.A.Control,y({},C("tag"),{type:"text",placeholder:"Enter name here...",autoFocus:!0}))),r.createElement(d.A.Control.Feedback,{type:"invalid"},null===(t=F.tag)||void 0===t?void 0:t.message)),r.createElement(d.A.Group,{as:c.A,md:"3",controlId:"tagDescription"},r.createElement(v.A,{controlId:"floatingDescriptionInput",label:"Description",className:"text-dark"},r.createElement(d.A.Control,y({},C("description"),{type:"text",placeholder:"Enter description here..."}))),r.createElement(d.A.Control.Feedback,null,null===(n=F.description)||void 0===n?void 0:n.message)),r.createElement(d.A.Group,{as:c.A,md:"1",controlId:"tagColor"},r.createElement(d.A.Control,y({},C("color"),{type:"color",className:"h-100 w-100"}))),r.createElement(c.A,{md:"2",as:u.A,direction:"horizontal",gap:2},r.createElement("div",{className:"vr"}),r.createElement(s.A,{type:"submit",variant:"success",disabled:B},o?"Edit":"Save"),r.createElement(s.A,{type:"button",variant:"outline-danger",onClick:function(){h&&h(),f&&f()}},"Cancel"))))};var x=function(e,t,n,r){return new(n||(n=Promise))((function(a,o){function l(e){try{i(r.next(e))}catch(e){o(e)}}function c(e){try{i(r.throw(e))}catch(e){o(e)}}function i(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,c)}i((r=r.apply(e,t||[])).next())}))},k=function(e,t){var n,r,a,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]},l=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return l.next=c(0),l.throw=c(1),l.return=c(2),"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function c(c){return function(i){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;l&&(l=0,c[0]&&(o=0)),o;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return o.label++,{value:c[1],done:!1};case 5:o.label++,r=c[1],c=[0];continue;case 7:c=o.ops.pop(),o.trys.pop();continue;default:if(!((a=(a=o.trys).length>0&&a[a.length-1])||6!==c[0]&&2!==c[0])){o=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){o.label=c[1];break}if(6===c[0]&&o.label<a[1]){o.label=a[1],a=c;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(c);break}a[2]&&o.ops.pop(),o.trys.pop();continue}c=t.call(e,o)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,i])}}};const C=function(){var e=this,t=(0,r.useState)([]),n=t[0],p=t[1],m=(0,r.useState)(!1),b=m[0],g=m[1],E=function(){return g(!0)},v=(0,r.useState)(),y=v[0],A=v[1],C=(0,r.useState)(!1),N=C[0],S=C[1],F=(0,r.useState)(!1),B=F[0],I=F[1],j=function(){return S(!1)},D=(0,r.useState)(-1),O=D[0],T=D[1],z=function(){return T(-1)},G=(0,r.useState)(""),P=G[0],L=G[1],R=(0,r.useState)([]),q=R[0],H=R[1],M=function(){return x(e,void 0,void 0,(function(){var e,t;return k(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,a.A.get("/api/tags")];case 1:return e=n.sent(),p(e.data),[3,3];case 2:return t=n.sent(),console.error("Request failed: ",t),[3,3];case 3:return[2]}}))}))};(0,r.useEffect)((function(){M()}),[]),(0,r.useEffect)((function(){n&&H(n.filter((function(e){return e.tag.toLowerCase().includes(P.toLowerCase())})))}),[n,P]);var V=function(){z(),M()};return r.createElement(r.Fragment,null,r.createElement(f.default,{show:b,handleClose:function(){return g(!1)},onDelete:function(){return x(e,void 0,void 0,(function(){var e;return k(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,a.A.delete("/api/tags/delete?id=".concat(null==y?void 0:y.id))];case 1:return t.sent(),p(n.filter((function(e){return e!==y}))),[3,3];case 2:return e=t.sent(),console.error("Error deleting tag: ",e),[3,3];case 3:return[2]}}))}))},message:"Are you sure you want to delete this tag?"}),r.createElement(o.A,{fluid:!0},r.createElement(l.A,null,r.createElement("h2",null,"Tags")),r.createElement(l.A,null,r.createElement("hr",null)),r.createElement(l.A,{className:"mx-auto justify-content-center w-75 mb-3"},r.createElement(c.A,null,r.createElement(i.A,{type:"text",className:"w-75","aria-label":"Search",id:"searchInput",placeholder:"Search...",value:P,onChange:function(e){return L(e.target.value)}})),r.createElement(c.A,{as:u.A,direction:"horizontal",gap:2,className:"d-flex justify-content-end"},r.createElement(s.A,{variant:"success",onClick:function(){return S(!0)},disabled:N},"Create"),r.createElement(d.A.Switch,{className:"my-auto",id:"bulkSwitch",label:"Bulk Create",onChange:function(){return I(!B)},disabled:!N}))),N&&r.createElement(w,{closeCreate:j,onCreate:function(){B||j(),M()}})),r.createElement(o.A,{fluid:!0,className:"rounded bg-dark text-white mt-3 w-75 overflow-auto",style:{height:"65vh",border:"3px solid #7B8895"}},r.createElement(l.A,{className:"p-3"},"Tags: ",q.length||0," out of ",n.length||0),q.length>0?q.map((function(e,t){return r.createElement(r.Fragment,null,O===e.id?r.createElement(w,{tag:e,onEdit:V,closeEdit:z}):r.createElement(h,{index:t,tag:e,setDeleteTag:A,handleOpen:E,setEditId:T}))})):r.createElement(l.A,{className:"text-center",style:{background:"#4B555F",borderTop:"3px solid #7B8895",borderBottom:"3px solid #7B8895"}},r.createElement("h4",null,"No tags found."))))}}}]);