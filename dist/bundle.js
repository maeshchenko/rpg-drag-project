(()=>{"use strict";var o,t,e,i,n,r=(o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,t){o.__proto__=t}||function(o,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(o[e]=t[e])},o(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),s="#282828",c=10;function l(){e.fillStyle=s,e.fillRect(c,c,t.width-20,t.height-20),i.draw(),n.draw(),window.requestAnimationFrame(l)}window.onload=function(){t=document.getElementById("canvas"),(e=t.getContext("2d")).fillStyle="#000000",e.fillRect(0,0,t.width,t.height),e.fillStyle=s,e.fillRect(c,c,t.width-20,t.height-20),i=new d("#9ccc9c"),n=new u("#2b5329"),window.requestAnimationFrame(l)};var h=function(){function o(o,t,e,i,n){void 0===i&&(i=20),void 0===n&&(n=30),this.color=o,this.xCoord=t,this.yCoord=e,this.sizeX=i,this.sizeY=n,console.log("Person class is initiated"),console.log("My color is: ",this.color)}return o.prototype.getCoord=function(){return{x:this.xCoord,y:this.yCoord}},o.prototype.draw=function(){e.fillStyle=this.color,e.fillRect(this.xCoord,this.yCoord,this.sizeX,this.sizeY)},o.prototype.moveX=function(o){this.xCoord+o<t.width-20-this.sizeX/2&&this.xCoord+o>c&&(this.xCoord+=o)},o.prototype.moveY=function(o){this.yCoord+o<t.height-20-this.sizeY/2&&this.yCoord+o>c&&(this.yCoord+=o)},o.prototype.moveUp=function(){this.moveY(-10)},o.prototype.moveDown=function(){this.moveY(10)},o.prototype.moveLeft=function(){this.moveX(-10)},o.prototype.moveRight=function(){this.moveX(10)},o}(),d=function(o){function e(e){var i=o.call(this,e,t.width/2,t.height-20-20)||this;return console.log("Player is initiated."),i}return r(e,o),e}(h),u=function(o){function t(t){var e=o.call(this,t,c,c)||this;return console.log("Seller is initiated."),e}return r(t,o),t}(h);document.addEventListener("keypress",(function(o){console.log(o.code),"KeyW"===o.code&&i.moveUp(),"KeyS"===o.code&&i.moveDown(),"KeyA"===o.code&&i.moveLeft(),"KeyD"===o.code&&i.moveRight()}))})();
//# sourceMappingURL=bundle.js.map