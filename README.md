# oltimer
How to Use?

	//var map = new ol.Map({......
	
    	var olt = new oltimer(map,'olTimer');
		var dats = [];
		var years = [0,1,2,3,4,5,6,7];
		for(var i in years)
		
		{
			dats[i]={
				text:years[i],
				features:[
					new ol.Feature({
					geometry:
						new ol.geom.Point(ol.proj.fromLonLat([107.1+i/1.0, 35.82-i/1.0],
						'EPSG:4326', 
						'EPSG:3857'))}),
					new ol.Feature({
					geometry:
						new ol.geom.Point(ol.proj.fromLonLat([107.1+i*i/2.0, 35.82-i/2.0],
						'EPSG:4326', 
						'EPSG:3857'))})
				]
			};
		}
		
		//the datas,the startPosition,the duration
    
olt.create(dats,2,2500);
olt.play();
