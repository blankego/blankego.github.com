$(function(){
module("Surrogates Conversion");

test("test UniToStr", function() {
    
  equals(cccount.UniToStr(0x2241c),"𢐜");
  
});

test("test SurrogatesToUni",function(){
    var c = cccount.SurrogatesToUni("𢐜".charCodeAt(0),"𢐜".charCodeAt(1));
    equals(c,0x2241c);
    
});

var s = "ab弓都\u9fa5弓t\u9fa5𪛖M";
module("Counter");

test("test counting", function() {
  
  var counter = new cccount.Counter;
  counter.Process(s);
  expect(3);
  equals( counter.NChars(),10);
  equals(counter.NCjks(),6);
  equals(counter.NDistinguishable(),4);
  
});

test("test counter sorting",function(){
  var counter = new cccount.Counter;
  counter.Process(s);
  expect(2);
  equals(counter.SortedList()[0][0],'弓');
  equals(_.last(counter.SortedList())[0],'𪛖');
})
module("$ui");

var div = $("<div id='widget'>haha<div>sub<p>subsub</p></div></div>");
$(document.body).append(div);
test("test widget",function(){
  
  
  
  
  w = new $ui.Widget(div);  
  w.Hide();
  expect(9);
  equals(w.jq[0],$('#widget')[0]);
  var w2 = new $ui.Widget(div);
  equals(w2,w);
  var sub =div.find(":contains(sub)").eq(0);
  ok(sub);
  sw = new $ui.Widget(sub,w);  
  equals(sw.parent,w);
  
  var subsub = sub.find(":contains(subsub)");
  
  ssw = new $ui.Widget(subsub);
  sw.AddChild(ssw);
  
  equals(w.Find(ssw),ssw);
  equals(w.Find(ssw.jq[0]),ssw);
  equals(ssw.parent, sw);
  equals(ssw.parent.parent,w);
  
  ssw.Show();
  equals(w.jq.is(":visible"),true);
});
test("test widget remove",function(){
  w=new $ui.Widget(div);
  var sub =div.find(":contains(sub)").eq(0);
  sw =$ui.Widget(sub,w);
  w.RemoveChild(sw);  
  notEqual(w.Find(sw),true);
  equals(sw.parent,null);
});
    
test("test box",function(){
  var p = $("<p>box</p>");
  b = new $ui.Box(p,w);
  equals(w.Find(b),b);
  equals(b.container,b.jq);
  equals(b.parent,w);
  equals(b.Content(),b.container);
  b.Content("heehee");
  equals(b.Content().text(),"heehee");
  b.Content($("<b>bold</b>"));
  equals(b.Content().text(),"bold");
});

test("test panel",function(){
  var p = new $ui.Panel($("#mypanel"));
  equals(p.caption[0],$(".panel_caption")[0]);
  equals(p.container[0],$(".panel_content")[0]);
  p.Content("new content");
  equals(p.Content().text(),"new content");
  p.Content($("<ul><li>item1</li><li>item2</li></ul>"));
  equals(p.container[0].firstChild.tagName,"UL");
  p.container.empty();
  var bq =$("<blockquote>bq</blockquote>");
  p.Content(bq);
  equals(p.Content().text(),"bq");
});

test("test tabs",function(){
  tabs = new $ui.Tabs($("#tabs"));
  ok(tabs);
  equals(tabs.panes.eq(0)[0],$(".tab_content")[0]);
  equals(tabs.tabs.eq(0).text(),"tab1");
  var pane2 = tabs.GetPane("#tab2");
  equals(pane2.parent,tabs);
  tabs.Hide();
  var d = $("<div>inside pane</div>");
  d= new $ui.Box(d,pane2);
  d.Show();
  equals(tabs.jq.is(":visible"),true);
  
});

});