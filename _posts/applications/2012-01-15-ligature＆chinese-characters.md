---
layout: post
categories:
- blog
- applications
title: How to make TrueType's ligature support Chinese characters
---
As shown in the following image:

![](/assets/img/applications/ligature.png)

我在實驗品字體中分別設計了西文、中西混合文（IDS）各一組ligature，但FireFox9只實現了西文ligature的自動轉換，對中西混合者卻置若罔聞。在FontForge中則能顯示預想的畫面。不知道哪裡出了問題，願方家有以教我。

I've figured it out! It just won't work for mixed scripts.  If the ligature parts are all in the same script, either latin or cjk, it will be fine!
