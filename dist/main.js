(()=>{"use strict";const e=class{constructor(e){this.type=e}convertChosenMove(e){return e.target.dataset.coordinate}getMove(){const e=this.#e();return"ABCDEFGHIJ"[this.#e()-1]+e}#e(){return Math.ceil(10*Math.random())}},t=class{constructor(e){this.name=e,this.board=this.#t(),this.cells=this.#s(),this.ships={},this.misses=[]}placeShip(e,t){this.ships[t.name]=t;for(let s=0;s<t.length;s++){this.cells[e].classList.add(t.name,"taken"),this.cells[e].dataset.shipName=t.name;let[s,a]=e.split("");e=String.fromCharCode(s.charCodeAt()+1)+a}}receiveAttack(e){const t=this.cells[e];if(t.className.includes("taken")){let s=t.dataset.shipName;return this.ships[s].hit(),this.cells[e].classList.add("hit"),!0}return this.misses.push(e),this.cells[e].classList.add("miss"),!1}allSunk(){return Object.entries(this.ships).every((([e,t])=>t.isSunk()))}#t(){const e=document.createElement("div");e.classList.add(this.name,"board");for(let t=1;t<11;t++)for(let s=0;s<10;s++){const a=this.#a(t,s);e.appendChild(this.#r(a))}return e}#a(e,t){return"ABCDEFGHIJ"[t]+e}#r(e){const t=document.createElement("div");return t.classList.add("cell"),t.dataset.coordinate=e,t}#s(){return[...this.board.children].reduce(((e,t)=>(e[t.dataset.coordinate]=t,e)),{})}},s=(()=>{const e=document.querySelector(".boards-container");return{displayBoard:t=>{e.appendChild(t.board)}}})(),a=s,r=class{constructor(e,t){this._name=e,this._length=t,this._hits=0}get name(){return this._name}get length(){return this._length}get hits(){return this._hits}hit(){this._hits++}isSunk(){return this.hits>=this.length}};(()=>{const s=new e("human"),i=new e("ai");let n="human";const c=new t("player-board"),h=new t("ai-board");a.displayBoard(c),a.displayBoard(h),Array.from(h.board.childNodes).forEach((e=>{e.addEventListener("click",(e=>{!function(e){if(e&&"human"===n){const t=s.convertChosenMove(e);h.receiveAttack(t)||(n="ai",w()),console.log(h,h.allSunk())}}(e)}))}));const l=new r("carrier",5),o=new r("battleship",4),d=new r("destroyer",3),p=new r("submarine",3),u=new r("patrol",2);c.placeShip("A1",l),c.placeShip("C3",o),c.placeShip("D5",d),c.placeShip("B7",p),c.placeShip("G9",u);const m=new r("carrier",5),g=new r("battleship",4),C=new r("destroyer",3),S=new r("submarine",3),b=new r("patrol",2);function w(){if(console.log("Now im in AI turn"),"ai"===n){const e=i.getMove();if(!c.receiveAttack(e))return void(n="human");w()}}h.placeShip("A2",m),h.placeShip("C3",g),h.placeShip("D5",C),h.placeShip("B7",S),h.placeShip("G9",b)})()})();