---
layout: main
title: foo
---
foo


		{{site.main_menu[0].label}}
{%for p in main_menu%}
	{{p.lable}}
{%endfor%}
