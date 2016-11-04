---
title: launchpad自定义行列数Dock
date: 2016-10-24 11:56:16
tags: [Mac, launchpad]
categories:
---
## 打开终端应用，并输入下列指令：
``` bash
defaults write com.apple.dock springboard-columns -int X;defaults write com.apple.dock springboard-rows -int X;defaults write com.apple.dock ResetLaunchPad -bool TRUE;killall Dock
```
> 将上述指令中的X替换为数字，第一个 X 代表列，第二个 X 代表行,默认7*5
