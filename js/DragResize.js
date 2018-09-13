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
		this.down = false;
		console.log(this.dom);
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
		
		$(document).on('mousedown',this.el,function(e){
			console.log(e);
			this.down = true;
		})
		$(document).on('mouseup',this.el,function(e){
			this.down = false;
		})
	}
}