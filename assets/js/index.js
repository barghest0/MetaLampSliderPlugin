(()=>{"use strict";var e,t,a,s;!function(e){e.horizontal="horizontal",e.vertical="vertical"}(e||(e={})),function(e){e.min="min",e.max="max",e.step="step",e.value="value",e.isRange="isRange",e.direction="direction",e.hasFill="hasFill",e.hasTips="hasTips",e.hasScale="hasScale",e.isDecimal="isDecimal",e.decimalPlaces="decimalPlaces",e.canThumbPush="canThumbPush",e.dataFirstValue="firstValue",e.dataSecondValue="secondValue"}(t||(t={})),function(e){e.left="left",e.top="top"}(a||(a={})),function(e){e.width="width",e.height="height"}(s||(s={}));const i=function(t){const a=t.target,s=this.slider.getParams();s.direction=a.checked?e.vertical:e.horizontal,this.updatePanelParams(s)},n=function(e,t){const a=e.target,{value:s}=a,i="number"===a.type,n=this.slider.getParams();n[t]=i?Number(s):a.checked,this.updatePanelParams(n)},l=function(e,t){const a=e.target,{value:s}=a,i=this.slider.getParams();i.value[t]=Number(s),this.updatePanelParams(i)},u=function(){const e=e=>t=>{n.call(this,t,e)},a=e=>t=>{l.call(this,t,e)};this.inputs.minValueInput.addEventListener("change",e(t.min)),this.inputs.canThumbPush.addEventListener("change",e(t.canThumbPush)),this.inputs.maxValueInput.addEventListener("change",e(t.max)),this.inputs.firstValueInput.addEventListener("change",a(0)),this.inputs.secondValueInput.addEventListener("change",a(1)),this.inputs.isVertical.addEventListener("change",(()=>e=>{i.call(this,e)})()),this.inputs.stepInput.addEventListener("change",e(t.step)),this.inputs.isRange.addEventListener("change",e(t.isRange)),this.inputs.hasFill.addEventListener("change",e(t.hasFill)),this.inputs.hasTips.addEventListener("change",e(t.hasTips)),this.inputs.hasScale.addEventListener("change",e(t.hasScale))},h=function(e){const t=e.querySelector('[data-param="min-value"]'),a=e.querySelector('[data-param="max-value"]'),s=e.querySelector('[ data-param="first-value" ]'),i=e.querySelector('[data-param="second-value"]'),n=e.querySelector('[data-param="step"]'),l=e.querySelector('[data-param="is-range"]'),u=e.querySelector('[data-param="is-vertical"]'),h=e.querySelector('[data-param="has-fill"]'),r=e.querySelector('[data-param="has-tips"]'),c=e.querySelector('[data-param="has-scale"]');return{minValueInput:t,maxValueInput:a,firstValueInput:s,canThumbPush:e.querySelector('[data-param="can-thumb-push"]'),secondValueInput:i,stepInput:n,isRange:l,isVertical:u,hasFill:h,hasTips:r,hasScale:c}},r=function(){const{min:t,max:a,value:s,isRange:i,step:n,direction:l,hasFill:u,hasTips:h,hasScale:r,canThumbPush:c}=this.slider.getParams();this.inputs.minValueInput.value=t.toString(),this.inputs.stepInput.value=n.toString(),this.inputs.maxValueInput.value=a.toString(),i?(this.inputs.firstValueInput.value=s[0].toString(),this.inputs.secondValueInput.value=s[1].toString(),this.inputs.secondValueInput.disabled=!1):(this.inputs.firstValueInput.value=s[0].toString(),this.inputs.secondValueInput.disabled=!0),this.inputs.isRange.checked=i,this.inputs.isVertical.checked=l===e.vertical,this.inputs.hasFill.checked=u,this.inputs.canThumbPush.checked=c,this.inputs.hasTips.checked=h,this.inputs.hasScale.checked=r},c=class{constructor(e){this.slider=e,this.DOMparent=e.getParent(),this.inputs=h(this.DOMparent),this.initializePanelsParams=r.bind(this),this.addInputListeners=u.bind(this),this.init()}updatePanelParams(e){this.slider.updateParams(e),this.initializePanelsParams()}updatePanelValue({value:e}){this.inputs.firstValueInput.value=String(e[0]),e[1]&&(this.inputs.secondValueInput.value=String(e[1]))}init(){this.setPanel(),this.setInputs(h(this.panel)),this.initializePanelsParams(),this.addInputListeners(),this.subscribe()}subscribe(){this.slider.subscribe(this.updatePanelValue.bind(this))}setInputs(e){this.inputs=e}setPanel(){this.panel=this.DOMparent.nextElementSibling}};window.addEventListener("load",(()=>{const e=$(".js-slider-1").slider(),t=(new c(e),$(".js-slider-2").slider({min:-6,max:6,step:1.5,value:[-3,3],isRange:!0,direction:"vertical",hasFill:!0,hasTips:!0,hasScale:!0})),a=(new c(t),$(".js-slider-3").slider({min:-15e3,max:15e3,step:500,value:[-3e3,3e3],isRange:!0,direction:"horizontal",hasFill:!0,hasTips:!0,hasScale:!0})),s=(new c(a),$(".js-slider-4").slider({min:-1e13,max:1e13,step:1e7,value:1e7,isRange:!1,direction:"vertical",hasFill:!0,hasTips:!0,hasScale:!0}));new c(s)}))})();