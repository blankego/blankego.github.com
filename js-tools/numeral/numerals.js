(function(){
    BigInt = function(i)
    {
        this.value = [];
    }
    
    BigInt.prototype.AddDigit = function(fac,pos)
    {
        var dif = pos - this.value.length;
        if(fac <= 0 && pos != 0)
        {
            return 0;
        }
        if(dif >= 0)
        {
            for(var i=0;i <= dif;i++)
                this.value.unshift(0);
        }
        var idx = this.value.length - pos - 1;
        var d = fac + this.value[idx];
        this.value[idx] = d % 10;
        //shift value
        return d > 9 ? 1 : 0;
    }
    BigInt.prototype.toString = function()
    {
        return this.value.join('');
    }
    
   
   
    ArabicConverter = function()
    {
       
    }
    ArabicConverter.prototype.Parse = function(s)
    {
        s = cleanup(s);
        var len = s.length-1;
        if(len < 0)raiseInvalidFormat('empty',s);
        var zero = 48;
        var idx = 0;
        var num = new BigInt;
        //eliminate leading zero(s);
        var c = s.charCodeAt(0);
        while(c === zero )
        {
            if(++idx > len)
            {
                num.AddDigit(0,0);
                return num;
            }
            c=s.charCodeAt(idx);
        }
        do
        {
            if(c < zero || c > 57 )raiseInvalidFormat(s[idx],s);
            num.AddDigit(c-zero,len-idx);
        }
        while((++idx <= len ) && (c = s.charCodeAt(idx)));
        return num;
    }
        
    ArabicConverter.prototype.Generate = function(num)
    {
        return num.toString();
    }
    
    //tools----
    function cleanup(s)
    {
        return s.replace(/\s/g,'').toUpperCase();
    }
    function indexOf (lst,check,from)
    {
        from = from === undefined || from < 0 ? 0 : from;  
        for(var i = from ; i < lst.length; i++)
        {
            if(lst[i] == check)return i;
        }
        return -1;
    }
    function rIndexOf(lst,check,from)
    {
        from = from === undefined || from >= lst.length ? lst.length-1:from;
        for(var i = from; i >= 0; i--)
        {
            if(lst[i]==check)return i;
        }
        return -1;
    }
   
    function raiseInvalidFormat(c,s)
    {
        throw ("invalid format!("  + ( c ?  c + ":" + s :"" )+ ")");
    }
    //tools end--
    
    
    (function(){
    const factors = {'一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9};
    const majFactors = {'壹':1,'貳':2,'叄':3,'肆':4,'伍':5,'陸':6,'柒':7,'捌':8,'玖':9};
    const magnitudes = {'個':0,'十':1,'百':2,'千':3,'萬':4,'億':8,'兆':12,'京':16,'垓':20,'秭':24,'穰':28,'溝':32,'澗':36,'正':40,'載':44};
    const majMagnitudes = {'個':0,'拾':1,'佰':2,'仟':3,'萬':4,'億':8,'兆':12,'京':16,'垓':20,'秭':24,'穰':28,'溝':32,'澗':36,'正':40,'載':44};
    const zero = '零';
    const cnFactors = "零一二三四五六七八九";
    const majCnFactors ="零壹貳叄肆伍陸柒捌玖"; 
    const cnMagnitudes = {0:'',1:'十',2:'百',3:'千',4:'萬',8:'億',12:'兆',16:'京',20:'垓',24:'秭',28:'穰',32:'溝',36:'澗',40:'正',44:'載'};
    const majCnMagnitudes = {0:'',1:'拾',2:'佰',3:'仟',4:'萬',8:'億',12:'兆',16:'京',20:'垓',24:'秭',28:'穰',32:'溝',36:'澗',40:'正',44:'載'};
    
    
    
    
    CnNumeralsGenerator = function(majuscules)
    {
        if(majuscules)
        {
            this.cnFactors = majCnFactors;
            this.cnMagnitudes = majCnMagnitudes;
        }
        else
        {
            this.cnFactors = cnFactors;
            this.cnMagnitudes = cnMagnitudes;
        }
    }
    CnNumeralsGenerator.prototype.Generate = function(num)
    {
        var lst = num.value;
        var len = lst.length - 1;
        var idx = len;
        var res = [];
        var lastZero = true;
        
        var cFac,cMag;
        for(var big = 0; big <= len; big+=4)
        {
            var group = [];            
            for(var small = 0;idx >=0 && small < 4; small++,idx--)
            {
                 fac = lst[idx];
                if(fac == 0)
                {
                    if(lastZero)continue;
                    lastZero = true;                    
                    cFac = small == 0? '':'零';
                    cMag = '';                
                }
                else
                {
                    cFac = this.cnFactors[fac];
                    cMag = this.cnMagnitudes[small];
                    lastZero = false;
                }
                group.unshift(cFac+cMag);
            }
            if(group.length > 0 )
                group.push(this.cnMagnitudes[big]);
            res = group.concat(res);            
        }
        if(res[0].substr(0,2)=="一十")res[0]=res[0].substr(1);
        return res.join('');
    }
    CnNumeralsParser = function (majuscules)
    {
        if(majuscules)
        {
            this.magnitudes = majMagnitudes;
            this.factors = majFactors;
        }
        else
        {
            this.magnitudes = magnitudes;
            this.factors = factors;
        }
        
    }
    
    CnNumeralsParser.prototype.Parse = function(s)
    {
        
        var num = new BigInt;
        var pos = -1;
        var fac, mag;
        var big = 0;
        var small = 0;
        var currBig = true;
        var idx = s.length -1;
        if(idx < 0)raiseInvalidFormat();
        var c = s[idx];
        
        //single zero
        if(idx === 0 && c=== zero)
        {
            num.AddDigit(0,0);
            return num;
        }
        //Check the rightmost glyph, if it's a factor, then parse it as the first digit
        var fac = this.factors[c];
        if(fac!==undefined)
        {
            num.AddDigit(fac,small);
            if((--idx) < 0)return num;
            //deal with zero and
            //get first magnitude
            mag = ((c=s[idx])===zero && idx > 1) ? this.magnitudes[s[--idx]]:this.magnitudes[c];
        }
        else
        {
            mag = this.magnitudes[c];
        }
        
        //loop over the string digit by digit
        do
        {               
            //magnitudes 
            if(mag !==undefined)
            {
                if(mag < 4)//small magnitude
                {
                    if(!currBig && mag <= small)raiseInvalidFormat(c,s);
                    small = mag;
                    currBig = false;
                }
                else //big magnitude
                {
                    if(mag <= big)raiseInvalidFormat(c,s);
                    big = mag;
                    currBig = true;
                    small = 0;
                }
                idx--;
                
            }
            else  raiseInvalidFormat(c,s);
            
            //factor                
            if(idx >= 0)
            {
                c = s[idx];                    
                fac = this.factors[c];
                if(fac===undefined)
                {
                    if(mag == 1)//‘十’is special,the factor 1 is not compulsory for it
                    {
                        fac = 1;
                        num.AddDigit(fac,big+small);
                        c = ((c=s[idx])===zero && idx > 1) ? s[--idx]:c;
                    }
                    else if(!currBig )raiseInvalidFormat(c,s);
                    //the small magnitude is allowed to be followed by a
                    //a big magnitude like "四百∅萬" without interpolation of factor
                    
                        
                    mag = this.magnitudes[c];
                    continue;
                
                }
                else
                {
                    num.AddDigit(fac,big+small);                    
                    if(--idx < 0)break;    
                }
                
            }
            else
            {
                //leftmost digit
                fac = 1;
                num.AddDigit(fac,big+small);
                break;
            }
            
            
            //prepair next magnitude            
            //remove place-holding zero
            mag = ((c=s[idx])===zero && idx > 1)?this.magnitudes[s[--idx]]:this.magnitudes[c];
        }
        while(true);
        return num;
    }
    })();
   
    ChineseConverter = function(majuscules)
    {
        
        this.parser = new CnNumeralsParser(majuscules);
        this.generator = new CnNumeralsGenerator(majuscules);
    }
    
   
    ChineseConverter.prototype.Parse = function(s)
    {
        
        return this.parser.Parse(s);
        
    }
    
    
    ChineseConverter.prototype.Generate = function(num)
    {
        return this.generator.Generate(num);
    }
    
    const romTens = [73,88,67,77,8578];//"IXCMↂ ";
    const romFives = [86,76,68,8577];//"VLDↁ"
    RomanConverter = function()
    {
        
    }
    
    RomanConverter.prototype.Parse = function(s)
    {
        s = cleanup(s);
        var len = s.length -1;
        if(len < 0)raiseInvalidFormat("empty");
        var num = new BigInt;
        
        var idx = len;
        var digit = 0;
        var place = -1;
        
        do
        {
            var c = s.charCodeAt(idx);
            var cLeft = null;
            var pNew = indexOf(romTens,c,place);
            
            if(pNew > place )//tens
            {
                digit = 1;                
                while(--idx >= 0 && (cLeft=s.charCodeAt(idx))==c) //III
                    digit++;
                if(digit > 4)raiseInvalidFormat(String.fromCharCode(cLeft),s);
                if(idx >=0)
                {
                    if(cLeft === romFives[pNew])//[V]III;
                    {
                        digit += 5;
                        idx--;
                    }
                    else if(pNew > 0 && digit == 1 && cLeft === romTens[pNew-1]) //[I]X
                    {
                        digit = 9;
                        pNew--;
                        idx--;
                    }    
                }
                
            }
            else //fives
            {
                pNew = indexOf(romFives,c,place);
                if(pNew > place)
                {
                    digit = 5;
                    if(idx > 0 && (cLeft=s.charCodeAt(--idx))===romTens[pNew])//[I]V                
                    {
                        digit--;
                        idx--;
                    }
                }
                
            }    
            if(pNew <= place)raiseInvalidFormat(String.fromCharCode(c),s);
            place = pNew;
            num.AddDigit(digit,place)
        }while(idx >=0)
        return num;
    }
    
    RomanConverter.prototype.Generate = function(num)
    {
        var lst = num.value;
        var len = lst.length-1;
        if(len > 4 || (len == 4 && lst[0]>3))throw "out of range";
        var res = [];
        for(var pos = len; pos >=0;pos--)
        {
            var group = [];
            var digit = lst[pos];
            if(digit > 0)
            {
                
                var ten = String.fromCharCode(romTens[len-pos]);
                
                if(digit == 4 || digit == 9)
                    group.push(ten);
                if(digit >= 4 && digit<9)
                {
                    group.push(String.fromCharCode(romFives[len-pos]));
                    
                                        
                }
                else if(digit == 9)
                {
                    group.push(String.fromCharCode(romTens[len-pos+1]));
                }
                var remainder = digit % 5;
                if(remainder < 4)
                {
                    while(remainder-->0)group.push(ten);
                }
            }
            res = group.concat(res);
        }
        return res.join('');
    }
    
    function trim(s)
    {
        var c;
        var left = -1,right = s.length;
        if(right==0)return s;        
        while(++left < right && ((c=s.charCodeAt(left))==32 || c==9 || c==12295));
        while(--right >= left && ((c=s.charCodeAt(right))==32 || c==9));
        return s.substr(left,right-left+1);
    }
    
    const rods = {' ':0,'𝍩':1,'𝍪':2,'𝍫':3,'𝍬':4,'𝍭':5,'𝍮':6,'𝍯':7,'𝍰':8,'𝍱':9,'𝍠':1,'𝍡':2,'𝍢':3,'𝍣':4,'𝍤':5,'𝍥':6,'𝍦':7,'𝍧':8,'𝍨':9}
    const vRods = [' ','𝍩','𝍪','𝍫','𝍬','𝍭','𝍮','𝍯','𝍰','𝍱']
    const hRods = [' ','𝍠','𝍡','𝍢','𝍣','𝍤','𝍥','𝍦','𝍧','𝍨']
    const vSuzhou = "〇〡〢〣〤〥〦〧〨〩";
    const hSuzhou = '〇一二三';
    const suzhou = {' ':0,'〇':0,'〡':1,'〢':2,'〣':3,'〤':4,'〥':5,'〦':6,'〧':7,'〨':8,'〩':9,'一':1,'二':2,'三':3};

    SuzhouConverter = function()
    {
        
    }
    SuzhouConverter.prototype.Parse = function(s)
    {
        s=trim(s);
        var len = s.length-1;
        var idx = len;
        var num = new BigInt;
        if(len >= 0)
        {
            do
            {
                var c = s[idx];
                var digit = suzhou[c];
                if(digit === undefined)raiseInvalidFormat(c,s);
                num.AddDigit(digit,len-idx);
            }
            while(--idx >= 0);    
        }        
        return num;
    }
    SuzhouConverter.prototype.Generate = function(n)
    {
        var lst = n.value;
        var res = [];
        var len = lst.length;
        var idx = 0;
        var lastH = true;
        do
        {
            var d = lst[len-idx];
            var c;
            if(d < 4)
            {
                if(lastH)
                {
                    c = vSuzhou[d];
                    lastH = false
                }
                else
                {
                    c= hSuzhou[d];
                    lastH = true
                }
            }
            else
            {
                c = vSuzhou[d];
                lastH = true;
            }
            
            res.unshift(c);
        }
        while(++idx <= len);
        return res.join('');
    }
    RodsConverter = function()
    {
        
    }
    RodsConverter.prototype.Parse = function(s)
    {
        //the rods characters are beyond BMP
        var right = s.length-1;
        var left = -1;
        var c;
        while(++left <= right && ((c=s.charCodeAt(left))==32 || c==9));
        var pos = 0;
        var num = new BigInt;
        if(right >= left)
        {
            do
            {
                c = s.charCodeAt(right);
                if(c==32)
                {
                    num.AddDigit(0,pos);
                    
                }
                else
                {
                    c = s.substr(--right,2);
                    var digit = rods[c];
                    if(digit === undefined)raiseInvalidFormat(c,s);
                    num.AddDigit(digit,pos); 
                }
                right--;
                pos ++;
            }
            while(right >= left)
        }
        return num;
    }
    RodsConverter.prototype.Generate = function(n)
    {
        var lst = n.value;
        var res = [];
        var len = lst.length-1;
        var idx = 0;
        do
        {
            var d = lst[len-idx];
            var c = idx%2 ? hRods[d] : vRods[d];
            res.unshift(c);
        }
        while(++idx <= len)
        return res.join('');
    }
    
    UniConverter = function()
    {
        this.converters = [
            new ArabicConverter,
            new RomanConverter,
            new ChineseConverter(),
            new ChineseConverter(true),
            new SuzhouConverter,
            new RodsConverter
        ];
        this.names =[
            "Hindu-Arabic Numerals",
            "Roman Numerals",
            "中文數碼小寫",
            "中文數碼大寫",
            "蘇州碼子",
            "算籌計數",
        ];
        
    }
    UniConverter.prototype.TryParse = function(s)
    {
        for(var i = 0; i < this.converters.length;i++)
        {
            try
            {
                var conv = this.converters[i];
                var n = conv.Parse(s);
                return {name:this.names[i],number:n};
            }
            catch(e)
            {
                continue;
            }
        }
        return null;
    }
    
})();
        
function onPageload()
{
    var input = document.getElementById("input");
    var submit = document.getElementById("submit");
    var fields = document.getElementsByTagName("td");
    var typeIndicator = document.getElementById("type");
    var conv = new UniConverter;
    input.onkeypress = function(e)
    {
      var ch = window.event? window.event.keyCode : e.which;
      if(ch == 13)
         tryParse();      
   };
   
   function tryParse ()
   {
      var s = input.value;
      var res = conv.TryParse(s);
      if(!res)
      {
         alert("Invalid format! Please recheck your input!");
         return;
      }
      else
      {
         typeIndicator.innerHTML = res.name;
         for(var i = 0; i < fields.length; i++)
         {
            try
            {
               var str = conv.converters[i].Generate(res.number);
               fields[i].innerHTML = i==5 ? "<pre>"+str+ "</pre>": str;
            }
            catch(e)
            {
               fields[i].innerHTML = '';
            }
         }
      }
   }
   submit.onclick = tryParse;
   input.focus();
}
