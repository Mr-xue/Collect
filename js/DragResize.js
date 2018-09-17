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
		this.eleDrag();
		this.eleResize();
	}

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

	// 元素拖动
	eleDrag (){
		let _self = this,$el;
		// 元素内部偏移量
		let posX, posY;

		// 鼠标点击
		this.$el[0].addEventListener('mousedown',function(e){
			posX = e.pageX - $(this).offset().left;
			posY = e.pageY - $(this).offset().top;
			$el = $(this);
			console.log(666);
			_self.mousedown = true;

			// 鼠标移动
			_self.mouseMove(posX,posY,$el);
		},false)

		// 鼠标松开
		$(document).on('mouseup',function(e){
			_self.mousedown = false;
		})
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
				_self.mouseMove(posX,posY,$el)
			})
		},false)
	}

	// 鼠标移动
	mouseMove(posX,posY,$el){
		let _self = this;
		// 鼠标移动
		$(document).on('mousemove',function(e){
			if(_self.mousedown){
				this.x = e.pageX - posX;
				this.y = e.pageY - posY;
				$el.css({left:this.x+'px', top:this.y+'px'})
			}else if(_self.resize){
				dragResize(posX,posY,$el,selector,event)
			}
		})
	}

	// 8向拖动调节
	dragResize (posX,posY,$el,selector,event){
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
