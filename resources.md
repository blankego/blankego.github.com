---
layout: main
title: Resources
showToc: true
---
You can find useful links here, If you and me have some intersection in interests.

## Programming

### Know your enemy and know yourself 
-- know what is out there may be used as your weapon!

You don't need to build the Babel to make your way to heaven  - <http://rosettacode.org/>

Compare the syntax in a tabular style - <http://rigaux.org/language-study/syntax-across-languages/>

Have questions? Ask an warm-hearted expert at [Stackoverflow](http://stackoverflow.com/)



### Javascript aka ECMAScript

Javascript may be not a fancy language, but it's definitely a fun one. It's so dynamic that you can tweak it however you like to do all kinds of nasty tricks, as long as the brower says okay. Yeah, the browser's compatibilty is always the pain in the ass. I bet you've been haunted by it for a long time. Guess what, it won't quit, you will likely keep being bothered by it, for the foreseeable future. That's because the browser implementers they don't appreciate the virtue of collaboration - to make a better world? No way! They're doomed to fight each other to death. Although the fighting is bloody, the competition does have some benefits, it pushes the web to evolve. 

#### Embrace HTML5 if you're optimistic
+ <http://www.html5rocks.com> - audo/video, 3D, webStorage, workers, binary Arrays..., too much fun!
	+ [ECMAScript 5 compatibilty table](http://kangax.github.com/es5-compat-table/)
	+ [Can I Use?](http://http://caniuse.com/)
	
+ <http://www.css3.info>
+ [The official reference?](https://developer.mozilla.org/en/JavaScript) - Afterall the language is made by Netscape, but the site is sluggish when I visit it from China. 	
+ [Harmony](http://wiki.ecmascript.org/doku.php?id=harmony:proposals) - The code name for upcoming version is HARMONY,satirically it's also a slogan of some pinko land, wait, where am I from ;) I hope those ES guys don't make it a joke.



#### Use deploy some lib to fight the cross-browser war

+ [JQuery](http://jquery.com) - It's not just about write less.
+ [Underscore](http://documentcloud.github.com/underscore/)  - Bring the functional
  idioms to the js world! Why I love this slim humble symbol, because it doesn't hurt my eyes. 



#### [Commonjs](http://commonjs.org)
Endeavour to make the language COMMON.


#### [Coffeescript](http://coffeescript.org/)

It's essentially js in Sugarcoat. 

{% highlight coffeescript %}
dress = (who, clothes = "coffee flavor sugarcoat") ->
    "The #{clothes} does make #{who} look sweet!"
{% endhighlight %}

There's one problem: bugs also love candy! How would you debug a program under camouflage?

#### [Node.js](nodejs.org)

Resurrection of the server side javascripting. Is that only hype or real deal?

#### Prevent your code from going haywire

Use [QUnit](https://github.com/jquery/qunit)

### Python 

-- The big snake is moaning!

I started programming by learnging turbo BASIC and PASCAL and a little bit C, But my process slept for N years until I rediscovered the Wonderland of programming by meeting Python, It's truely a fun language but not a easy one. I love underscore promises she stays single! Mess with a couple(`__`) to have an affair is just not my thing ;) Why on earth are there so many `self`, `__`. And as a pure dynamic language it surprisingly lacks a decent closure, don't tell me it has a `lambda`,  for me it's more like a `lame-duh`. And here comes the really deal-breaker. They indeed compiled the damn runtime in different encodings for different platforms, [UCS-4](http://en.wikipeda.org/UCS-4) for linux and [UCS-2](http://en.wikipeda.org/UCS-2) for mswin32 respectively! When use the UCS2 version You cannot treat characters beyond [BMP](http://en.wikipedia.org/wiki/Plane_\(Unicode\)#Basic_Multilingual_Plane) the same way as the other characters, You have to manipulate surrogate-pairs by hand, `len()` , `for c in s:` all crippled, in one word, the cross-platform blurb turned to bullcrap . As a Chinese speaker how can accept that?

+ [PQR](http://rgruet.free.fr/PQR27/PQR2.7.html) - Python Quick Reference, the invaluable reference.

### Ruby
Ruby is awesome and elegant, its syntax is basically impeccable, except the slightly fat runtime.  

### Functional
I'm a big fan of functional programming, I like filter, fold, map, currying..., so much fun!

- [Learn You a Haskell for Great Good](http://learnyouahaskell.com) - Monad, thunk, statelessness, lazyness, meet the beast. I appreciate the purity, but I'm too addictive to the stateful world, I doubt I can ever get used to solve realworld problems in such a linguistic puristic way.


### C/C++
C is cool. You wanna see how cool it is? Meet the [GObject](http://mail.gnome.org/archives/gtk-list/2004-August/msg00198.html)! Wanna see some macro tricks, check out [this](http://stackoverflow.com/questions/2124339/c-preprocessor-va-args-number-of-arguments)! If you have some control issue, who doesn't, put the C horse at your [disposal](http://www.cprogramming.com/)!

C++ is powerful. It's as powerful as adrenaline rush! Although the templating of STL is kinda lame, when you made yourself acquainted with - 

+ [Boost](www.boost.org/)
+ [Poco](pocoproject.org/)
+ [Qt](http://qt-project.org/)
+ [The big 0X](http://www2.research.att.com/~bs/C++0xFAQ.html)


you got a amazing new horizon! 

#### IDE

The [QtCreator](http://qt-project.org/wiki/Qt_Creator_Releases) rules! Get the 2.5 version, it no more chokes on 0X lines! 

### Dependency hell

I hate fat-ass runtime, I'd rather stick with C++ than mess around with C# or Java, they both strangled by their corresponding FRAMEworks. Python and ruby have same problems, you can't force your end users to install any thing other than your app. Win32 is the worst scenario, you either give them the \[gui\].exe or give them the web! If you have to use a framework, you'd better bundle it with your app. How can one bundle JVM or .NET? You simply can't ! I've tried [Mono](www.mono-project.com)'s bundle tool, couldn't work it out on windows.

How about Lua? Lua's syntax is so verbose, so restrictive and so anti programmer's intuition. IMHO, it isn't worth the trouble. 


### PHP
Php is easy. Because it's permeating the web, it's worth to learn, unless your company uses rails or django. The [Yii framework](www.yiiframework.com) is a decent one. If you want to get the gist of [MVC](en.wikipedia.org/wiki/Model–view–controller), all you need is to peruse Yii's [guide](http://www.yiiframework.com/doc/guide/) and work out some proj. 

<http://phpsadness.com/>

### C# / JAVA
.NET/Mono and JDK they're just fine. If your boss prefers either of them, how dare you argue with him. 

Java is the simplest language in the world except its enum. Simplicity may be interpreted by someone as suck-ness. No need to deny it, but you don't have to suck to play with something sucks. It really easy (in another world productive) to coding towards JDK or .NET.

The C# on the other hand doesn't suck at all. It's actually well balanced beauty. The true generics, The [LINQ](http://en.wikipedia.org/wiki/Language_Integrated_Query) the evolving conciser and cleaner syntax  -- you just cannot get enough of it!

#### IDE
The [MonoDevelop](monodevelop.com) is wonderful ! 


If you're into C#, buy this book: <http://www.albahari.com/nutshell>, it's the frakking bible for CSharpers!

### Databases

[SQLite](http://www.sqlite.org/docs.html) is a handy gadget. Its official doc is very clean and very helpful, If you're new to RDBM, I suggest you play along with it.

[MySql](www.mysql.com)'s old version doesn't speak unicode well.

[CouchDB](couchdb.apache.org) is a fun kid, and easy to befriended. It's not some old fashioned document-oriented DB like [eXist](http://exist-db.org/), it speaks directly JSON([BSON](en.wikipedia.org/wiki/BSON)) - the simplest hierarchical data structure to handle.

### Deal with Data

- Learn yourself some [bash](http://www.hypexr.org/bash_tutorial.php)
- Learn yourself some [regex](http://www.icewarp.com/support/online_help/203030104.htm)
- Learn yourself some [awk](http://www.grymoire.com/Unix/Awk.html#uh-1)
- Learn yourself some [sed](http://www.grymoire.com/Unix/Sed.html)
- Learn yourself some [XML, XSLT, XSD](www.w3schools.com/xml/)
- [yaml](http://www.yaml.org/start.html)
- [markdown](http://daringfireball.net/projects/markdown/syntax)
- [texitle](http://redcloth.org/textile)
- At least learn yourself some [ `printf` ](http://www.cplusplus.com/reference/clibrary/cstdio/printf/)
- Learn yourself some templates, besides xslt. 

  I can't tell whitch template engine is the best, it's just a personal taste. You can try [mustache](http://mustache.github.com/), it's language agnostic.


#### Unicode and stuff
- [UTF-8](http://en.wikipedia.org/wiki/UTF-8)
- [Surrogate Pairs](http://zsigri.tripod.com/fontboard/cjk/surrog.html)
- [IDS](http://www.pkucn.com/viewthread.php?tid=152317)



##Sinology
### Phonology
+ [上古音查詢](http://www.eastling.org/oc/oldage.aspx)
