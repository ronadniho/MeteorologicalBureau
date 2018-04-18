var selectDate =null;

var selectYear = 0;
var selectMonth = 0;
var userId=0;
$(function() {	
	var date = new Date().format('yyyy-MM-dd');	
	userId=$(window.parent.document).find("#userId").val();
	try{
		if(!window.parent.mainFrame){
			mainFrame=$(window.parent.document).find("#mainFrame")[0].contentWindow;
			window.parent.mainFrame=mainFrame;
		}
	}catch (e) {
		alert(e);
	}
	
	changeP(date);
	
	/*
	$("#divCalendar").swipe( {					
		swipeLeft:function() {
			pushBtm('MD');
		},
		swipeRight:function() {
			pushBtm('MU');		
		},
		swipeUp:function(){
			//暂时屏蔽上下滑动
			//pushBtm('MU');
		},
		swipeDown:function() {
			//暂时屏蔽上下滑动
			//pushBtm('MD');		
		}
	});
	*/

	
	/*$("#divCalendar").on("swipeleft",function(){
		pushBtm('MU');
	}).on("swiperight",function(){
		pushBtm('MD');
	});*/
});

function changeP(date) {
	selectDate= new Date(date.replace(/\-/g, "\/")) ;
	getDataByMonth();

}

var Map = function(m) {
	var map;
	if (typeof m == 'undefined')
		map = new Array();
	else
		map = m;
	this.keys = function() {
		var _keys = new Array();
		for ( var _i in map) {
			_keys.push(_i);
		}
		return _keys;
	};

	this.put = function(key, value) {
		map[key] = value;
	};
	this.get = function(key) {
		return map[key];
	};
	this.remove = function(key) {
		map[key] = null;
		delete map[key];
	};
	this.clear = function() {
		delete map;
		map = new Array();
	};
};
var dataMap = new Map();

function btnWin(b){	
	if("JT"==b){
		selectDate=new Date();
	}else{
		var year=parseInt($('#current-data').text());
		var month=parseInt($('#current-data-month').text()) - 1;		
		selectDate=new Date(year,month,1);	
	}
	
	getDataByMonth();
}
function setSelectDate(day){
	alert(day);
}
function resizeWin(){
	var main = $(window.parent.document).find("#mainFrame");
	var thisheight = $("#divCalendar").outerHeight() + 10;
	$(main).height(thisheight);
}
function createHtml(){
	
	resizeWin();
	var selectDateStr=selectDate.format('yyyy-MM-dd');
	
	
	var items=dataMap.get(selectDateStr);	
	var html="";
	var pselectDate= $(window.parent.document).find("#selectDate");
	 //
	
	window.parent.iframeDate=selectDate;
	if(items){
		$(pselectDate).html(selectDateStr + "日程安排");
		window.parent.items=items;
		for(var i=0;i<items.length;i++){
			var con=items[i].CONTENT;
			if(con==""){
				con=items[i].TITLE;
			}
			
			var time=items[i].BEGIN_TIME;
			var colneDiv= $(window.parent.document).find("#cloneItem").clone(true);
			$(colneDiv).find("#content").html(con);
			$(colneDiv).find("#time").html(time);
			$(colneDiv).find("#indexItem").val(i);
			
			
			
			html+=$(colneDiv).html();
		}	
	}else{
		$(pselectDate).html(selectDateStr + "无日程安排");
	}
	 $(window.parent.document).find("#addList").html(html);	
	
}

function loadData(){
	selectYear = selectDate.getFullYear();
	selectMonth = selectDate.getMonth() + 1;
	var url = baseURL + "/action?calendarDuty=1&type=find&year="
			+ selectYear + "&mounth=" + selectMonth+"&userId="+userId;
	$.ajax({
		type : "get",
		async : true,
		url : url,
		dataType : "jsonp",
		jsonp : "callback",
		headers : {'Authorization': 'DreamOA-H5'},
		jsonpCallback : "flightHandler",

		success : function(json) {
			var datas = json.rows;
			var firstDay = new Date(selectYear, parseInt(selectMonth) - 1, 1);
			var endDay = new Date(selectYear, parseInt(selectMonth), 0);
			var diff = DateDiff(firstDay.format('yyyy-MM-dd'), endDay
					.format('yyyy-MM-dd'));
			
		
			dataMap.clear();
			for (var i = 0; i < datas.length; i++) {					
				var item = datas[i];
				var beginTime = item.BEGIN_TIME;
				var beginDate = beginTime.split(" ")[0].replace(/\-/g, "");
				var endTime = item.END_TIME;
				var endDate = endTime.split(" ")[0].replace(/\-/g, "");

				for (var j = 0; j <= diff; j++) {
					var nowDateStr = addByTransDate(firstDay
							.format('yyyy-MM-dd'), j);
					var nowDate = nowDateStr.replace(/\-/g, "");
					if (nowDate >= beginDate && nowDate <= endDate) {
						
						var items = dataMap.get(nowDateStr);
						if (!items) {
							items = [];
						}
						items.push(item);							
						dataMap.put(nowDateStr, items);						
						
					}
				}

			}	
			
			for (var f = 0; f < 42; f++) {
				var gdObj=$("#GD"+f).attr("class");
				var sdObj=$("#SD"+f);
				var day=parseInt($(sdObj).text());
				var dgObj=$("#GD"+f);
				dgObj.css({"background-color":""});
				var year=parseInt($('#current-data').text());
				var month=parseInt($('#current-data-month').text()) - 1;	
				if(gdObj&&gdObj.toString().indexOf("selected")>-1){						
					selectDate=new Date(year,month,day);
				}
				sdObj.removeAttr("style");
				if(!gdObj||gdObj.toString().indexOf("tradition")<0){
					var wdate=new Date(year,month,day);
					var wdateStr=wdate.format('yyyy-MM-dd');
					var items=dataMap.get(wdateStr);
			
					if(items){						
						dgObj.css({"background-color":"#DDDD22"});
					}
				}
			}
			
			createHtml();
		},
		error : function() {
			alert('获取信息失败');
		}
	});
}
function getDataByMonth() {
	if (selectYear == selectDate.getFullYear()
			&& (selectDate.getMonth() + 1) == selectMonth) {
		createHtml();
	} else {
		loadData();		
	}

}

// //////////////////////////////////////////////////////////////////////////////////////////
// 计算两个日期天数差的函数，通用
// //////////////////////////////////////////////////////////////////////////////////////////
function DateDiff(sDate1, sDate2) { // sDate1和sDate2是yyyy-MM-dd格式

	var oDate1, oDate2, iDays;
	oDate1 = new Date(sDate1.replace(/\-/g, "\/")); 
	oDate2 = new Date(sDate2.replace(/\-/g, "\/"));
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒数转换为天数

	return iDays; // 返回相差天数
}

// //////////////////////////////////////////////////////////////////////////////////////////
// 根据指定的一个日期和相差的天数，获取另外一个日期
// dateParameter为指定已经存在的日期yyyy-MM-dd num为相差天数为整型
// //////////////////////////////////////////////////////////////////////////////////////////
function addByTransDate(dateParameter, num) {
	var translateDate = "", dateString = "", monthString = "", dayString = "";
	translateDate = dateParameter.replace("-", "/").replace("-", "/");
	
	var newDate = new Date(translateDate);
	newDate = newDate.valueOf();
	newDate = newDate + num * 24 * 60 * 60 * 1000; // 备注 如果是往前计算日期则为减号 否则为加号
	newDate = new Date(newDate);

	// 如果月份长度少于2，则前加 0 补位
	if ((newDate.getMonth() + 1).toString().length == 1) {
		monthString = 0 + "" + (newDate.getMonth() + 1).toString();
	} else {
		monthString = (newDate.getMonth() + 1).toString();
	}

	// 如果天数长度少于2，则前加 0 补位
	if (newDate.getDate().toString().length == 1) {

		dayString = 0 + "" + newDate.getDate().toString();
	} else {
		dayString = newDate.getDate().toString();
	}

	dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
	return dateString;

}
