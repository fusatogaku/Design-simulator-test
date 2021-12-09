window.addEventListener("load", init);
function init() {
    // Stageオブジェクトを作成します
    var stage = new createjs.Stage("myCanvas");

    // リサイズイベントを検知して、リサイズ処理
    window.addEventListener("resize", handleResize);
    handleResize(); // 起動時にもリサイズしておく。

    // タッチイベントが有効なブラウザの場合、有効化する
    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage);
    }

    // リサイズ処理
    function handleResize(event){
        // 画面幅・高さを調整
        var w = window.innerWidth;
        var h = window.innerHeight;

        // Canvas要素の大きさを合わせる
        stage.canvas.width = w;
        stage.canvas.height = h;

        stage.update();
    }

    // 描画できるようにする
    var shape = new createjs.Shape();
    stage.addChild(shape);

    // ステージ上でマウスボタンを押した時のイベント設定
    stage.addEventListener("stagemousedown", handleDown);

    // マウスを押した時に実行される
    function handleDown(event){
        // 線の色
        var paintColor = document.querySelector("#inputColor").value;
        
        // 線の描画を開始
        shape.graphics.beginStroke(paintColor);

        shape.graphics.moveTo(event.stageX, event.stageY) // 描画開始位置を指定。

        // ステージ上でマウスを動かした時と離した時のイベント指定
        stage.addEventListener("stagemousemove", handleMove);
        stage.addEventListener("stagemouseup", handleUp);
    }

    // マウスが動いたときに実行
    function handleMove(event){
        // マウス座標へ線を引く
        shape.graphics.lineTo(event.stageX, event.stageY);
    }

    // マウスボタンが離れたときに実行される
    function handleUp(event){
        // マウス座標への線を引く
        shape.graphics.lineTo(event.stageX, event.stageY);

        // 線の描画を終了する
        shape.graphics.endStroke();

        // イベント終了
        stage.removeEventListener("stagemousemove", hanleMove);
        stage.removeEventListener("stagemouseup", hanleUp);
    }

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", onTick);
    function onTick(){
        
        // ステージの描画を終了
        stage.update();
    }
    
    // リセットボタンの処理
    document.querySelector("#buttonReset").addEventListener("click", function(){
        var result = confirm("リセットしてもよろしいですか？");
        if (result == true) {
        // shape のグラフィックを消去
        shape.graphics.clear(); 
        }
    });

    // 保存ボタンの処理
    document.querySelector("#buttonSave").addEventListener("click", function(){
        // Canvasタグから画像に変換
        var png = stage.canvas.toDataURL();
        // 新規ウィンドウで画像を表示
        window.open(png);
    });

}