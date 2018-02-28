var oltimer=function(map,pContainerID,pOptions,pLyr)
{
	this.olmap = map;
	// 构建图层  
    var _lyr;
	if(pLyr == undefined) _lyr = new ol.layer.Vector(); 
	else _lyr = pLyr;
	this.layer = _lyr;
	this.olmap.oltimer = this;
    //添加图层  
    this.olmap.addLayer(_lyr);
	this.container = $("#"+pContainerID);
	
	this._resizeWindow=function(){
		var _w = this.container.width()-this.datas.length;
		var _w1 = _w/(this.datas.length-1);
		_w1 = _w1-_w1%1
		var _subSpanW2 = _w1/2;_subSpanW1 = _w1;
		for(var i = 0;i < this.datas.length;i++)
		{
			var _marginLeft = 0;
			if(i == this.datas.length-1)
				_marginLeft=_w1 - 10 + "px";
			else if(i > 0)
				_marginLeft=_w1 + "px";
			else if(i == 0)
				_marginLeft="5px";
			var _spliter = this.container.find("[tag$='oltimer_spliter']").eq(i);
			var _texter = this.container.find("[tag$='oltimer_text']").eq(i);
			_spliter.css("margin-left",_marginLeft);
			if(i == this.datas.length-1)
			{
				_texter.width(_subSpanW2+"px");
			}
			else if(i > 0)
			{
				_texter.width(_subSpanW1+"px");
			}
			else if(i == 0)
			{
				_texter.width(_subSpanW2+"px");
			}
		}
	}
	this._resize=function()
	{
		var _o = this;
		$(window).resize(function() { 
			_o._resizeWindow();
		});
	}
	this.options = pOptions;
	this.txtColor=["black","red","#066BAF"];
	this._transform_geometry=function(element) {
		if(element.isProjectionTransformed == true) return;
		element.isProjectionTransformed = true;
		var current_projection = new ol.proj.Projection({code: "EPSG:4326"});
		var new_projection = this.olmap.getView().getProjection();	 
		element.getGeometry().transform(current_projection, new_projection);  
	}
	this._setDefaultStyle=function()
	{
		this.options = this.options == undefined?{}:this.options;
		this.options.lineWidth = this.options.lineWidth == undefined?"2px":this.options.lineWidth;
		this.options.lineColor = this.options.lineColor == undefined?"red":this.options.lineColor;
		this.options.lineStyle = this.options.lineStyle == undefined?"solid":this.options.lineColor;
		
		this.options.Style=function()
		{
			return{
				"border-top":this.lineWidth + " " + this.lineColor + " " + this.lineStyle,
				overflow:"hidden",
				height:'5px'
			}
		}
	}
	this.setStyle=function(style)
	{
		this.layer.setStyle(style);
	}
	this._setStyle=function()
	{
		var fill = new ol.style.Fill({
			color: [180, 0, 0, 0.3]
		});
		 
		var stroke = new ol.style.Stroke({
			color: [180, 0, 0, 1],
			width: 1
		});
		var style = new ol.style.Style({
		image: new ol.style.Circle({
				fill: fill,
				stroke: stroke,
				radius: 8
			}),
			fill: fill,
			stroke: stroke
		});
		this.layer.setStyle(style);
	}
	this._setStyle();
	this._setDefaultStyle();
	this._createSpan1=function(marginleft,pID)
	{
		var _style = {
			"border-left":"1px "+this.options.lineColor+" solid",
			"font-size":"4px",
			"vertical-align":"top"
		};
		var _span = $("<span></span>");
		_span.css(_style);
		_span.attr("id","olt_line_"+pID);
		_span.attr("tag","oltimer_spliter");
		_span.css("margin-left",marginleft);		
		
		return _span;
	}
	/*数据、默认选中、定位时间*/
	this.create=function(dat,def,duration)
	{
		this._playList = [];
		for(var i in dat)
		{
			if(i<=def) continue;
			this._playList.push(i);
		}
		for(var i = 0;i<=def;i++) this._playList.push(i);
		
		this._playIndex = def+1;
		this._playOrg = def;
		this.datas = dat;
		this._duration = duration;
		if(this._duration == undefined) this._duration = 2500;
		var _div = $("<div></div>");
		_div.css(this.options.Style());
		this.container.append(_div);
		if(!(dat instanceof Array)) throw 'dat type is error ,array is needed.';
		var _w = this.container.width()-dat.length;
		var _w1 = _w/(dat.length-1);
		_w1 = _w1-_w1%1
		for(var i = 0;i < dat.length;i++)
		{
			var _marginLeft = 0;
			if(i == dat.length-1)
				_marginLeft=_w1 - 10 + "px";
			else if(i > 0)
				_marginLeft=_w1 + "px";
			else if(i == 0)
				_marginLeft="5px";
			_div.append(this._createSpan1(_marginLeft,i));
		}
		var _subDiv = $("<div style='width:100%;'></div>");
		this.container.append(_subDiv);
		var _subSpan,_subSpanW1 = _w1,_subSpanW2 = _w1/2;
		var _stylesubSpan = 
		{
			display:'inline-block',
			'text-align':'center',
			'cursor':'pointer',
			'overflow':'hidden'
		}
		var _idperfix = "oltimer_text_";
		for(var i = 0;i < dat.length;i++)
		{
			_subSpan = $("<span id='"+_idperfix+i+"' tag='oltimer_text' index='"+i+"'></span>");
			_subSpan.css(_stylesubSpan);
			if(i == dat.length-1)
			{
				_subSpan.width(_subSpanW2+"px");
				_subSpan.css("text-align","right");
			}
			else if(i > 0)
			{
				_subSpan.width(_subSpanW1+"px");
			}
			else if(i == 0)
			{
				_subSpan.width(_subSpanW2+"px");
				_subSpan.css("text-align","left");
			}
			_subSpan.html(dat[i].text);
			_subSpan.appendTo(_subDiv);
			//_subSpan.hover(function(){$(this).css("color",this.txtColor[2]);}, function(){$(this).css("color",this.txtColor);});
			function _f(obj,pOlTimer){	
				obj.click(function(e){
					return _f2(pOlTimer,e);
				});
			}
			function _f2(o,e)
			{
					var _o = o;
					_o._setData($(e.target));
			}
			_f(_subSpan,this);
			if(def == i) 
			{
				this._animate = false;
				_subSpan.trigger("click");
				this._animate = true;
			}
		}
	}
	this._animate = true;
	this._setData=function(d)
	{
		var objs = this.container.find("[tag$='oltimer_text']");
		for(var i in objs)
		{
			objs.eq(i).css("color",this.txtColor[0]);
		}
		d.css("color",this.txtColor[1]);
		var _index = d.attr('index')/1;
		if(this.datas[_index].features instanceof ol.source.Vector)
		{
			this.layer.setSource(this.datas[_index].features);
		}
		else
			{
			var _features = this.datas[_index].features;
			for(var f in _features){
				this._transform_geometry(_features[f]);
			}
			
			this.layer.setSource(new ol.source.Vector({
				features:_features
			}));
		}
		var _s = this.layer.getSource();
		var _e = _s.getExtent();		
		if(_e[0] == "Infinity") _s.refresh() ;
		var _v = this.olmap.getView();
		_v.setCenter([(_e[0]+_e[2])/2,(_e[1]+_e[3])/2]);
		if(this._animate == true)
			_v.fit(_e,{duration: 2500});
		else
			_v.fit(_e);
	}
	this._resize();
	this._playOrg = -1;
	this._playIndex = -1;
	this._playList = [];
	this.play=function()
	{
		if(this._playList.lenght == 0) return;
		var _o=this;
		return setTimeout(function(){
			_o._int = setInterval(function(){
				return _o._play();
			},_o._duration+500)
		},0);
	}
	this._play=function(){
		if(this._playIndex == this._playOrg) 
		{
			window.clearInterval(this._int);
		}
		if(this._playIndex >= this._playList.length) 
		{
			this._playIndex = 0;
		}
		var objs = this.container.find("[tag$='oltimer_text']");
		objs.eq(this._playIndex).trigger('click');
		this._playIndex++;
	}
}

