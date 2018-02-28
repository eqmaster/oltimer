/*****************************************************************************
*                            rl.js                                       *
*****************************************************************************/
/**
* 底图类
**/
// 百度地图层
var projection = ol.proj.get("EPSG:3857");
var resolutions = [];
for(var i=0; i<19; i++){
    resolutions[i] = Math.pow(2, 18-i);
}
var baiduMapLayer = new ol.layer.Tile({
    source: new ol.source.TileImage({
        crossOrigin: 'anonymous',
        projection: projection,
        tileGrid: new ol.tilegrid.TileGrid({
            origin: [0,0],
            resolutions: resolutions
        }),
        tileUrlFunction: function(tileCoord, pixelRatio, proj){
            if(!tileCoord){
                return "";
            }
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = tileCoord[2];

            if(x<0){
                x = "M"+(-x);
            }
            if(y<0){
                y = "M"+(-y);
            }
            return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x="+x+"&y="+y+"&z="+z+"&styles=pl&udt=20151021&scaler=1&p=1";
        }
    })
});

//Bing中文地图层
var bingMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        crossOrigin: 'anonymous',
        tilePixelRatio: 2,
        tileUrlFunction: function(tileCoord){
            var z = tileCoord[0];
            var x = tileCoord[1];
            var y = -tileCoord[2] - 1;
            var result='', zIndex=0;

            for(; zIndex<z; zIndex++) {
                result = ((x&1)+2*(y&1)).toString() + result;
                x >>= 1;
                y >>= 1;
            }
            return 'http://dynamic.t0.tiles.ditu.live.com/comp/ch/' + result + '?it=G,VE,BX,L,LA&mkt=zh-cn,syr&n=z&og=111&ur=CN';
        }
    })
});

//高德地图层
var gaodeMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        crossOrigin: 'anonymous',
        url:'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
    })
});

//google地图层
var googleMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        crossOrigin: 'anonymous',
        url:'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
    })
});

//Open Street Map 地图层
var openStreetMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        crossOrigin: 'anonymous',
        url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    })
});

//天地图 图层
var tiandituMapLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    crossOrigin: 'anonymous',
    tileUrlFunction: function(tileCoord) {
      var z = tileCoord[0];
      var x = tileCoord[1];
      var y = tileCoord[2];
      var halfTileNum = Math.pow(2, z - 1);
      var tiandituY = -y - halfTileNum;
      return 'http://t7.tianditu.com/DataServer?T=vec_c&x=' + x + '&y=' + tiandituY + '&l=' + z;
    }
  })
});

var tiandituMapLayer2 = new ol.layer.Tile({
  source: new ol.source.XYZ({
    crossOrigin: 'anonymous',
    tileUrlFunction: function(tileCoord) {
      var z = tileCoord[0];
      var x = tileCoord[1];
      var y = tileCoord[2];
      var halfTileNum = Math.pow(2, z - 1);
      var tiandituY = -y - halfTileNum;
      return 'http://t7.tianditu.com/DataServer?T=cva_c&x=' + x + '&y=' + tiandituY + '&l=' + z;
    }
  })
});

//yahoo地图层
var yahooMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        crossOrigin: 'anonymous',
        tileSize: 512,
        url:'https://{0-3}.base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?lg=ENG&ppi=250&token=TrLJuXVK62IQk0vuXFzaig%3D%3D&requestid=yahoo.prod&app_id=eAdkWGYRoc4RfxVo0Z4B'
    })
});

//arcgi地图wms底图
var arcgisTileLayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
        crossOrigin: 'anonymous',
        url: "http://10.0.36.61:6080/arcgis/rest/services/ningdongvecwms/MapServer"
    })
  })

//超图地图wms底图
var superMapTileLayer = new ol.layer.Tile({
    source:new ol.source.XYZ({  
        title: "超图底图",  
        url:"http://t0.supermapcloud.com/FileService/image?map=quanguo&type=web&x={x}&y={y}&z={z}"  
    })  
});   
