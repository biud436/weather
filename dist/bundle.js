!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);class n{constructor(){this._events={}}on(t,e){return this._events[t]||(this._events[t]=[]),this._events[t].push(e),this}emit(t,...e){if(!this._events[t])return;if(!Array.isArray(this._events[t]))return;this._events[t].forEach(t=>t(...e))}}class s extends n{constructor(t){super(),this._app=t,this.initMembers()}async initMembers(){this.on("added",(...t)=>this.onAdded(...t))}onAdded(){this.start()}start(){}update(){}}class a extends s{constructor(t){super(t)}initMembers(){super.initMembers(),this._backgroundPositionX=0,this._patternImageWidth=1,this._canvas=document.getElementById("main-canvas"),this._canvas.width=$(".temperature-field").outerWidth(),this._canvas.height=$(".temperature-field").outerHeight(),$(window).on("resize",t=>{this._canvas.width=$(".temperature-field").outerWidth(),this._canvas.height=$(".temperature-field").outerHeight()}),this.on("ready",(...t)=>{this._config={...t[0]},this._config.pattern.valid&&this.drawChartPattern(this._config.pattern).then(t=>{const e=this._canvas.getContext("2d");this._fillPattern=e.createPattern(t,"repeat")}),this.on("update",t=>{const{temperatures:e}=this._config;this.drawLines(e,t)})})}getLinePositionX(t){const e=this._canvas.width;return Math.floor(e/this._config.temperatures.length)*t}getLinePositionY(t){const e=this._config.maxTemperature,i=this._canvas.height,n=Math.floor(i/e);return Math.floor(n*(e-t))}getLines(t){return t.map((t,e)=>({x:this.getLinePositionX(e),y:this.getLinePositionY(t)}))}drawChartPattern(t){return new Promise((e,i)=>{if(!this._img){const n=new Image;n.src=t.src,n.onload=t=>{e(n),this._patternImageWidth=n.width},n.onerror=t=>{i(ev)}}})}drawLines(t,e){const i=this._canvas.getContext("2d"),{strokeStyle:n,lineWidth:s,font:a,padding:r,textAlign:o,temperatureSymbol:h,lineCap:l,smooth:c,fillChart:d,fillStyle:p,pattern:u,textColor:g}=this._config;i.clearRect(0,0,this._canvas.width,this._canvas.height),this._backgroundPositionX=(this._backgroundPositionX+1)%this._patternImageWidth;const m=this.getLines(t);i.save(),i.beginPath();this._canvas.width,this._canvas.height;i.setTransform(1,0,0,1,this._canvas.width/r,0),c&&i.translate(.5,.5);for(let e=0;e<m.length;e++){const r=m[e],c=m[e-1];d||(c?i.moveTo(c.x,c.y):i.moveTo(r.x,r.y));const p=t[e]+h,u=i.measureText(p).width,f=u;i.lineWidth=s,i.lineCap=l,i.lineTo(r.x,r.y),i.stroke(),i.font=a,i.textAlign=o,i.lineWidth=s/2,i.strokeStyle=n,i.strokeText(p,r.x,r.y-f,2*u),i.fillStyle=g,i.fillText(p,r.x,r.y-f,2*u)}const f=[...m].pop();d&&(i.lineTo(f.x,this._canvas.height),i.lineTo(0,this._canvas.height),i.closePath(),u.valid?(i.translate(this._backgroundPositionX,0),i.fillStyle=this._fillPattern):i.fillStyle=p,i.fill()),i.restore()}}class r extends s{constructor(t){super(),this._config=t}initMembers(){super.initMembers()}start(){this._canvas=$("<canvas />",{width:50,height:25}),this._size=50,this.drawBackground(!0,1-this._config.fillRate||1),this.drawShape();const t=this._canvas.get(0);this.emit("load",t.toDataURL())}drawShape(){const t=this._canvas.get(0),e=t.getContext("2d"),i=this._size;e.save(),e.globalCompositeOperation="source-over",e.setTransform(1,0,0,1,t.width/2,t.height/2),e.translate(.5,.5),e.beginPath(),e.moveTo(0-i,0),e.lineTo(0,0-i),e.lineTo(0+i,0),e.arc(0,0,i,0,Math.PI),e.lineWidth=4,e.closePath(),e.strokeStyle="#1F9FDE",e.stroke(),e.restore()}drawBackground(t,e){const i=this._canvas.get(0),n=i.getContext("2d"),s=this._size;n.save(),n.globalCompositeOperation="source-over",n.fillStyle="#1F9FDE",n.fillRect(0,Math.floor(i.height*e),i.width,i.height),n.fill(),n.globalCompositeOperation="source-in",n.setTransform(1,0,0,1,i.width/2,i.height/2),n.translate(.5,.5),n.beginPath(),n.moveTo(0-s,0),n.lineTo(0,0-(s-2)),n.lineTo(0+s,0),n.arc(0,0,s,0,Math.PI),n.lineWidth=10,n.closePath(),n.fillStyle="#4798E6",n.fill(),n.restore()}}class o extends s{constructor(t){super(t)}start(){this.on("ready",t=>{this._config=t,this.initWithDate(),this.initWithWeather()})}getTimeString(t){const e=new Date(1e3*t);return new Intl.DateTimeFormat("ko-KR",{weekday:"long",month:"long",day:"numeric"}).format(e)}getDegreeCelsius(t){return Math.round(t-273.15,2)}getFahrenheit(t){return.5555555555555556*(this.getDegreeCelsius(t)-32)}initWithDate(){const{daily:t}=this._config,e=[];for(let i=0;i<5;i++)e.push(t[i].dt);$(".city-field div").text(""+this._config.timezone),$("article").each((t,i)=>{$(i).text("").append(`<p>${this.getTimeString(e[t])}</p>`)})}getWindDirection(t){return{0:"북",1:"북북동",2:"북동",3:"동북동",4:"동",5:"동남동",6:"남동",7:"남남동",8:"남",9:"남남서",10:"남서",11:"서남서",12:"서",13:"서북서",14:"북서",15:"북북서",16:"북"}[Math.floor((t+11.25)/22.5)]}initWithWeather(){$("article").each((t,e)=>{$("<div />",{class:"article__weather-image"});const{daily:i}=this._config,n=i[t].weather;let s=$(window).width()>768?"@4x":"@2x";$(window).width()<480&&(s="");const a=$(`<img src="https://openweathermap.org/img/wn/${n[0].icon}${s}.png">`);$(e).append(a),this.initWithWindSpeed(t)})}initWithWindSpeed(t){const{daily:e}=this._config,i=e[t],n=$("<p></p>",{class:"article__weather-wind-deg"}).html("<span>풍향</span> "+this.getWindDirection(i.wind_deg)),s=$("<p></p>",{class:"article__weather-wind-speed"}).html(`<span>풍속</span> ${Math.round(i.wind_speed/1.944)}m/s`),a=$("<div></div>",{class:"article__weather-humidity"}).html(`<span>습도</span> ${i.humidity}%`),o=$("<p></p>",{class:"article__weather-temp-min"}).html(`<span>최저 기온</span> ${this.getDegreeCelsius(i.temp.min)}°C`),h=$("<p></p>",{class:"article__weather-temp-max"}).html(`<span>최고 기온</span> ${this.getDegreeCelsius(i.temp.max)}°C`),l=$("<p></p>",{class:"article__weather-sunrize"}).html("<span>일출 시간</span> "+new Date(1e3*i.sunrise).toLocaleTimeString());$("article img").eq(t).after(n,s,a,o,h,l),$(`<p>${this.getDegreeCelsius(i.temp.day)}°C</p>`).addClass("temperature-text").appendTo($("article").eq(t));try{const e=new r({fillRate:.01*i.humidity});e.on("load",e=>{const n=new Image(50,50);n.src=e,n.classList.add("fill-water-drop"),n.title=`습도 ${i.humidity}%`,n.onload=()=>{$("article").eq(t).find(".article__weather-wind-deg").append(n)}}),e.start(),$('<i class="fas fa-arrow-up"></i>').css("transform",`rotate(${i.wind_deg}deg)`).appendTo(n)}catch(t){console.warn(t)}}}window.atob("WWIxblBHVEFoa2xjJTJCMUJ6JTJGN2VqZ2JDR2QyZ25DdDhoR3I4UmhrdWJGbUNGQ0ZEUUtMQUhkUGMlMkJMdmRPWnJSYzlJUzlEN2syMHZ2TG9jVW9EaVRhYlElM0QlM0Q="),window.atob("aHR0cDovL2FwaXMuZGF0YS5nby5rci8xMzYwMDAwL1ZpbGFnZUZjc3RJbmZvU2VydmljZS9nZXRWaWxhZ2VGY3N0");class h extends s{constructor(t){super(),this._url=t,this.emit("added")}start(){const t=this._url;$.ajax({url:t,dataType:"json",success:t=>{this.emit("load",t)},error:t=>{this.emit("error",t)}})}}const l=new class extends n{constructor(){super()}start(){$("#loading, #darken").show(),this.initWithArticle()}initWithCharts(t){this._chart=new a(this),this._chart.emit("ready",{strokeStyle:"#489AED",lineWidth:8,font:"1em Arial",padding:10,textAlign:"center",lineCap:"round",temperatureSymbol:"°",smooth:!0,fillChart:!0,pattern:{valid:!0,src:"./images/background2.webp"},fillStyle:"rgb(255, 0, 0, 0.5)",textColor:"white",temperatures:t,maxTemperature:50})}initWithArticle(){this._weatherComponent=new o,this._weatherComponent.emit("added");const t=window.atob("ZjVmOTYzOTAxYmM3YTdkZjU2YjczMzIzY2EwMGFlNDc="),e=navigator.language.slice(3).toLowerCase(),i=new h(`https://api.openweathermap.org/data/2.5/onecall?lat=37.5326&lon=127.024612&appid=${t}&lang=${e}`);i.on("load",t=>{this._weatherComponent.emit("ready",t);const e=[],{daily:i}=t;for(let t=0;t<5;t++)e.push(this._weatherComponent.getDegreeCelsius(i[t].temp.day));this.initWithCharts(e),this.on("update",t=>this.update(t)),$("#loading, #darken").hide()}),i.on("error",t=>{console.log("error"),console.warn(t)})}update(t){this._chart.emit("update",t)}};Object.assign(window,{app:l}),l.start(),function t(e){l.emit("update",e),window.requestAnimationFrame(t)}()}]);
//# sourceMappingURL=bundle.js.map