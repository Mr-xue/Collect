/**
 * 作者:薛崇伟
 * 时间：2018年9月13日17:07:27
 * 功能：元素拖动，元素大小调节
 * 
 */
class DragResize {
	constructor (selector){
		console.log(selector);
		this.selector = selector;
		this.dom = document.querySelector(selector);
		console.log(this.dom.appendChild);
		
		this.$el = $(selector);
		this.point = ['top-left','top-center','top-right','left-center','right-center','bottom-left','bottom-center','bottom-right'];

		//鼠标是否按下
		this.mousedown = false;

		// 存储元素相对于浏览器的坐标
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
		this.eleDrag()
	}

	// 追加调节用于调节大小的8个点
	appendPoint (){
		// 追加缩放的点
		this.point.forEach((item,index)=>{
			let tpl = document.createElement('div');
			tpl.setAttribute('class','drag-point '+item)
			this.dom.appendChild(tpl)

			// jquery写法
			// let tpl = `<div class="drag-point ${item}"></div>`;
			// this.$el.append(tpl)
		})
	}

	// 元素拖动
	eleDrag (){
		let _self = this;
		// 元素偏移量
		let posx, posy;

		console.log(this.mousedown);
		$(document).on('mousedown',this.el,function(e){
			posx = $(this).offset().left;
			posy = $(this).offset().top;
			console.log(posx+'--'+posy);
			_self.mousedown = true;
		})

		$(document).on('mouseup',function(e){
			_self.mousedown = false;
		})

		$(document).on('mousemove',function(e){
			let pagex,pagey;
			
			if(_self.mousedown){
				pagex = e.pageX;
				pagey = e.pageY;
				console.log(pagex+'--'+pagey);
			}
			
		})
	}
}