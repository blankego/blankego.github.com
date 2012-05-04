---
layout: main
title: Projects
showToc: true
---
## RhymeDictChrome
+ Site: <https://github.com/blankego/RhymeDictChrome>
+ Language: javascript

A chrome/chromium dictionary extension, which especially aims native Chinese speakers and Chinese learners, provides functionality of picking up words/characters from screen, searching directly from within the omnibox, holding offline dictionaries in rdbm format using browser's WebSql feature. It also provides user friendly management interface, and flexible customization mechanism. Some language related tools such as word counting, encoding conversion etc may be included in the upcoming versions as well.

## Guangyun Skimmer
+ Site: <http://code.google.com/p/rhymedict>
+ Language: javascript

[Guangyun](http://en.wikipedia.org/wiki/Guangyun) is historically the most important rhyme dictionary of China. This little javascript tool provides a convenient way to browse and consult this dictionary. Click [HERE] to try it in your browser!

<a id="cccount"/>
## CCCount
+ Site: <https://bitbucket.org/need4steed/cccount>
+ Language: C++/Java/C#/python/ruby

## IDS

IDS stands for ideographic description sequence, it's a set of notation used to describe Chinese characters analytically, i.e. man can use it to write formulae which show the way how Chinese characters are made up from parts(components). Most of the distinguishable building parts of Chinese characters are either by themselves stand alone characters or varients of stand alone characters, which often fit in a specific position of a containing character. That means the composition of a Chinese character is usually in a recursion matter. Therefore, it's easy to analyze or synthesize a C Character programmatically. I've been playing around with this concept and rolled out couple projects concerning IDS.

### IDS_DB

+ Site: <https://bitbucket.org/need4steed/ids_db>
+ Language: python

[Introduction](/proj/IDS數據.html)

It is dedicated to provide a complete IDS formulae data table for all Chinese characters already coded in unicode, and tools for using the data in different ways.



### 夷微碼 - The Impalpable IM

+ Site: <https://bitbucket.org/need4steed/ids_db/src/224d4a4b8f69/ime>
+ Language: python

[Introduction](/proj/夷微碼.html)

IME means Input Method, because the Chinese script is made up of a huge collection of characters, several thousands of them are deployed in daily use, it simply over-overwhelmed for a English keyboard to assign unique keys for every single character, here the IMEs come to rescue. We can input C chars into computer in a indirect way through a ime. IMEs commonly fall into 2 categories, one is called phonetic encoding,which uses pronunciations as index to lookup characters, the other is called shape-encoding, which uses shape details(compositions) as index to lookup. IDS provided a possibility for someone to implement an application to automatically generate a whole set of shape codes for propably all known C chars. I took a try to bring this idea into reality, thus the Impalpabe is made.




