"use strict";exports.id=790,exports.ids=[790],exports.modules={790:(e,t,n)=>{n.r(t),n.d(t,{toFormData:()=>f});var r=n(561),a=(n(411),n(86)),s=n(193);n(6);const{stat:o}=r.promises;globalThis.DOMException||(()=>{const e=(new a.MessageChannel).port1,t=new ArrayBuffer(0);try{e.postMessage(t,[t,t])}catch(e){return e.constructor}})(),Symbol.toStringTag;var i=n(951);let d=0;const E={START_BOUNDARY:d++,HEADER_FIELD_START:d++,HEADER_FIELD:d++,HEADER_VALUE_START:d++,HEADER_VALUE:d++,HEADER_VALUE_ALMOST_DONE:d++,HEADERS_ALMOST_DONE:d++,PART_DATA_START:d++,PART_DATA:d++,END:d++};let A=1;const h=A,l=A*=2,c=e=>32|e,D=()=>{};class T{constructor(e){this.index=0,this.flags=0,this.onHeaderEnd=D,this.onHeaderField=D,this.onHeadersEnd=D,this.onHeaderValue=D,this.onPartBegin=D,this.onPartData=D,this.onPartEnd=D,this.boundaryChars={},e="\r\n--"+e;const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n),this.boundaryChars[t[n]]=!0;this.boundary=t,this.lookbehind=new Uint8Array(this.boundary.length+8),this.state=E.START_BOUNDARY}write(e){let t=0;const n=e.length;let r=this.index,{lookbehind:a,boundary:s,boundaryChars:o,index:i,state:d,flags:A}=this;const D=this.boundary.length,T=D-1,f=e.length;let _,u;const R=e=>{this[e+"Mark"]=t},H=e=>{delete this[e+"Mark"]},b=(e,t,n,r)=>{void 0!==t&&t===n||this[e](r&&r.subarray(t,n))},g=(n,r)=>{const a=n+"Mark";a in this&&(r?(b(n,this[a],t,e),delete this[a]):(b(n,this[a],e.length,e),this[a]=0))};for(t=0;t<n;t++)switch(_=e[t],d){case E.START_BOUNDARY:if(i===s.length-2){if(45===_)A|=l;else if(13!==_)return;i++;break}if(i-1==s.length-2){if(A&l&&45===_)d=E.END,A=0;else{if(A&l||10!==_)return;i=0,b("onPartBegin"),d=E.HEADER_FIELD_START}break}_!==s[i+2]&&(i=-2),_===s[i+2]&&i++;break;case E.HEADER_FIELD_START:d=E.HEADER_FIELD,R("onHeaderField"),i=0;case E.HEADER_FIELD:if(13===_){H("onHeaderField"),d=E.HEADERS_ALMOST_DONE;break}if(i++,45===_)break;if(58===_){if(1===i)return;g("onHeaderField",!0),d=E.HEADER_VALUE_START;break}if(u=c(_),u<97||u>122)return;break;case E.HEADER_VALUE_START:if(32===_)break;R("onHeaderValue"),d=E.HEADER_VALUE;case E.HEADER_VALUE:13===_&&(g("onHeaderValue",!0),b("onHeaderEnd"),d=E.HEADER_VALUE_ALMOST_DONE);break;case E.HEADER_VALUE_ALMOST_DONE:if(10!==_)return;d=E.HEADER_FIELD_START;break;case E.HEADERS_ALMOST_DONE:if(10!==_)return;b("onHeadersEnd"),d=E.PART_DATA_START;break;case E.PART_DATA_START:d=E.PART_DATA,R("onPartData");case E.PART_DATA:if(r=i,0===i){for(t+=T;t<f&&!(e[t]in o);)t+=D;t-=T,_=e[t]}if(i<s.length)s[i]===_?(0===i&&g("onPartData",!0),i++):i=0;else if(i===s.length)i++,13===_?A|=h:45===_?A|=l:i=0;else if(i-1===s.length)if(A&h){if(i=0,10===_){A&=~h,b("onPartEnd"),b("onPartBegin"),d=E.HEADER_FIELD_START;break}}else A&l&&45===_?(b("onPartEnd"),d=E.END,A=0):i=0;if(i>0)a[i-1]=_;else if(r>0){const e=new Uint8Array(a.buffer,a.byteOffset,a.byteLength);b("onPartData",0,r,e),r=0,R("onPartData"),t--}break;case E.END:break;default:throw new Error(`Unexpected state entered: ${d}`)}g("onHeaderField"),g("onHeaderValue"),g("onPartData"),this.index=i,this.state=d,this.flags=A}end(){if(this.state===E.HEADER_FIELD_START&&0===this.index||this.state===E.PART_DATA&&this.index===this.boundary.length)this.onPartEnd();else if(this.state!==E.END)throw new Error("MultipartParser.end(): stream ended unexpectedly")}}async function f(e,t){if(!/multipart/i.test(t))throw new TypeError("Failed to fetch");const n=t.match(/boundary=(?:"([^"]+)"|([^;]+))/i);if(!n)throw new TypeError("no or bad content-type header, no multipart boundary");const r=new T(n[1]||n[2]);let a,o,d,E,A,h;const l=[],c=new i.Ct,D=e=>{d+=R.decode(e,{stream:!0})},f=e=>{l.push(e)},_=()=>{const e=new s.Z(l,h,{type:A});c.append(E,e)},u=()=>{c.append(E,d)},R=new TextDecoder("utf-8");R.decode(),r.onPartBegin=function(){r.onPartData=D,r.onPartEnd=u,a="",o="",d="",E="",A="",h=null,l.length=0},r.onHeaderField=function(e){a+=R.decode(e,{stream:!0})},r.onHeaderValue=function(e){o+=R.decode(e,{stream:!0})},r.onHeaderEnd=function(){if(o+=R.decode(),a=a.toLowerCase(),"content-disposition"===a){const e=o.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);e&&(E=e[2]||e[3]||""),h=function(e){const t=e.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);if(!t)return;const n=t[2]||t[3]||"";let r=n.slice(n.lastIndexOf("\\")+1);return r=r.replace(/%22/g,'"'),r=r.replace(/&#(\d{4});/g,((e,t)=>String.fromCharCode(t))),r}(o),h&&(r.onPartData=f,r.onPartEnd=_)}else"content-type"===a&&(A=o);o="",a=""};for await(const t of e)r.write(t);return r.end(),c}}};