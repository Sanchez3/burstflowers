# burstflowers

[春分项目](https://github.com/Sanchez3/MyProject/tree/master/Tm24)  游戏demo

效果如下gif图
![burstflowers](https://github.com/Sanchez3/burstflowers/blob/master/burstflowers.gif)

## 技术点

### 粒子系统 Emitter 

使用[phaser.js](http://phaser.io/)的粒子系统，即`Emitter` - An Arcade Physics based Particle Emitter

点击屏幕，触发粒子系统，飘落更多花瓣

###  滤镜 Filter

使用[phaser.js](http://phaser.io/)的滤镜效果，即 `Filter` [Class: Filter](https://photonstorm.github.io/phaser-ce/Phaser.Filter.html)

> Note: Texture must be power-of-two sized or the filter will break !

参考： [Sinewave Fixed Base](http://phaser.io/examples/v2/filters/sinewave-fixed-base)



使用gulp自动化构建工具，使用方法见https://github.com/Sanchez3/generator-phaser-h5#installation