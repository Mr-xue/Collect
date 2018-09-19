/**
 * 作者:薛崇伟
 * 时间：2018年9月13日17:07:27
 * 功能：元素拖动，元素大小调节
 * 
 */
class DragResize {
	constructor (selector){
		this.selector = selector;
		this.dom = document.querySelectorAll(selector);
		this.$el = $(selector);
		
		this.point = ['top-left','top-center','top-right','left-center','right-center','bottom-left','bottom-center','bottom-right'];

		//鼠标是否按下
		this.mousedown = false;
		// 是否是调节大小
		this.resize = false;

		// 存储触发事件的dom
		this.handlerEle;

		// 存储元素坐标
		this.x = 0;
		this.y = 0;

		// 存储元素调节后的大小
		this.w = null;
		this.y = null;

		this.init();
	}

	// 初始化
	init (){
		this.appendPoint();
		this.mouseDown();
		this.mouseMove();
		// this.eleResize();
	}
	Bind(object, fun) { 
	    var args = Array.prototype.slice.call(arguments).slice(2); 
	    return function() { 
	        return fun.apply(object, args); 
	    } 
	}; 

	BindAsEventListener(object, fun) { 
	    var args = Array.prototype.slice.call(arguments).slice(2); 
	    return function(event) { 
	        return fun.apply(object, [event || window.event].concat(args)); 
	    }
	};

	// 追加拖动调节大小的8个point
	appendPoint (){
		Array.prototype.forEach.call(this.dom, (item,index)=>{
			// 追加缩放的点
			this.point.forEach((item2,index2)=>{
				let tpl = document.createElement('div');
				tpl.setAttribute('class','drag-point '+item2)
				item.appendChild(tpl)

				// jquery写法
				// let tpl = `<div class="drag-point ${item}"></div>`;
				// this.$el.append(tpl)
			})
		})
	}
	documentMouseUp(){
		// 鼠标松开
		$(document).addEventListener('mouseup',function(e){
			_self.mousedown = false;
			_self.resize = false;
		})
	}
	// 元素拖动
	mouseDown (){
		let _self = this,$el;
		// 鼠标点击
		// this.$el[0].addEventListener('mousedown',_self.BindAsEventListener(this,_self.eleDragFun,this.$el[0]))
		this.$el[0].addEventListener('mousedown',function(e){
			console.log(e.target.id);
			// 是否点击调节点上
			if(e.target.classList.contains('drag-point')){

			}else{
				_self.handlerEle = this;
				console.log(_self.handlerEle);
				_self.eleDragFun(e,_self.handlerEle)
			}
		},false)
	}

	eleDragFun (e,...args){
		console.log(e);
		let _self = this;
		let $el = $(args[0]);//触发事件的元素
		// 元素内部偏移量
		let posX, posY;
		posX = e.pageX - $el.offset().left;
		posY = e.pageY - $el.offset().top;
		this.mousedown = true;
		// 鼠标移动
		/*let dragMove = this.BindAsEventListener(this,this.mouseMove,posX,posY,$el);
		console.log(dragMove);
		document.addEventListener('mousemove',dragMove,false);

		document.addEventListener('mouseup',function(){
			console.log('鼠标抬起');
			document.removeEventListener('mousemove',dragMove)
		},false);*/
	}
	// 拖拽调节大小
	eleResize (){
		let _self = this,$el;
		let posX, posY;
		this.point.forEach(function(item,index){
			$('.'+item)[0].addEventListener('mousedown',function(e){
				posX = e.pageX - $(this).offset().left;
				posY = e.pageY - $(this).offset().top;
				$el = $(this);	
				console.log(777);
				e.stopPropagation();
				_self.resize = true;
				// _self.mouseMove(posX,posY,$el)
			})
		},false)

		// 鼠标松开
		$(document).on('mouseup',function(e){
			_self.resize = false;
		})
	}

	// 鼠标移动
	// mouseMove(posX,posY,$el,selector){
	mouseMove(e,...args){
		let _self = this;
		let posX = args[0], posY = args[1], $el = args[2];
		// 鼠标移动
		document.addEventListener('mousemove',function(e){
			if(_self.mousedown){
				_self.x = e.pageX - posX;
				_self.y = e.pageY - posY;

				$(_self.handlerEle).css({left:_self.x+'px', top:_self.y+'px'})
			}else if(_self.resize){
				_self.dragResize(posX,posY,$el,selector,e)
			}
		},false)
		
	}

	// 8向拖动调节
	dragResize (posX,posY,$el,selector,e){
		switch (selector){
			// 左上
			case 'top-left':;
				break;
			// 上中
			case 'top-center':;
				break;
			// 上右
			case 'top-right':;
				break;
			// 左中
			case 'left-center':;
				break;
			// 右中
			case 'right-center':;
				break;
			// 下左
			case 'bottom-left':;
				break;
			// 下中
			case 'bottom-center':;
				break;
			// 下右
			case 'bottom-right':;
				break;
		}
	}
}
