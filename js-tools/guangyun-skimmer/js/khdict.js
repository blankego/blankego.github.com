//廣韻class
//jquery needed. all data-arrays should be read before this class

/**=======DATA=======***/
//Reduplicate pvaancets and alternatives
doubleCets={
"丘弭":["1241","1248"],
"之少":["1678","2769"],
"古伯":["3618","3621"],
"古賣":["2453","2491"],
"士免":["1653","1663"],
"居乙":["3320","3352"],
"烏浪":["2928","2945"],
"芳万":["2601","2607"],
"苦蓋":["2446","2534"],
"語偃":["1521","2609"]
}


altCets={
	"去弭":"1241","之笑":"2769","古陌":"3618","古邁":"2491","居乞":"3352",
	"阿浪":"2928","叉萬":"2607","苦愛":"2534","語堰":"2609"};

//Syllable structure code pattern
struct_pattern=/(\d{2})?([co])([1-7])([a-z])([1-4])/;

//sjepcode map: from a-z to 16 sjeps
sjeps='通通江止止遇遇蟹蟹蟹臻臻山山效果假宕梗梗曾流流深咸咸';
function getSjep(code){return sjeps.charAt(parseInt(code,36)-10);}

/**=========Functions=============**/
//generate a object-record from given table,fields
function genRec(res,tbl,fields,idx){
	//array-like
	if(fields.length!==undefined)
		for(var i=0;i<fields.length;i++)
			res[fields[i]]=tbl[fields[i]][idx];
	//object-like
	else
		for(var attr in fields)
			res[attr]=tbl[attr][idx];
	return res;
}

//retrive exactly ONE full record or several requested 
//fields from a specific table
function find(from,by,v,fields){
	var idx;
	//firefox 3.5
	if(Array.indexOf){	//I've forgotten the {},got a HUGE TROUBLE@_@
	  if((idx=from[by].indexOf(v))<0)return null;
	}else{
//		/*debug*/alert("i'm not ff");
		for(var i=0;i<from[by].length;i++)
			if(from[by][i]==v){
				idx=i;
				break;
			}
	}
	if(idx===undefined)return null;
	var res={idx:idx};
	//get requested fields or all fields of the queried table
	return genRec(res,from,fields?fields:from,idx);
}
//Directly extract the record specified by the INDEX from the queried table
function get(from,by,idx){
	if(idx>from[by].length || idx <0)return null;
	var res={idx:idx};
	for(var attr in from)res[attr]=from[attr][idx];
	return res;
}


//retrieve a record SET from a specific table
//test can be a value or criterion function
function findAll(from,by,test,fields){
	var res=[];
	var criterion=typeof(test)=='function'?true:false;
	for(var i=0;i<from[by].length;i++)
		if(criterion? test(from[by][i]) : from[by][i]==test){
			var rec=genRec({idx:i},from,fields?fields:from,i);
			res.push(rec);
		}

//			/*debug*/console.log(res);
	return res.length? res:null;
}

//retrieve a set of continuous records from a specific table
//test is a criterion function
function findRange(from,by,test,fields){
	var res=[];
	var start=false;
	for(var i=0;i<from[by].length;i++){
		var fit=test(from[by][i]);
		if(fit){
			if(!start)start=true;
			res.push(genRec({idx:i},from,fields?fields:from,i));
		}else
			if(start)break;
	}
	return res.length?res:null;
}
			

//get syllables info by sievhiunn id or fanqie or index
function getDziohymBy(what, value, withapi){
	if(value==null)return null;
	var res;
	if(what==='id')
		res=get(dziohym,'id',parseInt(value)-1);
	else if(what=='idx')
		res=get(dziohym,'id',value);	
	else if(what==='cet'){
		//reduplicate cets
		var test=doubleCets[value];
		if(test){
			res=[];
			res.push(getDziohymBy('id',test[0],withapi));
			res.push(getDziohymBy('id',test[1],withapi));
			return res;
		}
		// alternative cets
		test=altCets[value];
		if(test){
			return [getDziohymBy('id',test,withapi)];
		}
		// normal cets
		var getIt=find(dziohym,'cet',value,[]);
//		/*debug*/alert(getIt.idx);
		return getIt?[getDziohymBy('idx',getIt.idx,withapi)]:null;		
	}

	return $.extend(res,getSylInfo(parseSylCode(res.struct),withapi));
}

//parse syllable(dziohym)-structure or hiunn(final)-structure code
//the hiunn param means final part only
function parseSylCode(code,finalonly){
	var p=struct_pattern;
	var m=code.match(p);
	if(!m)return null;
	var res={
			sjeng:m[1],
			xu:m[2],
			tonk:parseInt(m[3]),
			hey:m[4]
		};
	if(finalonly)
		res.civk=m[5];
	else
		$.extend(res,{dew:parseInt(m[5]),civk:(m[5]=='4'?1:0)});
	return res;
	
}

//parsing volumn,sequence number of rhymes and the rhymes 
var kwennmiuk=['卷一上平聲',"卷二下平聲","卷三上聲","卷四去聲","卷五入聲"];
function getMiukInfo(code){
	//*debug*/console.log(code);
	return{	kwenn:kwennmiuk[code.charAt(0)-1],
		miuk:parseInt(code.substr(2,2),10),
		hiunn:code.substr(4)
	};
}

//converting syllable structure code to human-readable infos
//with or without ipa reconstructions

function getSylInfo(code,withipa){
	var res;
	var hcode1=code.xu+code.tonk+code.hey;
	if(!withipa){
		//聲紐
		res=code.sjeng?{niov:find(sjeng,'code',code.sjeng,['niov']).niov}:{};

	}else{
		//聲紐＆聲IPA
		var sjenginfo=find(sjeng,'code',code.sjeng);
		if(!sjenginfo)return null;
		res={sjenginfo:sjenginfo,niov:sjenginfo.niov};
		//韻IPA
		res.hiunninfo=find(hiunn,'code',hcode1+code.civk,
					['dienq','phuan','hvang','liio',
					'zjew']);
	}

	//卷號、韻目號、韻目
	//*debug*/console.log(hcode1+code.dew);
	$.extend(res,getMiukInfo(find(	hiunnmiuk,'code',
					hcode1+code.dew,['miuk']).miuk));
	//呼、等、調、攝
	res.xu= code.xu=='c'?'開':'合';
	res.tonk=['一','二',
		'三子','三丑','三寅A','三寅B','四'][code.tonk-1];
	res.dew='平上去入'.substr(code.dew-1,1);
	res.sjep=getSjep(code.hey);

	return res;
}
