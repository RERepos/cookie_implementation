/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isCEPolyfill="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,removeNodes=(container,start,end=null)=>{for(;start!==end;){const n=start.nextSibling;container.removeChild(start);start=n}},marker=`{{lit-${String(Math.random()).slice(2)}}}`,nodeMarker=`\x3c!--${marker}--\x3e`,markerRegex=new RegExp(`${marker}|${nodeMarker}`);class Template{constructor(result,element){this.parts=[];this.element=element;const nodesToRemove=[],stack=[],walker=document.createTreeWalker(element.content,133,null,!1);let lastPartIndex=0,index=-1,partIndex=0;const{strings:strings,values:{length:length}}=result;for(;partIndex<length;){const node=walker.nextNode();if(null!==node){index++;if(1===node.nodeType){if(node.hasAttributes()){const attributes=node.attributes,{length:length}=attributes;let count=0;for(let i=0;i<length;i++)endsWith(attributes[i].name,"$lit$")&&count++;for(;count-- >0;){const stringForPart=strings[partIndex],name=lastAttributeNameRegex.exec(stringForPart)[2],attributeLookupName=name.toLowerCase()+"$lit$",attributeValue=node.getAttribute(attributeLookupName);node.removeAttribute(attributeLookupName);const statics=attributeValue.split(markerRegex);this.parts.push({type:"attribute",index:index,name:name,strings:statics});partIndex+=statics.length-1}}if("TEMPLATE"===node.tagName){stack.push(node);walker.currentNode=node.content}}else if(3===node.nodeType){const data=node.data;if(data.indexOf(marker)>=0){const parent=node.parentNode,strings=data.split(markerRegex),lastIndex=strings.length-1;for(let i=0;i<lastIndex;i++){let insert,s=strings[i];if(""===s)insert=createMarker();else{const match=lastAttributeNameRegex.exec(s);null!==match&&endsWith(match[2],"$lit$")&&(s=s.slice(0,match.index)+match[1]+match[2].slice(0,-"$lit$".length)+match[3]);insert=document.createTextNode(s)}parent.insertBefore(insert,node);this.parts.push({type:"node",index:++index})}if(""===strings[lastIndex]){parent.insertBefore(createMarker(),node);nodesToRemove.push(node)}else node.data=strings[lastIndex];partIndex+=lastIndex}}else if(8===node.nodeType)if(node.data===marker){const parent=node.parentNode;if(null===node.previousSibling||index===lastPartIndex){index++;parent.insertBefore(createMarker(),node)}lastPartIndex=index;this.parts.push({type:"node",index:index});if(null===node.nextSibling)node.data="";else{nodesToRemove.push(node);index--}partIndex++}else{let i=-1;for(;-1!==(i=node.data.indexOf(marker,i+1));){this.parts.push({type:"node",index:-1});partIndex++}}}else walker.currentNode=stack.pop()}for(const n of nodesToRemove)n.parentNode.removeChild(n)}}const endsWith=(str,suffix)=>{const index=str.length-suffix.length;return index>=0&&str.slice(index)===suffix},isTemplatePartActive=part=>-1!==part.index,createMarker=()=>document.createComment(""),lastAttributeNameRegex=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function removeNodesFromTemplate(template,nodesToRemove){const{element:{content:content},parts:parts}=template,walker=document.createTreeWalker(content,133,null,!1);let partIndex=nextActiveIndexInTemplateParts(parts),part=parts[partIndex],nodeIndex=-1,removeCount=0;const nodesToRemoveInTemplate=[];let currentRemovingNode=null;for(;walker.nextNode();){nodeIndex++;const node=walker.currentNode;node.previousSibling===currentRemovingNode&&(currentRemovingNode=null);if(nodesToRemove.has(node)){nodesToRemoveInTemplate.push(node);null===currentRemovingNode&&(currentRemovingNode=node)}null!==currentRemovingNode&&removeCount++;for(;void 0!==part&&part.index===nodeIndex;){part.index=null!==currentRemovingNode?-1:part.index-removeCount;partIndex=nextActiveIndexInTemplateParts(parts,partIndex);part=parts[partIndex]}}nodesToRemoveInTemplate.forEach(n=>n.parentNode.removeChild(n))}const countNodes=node=>{let count=11===node.nodeType?0:1;const walker=document.createTreeWalker(node,133,null,!1);for(;walker.nextNode();)count++;return count},nextActiveIndexInTemplateParts=(parts,startIndex=-1)=>{for(let i=startIndex+1;i<parts.length;i++){const part=parts[i];if(isTemplatePartActive(part))return i}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives=new WeakMap,isDirective=o=>"function"==typeof o&&directives.has(o),noChange={},nothing={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class TemplateInstance{constructor(template,processor,options){this.__parts=[];this.template=template;this.processor=processor;this.options=options}update(values){let i=0;for(const part of this.__parts){void 0!==part&&part.setValue(values[i]);i++}for(const part of this.__parts)void 0!==part&&part.commit()}_clone(){const fragment=isCEPolyfill?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),stack=[],parts=this.template.parts,walker=document.createTreeWalker(fragment,133,null,!1);let part,partIndex=0,nodeIndex=0,node=walker.nextNode();for(;partIndex<parts.length;){part=parts[partIndex];if(isTemplatePartActive(part)){for(;nodeIndex<part.index;){nodeIndex++;if("TEMPLATE"===node.nodeName){stack.push(node);walker.currentNode=node.content}if(null===(node=walker.nextNode())){walker.currentNode=stack.pop();node=walker.nextNode()}}if("node"===part.type){const part=this.processor.handleTextExpression(this.options);part.insertAfterNode(node.previousSibling);this.__parts.push(part)}else this.__parts.push(...this.processor.handleAttributeExpressions(node,part.name,part.strings,this.options));partIndex++}else{this.__parts.push(void 0);partIndex++}}if(isCEPolyfill){document.adoptNode(fragment);customElements.upgrade(fragment)}return fragment}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const commentMarker=` ${marker} `;class TemplateResult{constructor(strings,values,type,processor){this.strings=strings;this.values=values;this.type=type;this.processor=processor}getHTML(){const l=this.strings.length-1;let html="",isCommentBinding=!1;for(let i=0;i<l;i++){const s=this.strings[i],commentOpen=s.lastIndexOf("\x3c!--");isCommentBinding=(commentOpen>-1||isCommentBinding)&&-1===s.indexOf("--\x3e",commentOpen+1);const attributeMatch=lastAttributeNameRegex.exec(s);html+=null===attributeMatch?s+(isCommentBinding?commentMarker:nodeMarker):s.substr(0,attributeMatch.index)+attributeMatch[1]+attributeMatch[2]+"$lit$"+attributeMatch[3]+marker}html+=this.strings[l];return html}getTemplateElement(){const template=document.createElement("template");template.innerHTML=this.getHTML();return template}}class SVGTemplateResult extends TemplateResult{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const template=super.getTemplateElement(),content=template.content,svgElement=content.firstChild;content.removeChild(svgElement);((container,start,end=null,before=null)=>{for(;start!==end;){const n=start.nextSibling;container.insertBefore(start,before);start=n}})(content,svgElement.firstChild);return template}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const isPrimitive=value=>null===value||!("object"==typeof value||"function"==typeof value),isIterable=value=>Array.isArray(value)||!(!value||!value[Symbol.iterator]);class AttributeCommitter{constructor(element,name,strings){this.dirty=!0;this.element=element;this.name=name;this.strings=strings;this.parts=[];for(let i=0;i<strings.length-1;i++)this.parts[i]=this._createPart()}_createPart(){return new AttributePart(this)}_getValue(){const strings=this.strings,l=strings.length-1;let text="";for(let i=0;i<l;i++){text+=strings[i];const part=this.parts[i];if(void 0!==part){const v=part.value;if(isPrimitive(v)||!isIterable(v))text+="string"==typeof v?v:String(v);else for(const t of v)text+="string"==typeof t?t:String(t)}}text+=strings[l];return text}commit(){if(this.dirty){this.dirty=!1;this.element.setAttribute(this.name,this._getValue())}}}class AttributePart{constructor(committer){this.value=void 0;this.committer=committer}setValue(value){if(value!==noChange&&(!isPrimitive(value)||value!==this.value)){this.value=value;isDirective(value)||(this.committer.dirty=!0)}}commit(){for(;isDirective(this.value);){const directive=this.value;this.value=noChange;directive(this)}this.value!==noChange&&this.committer.commit()}}class NodePart{constructor(options){this.value=void 0;this.__pendingValue=void 0;this.options=options}appendInto(container){this.startNode=container.appendChild(createMarker());this.endNode=container.appendChild(createMarker())}insertAfterNode(ref){this.startNode=ref;this.endNode=ref.nextSibling}appendIntoPart(part){part.__insert(this.startNode=createMarker());part.__insert(this.endNode=createMarker())}insertAfterPart(ref){ref.__insert(this.startNode=createMarker());this.endNode=ref.endNode;ref.endNode=this.startNode}setValue(value){this.__pendingValue=value}commit(){if(null===this.startNode.parentNode)return;for(;isDirective(this.__pendingValue);){const directive=this.__pendingValue;this.__pendingValue=noChange;directive(this)}const value=this.__pendingValue;if(value!==noChange)if(isPrimitive(value))value!==this.value&&this.__commitText(value);else if(value instanceof TemplateResult)this.__commitTemplateResult(value);else if(value instanceof Node)this.__commitNode(value);else if(isIterable(value))this.__commitIterable(value);else if(value===nothing){this.value=nothing;this.clear()}else this.__commitText(value)}__insert(node){this.endNode.parentNode.insertBefore(node,this.endNode)}__commitNode(value){if(this.value!==value){this.clear();this.__insert(value);this.value=value}}__commitText(value){const node=this.startNode.nextSibling,valueAsString="string"==typeof(value=null==value?"":value)?value:String(value);node===this.endNode.previousSibling&&3===node.nodeType?node.data=valueAsString:this.__commitNode(document.createTextNode(valueAsString));this.value=value}__commitTemplateResult(value){const template=this.options.templateFactory(value);if(this.value instanceof TemplateInstance&&this.value.template===template)this.value.update(value.values);else{const instance=new TemplateInstance(template,value.processor,this.options),fragment=instance._clone();instance.update(value.values);this.__commitNode(fragment);this.value=instance}}__commitIterable(value){if(!Array.isArray(this.value)){this.value=[];this.clear()}const itemParts=this.value;let itemPart,partIndex=0;for(const item of value){itemPart=itemParts[partIndex];if(void 0===itemPart){itemPart=new NodePart(this.options);itemParts.push(itemPart);0===partIndex?itemPart.appendIntoPart(this):itemPart.insertAfterPart(itemParts[partIndex-1])}itemPart.setValue(item);itemPart.commit();partIndex++}if(partIndex<itemParts.length){itemParts.length=partIndex;this.clear(itemPart&&itemPart.endNode)}}clear(startNode=this.startNode){removeNodes(this.startNode.parentNode,startNode.nextSibling,this.endNode)}}class BooleanAttributePart{constructor(element,name,strings){this.value=void 0;this.__pendingValue=void 0;if(2!==strings.length||""!==strings[0]||""!==strings[1])throw new Error("Boolean attributes can only contain a single expression");this.element=element;this.name=name;this.strings=strings}setValue(value){this.__pendingValue=value}commit(){for(;isDirective(this.__pendingValue);){const directive=this.__pendingValue;this.__pendingValue=noChange;directive(this)}if(this.__pendingValue===noChange)return;const value=!!this.__pendingValue;if(this.value!==value){value?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);this.value=value}this.__pendingValue=noChange}}class PropertyCommitter extends AttributeCommitter{constructor(element,name,strings){super(element,name,strings);this.single=2===strings.length&&""===strings[0]&&""===strings[1]}_createPart(){return new PropertyPart(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){if(this.dirty){this.dirty=!1;this.element[this.name]=this._getValue()}}}class PropertyPart extends AttributePart{}let eventOptionsSupported=!1;(()=>{try{const options={get capture(){eventOptionsSupported=!0;return!1}};window.addEventListener("test",options,options);window.removeEventListener("test",options,options)}catch(_e){}})();class EventPart{constructor(element,eventName,eventContext){this.value=void 0;this.__pendingValue=void 0;this.element=element;this.eventName=eventName;this.eventContext=eventContext;this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(value){this.__pendingValue=value}commit(){for(;isDirective(this.__pendingValue);){const directive=this.__pendingValue;this.__pendingValue=noChange;directive(this)}if(this.__pendingValue===noChange)return;const newListener=this.__pendingValue,oldListener=this.value,shouldRemoveListener=null==newListener||null!=oldListener&&(newListener.capture!==oldListener.capture||newListener.once!==oldListener.once||newListener.passive!==oldListener.passive),shouldAddListener=null!=newListener&&(null==oldListener||shouldRemoveListener);shouldRemoveListener&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options);if(shouldAddListener){this.__options=getOptions(newListener);this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)}this.value=newListener;this.__pendingValue=noChange}handleEvent(event){"function"==typeof this.value?this.value.call(this.eventContext||this.element,event):this.value.handleEvent(event)}}const getOptions=o=>o&&(eventOptionsSupported?{capture:o.capture,passive:o.passive,once:o.once}:o.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function templateFactory(result){let templateCache=templateCaches.get(result.type);if(void 0===templateCache){templateCache={stringsArray:new WeakMap,keyString:new Map};templateCaches.set(result.type,templateCache)}let template=templateCache.stringsArray.get(result.strings);if(void 0!==template)return template;const key=result.strings.join(marker);template=templateCache.keyString.get(key);if(void 0===template){template=new Template(result,result.getTemplateElement());templateCache.keyString.set(key,template)}templateCache.stringsArray.set(result.strings,template);return template}const templateCaches=new Map,parts=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const defaultTemplateProcessor=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(element,name,strings,options){const prefix=name[0];if("."===prefix){return new PropertyCommitter(element,name.slice(1),strings).parts}return"@"===prefix?[new EventPart(element,name.slice(1),options.eventContext)]:"?"===prefix?[new BooleanAttributePart(element,name.slice(1),strings)]:new AttributeCommitter(element,name,strings).parts}handleTextExpression(options){return new NodePart(options)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const html=(strings,...values)=>new TemplateResult(strings,values,"html",defaultTemplateProcessor),svg=(strings,...values)=>new SVGTemplateResult(strings,values,"svg",defaultTemplateProcessor)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,getTemplateCacheKey=(type,scopeName)=>`${type}--${scopeName}`;let compatibleShadyCSSVersion=!0;if(void 0===window.ShadyCSS)compatibleShadyCSSVersion=!1;else if(void 0===window.ShadyCSS.prepareTemplateDom){console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1.");compatibleShadyCSSVersion=!1}const shadyTemplateFactory=scopeName=>result=>{const cacheKey=getTemplateCacheKey(result.type,scopeName);let templateCache=templateCaches.get(cacheKey);if(void 0===templateCache){templateCache={stringsArray:new WeakMap,keyString:new Map};templateCaches.set(cacheKey,templateCache)}let template=templateCache.stringsArray.get(result.strings);if(void 0!==template)return template;const key=result.strings.join(marker);template=templateCache.keyString.get(key);if(void 0===template){const element=result.getTemplateElement();compatibleShadyCSSVersion&&window.ShadyCSS.prepareTemplateDom(element,scopeName);template=new Template(result,element);templateCache.keyString.set(key,template)}templateCache.stringsArray.set(result.strings,template);return template},TEMPLATE_TYPES=["html","svg"],shadyRenderSet=new Set,prepareTemplateStyles=(scopeName,renderedDOM,template)=>{shadyRenderSet.add(scopeName);const templateElement=template?template.element:document.createElement("template"),styles=renderedDOM.querySelectorAll("style"),{length:length}=styles;if(0===length){window.ShadyCSS.prepareTemplateStyles(templateElement,scopeName);return}const condensedStyle=document.createElement("style");for(let i=0;i<length;i++){const style=styles[i];style.parentNode.removeChild(style);condensedStyle.textContent+=style.textContent}(scopeName=>{TEMPLATE_TYPES.forEach(type=>{const templates=templateCaches.get(getTemplateCacheKey(type,scopeName));void 0!==templates&&templates.keyString.forEach(template=>{const{element:{content:content}}=template,styles=new Set;Array.from(content.querySelectorAll("style")).forEach(s=>{styles.add(s)});removeNodesFromTemplate(template,styles)})})})(scopeName);const content=templateElement.content;template?function(template,node,refNode=null){const{element:{content:content},parts:parts}=template;if(null==refNode){content.appendChild(node);return}const walker=document.createTreeWalker(content,133,null,!1);let partIndex=nextActiveIndexInTemplateParts(parts),insertCount=0,walkerIndex=-1;for(;walker.nextNode();){walkerIndex++;if(walker.currentNode===refNode){insertCount=countNodes(node);refNode.parentNode.insertBefore(node,refNode)}for(;-1!==partIndex&&parts[partIndex].index===walkerIndex;){if(insertCount>0){for(;-1!==partIndex;){parts[partIndex].index+=insertCount;partIndex=nextActiveIndexInTemplateParts(parts,partIndex)}return}partIndex=nextActiveIndexInTemplateParts(parts,partIndex)}}}(template,condensedStyle,content.firstChild):content.insertBefore(condensedStyle,content.firstChild);window.ShadyCSS.prepareTemplateStyles(templateElement,scopeName);const style=content.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==style)renderedDOM.insertBefore(style.cloneNode(!0),renderedDOM.firstChild);else if(template){content.insertBefore(condensedStyle,content.firstChild);const removes=new Set;removes.add(condensedStyle);removeNodesFromTemplate(template,removes)}};window.JSCompiler_renameProperty=(prop,_obj)=>prop;const defaultConverter={toAttribute(value,type){switch(type){case Boolean:return value?"":null;case Object:case Array:return null==value?value:JSON.stringify(value)}return value},fromAttribute(value,type){switch(type){case Boolean:return null!==value;case Number:return null===value?null:Number(value);case Object:case Array:return JSON.parse(value)}return value}},notEqual=(value,old)=>old!==value&&(old==old||value==value),defaultPropertyDeclaration={attribute:!0,type:String,converter:defaultConverter,reflect:!1,hasChanged:notEqual};class UpdatingElement extends HTMLElement{constructor(){super();this._updateState=0;this._instanceProperties=void 0;this._updatePromise=new Promise(res=>this._enableUpdatingResolver=res);this._changedProperties=new Map;this._reflectingProperties=void 0;this.initialize()}static get observedAttributes(){this.finalize();const attributes=[];this._classProperties.forEach((v,p)=>{const attr=this._attributeNameForProperty(p,v);if(void 0!==attr){this._attributeToPropertyMap.set(attr,p);attributes.push(attr)}});return attributes}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const superProperties=Object.getPrototypeOf(this)._classProperties;void 0!==superProperties&&superProperties.forEach((v,k)=>this._classProperties.set(k,v))}}static createProperty(name,options=defaultPropertyDeclaration){this._ensureClassProperties();this._classProperties.set(name,options);if(options.noAccessor||this.prototype.hasOwnProperty(name))return;const key="symbol"==typeof name?Symbol():"__"+name,descriptor=this.getPropertyDescriptor(name,key,options);void 0!==descriptor&&Object.defineProperty(this.prototype,name,descriptor)}static getPropertyDescriptor(name,key,_options){return{get(){return this[key]},set(value){const oldValue=this[name];this[key]=value;this._requestUpdate(name,oldValue)},configurable:!0,enumerable:!0}}static getPropertyOptions(name){return this._classProperties&&this._classProperties.get(name)||defaultPropertyDeclaration}static finalize(){const superCtor=Object.getPrototypeOf(this);superCtor.hasOwnProperty("finalized")||superCtor.finalize();this.finalized=!0;this._ensureClassProperties();this._attributeToPropertyMap=new Map;if(this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const props=this.properties,propKeys=[...Object.getOwnPropertyNames(props),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(props):[]];for(const p of propKeys)this.createProperty(p,props[p])}}static _attributeNameForProperty(name,options){const attribute=options.attribute;return!1===attribute?void 0:"string"==typeof attribute?attribute:"string"==typeof name?name.toLowerCase():void 0}static _valueHasChanged(value,old,hasChanged=notEqual){return hasChanged(value,old)}static _propertyValueFromAttribute(value,options){const type=options.type,converter=options.converter||defaultConverter,fromAttribute="function"==typeof converter?converter:converter.fromAttribute;return fromAttribute?fromAttribute(value,type):value}static _propertyValueToAttribute(value,options){if(void 0===options.reflect)return;const type=options.type,converter=options.converter;return(converter&&converter.toAttribute||defaultConverter.toAttribute)(value,type)}initialize(){this._saveInstanceProperties();this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((_v,p)=>{if(this.hasOwnProperty(p)){const value=this[p];delete this[p];this._instanceProperties||(this._instanceProperties=new Map);this._instanceProperties.set(p,value)}})}_applyInstanceProperties(){this._instanceProperties.forEach((v,p)=>this[p]=v);this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){if(void 0!==this._enableUpdatingResolver){this._enableUpdatingResolver();this._enableUpdatingResolver=void 0}}disconnectedCallback(){}attributeChangedCallback(name,old,value){old!==value&&this._attributeToProperty(name,value)}_propertyToAttribute(name,value,options=defaultPropertyDeclaration){const ctor=this.constructor,attr=ctor._attributeNameForProperty(name,options);if(void 0!==attr){const attrValue=ctor._propertyValueToAttribute(value,options);if(void 0===attrValue)return;this._updateState=8|this._updateState;null==attrValue?this.removeAttribute(attr):this.setAttribute(attr,attrValue);this._updateState=-9&this._updateState}}_attributeToProperty(name,value){if(8&this._updateState)return;const ctor=this.constructor,propName=ctor._attributeToPropertyMap.get(name);if(void 0!==propName){const options=ctor.getPropertyOptions(propName);this._updateState=16|this._updateState;this[propName]=ctor._propertyValueFromAttribute(value,options);this._updateState=-17&this._updateState}}_requestUpdate(name,oldValue){let shouldRequestUpdate=!0;if(void 0!==name){const ctor=this.constructor,options=ctor.getPropertyOptions(name);if(ctor._valueHasChanged(this[name],oldValue,options.hasChanged)){this._changedProperties.has(name)||this._changedProperties.set(name,oldValue);if(!0===options.reflect&&!(16&this._updateState)){void 0===this._reflectingProperties&&(this._reflectingProperties=new Map);this._reflectingProperties.set(name,options)}}else shouldRequestUpdate=!1}!this._hasRequestedUpdate&&shouldRequestUpdate&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(name,oldValue){this._requestUpdate(name,oldValue);return this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const result=this.performUpdate();null!=result&&await result;return!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let shouldUpdate=!1;const changedProperties=this._changedProperties;try{shouldUpdate=this.shouldUpdate(changedProperties);shouldUpdate?this.update(changedProperties):this._markUpdated()}catch(e){shouldUpdate=!1;this._markUpdated();throw e}if(shouldUpdate){if(!(1&this._updateState)){this._updateState=1|this._updateState;this.firstUpdated(changedProperties)}this.updated(changedProperties)}}_markUpdated(){this._changedProperties=new Map;this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(_changedProperties){return!0}update(_changedProperties){if(void 0!==this._reflectingProperties&&this._reflectingProperties.size>0){this._reflectingProperties.forEach((v,k)=>this._propertyToAttribute(k,this[k],v));this._reflectingProperties=void 0}this._markUpdated()}updated(_changedProperties){}firstUpdated(_changedProperties){}}"finalized";UpdatingElement.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const customElement=tagName=>classOrDescriptor=>"function"==typeof classOrDescriptor?((tagName,clazz)=>{window.customElements.define(tagName,clazz);return clazz})(tagName,classOrDescriptor):((tagName,descriptor)=>{const{kind:kind,elements:elements}=descriptor;return{kind:kind,elements:elements,finisher(clazz){window.customElements.define(tagName,clazz)}}})(tagName,classOrDescriptor),standardProperty=(options,element)=>"method"===element.kind&&element.descriptor&&!("value"in element.descriptor)?Object.assign(Object.assign({},element),{finisher(clazz){clazz.createProperty(element.key,options)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof element.initializer&&(this[element.key]=element.initializer.call(this))},finisher(clazz){clazz.createProperty(element.key,options)}};function property(options){return(protoOrDescriptor,name)=>void 0!==name?((options,proto,name)=>{proto.constructor.createProperty(name,options)})(options,protoOrDescriptor,name):standardProperty(options,protoOrDescriptor)}function internalProperty(options){return property({attribute:!1,hasChanged:null==options?void 0:options.hasChanged})}function query(selector){return(protoOrDescriptor,name)=>{const descriptor={get(){return this.renderRoot.querySelector(selector)},enumerable:!0,configurable:!0};return void 0!==name?legacyQuery(descriptor,protoOrDescriptor,name):standardQuery(descriptor,protoOrDescriptor)}}function queryAsync(selector){return(protoOrDescriptor,name)=>{const descriptor={async get(){await this.updateComplete;return this.renderRoot.querySelector(selector)},enumerable:!0,configurable:!0};return void 0!==name?legacyQuery(descriptor,protoOrDescriptor,name):standardQuery(descriptor,protoOrDescriptor)}}function queryAll(selector){return(protoOrDescriptor,name)=>{const descriptor={get(){return this.renderRoot.querySelectorAll(selector)},enumerable:!0,configurable:!0};return void 0!==name?legacyQuery(descriptor,protoOrDescriptor,name):standardQuery(descriptor,protoOrDescriptor)}}const legacyQuery=(descriptor,proto,name)=>{Object.defineProperty(proto,name,descriptor)},standardQuery=(descriptor,element)=>({kind:"method",placement:"prototype",key:element.key,descriptor:descriptor});function eventOptions(options){return(protoOrDescriptor,name)=>void 0!==name?((options,proto,name)=>{Object.assign(proto[name],options)})(options,protoOrDescriptor,name):((options,element)=>Object.assign(Object.assign({},element),{finisher(clazz){Object.assign(clazz.prototype[element.key],options)}}))(options,protoOrDescriptor)}function queryAssignedNodes(slotName="",flatten=!1){return(protoOrDescriptor,name)=>{const descriptor={get(){const selector="slot"+(slotName?`[name=${slotName}]`:""),slot=this.renderRoot.querySelector(selector);return slot&&slot.assignedNodes({flatten:flatten})},enumerable:!0,configurable:!0};return void 0!==name?legacyQuery(descriptor,protoOrDescriptor,name):standardQuery(descriptor,protoOrDescriptor)}}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const supportsAdoptingStyleSheets="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,constructionToken=Symbol();class CSSResult{constructor(cssText,safeToken){if(safeToken!==constructionToken)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=cssText}get styleSheet(){if(void 0===this._styleSheet)if(supportsAdoptingStyleSheets){this._styleSheet=new CSSStyleSheet;this._styleSheet.replaceSync(this.cssText)}else this._styleSheet=null;return this._styleSheet}toString(){return this.cssText}}const unsafeCSS=value=>new CSSResult(String(value),constructionToken),css=(strings,...values)=>{const cssText=values.reduce((acc,v,idx)=>acc+(value=>{if(value instanceof CSSResult)return value.cssText;if("number"==typeof value)return value;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(v)+strings[idx+1],strings[0]);return new CSSResult(cssText,constructionToken)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const renderNotImplemented={};class LitElement extends UpdatingElement{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const userStyles=this.getStyles();if(void 0===userStyles)this._styles=[];else if(Array.isArray(userStyles)){const addStyles=(styles,set)=>styles.reduceRight((set,s)=>Array.isArray(s)?addStyles(s,set):(set.add(s),set),set),set=addStyles(userStyles,new Set),styles=[];set.forEach(v=>styles.unshift(v));this._styles=styles}else this._styles=[userStyles]}initialize(){super.initialize();this.constructor._getUniqueStyles();this.renderRoot=this.createRenderRoot();window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const styles=this.constructor._styles;0!==styles.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?supportsAdoptingStyleSheets?this.renderRoot.adoptedStyleSheets=styles.map(s=>s.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(s=>s.cssText),this.localName))}connectedCallback(){super.connectedCallback();this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(changedProperties){const templateResult=this.render();super.update(changedProperties);templateResult!==renderNotImplemented&&this.constructor.render(templateResult,this.renderRoot,{scopeName:this.localName,eventContext:this});if(this._needsShimAdoptedStyleSheets){this._needsShimAdoptedStyleSheets=!1;this.constructor._styles.forEach(s=>{const style=document.createElement("style");style.textContent=s.cssText;this.renderRoot.appendChild(style)})}}render(){return renderNotImplemented}}LitElement.finalized=!0;LitElement.render=(result,container,options)=>{if(!options||"object"!=typeof options||!options.scopeName)throw new Error("The `scopeName` option is required.");const scopeName=options.scopeName,hasRendered=parts.has(container),needsScoping=compatibleShadyCSSVersion&&11===container.nodeType&&!!container.host,firstScopeRender=needsScoping&&!shadyRenderSet.has(scopeName),renderContainer=firstScopeRender?document.createDocumentFragment():container;((result,container,options)=>{let part=parts.get(container);if(void 0===part){removeNodes(container,container.firstChild);parts.set(container,part=new NodePart(Object.assign({templateFactory:templateFactory},options)));part.appendInto(container)}part.setValue(result);part.commit()})(result,renderContainer,Object.assign({templateFactory:shadyTemplateFactory(scopeName)},options));if(firstScopeRender){const part=parts.get(renderContainer);parts.delete(renderContainer);const template=part.value instanceof TemplateInstance?part.value.template:void 0;prepareTemplateStyles(scopeName,renderContainer,template);removeNodes(container,container.firstChild);container.appendChild(renderContainer);parts.set(container,part)}!hasRendered&&needsScoping&&window.ShadyCSS.styleElement(container.host)};export{CSSResult,LitElement,SVGTemplateResult,TemplateResult,UpdatingElement,css,customElement,defaultConverter,eventOptions,html,internalProperty,notEqual,property,query,queryAll,queryAssignedNodes,queryAsync,supportsAdoptingStyleSheets,svg,unsafeCSS};
