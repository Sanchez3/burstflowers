/**
 * Created by Sanchez
 */
(function() {
    'use strict';
    var Preloader = function() {};

    module.exports = Preloader;

    Preloader.prototype = {
        loadResources: function() {

            for (var i = 1; i <= 26; i++) {
                this.load.image('p' + i, '../assets/img/p' + i + '.png');
            }
            this.load.image('hand', '../assets/img/hand.png');
            this.load.image('man', '../assets/img/man.png');
            this.load.image('man@1024', '../assets/img/man@1024.png');
            this.load.image('umbrella', '../assets/img/umbrella.png');
            this.load.start();

        },
        drawPieProgress: function(_progress) {
            var that = this;
            that.pgGraphics.clear();
            that.pgGraphics.lineStyle(6, 0x29ABE2);
            that.pgGraphics.arc(this.game.width / 2, this.game.height / 2, 45, this.game.math.degToRad(270), this.game.math.degToRad(360 * _progress / 100 + 270), false);
            that.pgGraphics.endFill();

        },
        create: function() {
            var that = this;
            that.pgGraphics = this.add.graphics(0, 0);
            var style = {
                fontStyle: 'italic',
                font: 'Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei',
                fontSize: 19,
                fill: '#000',
                align: 'center'
            };
            that.progress = this.add.text(this.game.width / 2, this.game.height / 2 + 5, '0%', style);
            that.progress.anchor.setTo(0.5);
            this.load.onFileComplete.add(that.onfileComplete, this);
            this.load.onLoadComplete.addOnce(that.onLoadComplete, this);
            this.loadResources();

        },
        onLoadComplete: function() {
            var that = this;
            that.game.state.start('State1');
            return;

        },
        onfileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
            var that = this;
            that.drawPieProgress(progress);
            that.progress.text = progress + '%';
        }
    };

}());