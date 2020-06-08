"use strict";

class VirtualKeyboard extends HTMLElement{
    constructor(){
        super();
		this.content = {};
		this.content.state = "min";
		this.content.min = ["q","w","e","r","t","y","u","i","o","p","del","a","s","d","f","g","h","j","k","l","ñ","enter","may","z","x","c","v","b","n","m","´","¨","may","?123","@"," ",",","."];
		this.content.cap = ["Q","W","E","R","T","Y","U","I","O","P","del","A","S","D","F","G","H","J","K","L","Ñ","enter","may","Z","X","C","V","B","N","M","´","¨","may","?123","@"," ",";",":"];
		this.content.num = ["1","2","3","4","5","6","7","8","9","0","del","#","€","\"","}","]",">","/",")","!","?","enter","=\\<","`","^","~","&","%","+","*","-","ç","=\\<","ABC","@"," ",",","."];
		this.content.sym = ["1","2","3","4","5","6","7","8","9","0","del","=","$","\'","{","[","<","\\",")","¡","¿","enter","?123","`","^","~","&","%","|","·","_","Ç","?123","ABC","@"," ",";",":"];
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <style>
				:host{
					--key-border: 0px;
					--key-margin: 8px;
					--key-radius: 16px;
				}
                #outer{
                    background-color: rgb(230,234,240);
					display: none;
					position: fixed;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 100px;
					z-index: 100;
                }
				.row{
					position: relative;
					width: 100%;
					height: 25%;
				}
				.key{
					position: relative;
					float: left;
					height: calc( 100% - 2 * var(--key-border) - 2 * var(--key-margin) );
					width: calc( ( 100% / 11 ) - 2 * var(--key-border) - 2 * var(--key-margin) );
					margin: var(--key-margin);
					background-color: white;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.key:active{
					animation-name: background;
					animation-duration: 0.4s;
					-webkit-animation-name: background;
					-webkit-animation-duration: 0.4s;
					-moz-animation-name: background;
					-moz-animation-duration: 0.4s;
					-o-animation-name: background;
					-o-animation-duration: 0.4s;
				}
				.special{
					background-color: rgb(215,219,225);
				}
				.enter{
					background-color: rgb(74,168,156);
				}
				.space{
					width: calc( ( 7 * ( 100% / 11 ) ) - 2 * var(--key-border) - 2 * var(--key-margin) );
				}
				@keyframes background {
					from {background-color: rgb(74,168,156);}
					to {background-color: white;}
				}
				@-webkit-keyframes background {
					from {background-color: rgb(74,168,156);}
					to {background-color: white;}
				}
				@-moz-keyframes background {
					from {background-color: rgb(74,168,156);}
					to {background-color: white;}
				}
				@-o-keyframes background {
					from {background-color: rgb(74,168,156);}
					to {background-color: white;}
				}
            </style>
            <div id="outer">
				<div class="row">
					<div class="key" id="0"></div>
					<div class="key" id="1"></div>
					<div class="key" id="2"></div>
					<div class="key" id="3"></div>
					<div class="key" id="4"></div>
					<div class="key" id="5"></div>
					<div class="key" id="6"></div>
					<div class="key" id="7"></div>
					<div class="key" id="8"></div>
					<div class="key" id="9"></div>
					<div class="key special" id="10">
						<svg viewBox="0 0 100 100" style="width:100%;height:100%;">
							<polyline points="20,50 35,37 70,37 70,63 35,63 20,50" style="fill:none;stroke:rgb(74,168,156);stroke-width:1;"/>
							<line x1="45" y1="45" x2="55" y2="55" style="stroke:rgb(74,168,156);stroke-width:1" />
							<line x1="55" y1="45" x2="45" y2="55" style="stroke:rgb(74,168,156);stroke-width:1" />
							</svg>
						</div>
					</div>
				<div class="row">
					<div class="key" id="11"></div>
					<div class="key" id="12"></div>
					<div class="key" id="13"></div>
					<div class="key" id="14"></div>
					<div class="key" id="15"></div>
					<div class="key" id="16"></div>
					<div class="key" id="17"></div>
					<div class="key" id="18"></div>
					<div class="key" id="19"></div>
					<div class="key" id="20"></div>
					<div class="key enter" id="21">
						<svg viewBox="0 0 100 100" style="width:100%;height:100%;">
							<line x1="30" y1="50" x2="70" y2="50" style="stroke:rgb(215,219,225);stroke-width:1" />
							<line x1="57" y1="37" x2="70" y2="50" style="stroke:rgb(215,219,225);stroke-width:1" />
							<line x1="57" y1="63" x2="70" y2="50" style="stroke:rgb(215,219,225);stroke-width:1" />
						</svg>
					</div>
				</div>
				<div class="row">
					<div class="key special" id="22"></div>
					<div class="key" id="23"></div>
					<div class="key" id="24"></div>
					<div class="key" id="25"></div>
					<div class="key" id="26"></div>
					<div class="key" id="27"></div>
					<div class="key" id="28"></div>
					<div class="key" id="29"></div>
					<div class="key" id="30"></div>
					<div class="key" id="31"></div>
					<div class="key special" id="32"></div>
				</div>
				<div class="row">
					<div class="key special" id="33"></div>
					<div class="key special" id="34"></div>
					<div class="key space" id="35"></div>
					<div class="key special" id="36"></div>
					<div class="key special" id="37"></div>
				</div>
            </div>
        `;
    }

    connectedCallback(){
		for(let i = 0; i < 38; i++){
			this.shadowRoot.getElementById(""+i).addEventListener("click", e => { this.keyEvent(e); });
		}
		//console.log(this.content.min);
		this.changeKeys(this.content.min);
    }

	static get observedAttributes(){
		return ["visible"];
	}

	get visible(){
		return this.hasAttribute("visible");
	}

	set visible(val){
		if(val){
			this.setAttribute("visible","");
		} else {
			this.removeAttribute("visible");
		}
	}

	attributeChangedCallback(name, oldValue, newValue){
		const outer = this.shadowRoot.getElementById("outer");
		if(this.visible){
			const vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			const w = vw/4;
			outer.style.height = w+"px";
			outer.style.display = "block";
		} else {
			outer.sytle.display = "none";
		}
	}

	changeKeys(dict){
		if(dict == this.content.min) this.content.state = "min";
		else if(dict == this.content.cap) this.content.state = "cap";
		else if(dict == this.content.num) this.content.state = "num";
		else if(dict == this.content.sym) this.content.state = "sym";
		for(let i = 0; i < 38; i++){
			if((i == 22 || i == 32) && this.content.state == "min") this.shadowRoot.getElementById(""+i).innerHTML = `
				<svg viewBox="0 0 100 100" style="width:100%;height:100%;">
					<polyline points="30,50 50,30 70,50 60,50 60,60 40,60 40,50 30,50" style="fill:none;stroke:rgb(74,168,156);stroke-width:1;"/>
					<line x1="40" y1="70" x2="60" y2="70" style="stroke:black;stroke-width:1" />
				</svg>
			`;
			else if((i == 22 || i == 32) && this.content.state == "cap") this.shadowRoot.getElementById(""+i).innerHTML = `
				<svg viewBox="0 0 100 100" style="width:100%;height:100%;">
					<polyline points="30,50 50,30 70,50 60,50 60,60 40,60 40,50 30,50" style="fill:rgb(74,168,156);stroke:rgb(74,168,156);stroke-width:1;"/>
					<line x1="40" y1="70" x2="60" y2="70" style="stroke:black;stroke-width:1" />
				</svg>
			`;
			else if(i != 10 && i != 21) this.shadowRoot.getElementById(""+i).innerText = dict[i];
		}
	}

	keyEvent(e){
		const value = e.target.innerText;
		let key = e.target.id;
		if(key == "") key = e.target.parentElement.id;
		if(key == "") key = e.target.parentElement.parentElement.id;
		//console.log(key,this.content.state);
		if(this.content.state == "min" && (key == "22" || key == "32")) this.changeKeys(this.content.cap);
		else if(this.content.state == "cap" && (key == "22" || key == "32")) this.changeKeys(this.content.min);
		else if(this.content.state == "num" && (key == "22" || key == "32")) this.changeKeys(this.content.sym);
		else if(this.content.state == "sym" && (key == "22" || key == "32")) this.changeKeys(this.content.num);
	
		else if(key == "33" && (this.content.state == "min" || this.content.state == "cap")) this.changeKeys(this.content.num);
		else if(key == "33" && (this.content.state == "num" || this.content.state == "sym")) this.changeKeys(this.content.min);
		else if(key == "21") this.dispatchEvent(new CustomEvent("enter",{detail:""}));
		else if(key == "10") this.content.input.value = this.content.input.value.substr(0,this.content.input.value.length-1);
	
		else if(key != "10" && key != "21" && key != "22" && key != "32" && key != "33"){
			if(this.content.alt == ""){
				if(key == "35") this.content.alt = " ";
				else if((key == "30" || key == "31") && (this.content.state == "min" || this.content.state == "cap")) this.content.alt = value;
				else if((key == "23" || key == "24" || key == "25") && (this.content.state == "num" || this.content.state == "sym")) this.content.alt = value;
				else this.content.input.value += value;
			} else {
				if(this.content.alt == " "){
					if(key == "35") this.content.alt += value;
					else if((key == "30" || key == "31") && (this.content.state == "min" || this.content.state == "cap")) this.content.alt += value;
					else if((key == "23" || key == "24" || key == "25") && (this.content.state == "num" || this.content.state == "sym")) this.content.alt += value;
					else {
						this.content.input.value += " "+value;
						this.content.alt = "";
					}
				} else {
					if(this.content.alt == "´"){
						if(value =="a") this.content.input.value += "á";
						else if(value =="e") this.content.input.value += "é";
						else if(value =="i") this.content.input.value += "í";
						else if(value =="o") this.content.input.value += "ó";
						else if(value =="u") this.content.input.value += "ú";
						else if(value =="A") this.content.input.value += "Á";
						else if(value =="E") this.content.input.value += "É";
						else if(value =="I") this.content.input.value += "Í";
						else if(value =="O") this.content.input.value += "Ó";
						else if(value =="U") this.content.input.value += "Ú";
						else this.content.input.value +="´"+value;
					} else if(this.content.alt == "¨"){
						if(value =="a") this.content.input.value += "ä";
						else if(value =="e") this.content.input.value += "ë";
						else if(value =="i") this.content.input.value += "ï";
						else if(value =="o") this.content.input.value += "ö";
						else if(value =="u") this.content.input.value += "ü";
						else if(value =="A") this.content.input.value += "Ä";
						else if(value =="E") this.content.input.value += "Ë";
						else if(value =="I") this.content.input.value += "Ï";
						else if(value =="O") this.content.input.value += "Ö";
						else if(value =="U") this.content.input.value += "Ü";
						else this.content.input.value += "¨"+value;
					} else if(this.content.alt == "`"){
						if(value =="a") this.content.input.value += "à";
						else if(value =="e") this.content.input.value += "è";
						else if(value =="i") this.content.input.value += "ì";
						else if(value =="o") this.content.input.value += "ò";
						else if(value =="u") this.content.input.value += "ù";
						else if(value =="A") this.content.input.value += "À";
						else if(value =="E") this.content.input.value += "È";
						else if(value =="I") this.content.input.value += "Ì";
						else if(value =="O") this.content.input.value += "Ò";
						else if(value =="U") this.content.input.value += "Ù";
						else this.content.input.value += "`"+value; 
					} else if(this.content.alt == "^"){
						if(value =="a") this.content.input.value += "â";
						else if(value =="e") this.content.input.value += "ê";
						else if(value =="i") this.content.input.value += "î";
						else if(value =="o") this.content.input.value += "ô";
						else if(value =="u") this.content.input.value += "û";
						else if(value =="A") this.content.input.value += "Â";
						else if(value =="E") this.content.input.value += "Ê";
						else if(value =="I") this.content.input.value += "Î";
						else if(value =="O") this.content.input.value += "Ô";
						else if(value =="U") this.content.input.value += "Û";
						else this.content.input.value += "^"+value;
					} else if(this.content.alt == "~"){
						if(value =="a") this.content.input.value += "ã";
						else if(value =="o") this.content.input.value += "õ";
						else if(value =="A") this.content.input.value += "Ã";
						else if(value =="O") this.content.input.value += "Õ";
						else this.content.input.value += "~"+value;
					} else if(this.content.alt == " ´"){
						if(value =="a") this.content.input.value += " á";
						else if(value =="e") this.content.input.value += " é";
						else if(value =="i") this.content.input.value += " í";
						else if(value =="o") this.content.input.value += " ó";
						else if(value =="u") this.content.input.value += " ú";
						else if(value =="A") this.content.input.value += " Á";
						else if(value =="E") this.content.input.value += " É";
						else if(value =="I") this.content.input.value += " Í";
						else if(value =="O") this.content.input.value += " Ó";
						else if(value =="U") this.content.input.value += " Ú";
						else this.content.input.value +=" ´"+value;
					} else if(this.content.alt == " ¨"){
						if(value =="a") this.content.input.value += " ä";
						else if(value =="e") this.content.input.value += " ë";
						else if(value =="i") this.content.input.value += " ï";
						else if(value =="o") this.content.input.value += " ö";
						else if(value =="u") this.content.input.value += " ü";
						else if(value =="A") this.content.input.value += " Ä";
						else if(value =="E") this.content.input.value += " Ë";
						else if(value =="I") this.content.input.value += " Ï";
						else if(value =="O") this.content.input.value += " Ö";
						else if(value =="U") this.content.input.value += " Ü";
						else this.content.input.value += " ¨"+value;
					} else if(this.content.alt == " `"){
						if(value =="a") this.content.input.value += " à";
						else if(value =="e") this.content.input.value += " è";
						else if(value =="i") this.content.input.value += " ì";
						else if(value =="o") this.content.input.value += " ò";
						else if(value =="u") this.content.input.value += " ù";
						else if(value =="A") this.content.input.value += " À";
						else if(value =="E") this.content.input.value += " È";
						else if(value =="I") this.content.input.value += " Ì";
						else if(value =="O") this.content.input.value += " Ò";
						else if(value =="U") this.content.input.value += " Ù";
						else this.content.input.value += " `"+value; 
					} else if(this.content.alt == " ^"){
						if(value =="a") this.content.input.value += " â";
						else if(value =="e") this.content.input.value += " ê";
						else if(value =="i") this.content.input.value += " î";
						else if(value =="o") this.content.input.value += " ô";
						else if(value =="u") this.content.input.value += " û";
						else if(value =="A") this.content.input.value += " Â";
						else if(value =="E") this.content.input.value += " Ê";
						else if(value =="I") this.content.input.value += " Î";
						else if(value =="O") this.content.input.value += " Ô";
						else if(value =="U") this.content.input.value += " Û";
						else this.content.input.value += " ^"+value;
					} else if(this.content.alt == " ~"){
						if(value =="a") this.content.input.value += " ã";
						else if(value =="o") this.content.input.value += " õ";
						else if(value =="A") this.content.input.value += " Ã";
						else if(value =="O") this.content.input.value += " Õ";
						else this.content.input.value += " ~"+value;
					}
					this.content.alt = "";
				}
			}
			if(this.content.state == "cap" && (value != "´" || value != "¨")) this.changeKeys(this.content.min);
		}
	}

	activate(input){
		this.content.input = input;
		const outer = this.shadowRoot.getElementById("outer");
		const vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		const w = vw/4;
		outer.style.height = w+"px";
		outer.style.display = "block";
	}
}

customElements
customElements.define("fabs-keyboard",VirtualKeyboard);
