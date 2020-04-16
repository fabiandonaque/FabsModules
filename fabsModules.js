'use strict'

class AddButton extends HTMLElement
{
    // Métodos de clase
    constructor()
    {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            *{
                margin: 0;
                padding: 0;
                border: 0;
            }
            :host{
                --element-color: #f2a72e;
                --background-color: transparent;
                --size: 1px;
				display: block;
                position:relative;
                width: 100%;
                height: 100%;
                cursor:pointer;
				background-color: var(--background-color);
            }
            #vertical {
              background: var(--element-color);
              position: absolute;
              top: calc( var(--size) / 3 );
              left: calc( ( 100% - ( var(--size) / 3 ) ) / 2 );
              height: var(--size);
              width: calc( var(--size) / 3 );
            }
            #horizontal {
              background: var(--element-color);
              position: absolute;
              top: calc( ( 100% - ( var(--size) / 3 ) ) / 2 );
              left: calc( ( 100% - var(--size) ) / 2 );
              height: calc( var(--size) / 3 );
              width: var(--size)
            }
        </style>
		<fabs-view>
			<div id="vertical"></div>
    		<div id="horizontal"></div>
		</fabs-view>
        `;
    }

    static get observedAttributes(){
        return ['color','backgroundcolor','size','style','disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name == "color"){
            this.shadowRoot.host.style.setProperty('--element-color',newValue);
        }
        if(name == "backgroundcolor"){
            this.shadowRoot.host.style.setProperty('--background-color',newValue);
        }
        if(name == "style"){
			this.shadowRoot.host.style.setProperty('--size','calc( 3 * '+this.style.height+' / 5 )');
        }
		if(name == "disabled"){
			this.shadowRoot.host.style.cursor = "inherit";
        }
    }

    connectedCallback(){
		//console.log("fabs-add-button",this.innerHTML);
    }

	get disabled(){
		return this.hasAttribute('disabled');
	}

	set disabled(val){
		if (val) {
			this.shadowRoot.host.style.cursor = "inherit";
			this.setAttribute('disabled', '');
		} else {
			this.shadowRoot.host.style.cursor = "pointer";
			this.removeAttribute('disabled');
		}
	}



    about(){
        var about = {
            "Description":"Elemento para crear un bontón en forma de cruz, el onclick se ejecuta a traves del atributo callback.",
            "CreatedBy":"Fabián Doñaque",
            "Company":"Fabs Robotics",
            "CreatedOn":"Dic 2019",
            "ModifiedOn":"Abr 2020",
            "Methods":[],
            "Attributes":[
                {
                    'Name':'callback',
                    'Description': 'Sirve para asignar una función al onclick.'
                }
                ]
        }
        return(about);
    }
}

customElements.define('fabs-add-button', AddButton);

class AddLabeledButton extends HTMLElement
{
    // Métodos de clase
    constructor()
    {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            *{
                margin: 0;
                padding: 0;
                border: 0;
            }
            :host{
                --element-color: #f2a72e;
                --background-color: transparent;
                --size: 1px;
				display: block;
                position:relative;
                width: 100%;
                height: 100%;
				cursor: pointer;
				background-color: var(--background-color);
            }
			fabs-split-view{
				position:relative;
                width: 100%;
                height: 100%;
			}
        </style>
		<fabs-split-view orientation="horizontal">
			<fabs-center-text></fabs-center-text>
			<fabs-add-button disabled></fabs-add-button>
		</fabs-split-view>
        `;
    }

    static get observedAttributes(){
        return ['color','backgroundcolor','style','disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name == "color"){
            this.shadowRoot.host.style.setProperty('--element-color',newValue);
        }
        if(name == "backgroundcolor"){
            this.shadowRoot.host.style.setProperty('--background-color',newValue);
        }
        if(name == "style"){
			this.shadowRoot.querySelector('fabs-split-view').setAttribute('size',this.style.height);
			this.shadowRoot.querySelector('fabs-split-view').setAttribute('atend','');
        }
    }

	get disabled(){
		return this.hasAttribute('disabled');
	}

	set disabled(val){
		if (val) {
			this.shadowRoot.host.style.cursor = "default";
			this.setAttribute('disabled', '');
		} else {
			this.shadowRoot.host.style.cursor = "pointer";
			this.removeAttribute('disabled');
		}
	}

    connectedCallback(){
		this.addEventListener('click',(e) => {
			if(this.hasAttribute('disabled')) {
				e.stopPropagation();
			}
		},true);
		this.shadowRoot.querySelector('fabs-center-text').innerHTML = this.innerHTML;
	}

	disconnectedCallback(){
	}

    // Métodos propios



    about(){
        var about = {
            "Description":"",
            "CreatedBy":"Fabián Doñaque",
            "Company":"Fabs Robotics",
            "CreatedOn":"Abr 2020",
            "ModifiedOn":"Abr 2020",
            "Methods":[],
            "Attributes":[]
        }
        return(about);
    }
}

customElements.define('fabs-add-labeled-button', AddLabeledButton);

class Button extends HTMLElement
{
    // Métodos de clase
    constructor()
    {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            *{
                margin: 0;
                padding: 0;
                border: 0;
            }
            :host{
                --element-color: #FFFFFF;
                --background-color: #140951;
                position:relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: auto;
                height: auto;
                overflow: hide;
                border-radius: 9999px;
                border-bottom:1px solid var(--background-color);
                background-color: var(--background-color);
                color: var(--element-color);
                appearance: none;
                cursor:pointer;
            }
            fabs{
                position:relative;
                diplay:block;
                padding: 0.4em 0.6em;
            }
        </style>
        <fabs>
            <slot>
                Button
            </slot>
        </fabs>
        `;
    }

    static get observedAttributes(){
        return ['callback','color','backgroundcolor'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name == "callback"){
            this.callback = newValue;
        }
        if(name == "color"){
            this.shadowRoot.host.style.setProperty('--element-color',newValue);
        }
        if(name == "backgroundcolor"){
            this.shadowRoot.host.style.setProperty('--background-color',newValue);
        }
    }

    connectedCallback(){
        /*this.addEventListener('click', e => {
            if(typeof this.callback === 'function'){
                this.callback(this);
            }
        });*/
    }

    // Métodos propios



    about(){
        var about = {
            "Description":"Elemento para crear un bontón redondeado, el onclick se ejecuta a traves del atributo callback.",
            "CreatedBy":"Fabián Doñaque",
            "Company":"Fabs Robotics",
            "CreatedOn":"Oct 2019",
            "ModifiedOn":"Oct 2019",
            "Methods":[],
            "Attributes":[
                {
                    'Name':'callback',
                    'Description': 'Sirve para asignar una función al onclick.'
                }
                ]
        }
        return(about);
    }
}

customElements.define('fabs-button', Button);

class CenterText extends HTMLElement
{
    // Métodos de clase
    constructor()
    {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            *{
                margin: 0;
                padding: 0;
                border: 0;
            }
            :host{
                --element-color: #f2a72e;
                --background-color: transparent;
                --size: 1px;
				display: block;
                position:relative;
                width: 100%;
                height: 100%;
				background-color: var(--background-color);
            }
			span{
				padding-left: 1em;
			}
			fabs-view{
				display: flex;
				align-items: center;
			}
        </style>
		<fabs-view>
			<span>
				<slot></slot>
			</span>
		</fabs-view>
        `;
    }

    static get observedAttributes(){
        return ['color','backgroundcolor','style'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name == "color"){
            this.shadowRoot.host.style.setProperty('--element-color',newValue);
        }
        if(name == "backgroundcolor"){
            this.shadowRoot.host.style.setProperty('--background-color',newValue);
        }
    }

    connectedCallback(){

		this.observer = new MutationObserver((mutations) => {
			this.updateText();
		});

		this.observer.observe(this, {
			childList: true,
			attributes: true
		});
	}

	disconnectedCallback(){
		if(this.observer) this.observer.disconnect();
	}

	updateText(){
		var text = this.innerHTML;
		var textLength = text.length;
		var totalWidth = this.clientWidth;
		//console.log("totalWidth",totalWidth);

		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');
		ctx.font = getComputedStyle(this).font;
		let mWidth = ctx.measureText('m').width;
		let dotWidth = ctx.measureText('.').width;
		let textWidth = ctx.measureText(text).width;

		//console.log("textWidth",textWidth);

		//console.log("height",this.clientHeight);
		if(totalWidth < textWidth+2*mWidth){
			var charWidth = textWidth/textLength;
			var textMaxLength = Math.floor((totalWidth-2*mWidth-3*dotWidth)/charWidth)-1;
			this.innerHTML = text.substr(0,textMaxLength) + "...";
		}
	}

    // Métodos propios



    about(){
        var about = {
            "Description":"",
            "CreatedBy":"Fabián Doñaque",
            "Company":"Fabs Robotics",
            "CreatedOn":"Abr 2020",
            "ModifiedOn":"Abr 2020",
            "Methods":[],
            "Attributes":[]
        }
        return(about);
    }
}

customElements.define('fabs-center-text', CenterText);

class CenterView extends HTMLElement
{
    constructor()
    {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            :host{
                position:relative;
                width: 100%;
                height: 100%;
                display:flex;
                align-items: center;
                justify-content: center;
                overflow-y: scroll;
            }
            #box{
                width:50%;
                display:block;
            }
        </style>
        <div id="box">
            <slot>
            </slot>
        </div>
        `;
    }
    static get observedAttributes(){
        return ['max-internal-width','max-internal-height','internal-width','internal-height'];
    }

    attributeChangedCallback(name, oldValue, newValue){

        if(name == "max-internal-width"){
            this.shadowRoot.getElementById('box').style.maxWidth = newValue;
        }

        if(name == "max-internal-height"){
            this.shadowRoot.getElementById('box').style.maxHeight = newValue;
        }

        if(name == "internal-width"){
            this.shadowRoot.getElementById('box').style.width = newValue;
        }

        if(name == "internal-height"){
            this.shadowRoot.getElementById('box').style.height = newValue;
        }
    }

    about(){
        var about = {
            "Description":"Elemento Center View, ocupa el 100% del espacio disponible y deja el contenido en el centro de este elemento.",
            "CreatedBy":"Fabián Doñaque",
            "Company":"Fabs Robotics",
            "CreatedOn":"Sept 2019",
            "ModifiedOn":"Oct 2019",
            "Methods":[],
            "Attributes":[
                {
                    'Name':'max-internal-width',
                    'Description':'Ancho máximo que tiene el marco interno'
                },
                {
                    'Name':'max-internal-height',
                    'Description':'Alto máximo que tiene el marco interno'
                },
                {
                    'Name':'internal-width',
                    'Description':'Ancho que tiene el marco interno'
                },
                {
                    'Name':'internal-height',
                    'Description':'Alto que tiene el marco interno'
                }
                ]
        }
        return(about);
    }
}

customElements.define('fabs-center-view', CenterView);

class FilterDateItem extends HTMLElement
{
    // Class Methods
    constructor()
    {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            *{
                margin: 0;
                padding: 0;
                border: 0;
            }
            :host{
                position:relative;
                display: block;
                width: 100%;
                height: auto;
                max-height:500px;
                overflow: scroll;
            }
            #container{
                position:relative;
                display: block;
                width: 100%;
                margin-top: 1em;
            }
            #titleBox{
                cursor:pointer;
            }
            #title{
                display:inline-block;
                margin-left: 0.5em;
            }
            #items{
                border-bottom:1px solid black;
            }
            .item{
                display:block;
                width:80%;
                margin:1em auto;
            }
            .right{
                display:inline-block;
                margin-left:1.05em;
                width: 0;
                height: 0;
                border-top: 0.4em solid transparent;
                border-bottom: 0.4em solid transparent;
                border-left: 0.4em solid black;
            }
            .down{
                display:inline-block;
                margin-left: 0.7em;
                width: 0;
                height: 0;
                border-left: 0.4em solid transparent;
                border-right: 0.4em solid transparent;
                border-top: 0.4em solid black;
            }
        </style>
        <div id="container">
            <div id="titleBox">
                <div id="triangle" class="down"></div>
                <p id="title">Rango de fechas:</P>
            </div>
            <div id='items'>
                <input type="date" id="begin" class="item"/>
                <input type="date" id="end" class="item"/>
            </div>
        </div>
        `;
    }

    connectedCallback(){
        let triangle = this.shadowRoot.getElementById('triangle');
        let titleBox = this.shadowRoot.getElementById('titleBox');
        titleBox.addEventListener('click', e => {
            if(triangle.className == "right"){
                triangle.className = "down";
                this.shadowRoot.getElementById('items').style.display = 'block';
            }
            else{
                triangle.className = "right";
                this.shadowRoot.getElementById('items').style.display = 'none';
            }
        });
    }


    // Custom Methods

    setConfiguration(data){
        this.name = data.name;
        this.tableAssociated = data.tableAssociated;
        this.shadowRoot.getElementById('title').innerHTML = data.title;
        this.shadowRoot.getElementById('begin').value = data.elements[0];
        this.shadowRoot.getElementById('end').value = data.elements[1];
    }

    getItemResult(){
        let begin = this.shadowRoot.querySelector("#begin").value;
        let end = this.shadowRoot.querySelector("#end").value;
        return this.tableAssociated+"."+this.name+" BETWEEN '"+begin+"' AND '"+end+"'";
    }

    about(){
        var about = {
            "Description":"Elemento para crear un filtro de fecha. Se inicia con la fecha actual y la de un mes anterior.",
            "CreatedBy":"Fabián Doñaque",
            "Company":"Fabs Robotics",
            "CreatedOn":"Sept 2019",
            "ModifiedOn":"Oct 2019",
            "Methods":[
                {
                    'Name':'getItemResult()',
                    'Description':'Devuelve el resultado de los campos date en un string con formato MYSQL',
                    'Return':'BETWEEN date1 AND date2'
                }
                ],
            "Attributes":[]
        }
        return(about);
    }
}

customElements.define('fabs-filter-date-item', FilterDateItem);

class FilterElementsItem extends HTMLElement
{
    // Class Methods
    constructor()
    {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            *{
                margin: 0;
                padding: 0;
                border: 0;
            }
            :host{
                position:relative;
                display: block;
                width: 100%;
            }
            #container{
                position:relative;
                display: block;
                width: 100%;
                margin-top: 1em;
            }
            #titleBox{
                cursor:pointer;
            }
            #items{
                display:block;
                width:100%;
                height: auto;
                max-height:300px;
                overflow: scroll;
                border-bottom:1px solid black;
            }
            .item{
                display:block;
                width:100%;
                cursor:pointer;
            }
            .item input{
                margin-right:1em;
                margin-left:1em;
            }
            #title{
                display:inline-block;
                margin-left: 0.5em;
            }
            .right{
                display:inline-block;
                margin-left:1.05em;
                width: 0;
                height: 0;
                border-top: 0.4em solid transparent;
                border-bottom: 0.4em solid transparent;
                border-left: 0.4em solid black;
            }
            .down{
                display:inline-block;
                margin-left:0.7em;
                width: 0;
                height: 0;
                border-left: 0.4em solid transparent;
                border-right: 0.4em solid transparent;
                border-top: 0.4em solid black;
            }
        </style>
        <div id="container">
            <div id="titleBox">
                <div id="triangle" class="down"></div>
                <p id="title">Filtrar por elemento:</P>
            </div>
            <label class="item" id="selectAll">
                <input type="checkbox" id="first" checked/>Todos
            </label>
            <div id="items"></div>
        </div>
        `;
    }

    connectedCallback(){
        let first = this.shadowRoot.querySelector("#first");
        first.addEventListener('change', e => this.checkChecked(e.target));
        let triangle = this.shadowRoot.getElementById('triangle');
        let titleBox = this.shadowRoot.getElementById('titleBox');
        titleBox.addEventListener('click', e => {
            if(triangle.className == "right"){
                triangle.className = "down";
                this.shadowRoot.getElementById('selectAll').style.display = 'block';
                this.shadowRoot.getElementById('items').style.display = 'block';
            }
            else{
                triangle.className = "right";
                this.shadowRoot.getElementById('selectAll').style.display = 'none';
                this.shadowRoot.getElementById('items').style.display = 'none';
            }
        });
    }

    // Custom Methods

    setConfiguration(data){
        this.entityName = data.entityName;
        this.entityId = data.entityId;
        this.shadowRoot.getElementById('title').innerHTML = data.entityName;
        data.elements.forEach(function(element) {
            var itemCheckbox = document.createElement('input');
            let itemLabel = document.createElement('label');


            itemCheckbox.type = 'checkbox';
            itemCheckbox.id = element.id;
            itemLabel.addEventListener('change', e => this.checkChecked(e.target));
            itemLabel.className="item";
            itemLabel.appendChild(itemCheckbox);
            itemLabel.innerHTML += element.value;

            this.shadowRoot.getElementById('items').appendChild(itemLabel);
        },this);
    }

    checkChecked(element){
        if(element.id == "first"){
            let inputs = this.shadowRoot.querySelectorAll("input");
            inputs.forEach(function(input){
                input.checked = false;
            },this);
            element.checked = true;
        } else {
            var isFirstChecked = true;
            let inputs = this.shadowRoot.querySelectorAll("input");
            inputs.forEach(function(input){
                if(input.checked) isFirstChecked = false;
            },this);
            this.shadowRoot.querySelector("#first").checked = isFirstChecked;
        }
    }

    getItemResult(){
        if(!this.shadowRoot.querySelector("#first").checked){
			var data = [];
            let inputs = this.shadowRoot.querySelectorAll("input");
            inputs.forEach(function(input){
                if(input.checked) data.push(input.id);
            },this);

            var final = {'id':this.entityId,'data':data};
            return final;
        } else {
			return "";
		}
    }

    about(){
        var about = {
            "Description":"Elemento para crear un filtro por elemento. Hay que usar el método setItemElements() para dotarlo de contenido.",
            "CreatedBy":"Fabián Doñaque",
            "Company":"Fabs Robotics",
            "CreatedOn":"Oct 2019",
            "ModifiedOn":"Oct 2019",
            "Methods":[
                {
                    'Name':'getItemResult()',
                    'Description':'Si Select All está desactivado, devuelve un string, con formato MYSQL, con todos los valores seleccionados',
                    'Return':'element IN (elements...)'
                },
                {
                    'Name':'setItemElements()',
                    'Description':'Introduce los elementos por los que se desea filtrar. El formato es un array json en el que cada elemento tiene "id" y "name".',
                    'Return':'null'
                }
                ],
            "Attributes":[]
        }
        return(about);
    }
}

customElements.define('fabs-filter-elements-item', FilterElementsItem);

class FilterView extends HTMLElement
{
    // Class methods
    constructor()
    {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            *{
                margin: 0;
                padding: 0;
                border: 0;
            }
            :host{
                display: block;
                position:relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            #top{
                position:relative;
                display:flex;
                align-items: center;
                justify-content: center;
                width:100%;
                height:5em;
                border-bottom: 1px solid black;
            }
            #filters{
                position:relative;
                width: 100%;
                height: calc( 100% - 10em );
                overflow:scroll;
            }

            #bottom{
                position:relative;
                display:flex;
                align-items: center;
                justify-content: center;
                width:100%;
                height:5em;
            }

        </style>
        <div id="top">Filtro</div>
        <div id="filters">
            <slot></slot>
        </div>
        <div id="bottom">
            <fabs-button id="filter">
                Filtrar
            </fabs-button>
        </div>
        `;
    }


    connectedCallback(){
        let filter = this.shadowRoot.querySelector("#filter");
        filter.addEventListener('click', e => this.callback(this.getFilters()));
    }

    // Custom Methods

    getFilters(){
        var filterItems = this.children;
        var filters = [];
        for (let item of filterItems){
            if(item.tagName == "FABS-FILTER-DATE-ITEM" || item.tagName == "FABS-FILTER-ELEMENTS-ITEM"){
                let filterResult = item.getItemResult();
                if(filterResult !== "") filters.push(filterResult);
            }
        }
        return filters;
    }

    setCallback(callback){
        this.callback = callback;
    }

    about(){
        var about = {
            "Description":"Elemento para crear una vista para filtros",
            "CreatedBy":"Fabián Doñaque",
            "Company":"Fabs Robotics",
            "CreatedOn":"Sept 2019",
            "ModifiedOn":"Sept 2019",
            "Methods":[
                {
                    "Name":"getFilters()",
                    "Description":"Devuelve un string en formato MYSQL con todos los filtros.",
                    "Return":"Depende de los filtros, mirarlos de forma individual."
                }
                ],
            "Attributes":[{
                "Name":"callback",
                "Description":"Sirve para asignar una función callback al seleccionar un item."
            }]
        }
        return(about);
    }
}

customElements.define('fabs-filter-view', FilterView);

class InputText extends HTMLElement
{
    // Métodos de clase
    constructor()
    {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            *{
                margin: 0;
                padding: 0;
                border: 0;
            }
            :host{
                --element-color: #FFFFFF;
                position:relative;
                display: block;
                width: 100%;
                height: auto;
                overflow: hide;
                color: var(--element-color);
            }
            ::placeholder {
                color: var(--element-color);
                opacity: 0.6;
            }
            #wrapper{
                position:relative;
                display:flex;
                flex-direction:row;
                width: calc( 100% - 1em );
            }
            #label{
                display:none;
            }
            input{
                flex: 1;
                height: auto;
                border-radius: 0;
                appearance: none;
                border:0;
                border-bottom:1px solid var(--element-color);
                background:none;
                outline:none;
                padding-left:1em;
                color:inherit;
                font-size:inherit;
            }

        </style>
        <div id="wrapper">
            <span id="label"></span>
            <input type="text" placeholder="Text" id="text"/>
        </div>
        `;
    }

    static get observedAttributes(){
        return ['size','placeholder','password','readonly','color','label','onEnter'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name == "size"){
            this.shadowRoot.getElementById('text').style.fontSize = newValue;
        }
        if(name == "placeholder"){
            this.shadowRoot.getElementById('text').placeholder = newValue;
        }
        if(name == "password"){
            this.shadowRoot.getElementById('text').type = "password";
        }
        if(name == "readonly"){
            this.shadowRoot.getElementById('text').readOnly = true;
        }
        if(name == "color"){
            this.shadowRoot.host.style.setProperty('--element-color',newValue);
        }
        if(name == "label"){
            var label = this.shadowRoot.getElementById('label');
            label.innerHTML = newValue+": ";
            label.style.display = 'inline';
        }
        if(name == "onEnter"){
            this.onEnter = newValue;
        }
    }

    connectedCallback(){
        var input = this.shadowRoot.getElementById('text');
        input.addEventListener('keyup',event => {
            if(event.keyCode == 27){
                input.value = "";
                input.blur();
            }
            if(event.keyCode == 13){
                input.blur();
                if(typeof(this.onEnter) == 'function') this.onEnter();
            }
        });
    }

    // Métodos propios

    get value(){
        return this.shadowRoot.getElementById('text').value;
    }

    set value(val){
        this.shadowRoot.getElementById('text').value = val;
    }

    setPlaceholder(val){
        this.shadowRoot.getElementById('text').setAttribute('placeholder',val);
    }

    setFocus(){
        this.shadowRoot.getElementById('text').focus();
    }

    about(){
        var about = {
            "Description":"Elemento para crear un campo de texto.",
            "CreatedBy":"Fabián Doñaque",
            "Company":"Fabs Robotics",
            "CreatedOn":"Oct 2019",
            "ModifiedOn":"Jan 2020",
            "Methods":[],
            "Attributes":[
                {
                    'Name':'size',
                    'Description': 'Sirve para cambiar el tamaño de la letra.'
                }, {
                    'Name':'placeholder',
                    'Description': 'Sirve para cambiar el contenido del placeholder.'
                }, {
                    'Name':'password',
                    'Description': 'Sirve para cambiar el input a tipo password.'
                }
                ]
        }
        return(about);
    }
}

customElements.define('fabs-input-text', InputText);

class ListView extends HTMLElement
{
    constructor()
    {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            *{
                margin: 0;
                padding: 0;
                border: 0;
            }
            :host{
                --element-color: black;
                --selected-color: black;
                --hover-color: black;
                --element-background: transparent;
                --selected-background: #f2a72e;
                --hover-background: #f2a72e;

                display: block;
                width: 100%;
                height: 100%;
                overflow: scroll;
            }
            ul{
                width: 100%;
                list-style-type: none;
            }
            li{
                width: 100%;
				height: 3em;
				line-height: 3em;
				padding-left: 1em;
                background-color: var(--element-background);
                color: var(--element-color);
            }
            li:hover{
                background-color: var(--hover-background);
                color: var(--hover-color);
                cursor:pointer;
            }
            .selected{
                background-color: var(--selected-background);
                color: var(--selected-color);
            }
        </style>
        <ul id="ul"></ul>
        `;
    }
    static get observedAttributes(){
        return ['callback','separator','color','hovercolor','selectedcolor','backgroundcolor','backgroundhover','backgroundselected'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(this.hasAttribute('separator')){
            var newStyle = document.createElement('STYLE');
            newStyle.innerHTML = `
                li{
                    border-bottom: 1px solid black;
                }
            `;
            this.shadowRoot.appendChild(newStyle);
        }
        if(name == "callback"){
            this.callback = newValue;
        }
        if(name == "color"){
            this.shadowRoot.host.style.setProperty('--element-color',newValue);
        }
        if(name == "hovercolor"){
            this.shadowRoot.host.style.setProperty('--hover-color',newValue);
        }
        if(name == "selectedcolor"){
            this.shadowRoot.host.style.setProperty('--selected-color',newValue);
        }
        if(name == "backgroundcolor"){
            this.shadowRoot.host.style.setProperty('--element-background',newValue);
        }
        if(name == "backgroundhover"){
            this.shadowRoot.host.style.setProperty('--hover-background',newValue);
        }
        if(name == "backgroundselected"){
            this.shadowRoot.host.style.setProperty('--selected-background',newValue);
        }
    }

    setContent(list){
        var ul = this.shadowRoot.querySelector('#ul');
        list.forEach(function(item) {
          var element = document.createElement('LI');
          element.id = item.id;
          element.innerHTML = item.name;
          element.addEventListener('click', e => this.doAction(e.target));
          ul.appendChild(element);
        },this);
    }

    doAction(element){
        var lis = this.shadowRoot.querySelectorAll("li");
        lis.forEach(function(item){
            item.classList.remove("selected");
        });
        element.classList.add("selected");
        let text = element.innerHTML;
        if(this.callback && this.callback !== ""){
            this.callback(element);
        }
    }

    setFirstSelected(){
        this.doAction(this.shadowRoot.querySelector('#ul').firstChild);
    }

    clear(){
        this.shadowRoot.querySelector('#ul').innerHTML = "";
    }

    about(){
        var about = {
            "Description":"Elemento para hacer listas",
            "CreatedBy":"Fabián Doñaque",
            "Company":"Fabs Robotics",
            "CreatedOn":"Sept 2019",
            "ModifiedOn":"Sept 2019",
            "Methods":[
                {
                "Name":"setContent",
                "Description":"Con este método se le pasa la información a la lista, los argumentos son: ([{'id': (int o string)id, 'name': (string)'text0'},{'id': (int o string)id, 'name': (string)'text1'},...]",
                "Return": "null"
                },{
                "Name":"setFirstSelected",
                "Description":"Con este método haces que el primer elemento esté elegido y lanze la función asociada al atributo callback",
                "Return": "null"
                }
            ],
            "Attributes":[{
                "Name":"callback",
                "Description":"Sirve para asignar una función callback al seleccionar un item."
            }]
        }
        return(about);
    }
}

customElements.define('fabs-list-view', ListView);

class Navbar extends HTMLElement
{
    constructor()
    {
        super();

        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            *{
                margin:0;
                padding:0;
                border:0;
            }
            :host{
                --element-color: black;
                --background-color: transparent;
                width: 100%;
                height: 100%;
                display:block;
                color: var(--element-color);
                background-color: var(--background-color);
            }
            #first{
                width: 25%;
                height: 100%;
                float:left;
                display:flex;
                align-items: center;
                justify-content:flex-start;
            }
            #second{
                width: 50%;
                height: 100%;
                float:left;
				font-size:200%;
				fond-weight: bold;
                display:flex;
                align-items: center;
                justify-content:center;
            }
            #third{
                height: 100%;
                width:25%;
                float:left;
                display:flex;
                align-items: center;
                justify-content:flex-end;
            }
        </style>
        <div id="first">
            <slot name="left"></slot>
        </div>
        <div id="second"></div>
        <div id="third">
            <slot name="right"></slot>
        </div>
        `;
    }

    static get observedAttributes(){
        return ['title','color','backgroundcolor'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name == 'title'){
            if(newValue !== "" && newValue){
                let title = this.shadowRoot.querySelector('#second');
                title.innerHTML = newValue;
            }
        }
        if(name == 'color'){
            this.shadowRoot.host.style.setProperty('--element-color',newValue);
        }
        if(name == 'backgroundcolor'){
            this.shadowRoot.host.style.setProperty('--background-color',newValue);
        }
    }

    about(){
        var about = {
            "Description":"Elemento para hacer barras de navegación",
            "CreatedBy":"Fabián Doñaque",
            "Company":"Fabs Robotics",
            "CreatedOn":"Sept 2019",
            "ModifiedOn":"Sept 2019",
            "Methods":[],
            "Attributes":[{
                "Name":"title",
                "Description":"Sirve para asignar un título a la barra de navegación."
            }]
        }
        return(about);
    }
}

customElements.define('fabs-navbar', Navbar);

class PopupView extends HTMLElement
{
    constructor()
    {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            *{
                margin: 0;
                padding: 0;
                border: 0;
            }
            :host{
				--background-color: white;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 500;
            }
			#wrapper{
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color:rgba(180, 180, 180, 0.5);
			}
            #innerBox{
                width:50%;
                height:50%;
				border-radius: 2em;
				padding: 2em;
                z-index: 501;
                opacity: 1;
                background-color: var(--background-color);
            }
        </style>
		<div id="wrapper">
			<div id="innerBox">
				<slot></slot>
			</div>
		<div>
		`;


    }

	connectedCallback(){
		let popupRemoved = new Event('popupRemoved');
		window.addEventListener("keydown", event => {
			if (event.keyCode === 27) {
				this.dispatchEvent(popupRemoved);
				this.remove();
			}
		});
		this.shadowRoot.querySelector('#wrapper').addEventListener('click', e => {
			if(e.target.id === "wrapper"){
				this.dispatchEvent(popupRemoved);
				this.remove();
			}
		});

	}

    about(){
        var about = {
            "Description":"Elemento para bloquear la pantalla con un elemento central",
            "CreatedBy":"Fabián Doñaque",
            "Company":"Fabs Robotics",
            "CreatedOn":"Sept 2019",
            "ModifiedOn":"Abr 2020",
            "Methods":[],
            "Attributes":[]
        }
        return(about);
    }
}

customElements.define('fabs-popup-view', PopupView);

class SplitView extends HTMLElement
{
    constructor()
    {
        super();

        this.orientation = "vertical";
        this.size = "50%";

        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            :host{
              display: block;
              position: relative;
              overflow: hidden;
              width: 100%;
              height: 100%;
            }
        </style>
        <slot></slot>
        `;
    }

    static get observedAttributes(){
        return ['size','separator','orientation','atend'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        switch(name){
            case 'size':
                this.size = newValue;
                break;
            case 'orientation':
                this.orientation = newValue;
                break;
        }
        this.setContent();
    }

    connectedCallback()
    {
		this.setContent();
		/*this.observer = new MutationObserver((mutations) => {
			this.setContent();
		});
		this.observer.observe(this, {
			attributes: true,
			childList: true
		});*/
    }
	disconnectedCallback(){
		if(this.observer) this.observer.disconnect();
	}

    setContent(){
        let len = this.children.length;
        if(len > 1){
			this.children[0].style.position = "relative";
			this.children[1].style.position = "relative";

            if(this.orientation == "vertical"){
				this.children[0].style.width = "100%";
				this.children[1].style.width = "100%";
				if(this.hasAttribute('atend')){
					if(this.hasAttribute('separator')){
						this.children[0].style.height = "calc( 100% - "+this.size+" - 1px)";
						this.children[0].style.borderBottom = "1px solid black";
						this.children[1].style.height = this.size;
					} else {
						this.children[0].style.height = "calc( 100% - "+this.size+" )";
						this.children[1].style.height = this.size;
					}
				} else {
					if(this.hasAttribute('separator')){
						this.children[0].style.height = this.size;
						this.children[0].style.borderBottom = "1px solid black";
						this.children[1].style.height = "calc( 100% - "+this.size+" - 1px)";
					} else {
						this.children[0].style.height = this.size;
						this.children[1].style.height = "calc( 100% - "+this.size+" )";
					}
				}
			} else {

				this.children[0].style.float = "left";
				this.children[0].style.height = "100%";
				this.children[1].style.float = "left";
				this.children[1].style.height = "100%";

				if(this.hasAttribute('atend')){
					if(this.hasAttribute('separator')){
						this.children[0].style.width = "calc( 100% - "+this.size+" - 1px)";
						this.children[0].style.borderRight = "1px solid black";
						this.children[1].style.width = this.size;
					} else {
						this.children[0].style.width = "calc( 100% - "+this.size+" )";
						this.children[1].style.width = this.size;
					}
				} else {
					if(this.hasAttribute('separator')){
						this.children[0].style.width = this.size;
						this.children[0].style.borderRight = "1px solid black";
						this.children[1].style.width = "calc( 100% - "+this.size+" - 1px)";
					} else {
						this.children[0].style.width = this.size;
						this.children[1].style.width = "calc( 100% - "+this.size+" )";
					}
				}
			}
        }

        if (len > 2){
            for(var i = 2; i< len; i++){
                this.children[i].style.display = "none";
            }
        }
    }

    about(){
        let about = {
            "Description":"Elemento SplitView, ocupa el 100% del espacio disponible, divide la pantalla en dos y recorta el contenido que se salga.",
            "CreatedBy":"Fabián Doñaque",
            "Company":"Fabs Robotics",
            "CreatedOn":"Sept 2019",
            "ModifiedOn":"Abr 2020",
            "Methods":[],
            "Attributes":[
                {
                    "Name":"size",
                    "Description":"Define el tamaño del primer element en Light DOM."
                },
                {
                    "Name":"orientation",
                    "Description":"Define si se divide la pantalla en vertical o en horizontal, por defecto está en vertical."
                },
                {
                    "Name":"separator",
                    "Description":"Define si lleva una línea negra de 1 pixel en la división."
                }
            ]
        }
        return(about);
    }
}

customElements.define('fabs-split-view', SplitView);

class TableView extends HTMLElement
{
    // Classs Methods
    constructor()
    {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style id="style">
            *{
                margin: 0;
                padding: 0;
                border: 0;
            }
            :host{
                --element-color: black;
                --element-background-color: transparent;
                --element-hover-color: black;
                --element-hover-background-color: #f2a72e;

                display: block;
                position:relative;
                width: 100%;
                height: 100%;
            }

            #container{
                display: block;
                position:absolute;
                width: 100%;
                height: 100%;
            }

                #table{
                    display: block;
                    position:relative;
                    margin: 2em 2em 0 2em;
                    width: calc( 100% - 4em );
                    height: calc( 100% - 2em );
                }

                    #head{
                        display: flex;
                        position:relative;
                        width: 100%;
                        height: 1em;
                        font-weight: bold;
                        border-bottom: 1px solid var(--element-color);
                    }

                    #body{
                        display: block;
                        position:relative;
                        width: 100%;
                        height: calc( 100% - 1em );
                        overflow: scroll;
                    }
                        .row{
                            display: flex;
                            position: relative;
                            width: 100%;
                            cursor: default;
                            color: var(--element-color);
                        }
                        .row:hover{
                            background-color: var(--element-hover-background-color);
                            color: var(--element-hover-color);
                        }
        </style>
        <fabs id="container">
            <fabs id="table">
                <fabs id="head">
                </fabs>
                <fabs id="body">
                </fabs>
            </fabs>
        </fabs>
        `;
    }

    static get observedAttributes(){
        return ['callback','headers','content','autoheight','color','background','hovercolor','hoverbackground'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name == "callback"){
            this.selectedCallback = newValue;
            this.setSelectedCallback();
        }
        if(name == "headers"){
            this.headersArray = newValue;
            this.setHeaders();
        }
        if(name == "content"){
            this.contentArray = newValue;
            this.setContent();
        }
        if(name == "autoheight"){
            this.shadowRoot.host.style.height = 'auto';
            this.shadowRoot.getElementById('container').style.height = 'auto';
            this.shadowRoot.getElementById('table').style.height = 'auto';
            this.shadowRoot.getElementById('body').style.height = 'auto';
            console.log(this.shadowRoot);
        }
		if(name == "color"){
            this.shadowRoot.host.style.setProperty('--element-color',newValue);
        }
		if(name == "background"){
            this.shadowRoot.host.style.setProperty('--element-background-color',newValue);
        }
		if(name == "hovercolor"){
            this.shadowRoot.host.style.setProperty('--element-hover-color',newValue);
        }
		if(name == "hoverbackground"){
            this.shadowRoot.host.style.setProperty('--element-hover-background-color',newValue);
        }
    }

    // Setter/Getter Attributes Mehtods

    get callback(){
        return this.selectedCallback;
    }

    set callback(value){
        this.selectedCallback = value;
        this.setSelectedCallback();
    }

    get headers(){
        return this.headersArray;
    }

    set headers(value){
        this.headersArray = value;
        this.setHeaders();
    }

    get content(){
        return this.contentArray;
    }

    set content(value){
        this.contentArray = value;
        this.setContent();
    }

    // Custom Methods
    setSelectedCallback(){
        if(this.selectedCallback){
            this.shadowRoot.getElementById('style').innerHTML += `
                .row{
                    cursor: pointer;
                }
            `;
        } else {
            this.shadowRoot.getElementById('style').innerHTML += `
                .row{
                    cursor: default;
                }
            `;
        }
    }

    setHeaders(){
        if(this.headersArray){
            var len = this.headersArray.length;
            var head = this.shadowRoot.getElementById('head');
            this.headersArray.forEach(function(col){
                var cellHeader = document.createElement('DIV');
                cellHeader.innerHTML = col;
                cellHeader.style.textAlign = "center";
                cellHeader.style.width = "calc( 100% / "+len+" )"
                head.appendChild(cellHeader);
            });
        }
    }

    appendContent(){
        var body = this.shadowRoot.getElementById('body');
        this.contentArray.forEach(function(row) {
            var len = row.data.length;
            var newRow = document.createElement('DIV');
            row.data.forEach(function(col){
                var cell = document.createElement('DIV');
                cell.innerHTML = col.value;
                if(col.id) cell.id = col.id;
                cell.style.textAlign = "left";
                cell.style.paddingLeft = "1em";
                cell.style.width = "calc( 100% / "+len+" )";
                newRow.appendChild(cell);
            },this);
            newRow.onclick = e => {this.getRow(e,this);};
            newRow.className = "row";
            newRow.id = row.id;
            body.appendChild(newRow);
        },this);
    }

    setContent(){
        var body = this.shadowRoot.getElementById('body');
        body.innerHTML = "";
        this.appendContent();
    }

    getRow(event,host){
        var row = event.target.parentElement;
        if(row.className === 'row'){
            var id = row.id;
            var values = [];
            for(var cell of row.children){
                values.push({'id':cell.id, 'value':cell.innerHTML});
            }
            var result = {'id':id,'values':values};
            if(host.selectedCallback) host.selectedCallback(result);
        }
    }

    about(){
        var about = {
            "description":"Elemento para hacer tablas. Una tabla necesita saber:\n1.- Los headers.\n2.- Los identificadores de fila.\n3.- Los datos de la fila.\n4.- La función a la que llamar cuando se clicke una fila.",
            "createdBy":"Fabián Doñaque",
            "company":"Fabs Robotics",
            "createdOn":"Sept 2019",
            "modifiedOn":"Oct 2019",
            "methods":[{
                "name":"setFullContent",
                "description":"Con este método se le pasa la información a la tabla, los argumentos son: ((bool) header, [{'id': (int o string)id, 'data': [(string)'text0',(string)'texto1',...]},{'id': (int o string)id, 'data': [(string)'text0',(string)'texto1',...]},...]",
                "return": "null"
            },{
                "name":"setHeader",
                "description":"Con este método se le pasa el header a la tabla y se elimina todo el contenido previo, se le pasa un array con los nombres",
                "return": "null"
            },{
                "name":"appendContent",
                "description":"Con este método se añade contenido a la tabla, los argumentos son: {'id': (int o string)id, 'data': [(string)'text0',(string)'texto1',...]}",
                "return": "null"
            }],
            "attributes":[
                {
                    "name":"headers",
                    "description": "En este atributo se guardan las cabeceras de la tabla en un array."
                },{
                    "name":"callback",
                    "description":"En este atributo se almacena la función de llamada para cuando se clicke una fila. Si está definida aparecerá una mano encima de las filas, y si no, una flecha."
                }
            ]
        }
        return(about);
    }
}

customElements.define('fabs-table-view', TableView);

class View extends HTMLElement
{
    constructor()
    {
        super();
        var shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            *{
                margin: 0;
                padding: 0;
                border: 0;
            }
            :host{
                display: block;
                position: relative;
                width: 100%;
                height: 100%;
                overflow:hidden;
            }
        </style>
		<slot></slot>
        `;
    }

	connectedCallback(){
		//console.log("fabs-view",this.innerHTML);
	}

    about(){
        var about = {
            "Description":"Elemento Vista, ocupa el 100% del espacio disponible y recorta el contenido que se salga.",
            "CreatedBy":"Fabián Doñaque",
            "Company":"Fabs Robotics",
            "CreatedOn":"Sept 2019",
            "ModifiedOn":"Sept 2019",
            "Methods":[],
            "Attributes":[]
        }
        return(about);
    }
}

customElements.define('fabs-view', View);
