var adFtv = {
	' 除夕' : '<strong style="color:#D02F12">除夕</strong>',
	' 春节' : '<strong style="color:#D02F12">春节</strong>',
	' 元宵节' : '<strong style="color:#D02F12">元宵节</strong>',
	'0308 妇女节' : '祝天下女人，妇女节快乐。',
	' 母亲节' : '祝天下所有母亲，母亲节快乐',
	' 父亲节' : '祝天下所有父亲，父亲节快乐。',
	'0501 劳动节' : '祝您<strong style="color:#D02F12">劳动节</strong>快乐！',
	' 端午节' : '祝您端午节快乐。',
	' 七夕' : '祝您七夕情人节快乐。',
	' 重阳节' : '祝天下所有老人，重阳节快乐。',
	' 中秋节' : '祝您中秋节快乐。',
	'1001 国庆节' : '祝您<strong style="color:#D02F12">国庆节</strong>快乐！'
};
var lmanac = {};
var chineseYear = '';
var currentDate = '';
var lichunDate = 0;
var lunarInfo = new Array(19416, 19168, 42352, 21717, 53856, 55632, 91476,
		22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944,
		44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104,
		38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067,
		37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584,
		53938, 43344, 46423, 27808, 46416, 86869, 19872, 42416, 83315, 21168,
		43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051,
		55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616,
		46400, 46752, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968,
		44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 21952,
		43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959,
		9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416,
		86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208,
		53856, 60005, 54576, 23200, 30371, 38608, 19415, 19152, 42192, 118966,
		53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600,
		111189, 27936, 44448, 84835);
var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗",
		"猪");
var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏",
		"小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬",
		"小雪", "大雪", "冬至");
var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867,
		150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033,
		353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
var nStr1 = new Array("日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
var nStr2 = new Array("初", "十", "廿", "卅", "□");
var shengxiaoStyle = {
	鼠 : 'rat',
	牛 : 'ox',
	虎 : 'tiger',
	兔 : 'rabbit',
	龙 : 'dragon',
	蛇 : 'snake',
	马 : 'horse',
	羊 : 'goat',
	猴 : 'monkey',
	鸡 : 'rooster',
	狗 : 'dog',
	猪 : 'boar'
};
var sFtv = new Array('0101*元旦',
		'0214#情人节 http://baike.baidu.com/view/2533.htm',
		'0305 学雷锋日 http://baike.baidu.com/view/165596.htm',
		'0308#妇女节 http://baike.baidu.com/view/328605.htm',
		'0312#植树节 http://baike.baidu.com/view/21813.htm',
		'0314@白色情人节 http://baike.baidu.com/view/9083.htm',
		'0315 消费者权益日 http://baike.baidu.com/view/807967.htm',
		'0321 睡眠日 http://baike.baidu.com/view/21357.htm',
		'0322 世界水日 http://baike.baidu.com/view/21371.htm',
		'0401#愚人节 http://baike.baidu.com/view/1710.htm',
		'0407 卫生日 http://baike.baidu.com/view/22478.htm',
		'0331@复活节 http://baike.baidu.com/view/1462.htm',
		'0422 地球日 http://baike.baidu.com/view/2183.htm',
		'0423 读书日 http://baike.baidu.com/view/23287.htm',
		'0501@劳动节 http://baike.baidu.com/view/44253.htm',
		'0504#青年节 http://baike.baidu.com/view/27635.htm',
		'0530@五卅纪念日 http://baike.baidu.com/view/2340194.htm',
		'0531 无烟日 http://baike.baidu.com/view/22249.htm',
		'0601@儿童节 http://baike.baidu.com/view/16194.htm',
		'0605 环境日 http://baike.baidu.com/view/22254.htm',
		'0606 爱眼日 http://baike.baidu.com/view/21347.htm',
		'0611 人口日 http://baike.baidu.com/view/58964.htm',
		'0701#建党日 http://baike.baidu.com/view/160972.htm',
		'0701#香港回归 http://baike.baidu.com/view/58870.htm',
		'0707@抗日纪念 http://baike.baidu.com/view/80378.htm',
		'0801@建军节 http://baike.baidu.com/view/27204.htm',
		'0812 青年日 http://baike.baidu.com/view/950303.htm',
		'0815 抗日胜利纪念日 http://baike.baidu.com/view/1387589.htm',
		'0910#教师节 http://baike.baidu.com/view/25833.htm',
		'0918@九一八纪念日 http://baike.baidu.com/view/34028.htm',
		'0920 爱牙日 http://baike.baidu.com/view/147917.htm',
		'0921 和平日 http://baike.baidu.com/view/27269.htm',
		'0922 无车日 http://baike.baidu.com/view/489563.htm',
		'0927 旅游日 http://baike.baidu.com/view/59496.htm',
		'1001*国庆节 http://baike.baidu.com/view/14446.htm',
		'1010@辛亥革命纪念日 http://baike.baidu.com/view/59004.htm',
		'1101#万圣节 http://baike.baidu.com/view/2532.htm',
		'1110 青年节 http://baike.baidu.com/view/165356.htm',
		'1108 记者日 http://baike.baidu.com/view/45983.htm',
		'1111#光棍节 http://baike.baidu.com/view/23105.htm',
		'1116 宽容日 http://baike.baidu.com/view/614745.htm',
		'1117 大学生节 http://baike.baidu.com/view/165576.htm',
		'1120 儿童日 http://baike.baidu.com/view/27462.htm',
		'1201@艾滋病日 http://baike.baidu.com/view/28884.htm',
		'1203 残疾人日 http://baike.baidu.com/view/155500.htm',
		'1209@一二九运动 http://baike.baidu.com/view/2055278.htm',
		'1210 人权日 http://baike.baidu.com/view/59173.htm',
		'1212 西安事变纪念日 http://baike.baidu.com/view/961033.htm',
		'1213@南京大屠杀纪念日 http://baike.baidu.com/view/22274.htm',
		'1220@澳门回归纪念日 http://baike.baidu.com/view/80418.htm',
		'1224#平安夜 http://baike.baidu.com/view/28259.htm',
		'1225#圣诞节 http://baike.baidu.com/view/2547.htm');
var lFtv = new Array("0101*春节 http://baike.baidu.com/view/3108.htm",
		"0115*元宵节 http://baike.baidu.com/view/1949.htm",
		"0408*佛诞 http://baike.baidu.com/view/240801.htm?fromId=93880",
		"0202*龙抬头 http://baike.baidu.com/view/26664.htm",
		"0303*上巳节 http://baike.baidu.com/view/105758.htm",
		"0505*端午节 http://baike.baidu.com/view/2567.htm",
		"0707*七夕 http://baike.baidu.com/view/8489.htm",
		"0715*中元节 http://baike.baidu.com/view/57902.htm",
		"0815*中秋节 http://baike.baidu.com/view/2568.htm",
		"0909*重阳节 http://baike.baidu.com/view/2572.htm",
		"1208*腊八节 http://baike.baidu.com/view/22439.htm",
		"1223*北方小年 http://baike.baidu.com/subview/15128/11122907.htm",
		"1224*南方小年 http://baike.baidu.com/subview/15128/11122907.htm",
		"0100*除夕 http://baike.baidu.com/view/2562.htm");
var wFtv = new Array('0520*母亲节 http://baike.baidu.com/view/2516.htm',
		'0630*父亲节 http://baike.baidu.com/view/8463.htm',
		'1144 感恩节 http://baike.baidu.com/view/2525.htm');
var fFtv2013 = new Array("0101 *元旦", "0209 *除夕", "0209 *", "0210 *", "0211 *",
		"0212 *", "0213 *", "0214 *", "0215 *", '0216 _', '0217 _', '0404 *',
		'0405 *', '0406 *', '0407 _', '0427 _', '0428 _', '0429 *', '0430 *',
		"0501 *劳动节", '0608 _', '0609 _', "0610 *", '0611 *', '0612 *',
		"0919 *中秋节", '0920 *', '0921 *', '0922 _', '0929 _', '1012 _',
		"1001 *国庆节", "1002 *", "1003 *", "1004 *", "1005 *", "1006 *", "1007 *");
var fFtv2012 = new Array("0101 *元旦");
var fFtv2014 = new Array("0101 *元旦", "0126 _", "0131 *", "0201 *", "0202 *",
		"0203 *", "0204 *", "0205 *", "0206 *", '0208 _', '0405 *', '0406 *',
		'0407 *', "0501 *劳动节", '0502 *', '0503 *', '0504 _', '0602 *',
		'0601 *', '0531 *', "0908 *中秋节", '0906 *', '0907 *', '0928 _',
		'1011 _', "1001 *国庆节", "1002 *", "1003 *", "1004 *", "1005 *",
		"1006 *", "1007 *");
var fFtv2015 = new Array("0101 *元旦", "0102 *", "0103 *", "0104 _", "0215 _",
		"0218 *", "0219 *", "0220 *", "0221 *", "0222 *", "0223 *", '0224 *',
		'0228 _', '0404 *', '0405 *', '0406 *', "0501 *劳动节", '0502 *',
		'0503 *', '0620 *', '0621 *', '0622 *', "0927 *中秋节", '1010 _',
		"1001 *国庆节", "1002 *", "1003 *", "1004 *", "1005 *", "1006 *", "1007 *");
function shujiu(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var result = '';
	if (month == 12 || month == 1 || month == 2 || month == 3) {
		year = year.toString();
		var century = parseInt(year.substring(0, 2)) + 1;
		var c = '', d = 0.2422;
		if (century == 21) {
			c = 21.94;
		} else if (century == 20) {
			c = 22.60;
		} else {
			return
		}
		y = year.substring(2);
		var dongzhi = '';
		if (month == 12) {
			dongzhi = parseInt(y * d + c) - parseInt(y / 4);
		} else {
			dongzhi = parseInt((y - 1) * d + c) - parseInt((y - 1) / 4);
		}
		if (year == '1918' || year == '2021') {
			dongzhi = dongzhi - 1;
		}
		year = parseInt(year);
		var feb_days = 28;
		if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
			feb_days = 29;
		}
		var sj = new Array('12 ' + (dongzhi) + ' 12 ' + (dongzhi + 8) + ' 一九',
				'12 ' + (dongzhi + 9) + ' 1 ' + (dongzhi + 17 - 31) + ' 二九',
				'1 ' + (dongzhi + 18 - 31) + ' 1 ' + (dongzhi + 26 - 31)
						+ ' 三九', '1 ' + (dongzhi + 27 - 31) + ' 1 '
						+ (dongzhi + 35 - 31) + ' 四九', '1 '
						+ (dongzhi + 36 - 31) + ' 2 ' + (dongzhi + 44 - 62)
						+ ' 五九', '2 ' + (dongzhi + 45 - 62) + ' 2 '
						+ (dongzhi + 53 - 62) + ' 六九', '2 '
						+ (dongzhi + 54 - 62) + ' 2 ' + (dongzhi + 62 - 62)
						+ ' 七九', '2 ' + (dongzhi + 63 - 62) + ' 3 '
						+ (dongzhi + 71 - 62 - feb_days) + ' 八九', '3 '
						+ (dongzhi + 72 - 62 - feb_days) + ' 3 '
						+ (dongzhi + 80 - 62 - feb_days) + ' 九九');
		var sj_days = new Array('九', '八', '七', '六', '五', '四', '三', '二', '一');
		for ( var j in sj) {
			if (sj[j]
					.match(/^(\d{1,2})\s+(\d{1,2})\s+(\d{1,2})\s+(\d{1,2})\s+(.*?)$/)) {
				if (month == Number(RegExp.$1) && month == Number(RegExp.$3)
						&& day >= Number(RegExp.$2) && day <= Number(RegExp.$4)) {
					result = RegExp.$5 + '第'
							+ sj_days[parseInt(RegExp.$4) - day] + '天';
				}
				if ((RegExp.$1 != RegExp.$3)
						&& (month == RegExp.$1 && day >= RegExp.$2)) {
					result = RegExp.$5 + '第' + sj_days[8 - (day - RegExp.$2)]
							+ '天';
				}
				if ((RegExp.$1 != RegExp.$3)
						&& (month == RegExp.$3 && day <= RegExp.$4)) {
					result = RegExp.$5 + '第'
							+ sj_days[parseInt(RegExp.$4) - day] + '天';
				}
			}
		}
	}
	if (year == 2013 && (month == 7 || month == 8)) {
		var sf = new Array('7 13 7 22 头伏', '7 23 8 11 二伏', '8 12 8 21 三伏');
		var sf_days = new Array('二十', '十九', '十八', '十七', '十六', '十五', '十四', '十三',
				'十二', '十一', '十', '九', '八', '七', '六', '五', '四', '三', '二', '一');
		for ( var j in sf) {
			if (sf[j]
					.match(/^(\d{1})\s+(\d{1,2})\s+(\d{1})\s+(\d{1,2})\s+(.*?)$/)) {
				if (month == Number(RegExp.$1) && month == Number(RegExp.$3)
						&& day >= Number(RegExp.$2) && day <= Number(RegExp.$4)) {
					result = RegExp.$5 + '第'
							+ sf_days[parseInt(parseInt(RegExp.$4) - day) + 10]
							+ '天';
				}
				if ((RegExp.$1 != RegExp.$3)
						&& (month == RegExp.$1 && day >= RegExp.$2)) {
					result = RegExp.$5 + '第' + sf_days[19 - (day - RegExp.$2)]
							+ '天';
				}
				if ((RegExp.$1 != RegExp.$3)
						&& (month == RegExp.$3 && day <= RegExp.$4)) {
					result = RegExp.$5 + '第'
							+ sf_days[parseInt(RegExp.$4) - day] + '天';
				}
			}
		}
	}
	return result;
}
function lYearDays(c) {
	var a, b = 348;
	for (a = 32768; a > 8; a >>= 1) {
		b += (lunarInfo[c - 1900] & a) ? 1 : 0;
	}
	return (b + leapDays(c));
}
function leapDays(a) {
	if (leapMonth(a)) {
		return ((lunarInfo[a - 1900] & 65536) ? 30 : 29);
	} else {
		return (0);
	}
}
function leapMonth(a) {
	return (lunarInfo[a - 1900] & 15);
}
function monthDays(b, a) {
	return ((lunarInfo[b - 1900] & (65536 >> a)) ? 30 : 29);
}
function Lunar(d) {
	var c, b = 0, a = 0;
	var e = (Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(
			1900, 0, 31)) / 86400000;
	for (c = 1900; c < 2050 && e > 0; c++) {
		a = lYearDays(c);
		e -= a;
	}
	if (e < 0) {
		e += a;
		c--;
	}
	this.year = c;
	b = leapMonth(c);
	this.isLeap = false;
	for (c = 1; c < 13 && e > 0; c++) {
		if (b > 0 && c == (b + 1) && this.isLeap == false) {
			--c;
			this.isLeap = true;
			a = leapDays(this.year);
		} else {
			a = monthDays(this.year, c);
		}
		if (this.isLeap == true && c == (b + 1)) {
			this.isLeap = false;
		}
		e -= a;
	}
	if (e == 0 && b > 0 && c == b + 1) {
		if (this.isLeap) {
			this.isLeap = false;
		} else {
			this.isLeap = true;
			--c;
		}
	}
	if (e < 0) {
		e += a;
		--c;
	}
	this.month = c;
	this.day = e + 1;
}
function solarDays(b, a) {
	if (a == 1) {
		return (((b % 4 == 0) && (b % 100 != 0) || (b % 400 == 0)) ? 29 : 28);
	} else {
		return (solarMonth[a]);
	}
}
function cyclical(a) {
	return (Gan[a % 10] + Zhi[a % 12]);
}
function calElement(a, g, j, b, f, d, e, h, c, i, k) {
	this.isToday = false;
	this.sYear = a;
	this.sMonth = g;
	this.sDay = j;
	this.week = b;
	this.lYear = f;
	this.lMonth = d;
	this.lDay = e;
	this.isLeap = h;
	this.cYear = c;
	this.cMonth = i;
	this.cDay = k;
	this.color = "";
	this.className = "";
	this.lunarFestival = "";
	this.solarFestival = "";
	this.solarTerms = "";
}
function sTerm(c, b) {
	var a = new Date((31556925974.7 * (c - 1900) + sTermInfo[b] * 60000)
			+ Date.UTC(1900, 0, 6, 2, 5));
	return (a.getUTCDate());
}
function calendar(j, t, h) {
	var B, l, A, b, g = 1, e, C = 0, s, p, o;
	var z, a, f;
	var d = new Array(3);
	var r = 0;
	var c = 0;
	B = new Date(j, t, 1, 0, 0, 0, 0);
	this.length = solarDays(j, t);
	this.firstWeek = B.getDay();
	if (t < 2) {
		z = cyclical(j - 1900 + 36 - 1);
	} else {
		z = cyclical(j - 1900 + 36);
	}
	var v = sTerm(j, 2);
	lichunDate = v;
	var u = sTerm(j, t * 2);
	a = cyclical((j - 1900) * 12 + t + 12);
	var q = Date.UTC(j, t, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
	for (var w = 0; w < this.length; w++) {
		if (g > C) {
			B = new Date(j, t, w + 1);
			l = new Lunar(B);
			A = l.year;
			b = l.month;
			g = l.day;
			e = l.isLeap;
			C = e ? leapDays(A) : monthDays(A, b);
			if (r == 0) {
				c = b;
			}
			d[r++] = w - g + 1;
		}
		if (t == 1 && (w + 1) == v) {
			z = cyclical(j - 1900 + 36);
		}
		if ((w + 1) == u) {
			a = cyclical((j - 1900) * 12 + t + 13);
		}
		f = cyclical(q + w);
		this[w] = new calElement(j, t + 1, w + 1,
				nStr1[(w + this.firstWeek) % 7], A, b, g++, e, z, a, f);
	}
	s = sTerm(j, t * 2) - 1;
	p = sTerm(j, t * 2 + 1) - 1;
	if (j === 2011 && t === 10) {
		this[7].solarTerms = "立冬";
		this[22].solarTerms = "小雪";
	} else {
		if (j === 2013 && t === 1) {
			this[3].solarTerms = "立春";
			this[17].solarTerms = "雨水";
		} else if (j === 2013 && t === 6) {
			this[21].solarTerms = "大暑";
		} else if (j === 2013 && t === 11) {
			this[21].solarTerms = "冬至";
			this[6].solarTerms = "大雪";
		} else {
			if (j === 2012 && t === 0) {
				this[5].solarTerms = "小寒";
				this[20].solarTerms = "大寒";
			} else {
				if (j === 2012 && t === 4) {
					this[19].solarTerms = "小满";
					this[4].solarTerms = "立夏";
				} else if (j === 2012 && t === 11) {
					this[6].solarTerms = "大雪";
					this[20].solarTerms = "冬至";
				} else {
					solarTerm[t * 2] && (this[s].solarTerms = solarTerm[t * 2]);
					solarTerm[t * 2 + 1]
							&& (this[p].solarTerms = solarTerm[t * 2 + 1]);
					if (this[s].solarTerms == '清明') {
						this[s - 1].lunarFestival = '<a href="http://baike.baidu.com/view/318.htm" target="blank">寒食节</a>';
					}
				}
			}
		}
	}
	if (true) {
		for (w in sFtv) {
			if (sFtv[w].match(/^(\d{2})(\d{2})([\s\*|\s\#|\s@])(.+)\s+(.+)$/)) {
				if (Number(RegExp.$1) == (t + 1)) {
					if (RegExp.$3 == '*') {
						this[Number(RegExp.$2) - 1].color = '#d02f12';
					} else if (RegExp.$3 == '#') {
						this[Number(RegExp.$2) - 1].color = '#009900';
					} else if (RegExp.$3 == '@') {
						this[Number(RegExp.$2) - 1].color = '#009900';
					} else {
						this[Number(RegExp.$2) - 1].color = '';
					}
					if (RegExp.$4 == '国庆节' || RegExp.$4 == '八一建军节') {
						if (j > 1948) {
							this[Number(RegExp.$2) - 1].solarFestival += '<a href="'
									+ RegExp.$5
									+ '" target="blank">'
									+ RegExp.$4 + '</a> ';
						} else {
							this[Number(RegExp.$2) - 1].color = '';
						}
					} else if (RegExp.$4 == '青年节' || RegExp.$4 == '六一儿童节') {
						if (j > 1949) {
							this[Number(RegExp.$2) - 1].solarFestival += '<a href="'
									+ RegExp.$5
									+ '" target="blank">'
									+ RegExp.$4 + '</a> ';
						} else {
							this[Number(RegExp.$2) - 1].color = '';
						}
					} else if (RegExp.$4 == '香港回归') {
						if (j > 1996) {
							this[Number(RegExp.$2) - 1].solarFestival += '<a href="'
									+ RegExp.$5
									+ '" target="blank">'
									+ RegExp.$4 + '</a> ';
						}
					} else if (RegExp.$4 == '中共建党日') {
						if (j > 1920) {
							this[Number(RegExp.$2) - 1].solarFestival += '<a href="'
									+ RegExp.$5
									+ '" target="blank">'
									+ RegExp.$4 + '</a> ';
						} else {
							this[Number(RegExp.$2) - 1].color = '';
						}
					} else if (RegExp.$4 == '教师节') {
						if (j > 1984) {
							this[Number(RegExp.$2) - 1].solarFestival += '<a href="'
									+ RegExp.$5
									+ '" target="blank">'
									+ RegExp.$4 + '</a> ';
						} else {
							this[Number(RegExp.$2) - 1].color = '';
						}
					} else if (RegExp.$4 == '植树节') {
						if (j > 1978) {
							this[Number(RegExp.$2) - 1].solarFestival += '<a href="'
									+ RegExp.$5
									+ '" target="blank">'
									+ RegExp.$4 + '</a> ';
						} else {
							this[Number(RegExp.$2) - 1].color = '';
						}
					} else {
						if (RegExp.$4.length < 7) {
							this[Number(RegExp.$2) - 1].solarFestival += '<a href="'
									+ RegExp.$5
									+ '" target="blank">'
									+ RegExp.$4 + '</a> ';
						}
					}
				}
			}
		}
	}
	var k = parseInt($("#current-data").text());
	if (k == 2015) {
		for (w in fFtv2015) {
			if (fFtv2015[w].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
				if (Number(RegExp.$1) == (t + 1)) {
					if (RegExp.$4.indexOf("*") !== -1) {
						if (this[Number(RegExp.$2) - 1].solarFestival == "") {
							this[Number(RegExp.$2) - 1].solarFestival = RegExp.$4
									.split("*")[1]
									+ "";
						}
						this[Number(RegExp.$2) - 1].className = "holidays";
						if (this[Number(RegExp.$2) - 1].color == "") {
							this[Number(RegExp.$2) - 1].color = '#d02f12';
						}
					} else {
						if (RegExp.$4.indexOf("_") !== -1) {
							this[Number(RegExp.$2) - 1].solarFestival = RegExp.$4
									.split("_")[1]
									+ "";
							this[Number(RegExp.$2) - 1].className = "works";
						} else {
							this[Number(RegExp.$2) - 1].solarFestival += RegExp.$4
									+ "";
						}
					}
				}
			}
		}
	} else if (k == 2014) {
		for (w in fFtv2014) {
			if (fFtv2014[w].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
				if (Number(RegExp.$1) == (t + 1)) {
					if (RegExp.$4.indexOf("*") !== -1) {
						if (this[Number(RegExp.$2) - 1].solarFestival == "") {
							this[Number(RegExp.$2) - 1].solarFestival = RegExp.$4
									.split("*")[1]
									+ "";
						}
						this[Number(RegExp.$2) - 1].className = "holidays";
						if (this[Number(RegExp.$2) - 1].color == "") {
							this[Number(RegExp.$2) - 1].color = '#d02f12';
						}
					} else {
						if (RegExp.$4.indexOf("_") !== -1) {
							this[Number(RegExp.$2) - 1].solarFestival = RegExp.$4
									.split("_")[1]
									+ "";
							this[Number(RegExp.$2) - 1].className = "works";
						} else {
							this[Number(RegExp.$2) - 1].solarFestival += RegExp.$4
									+ "";
						}
					}
				}
			}
		}
	} else if (k == 2013) {
		for (w in fFtv2013) {
			if (fFtv2013[w].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
				if (Number(RegExp.$1) == (t + 1)) {
					if (RegExp.$4.indexOf("*") !== -1) {
						if (this[Number(RegExp.$2) - 1].solarFestival == "") {
							this[Number(RegExp.$2) - 1].solarFestival = RegExp.$4
									.split("*")[1]
									+ "";
						}
						this[Number(RegExp.$2) - 1].className = "holidays";
					} else {
						if (RegExp.$4.indexOf("_") !== -1) {
							this[Number(RegExp.$2) - 1].solarFestival = RegExp.$4
									.split("_")[1]
									+ "";
							this[Number(RegExp.$2) - 1].className = "works";
						} else {
							this[Number(RegExp.$2) - 1].solarFestival += RegExp.$4
									+ "";
						}
					}
					this[Number(RegExp.$2) - 1].color = '#d02f12';
				}
			}
		}
	} else if (k == 2012) {
		for (w in fFtv2012) {
			if (fFtv2012[w].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
				if (Number(RegExp.$1) == (t + 1)) {
					if (RegExp.$4.indexOf("*") !== -1) {
						this[Number(RegExp.$2) - 1].solarFestival = RegExp.$4
								.split("*")[1]
								+ "";
						this[Number(RegExp.$2) - 1].className = "holidays";
					} else {
						if (RegExp.$4.indexOf("_") !== -1) {
							this[Number(RegExp.$2) - 1].solarFestival = RegExp.$4
									.split("_")[1]
									+ "";
							this[Number(RegExp.$2) - 1].className = "works";
						} else {
							this[Number(RegExp.$2) - 1].solarFestival += RegExp.$4
									+ "";
						}
					}
					this[Number(RegExp.$2) - 1].color = '#d02f12';
				}
			}
		}
	}
	for (w in wFtv) {
		if (wFtv[w].match(/^(\d{2})(\d)(\d)([\s\*|\s\#|\s@])(.+)\s+(.+)$/)) {
			if (Number(RegExp.$1) == (t + 1)) {
				s = Number(RegExp.$2);
				p = Number(RegExp.$3);
				if (s < 5) {
					this[((this.firstWeek > p) ? 7 : 0) + 7 * (s - 1) + p
							- this.firstWeek].solarFestival += '<a href="'
							+ RegExp.$6 + '" target="blank">' + RegExp.$5
							+ '</a> ';
				} else {
					s -= 5;
					o = (this.firstWeek + this.length - 1) % 7;
					this[this.length - o - 7 * s + p - (p > o ? 7 : 0) - 1].solarFestival += '<a href="'
							+ RegExp.$6
							+ '" target="blank">'
							+ RegExp.$5
							+ '</a> ';
				}
				this[((this.firstWeek > p) ? 7 : 0) + 7 * (s - 1) + p
						- this.firstWeek].color = '#009900';
			}
		}
	}
	for (w in lFtv) {
		if (lFtv[w].match(/^(\d{2})(.{2})([\s\*])(.+)\s+(.+)$/)) {
			s = Number(RegExp.$1) - c;
			if (s == -11) {
				s = 1;
			}
			if (s >= 0 && s < r) {
				p = d[s] + Number(RegExp.$2) - 1;
				if (p >= 0 && p < this.length && this[p].isLeap != true) {
					this[p].lunarFestival += '<a href="' + RegExp.$5
							+ '" target="blank">' + RegExp.$4 + '</a> ';
					if (RegExp.$3 == "*") {
						this[p].color = "#d74146";
					}
				}
			}
		}
	}
	if (this[tD - 1]) {
		this[tD - 1].isToday = true
	} else {
		this[0].isToday = true
	}
}
function easter(g) {
	var b = sTerm(g, 5);
	var d = new Date(Date.UTC(g, 2, b, 0, 0, 0, 0));
	var a = new Lunar(d);
	if (a.day < 15) {
		var f = 15 - a.day
	} else {
		var f = (a.isLeap ? leapDays(g) : monthDays(g, a.month)) - a.day + 15
	}
	var e = new Date(d.getTime() + 86400000 * f);
	var c = new Date(e.getTime() + 86400000 * (7 - e.getUTCDay()));
	this.m = c.getUTCMonth();
	this.d = c.getUTCDate()
}
function cDay(b) {
	var a;
	switch (b) {
	case 10:
		a = "初十";
		break;
	case 20:
		a = "二十";
		break;
	break;
case 30:
	a = "三十";
	break;
break;
default:
a = nStr2[Math.floor(b / 10)];
a += nStr1[b % 10]
}
return (a)
}
var cld, l, g;
function drawCld(d, m, mm, yy) {
var f, a, o, n, w, p, color;
if (m != 0) {
l = new calendar(d, m - 1)
} else {
l = new calendar(d - 1, 11)
}
if (m != 11) {
g = new calendar(d, m + 1)
} else {
g = new calendar(d + 1, 0)
}
cld = new calendar(d, m);
var b = parseInt($("#current-data-month").text());
if (b != "1") {
chineseYear = Animals[(d - 4) % 12]
} else {
if (b == "1") {
	chineseYear = Animals[(d - 5) % 12];
}
}
if ((cld.length + cld.firstWeek) > 35) {
$("td").each(function(i) {
	if (i > 34) {
		$(this).show();
	}
});
} else {
$("td").each(function(i) {
	if (i == 34) {
	}
	if (i > 34) {
		$(this).hide();
	}
})
}
for (f = 0; f < 42; f++) {
sObj = document.getElementById("SD" + f);


lObj = document.getElementById("LD" + f);
gObj = document.getElementById("GD" + f);
$(gObj).removeClass("works").removeClass("holidays");
a = f - cld.firstWeek;
$('#GD' + f).removeClass("today").removeClass("selected").find("i").remove();
$('#GD' + f).removeClass('tradition').removeClass('rest').removeClass('work');
if (f < cld.firstWeek) {
	var j = parseInt(l.length) - parseInt(cld.firstWeek) + f;
	if (l[j] && l[j].className) {
		if (l[j].className.indexOf("holidays") != -1) {
			$(gObj).addClass("holidays");
			$(gObj).children().append('<i>休</i>')
		} else {
			if (l[j].className.indexOf("works") != -1) {
				$(gObj).addClass("works");
				$(gObj).children().append('<i>班</i>')
			}
		}
	}
	$('#GD' + f).addClass('tradition');
	$('#SD' + f).html(j + 1).attr('rel', 'up');
	$('#LD' + f).html(cDay(l[j].lDay));
	o = l[j].lunarFestival;
	o = o.replace(/<a.*?>/g, '');
	o = o.replace('</a>', '');
	color = l[j].color;
	o = isShowFtv(o);
	n = l[j].solarFestival;
	n = n.replace(/<a.*?>/g, '');
	n = n.replace(/<\/a>/g, '');
	n = isShowFtv(n);
	if (o.length <= 0) {
		o = n;
		o = isShowFtv(o)
	}
	if (o.length <= 0) {
		for ( var sT in solarTerm) {
			if (l[j].solarTerms == solarTerm[sT]) {
				o = solarTerm[sT];
				color = "#0058b2";
				break
			}
		}
	}
	if (o.length > 0) {
		if (o.length > 4) {
			o = o.substr(0, 4)
		}
		lObj.innerHTML = o.fontcolor(color)
	}
}
if (f > (cld.firstWeek + cld.length - 1)) {
	if (cld.firstWeek + cld.length < 36 && f < 35) {
		var j = f - (cld.firstWeek + cld.length - 1);
		if (g[j - 1] && g[j - 1].className) {
			if (g[j - 1].className.indexOf("holidays") != -1
					&& g[j - 1].sYear == 2015) {
				$(gObj).addClass("holidays");
				$(gObj).children().append('<i>休</i>')
			} else {
				if (g[j - 1].className.indexOf("works") != -1) {
					$(gObj).addClass("works");
					$(gObj).children().append('<i>班</i>')
				}
			}
		}
		$('#GD' + f).addClass('tradition');
		$('#SD' + f).html(j).attr('rel', 'down');
		$('#LD' + f).html(cDay(g[j - 1].lDay))
	}
	if (cld.firstWeek + cld.length > 35) {
		var j = f - (cld.firstWeek + cld.length - 1);
		if (g[j - 1] && g[j - 1].className) {
			if (g[j - 1].className.indexOf("holidays") != -1) {
				lObj.parentNode.parentNode.className = "holidays"
			} else {
				if (g[j - 1].className.indexOf("work") != -1) {
					$(lObj).parent().addClass("work")
				}
			}
		}
		$('#GD' + f).addClass('tradition');
		$('#SD' + f).html(j).attr('rel', 'down');
		$('#LD' + f).html(cDay(g[j - 1].lDay))
	}
	if (g[j - 1] == undefined) {
		continue
	}
	o = g[j - 1].lunarFestival;
	o = o.replace(/<a.*?>/g, '');
	o = o.replace('</a>', '');
	color = g[j - 1].color;
	o = isShowFtv(o);
	n = g[j - 1].solarFestival;
	n = n.replace(/<a.*?>/g, '');
	n = n.replace(/<\/a>/g, '');
	n = isShowFtv(n);
	if (o.length <= 0) {
		o = n;
		o = isShowFtv(o)
	}
	if (o.length <= 0) {
		for ( var sT in solarTerm) {
			if (g[j - 1].solarTerms == solarTerm[sT]) {
				o = solarTerm[sT];
				color = "#0058b2";
				break;
			}
		}
	}
	if (o.length > 0) {
		if (o.length > 4) {
			o = o.substr(0, 4);
		}
		lObj.innerHTML = o.fontcolor(color);
	}
}
if (a > -1 && a < cld.length) {	
	
	sObj.innerHTML = a + 1;
	if (!cld[a].isToday) {
		if (cld[a].sYear == new Date().getFullYear()
				&& cld[a].sMonth == (new Date().getMonth() + 1)
				&& cld[a].sDay == new Date().getDate()) {
			$(gObj).addClass("today").children().append('<i>今</i>');
			cld[a].realToday = true;
		}
	}
	if (cld[a].isToday) {
		if (d == new Date().getFullYear() && m == mm
				&& cld[a].sDay == new Date().getDate()) {
			$(gObj).addClass("today").children().append('<i>今</i>');
			cld[a].realToday = true
		} else {			
			$(gObj).addClass("selected");
		}
		to_day.id = f;
		to_day.jin = cld[a].sYear + "-" + cld[a].sMonth + "-" + cld[a].sDay;
		to_day.N_Date = cld[a].lYear + "-" + cld[a].lMonth + "-" + cld[a].lDay;
		to_day.click_Date = cld[a].sMonth + "_" + cld[a].sDay;
		var h;
		if (cld[a].solarTerms == "" && cld[a].solarFestival == ""
				&& cld[a].lunarFestival == "") {
			h = "";
		} else {
			var solarFtv = isAdFtv(cld[a].solarFestival, adFtv);
			var lunarFtv = isAdFtv(cld[a].lunarFestival, adFtv);
			var solarFtvTmp = $.trim(solarFtv.replace(/<a.*?>/g, '').replace(
					'</a>', ''));
			var lunarFtvTmp = $.trim(lunarFtv.replace(/<a.*?>/g, '').replace(
					'</a>', ''));
			if (solarFtvTmp == lunarFtvTmp) {
				h =  "";
			} else {
				h = "";
			}
		}
		var c = "";
		if (h != "") {
			$("#info_letter").html(h);
		} else {
			$("#info_letter").html("");
		}
		$("#info_all")
				.html(
						cld[a].sYear + "年 " + (cld[a].sMonth) + "月"
								+ cld[a].sDay + "日");
		$("#info_week").html(
				"星期" + cld[a].week + ' 第'
						+ getYearWeek(cld[a].sYear, cld[a].sMonth, cld[a].sDay)
						+ '周');
		$("#info_today").text(cld[a].sDay);
		var e = [ "", "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬",
				"腊" ], k = [ "", "初一", "初二", "初三", "初四", "初五", "初六", "初七",
				"初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七",
				"十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七",
				"廿八", "廿九", "三十", "三十一", "三十二" ];
		$("#info_nong").html(
				"【" + chineseYear + "年】</span><span>"
						+ e[parseInt(cld[a].lMonth)] + "月"
						+ k[parseInt(cld[a].lDay)]);
		if (parseInt(cld[a].sYear) == 2013 && parseInt(cld[a].sMonth) == 2
				&& parseInt(cld[a].sDay) == 3) {
			$("#info_chang").html("壬辰年 葵丑月 庚子日");
			$('#shengxiao').removeClass();
			$('#shengxiao').addClass('date-base ' + shengxiaoStyle['龙']);
		} else {
			$("#info_chang").html(
					cld[a].cYear + "年 " + cld[a].cMonth + "月 " + cld[a].cDay
							+ "日");
			$('#shengxiao').removeClass();
			$('#shengxiao')
					.addClass('date-base ' + shengxiaoStyle[chineseYear]);
		}
		currentDate = cld[a].sYear
				+ "-"
				+ (parseInt(cld[a].sMonth) < 10 ? '0' + String(cld[a].sMonth)
						: String(cld[a].sMonth))
				+ "-"
				+ (parseInt(cld[a].sDay) < 10 ? '0' + String(cld[a].sDay)
						: String(cld[a].sDay));
		showSha(currentDate);
		var nowDate = new Date().format('yyyy-MM-dd');
		var d1_ar = nowDate.split('-');
		var d2_ar = currentDate.split('-');
		var nowMiliSecond = Date.UTC(d1_ar[0], d1_ar[1] - 1, d1_ar[2]);
		var targetMiliSecond = Date.UTC(d2_ar[0], d2_ar[1] - 1, d2_ar[2]);
		var passedTime = Math
				.ceil((targetMiliSecond - nowMiliSecond) / 86400000);
		var dayafterorbeforeStr = "";
		if (passedTime == 0) {
			$('.btn-today').text('今日');
			dayafterorbeforeStr = '今天';
		}
		if (passedTime < 0) {
			$('.btn-today').text('返回今日');
			dayafterorbeforeStr = Math.abs(passedTime) + "天前"
		} else if (passedTime > 0) {
			$('.btn-today').text('返回今日');
			dayafterorbeforeStr = passedTime + "天后"
		}
		$('#info_diffday').html(dayafterorbeforeStr);
		var shujiuDate = new Date(targetMiliSecond);
		var res = shujiu(shujiuDate);
		if (res != "") {
			$("#info_remark").html(res)
		} else {
			$("#info_remark").html("")
		}
		var hisUrl = '/his1.htm';
		var date = String(cld[a].sMonth)
				+ String(cld[a].sDay < 10 ? '0' + cld[a].sDay : cld[a].sDay)
	}
	if (!cld[a].realToday) {
		if (cld[a].className === "holidays") {
			$(gObj).addClass("holidays");
			$(gObj).children().append('<i>休</i>')
		} else if (cld[a].className === "works") {
			$(gObj).addClass("works");
			$(gObj).children().append('<i>班</i>')
		}
	}
	var monthCn = new Array('一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
			'十一', '十二');
	if (cld[a].lDay == 1) {
		lObj.innerHTML = "" + (cld[a].isLeap ? "" : "")
				+ monthCn[cld[a].lMonth - 1] + "月"
	} else {
		lObj.innerHTML = cDay(cld[a].lDay)
	}
	o = cld[a].lunarFestival;
	o = o.replace(/<a.*?>/g, '');
	o = o.replace('</a>', '');
	color = cld[a].color;
	o = isShowFtv(o);
	n = cld[a].solarFestival;
	n = n.replace(/<a.*?>/g, '');
	n = n.replace(/<\/a>/g, '');
	n = isShowFtv(n);
	w = cld[a].solarTerms;
	if (o.length <= 0) {
		o = n;
		o = isShowFtv(o)
	}
	if (o.length <= 0) {
		for ( var sT in solarTerm) {
			if (cld[a].solarTerms == solarTerm[sT]) {
				o = solarTerm[sT];
				color = "#0058b2";
				break
			}
		}
	}
	if (o.length > 0) {
		if (o.length > 4) {
			o = o.substr(0, 4)
		}
		if (!cld[a].realToday) {
			lObj.innerHTML = o.fontcolor(color)
		} else {
			lObj.innerHTML = o
		}
	}
}
}
}
function clsHw(m, d) {
var cls = '';
for ( var w in fFtv2013) {
if (fFtv2013[w].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
	if (Number(RegExp.$1) == (m + 1) && Number(RegExp.$2) == (d + 1)) {
		if (RegExp.$4.indexOf("*") !== -1) {
			cls = "holidays";
			break
		} else {
			if (RegExp.$4.indexOf("_") !== -1) {
				cls = "works";
				break
			}
		}
	}
}
}
return cls
}
function isShowFtv(ftv) {
ftv = ftv.replace(/<a.*?>/g, '');
ftv = ftv.replace(/<\/a>/g, '');
ftv = $.trim(ftv);
var spFtv = '国际盲人节 国际聋人节 世界青年联欢节 日本无条件投降日 国际护士节 亚非新闻工作者节 中国国医节 国际气象节 一二·九运动 世界青年节 国际大学生节 香港回归';
var ftvArr = ftv.split(' ');
var ft = '';
for ( var i in ftvArr) {
ft = $.trim(ftvArr[i]);
if ((ft.indexOf('日') != -1 && (ft.indexOf('日') + 1) == ft.length && ft != '中共建党日')
		|| spFtv.indexOf(ft) != -1) {
	ftvArr[i] = ''
}
}
return ftvArr.join(' ')
}
function isAdFtv(ftv, adFtv) {
if ($.trim(ftv) == '') {
return ''
}
var tmp = ftv;
var date = new Date();
var m = date.getMonth() + 1;
var d = date.getDate();
for ( var i in adFtv) {
tmp = tmp.replace(/<a.*?>/g, '');
tmp = tmp.replace('</a>', '');
tmp = $.trim(tmp);
i.match(/^(\d{2})(\d{2})\s+(.*?)$/);
if (Number(RegExp.$1) == m && Number(RegExp.$2) == d
		&& $.trim(RegExp.$3) == tmp) {
	ftv = '<span id="info_letter" class="jieri">' + adFtv[i] + '</span>';
	break;
}
}
return ftv;
}
function changeCld(aaa) {
if (aaa != undefined) {
yy = aaa;
}
var b, a;
b = parseInt($("#current-data").text());
a = parseInt(parseInt($('#current-data-month').text()) - 1);
tM = a;

drawCld(b, a, mm, yy);
}
var Today = new Date();
var tY = Today.getFullYear();
var tM = Today.getMonth();
var tD = Today.getDate();
var mm, yy;
var width = "200";
var offsetx = 2;
var offsety = 8;
var x = 0;
var y = 0;
var snow = 0;
var sw = 0;
var cnt = 0;
var to_day = {
id : null,
N_Date : "",
ip : "",
Y_Date : "",
click_Date : "",
jin : null
};
function pushBtm(b, h) {	

!h && showPageFun("Date");
switch (b) {
case "MU":
$('.btn-today').text('返回今日');
if (parseInt($("#current-data-month").text()) > 1) {
	$("#current-data-month").html(
			(parseInt($("#current-data-month").text()) - 1) + "月")
} else {
	$("#current-data-month").text(12 + "月");
	if (parseInt($("#current-data").text()) - 1901 > 0) {
		$("#current-data")
				.text((parseInt($("#current-data").text()) - 1) + "年")
	}
}
break;
case "MD":
$('.btn-today').text('返回今日');
if (parseInt($("#current-data-month").text()) < 12) {
	$("#current-data-month").text(
			(parseInt($("#current-data-month").text()) + 1) + "月")
} else {
	$("#current-data-month").text(1 + "月");
	if (parseInt($("#current-data").text()) - 1900 < 149) {
		$("#current-data")
				.text((parseInt($("#current-data").text()) + 1) + "年")
	}
}
break;
case "JT":
tD = Today.getDate();
$('#info_diffday').text('今天');
$("#current-data").text(Today.getFullYear() + "年");
$("#current-data-month").text((parseInt(Today.getMonth()) + 1) + "月");
break;
default:
$("#current-data").text(tY + "年");
$("#current-data-month").text((parseInt(tM) + 1) + "月");
break;
}
var yy = parseInt($('#current-data-month').text()) - 1;
changeCld(yy);

if(typeof(btnWin)=="function"){
	btnWin(b);
}
}
function mOvr(n) {
	
var b = parseInt($("#current-data-month").text()), j = parseInt($(
	"#current-data").text()), c = parseInt($("#GD" + n).text());
if (b == 2) {
if (c < lichunDate) {
	chineseYear = Animals[(j - 5) % 12];
} else {
	chineseYear = Animals[(j - 4) % 12];
}
}
var i = $("#SD" + n);
if ($.trim(i.html()) == "" && $.trim($("#LD" + n).html()) == "") {
return
}
if ($('#GD' + n).hasClass("tradition")) {
if (i.attr("rel") && i.attr("rel") == "up") {
	var g = Math.abs(cld.firstWeek - n);
	pushBtm("MU");
	var e = cld.firstWeek + cld.length - g;
	$("td").eq(e).trigger("click");
} else {
	var g = n - cld.firstWeek - cld.length;
	pushBtm("MD");
	var e = cld.firstWeek + g;
	$("td").eq(e).trigger("click");
}
return;
}
if (to_day.id != null) {
$("#GD" + to_day.id).removeClass("selected");
}
to_day.id = n;
var o, k;
var h = document.getElementById("SD" + n);
if (!$("#GD" + n).hasClass("today")) {
$("#GD" + n).addClass("selected");
}
var l = h.innerHTML - 1;
if (h.innerHTML != "") {
if (cld[l].solarTerms == "" && cld[l].solarFestival == ""
		&& cld[l].lunarFestival == "") {
	k = "";
} else {
	k = "";
	var n = "";
	if (parseInt(cld[l].sYear) > 1948) {
		n = cld[l].solarFestival;
	}
	var solarT = '';
	if (cld[l].solarTerms) {
		solarT = '<a href="http://tools.2345.com/jieqi.htm?y='
				+ parseInt(cld[l].sYear) + '&jq=' + escape(cld[l].solarTerms)
				+ '" target="blank">' + cld[l].solarTerms + '</a>';
	}
	var solarFtv = isAdFtv(n, adFtv);
	var lunarFtv = isAdFtv(cld[l].lunarFestival, adFtv);
	var solarFtvTmp = $.trim(solarFtv.replace(/<a.*?>/g, '')
			.replace('</a>', ''));
	var lunarFtvTmp = $.trim(lunarFtv.replace(/<a.*?>/g, '')
			.replace('</a>', ''));
	if (solarFtvTmp == lunarFtvTmp) {
		k = '' + solarT + " " + lunarFtv + ""
	} else {
		k = '' + solarT + " " + solarFtv + " " + lunarFtv + ""
	}
}
var a = "";
$("#info_all").html(
		cld[l].sYear + "年 " + cld[l].sMonth + "月" + cld[l].sDay + "日");
$("#info_week").html(
		"星期" + cld[l].week + ' 第'
				+ getYearWeek(cld[l].sYear, cld[l].sMonth, cld[l].sDay)
				+ '周</h3>');
var f = [ "", "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊" ], m = [
		"", "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一",
		"十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三",
		"廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十", "三十一", "三十二" ];
tD = cld[l].sDay;
$("#info_nong").html(
		"<b>【" + chineseYear + "年】</b>" + f[parseInt(cld[l].lMonth)] + "月"
				+ m[parseInt(cld[l].lDay)]);
$("#info_today").html(cld[l].sDay);
if (parseInt(cld[l].sYear) == 2013 && parseInt(cld[l].sMonth) == 2
		&& parseInt(cld[l].sDay) == 3) {
	$("#info_chang").html("壬辰年 葵丑月 庚子日");
	$('#shengxiao').removeClass();
	$('#shengxiao').addClass('date-base ' + shengxiaoStyle['龙'])
} else {
	$("#info_chang").html(
			cld[l].cYear + "年 " + cld[l].cMonth + "月 " + cld[l].cDay + "日");
	$('#shengxiao').removeClass();
	$('#shengxiao').addClass('date-base ' + shengxiaoStyle[chineseYear])
}
$("#info_letter").html(k);
to_day.click_Date = cld[l].sMonth + "_" + cld[l].sDay;
currentDate = cld[l].sYear
		+ "-"
		+ (parseInt(cld[l].sMonth) < 10 ? '0' + String(cld[l].sMonth)
				: String(cld[l].sMonth))
		+ "-"
		+ (parseInt(cld[l].sDay) < 10 ? '0' + String(cld[l].sDay)
				: String(cld[l].sDay));
showSha(currentDate);
var hisUrl = '/his1.htm';
var date = String(cld[l].sMonth)
		+ String(cld[l].sDay < 10 ? '0' + cld[l].sDay : cld[l].sDay);
var nowDate = new Date().format('yyyy-MM-dd');
var d1_ar = nowDate.split('-');
var d2_ar = currentDate.split('-');
var nowMiliSecond = Date.UTC(d1_ar[0], d1_ar[1] - 1, d1_ar[2]);
var targetMiliSecond = Date.UTC(d2_ar[0], d2_ar[1] - 1, d2_ar[2]);
var passedTime = Math.ceil((targetMiliSecond - nowMiliSecond) / 86400000);
var dayafterorbeforeStr = "";
if (passedTime == 0) {
	$('.btn-today').text('今日');
	dayafterorbeforeStr = '今天'
}
if (passedTime < 0) {
	$('.btn-today').text('返回今日');
	dayafterorbeforeStr = Math.abs(passedTime) + "天前"
} else if (passedTime > 0) {
	$('.btn-today').text('返回今日');
	dayafterorbeforeStr = passedTime + "天后"
}
$('#info_diffday').html(dayafterorbeforeStr);
var shujiuDate = new Date(targetMiliSecond);
var res = shujiu(shujiuDate);
var shujiuDate = new Date(targetMiliSecond);
var res = shujiu(shujiuDate);
if (res != "") {
	$("#info_remark").html(res)
} else {
	$("#info_remark").html("")
}
}
if(typeof(changeP)=="function"){
	changeP(currentDate);
}
}
Date.prototype.format = function(format) {
var o = {
"M+" : this.getMonth() + 1,
"d+" : this.getDate(),
"h+" : this.getHours(),
"m+" : this.getMinutes(),
"s+" : this.getSeconds(),
"q+" : Math.floor((this.getMonth() + 3) / 3),
"S" : this.getMilliseconds()
};
if (/(y+)/.test(format))
format = format.replace(RegExp.$1, (this.getFullYear() + "")
		.substr(4 - RegExp.$1.length));
for ( var k in o)
if (new RegExp("(" + k + ")").test(format))
	format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
			: ("00" + o[k]).substr(("" + o[k]).length));
return format;
};
function reEvent(e) {
var e = e || window.event;
if (e.preventDefault) {
e.preventDefault()
} else {
e.returnValue = false
}
return e
}
function showMenuAni(el, top) {
el.css("display", "block");
el.parent().addClass("active")
}
function closeMenuAni(el, top) {
el.css("display", "none");
el.parent().removeClass("active")
}
function showPageFun(p, bacFun) {
if (p) {
$("#date_count_btn").removeClass("a_4");
$("#record_saved").removeClass("a_4");
$("#date_tips").show();
if (bacFun) {
	bacFun()
}
return 1
}
}
function initial() {	
	
$('body').bind('click',	function(e) {
		if (e.target.id != 'select-year' && e.target.id != 'current-data'
				&& $(e.target).prev().attr('id') != 'current-data') {
			closeMenuAni($('#select-year'))
		}
		if (e.target.id != 'current-data-month'
				&& e.target.id != 'select-month'
				&& $(e.target).prev().attr('id') != 'current-data-month') {
			closeMenuAni($('#select-month'))
		}
		if (e.target.id != 'holiday_plan' && e.target.id != 'holiday_list'
				&& $(e.target).prev().attr('id') != 'holiday_plan') {
			closeMenuAni($('#holiday_list'))
		}
	});
	$("#holiday_plan").click(function(e) {
		var e = reEvent(e);
		if ($("#holiday_list").css("display") === "none") {
			showMenuAni($("#holiday_list"))
		} else {
			closeMenuAni($('#holiday_list'))
		}
	});
	$("#holiday_list li").click(function(e) {
		var e = reEvent(e);
		if (showPageFun("Date") == 1) {
			closeMenuAni($("#holiday_list"));
			$('#holiday_plan').html($(this).text());
			$("#current-data-month").text($(this).attr("rel") + "月");
			$("#current-data").text("2014年");
			var yy = parseInt($(this).attr('rev'));
			tD = $(this).attr('red');
			changeCld(yy)
		}
	});
	$("#current-data").click(function(e) {
		var e = reEvent(e), t = $(this);
		if ($("#select-year").css("display") === "block") {
			closeMenuAni($('#select-year'))
		} else {
			var mon_list = $("#select-month");
			closeMenuAni(mon_list);
			showMenuAni($('#select-year'));
			var tempYear = parseInt($('#current-data').text());
			var top = parseInt(tempYear - 1901) * 20;
			$('#select-year').scrollTop(top)
		}
	});
	$("#current-data-month").click(function(e) {
		var e = reEvent(e);
		var t = $(this);
		if ($("#select-month").css("display") === "block") {
			closeMenuAni($('#select-month'))
		} else {
			var year = $("#select-year");
			closeMenuAni(year);
			showMenuAni($('#select-month'))
		}
	});
	$("#select-year li,#select-month li").click(
		function(e) {
			$('.btn-today').text('返回今日');
			$('#holiday_plan').html('2014年放假安排');
			var e = reEvent(e), t = $(this);
			var temp = t.html();
			if ($(e.target).parent().attr('id') === 'select-year') {
				temp = temp.replace('年', '');
				t.text(temp);
				$("#current-data").text(t.text() + "年");
				t.html(temp + "年")
			} else {
				temp = temp.replace(/月|\s*/g, '');
				t.text(temp);
				t.html(temp + "月");
				$("#current-data-month").html(t.html())
			}
			currentDate = parseInt($('#current-data').text())
					+ "-"
					+ (parseInt($('#current-data-month').text()) < 10 ? '0'
							+ String(parseInt($('#current-data-month').text()))
							: String(parseInt($('#current-data-month').text())))
					+ "-01";
			var nowDate = new Date().format('yyyy-MM-dd');
			var d1_ar = nowDate.split('-');
			var d2_ar = currentDate.split('-');
			var nowMiliSecond = Date.UTC(d1_ar[0], d1_ar[1] - 1, d1_ar[2]);
			var targetMiliSecond = Date.UTC(d2_ar[0], d2_ar[1] - 1, d2_ar[2]);
			var passedTime = Math
					.ceil((targetMiliSecond - nowMiliSecond) / 86400000);
			var dayafterorbeforeStr = "";
			if (passedTime == 0) {
				dayafterorbeforeStr = '今天'
			}
			if (passedTime < 0) {
				dayafterorbeforeStr = Math.abs(passedTime) + "天前"
			} else if (passedTime > 0) {
				dayafterorbeforeStr = passedTime + "天后"
			}
			$('#info_diffday').html(dayafterorbeforeStr);
			var yy = parseInt($('#current-data-month').text()) - 1;
			changeCld(yy);
			closeMenuAni(t.closest(".list"))
	});
	
	
	
	
	var ttt = new Date();
	mm = ttt.getMonth();
	$("#current-data").text(tY + "年");
	$("#current-data-month").text((parseInt(tM) + 1) + "月");
	var yy = parseInt($('#current-data-month').text()) - 1;
	drawCld(tY, tM, mm, yy);
	
	
}

function showYiAndJi(date) {
return;
var year = date.substr(0, 4);
if (year < 1998 || year > 2018) {
return false
}
var jsFile = "/api/app/yjcs/" + year + ".js";
loadJs(jsFile)
}
function addFavorite() {
var url = window.location;
var name = document.title;
try {
window.external.addFavorite(url, name)
} catch (e) {
try {
	window.sidebar.addPanel(name, url, "")
} catch (e) {
	alert("您的浏览器暂不支持该功能，请使用Ctrl+D加入到收藏夹")
}
}
}
function showSha(currentDate) {

}
var getYearWeek = function(a, b, c) {
var date1 = new Date(a, parseInt(b) - 1, c), date2 = new Date(a, 0, 1), d = Math
	.round((date1.valueOf() - date2.valueOf()) / 86400000);
return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7)
};
initial();



