$ui = {};

//Widget
(function(){
    //TODO: after debug should be set to local
    var pool = pool||[];//widgets pool
    function LookupPool(jq)
    {
        var el = jq[0];
        return _.detect(pool,function(w){return w.jq[0] === el;});
    }
    $ui.Widget = function(elem,parent,container)
    {
        if(elem){
            var jq  = elem instanceof $ ?
                elem :
                elem instanceof Element || typeof elem ==="string" ?
                    $(elem):
                    null;
            if(jq)
            {
                jq=jq.eq(0)
                var hit = LookupPool(jq);        
                //widgets with the same jq will be regarded as the same thing
                //so any jq is allowed to have only one widget
                if(hit) return hit;
                this.jq = jq.eq(0);                
                if(parent)parent.AddChild(this);
                pool.push(this);
                this.container = container || this.jq;
            }
            else throw new Exception("Invalid arg! " + elem);
        }
        return this;
    }
    $ui.Widget.prototype.FindParent = function(par)
    {
        var p = this.parent;
        while(p)
        {
            if(p === par)break;
            p = p.parent
        }
        return p;
    }
    $ui.Widget.prototype.Find = function(which)
    {
        var test = which instanceof $ui.Widget?
            which.jq:
            which instanceof $?
                which:
                $(which);
        var hit = LookupPool(test);
        if(hit)
        {
            var p = hit.FindParent(this);
        }
        return p? hit:null;
        
    }
    $ui.Widget.prototype.Show = function()
    {
        this.jq.show();
        if(this.parent)this.parent.Show();
        return this;
    }
    $ui.Widget.prototype.Hide = function()
    {
        this.jq.hide();
        return this;
    }
    $ui.Widget.prototype.AddChild = function(ch)
    {
        //move the corresponding element to the new parent element if needed
        if(!this.jq.find(ch.jq).length)this.container.append(ch.jq);
        ch.parent = this;
        return this;
    }
    $ui.Widget.prototype.RemoveChild = function(ch)
    {
        var test = ch[0];
        var hit = this.Find(ch);
        if(hit)
        {
            pool = _.select(pool,function(w){return w===hit;});
            ch.parent = null;
        }
        return ch;
    }
})();

//Box
(function(){
    $ui.Box = function(elem,parent,container)
    {
        if(elem)
        {
            $ui.Widget.call(this,elem,parent,container);   
        }
         
        return this;
    }
    $ui.Box.prototype = new $ui.Widget;
    $ui.Box.prototype.Content = function(con)
    {
        if(con===undefined)
            return this.container;        
        this.container.empty();
        if(con instanceof $ || typeof(con)==="string")
        {
            this.container.append(con);
        }
        return this;
    }
    
})();

//Panel class
(function(ns){
    
    //ctor
    $ui.Panel = function(elem,parent)
    {
        if(elem)
        {
            if(!elem.hasClass("panel"))throw new Error("Invalid element!");
            $ui.Box.call(this,elem,parent,elem.children(".panel_content").eq(0));
            this.isOpen = undefined;
            var me = this;        
            this.caption = elem.children(".panel_caption").eq(0);                
            this.caption.click(function(){me.Toggle();});
            this.Toggle(true);
        }
        return this;
    }
    $ui.Panel.prototype = new $ui.Box;
    $ui.Panel.prototype.Toggle  = function(open){
        if(open===undefined)
        {
            open = this.isOpen? false:true;
        }        
        if(open)
        {
            this.caption.attr("title","click to collapse");
            this.container.slideDown("fast");
        }
        else
        {
            this.caption.attr("title","click to expand");
            this.container.slideUp("fast");
        }
        this.isOpen = open;
        return this;
    }
    
      
    $ui.Panel.prototype.Caption = function(cap)
    {
        if(cap===undefined)return this.caption;
        this.caption.empty();
        if(cap instanceof $||typeof(cap)==="string")
        {
            this.caption.append(cap);
        }
        return this;
    }
})();



////TabPane class
(function(){
    $ui.TabPane = function(elem,parent)
    {
        if(!parent)throw new Error("A tabPane must has a tabs as parent");
        if(elem)$ui.Box.call(this,elem,parent);
    };
    
    $ui.TabPane.prototype = new $ui.Box;
    
    //has to be overriden to delegate the show action to the corresponding tab
    $ui.TabPane.prototype.Show = function()
    {
        this.parent.Show();
        this.parent.GetTab("#"+this.jq[0].id).click();
        
    };
    
})();

//////Tabs class
(function(){
    
    $ui.Tabs =function(elem,parent)
    {
        if(!elem)throw new Error("Need a element!");
        var container = elem.find(".tab_container").eq(0);
        $ui.Widget.call(this,elem,parent,container);        
        this.panes = this.container.children(".tab_content");
        
        this.tabs = elem.find("ul.tabs li");
        var me = this;
        this.tabs.click(function() {
            //Tab on-click
           me.tabs.removeClass("active"); //Remove any "active" class
           var jq = $(this).addClass("active");
           me.panes.hide(); //Hide all tab content

           var activeTab = jq.find("a").attr("title"); //Find the href attribute value to identify the active tab + content
           $(activeTab).fadeIn("fast"); //Fade in the active ID content
           return false;
        });
        
        //wrap all panes as Boxes
        for(var i = 0;i<this.panes.length;++i)
        {            
            new $ui.TabPane(this.panes.eq(i),this);
        }
        //When page loads...
        this.ShowFirst();        
        
    };
    
    $ui.Tabs.prototype = new $ui.Widget;
    
    $ui.Tabs.prototype.ShowFirst = function(){this.tabs.first().click(); };
    
    //by title
    $ui.Tabs.prototype.GetTab = function(id)
    {
        var hit = this.tabs.has("a[title='"+id+"']");
        return hit.length?hit.eq(0):null;
    };
    
    //by id
    $ui.Tabs.prototype.GetPane = function(id)
    {
        var hit = this.panes.filter(id);
        return hit? this.Find(hit): null;
    };
    
})();


$ui.Reader = function(elem)
{
    this.element = elem instanceof $ ? elem[0]:elem;
}
$ui.Reader.prototype.Read=function()
{    
    return this.element.tagName == "TEXTAREA" || this.element.tagName ==="INPUT"?
        this.element.value:
        this.element.innerHTML;
}
