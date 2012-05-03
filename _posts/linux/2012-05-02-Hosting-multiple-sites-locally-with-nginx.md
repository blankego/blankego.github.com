---
layout: post
language: en
categories: 
- blog
- linux
tags:
- configuration
- nginx
- ruby
- tutorial
title: Hosting multiple sites locally with nginx
---

- system: archlinux
- server: nginx
- example: ruby-doc

Sometimes you wanna host multiple sites on your local station.  It's not only  good for testing , but also comes in handy if you want to organize your static pages (like documentations) in a clean and convenient manner.

In this post I'll set an example with ruby-doc, which you can acquire from <http://ruby-doc.org> , to show you how fun it is to make this kinda tricks.

If you're like me, dwell behind the Great frakking wall,  you'll constantly be pissed by the capricious connection condition  of sites abroad, the ruby-doc.org for example, sometimes good, sometimes bad, sometimes the pages simply won't load, no matter how viciously you curse. [Lady Mengjiang](http://en.wikipedia.org/wiki/Meng_Jiangnu)  could've brought down the Wall by crying, whereas your tears mean nothing  Y＿Y to those cold-hearted SOB.  So we could work around by downloading  the htmls and consulting it locally. Unfortunately the gzs provided by ruby-doc.org are in very bad shape. Links are broken, css/img/js are missing.  The follow text will guide you to fix the docs to make them almost as readable and usable as the online version.

## Setup a virtual host
{% highlight bash%}
sudo geany /etc/hosts 
{% endhighlight %}

Or you can use any of your favorite editors. Just open it, and add a line like that shown below at the end of the file:

{% highlight bash %}
#<ip-address>	<hostname.domain.org>	<hostname>
127.0.0.1		localhost.localdomain	rdoc 		#rdoc is the host name for your ruby-doc 
{% endhighlight %}

### Configure nginx
First, make two directories:
{% highlight bash %}
sudo mkdir /etc/nginx/conf/sites-available
sudo mkdir /etc/nginx/conf/sites-enabled
{% endhighlight %}
For ubuntu these dirs should be created under `/etc/nginx/`.

Second,  create a config file named after your virtual host (I'll use "rdoc" ) under `sites-available` dir.

{% highlight nginx %}
server {
		listen       80;
		charset utf-8;    
		server_name rdoc;
		root /(path_to_my_rdoc)/;  	
		#my path is "/media/f/Docs/ruby/rdoc/", don't you dare copy it;)	
		location / {		
				index index.html index.htm;
		}
}
{% endhighlight %}

Then add a line in `/etc/nginx/nginx.conf` (the main config file) to include your virtual host settings.

{% highlight nginx %}
#...
http {
	include /etc/nginx/conf/sites-enabled/*;
#...
{% endhighlight %}
And don't forget to make a symbol link.
{% highlight bash %}
sudo ln -s /etc/nginx/conf/sites-available/rdoc  /etc/nginx/conf/site-enabled/rdoc
{% endhighlight %}

## Create your local rdoc site 

Down [core-doc](http://ruby-doc.org/downloads/ruby_1_9_2_core_rdocs.tgz) and [stdlib-doc](http://ruby-doc.org/downloads/ruby_1_9_2_stdlib_rdocs.tgz) and extract the content to your chosen `rdoc` directory.  Rename the directories `ruby_1_9_2_core` and `ruby_1_9_2_stdlib` to `core` and `stdlib` respectively. Then you download the [js/css stuff package I stolen from ruby-doc.org](/assets/tutorial/rdoc_assets.7z), extract it to `rdoc` directory.  Now  your rdoc dir should have a structure like this:

	rdoc
	├── rdoc/core
	│   ├── rdoc/core/css
	│   ├── rdoc/core/doc
	│   ├── rdoc/core/Encoding
	│   ├── rdoc/core/Enumerator
	│   ├── rdoc/core/File
	│   ├── rdoc/core/GC
	│   ├── rdoc/core/images
	│   ├── rdoc/core/IO
	│   ├── rdoc/core/js
	│   ├── rdoc/core/Math
	│   ├── rdoc/core/NameError
	│   ├── rdoc/core/Process
	│   └── rdoc/core/RubyVM
	├── rdoc/css
	│   └── rdoc/css/highlighter
	├── rdoc/icons
	├── rdoc/images
	│   └── rdoc/images/books
	├── rdoc/js
	│   └── rdoc/js/libs
	└── rdoc/stdlib
		└── rdoc/stdlib/libdoc


Finally, your just need to restart nginx:
{% highlight bash %}
sudo rc.d restart nginx
{% endhighlight %}

Fire up your browser, enjoy your shining new rdoc site!

![](/assets/img/tutorial/2012-05-02-rdoc.png)

□

