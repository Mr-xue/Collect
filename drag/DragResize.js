/**
 * 作者:薛崇伟
 * 时间：2018年9月13日17:07:27
 * 功能：元素拖动，元素8向拖动调节
 *
 *
 * 暂未做工作： 拖动优化、 对象合并、js彻底原生化、插件参数配置化
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

		this.eleAttr = {
			// 调节方向
			direction:null,
			mouseDownX:0,
			mouseDownY:0,
			// 存储元素偏移量
			posX :0,
			posY :0,
			// 存储元素坐标
			left :0,
			top  :0,
			// 存储元素调节后的大小
			w    : null,
			h    : null
		}

		this.init();
	}

	// 初始化
	init (){
		this.appendPoint();
		this.mouseDown();
		this.mouseMove();
		this.mouseUp();
	}
	/*Bind(object, fun) { 
	    var args = Array.prototype.slice.call(arguments).slice(2); 
	    return function() { 
	        return fun.apply(object, args); 
	    } 
	}

	BindAsEventListener(object, fun) { 
	    var args = Array.prototype.slice.call(arguments).slice(2); 
	    return function(event) { 
	        return fun.apply(object, [event || window.event].concat(args)); 
	    }
	}*/

	// 追加拖动调节大小的8个point
	appendPoint (){
		Array.prototype.forEach.call(this.dom, (item,index)=>{
			// 追加缩放的点
			this.point.forEach((item2,index2)=>{
				let tpl = document.createElement('div');
				tpl.setAttribute('class','drag-point '+item2);
				item.appendChild(tpl);

				// jquery写法
				// let tpl = `<div class="drag-point ${item}"></div>`;
				// this.$el.append(tpl)
			})
		})
	}
	
	/**
	 * 鼠标按下时的操作
	 * 
	 */
	mouseDown (){
		let _self = this,$el;
		// 鼠标点击
		this.$el[0].addEventListener('mousedown',function(e){
			// 初次点击的坐标
			_self.eleAttr.mouseDownX = e.pageX;
			_self.eleAttr.mouseDownY = e.pageY;

			// 初次点击获取元素偏移
			_self.eleAttr.posX = e.pageX - $(this).offset().left;
			_self.eleAttr.posY = e.pageY - $(this).offset().top;

			// 获取容器的宽高
			_self.eleAttr.w = $(this).width();
			_self.eleAttr.h = $(this).height();
			// 是否点击调节点上
			if(e.target.classList.contains('drag-point')){
				_self.resize = true;
				// 设置拖动方向
				_self.eleAttr.direction=e.target.classList[1]
			}else{
				_self.mousedown = true;
			}
		console.log('按下：'+_self.mousedown+'---调节：'+_self.resize);
		},false)


	}
	/**
	 * 鼠标松开操作
	 * 
	 */
	mouseUp(){
		let _self = this;
		// 鼠标松开
		document.addEventListener('mouseup',function(e){
			_self.mousedown = false;
			_self.resize = false;
		})
	}

	// 鼠标移动
	mouseMove(e,...args){
		let _self = this;
		
		// 鼠标移动
		document.addEventListener('mousemove',function(e){
			if(_self.mousedown){
				_self.eleAttr.left = e.pageX - _self.eleAttr.posX;
				_self.eleAttr.top = e.pageY - _self.eleAttr.posY;
				// 设置拖动位置
				_self.$el.css({left:_self.eleAttr.left+'px', top:_self.eleAttr.top+'px'})
			}else if(_self.resize){
				_self.dragResize(e)
			}
		},false)
	}

	// 8向拖动调节
	dragResize (e){
		let startX = this.eleAttr.mouseDownX, startY = this.eleAttr.mouseDownY;
		let distanceX,distanceY;
		let width,height;
		let left,top;
		// 计算从左向右拖动最小left值
		let leftStop = startX + (this.eleAttr.w-30);
		// 计算从上往下拖动的最小top值
		let topStop = startY + (this.eleAttr.h-30);

		switch (this.eleAttr.direction){
			// 左上
			case 'top-left':
				distanceX = -(e.pageX - startX);
				distanceY = -(e.pageY - startY);
				width     = Math.max(30,this.eleAttr.w + distanceX);
				height    = Math.max(30,this.eleAttr.h + distanceY);
				top       = height > 30 ? e.pageY : topStop;
				left      = width > 30 ? e.pageX : leftStop;

				this.$el.css({width:width,height:height,top:top,left:left});
				break;
			// 上中
			case 'top-center':
				distanceY = -(e.pageY - startY);
				height    = Math.max(30,this.eleAttr.h + distanceY);
				top       = height > 30 ? e.pageY : topStop;

				this.$el.css({width:width,height:height,top:top});
				break;
			// 上右
			case 'top-right':
				distanceX = e.pageX - startX;
				distanceY = -(e.pageY - startY);
				width     = Math.max(30,this.eleAttr.w + distanceX);
				height    = Math.max(30,this.eleAttr.h + distanceY);
				top 	  = height > 30 ? e.pageY : topStop;

				this.$el.css({width:width,height:height,top:top});
				break;
			// 左中
			case 'left-center':
				distanceX = -(e.pageX - startX);
				width     = Math.max(30,this.eleAttr.w + distanceX);
				left      = width > 30 ? e.pageX :  leftStop;
				
				this.$el.css({width:width,left:left});
				break;
			// 右中
			case 'right-center':
				distanceX = e.pageX - startX;
				width     = Math.max(30,this.eleAttr.w + distanceX);
				
				this.$el.css({width:width});
				break;
			// 下左
			case 'bottom-left':
				distanceX = -(e.pageX - startX);
				distanceY = e.pageY - startY;
				width     = Math.max(30,this.eleAttr.w + distanceX);
				height    = Math.max(30,this.eleAttr.h + distanceY);
				left 	  = width > 30 ? e.pageX : leftStop;

				this.$el.css({width:width,height:height,left:left});
				break;
			// 下中
			case 'bottom-center':
				distanceY = e.pageY - startY;
				height    = Math.max(30,this.eleAttr.h + distanceY);
				this.$el.css({height:height});
				break;
			// 下右
			case 'bottom-right':
				distanceX = e.pageX - startX;
				distanceY = e.pageY - startY;
				width     = Math.max(30,this.eleAttr.w + distanceX);
				height    = Math.max(30,this.eleAttr.h + distanceY);
				
				this.$el.css({width:width,height:height});
				break;
		}
	}
}
