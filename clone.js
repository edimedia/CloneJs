/**
* author : Edimedia Mutoke (eddycondor07@gmail.com)
* Inspired : by "Pro Techniques" written by Jhon Resig
*
* And God saw that was good, And God blessed them : "Be fruitful and multiply"
*
*/

/**
 * ########## Clone view Configuration ###########
 */
var _classes = {
	table: "w3-table-all w3-card-4",
	td: "cloneTd",
	tr: "cloneTr",
	container: "w3-container",
	title: "tableTitle",
	footer: "tableFooter",
	red: "w3-btn w3-red w3-round-large",
	blue : "w3-btn w3-blue w3-round-large",
	green : "w3-btn w3-green w3-round-large",
	yellow : "w3-yellow w3-btn w3-round-large",
	cell : "cell",
	right: "w3-right",
	clear: "w3-clear",
	modal: "w3-modal",
	modal_content: "w3-modal-content",
	card4: "w3-card-4",
	label : "cloneLabel",
	responsive : "et-responsive"
};
// Animations
var _animation = {
	zoom:"et-animate-zoom",
	top:'et-animate-top',
	bottom : 'et-animate-bottom',
	left : 'et-animate-left',
	right: 'et-animate-right',
	fade: 'et-animate-opacity'
};
// name
var _name = {
	next : "Suivant",
	previous : "Précédent"
}
/**
 * ######### End of Clone view configuration #########
 */

/**
 * ########## Utils Functions ##############
 */

function _id(str)
{
	return document.getElementById(str);
}

function colorToHex(color){
	var hexadecimal = parseInt(color, 10).toString(16);
	return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

function RGBtoHex(red, green, blue){
	return "#" + colorToHex(red) + colorToHex(green) + colorToHex(blue);
}

function RGBAtoHex(red, green, blue, alpha){
	alpha = Math.round(alpha * 255).toString(16).substr(0,2);
	return "#" + colorToHex(red) + colorToHex(green) + colorToHex(blue) + alpha;
}

function HexToRGB(hex){
	var rgb = {
		red : parseInt(hex[1] + hex[2], 16),
		green : parseInt(hex[3] + hex[4], 16),
		blue : parseInt(hex[5] + hex[6], 16)
	};
	return rgb;
}

function generateRandom(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function generateId(){
	let rid = '';
	let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for(var i = 0; i < 8; i++){
		rid += letters[generateRandom(0, 52)];
	}
	return rid;
}

function pageX(elem){
	return elem.offsetParent ? elem.offsetLeft + pageX(elem.offsetParent) : elem.offsetLeft;
}

function pageY(elem){
	return elem.offsetParent ? elem.offsetTop + pageY(elem.offsetParent) : elem.offsetTop;
}

function parentX(elem){
	return elem.parentNode == elem.offsetParent ? elem.offsetLeft : pageX(elem) - pageX(elem.parentNode);
}

function parentY(elem){
	return elem.parentNode == elem.offsetParent ? elem.offsetTop : pageY(elem) - pageY(elem.parentNode);
}

function context2d(obj)
{
	return obj.getContext('2d');
}

function stopBubble(ev){
	if (ev && ev.stopPropagation){
		ev.stopPropagation()
	}
	else{
		window.event.cancelBubble = true;
	}
}

function stopDefault(ev){
	if (ev && ev.preventDefault){
		ev.preventDefault();
	}
	else{
		window.event.returnValue = false;
	}
}

function getStyle(elem, name){
	if(elem.style[name])
		return elem.style[name];

	else if(elem.currentStyle)
		return elem.currentStyle[name];

	else if(document.defaultView && document.defaultView.getComputedStyle){
		name = name.replace(/([A-Z])/g, "-$1");
		name = name.toLowerCase();
		var s = document.defaultView.getComputedStyle(elem, "");
		return s && s.getPropertyValue(name);

	}
	else
		return null;
}
/**
 * ############# End of Utils Functions ######
 */


/**
 * ########## Clone and properties #################
 */
var clone = {
	select:function(str){
		return new _clone(str);
		},
	author:"Edimedia Mutoke (eddycondor07@gmail.com)",
	version:"1.0",
	cell:function(str){
		return new _Cell(str);
	},
	all:function(str){
		let _all = document.querySelectorAll(str);
		return _all;
	},
	class:_classes,
	name : _name,
	animation : _animation
}
// ---------- _Cell properties -----------
function _Cell(str){
	this.id = str;
	this.input_id = str + '_input';
	this.width = clone.select(this.id).getWidth();
	this.height = clone.select(this.id).getHeight();
}

// colspan function
_Cell.prototype.colspan = function(x){
	var width = this.width * x;
	if (x > 1){
		clone.select(this.id).setAttr('colspan', x);
		clone.select(this.input_id).setSize(width, this.height);
		clone.select(this.id).setSize(width-5, this.height);
		do{
			
			clone.select(this.id).parent().removeChild(clone.select(this.id).obj.nextSibling);
			x = x - 1;
		}while(x > 1);
	}
}
// cell value
_Cell.prototype.value = function(){
	return clone.select(this.input_id).getValue();
}

// cell set value
_Cell.prototype.setValue = function(x){
	clone.select(this.input_id).setValue(x);
}

// cell background
_Cell.prototype.setBackground = function(color){
	clone.select(this.id).setCss({"backgroundColor" : color});
	clone.select(this.input_id).setCss({"backgroundColor" : color});
}

// cell text color
_Cell.prototype.setColor = function(color){
	clone.select(this.id).setCss({"color" : color});
	clone.select(this.input_id).setCss({"color" : color});
}

// clone main function 
function _clone(str){
	if(str.constructor == String){
		this.obj = _id(str) || document.getElementsByTagName(str)[0];
		this.id = str;
	}
	//if(str.constructor == Object)
	else{
		this.obj = str;
		
	}
	
}

// ---------  clone properties ------------
// create HTMl Element function
_clone.prototype.create = function(name, id, cls){
	var _create_obj = document.createElement(name);
	_create_obj.className = cls;
	_create_obj.id = id;
	this.obj.appendChild(_create_obj);
	this.obj = _create_obj;
	return this;
}

// Add HTML Element
_clone.prototype.addChild = function(child){
	this.obj.appendChild(child);
	return this
}

// Get All child node list
_clone.prototype.all = function(queryname){
	return this.obj.querySelectorAll(queryname);
}

// Get the clone object
_clone.prototype.self = function(){
	return this;
}

// get the parent Element
_clone.prototype.parent = function(num){
	num = num || 1;
	elm = this.obj;
	for (var i = 0; i < num; i++)
		elm = elm.parentNode;
	return elm;
}

// remove HTML element
_clone.prototype.remove = function(){
	document.removeChild(this.obj);
}

_clone.prototype.removeChild = function(child){
	this.obj.removeChild(this.obj);
}

// Set Attribute Function
_clone.prototype.setAttr = function(attr, val){
	this.obj.setAttribute(attr, val);
	return this;
}

// Html Content set function
_clone.prototype.setHtmlContent = function(str){
	this.obj.innerHTML = str;
	return this;
} 

// set position function
_clone.prototype.setPosition = function(x, y, type){
	this.obj.style.position = type || 'absolute';
	this.obj.style.left = x+'px';
	this.obj.style.top = y+'px';
	return this;
}
// setX position function
_clone.prototype.setX = function(x){
	this.obj.style.left = x + 'px';
}

// setY position function
_clone.prototype.setY = function(y){
	this.obj.style.top = y + 'px';
}

// addX function
_clone.prototype.addX = function(x){
	this.setX(this.posX() + x);
}

// addY function
_clone.prototype.addY = function(y){
	this.setY(this.posY() + y);
}

// onclick Function
_clone.prototype.onclick = function(fnc){
	this.obj.addEventListener('click', fnc, false);
	return this;
}

// emit click event
_clone.prototype.click = function(){
	this.obj.click();
}

// onchange funcion
_clone.prototype.onchange = function(fnc){
	this.obj.addEventListener('change', fnc, false);
	return this;
}

// onscroll function
_clone.prototype.onscroll = function(fnc){
	this.obj.addEventListener('scroll', fnc, false);
	return this;
}
// onload function 
_clone.prototype.onload = function(fnc){
	this.obj.addEventListener('load', fnc, false);
	return this;
}

// onblur function
_clone.prototype.onblur = function(fnc){
	this.obj.addEventListener('blur', fnc, false);
	return this;
}
// on focus
_clone.prototype.onfocus = function(fnc){
	this.obj.addEventListener('focus', fnc, false);
	return this;
}

// onmouseover
_clone.prototype.onmouseover = function(fnc){
	this.obj.addEventListener('mouseover', fnc, false);
	return this;
}
// onmouseout
_clone.prototype.onmouseout = function(fnc){
	this.obj.addEventListener('mouseout', fnc, false);
	return this;
}
// onKeypress
_clone.prototype.onKeypress = function(fnc){
	this.obj.addEventListener('keypress', fnc, false);
	return this;
}
// onKeydown
_clone.prototype.onKeydown = function(fnc){
	this.obj.addEventListener('keydown', fnc, false);
	return this;
}
// onShortcut
_clone.prototype.onShortcut = function(fnc, shct){
	var self = this;
	var shct = shct;
	this.keypressed = {};
	var fnc = fnc;

	this.obj.addEventListener('keydown', (ev) => {
		self.keypressed[ev.key] = true;
		
		if (self.keypressed[shct[0]] && ev.key == shct[1]){
			fnc(ev);
			delete self.keypressed[shct[0]];
			stopDefault(ev);
		}
		
	}, false);
	
	this.obj.addEventListener('keyup', (ev) => {
		delete self.keypressed[ev.key];
		stopDefault(ev);
	}, false);
	
}
// size function
_clone.prototype.setSize = function(wh, ht){
	this.obj.style.width = wh+'px';
	this.obj.style.height = ht+'px';
	return this;
}

// focus element
_clone.prototype.focus = function(){
	this.obj.focus();
}

// scroll into view element
_clone.prototype.scrollInto = function(){
	this.obj.scrollIntoView();
}

// set Css function
_clone.prototype.setCss = function(objs){
	for(var p in objs){
		this.obj.style[p] = objs[p];
	}
	return this;
}
// set value function
_clone.prototype.setValue = function(value){
	this.obj.value = value;
	return this;
}

// hide element function
_clone.prototype.hide = function(){
	this.obj.style.display = 'none';
	return this;
}

// show element function
_clone.prototype.show = function(str){
	this.obj.style.display = str || 'block';
	return this;
}

// get element function
_clone.prototype.getElement = function(){
	return this.obj;
}

// get attribute function
_clone.prototype.getAttr = function(str){
	return this.obj.getAttribute(str);
}

// get contents function
_clone.prototype.getContent = function(){
	return this.obj.innerHTML;
}
// get value function
_clone.prototype.getValue = function(){
	return this.obj.value;
}

// getStyle function
_clone.prototype.getStyle = function(name, elem){
	var elem = elem || this.obj;
	return getStyle(elem, name);
}

// posX function
_clone.prototype.posX = function(elem){
	var elem = elem || this.obj;
	return parseInt(getStyle(elem, 'left'));
}

// posY function
_clone.prototype.posY = function(elem){
	var elem = elem || this.obj;
	return parseInt(getStyle(elem, 'top'));
}

// pageX function
_clone.prototype.pageX = function(elem){
	var elem = elem || this.obj;
	return pageX(elem);
}

// pageY function
_clone.prototype.pageY = function(elem){
	var elem = elem || this.obj;
	
	return pageY(elem);
}
// parentX function
_clone.prototype.parentX = function(elem){
	var elem = elem || this.obj;
	
	return parentX(elem);
}

// parentY function
_clone.prototype.parentY = function(elem){
	var elem = elem || this.obj;
	
	return parentY(elem);
}

// getHeigt function
_clone.prototype.getHeight = function(elem){
	var elem = elem || this.obj;
	return parseInt(getStyle(elem, 'height'));
}

// getWidth function
_clone.prototype.getWidth = function(elem){
	var elem = elem || this.obj;
	return parseInt(getStyle(elem, 'width'));
}

// hasclass function
_clone.prototype.hasClass = function(cls){
	if(this.obj.className.indexOf(cls) == -1){
		return false;
	}
	return true;
}

// addClass function
_clone.prototype.addClass = function(cls){
	if(!this.hasClass(cls)){
		cls = " " + cls;
		this.obj.className += cls;
	}
	return this;
}

// removeClass function
_clone.prototype.removeClass = function(cls){
	cls = " " + cls;
	this.obj.className = this.obj.className.replace(cls, '');
	return this;
}

// get input selection 
_clone.prototype.getInputSelection = function(elem){
	this.obj = elem || this.obj;
	s = this.obj.selectionStart;
	e = this.obj.selectionEnd;
	return this.getValue().substring(s, e);
}

// http redirect
_clone.prototype.redirect = function(){
    let url = this.obj.getAttribute("url");
    window.location = url;
}

// Url parametrize
clone.parametrize = function(params){
	let strparams = "";
	for(var par in params){
		if(strparams.length > 0){
			strparams += "&";
		} 
		strparams += par + "=" + params[par];
	}
	return strparams;
}

/**
 * ########### Clone and Node properties ###########
 */

NodeList.prototype.map = function(fnc){
	for(var i = 0; i < this.length; i++){
		fnc(this[i], i);
	}
}

NodeList.prototype.onShortcut = function(fnc, shct){
	for(var i = 0; i < this.length; i++){
		this[i].onShortcut(fnc, shct);
	}
}

Node.prototype.hide = function(){
	this.style.display = 'none';
	return this;
}

Node.prototype.show = function(str){
	this.style.display = str || 'block';
}

Node.prototype.remove = function(){
	document.removeChild(this);
}

Node.prototype.setCss = function(obj){
	for(var p in obj){
		this.style[p] = obj[p];
	}
	return this;
}

Node.prototype.onShortcut = function(fnc, shct){
	var self = this;
	var shct = shct;
	this.keypressed = {};
	var fnc = fnc;

	this.addEventListener('keydown', (ev) => {
		self.keypressed[ev.key] = true;
		
		if (self.keypressed[shct[0]] && ev.key == shct[1]){
			fnc(ev);
			delete self.keypressed[shct[0]];
			stopDefault(ev);
		}
		
	}, false);
	
	this.addEventListener('keyup', (ev) => {
		delete self.keypressed[ev.key];
		stopDefault(ev);
	}, false);
	
}

Node.prototype.select = function(){
	return clone.select(this).self();
}

/**
 * ############# Clone Ajax Function ###############
 */
clone.ajax = function(params){
	// params values
	options = {
		type: params.type || 'POST',
		url: params.url || '',
		timeout: params.timeout || 4000,
		onComplete: params.onComplete || function(){},
		onError: params.onError || function(){},
		onSuccess: params.onSuccess || function(){},
		data: params.data || ''
	};
	
	// request object
	var xml = new XMLHttpRequest();
	
	// open a request
	xml.open(options.type, options.url, true);
	var timeout = options.timeout;
	var requestDone = false;
	
	setTimeout(function(){
		requestDone = true;
	}, timeout);
	
	xml.onreadystatechange = function(){
		if(xml.readyState == 4 && !requestDone){
			if(httpSuccess(xml)){
				options.onSuccess(httpData(xml, options.type));
			} else {
				options.onError();
			}
			options.onComplete();
			xml = null;
		}
	};
	// Etablish the connection to the server
	if(options.type == "POST"){
		xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xml.send(clone.parametrize(options.data));
	}else{
		xml.send();
	}
	
	// determine the success of the HTTP response
	function httpSuccess(r){
		try{
			return !r.status && location.protocol == "file:" || ( r.status >= 200 && r.status < 300 ) || r.status == 304 || navigator.userAgent.indexOf("safari") >= 0 && typeof r.status == "undefined";
		} catch(e){}
		return false;
	}
	
	// Extract the correct data from the http response
	function httpData(r, type){
		var ct = r.getResponseHeader("content-type");
		var data = !type && ct && ct.indexOf("xml");
		data = type == "xml" || data ? r.responseXML : r.responseText;
		if(type == "script"){
			eval.call(window, data);
		}
		return data;
	}
}
/**
 * Clone Date Utils
 */
 clone.dayName = function(){
    let dt = new Date().toUTCString().split(',')[0];
    let days = {
        Mon : "Lundi",
        Tue : "Mardi",
        Wed : "Mercredi",
        Thu : "Jeudi",
        Fri : "Vendredi",
        Sat : "Samedi",
        Sun : "Dimanche"
    };
    return days[dt];
}
clone.monthName = function(idx = 1){
	idx = idx - 1;
    let months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai',
        'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
    if(idx >= 0 && idx < 12){
        return months[idx];
    }
    return months[0];
};
clone.getNowFormat = function(style, separator='/'){
    let date = new Date().toLocaleDateString().split('/');
    let day = date[1];
	let month = date[0];
	let year = date[2];
    let styles = ['literal', 'jjmmyyyy'];
    let ret = [];
    if(styles.includes(style)){
        if(style == 'literal'){
            ret = [clone.dayName(), 'le', day, clone.monthName(month), year];
            return ret.join(" ");
        }else{
            ret = [day, month, year];
            return ret.join(separator);
        }
    }
};

/**
 *  ######## End of the clone properties ############
 *  Coded by Edimedia Mutoke (eddycondor07@gmail.com)
 * 	Inspired the "Pro Techniques" By Jhon Resig
 */