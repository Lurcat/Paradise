function NanoStateClass(){}function NanoStateDefaultClass(){this.key="default",this.key=this.key.toLowerCase(),NanoStateManager.addState(this)}var NanoUtility=function(){var e={};return{init:function(){var t=$("body");e=t.data("urlParameters")},generateHref:function(t){var a="?";for(var n in e)e.hasOwnProperty(n)&&("?"!==a&&(a+=";"),a+=n+"="+e[n]);for(var n in t)t.hasOwnProperty(n)&&("?"!==a&&(a+=";"),a+=n+"="+t[n]);return a}}}();"undefined"==typeof jQuery&&alert("ERROR: Javascript library failed to load!"),"undefined"==typeof doT&&alert("ERROR: Template engine failed to load!"),function(){var e=window.alert;window.alert=function(t){window.location="byond://?nano_err="+encodeURIComponent(t),e(t)}}(),$(document).ready(function(){NanoUtility.init(),NanoStateManager.init(),NanoTemplate.init()}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){var t=this.length,a=Number(arguments[1])||0;for(a=0>a?Math.ceil(a):Math.floor(a),0>a&&(a+=t);t>a;a++)if(a in this&&this[a]===e)return a;return-1}),String.prototype.format||(String.prototype.format=function(e){var t=this;return t.replace(String.prototype.format.regex,function(t){var a,n=parseInt(t.substring(1,t.length-1));return a=n>=0?e[n]:-1===n?"{":-2===n?"}":""})},String.prototype.format.regex=new RegExp("{-?[0-9]+}","g")),Object.size=function(e){var t,a=0;for(var t in e)e.hasOwnProperty(t)&&a++;return a},window.console||(window.console={log:function(e){return!1}}),String.prototype.toTitleCase=function(){var e=/^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i;return this.replace(/([^\W_]+[^\s-]*) */g,function(t,a,n,r){return n>0&&n+a.length!==r.length&&a.search(e)>-1&&":"!==r.charAt(n-2)&&r.charAt(n-1).search(/[^\s-]/)<0?t.toLowerCase():a.substr(1).search(/[A-Z]|\../)>-1?t:t.charAt(0).toUpperCase()+t.substr(1)})},$.ajaxSetup({cache:!1}),Function.prototype.inheritsFrom=function(e){return this.prototype=new e,this.prototype.constructor=this,this.prototype.parent=e.prototype,this},String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),String.prototype.ckey||(String.prototype.ckey=function(){return this.replace(/\W/g,"").toLowerCase()});var NanoTemplate=function(){var e={},t={},a={},n={},r=function(){e=$("body").data("templateData"),null==e&&alert("Error: Template data did not load correctly."),o()},o=function(){var t=Object.size(e);if(!t)return void $(document).trigger("templatesLoaded");for(var a in e)if(e.hasOwnProperty(a))return void $.when($.ajax({url:e[a],cache:!1,dataType:"text"})).done(function(t){t+='<div class="clearBoth"></div>';try{NanoTemplate.addTemplate(a,t)}catch(n){return void alert("ERROR: An error occurred while loading the UI: "+n.message)}delete e[a],o()}).fail(function(){alert("ERROR: Loading template "+a+"("+e[a]+") failed!")})},i=function(){for(var e in t)try{a[e]=doT.template(t[e],null,t)}catch(n){alert(n.message)}};return{init:function(){r()},addTemplate:function(e,a){t[e]=a},templateExists:function(e){return t.hasOwnProperty(e)},parse:function(e,r){if(!a.hasOwnProperty(e)||!a[e]){if(!t.hasOwnProperty(e))return alert('ERROR: Template "'+e+'" does not exist in _compiledTemplates!'),"<h2>Template error (does not exist)</h2>";i()}return"function"!=typeof a[e]?(alert(a[e]),alert('ERROR: Template "'+e+'" failed to compile!'),"<h2>Template error (failed to compile)</h2>"):a[e].call(this,r.data,r.config,n)},addHelper:function(e,t){return jQuery.isFunction(t)?void(n[e]=t):void alert("NanoTemplate.addHelper failed to add "+e+" as it is not a function.")},addHelpers:function(e){for(var t in e)e.hasOwnProperty(t)&&NanoTemplate.addHelper(t,e[t])},removeHelper:function(e){helpers.hasOwnProperty(e)&&delete n[e]}}}();NanoStateManager=function(){var e=!1,t=null,a={},n={},r={},o=null,i=function(){t=$("body").data("initialData"),null!=t&&t.hasOwnProperty("config")&&t.hasOwnProperty("data")||alert("Error: Initial data did not load correctly.");var a="default";t.config.hasOwnProperty("stateKey")&&t.config.stateKey&&(a=t.config.stateKey.toLowerCase()),NanoStateManager.setCurrentState(a),$(document).on("templatesLoaded",function(){l(t),e=!0})},s=function(a){var n;try{n=jQuery.parseJSON(a)}catch(r){return void alert("recieveUpdateData failed. <br>Error name: "+r.name+"<br>Error Message: "+r.message)}n.hasOwnProperty("data")||(t&&t.hasOwnProperty("data")?n.data=t.data:n.data={}),e?l(n):t=n},l=function(e){if(null!=o){if(e=o.onBeforeUpdate(e),e===!1)return void alert("data is false, return");t=e,o.onUpdate(t),o.onAfterUpdate(t)}},d=function(e,t){for(var a in e)e.hasOwnProperty(a)&&jQuery.isFunction(e[a])&&(t=e[a].call(this,t));return t};return{init:function(){i()},receiveUpdateData:function(e){s(e)},addBeforeUpdateCallback:function(e,t){a[e]=t},addBeforeUpdateCallbacks:function(e){for(var t in e)e.hasOwnProperty(t)&&NanoStateManager.addBeforeUpdateCallback(t,e[t])},removeBeforeUpdateCallback:function(e){a.hasOwnProperty(e)&&delete a[e]},executeBeforeUpdateCallbacks:function(e){return d(a,e)},addAfterUpdateCallback:function(e,t){n[e]=t},addAfterUpdateCallbacks:function(e){for(var t in e)e.hasOwnProperty(t)&&NanoStateManager.addAfterUpdateCallback(t,e[t])},removeAfterUpdateCallback:function(e){n.hasOwnProperty(e)&&delete n[e]},executeAfterUpdateCallbacks:function(e){return d(n,e)},addState:function(e){return e instanceof NanoStateClass?e.key?void(r[e.key]=e):void alert("ERROR: Attempted to add a state with an invalid stateKey"):void alert("ERROR: Attempted to add a state which is not instanceof NanoStateClass")},setCurrentState:function(e){if("undefined"==typeof e||!e)return alert("ERROR: No state key was passed!"),!1;if(!r.hasOwnProperty(e))return alert("ERROR: Attempted to set a current state which does not exist: "+e),!1;var t=o;return o=r[e],null!=t&&t.onRemove(o),o.onAdd(t),!0},getCurrentState:function(){return o}}}(),NanoStateClass.prototype.key=null,NanoStateClass.prototype.layoutRendered=!1,NanoStateClass.prototype.contentRendered=!1,NanoStateClass.prototype.mapInitialised=!1,NanoStateClass.prototype.isCurrent=function(){return NanoStateManager.getCurrentState()==this},NanoStateClass.prototype.onAdd=function(e){NanoBaseCallbacks.addCallbacks(),NanoBaseHelpers.addHelpers()},NanoStateClass.prototype.onRemove=function(e){NanoBaseCallbacks.removeCallbacks(),NanoBaseHelpers.removeHelpers()},NanoStateClass.prototype.onBeforeUpdate=function(e){return e=NanoStateManager.executeBeforeUpdateCallbacks(e)},NanoStateClass.prototype.onUpdate=function(e){try{(!this.layoutRendered||e.config.hasOwnProperty("autoUpdateLayout")&&e.config.autoUpdateLayout)&&($("#uiLayout").html(NanoTemplate.parse("layout",e)),this.layoutRendered=!0),(!this.contentRendered||e.config.hasOwnProperty("autoUpdateContent")&&e.config.autoUpdateContent)&&($("#uiContent").html(NanoTemplate.parse("main",e)),this.contentRendered=!0),NanoTemplate.templateExists("mapContent")&&(this.mapInitialised||($("#uiMap").draggable(),$("#uiMapTooltip").off("click").on("click",function(e){e.preventDefault(),$(this).fadeOut(400)}),this.mapInitialised=!0),$("#uiMapContent").html(NanoTemplate.parse("mapContent",e)),e.config.hasOwnProperty("showMap")&&e.config.showMap?($("#uiContent").addClass("hidden"),$("#uiMapWrapper").removeClass("hidden")):($("#uiMapWrapper").addClass("hidden"),$("#uiContent").removeClass("hidden"))),NanoTemplate.templateExists("mapHeader")&&$("#uiMapHeader").html(NanoTemplate.parse("mapHeader",e)),NanoTemplate.templateExists("mapFooter")&&$("#uiMapFooter").html(NanoTemplate.parse("mapFooter",e))}catch(t){return void alert("ERROR: An error occurred while rendering the UI: "+t.message)}},NanoStateClass.prototype.onAfterUpdate=function(e){NanoStateManager.executeAfterUpdateCallbacks(e)},NanoStateClass.prototype.alertText=function(e){alert(e)},NanoStateDefaultClass.inheritsFrom(NanoStateClass);var NanoStateDefault=new NanoStateDefaultClass;NanoBaseCallbacks=function(){var e=!0,t={},a={status:function(t){var a;return 2==t.config.status?(a="good",$(".linkActive").removeClass("inactive")):1==t.config.status?(a="average",$(".linkActive").addClass("inactive")):(a="bad",$(".linkActive").addClass("inactive")),$(".statusicon").each(function(e,t){t.className=t.className.replace(/good|bad|average/g,""),t.classList.add(a)}),$(".linkActive").stopTime("linkPending"),$(".linkActive").removeClass("linkPending"),$(".linkActive").off("click").on("click",function(a){a.preventDefault();var n=$(this).data("href");null!=n&&e&&(e=!1,$("body").oneTime(300,"enableClick",function(){e=!0}),2==t.config.status&&$(this).oneTime(300,"linkPending",function(){$(this).addClass("linkPending")}),window.location.href=n)}),t},nanomap:function(e){return $(".mapIcon").off("mouseenter mouseleave").on("mouseenter",function(e){$("#uiMapTooltip").html($(this).children(".tooltip").html()).show().stopTime().oneTime(5e3,"hideTooltip",function(){$(this).fadeOut(500)})}),$(".zoomLink").off("click").on("click",function(e){e.preventDefault();var t=$(this).data("zoomLevel"),a=$("#uiMap"),n=a.width()*t,r=a.height()*t;a.css({zoom:t,left:"50%",top:"50%",marginLeft:"-"+Math.floor(n/2)+"px",marginTop:"-"+Math.floor(r/2)+"px"})}),$("#uiMapImage").attr("src","nanomap_z"+e.config.mapZLevel+".png"),e}};return{addCallbacks:function(){NanoStateManager.addBeforeUpdateCallbacks(t),NanoStateManager.addAfterUpdateCallbacks(a)},removeCallbacks:function(){for(var e in t)t.hasOwnProperty(e)&&NanoStateManager.removeBeforeUpdateCallback(e);for(var e in a)a.hasOwnProperty(e)&&NanoStateManager.removeAfterUpdateCallback(e)}}}(),NanoBaseHelpers=function(){var e={syndicateMode:function(){return $("body").css("background-color","#8f1414"),$("body").css("background-image","url('uiBackground-Syndicate.png')"),$("body").css("background-position","50% 0"),$("body").css("background-repeat","repeat-x"),$("#uiTitleFluff").css("background-image","url('uiTitleFluff-Syndicate.png')"),$("#uiTitleFluff").css("background-position","50% 50%"),$("#uiTitleFluff").css("background-repeat","no-repeat"),""},combine:function(e,t){return e&&t?e.concat(t):e||t},dump:function(e){return JSON.stringify(e)},link:function(e,t,a,n,r,o){var i="",s="noIcon";"undefined"!=typeof t&&t&&(i='<div class="uiLinkPendingIcon"></div><div class="uiIcon16 icon-'+t+'"></div>',s="hasIcon"),"undefined"!=typeof r&&r||(r="link");var l="";return"undefined"!=typeof o&&o&&(l='id="'+o+'"'),"undefined"!=typeof n&&n?'<div unselectable="on" class="link '+s+" "+r+" "+n+'" '+l+">"+i+e+"</div>":'<div unselectable="on" class="linkActive '+s+" "+r+'" data-href="'+NanoUtility.generateHref(a)+'" '+l+">"+i+e+"</div>"},xor:function(e,t){return e^t},precisionRound:function(e,t){if(0==t)return Math.round(number);var a=Math.pow(10,t);return Math.round(e*a)/a},round:function(e){return Math.round(e)},fixed:function(e){return Math.round(10*e)/10},floor:function(e){return Math.floor(e)},ceil:function(e){return Math.ceil(e)},string:function(){if(0==arguments.length)return"";if(1==arguments.length)return arguments[0];if(arguments.length>1){stringArgs=[];for(var e=1;e<arguments.length;e++)stringArgs.push(arguments[e]);return arguments[0].format(stringArgs)}return""},formatNumber:function(e){var t=e.toString().split(".");return t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),t.join(".")},capitalizeFirstLetter:function(e){return e.charAt(0).toUpperCase()+e.slice(1)},displayBar:function(e,t,a,n,r){a>t?t>e?e=t:e>a&&(e=a):e>t?e=t:a>e&&(e=a),"undefined"!=typeof n&&n||(n=""),"undefined"!=typeof r&&r||(r="");var o=Math.round((e-t)/(a-t)*100);return'<div class="displayBar '+n+'"><div class="displayBarFill '+n+'" style="width: '+o+'%;"></div><div class="displayBarText '+n+'">'+r+"</div></div>"},dangerToClass:function(e){return 0==e?"good":1==e?"average":"bad"},dangerToSpan:function(e){return 0==e?'"<span class="good">Good</span>"':1==e?'"<span class="average">Minor Alert</span>"':'"<span class="bad">Major Alert</span>"'},generateHref:function(e){var t=$("body");_urlParameters=t.data("urlParameters");var a="?";for(var n in _urlParameters)_urlParameters.hasOwnProperty(n)&&("?"!==a&&(a+=";"),a+=n+"="+_urlParameters[n]);for(var n in e)e.hasOwnProperty(n)&&("?"!==a&&(a+=";"),a+=n+"="+e[n]);return a},displayDNABlocks:function(e,t,a,n,r){if(!e)return'<div class="notice">Please place a valid subject into the DNA modifier.</div>';var o=e.split(""),i='<div class="dnaBlock"><div class="link dnaBlockNumber">1</div>',s=1,l=1;for(index in o)if(o.hasOwnProperty(index)&&"object"!=typeof o[index]){var d;d="UI"==r.toUpperCase()?{selectUIBlock:s,selectUISubblock:l}:{selectSEBlock:s,selectSESubblock:l};var c="linkActive";s==t&&l==a&&(c="selected"),i+='<div class="link '+c+' dnaSubBlock" data-href="'+NanoUtility.generateHref(d)+'" id="dnaBlock'+index+'">'+o[index]+"</div>",index++,index%n==0&&index<o.length?(s++,l=1,i+='</div><div class="dnaBlock"><div class="link dnaBlockNumber">'+s+"</div>"):l++}return i+="</div>"},cMirror:function(e){if(!e)return"ERR - NO domID provided";var t='<script>var editor = CodeMirror.fromTextArea(document.getElementById("';return t+=e,t+='"), {lineNumbers: true,	indentUnit: 4,	indentWithTabs: true,	theme: "lesser-dark"});',t+="</script>"}};return{addHelpers:function(){NanoTemplate.addHelpers(e)},removeHelpers:function(){for(var t in e)e.hasOwnProperty(t)&&NanoTemplate.removeHelper(t)}}}();