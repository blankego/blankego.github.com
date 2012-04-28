//jQuery needed
//shift option list
function nextOption(ops,downwards){
	
	var cnt=ops.length;
	var next=ops.index(ops.filter(":selected")) + (downwards? 1:-1);
	next=next<0?cnt-1:next>=cnt?0:next;//boundary check
	ops.eq(next).attr('selected','selected');
}

//generate IPA
scholarsid=['phuan','dienq','hvang','liio','zjew'];
scholars=['潘悟雲','鄭張尚芳','王力','李榮','邵榮芬'];
function genIPA(ym){
	var res=$('<select class="ipa"></selection>');
	for(var i=0;i<scholars.length;i++){
		res.append('<option value="'+scholarsid[i]+'">'+
				scholars[i].charAt(0)+':'+ 
				ym.sjenginfo[scholarsid[i]]+
				ym.hiunninfo[scholarsid[i]]+'</option>');

	}
	return res;
}
function search(){
	var type=$("#seektype").val();
	var val=$("#hwinput").val();
	cmd(type,val);
	
}

//toggle  hide/show button 
function toggleShowHideBtn(name,mtd,targ){
	//determin show or hide
	var show=mtd.charAt(0)=='s'?true:false;
	var btnId=targ+'toggle';
	var btn=$('#'+btnId);
	//*debug*/console.log(btn.length);
	//If there is no button there, create one
	if(btn.length===0){
		btn=$('<div id="'+btnId+'"></div>')
			.appendTo('#switches');
	}
	//the link is the opposite of the mtd
	var link='<a href="javascript:cmd(\''+(show?'hide':'show')+
		mtd.substr(4)+'\',\'' +targ+'\')">'+
		(show?'[隱藏':'[顯示')+	name +']</a>';
	btn.html(link).show();
}


var represent={
	entry:function( ent, withnav ){
		var div=$("<div class='entry'></div>");
		var nav;
		div.append("<b>【"+ ent.glyph +"】</b>")
			.append("<span class='ann'>"+//replace proof-reading signs
			  ent.ann.replace(/\[([^\/]+)\/([^\]]+)\]/g,function(str,s1,s2){
				  return s2=='-'?'<del>'+s1+'</del>':'<del>'+(s1=='-'?'+':s1)+
			 		'</del><ins>'+s2+'</ins>';})+"</span>");
		if(withnav){
		//「↑」整個小韻、「←」「→」前後辭條
			nav=$("<div class='ann_nav'></div>");
			nav.append('<a href="javascript:cmd(\'cet\','+ parseInt(ent.id) + ')">[↑]</a>');
			if(ent.idx>0)nav.append('<a href="javascript:cmd(\'char\','+(ent.idx-1)+')">(← </a>');
			if(ent.idx<kuankhiunn.id.length-1)
				nav.append('<a href="javascript:cmd(\'char\','+(ent.idx+1)+')"> →)</a>');
			div.append(nav);
		}
		return div;
	},
	ymheader:function( ym ){
		///*=debug=*/alert("yminfo:",ym.sjenginfo.zjew);
		var div=$("<div class='dziohym'></div>")
			.append($("<span class='cet'/>").text("〔"+(ym.cet?ym.cet:"＊無切＊")+"〕"))
			.append("<span class='sjeng' title='聲紐'><a href='javascript:cmd(\"locateSjeng\","+
				ym.struct.substr(0,2)+")'>"+ ym.niov 	+"</a></span>");
		var h=$('<a href="javascript:cmd(\'locateHiunn\',\''+ym.struct.substr(2,3)+(ym.dew=='入'?'1':'0')+
				'\')"></a>')
			.append("<span class='xu' title ='呼'>"		+ ym.xu 		+"</span>")
			.append("<span class='tonk' title='等'>" 	+ ym.tonk 	+"</span>")
			.append("<span class='hiunnmiuk' title='韻目'>" + ym.hiunn +
		 		"</span>")
		 	.append("<span class='dew' title='聲調'>" 	+ ym.dew 	+"</span>");
			
		div	.append(h).append(genIPA(ym))
			.append('[<a href="javascript:cmd(\'locateDzioh\',\''+ ym.sjep+ ym.id +'\')">字音表中</a>]');
		return div; 
			
			
	}
};




var seek={
	//v might be the index of the entries table
	char:function(v){
		//retrieve by idx or glyph
		var ents=(parseInt(v)==v && v>=0 && v <kuankhiunn.id.length)?
			[get(kuankhiunn,'id',v)]:findAll(kuankhiunn,'glyph',v);
			
		if(!ents)return;
		var entryview=$('#entryview').empty();
		for(var i=0;i<ents.length;i++){
			var ym=getDziohymBy('id',ents[i].id.split('.')[0],true);
			//*debug*/alert(ym.sjenginfo.zjew);
			entryview.append(represent.ymheader(ym,true))
						.append(represent.entry(ents[i],true));

		}
		$('#entryview').get(0).scrollIntoView();
	},
	
	//由反切或字音ID（idx+1）查小韻，列出小韻下所有詞條
	cet:function(v){
		var sounds=(parseInt(v)==v && v>0 && v<dziohym.id.length)?
			[getDziohymBy('id',v,true)]:getDziohymBy('cet',v,true);
		if(!sounds)return;
		var entryview=$("#entryview").empty();
		for(var i=0;i<sounds.length;i++){
			entryview.append(represent.ymheader(sounds[i]))
				.append('<hr/>');
			
			var ents=findRange(kuankhiunn,'id',
					function(ent_id){return sounds[i].id==parseInt(ent_id);});
			for(var j=0;j<ents.length;j++)
				entryview.append(represent.entry(ents[j]));
		}
		$('#entryview').get(0).scrollIntoView();
	},
	hiunn:function(v){
		var codes=findAll(hiunnmiuk,'miuk',function(it){return it.substr(4).indexOf(v)===0;});
	  	if(!codes)return;
		var test=[];
		for(var i=0;i<codes.length;i++)test.push(codes[i].code);
		test=test.join(',');
		var miukinfo=getMiukInfo(codes[0].miuk);
		var yms=findRange(dziohym,'struct',function(it){return test.indexOf(it.substr(2))>=0;});
		var glyphs=[];
		var idx=0;
		var id=yms[idx].id+'.1';

		//*debug*/console.log(idx,yms[idx]);
		for(var i=0;i<kuankhiunn.id.length;i++){
			if(id==kuankhiunn.id[i]){
				glyphs.push(kuankhiunn.glyph[i]);
				if(++idx==yms.length)break;
				id=yms[idx].id+'.1';
			}
		}
		var res=$('<div class="hiunnview"></div>')
			.append('<h3>'+ miukinfo.kwenn +"○第"+miukinfo.miuk +" " +v +"</h3><hr/>");
		for(var i=0;i<yms.length;i++)
			res.append('<span class="hiunnmiuk"><a href="javascript:cmd(\'cet\','+(yms[i].idx+1)+
					')">'+glyphs[i]+'</a>〔'+yms[i].cet +'切〕 </span>');
		$("#entryview").empty().append(res).get(0).scrollIntoView();
				
	      
	},
	table:function(sjep){
		var targ=$('#tableview');
		var tbl=rhymeTable(sjep);
		if(tbl){
			targ.empty().append(tbl);
			seek.showId('tableview');
		}
	      },
	//show hide--------------------------------
	//the following part looks sorta stupid
	//needs to be overhauled @_@
	hideId:function(id){ 
		
		if(id=='structview'){
			$('#structview').data('visible',false);
			toggleShowHideBtn('圖表','hideId',id);
			//TODO::There is a problem there:
			//div#structview couldn't close its content tables/divs
			//I don't know WHY! Anyway I have to use a alternative approach
			seek.hideId($('.struct:visible').attr('id'));		
		}
		else if($('#'+id).hasClass('struct')){
			//remove fanqie button if the to be hide
			//thing is #tableview
			if(id=='tableview')$('#fanqietoggle').hide();
		}
		$("#"+id).hide();
	},
	hideAll:function(cls){
		var name;
		if(cls=='fanqie'){
			if($("#structview").data('lastshow')!='tableview')return;

			name='反切';
			$('#tableview').data('showFanqie',false);
		}
		//Is there other possibility?
		toggleShowHideBtn(name,'hideAll',cls);
		$('.'+cls).hide();
	},
	showId:function(id){
		if(id=='structview'){
			var sv=$("#structview");
			//prevent endless recursion
			if(sv.data('visible'))return;
			sv.data('visible',true);

			toggleShowHideBtn('圖表','showId',id);
			//show last visible struct part
			if($(".struct:visible").length===0)
				seek.showId($('#structview').data('lastshow'));
		}
		else if($('#'+id).hasClass('struct')){
			//Show the parent div first!!
			seek.showId('structview');
			//Then hide its siblings!!
			var sibling=$('.struct:visible').attr('id');
			if(sibling!==undefined)seek.hideId(sibling);
			
			//TODO:cf hideId
			$('#structview').data('lastshow',id);

			//tableview is special
			if(id=='tableview')
				seek[$('#tableview').data('showFanqie')?
					'showAll':'hideAll']('fanqie');

		}
		$('#'+id).show();
	},
	showAll:function(cls){
		var name;
		if(cls=='fanqie'){
			if($("#structview").data('lastshow')!='tableview')return;
			name='反切';
			$('#tableview').data('showFanqie',true);
		}
		toggleShowHideBtn(name,'showAll',cls);
		$('.'+cls).show();
	},
	locateSjeng:function(code){
		seek.showId('sjengtable');
		$('#sjengtable td:contains('+code+')').parent().addClass('hilight').get(0).scrollIntoView();

	},
	locateHiunn:function(code){
		seek.showId('hiunntable');
		$('#hiunntable td:contains('+code+')').parent().addClass('hilight').get(0).scrollIntoView();
	},
	locateDzioh:function(pos){
		//pos is like 攝XXXX
		seek.table(pos.substr(0,1));
		$('#tableview a[id=dzioh'+pos.substr(1)+']').parent().addClass('hilight').get(0).scrollIntoView();
	},
	clearHilight:function(){
		$('.hilight').removeClass('hilight');
	}
	
};

/**--dispatcher--**/
function allCommands(hash){
	hash=decodeURIComponent(hash);
	var m=hash.match(/seek\.(.+)\(([^)]*)\)/);

	if(m && seek[m[1]]){
		var params;
		if(m[2].match(/^ *$/))	//no param
			params=null;
		else{
			params=m[2].split(',');
			for(var i=0;i<params.length;i++){
				var p=params[i];
				if(p.match(/^'.*'$|^".*"$/))	//string arg:strip the quotes
					params[i]=p.substr(1,p.length-2);
				else if(!isNaN(p))		//Number
					params[i]=Number(p);
				//else ... strings and numbers are 
				//so far only supported param types
			}
		}
	//*debug*/alert('allcommands_match:'+m[1]+"("+params.toString());
		seek[m[1]].apply(null,params);
	}
}

//----hash command maker---
//all commands will be issued  through this func,
//which convert a normal func call to a URI hash
//and revoke the $.historyLoad func of the history lib
//to get them registered in browser's history
//the format of params is: ('mtdname',arg1,...argN)
function cmd(){
	if(!arguments.length)return;
	var command=arguments[0];
	//*debug*/alert(command);
	//the obj 'seek' is the HQ of this app
	if(!seek[command])return;
	
	var args=[];
	for(var i=1;i<arguments.length;i++){
		var a=arguments[i];
		args.push(typeof(a)=='string'?"'"+a+"'":a);
	}
	var hash=encodeURIComponent('seek.'+command+'('+args.join(',')+')');
	//*debug*/alert('hash:'+hash);
	$.historyLoad(hash);
		
}


/***----------main------------***/
function inputKeyHandling(e){	
	var next;
	var code;
	if((code=' 13 38 40'.indexOf(e.keyCode))||
	       (code=' 13 38 40'.indexOf(e.which))){
		if(code===4)	//<UP>
			next=false;
		else if(code==7)	//<DOWN>
			next=true;
		else if(code==1){	//<ENTER>
			search();
			return false;
		}else
			return;
			
	
		nextOption($("#seektype>option"),next);
		return false;
	}
}
$(document).ready(function(){
	//The keyevent things between different browser are
	//pretty crappy, still could'nt figure it out!! So
	//I set different event for different browser
	var hwinput=$("#hwinput");
	if($.browser.mozilla|| $.browser.msie)
		hwinput.keypress(inputKeyHandling);
	//else if($.browser.safari)
	//	hwinput.keyup(inputKeyHandling);


	$("#submit").click(function(){search();});	
	$.historyInit(allCommands,'index.html');	
	///for debug
	///$('<button onclick="debugit()">debug</button>').appendTo('body');

});
function debugit(){
	//alert(Array.indexOf);
	alert($.browser.safari)
}


