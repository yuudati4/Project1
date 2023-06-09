// Main
var assets = [
    // 背景
    'images/wack_a_mole_grass_bg_1.png',
    'images/wack_a_mole_grass_bg_2.png',
    'images/wack_a_mole_grass_bg_3.png',
    'images/wack_a_mole_grass_bg_1_b.png',
    'images/wack_a_mole_grass_bg_2_b.png',
    'images/wack_a_mole_grass_bg_3_b.png',
    // 穴
    'images/wack_a_mole_hole_1_a.png',
    'images/wack_a_mole_hole_1_b.png',
    'images/wack_a_mole_hole_2_a.png',
    'images/wack_a_mole_hole_2_b.png',
    'images/wack_a_mole_hole_3_a.png',
    'images/wack_a_mole_hole_3_b.png',
    
    // もぐら
    'images/wack_a_mole_mole.png',
    'images/wack_a_mole_mole_hit_1.png',
    //エフェクト
    'images/wack_a_mole_effect_ouch.png'
 
];

function gameStart(){// ゲーム画面
    var scene = new Scene();
    core.replaceScene(scene); core.resume();
   

    //==========
    // ここから
    //==========

    //空
    scene.backgroundColor = "skyblue";
    //草むら
    var background1 = new Sprite(320, 480);
    background1.image = core.assets['images/wack_a_mole_grass_bg_1.png'];
    background1.x = 0;
    background1.y = 0;
    scene.addChild(background1);
    var background1 = new Sprite(320, 480);
    background1.image = core.assets['images/wack_a_mole_grass_bg_2.png'];
    background1.x = 0;
    background1.y = 120;
    scene.addChild(background1);
    var background1 = new Sprite(320, 480);
    background1.image = core.assets['images/wack_a_mole_grass_bg_3.png'];
    background1.x = 0;
    background1.y = 250;
    scene.addChild(background1);




    //モグラ生成のfunction
    function mole_set(x, y, j){
        
        var hole = new Sprite(82, 28);
        if(j==0){
            hole.image = core.assets['images/wack_a_mole_hole_1_a.png'];
        }else if(j==1){
            hole.image = core.assets['images/wack_a_mole_hole_2_a.png'];
        }else{
            hole.image = core.assets['images/wack_a_mole_hole_3_a.png'];
        }
        
        hole.x = x-16;
        hole.y = y;
        scene.addChild(hole);

        var mole = new Sprite(50,62);
        mole.image = core.assets['images/wack_a_mole_mole.png'];
        mole.x = x;
        mole.y = y;
        scene.addChild(mole);
        function moveMole(mole){
            var wait = getRandom(5, 200);
            var speed = getRandom(5, 20);
            mole.tl.delay(wait);
            mole.tl.moveBy(0, -45, speed);
            mole.tl.delay(speed);
            mole.tl.moveBy(0, 45, speed);
            mole.tl.then(function() {
                moveMole(mole);
            });
        }
        moveMole(mole);
        
        var n = 0;
        mole.addEventListener(enchant.Event.TOUCH_START, function(e){            

            if(n==0){
                var ouch = new Sprite(47, 22);
                ouch.image = core.assets['images/wack_a_mole_effect_ouch.png'];
                ouch.x = this.x;
                ouch.y = this.y;
                ouch.scale(0, 0);
                scene.addChild(ouch);
                ouch.tl.scaleTo(1, 1, 3);
                ouch.tl.and();
                ouch.tl.moveTo(this.x+15, this.y-10, 3);
                ouch.tl.delay(10);
                ouch.tl.then(function(){
                ouch.remove();
            });
                scoreLabel.score += 1;
            }
            n += 1;
            this.image = core.assets['images/wack_a_mole_mole_hit_1.png'];
            this.tl.clear();
            this.tl.moveTo(x, y, 32);
            this.tl.then(function(){
                if(this.y<=y){
                    this.image = core.assets['images/wack_a_mole_mole.png'];
                    this.y = y;
                    n = 0;
                } 

            });
            
            
        });
        
        var hole2 = new Sprite(82, 28);
        if(j==0){
            hole2.image = core.assets['images/wack_a_mole_hole_1_b.png'];
        }else if(j==1){
            hole2.image = core.assets['images/wack_a_mole_hole_2_b.png'];
        }else{
            hole2.image = core.assets['images/wack_a_mole_hole_3_b.png'];
        }
        hole2.x = mole.x-16;
        hole2.y = mole.y;
        scene.addChild(hole2);

        var background1 = new Sprite(60, 70);
        if(j==0){
            background1.image = core.assets['images/wack_a_mole_grass_bg_1_b.png'];
        }else if(j==1){
            background1.image = core.assets['images/wack_a_mole_grass_bg_2_b.png'];
        }else{
            background1.image = core.assets['images/wack_a_mole_grass_bg_3_b.png'];
        }
        background1.x = x-10;
        background1.y = y+21;
        scene.addChild(background1);
    }

    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            var x = 35+(i*100);
            var y = 130*j+130;
            mole_set(x, y, j);
        }
    }


    //==========
    // ここまで
    //==========

    // タイム
    timeLabel = new Label('時間 : 30秒');
    timeLabel.x = 10;
    timeLabel.y = 10;
    timeLabel.color = 'white';
    timeLabel.score = 30;
    scene.addChild(timeLabel);
    scene.tl.setTimeBased();
    scene.tl.delay(1000).then(function() {
        timeLabel.score -= 1;
        timeLabel.text = '時間 : ' + timeLabel.score + '秒';
        if (timeLabel.score == 0) {
            gameover = new Label('叩いたモグラの数：' + scoreLabel.score);
            gameover.font = "200% 'Lora'";
            gameover.textAlign = 'center';
            gameover.width = core.width;
            gameover.y = core.height / 2 - gameover._boundHeight / 2;
            gameover.color = 'white';
            scene.addChild(gameover);
            core.stop();
        }
    }).loop();

    // スコア
    scoreLabel = new Label('得点 : 0');
    scoreLabel.x = 10;
    scoreLabel.y = 30;
    scoreLabel.color = 'white';
    scoreLabel.score = 0;
    scene.addChild(scoreLabel);
    scoreLabel.addEventListener(Event.ENTER_FRAME, function() {
        scoreLabel.text = '得点 : ' + scoreLabel.score;
    });
}

function getRandom(start, end) {
    return start + Math.floor( Math.random() * (end - start + 1));
}

function titleStart(){// タイトル画面
    var scene = new Scene();
    scene.backgroundColor = 'black';
    core.replaceScene(scene); core.pause();
    label = new Label('TOUCH START');
    label.font = "200% 'Lora'";
    label.textAlign = 'center';
    label.width = core.width;
    label.y = core.height / 2 - label._boundHeight / 2;
    label.color = 'white';
    scene.addChild(label);
    scene.on(enchant.Event.TOUCH_START, function(){gameStart();});
}

//==========
// EnchantJS
var core;
enchant();
window.onload = function() {
core = new Core(320, 480);
core.fps = 16;
core.preload(assets);
core.onload = function(){titleStart();};
core.start();
};
