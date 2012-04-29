(function(){
    function GenToc (el)
    {
        if(!window.document.querySelector)return;
        el = el || document.querySelector(".content");
        var headers = el.querySelectorAll('h1,h2,h3,h4,h5,h6');
        if(!headers.length)return;
        var toc = document.createElement('div');
        toc.className = "toc";
        var cap = document.createElement('div');
        cap.className = 'toc-caption';
        cap.innerText = "toc";
        var list = document.createElement('div');
        list.className = 'toc-list hidden';
        toc.appendChild(cap);
        toc.appendChild(list);
        cap.onclick=function(){
            list.classList.contains('hidden')?
                list.classList.remove('hidden'):
                list.classList.add('hidden');
        };

        [].forEach.call(headers,function(h){
            list.appendChild(new HeaderRef(h).el);
        });
        el.prependChild(toc);

    }
    function HeaderRef(h)
    {
        var me = this;
        this.header = h;
        var el = document.createElement('a');
        el.classList.add("header-ref");
        el.classList.add(h.tagName);
        el.innerText = h.innerText;
        el.onclick = function(e){
           me.header.scrollIntoView();
        };

        this.el = el;
    }
    document.addEventListener('DOMContentLoaded',function(){
        GenToc();
    });
})();