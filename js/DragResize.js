/**
 * 作者:薛崇伟
 * 时间：2018年9月13日17:07:27
 * 功能：元素拖动，元素大小调节
 * 
 */
class DragResize {
	constructor (el){
		this.el = el;
		this.dom = document.querySelector(el);
		this.$el = $(el);
		this.point = ['top-left','top-center','top-right','left-center','right-center','bottom-left','bottom-center','bottom-right'];

		this.mousedown = false;
		this.x = 0;
		this.y = 0;

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
			let tpl = `<div class="drag-point ${item}"></div>`
			this.$el.append(tpl)
		})
	}

	// 元素拖动
	eleDrag (){
		let _self = this;
		console.log(this.mousedown);
		$(document).on('mousedown',this.el,function(e){
			console.log(e);
			_self.mousedown = true;
		})
		$(document).on('mouseup',function(e){
			// _self.mousedown = false;
		})

		$(document).on('mousemove',function(e){
			let pagex,pagey;
			console.log(_self.mousedown);
			if(_self.mousedown){
				pagex = e.pageX;
				pagey = e.pageY;
				console.log(pagex+'--'+pagey);
			}
			
		})
	}
}