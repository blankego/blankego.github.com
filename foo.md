---
layout: main
title: foo
x:
- a
- b
---
foo


{{pageYear}}
<ul>
{% for y in site.years reversed %}
	{% if pageYear == y %}
	<li><b><a href="/archive.html#{{y}}">{{y}}</a></b></li>
	{% else %}
	<li><a href="/archive.html#{{y}}">{{y}}</a></li>
	{% endif %}
{% endfor %}
</ul>
{% for m in site.main_menu %}
 {{m.label}} =
{% endfor %}

{%if page.x contains 'a' %}
X contains a
{%endif%}

![img](/assets/image/ids_lib.png)

- - -
<ruby>要<rp>（</rp><rt>於霄</rt><rp>）</rp></ruby>
{{site.url}}
