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
		this.confirm();
		this.eleDrag();
		this.eleResize();
	}

	// 追加调节用于调节大小的8个点
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

	// 确认是拖动还是调节大小
	confirm (){

	}

	// 元素拖动
	eleDrag (){
		let _self = this, $el;
		
		// 元素内部偏移量
		let posX, posY;

		// 鼠标点击
		$(this.selector)[0].addEventListener('mousedown',function(e){
			posX = e.pageX - $(this).offset().left;
			posY = e.pageY - $(this).offset().top;
			$el = $(this);
			if(!$el.hasClass('drag-point')){
				_self.mousedown = true;
			}
		})

		// 鼠标松开
		$(document).on('mouseup',function(e){
			_self.mousedown = false;
		})

		// 鼠标移动
		$(document).on('mousemove',function(e){
			if(_self.mousedown){
				this.x = e.pageX - posX;
				this.y = e.pageY - posY;
				$el.css({left:this.x+'px', top:this.y+'px'})
			}
		})
	}

	// 拖拽调节大小
	eleResize (){
		$(".drag-point").each(function(index,item){
			$(this)[0].addEventListener('mousedown',function(e){
				e.stopPropagation();
			})
		})
	}
}