(function(){
	function toggleVisibilty(el)
	{
		el.classList.contains('hidden')?
			el.classList.remove('hidden'):
			el.classList.add("hidden");
	}
    function GenToc (el)
    {
        if(!window.document.querySelector)return;
        el = el || document.querySelector(".content");
        var headers = el.querySelectorAll('h1,h2,h3,h4,h5,h6');
        if(headers.length<=1)return;
        var toc = document.createElement('div');
        toc.className = "toc";
        var cap = document.createElement('div');
        cap.className = 'toc-caption';
        cap.innerText = "toc";
        var list = document.createElement('div');
        list.className = document.body.getAttribute('data-showToc') == 'true'?'toc-list':'toc-list hidden';
        toc.appendChild(cap);
        toc.appendChild(list);
        cap.onclick=function(){toggleVisibilty(list); };

        [].forEach.call(headers,function(h){
            list.appendChild(new HeaderRef(h).el);
        });
        el.insertBefore(toc,el.firstElementChild);

    }
    function HeaderRef(h)
    {
        var me = this;
        this.header = h;
        var el = document.createElement('div');
        el.classList.add("header-ref");
        el.classList.add(h.tagName);
        el.innerText = h.innerText;
        el.onclick = function(e){
           me.header.scrollIntoView();
        };

        this.el = el;
    }
    function addPortalToggle()
    {
		if(!document.querySelector)return;
		var toggles = document.querySelectorAll('.sidebar H4');
		[].forEach.call(toggles,function(t){
			t.onclick = function(){ toggleVisibilty(t.nextElementSibling);};
		});
	}
    document.addEventListener('DOMContentLoaded',function(){
        GenToc();
        addPortalToggle();
    });
})();

