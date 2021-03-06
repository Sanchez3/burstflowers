/**
 * Created by Sanchez
 */
(function() {
    'use strict';
    var State1 = function() {};
    module.exports = State1;
    var countTime = 0;
    State1.prototype = {
        create: function() {

            //  Texture must be power-of-two sized or the filter will break



            var parray = [];
            for (var i = 1; i <= 26; i++) {
                parray.push('p' + i+'.png');
            }
            var man_emitter = this.add.emitter(this.game.world.centerX - 20, this.game.world.centerY + 250, 200);
            man_emitter.makeParticles('p_sprites',parray);
            man_emitter.gravity = 0;
            man_emitter.setAlpha(0.7, 1, 0);
            man_emitter.maxParticleScale = 1;
            man_emitter.minParticleScale = 0.5;
            man_emitter.setRotation(-30, 30);
            man_emitter.setXSpeed(0, 0);
            man_emitter.setYSpeed(0, 0);
            man_emitter.alpha = 0;
            man_emitter.flow(15000, 1500, 4, -1);
            man_emitter.setAlpha(1, 0, 9000, Phaser.Easing.Quartic.In);

            this.m = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 200, 'man');
            this.m.anchor.setTo(0.5);

            var flowers = this.add.sprite(0, 0, 'flowers');
            var fragmentSrc1 = [

                "precision mediump float;",

                "uniform float     time;",
                "uniform vec2      resolution;",
                "uniform sampler2D iChannel0;",

                "void main( void ) {",

                "vec2 uv = gl_FragCoord.xy / resolution.xy;",

                "// Flip-a-roo.",
                "uv.y *= -1.0;",

                "// Represents the v/y coord(0 to 1) that will not sway.",
                "float fixedBasePosY = 0.0;",

                "// Configs for you to get the sway just right.",
                "float speed = 2.0;",
                "float verticleDensity = 3.0;",
                "float swayIntensity = 0.02;",

                "// Putting it all together.",
                "float offsetX = sin(uv.y * verticleDensity + time * speed) * swayIntensity;",

                "// Offsettin the u/x coord.",
                "uv.x += offsetX * (uv.y - fixedBasePosY);",

                "gl_FragColor = texture2D(iChannel0, uv);",

                "}"
            ];
            var customUniforms = {
                iChannel0: { type: 'sampler2D', value: flowers.texture, textureData: { repeat: true } }
            };
            this.mfilter = new Phaser.Filter(this.game, customUniforms, fragmentSrc1);
            this.mfilter.setResolution(1024, 1024);
            // this.mfilter.addToWorld(this.game.world.centerX,this.game.world.centerY,2048,2048,0.5,0.5)
            flowers.filters = [this.mfilter];


            var top_emitter = this.add.emitter(this.game.world.centerX, this.game.world.centerY - 180, 200);
            top_emitter.makeParticles('p_sprites',parray);
            top_emitter.setAlpha(0.5, 0, 10000, Phaser.Easing.Quartic.In);
            top_emitter.gravity = -10;
            top_emitter.maxParticleScale = 0.8;
            top_emitter.minParticleScale = 0.5;
            top_emitter.setRotation(-30, 30);
            top_emitter.flow(15000, 1500, 3, -1);
            top_emitter.width = 200;
            top_emitter.setYSpeed(-100, 0);


            var bottom_emitter = this.add.emitter(this.game.world.centerX, this.game.world.centerY - 180, 1000);
            bottom_emitter.makeParticles('p_sprites',parray);
            bottom_emitter.width = 170;
            bottom_emitter.bringToTop = true;
            bottom_emitter.maxParticleScale = 1.1;
            bottom_emitter.minParticleScale = 0.4;
            bottom_emitter.setXSpeed(-100, 100);
            bottom_emitter.setScale(0.4, 1.4, 0.4, 1.4, 12000, Phaser.Easing.Sinusoidal.InOut);
            // bottom_emitter.setYSpeed(0, 100);
            // emitter.minParticleSpeed.set(-100, 10);
            // emitter.setXSpeed(-100, 100);
            // emitter.setYSpeed(200, 200);
            bottom_emitter.setRotation(-30, 30);
            bottom_emitter.setAlpha(1, 0, 15000, Phaser.Easing.Quartic.In);
            bottom_emitter.gravity = 30;

            // emitter.start(false, 0, 150);
            bottom_emitter.flow(15000, 1500, 5, -1)
            // emitter.emitX=0;
            var speed = { x: 200, y: 0 };

            this.bottom_emitter = bottom_emitter;
            this.top_emitter = top_emitter;
            this.man_emitter = man_emitter;

            this.firstP = false;
            this.u = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, 'umbrella');
            this.u.anchor.setTo(0.5);

            var hand = this.add.image(this.game.world.centerX, this.game.world.centerY + 150, 'hand');
            hand.anchor.setTo(0.5);
            TweenMax.to(hand.scale, 0.8, {
                x: 0.9,
                y: 0.9,
                repeat: 5,
                yoyo: true,
                yoyoEase:Power2.easeIn,
                onComplete: function() {
                    // TweenMax.to(hand, 0.3, { alpha: 0 })
                }
            })
        },
        update: function() {
            var that = this;
            that.mfilter.update();

            if (this.game.input.activePointer.isDown) {
                countTime++;
                this.firstP = true;
                this.top_emitter.maxParticleScale = 1.2;
                this.bottom_emitter.maxParticleScale = 1.3;

                this.man_emitter.alpha = 1;
                this.man_emitter.setXSpeed(-300, 300);
                this.man_emitter.setYSpeed(-300, 300);

                if (this.bottom_emitter.frequency > 200) {
                    if (this.bottom_emitter.gravity < 100) {
                        this.bottom_emitter.gravity++;
                    }
                    this.top_emitter.frequency -= 50;
                    this.bottom_emitter.frequency -= 50;
                    this.man_emitter.frequency -= 50;
                }

            }
            if (this.firstP && this.game.input.activePointer.isUp) {

                this.man_emitter.setXSpeed(0, 0);
                this.man_emitter.setYSpeed(0, 0);
                // this.man_emitter.alpha = 0;
                // TweenMax.to(this.man_emitter,0.3,{alpha:0});

                this.firstP = false;
                countTime = 0;
                TweenMax.to(this.bottom_emitter, 0.3, {
                    gravity: 30,

                });
                TweenMax.to([this.top_emitter, this.bottom_emitter, this.man_emitter], 0.3, {
                    frequency: 1500,
                    onComplete: function() {
                        that.top_emitter.maxParticleScale = 0.8;
                        that.bottom_emitter.maxParticleScale = 1.1;

                    }
                });
            }

        }
    };

}());