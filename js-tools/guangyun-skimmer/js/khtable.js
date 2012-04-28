//Need jQuery
//Need khdict
/*===data===*/


tableorder={
通:"c1a1,c1a2,c1a3,c1a4,c4a1,c4a3,c4a4,c1b1,c1b2,c1b3,c1b4,c4b1,c4b2,c4b3,c4b4".split(","),
江:"c2c1,c2c2,c2c3,c2c4".split(","),
止:"c5d1,o5d1,c5d2,o5d2,c5d3,o5d3,c6d1,o6d1,c6d2,o6d2,c6d3,o6d3,c3e1,o3e1,c3e2,o3e2,c3e3,o3e3,c4e1,c4e2,c4e3,c5e1,o5e1,c5e2,o5e2,c5e3,o5e3,c6e1,o6e1,c6e2,o6e2,c6e3,o6e3".split(","),
遇:"c4f1,c4f2,c4f3,c1g1,c1g2,c1g3,o4g1,o4g2,o4g3".split(","),
蟹:"c1h3,o1h3,c2h3,o2h3,c3h3,o3h3,c4h2,c1i1,o1i1,c1i2,o1i2,c1i3,o1i3,c2i1,o2i1,c2i2,c2i3,o2i3,c4i1,c5i3,o5i3,c6i3,o6i3,c7i1,o7i1,c7i2,c7i3,o7i3,c2j1,o2j1,c2j2,o2j2,c2j3,o2j3".split(","),
臻:"c1k1,o1k1,c1k2,o1k2,c1k3,o1k3,c1k4,o1k4,c3k1,o3k1,c3k2,o3k2,c3k3,o3k3,c3k4,o3k4,c5k1,o5k1,c5k2,o5k2,c5k3,o5k3,c5k4,o5k4,c6k1,o6k1,c6k2,o6k2,c6k3,c6k4,o6k4,c6l1,c6l2,c6l3,c6l4".split(","),
山:"c1m1,o1m1,c1m2,o1m2,c1m3,o1m3,c1m4,o1m4,c2m1,o2m1,c2m2,o2m2,c2m3,o2m3,c2m4,o2m4,c3m1,o3m1,c3m2,o3m2,c3m3,o3m3,c3m4,o3m4,c1n4,c2n1,o2n1,c2n2,o2n2,c2n3,o2n3,c2n4,o2n4,c5n1,o5n1,c5n2,o5n2,c5n3,o5n3,c5n4,o5n4,c6n1,o6n1,c6n2,o6n2,c6n3,o6n3,c6n4,o6n4,c7n1,o7n1,c7n2,o7n2,c7n3,o7n3,c7n4,o7n4".split(","),
效:"c1o1,c1o2,c1o3,c2o1,c2o2,c2o3,c5o1,c5o2,c5o3,c6o1,c6o2,c6o3,c7o1,c7o2,c7o3".split(","),
果:"c1p1,o1p1,c1p2,o1p2,c1p3,o1p3,c3p1,o3p1,o3p2".split(","),
假:"c2q1,o2q1,c2q2,o2q2,c2q3,o2q3,c4q1,c4q2,c4q3".split(","),
宕:"c1r1,o1r1,c1r2,o1r2,c1r3,o1r3,c1r4,o1r4,c4r1,o4r1,c4r2,o4r2,c4r3,o4r3,c4r4,o4r4".split(","),
梗:"c2s1,o2s1,c2s2,o2s2,c2s3,o2s3,c2s4,o2s4,c3s1,o3s1,c3s2,o3s2,c3s3,o3s3,c3s4,o3s4,c2t1,o2t1,c2t2,c2t3,o2t3,c2t4,o2t4,c4t1,o4t1,c4t2,o4t2,c4t3,o4t3,c4t4,o4t4,c7t1,o7t1,c7t2,o7t2,c7t3,c7t4,o7t4".split(","),
曾:"c1u1,o1u1,c1u2,c1u3,c1u4,o1u4,c4u1,c4u2,c4u3,c4u4,o4u4".split(","),
流:"c1v1,c1v2,c1v3,c4v1,c4v2,c4v3,c4w1,c4w2,c4w3".split(","),
深:"c5x1,c5x2,c5x3,c5x4,c6x1,c6x2,c6x3,c6x4".split(","),
咸:"c1y1,c1y2,c1y3,c1y4,c2y1,c2y2,c2y3,c2y4,c3y1,c3y2,c3y3,c3y4,c1z1,c1z2,c1z3,c1z4,c2z1,c2z2,c2z3,c2z4,o3z1,o3z2,o3z3,o3z4,c5z1,c5z2,c5z3,c5z4,c6z1,c6z2,c6z3,c6z4,c7z1,c7z2,c7z3,c7z4".split(",")
}

//prepair empty jagged array as a new row of the table
function initRow(){
	return [[,,,,],[,,,,,],[,,,,],[,,,,,],[,,,,,],[,,,,,,],[,,,,],[,,,,,]];
}
function getSjengHeader(){
	return "<tr><th></th><th>" + sjeng.niov.join("</th><th>")+"</th></tr>";
}
function rhymeTable(sjep){
	var res=$("<table class='rhyme_table'></table>").append(getSjengHeader());
	
	var thru=tableorder[sjep];
	if(!thru)return;
	for(var i=0;i<thru.length;i++){
		var r=initRow();
		var yms=findRange(dziohym,'struct',function(c){return c.substr(2)==thru[i];});
		var n=0;
		var ym=yms[n]; 
		var id=ym.id+'.1';
		//The scan of 廣韻 table is accompanying the scan of the selected row
		//No iteration embedded in another iteration, in this manner, hopefully
		//the efficiency could be improved ^_^!! 
		for(var j=0;j<kuankhiunn.id.length;j++){
			if(kuankhiunn.id[j]==id){
				var code=ym.struct;
				//*debug*/console.log(code);
				r[code.charAt(0)-1][code.charAt(1)-1]=
					"<a class='dzioh' id='dzioh" +
					ym.id + "' title='"+ ym.cet +
					// use link as a event trigger
					"切' href='javascript:cmd(\"cet\","+ym.id+")'>"+
					kuankhiunn.glyph[j] + "</a>" +
					"<a class='fanqie' href='javascript:cmd(\"cet\",\""+
				       	ym.cet+"\")'>"+ ym.cet + "</a>";
				//move to next cell
				if(++n>=yms.length)break;
				else{
					ym=yms[n];
					id=ym.id+'.1';
				}
			}
		}
		//join individual initial groups
		for(var k=0;k<r.length;k++)
			r[k]=r[k].join("</td><td>");
		//generating Final info to be used as row-header
		var hinfo=getSylInfo(parseSylCode(thru[i]));
		res.append( "<tr><th>"+hinfo.hiunn+hinfo.xu+ hinfo.tonk+ hinfo.dew+
			"</th><td>" + r.join("</td><td>") +"</td></th>");
		
		//==============bind events=========================
//		res.find(".dzioh").click(function(){issueCommand('cet',this.id.substr(5));});
//		res.find(".fanqie").click(function(){issueCommand('cet',this.innerHTML)}).hide();
	}	
	return res.append(getSjengHeader());
}

function finalTable(){
}
