/**
 * @author guoyq
 * imgMap
 */
;(function(global, $, factory){
	return factory(global, $);
}(typeof window !== "undefined" ? window : this, jQuery, function(global, $){
	'use strict'
	
	var imgMap = global.imgMap ? global.imgMap : {};
/*	var imgMap = function(global, $){
		return new imgMap.init(global, $);
	};*/
	var areas = {};
	// TODO 添加可配置参数
	var opts = {
			datas: [
				
			]
	}
	/**
	 * 配置实例
	 * {
		datas: [
			{
			title: '白云',
			data: [
				{
					name: '测试1',
					value: 'value1'
				},
				{
					name: '测试2',
					value: 'value2'
				}
			]
		}
		]
	}
	 * 
	 */
	
	imgMap.init = function(id, option){
		// 提示div
		var tipDiv = document.createElement('div');
		 //默认样式
		tipDiv.style='width:80px; height:80px; background: #333; filter:alpha(opacity=50);opacity:0.8; -moz-opacity:0.50; border:1px solid rgb(103, 100, 92); border-radius:8px; z-index:200; position:absolute;';

		// 选择area
		if(id) areas = $('#' + id).find('area');
		else areas = $('map area');
		// 配置数据
		if(option){
			$.extend(true, opts, option);
		}
		
		$.each(areas, function(index, obj){
			// 鼠标移入移出事件
			$(obj).hover(function(ev){
				var className = $(this).attr("class");
		        $(".map ."+className).css("display","block");
			},function(){
				$(".map .map-items").css("display","none");
				tipDiv.innerHTML = '';
				document.body.removeChild(tipDiv);
			});
			
			// 设置鼠标移动事件
			$(obj).on('mousemove', function (ev) {
				var oEvent = ev || event;
				var pos = getXY(oEvent);
				tipDiv.style.left = (pos.x + 10) + "px";
				tipDiv.style.top = (pos.y + 10) + "px";
				setTipDivData(this, tipDiv);
				document.body.append(tipDiv);
			});
		});
			
		return this;
	}
	// 通过事件对象，获取鼠标位置
	function getXY(eve) {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        return {x : scrollLeft + eve.clientX,y : scrollTop + eve.clientY };
    }
	// 设置提示数据
	function setTipDivData(area, tipDiv){
		var name = area.getAttribute('area-name');
		var datas = opts.datas;
		// 初始化 tipDiv 的高度和宽度
		tipDiv.style.width = '80px';
		tipDiv.style.height = '80px';
		if(datas.length > 0){
			for(var i in datas){
				var html = '<span style="color:#fff">' + name + '</span>';
				tipDiv.innerHTML = html;
				if(name == datas[i].title){
					var data = datas[i].data;
					if(data.length > 0){
						// 设置自动宽高
						tipDiv.style.width = 'auto';
						tipDiv.style.height = 'auto';
						tipDiv.style.padding = '5px';
						// 添加数据
						for(var j in data){
							var item = data[j];
							html += '</br><span style="font-size:10px;color:#fff">' + (item.name ? item.name : '') + ': ' + (item.value ? item.value : '') + '</span>';
						}
					}
					tipDiv.innerHTML = html;
					return;
				}
			}
		}
	}
	
	!!global ? global.imgMap = imgMap : window.imgMap = imgMap;
	
	return imgMap;
}))