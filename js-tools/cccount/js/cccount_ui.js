//need the cccount.js be loaded first


//UI class
(function(){
    var inst;
    cccount.UI = function(input,tracker)
    {
        //could have used an option obj, however, by setting fields 1 by 1,
        //I can take advantage of the IDE's reflection mechanism
        
        if(inst)
        {
            //all UI instances share shame output widgets
            //
            $.extend(this,inst);
            this.chunks = 0;
            this.counter = new cccount.Counter;
        }
        else
        {
            this.chunks = 0;
            this.tracker = new $ui.Box($("#tracker"));
            this.counter = new cccount.Counter;        
            var tabs = new $ui.Tabs($("#tabs"));
            var resultPane = tabs.GetPane("#result");
            this.list = new $ui.Panel($("#list"),resultPane);
            this.summary = new $ui.Panel($("#summary"),resultPane);        
            inst = this;
        }
        return this;
        
    }
    
  
    
    cccount.UI.prototype.Reset = function()
    {
        this.counter = new cccount.Counter;        
        this.UpdateTracker();
    }
    
    cccount.UI.prototype.DoJob = function(reader,updateTracker)
    {
        var s = reader.Read();
        if(!s)alert("The input text is empty!");
        this.counter.Process(s);
        if(!this.counter.SortedList().length)
        {
                window.alert("No Chinese character is found from input text!");
                return this;
        }
        updateTracker && this.UpdateTracker(1);
        return this;
    }
    
    cccount.UI.prototype.UpdateTracker= function(incr)
    {
        //leave the arg out means reset the tracker
        this.chunks = incr? this.chunks+ incr:0;
        this.tracker.Content(this.chunks.toString());
        
    }
    
    cccount.UI.prototype.ShowResult = function(inPlainText)
    {
        cnt = this.counter;
        
        if(inPlainText)
        {            
            var w = window.open();
            w.document.open("text/plain");
            w.document.write(cnt.Output());
            w.document.close();
        }
        else
        {
            var lst = this.counter.SortedList();
            
            this.summary.Content(                 
                cnt.NChars() + " -- Total number of characters have been read.<br/>"+
                cnt.NCjks() + " -- Total number of Chinese characters.<br/>" +
                cnt.NDistinguishable() +" -- Number of distinguishabe Chinese characters.<br/>"                 
            );
            
            var res = $("<table><tbody></tbody></table>");
            for(var i = 0; i < lst.length; ++i)
                res.append("<tr><td>"+ lst[i][0] +
                             "</td><td>" + lst[i][1] + "</td></tr>");
            this.list.Content(res);
            
            this.summary.Show();
            this.list.Toggle(false);
        }        
        return this;
    }
    
})();


//entry point
$(document).ready(function(){
    var ui = new cccount.UI();
    var sampleUI = new cccount.UI();
    var uiReader = new $ui.Reader($("#inputArea"));    
    var sampleReader = new $ui.Reader($("#sampleText"));
    var inputChanged =true;
    $('#tracker').change(function(){
        var jq = $(this);
        jq.fadeOut('fast',function(){jq.fadeIn('slow');});
    })
    $("#inputArea").change(function(){inputChanged=true;});
    function runCount(inPlainText,noShow)
    {
        if(inputChanged)ui.DoJob(uiReader,true);
        
        if(!noShow)ui.ShowResult(inPlainText);
        inputChanged = false;
    }
    $("#count").click(function()
    {
        if(inputChanged)
            runCount(null,true);
        else
            alert("No Change!")
        
    });
    $("#count_tab").click(function(){ runCount(); });
    $("#count_win").click(function(){ runCount(true);});
    
    
    //sample shower    
    $("#runSample").click(function(){
        if(!sampleUI.counter.SortedList().length)
            sampleUI.DoJob(sampleReader);
        sampleUI.ShowResult();
    });
    
    //reset counter
    $("#reset").click(function(){ui.Reset();});
    
    //clear input area
    $("#clear").click(function(){
        $("#inputArea").val('');
        
    });
    $("a[title='#result']").click(function(){runCount();});
    
});