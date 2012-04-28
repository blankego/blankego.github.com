cccount = {};

//Utils
(function() {
    const shift = 10;		
    cccount.SurrogatesToUni = function(high,low)
    {
        
        return (0x10000 + ((high - 0xd800) << shift) + (low - 0xdc00));
    };
    
    
    cccount.UniToStr = function(u)
    {
        if(u < 0x10000)return String.fromCharCode(u);
        u -= 0x10000;                
        var high = ((u >> shift) + 0xD800);
        var low = ((u & 0x00003ff) + 0xDC00);
        return  String.fromCharCode(high) + String.fromCharCode(low);
    };
})();


//Counter
(function () {       
    
    //ctor
    cccount.Counter = function()
    {
        this._nChars = 0;
        this._nCjks = 0;        
        this._cjks = [{},{},{}];
        this._sorted = false;
        this._sortedList = [];
    }
    
    //properties
    cccount.Counter.prototype.NChars = function(){return this._nChars;}
    cccount.Counter.prototype.NCjks = function(){return this._nCjks;}
    cccount.Counter.prototype.NDistinguishable = function()
    {
        return  _.size(this._cjks[0]) + _.size(this._cjks[1]) +
                _.size(this._cjks[2]);
    }
    
    //sorting mechanism for the result list
    //put inner functions to outer scope to improve performance
    function toPair(v,k){return [k,v];}
    function cmp(a,b){
           return (b[1] - a[1]) ||( a[0] - b[0]);
    }
    cccount.Counter.prototype._SortResult=function()
    {        
        this._sortedList = _.map(this._cjks[0],toPair)
            .concat(_.map(this._cjks[1],toPair), _.map(this._cjks[2],toPair));
        this._sortedList.sort(cmp);
    }
    //=============
    
    cccount.Counter.prototype.SortedList = function()
    {
        if(!this._sorted)
        {
            this._SortResult();
            this._sorted = true;
        }
        return this._sortedList;
    }
    
    //Worker
    cccount.Counter.prototype.Process = function(s)
    {
        if(typeof s !== 'string')return;
        
        const  L = 0x4dff, R = 0x9fa6;
        const  LA = 0x33ff, RA = 0x4db6;
        const  LB = 0x1ffff, RB = 0x2a6d7;
        const  SURROGATEHL = 0xd7ff, SURROGATEHR = 0xdc00;
        const  SURROGATELL = 0xdbff, SURROGATELR = 0xe000;
        
        for(i= 0;i < s.length;++i)
        {
            var c = s.charCodeAt(i);
            var dic = null;				
            //single char glyph
            if (c > L && c < R)
            {
                    dic = this._cjks[0];
            }
            else if( c > LA && c < RA)
            {
                    dic = this._cjks[1];
            }
            else if (c > SURROGATEHL && c < SURROGATEHR && ++i)
            {
                    
                    var c2 = s.charCodeAt(i);
                    if (c2 > SURROGATELL && c2 < SURROGATELR)
                    {
                            c = cccount.SurrogatesToUni(c,c2);
                            if (c > LB && c < RB)
                            {
                                    dic = this._cjks[2];							
                            }
                    }
            }
            if(dic != null)
            {
                c = cccount.UniToStr(c);
                dic[c] = (c in dic) ? dic[c] + 1 : 1;
                this._nCjks++;
            }
            
            //incomplete surrogate parts will be ignored as junks
            this._nChars++;
        }
        this._sorted = false;
      
    }
    
    cccount.Counter.prototype.Output = function()
    {
        return _.map(this.SortedList(),function(it){
            return it[0] + "\t" + it[1];
        }).join('\n');
    }
    
    
   
 })();
 