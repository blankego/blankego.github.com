(function()
{
    LSystem = function ()
    {
        this.equations = [];
        this.snapshots = [];        
        this.values = [];
        this.nVars = 0;
    }
    LSystem.prototype.Snapshot = function()
    {
        var snapshot = [];
        var orig = this.snapshots.length > 0 ? this.snapshots[this.snapshots.length-1]: this.equations;
        for(var i = 0;i<orig.length;++i)
        {
            snapshot.push(orig[i].slice());
        }
        return snapshot;
    }
    
    LSystem.prototype.Solve = function()
    {
        try
        {
            for(var i = 0; i< this.equations.length-1; i++)
            {
              this.Eliminate(i);
            }
            for(i = 0;i < this.equations.length-1; i++)
            {
              this.Eliminate(~i);
            }  
        }
        catch(e)
        {
            alert ("Encountered a problem, abort solving\n"+e);
            LSystem.call(this);
        }
    }
    LSystem.prototype.Eliminate = function(pos)
    {
        var sshot = this.Snapshot();
        var step;
        if(pos >= 0 )
        {
            step = 1;            
        }
        else
        {
            step = -1
            pos = this.nVars + pos;
        }
        var v = sshot[pos][pos];
        if(v===0)throw "0 is not allow on this position";
        for(var i = pos + step; i >= 0 && i < sshot.length; i += step )
        {
            var w = sshot[i][pos];
            for(var j = 0; j < sshot[i].length;j++)
            {
                sshot[i][j] = sshot[i][j] * v - sshot[pos][j] * w;                
            }
            sshot[i] = ReduceCommonDivisor(sshot[i]);
        }
        this.snapshots.push(sshot);
    }
    
    ReduceCommonDivisor = function(arr)
    {
        if(arr.length > 1)
        {
            var min = 0;
            for(var i = 0; i < arr.length;i++)
            {
                var a = Math.abs(arr[i]);
                if(a < min || min === 0)
                    min = a;
            }
            outer:
            while(min > 0)
            {
                for(var j = 0; j < arr.length;j++)
                    if(arr[j] % min != 0)
                    {
                        min--;
                        continue outer;
                    }
                for(var k = 0; k < arr.length; k++)
                {
                    arr[k]= arr[k]/min;
                }
                break;
            }
        }
        return arr;
    }
  
    var itemPattern = /^\s*([+-]?)\s*(\d+)/; //([a-zA-Z]?)/;
    LSystem.prototype.Parse = function(str)
    {
        LSystem.call(this);
        try{
            var lines = str.split('\n');
            for(var i = 0;i < lines.length;++i)
            {
              var l = $.trim(lines[i]);
              if(!l)continue;              
              var items = [];
              while(l)
              {
                var match = itemPattern.exec(l);
                if(!match)throw lines[i];                
                items.push(parseInt(match[1]+match[2]));
                l=l.substr(match[0].length);
              }
              
              if(items.length === 0)throw "FTW!";
              if(this.nVars === 0)
              {
                this.nVars = items.length - 1;
                
              }
              else if(items.length - this.nVars !== 1)
              {
                throw lines[i];
              }              
              this.equations.push(items);
              
            }
            if(this.equations.length - this.nVars !== 0)
                throw "The number of equations doesn't match the number of variables";
            
        }
        catch(e)
        {
            alert("Invalid format! Please recheck your input!\n"+e);
        }
    
    }
    
    function FormatTable(sys,i)
    {
        var table = "<table><thead><caption>Step " + i +
                "</caption></thead><tbody>";
            
        for(var j = 0;j < sys.length; j++)
        {
            var row = "<tr>";                
            for(var k = 0 ;k < sys[j].length ;k++)
            {
                row += ("<td>" + sys[j][k] + "</td>");
            }
            row += "</tr>";
            table += row;
        }
        return table += "</tbody></table><br/>";
    }
    
    LSystem.prototype.ShowResult = function(node)
    {
        node.empty();
        node.append(FormatTable(this.equations,0));
        for(var i = 0; i < this.snapshots.length; i++)
        {
            var sshot = this.snapshots[i];
            node.append(FormatTable(sshot,i+1));
        }
    }
})()

$(function(){
    linear = new LSystem();
    $("#egSwitch").click(function(){
       var tog = $("#egToggle").text();
       if(tog == "+")
       {
        $("#egToggle").text("-");
        $("#eg").slideDown("slow");
       }
       else
       {
        $("#egToggle").text("+");
        $("#eg").slideUp("fast");
       }
    });
    $("#submit").click(function(){
        linear.Parse($("#input").val());
        linear.Solve();
        linear.ShowResult($("#result"));
    });
})