!function(){"use strict";Storage.prototype.setObject=function(e,t){this.setItem(e,JSON.stringify(t))},Storage.prototype.getObject=function(e){e=this.getItem(e);return e&&JSON.parse(e)};const s=()=>{const t=document.createElement("input");t.type="file",t.addEventListener("change",function(){var e=new FileReader;e.onload=function(e){e=e.target,e=JSON.parse(e.result);"unlocked"in e&&"qp"in e&&"complete"in e&&(l=e,f(),m(),localStorage.setObject(n,l))},e.readAsText(t.files[0])},!1);var e=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0});t.dispatchEvent(e),t.remove()},n="osrs-xosaat-user";let l={combat:!1,unlocked:[],qp:0,complete:{quests:[],achievements:[],collections:[],pets:[]}};null!==localStorage.getItem(n)?l=localStorage.getObject(n):localStorage.setObject(n,l);const i=Object.freeze({Easy:1,Medium:2,Hard:3,Elite:4}),a="/osrs-progress/assets",c="#skills-progress",o="#qp-progress",e="#achievements-wrapper",t=(e,"#quests-wrapper"),r=(t,"#pets-wrapper"),d=(r,"#collections-wrapper"),u=(d,{achievements:{data:{},dir:a+"/json/achievements.json",update:function(){h(e,"#achievements-wrapper .json-item","#achievements-completed","#achievements-total","#achievements-progress",function(){var e=0<$("img[data-src='achievement,hide']").length,t=[],s=[];for(const c in u.achievements.data){var n=u.achievements.data[c],i=l.complete.achievements.includes(n.task)?"complete":"",a=i&&e?"d-none":"";v(n.requirements)&&(a=`<div class="col ${a}">
                                <div class="d-flex flex-column json-item h-100 p-3 rounded ${i}" data-src="achievement">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <h4>${n.diary}</h4>
                                        <span class="difficulty-${n.difficulty}">${n.difficulty}</span>
                                    </div>
                                    <hr/>
                                    <div class="flex-grow-1">
                                        <span class="json-description">${n.task}</span>
                                    </div>
                                    <hr/>
                                    <span class="text-muted"></span>
                                </div>
                            </div>`,(i?s:t).push({diary:n.diary,difficulty:n.difficulty,html:a}))}return p(["diary","difficulty"],t)+p(["diary","difficulty"],s)}.bind(this))}},quests:{data:{},dir:a+"/json/quests.json",update:function(){h(t,"#quests-wrapper .json-item","#quests-completed","#quests-total","#quests-progress",function(){var e=0<$("img[data-src='quest,hide']").length,t=[],s=[];for(const o in u.quests.data){var n,i=u.quests.data[o],a=l.complete.quests.includes(o)?"complete":"",c=a&&e?"d-none":"";0<i.rewards.skills.length&&(n=new Set(i.requirements.skills.concat(i.rewards.skills)),i.requirements.skills=Array.from(n)),v(i.requirements)&&(n=`<div class="col ${c}">
                                <div class="json-item h-100 p-3 rounded ${a}" data-src="quest">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <h4>${o}</h4>
                                        <span class="difficulty-${i.difficulty}">${i.difficulty}</span>
                                    </div>
                                    <hr/>
                                    <span class="text-muted"></span>
                                </div>
                            </div>`,(a?s:t).push({name:o,html:n}))}return p("name",t)+p("name",s)}.bind(this))}},pets:{data:{},dir:a+"/json/pets.json",update:function(){h(r,"#pets-wrapper .json-item","#pets-completed","#pets-total","#pets-progress",function(){var e=0<$("img[data-src='pet,hide']").length,t=[],s=[];for(const c in this.data){var n=this.data[c],i=l.complete.pets.includes(c)?"complete":"",a=i&&e?"d-none":"";v(n.requirements)&&(a=`<div class="col ${a}">
                                <div class="json-item h-100 p-3 rounded ${i}" data-src="pet">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <h4>${c}</h4>
                                        <img src="${n.img}" alt="${c} icon"/>
                                    </div>
                                    <hr/>
                                    <span class="text-muted"></span>
                                </div>
                            </div>`,(i?s:t).push({name:c,html:a}))}return p("name",t)+p("name",s)}.bind(this))}},collections:{data:{},dir:a+"/json/collections.json",update:function(){h(d,"#collections-wrapper .json-item","#collections-completed","#collections-total","#collections-progress",function(){var e=0<$("img[data-src='collection,hide']").length,s=[],n=[];for(const o in this.data){var i=this.data[o],a=l.complete.collections.includes(o)?"complete":"",c=a&&e?"d-none":"";if(v(i.requirements)){let t=`<div class="col ${c}">
                                <div class="d-flex flex-column json-item h-100 p-3 rounded ${a}" data-src="collection">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <h4>${o}</h4>
                                        <img src="${i.img}" alt="${o} icon"/>
                                    </div>
                                    <hr/>
                                    <ul class="d-flex flex-wrap gap-2 py-2">`;for(let e=0;e<Math.min(5,i.items.length);e++)t+=`<li class="list-group-item rounded">${i.items[e]}</li>`;t+=`</ul>
                                <div class="d-flex flex-grow-1"></div>`,5<i.items.length&&(t+=`<span>and ${i.items.length-5} others...</span>`),t+=`<hr/>
                                    <span class="text-muted"></span>
                                </div>
                            </div>`,(a?n:s).push({name:o,html:t})}}return p("name",s)+p("name",n)}.bind(this))}}});function p(s,e){let t="";Array.isArray(s)?e.sort((e,t)=>e[s[0]].localeCompare(t[s[0]])||i[e[s[1]]]-i[t[s[1]]]):e.sort((e,t)=>e[s].localeCompare(t[s]));for(const n of e)t+=n.html;return t}function m(){for(const e of l.unlocked)$(".skill-item[data-src="+e+"]").addClass("unlocked");$(o).text(l.qp),$(c).text(l.unlocked.length)}function h(e,t,s,n,i,a){$(e).html(""),$(e).html(a());var e=$(t).length,a=$(t+".complete").length,c=Math.round(a/e*100)||0;$(n).text(e),$(s).text(a),$(i).width(c+"%"),$(i).text(c+"%"),$(t).on("click",w)}function f(){u.achievements.update(),u.quests.update(),u.pets.update(),u.collections.update()}function v(e){if(e){if("combat"in e&&e.combat&&!l.combat)return;if("quests"in e)for(const t of e.quests)if(!l.complete.quests.includes(t))return;if("skills"in e)for(const s of e.skills)if(!l.unlocked.includes(s))return;if("qp"in e&&l.qp<e.qp)return}return 1}function g(e,t){e.includes(t)?e.splice(e.indexOf(t),1):e.push(t)}function q(e){var t=$(".skill-title",this).text().trim();$(this).toggleClass("unlocked"),"Combat"===t?l.combat=!l.combat:g(l.unlocked,t),f(),$(c).text(l.unlocked.length),localStorage.setObject(n,l)}function w(e){var t,s=$(this).attr("data-src");$(this).toggleClass("complete"),"achievement"===s?(g(l.complete.achievements,$(".json-description",this).text().trim()),u.achievements.update()):"quest"===s?(t=$("h4",this).text().trim(),$(this).hasClass("complete")?l.qp=l.qp+u.quests.data[t].rewards.qp:l.qp=l.qp-u.quests.data[t].rewards.qp,g(l.complete.quests,t),f(),$(o).text(l.qp)):"pet"===s?(g(l.complete.pets,$("h4",this).text().trim()),u.pets.update()):"collection"===s&&(g(l.complete.collections,$("h4",this).text().trim()),u.collections.update()),localStorage.setObject(n,l)}$(document).ready(function(){$("#skills-wrapper .skill-item").on("click",q),$(".show-hide").on("click",function(){var e=$(this).attr("data-src").split(","),t=e[0];"hide"===e[1]?($(this).attr("data-src",t+",show"),$(this).attr("src",a+"/images/svg/show.svg")):($(this).attr("data-src",t+",hide"),$(this).attr("src",a+"/images/svg/hide.svg")),"achievement"===t?u.achievements.update():"quest"===t?u.quests.update():"pet"===t?u.pets.update():"collection"===t&&u.collections.update()}),$("#btn-download").on("click",function(){var e,t,s;e="data.json",t=l,t=new Blob([JSON.stringify(t)],{type:"text/json"}),(s=document.createElement("a")).download=e,s.href=window.URL.createObjectURL(t),s.dataset.downloadurl=["text/json",s.download,s.href].join(":"),e=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0}),s.dispatchEvent(e),s.remove()}),$("#btn-upload").on("click",s);for(const t in u){var e=u[t];$.getJSON(e.dir,function(e){this.data=e,this.update()}.bind(e))}m()})}();