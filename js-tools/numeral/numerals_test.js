$(function(){
module("Universial Numerals Conversion");

test("test arabic numerals parsing",function(){
    var p = new ArabicConverter;
    equals(p.Parse("000108903").toString(),"108903");
    equals(p.Parse("0").toString(),"0");
});

test("test BigInt",function(){
    var bi = new BigInt;
    bi.AddDigit(3,8);
    bi.AddDigit(9,4);
    bi.AddDigit(1,10);
    bi.AddDigit(0,17);
    equals(bi.toString(),"10300090000");
});
test("test parse Chinese numerals", function() {
   var cp = new CnNumeralsParser;
  equals(cp.Parse("零").toString(),"0"); 
  equals(cp.Parse("一").toString(),"1");
  equals(cp.Parse("十").toString(),"10");
  equals(cp.Parse("十六").toString(),"16");
  equals(cp.Parse("七千零九十").toString(),"7090");
  equals(cp.Parse("一萬零八百零三").toString(),"10803");
  equals(cp.Parse("萬八千二百五十六").toString(),"18256");
  equals(cp.Parse("三京零一十億零九百三十萬").toString(),"30000001009300000");
  var cpb = new CnNumeralsParser(true);
  equals(cpb.Parse("叄京零壹拾億零玖佰叄拾萬").toString(),"30000001009300000")
});

test("test Chinese numerals generator",function(){
   var cg = new CnNumeralsGenerator;
   equals(cg.Generate(new ArabicConverter().Parse("30000001009300000")),"三京零一十億零九百三十萬");
   equals(cg.Generate(new ArabicConverter().Parse("91234")),"九萬一千二百三十四");
   equals(cg.Generate(new ArabicConverter().Parse("180001")),"十八萬零一");
   equals(cg.Generate(new ArabicConverter().Parse("109000")),"十萬九千");
   var cgb = new CnNumeralsGenerator(true);
   equals(cgb.Generate(new ArabicConverter().Parse("30000001009300000")),"叄京零壹拾億零玖佰叄拾萬")
});


test("test roman numerals parser",function(){
    var r = new RomanConverter;
    equals(r.Parse("X").toString(),"10");
    equals(r.Parse("XIX").toString(),"19");
    equals(r.Parse("MCMVIII").toString(),"1908");
    equals(r.Parse("ↂↂↂↂMↁCCCLXIX").toString(),"44369");
    
});

test("test roman numerals generator",function(){
   var r = new RomanConverter;
   equals(r.Generate(new ArabicConverter().Parse("34369")),"ↂↂↂMↁCCCLXIX");
   equals(r.Generate(new ArabicConverter().Parse("4900")),"MↁCM");
});

test("test suzhou",function(){
   var s = new SuzhouConverter;
   equals(s.Parse("〇 〨〣〦〩 〡二〣 ").toString(),"83690123");
   equals(s.Parse("	〧〦〤〩").toString(),"7649");
   equals(s.Generate(new ArabicConverter().Parse("83690123")),"〨〣〦〩〇〡二〣");
});

test("test rods",function(){
    var r = new RodsConverter;
    equals(r.Parse("  𝍧𝍫𝍥𝍱 𝍩𝍡𝍫 ").toString(),"836901230");
    equals(r.Generate(new ArabicConverter().Parse("83690123")),"𝍧𝍫𝍥𝍱 𝍩𝍡𝍫");
});

})();