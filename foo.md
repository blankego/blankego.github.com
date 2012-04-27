---
layout: main
title: foo
x:
- a
- b
---
foo
{% for p in site.tags %}
[{{p[0]}}]
{% endfor %}

{% for m in site.main_menu %}
 {{m.label}} =
{% endfor %}

{%if page.x contains 'a' %}
X contains a
{%endif%}

![img](/assets/image/ids_lib.png)
