var div_identity="";
var downtime=0;
var divmake=0;
var drag=0;
var edit=0;
var resize=0;
var res_hold="";
var res_bin="0";
var res_init="0";
var res_cursor="";
var count=0;
var res_poly5_in_out="";
var color=0;
var colorbox_id="";
var colorbox_y=0;
var colorbox_r=0;
var colorbox_g=0;
var colorbox_b=0;
var colorbox_a=0;
var colorbox_last_y=0;
var colorbox_finalcolor="";
function svgbox(coord,c) 
{
	var nm="poly"+c;
	var poly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
	poly.setAttribute('id',nm);
	poly.setAttribute('points',coord);
	if(nm!=="poly5")poly.setAttribute('fill',"white");
	if(nm==="poly5")poly.setAttribute('fill',"#ffffff00");
	poly.setAttribute("stroke", "red");
	poly.setAttribute("stroke-width",1);
	if(nm==="poly5")poly.setAttribute("stroke-dasharray","20,10,5,5,5,10");
	if(color===1 && nm!=="poly5")document.getElementById('rgba').appendChild(poly);
	else if(color===0 || nm==="poly5")document.getElementById('svg').appendChild(poly);
}
function sbox(x,y)
{
	var sx=x+10;
	var sy=y+10;
	var pt="";
	for(var c=1;c<5;c++)
	{
		var x1=x+11;
		var sx1=x1+10;
		var y1=y+11;
		var sy1=y1+10;
		var a0=x+5;
		var a1=y+5;
		var b0=x1+5;
		var b1=y+5;
		var c0=x+5;
		var c1=y1+5;
		var d0=x1+5;
		var d1=y1+5;
		if(c===1)pt=x+","+y+" "+sx+","+y+" "+sx+","+sy+" "+x+","+sy;
		else if(c===2)pt=x1+","+y+" "+sx1+","+y+" "+sx1+","+sy+" "+x1+","+sy;
		else if(c===3)pt=x+","+y1+" "+sx+","+y1+" "+sx+","+sy1+" "+x+","+sy1;
		else if(c===4)pt=x1+","+y1+" "+sx1+","+y1+" "+sx1+","+sy1+" "+x1+","+sy1;
		else if(c===5)pt=a0+","+a1+" "+b0+","+b1+" "+c0+","+c1+" "+d0+","+d1;
		svgbox(pt,c);
	}
}
function fbox(x,y)
{
	var sx=x+5;
	var sy=y+5;
	var pt=sx+","+sy+" "+sx+","+sy+" "+sx+","+sy+" "+sx+","+sy;
	svgbox(pt,5);
}
function remove_svgbox(dt)
{
	if(dt===1)
	for(var c=1;c<6;c++)
	{
		var nm="poly"+c;
		var element = document.getElementById(nm);
		element.parentNode.removeChild(element); 
	}
	console.log("remove_svgbox");
}
function remove_poly5()
{
	var element = document.getElementById("poly5");
	element.parentNode.removeChild(element); 
	console.log("remove_poly5");
}
function start()
{
	var pe=document.getElementById("svg");
	pe.style.pointerEvents="none";
	document.documentElement.addEventListener("mousedown",function(e)
	{
		if(document.getElementsByTagName("polygon").length!==0 && resize===0 && color===0 && colorbox_id==="")
		remove_svgbox(1);
		if(divmake===1)//add more options of navbar conditions in or "||"
		{
			pe.style.pointerEvents="auto";
			document.getElementById("svg").style.cursor = "crosshair";
			var x=e.clientX;
			var y=e.clientY;
			fbox(x,y);
			sbox(x,y);
			downtime=1;
		}
		if(res_init==="1")
		{
			res_bin=1;
			if(res_cursor!=="")div_cursor(res_cursor);
			console.log(res_bin);
		}
		else if(res_poly5_in_out==="0"  && resize===1)
		{
			console.log("0");
			res_off_on();
			
		}
		else if(res_poly5_in_out==="1"  && resize===1)
		{
			console.log("1");
		}
	});
	document.documentElement.addEventListener("mouseup",function(e)
	{
		if(colorbox_id==="poly1")colorbox_r=colorbox_last_y;
		else if(colorbox_id==="poly2")colorbox_g=colorbox_last_y;
		else if(colorbox_id==="poly3")colorbox_b=colorbox_last_y;
		else if(colorbox_id==="poly4")colorbox_a=colorbox_last_y;
		document.getElementById("svg").style.cursor = "initial";
		if(divmake===1)divcall();
		if(color===1 && colorbox_id!=="")document.getElementById(div_identity).style.background=colorbox_finalcolor;		
		if(colorbox_id==="")remove_svgbox(downtime);
		colorbox_id="";
		downtime=0;
		var pe=document.getElementById("svg");
		if(resize===0)pe.style.pointerEvents="none";
		res_bin="0";
		res_hold="";
	});
	document.documentElement.addEventListener("mousemove",function(e)
	{
		if(res_bin!=="0")
		{
			console.log(res_hold);
			if(res_hold==="poly1")
			{
				var id="poly4";
				resizable(e,id);
				poly_adjust();
			}
			else if(res_hold==="poly2")
			{
				var id="poly3";
				resizable(e,id);
				poly_adjust();
			}
			else if(res_hold==="poly3")
			{
				var id="poly2";
				resizable(e,id);
				poly_adjust();
			}
			else if(res_hold==="poly4")
			{
				var id="poly1";
				resizable(e,id);
				poly_adjust();
			} 
		}
		else if(color===1 && colorbox_id!=="")
		{
			console.log("mousemove");
			poly_colorizer(e);
			console.log(colorbox_y);
		}
	});
	function poly_colorizer(e)
	{
		var color_range=0;
		if(colorbox_id==="poly1")color_range=colorbox_r;
		else if(colorbox_id==="poly2")color_range=colorbox_g;
		else if(colorbox_id==="poly3")color_range=colorbox_b;
		else if(colorbox_id==="poly4")color_range=colorbox_a;
		var refer_pt=document.getElementById(colorbox_id).getAttribute("points");
		var refer_cod=refer_pt.split(" ");
		var rm=refer_cod[0].split(",");
		var rn=refer_cod[1].split(",");
		var ro=refer_cod[2].split(",");
		var rp=refer_cod[3].split(",");
		var y=parseInt(rm[1]);
		var y_org=parseInt(rm[1]);
		y=e.clientY-colorbox_y+color_range;
		var sy=y+10;
		if(y>=0 && y<=255)
		{
			var pt=rm[0]+","+y+" "+rn[0]+","+y+" "+ro[0]+","+sy+" "+rp[0]+","+sy;
			document.getElementById(colorbox_id).setAttribute("points",pt);			
			console.log(y);
			colorbox_last_y=y;
			var poly=document.getElementById("poly5");
			var ccol="#";
			var color_r="";
			var color_g="";
			var color_b="";
			var color_a="";
			var color_temp="";
			if(colorbox_r<10)color_r="0"+colorbox_r.toString(16);
			else if(colorbox_r>=10)color_r=colorbox_r.toString(16);
			if(colorbox_g<10)color_g="0"+colorbox_g.toString(16);
			else if(colorbox_g>=10)color_g=colorbox_g.toString(16);
			if(colorbox_b<10)color_b="0"+colorbox_b.toString(16);
			else if(colorbox_b>=10)color_b=colorbox_b.toString(16);
			if(colorbox_a<10)color_a="0"+colorbox_a.toString(16);
			else if(colorbox_a>=10)color_a=colorbox_a.toString(16);
			if(y<10)color_temp="0"+y.toString(16);
			else if(y>=10)color_temp=y.toString(16);
			if(colorbox_id==="poly1")ccol="#"+color_temp+color_g+color_b+color_a;
			else if(colorbox_id==="poly2")ccol="#"+color_r+color_temp+color_b+color_a;
			else if(colorbox_id==="poly3")ccol="#"+color_r+color_g+color_temp+color_a;
			else if(colorbox_id==="poly4")ccol="#"+color_r+color_g+color_b+color_temp;
			poly.setAttribute("fill",ccol);
			console.log(ccol);
			colorbox_finalcolor=ccol;		
		}
	}
	function poly_adjust()
	{
		var pt=document.getElementById("poly5").getAttribute("points");
		var cod=pt.split(" ");
		var m=cod[0].split(",");
		var n=cod[1].split(",");
		var o=cod[2].split(",");
		var p=cod[3].split(",");
		var a=document.getElementById(div_identity);
		a.style.height=parseInt(p[1])-parseInt(m[1])+"px";
		a.style.width=parseInt(n[0])-parseInt(m[0])+"px";
		a.style.left=parseInt(m[0])+"px";
		a.style.top=parseInt(m[1])+"px";
	}
	function resizable(e,idd)
	{
		var refer_pt=document.getElementById(idd).getAttribute("points");
		var condition="";
		if(idd==="poly1")
		{
			var refer_cod=refer_pt.split(" ");
			var rm0=refer_cod[0].split(",");
			var rm1=[(parseInt(rm0[0])+11),rm0[1]];
			var rm2=[rm0[0],(parseInt(rm0[1])+11)];
			var rm3=[(parseInt(rm0[0])+11),(parseInt(rm0[1])+11)];
			var rm4=[(parseInt(rm0[0])+5),(parseInt(rm0[1])+5)];
			if(e.clientX>=(parseInt(rm0[0])+35) && e.clientY>=(parseInt(rm0[1])+35))condition="1";
		}
		else if(idd==="poly2")
		{
			var refer_cod=refer_pt.split(" ");
			var rm1=refer_cod[0].split(",");
			var rm0=[(parseInt(rm1[0])-11),rm1[1]];
			var rm2=[(parseInt(rm1[0])-11),(parseInt(rm1[1])+11)];
			var rm3=[rm1[0],(parseInt(rm1[1])+11)];
			var rm4=[(parseInt(rm1[0])-5),(parseInt(rm0[1])+5)];
			if(e.clientX<=(parseInt(rm1[0])-30) && e.clientY>=(parseInt(rm1[1])+30))condition="2";
		}
		else if(idd==="poly3")
		{
			var refer_cod=refer_pt.split(" ");
			var rm2=refer_cod[0].split(",");
			var rm0=[rm2[0],(parseInt(rm2[1])-11)];
			var rm1=[(parseInt(rm2[0])+11),(parseInt(rm2[1])-11)];
			var rm3=[(parseInt(rm2[0])+11),rm2[1]];
			var rm4=[(parseInt(rm2[0])+5),(parseInt(rm2[1])-5)];
			if(e.clientX>=(parseInt(rm2[0])+30) && e.clientY<=(parseInt(rm2[1])-30))condition="3";
		}
		else if(idd==="poly4")
		{
			var refer_cod=refer_pt.split(" ");
			var rm3=refer_cod[0].split(",");
			var rm0=[(parseInt(rm3[0])-11),(parseInt(rm3[1])-11)];
			var rm1=[rm3[0],(parseInt(rm3[1])-11)];
			var rm2=[(parseInt(rm3[0])-11),rm3[1]];
			var rm4=[(parseInt(rm3[0])-5),(parseInt(rm3[1])-5)];
			if(e.clientX<=(parseInt(rm3[0])-30) && e.clientY<=(parseInt(rm3[1])-30))condition="4";
		}
		for(var c=1;c<6;c++)
		{
			var nm="poly"+c;
			var pt=document.getElementById(nm).getAttribute("points");
			var cod=pt.split(" ");
			var m=cod[0].split(",");
			var n=cod[1].split(",");
			var o=cod[2].split(",");
			var p=cod[3].split(",");
			if(condition==="1")
			{
				if(c===2)
				{
					m[0]=e.clientX;
					n[0]=e.clientX+10;
					o[0]=e.clientX+10;
					p[0]=e.clientX;
					pt=m[0]+","+m[1]+" "+n[0]+","+n[1]+" "+o[0]+","+o[1]+" "+p[0]+","+p[1];
					document.getElementById(nm).setAttribute("points",pt);	
				}
				else if(c===3)
				{
					m[1]=e.clientY;
					n[1]=e.clientY;
					o[1]=e.clientY+10;
					p[1]=e.clientY+10;
					pt=m[0]+","+m[1]+" "+n[0]+","+n[1]+" "+o[0]+","+o[1]+" "+p[0]+","+p[1];
					document.getElementById(nm).setAttribute("points",pt);
				}
				else if(c===4)
				{
					m[0]=e.clientX;
					n[0]=e.clientX+10;
					o[0]=e.clientX+10;
					p[0]=e.clientX;
					m[1]=e.clientY;
					n[1]=e.clientY;
					o[1]=e.clientY+10;
					p[1]=e.clientY+10;
					pt=m[0]+","+m[1]+" "+n[0]+","+n[1]+" "+o[0]+","+o[1]+" "+p[0]+","+p[1];
					document.getElementById(nm).setAttribute("points",pt);
				}
				else if(c===5)
				{
					var a=parseInt(rm0[0]);
					var b=parseInt(rm0[1]);
					m[0]=a+5;
					m[1]=b+5;
					n[0]=e.clientX+5;
					n[1]=b+5;
					o[0]=e.clientX+5;
					o[1]=e.clientY+5;
					p[0]=a+5;
					p[1]=e.clientY+5;
					pt=m[0]+","+m[1]+" "+n[0]+","+n[1]+" "+o[0]+","+o[1]+" "+p[0]+","+p[1];
					document.getElementById(nm).setAttribute("points",pt);
				}
			}
			else if(condition==="2")
			{
				if(c===1)
				{
					m[0]=e.clientX;
					n[0]=e.clientX+10;
					o[0]=e.clientX+10;
					p[0]=e.clientX;
				}
				else if(c===3)
				{
					m[0]=e.clientX;
					n[0]=e.clientX+10;
					o[0]=e.clientX+10;
					p[0]=e.clientX;
					m[1]=e.clientY;
					n[1]=e.clientY;
					o[1]=e.clientY+10;
					p[1]=e.clientY+10;
				}
				else if(c===4)
				{
					m[1]=e.clientY;
					n[1]=e.clientY;
					o[1]=e.clientY+10;
					p[1]=e.clientY+10;
				}
				else if(c===5)
				{
					var a=parseInt(rm1[0]);
					var b=parseInt(rm1[1]);
					m[0]=e.clientX+5;
					m[1]=b+5;
					n[0]=a+5;
					n[1]=b+5;
					o[0]=a+5;
					o[1]=e.clientY+5;
					p[0]=e.clientX+5;
					p[1]=e.clientY+5;
				}
				pt=m[0]+","+m[1]+" "+n[0]+","+n[1]+" "+o[0]+","+o[1]+" "+p[0]+","+p[1];
				document.getElementById(nm).setAttribute("points",pt);
			}
			else if(condition==="3")
			{
				if(c===1)
				{
					m[1]=e.clientY;
					n[1]=e.clientY;
					o[1]=e.clientY+10;
					p[1]=e.clientY+10;
				}
				else if(c===2)
				{
					m[0]=e.clientX;
					n[0]=e.clientX+10;
					o[0]=e.clientX+10;
					p[0]=e.clientX;
					m[1]=e.clientY;
					n[1]=e.clientY;
					o[1]=e.clientY+10;
					p[1]=e.clientY+10;
				}
				else if(c===4)
				{
					m[0]=e.clientX;
					n[0]=e.clientX+10;
					o[0]=e.clientX+10;
					p[0]=e.clientX;
				}
				else if(c===5)
				{
					var a=parseInt(rm2[0]);
					var b=parseInt(rm2[1]);
					m[0]=a+5;
					m[1]=e.clientY+5;
					n[0]=e.clientX+5;
					n[1]=e.clientY+5;
					o[0]=e.clientX+5;
					o[1]=b+5;
					p[0]=a+5;
					p[1]=b+5;
				}
				pt=m[0]+","+m[1]+" "+n[0]+","+n[1]+" "+o[0]+","+o[1]+" "+p[0]+","+p[1];
				document.getElementById(nm).setAttribute("points",pt);
			}
			else if(condition==="4")
			{
				if(c===1)
				{
					m[0]=e.clientX;
					n[0]=e.clientX+10;
					o[0]=e.clientX+10;
					p[0]=e.clientX;
					m[1]=e.clientY;
					n[1]=e.clientY;
					o[1]=e.clientY+10;
					p[1]=e.clientY+10;
				}
				else if(c===2)
				{
					m[1]=e.clientY;
					n[1]=e.clientY;
					o[1]=e.clientY+10;
					p[1]=e.clientY+10;
				}
				else if(c===3)
				{					
					m[0]=e.clientX;
					n[0]=e.clientX+10;
					o[0]=e.clientX+10;
					p[0]=e.clientX;
				}
				else if(c===5)
				{
					var a=parseInt(rm3[0]);
					var b=parseInt(rm3[1]);
					m[0]=e.clientX+5;
					m[1]=e.clientY+5;
					n[0]=a+5;
					n[1]=e.clientY+5;
					o[0]=a+5;
					o[1]=b+5;
					p[0]=e.clientX+5;
					p[1]=b+5;
				}
				pt=m[0]+","+m[1]+" "+n[0]+","+n[1]+" "+o[0]+","+o[1]+" "+p[0]+","+p[1];
				document.getElementById(nm).setAttribute("points",pt);
			}		
		}	
	}
	document.getElementById("svg").addEventListener("mousemove",function(e)
	{
		if(downtime===1)
		{
			var refer_pt=document.getElementById("poly1").getAttribute("points");
			var refer_cod=refer_pt.split(" ");
			var rm0=refer_cod[0].split(",");
			var rm1=[(parseInt(rm0[0])+11),rm0[1]];
			var rm2=[rm0[0],(parseInt(rm0[1])+11)];
			var rm3=[(parseInt(rm0[0])+11),(parseInt(rm0[1])+11)];
			var rm4=[(parseInt(rm0[0])+5),(parseInt(rm0[1])+5)];
			if(e.clientX>=(parseInt(rm0[0])+12) && e.clientY>=(parseInt(rm0[1])+12))
			{
				for(var c=2;c<6;c++)
				{
					var nm="poly"+c;
					var pt=document.getElementById(nm).getAttribute("points");
					var cod=pt.split(" ");
					var m=cod[0].split(",");
					var n=cod[1].split(",");
					var o=cod[2].split(",");
					var p=cod[3].split(",");
					if(c===2)
					{
						m[0]=e.clientX;
						n[0]=e.clientX+10;
						o[0]=e.clientX+10;
						p[0]=e.clientX;
						pt=m[0]+","+m[1]+" "+n[0]+","+n[1]+" "+o[0]+","+o[1]+" "+p[0]+","+p[1];
						if(rm1[0]<=m[0] && rm1[1]<=m[1])
						document.getElementById(nm).setAttribute("points",pt);
					}
					else if(c===3)
					{
						m[1]=e.clientY;
						n[1]=e.clientY;
						o[1]=e.clientY+10;
						p[1]=e.clientY+10;
						pt=m[0]+","+m[1]+" "+n[0]+","+n[1]+" "+o[0]+","+o[1]+" "+p[0]+","+p[1];
						if(rm2[0]<=m[0] && rm2[1]<=m[1])
						document.getElementById(nm).setAttribute("points",pt);
					}
					else if(c===4)
					{
						m[0]=e.clientX;
						n[0]=e.clientX+10;
						o[0]=e.clientX+10;
						p[0]=e.clientX;
						m[1]=e.clientY;
						n[1]=e.clientY;
						o[1]=e.clientY+10;
						p[1]=e.clientY+10;
						pt=m[0]+","+m[1]+" "+n[0]+","+n[1]+" "+o[0]+","+o[1]+" "+p[0]+","+p[1];
						if(rm3[0]<=m[0] && rm3[1]<=m[1])
						document.getElementById(nm).setAttribute("points",pt);
					}
					else if(c===5)
					{
						var a=parseInt(rm0[0]);
						var b=parseInt(rm0[1]);
						m[0]=a+5;
						m[1]=b+5;
						n[0]=e.clientX+5;
						n[1]=b+5;
						o[0]=e.clientX+5;
						o[1]=e.clientY+5;
						p[0]=a+5;
						p[1]=e.clientY+5;
						pt=m[0]+","+m[1]+" "+n[0]+","+n[1]+" "+o[0]+","+o[1]+" "+p[0]+","+p[1];
						if(rm4[0]<=m[0] && rm4[1]<=m[1] && rm4[0]<=n[0] && rm4[1]<=n[1] && rm4[0]<=o[0] && rm4[1]<=o[1] && rm4[0]<=p[0] && rm4[1]<=p[1])
						document.getElementById(nm).setAttribute("points",pt);
					}	
				}					
			}
		}
	});
}
document.getElementById("div_b").addEventListener("click",function(e)
{
	if(divmake===0)
	{
		divmake=1;
		document.getElementById("div_b").style.background="red";
		if(drag===1)
		{
			drag=0;
			document.getElementById("drag_b").style.background="";
			fbody_select_all_drag();
			console.log("Drag Mode Off");
		}
		else if(edit===1)
		{
			edit=0;
			document.getElementById("edit_b").style.background="";
			fbody_select_all_edit(edit);
			console.log("Edit Mode Off");
		}
		else if(resize===1)
		{
			resize=0;
			var pe=document.getElementById("svg");
			pe.style.pointerEvents="none";
			document.getElementById("res_b").style.background="";
			res_cursor="";
			console.log("Resize Mode Off");
		}
		else if(color===1)
		{
			color=0;
			if(document.getElementsByTagName("polygon").length!==0)remove_svgbox(1);//poly5
			colorbox_id="";
			colorbox_y=0;
			colorbox_r=0;
			colorbox_g=0;
			colorbox_b=0;
			colorbox_a=0;
			colorbox_last_y=0;
			document.getElementById("color_b").style.background="";
			document.getElementById("rgb_b").style.display="";
		}

	}
	else if(divmake===1)
	{
	divmake=0;
	document.getElementById("div_b").style.background="";
	}
});
function divcall()
{
	var pt=document.getElementById("poly5").getAttribute("points");
	var cod=pt.split(" ");
	var m=cod[0].split(",");
	var n=cod[1].split(",");
	var o=cod[2].split(",");
	var p=cod[3].split(",");
	var a=document.createElement("div");
	a.id="div_"+count;
	count+=1;
	a.style.background="red";
	a.style.height=parseInt(p[1])-parseInt(m[1])+"px";
	a.style.width=parseInt(n[0])-parseInt(m[0])+"px";
	a.style.left=parseInt(m[0])+"px";
	a.style.top=parseInt(m[1])+"px";
	a.style.position="fixed";
	a.setAttribute("state","0");
	a.setAttribute("contenteditable","false");
	a.style.zIndex="1";
	a.dc_param=a.id;
	a.addEventListener("click",div_control,false);
	document.getElementById("fbody").appendChild(a);
}
function identity_div(clicked_id)
{
	div_identity=clicked_id;
}
function div_control(e)
{
	var a=document.getElementById(e.target.dc_param);
	identity_div(e.target.dc_param);
	if(resize===1)
	{
		var x=a.style.left;
		var y=a.style.top;
		var wid=a.style.width;
		var hyt=a.style.height;
		wid=wid.replace("px","");
		hyt=hyt.replace("px","");
		wid=parseInt(wid);
		hyt=parseInt(hyt);
		x=x.replace("px","");
		y=y.replace("px","");
		x=parseInt(x-5);
		y=parseInt(y-5);
		var x1=x+(wid);
		var y1=y+(hyt);
		rez_fbox(x,y,x1,y1);
		rez_sbox(x,y,x1,y1);
		var pe=document.getElementById("svg");
		pe.style.pointerEvents="auto";
		for(var ct=1;ct<5;ct++)
		{
			var nm="poly"+ct;
			var a=document.getElementById(nm);
			a.setAttribute("res_con","0");
			a.addEventListener("mouseout",res_condition_o,false);
			a.addEventListener("mouseover",div_cursor,false);
		}
		document.getElementById("poly5").addEventListener("mouseover",res_poly5_in,false);
		document.getElementById("poly5").addEventListener("mouseout",res_poly5_out,false);
	}
	else if(color===1)
	{
		if(document.getElementsByTagName("polygon").length!==0 && colorbox_id==="")remove_svgbox(1);//poly5
		var x=a.style.left;
		var y=a.style.top;
		var wid=a.style.width;
		var hyt=a.style.height;
		wid=wid.replace("px","");
		hyt=hyt.replace("px","");
		wid=parseInt(wid);
		hyt=parseInt(hyt);
		x=x.replace("px","");
		y=y.replace("px","");
		x=parseInt(x-5);
		y=parseInt(y-5);
		var x1=x+(wid);
		var y1=y+(hyt);
		rez_fbox(x,y,x1,y1);
		console.log(color);
		document.getElementById("poly5").setAttribute("fill",a.style.background);
		var rgb=window.getComputedStyle(document.getElementById("poly5")).fill;
		rgb=rgb.replace("rgb","");
		rgb=rgb.replace("(","");
		rgb=rgb.replace(" ","");
		rgb=rgb.replace(" ","");
		rgb=rgb.replace(")","");
		var rgb_array=rgb.split(",");
		if(rgb_array[3]===undefined)rgb_array.push("255");
		for(var rg=0;rg<4;rg++)rgb_array[rg]=parseInt(rgb_array[rg]);
		var r=document.getElementById("rgba");
		wid=r.style.width;
		hyt=r.style.height;
		wid=wid.replace("px","");
		hyt=hyt.replace("px","");
		wid=parseInt(wid);
		hyt=parseInt(hyt);
		colorbox_r=rgb_array[0];
		colorbox_g=rgb_array[1];
		colorbox_b=rgb_array[2];
		colorbox_a=rgb_array[3];
		for(var ct=1;ct<5;ct++)
		{
			if(ct===1)color_sbox((1),(5+rgb_array[0]),ct);
			else if(ct===2)color_sbox((12),(5+rgb_array[1]),ct);
			else if(ct===3)color_sbox((23),(5+rgb_array[2]),ct);
			else if(ct===4)color_sbox((34),(5+rgb_array[3]),ct);
					
		}
	}
}
function color_sbox(x,y,c)
{
	var sx=x+10;
	var sy=y+10;
	var pt=x+","+y+" "+sx+","+y+" "+sx+","+sy+" "+x+","+sy;
	svgbox(pt,c);
	document.getElementById("poly"+c).addEventListener("mousedown",color_drag1,false);
}
function color_drag1(e)
{
	colorbox_id=e.target.id;
	console.log(colorbox_id);
	var a=e.clientY;
	colorbox_y=a;
	console.log(colorbox_y);			
}
function res_poly5_in(e)
{
	res_poly5_in_out="1";
}
function res_poly5_out(e)
{
	res_poly5_in_out="0";
}
function div_cursor(e)
{
	var id=e.target.id;
	var num=id.replace("poly","");
	num=parseInt(num);
	if(num===1)document.getElementById(id).style.cursor="nw-resize";
	else if(num===2)document.getElementById(id).style.cursor="ne-resize";
	else if(num===3)document.getElementById(id).style.cursor="ne-resize";
	else if(num===4)document.getElementById(id).style.cursor="nw-resize";
	res_init="1";
	res_cursor=e;
	var a=document.getElementById(e.target.id);
	res_hold=a.id;
}
function res_condition_o(e)
{
	res_init="0";
}
function rez_sbox(x,y,x1,y1)
{
	var sx=x+10;
	var sy=y+10;
	var pt="";
	for(var c=1;c<5;c++)
	{
		var sx1=x1+10;
		var sy1=y1+10;
		var a0=x+5;
		var a1=y+5;
		var b0=x1+5;
		var b1=y+5;
		var c0=x+5;
		var c1=y1+5;
		var d0=x1+5;
		var d1=y1+5;
		if(c===1)pt=x+","+y+" "+sx+","+y+" "+sx+","+sy+" "+x+","+sy;
		else if(c===2)pt=x1+","+y+" "+sx1+","+y+" "+sx1+","+sy+" "+x1+","+sy;
		else if(c===3)pt=x+","+y1+" "+sx+","+y1+" "+sx+","+sy1+" "+x+","+sy1;
		else if(c===4)pt=x1+","+y1+" "+sx1+","+y1+" "+sx1+","+sy1+" "+x1+","+sy1;
		svgbox(pt,c);
	}
}
function rez_fbox(x,y,x1,y1)
{
	var sx=x+5;
	var sy=y+5;
	var sx1=x1+5;
	var sy1=y1+5;
	var pt=sx+","+sy+" "+sx1+","+sy+" "+sx1+","+sy1+" "+sx+","+sy1;
	svgbox(pt,5);
}
function dragElement(elmnt,state) 
{
	if(state==="1")
	{
		var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  		if (document.getElementById(elmnt.id)) 
		{
    			/* if present, the header is where you move the DIV from:*/
   	 		document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  		} 
		else 
		{
    			/* otherwise, move the DIV from anywhere inside the DIV:*/
    			elmnt.onmousedown = dragMouseDown;
  		}
  		function dragMouseDown(e) 
		{
    			e = e || window.event;
    			e.preventDefault();
    			// get the mouse cursor position at startup:
    			pos3 = e.clientX;
    			pos4 = e.clientY;
    			document.onmouseup = closeDragElement;
    			// call a function whenever the cursor moves:
    			document.onmousemove = elementDrag;
  		}
  		function elementDrag(e) 
		{
    			e = e || window.event;
    			e.preventDefault();
    			// calculate the new cursor position:
    			pos1 = pos3 - e.clientX;
    			pos2 = pos4 - e.clientY;
    			pos3 = e.clientX;
    			pos4 = e.clientY;
   			// set the element's new position:
    			elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    			elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  		}
  		function closeDragElement() 
		{
    			/* stop moving when mouse button is released:*/
    			document.onmouseup = null;
    			document.onmousemove = null;
  		}
	}
	else if(state==="0")
	{
		elmnt.style.position="fixed";
		elmnt.onmousedown = "";
	}
}
document.getElementById("sub_b").addEventListener("click",function(event)
{
	var text="<!DOCTYPE html><html><head></head><body>"+document.getElementById("fbody").innerHTML+"</body></html>";
	var data = new Blob([text], {type: 'text/html'});
	var url = window.URL.createObjectURL(data);
	document.getElementById('sub_b').href = url;
});
document.getElementById("drag_b").addEventListener("click",function(event)
{
	if(drag===0)
	{
		drag=1;
		document.getElementById("drag_b").style.background="red";
		fbody_select_all_drag();
		console.log("Drag Mode On");
		if(edit===1)
		{
			edit=0;
			document.getElementById("edit_b").style.background="";
			fbody_select_all_edit(edit);
			console.log("Edit Mode Off");
		}
		else if(resize===1)
		{
			resize=0;
			var pe=document.getElementById("svg");
			pe.style.pointerEvents="none";
			document.getElementById("res_b").style.background="";
			res_cursor="";
			console.log("Resize Mode Off");
		}
		else if(divmake===1)
		{
			divmake=0;
			document.getElementById("div_b").style.background="";
		}
		else if(color===1)
		{
			color=0;
			if(document.getElementsByTagName("polygon").length!==0)remove_svgbox(1);//poly5
			colorbox_id="";
			colorbox_y=0;
			colorbox_r=0;
			colorbox_g=0;
			colorbox_b=0;
			colorbox_a=0;
			colorbox_last_y=0;
			document.getElementById("color_b").style.background="";
			document.getElementById("rgb_b").style.display="";
		}

	}
	else if(drag===1)
	{
		drag=0;
		document.getElementById("drag_b").style.background="";
		fbody_select_all_drag();
		console.log("Drag Mode Off");
	}
});
function fbody_select_all_drag()
{
	var a=document.getElementById("fbody");
	for(var chil=0;chil<a.children.length;chil++)
	{
		var cc=a.children;
		var ee=document.getElementById(cc[chil].id);
		ee.style.position="absolute";
		if(ee.getAttribute("state")==="0")ee.setAttribute("state","1");
		else if(ee.getAttribute("state")==="1")ee.setAttribute("state","0");
		dragElement(ee,ee.getAttribute("state"));
	}
}
function fbody_select_all_edit(edit)
{
	var a=document.getElementById("fbody");
	for(var chil=0;chil<a.children.length;chil++)
	{
		var cc=a.children;
		var ee=document.getElementById(cc[chil].id);
		if(edit===1)ee.setAttribute("contenteditable","true");
		else if(edit===0)ee.setAttribute("contenteditable","false");
	}
}
document.getElementById("edit_b").addEventListener("click",function(event)
{
	if(edit===0)
	{
		edit=1;
		document.getElementById("edit_b").style.background="red";
		fbody_select_all_edit(edit);
		console.log("Edit Mode On");
		if(drag===1)
		{
			drag=0;
			document.getElementById("drag_b").style.background="";
			fbody_select_all_drag();
			console.log("Drag Mode Off");
		}
		else if(resize===1)
		{
			resize=0;
			var pe=document.getElementById("svg");
			pe.style.pointerEvents="none";
			document.getElementById("res_b").style.background="";
			res_cursor="";
			console.log("Resize Mode Off");
		}
		else if(divmake===1)
		{
			divmake=0;
			document.getElementById("div_b").style.background="";
		}
		else if(color===1)
		{
			color=0;
			if(document.getElementsByTagName("polygon").length!==0)remove_svgbox(1);//poly5
			colorbox_id="";
			colorbox_y=0;
			colorbox_r=0;
			colorbox_g=0;
			colorbox_b=0;
			colorbox_a=0;
			colorbox_last_y=0;
			document.getElementById("color_b").style.background="";
			document.getElementById("rgb_b").style.display="";
		}

	}
	else if(edit===1)
	{
		edit=0;
		document.getElementById("edit_b").style.background="";
		fbody_select_all_edit(edit);
		console.log("Edit Mode Off");
	}
});
document.getElementById("res_b").addEventListener("click",function(event)
{
	if(resize===0)
	{
		resize=1;
		document.getElementById("res_b").style.background="red";
		console.log("Resize Mode On");
		if(drag===1)
		{
			drag=0;
			document.getElementById("drag_b").style.background="";
			fbody_select_all_drag();
			console.log("Drag Mode Off");
		}
		else if(edit===1)
		{
			edit=0;
			document.getElementById("edit_b").style.background="";
			fbody_select_all_edit(edit);
			console.log("Edit Mode Off");
		}
		else if(divmake===1)
		{
			divmake=0;
			document.getElementById("div_b").style.background="";
		}
		else if(color===1)
		{
			color=0;
			if(document.getElementsByTagName("polygon").length!==0)remove_svgbox(1);//poly5
			colorbox_id="";
			colorbox_y=0;
			colorbox_r=0;
			colorbox_g=0;
			colorbox_b=0;
			colorbox_a=0;
			colorbox_last_y=0;
			document.getElementById("color_b").style.background="";
			document.getElementById("rgb_b").style.display="";
		}
	}
	else if(resize===1)
	{
		res_poly5_in_out="";
		resize=0;
		var pe=document.getElementById("svg");
		pe.style.pointerEvents="none";
		document.getElementById("res_b").style.background="";
		res_cursor="";
		console.log("Resize Mode Off");
	}
});
function res_off_on()
{
	console.log("Resize Mode On here "+res_poly5_in_out+" "+resize);
	resize=0;
	var pe=document.getElementById("svg");
	pe.style.pointerEvents="none";
	remove_svgbox(1);
	res_cursor="";
	res_poly5_in_out="";
	resize=1;
}
document.getElementById("color_b").addEventListener("click",function(event)
{
	if(color===0)
	{
		color=1;
		document.getElementById("color_b").style.background="red";
		document.getElementById("rgb_b").style.display="block";
		if(drag===1)
		{
			drag=0;
			document.getElementById("drag_b").style.background="";
			fbody_select_all_drag();
			console.log("Drag Mode Off");
		}
		else if(edit===1)
		{
			edit=0;
			document.getElementById("edit_b").style.background="";
			fbody_select_all_edit(edit);
			console.log("Edit Mode Off");
		}
		else if(divmake===1)
		{
			divmake=0;
			document.getElementById("div_b").style.background="";
		}
		else if(resize===1)
		{
			res_poly5_in_out="";
			resize=0;
			var pe=document.getElementById("svg");
			pe.style.pointerEvents="none";
			document.getElementById("res_b").style.background="";
			res_cursor="";
			console.log("Resize Mode Off");
		}
	}
	else if(color===1)
	{
		color=0;
		if(document.getElementsByTagName("polygon").length!==0)remove_svgbox(1);//poly5
		colorbox_id="";
		colorbox_y=0;
		colorbox_r=0;
		colorbox_g=0;
		colorbox_b=0;
		colorbox_a=0;
		colorbox_last_y=0;
		document.getElementById("color_b").style.background="";
		document.getElementById("rgb_b").style.display="";
	}
});
