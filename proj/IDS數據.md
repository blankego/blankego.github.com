---
layout: project
title: IDS數據
---


## 相關連接：
> [IDS說明書](http://www.pkucn.com/viewthread.php?tid=152317)
  [IDS在線構字工具](http://www.pkucn.com/viewthread.php?tid=214877)
  [IDS變通連接符] http://www.pkucn.com/viewthread. ... age=1#pid1218152067
  [IDS部件檢索](http://mousai.kanji.zinbun.kyoto-u.ac.jp/ids-find)

在 [bitbucket](https://bitbucket.org/need4steed/ids_db/src) 上創建了一個專案。

包含了5萬字（unicode cjk 的全部（不包括韓國的兼容集）和 ext-a /ext-b 的部分）IDS構字式的數據表。
並製作了一個python的解析IDS的lib和幾個自動整理IDS相關數據的小工具。

本專案中IDS採用以拉丁字母充作構字符的變通格式，以方便操作並節省RAM空間。字母和構字符的對映如下：

<table>
	<tr><td>⿰</td><td>H</td><td>左右</td></tr>
	<tr><td>⿱</td><td>Z</td><td>上下</td></tr>
	<tr><td>⿲</td><td>W</td><td>左中右</td></tr>
	<tr><td>⿳</td><td>E</td><td>上中下</td></tr>
	<tr><td>⿴</td><td>O</td><td>包圍</td></tr>
	<tr><td>⿸</td><td>P</td><td>左上包圍</td></tr>
	<tr><td>⿺</td><td>L</td><td>左下包圍</td></tr>
	<tr><td>⿹</td><td>Q</td><td>右上包圍</td></tr>
	<tr><td>⿵</td><td>N</td><td>下開口框包圍</td></tr>
	<tr><td>⿷</td><td>C</td><td>右開口框包圍</td></tr>
	<tr><td>⿶</td><td>U</td><td>上開口框包圍</td></tr>
	<tr><td>〾</td><td>V</td><td>變體，如以「V臽」為「陥」右旁「臽」變體的表記</td></tr>
	<tr><td>⿻</td><td>D</td><td>重疊</td></tr>
	<tr><td>＊</td><td>F</td><td>F(lipped) 水平翻轉</td></tr>
	<tr><td>＊＊</td><td>X</td><td>裁切形，如「Q鳥X」為「梟」字木上的部件，X表示被裁掉的部件</td></tr>
</table>

對構字式而言：

不可拆分者稱作字元 － elements （沒有客觀標準，比如「鼠」字拆起來很麻煩，就視作一個字元，不拆），
各種帶V的變體部件和帶X的裁切部件也視作字元。

表現為拆分式的（如：H女口）稱作分析形 － compounds。

任何漢字的單字都看作構字式的綜合形 － characters － 即構字式的一種形態，如同物質四態中的一態。

構字式（無論是分析形的「式」還是綜合形的「字」）倘若其中的部件都是字元，則說該式處於最詳態（elaborated)；若其表現為綜合形－ 字的形態，則說它處於最簡態（synthesis）。字元字只有一個形態，其最詳態等同於最簡態。

下面是 ids lib 應用的實例

![](/assets/img/ids/ids_lib.png)

打開頁首給出的連接，按

![getsource](/assets/img/ids/getsource.png)

下載源碼壓縮包:

	├── count_elem.py 統計字元構字頻次
	├── find_ids_duplicates.py 找出重複的構字式
	├── gen_char2elements_map.py 生成字到字元序列的映射
	├── get_basic_chars.sh 將純字元和變體部件合併到一個文檔
	├── idsdata （數據）
	│   ├── compounds.txt 非字元各字（合體字）的構字式
	│   ├── elements.txt 純字元列表
	│   └── ids2do.csv Unihan中尚未編輯構字式的字的列表
	├── ids.py IDS 解析 python lib
	├── ids.pyc
	├── MyProject.kpf
	├── output （自動生成的文檔）
	│   ├── basic_chars.txt 純字元和變體
	│   ├── char2elements_map.txt 字和字元序列的映射（這個可用來自動生成形碼輸入法碼表）
	│   ├── elements_with_freq.txt 字元頻次
	│   ├── ids_duplicates.txt 重複式
	│   └── variants.txt 變體
	└── sieve_variants.py 篩出變體
