/**
 * メモ DOMContentLoaded(先) -> load(後)
 */
 (
    () => {
        const layerCanvas = function (id, width, height) {
            const wrap = document.getElementById(id);
            let count = 0;

            return {
                addCanvas: () => {
                    const cvs = document.createElement("canvas");
                    cvs.classList.add("canvas");
                    cvs.setAttribute("width", width);
                    cvs.setAttribute("height", height);
                    cvs.style.zIndex = count;
                    wrap.appendChild(cvs);
                    count++;
                    return cvs;
                }
            };
        };

        /**
         * 追加したcanvas要素をlayer設定で調整できるようにする。
         * @param {number} count 
         * @param {string} value 
         */
        const addLayerList = function (count, value) {
            var layer = document.getElementById('layers');
            layer.insertAdjacentHTML('beforeend',
                    `\n<li class="layerList" data-index="${count}">\n
                    <div>\n
                    <i class="bx bxs-up-arrow" onclick="layerUpclk()"></i>\n
                    <i class="bx bxs-down-arrow" onclick="layerDownclk()"></i>\n
                    </div>\n
                    <div>${value + count}</div>\n
                    <div><i class="bx bx-show" onclick="showclk()"></i></div>\n
                    </li>`
                );
        }
        
        window.addEventListener("DOMContentLoaded", () => {
            // const lcv = layerCanvas("canvas-wrap", 450, 318.18); // 横画面
            const lcv = layerCanvas("canvas-wrap", 318.18, 450); // 縦画面
            let count = 0;

            const cvs = lcv.addCanvas();
            cvs.setAttribute('id', 'background-canvas');
    
            // レイヤー追加ボタンのイベント登録
            var btnID = document.getElementById("btn");
            btnID.addEventListener("click", () => {
                const newCanvas = lcv.addCanvas();
                count++;
                const ctx = newCanvas.getContext("2d");
                const v = btnID.value;
                ctx.fillText(v + count, count * 20, count * 20);
                // レイヤー設定エリアにレイヤー情報を追加
                addLayerList(count, btnID.value);
            });

            // サンプル用丸追加
            var btnR = document.getElementById('btn-round');
            btnR.addEventListener('click', () => {
                const newCanvas = lcv.addCanvas();
                count++;
                newCanvas.id = 'round' + count;
                creatShape(newCanvas.id, 'round');
                addLayerList(count, 'round');
            })
            // サンプル用三角追加
            var btnT = document.getElementById('btn-triangle');
            btnT.addEventListener('click', () => {
                const newCanvas = lcv.addCanvas();
                count++;
                newCanvas.id = 'triangle' + count;
                creatShape(newCanvas.id, 'triangle')
                addLayerList(count, 'triangle');
            })
            // サンプル用四角追加
            var btnS = document.getElementById('btn-square');
            btnS.addEventListener('click', () => {
                const newCanvas = lcv.addCanvas();
                count++;
                newCanvas.id = 'square' + count;
                creatShape(newCanvas.id, 'square')
                addLayerList(count, 'square');
            })

            // fontFamilyのサンプルテキスト用のイベント登録
            var textDOM = document.getElementById('InsertText')
            var sampleTextDom = document.getElementById('sampleText')
            textDOM.addEventListener('input', (event) => {
                sampleTextDom.innerText = event.currentTarget.value
                if (sampleTextDom.innerText == '') {
                    sampleTextDom.innerText = 'サンプルテキスト';
                    sampleTextDom.style.fontSize = '1em'
                }
                if (sampleTextDom.innerText.length >= 10) {
                    sampleTextDom.style.fontSize = '0.7em'
                }
            });
        });
    }
)();
function header_clk() {
    // クリックされたイベントを取得
    var event = window.event;
    // イベントから要素を取得
    var elemnt = event.target;
    // 要素からvalueを取得
    var eValue = elemnt.value;
    // setting-content内要素の開閉
    var collapseDOM = document.getElementById(`${eValue}-content`);
    if (collapseDOM.classList.contains('collapsed')) {
        collapseDOM.classList.remove('collapsed')
    } else {
        collapseDOM.classList.toggle('collapsed')
    }
    // サンプルテキスト用
    if (eValue == 'fontFamily') {
        var collapseDOM_Sample = document.getElementById('sampleText-wrap');
        if (collapseDOM_Sample.classList.contains('collapsed')) {
            collapseDOM_Sample.classList.remove('collapsed')
        } else {
            collapseDOM_Sample.classList.toggle('collapsed')
        }
    }
}
function bg_clk() {
    var event = window.event;
    // イベントから要素を取得
    var elemnt = event.target;
    // 要素のインナーテキストからカラーを取得
    var color = elemnt.innerText;
    // clearのみ、transparentに変更。
    if (color == 'clear') {
        color = 'transparent'
    }
    // 背景canvasの背景色を変更。
    var bg_cvs = document.getElementById('background-canvas');
    bg_cvs.style.backgroundColor = color;
    // 選択中のクラスを追加 + 削除
    var eleClrs = document.getElementsByClassName('bgColors')
    for (let i = 0; i < eleClrs.length; i++){
        if (eleClrs[i].classList.contains('selected')) {
            eleClrs[i].classList.remove('selected')
            eleClrs[i].disabled = false;
        } else if (eleClrs[i].innerText == color) {
            eleClrs[i].classList.toggle('selected')
            eleClrs[i].disabled = true;
        } else if (eleClrs[i].innerText == 'clear' && color == 'transparent') {
            eleClrs[i].classList.toggle('selected')
            eleClrs[i].disabled = true;
        }
    }
}

function layerUpclk(){
    // クリックした要素の保持
    var source　= window.event.path[2]
    // 移動先の要素のinnerHTML保持用関数
    var replace;
    console.log('up clk', source)
    // レイヤーリストの要素取得
    var layers = document.getElementsByClassName('layerList');
    for (let i = 0; i < layers.length; i++){
      // もし、レイヤーリスト要素のindexがクリックした要素と一致した場合。
      if (layers[i].dataset.index == source.dataset.index){
        // 移動先の要素(ひとつ上 = -1)を保持。
        replace = layers[i-1].innerHTML;
        // 移動先.innerHTMLを、クリックした要素のinnerHTMLで上書き。
        layers[i-1].innerHTML = source.innerHTML;
        // クリックした要素のinnerHTMLを、移動先の保持していた要素で上書き。
        source.innerHTML = replace;
        break;
      }
    }

}
function layerDownclk(){
    var source;
    var replace;
    var e = window.event;
    source = e.path[2]
    console.log('down clk', source)
    var layers = document.getElementsByClassName('layerList');
    for (let i = 0; i < layers.length; i++){
      if (layers[i].dataset.index == source.dataset.index){
        replace = layers[i+1].innerHTML
        layers[i+1].innerHTML = source.innerHTML;
        source.innerHTML = replace;
        break;
      }
    }
}
function showclk() {
    console.log('show clicked')
}
/**
 * canvasに図形を描画 + クリックイベント各種を登録
 * @param {string} id 
 * @param {string} mode 
 */
function creatShape(id, mode) {
    // Stageオブジェクトを作成します
    var stage = new createjs.Stage(id);

    // タッチ操作をサポートしているブラウザのみ有効
    if(createjs.Touch.isSupported() == true){
      // タッチ操作を有効化
      createjs.Touch.enable(stage);
    }
    
    // ドラッグした場所を保存する変数。(これがないと不自然な形で動く。)
    var dragPointX;
    var dragPointY;
    
    // 図形の作成
    var shape = new createjs.Shape();
    shape.x = stage.canvas.width / 2; // 画面中央に配置(幅)
    shape.y = stage.canvas.height / 2; // 画面中央に配置(高)
    if (mode == 'round') {
        // 図形(ボール)の半径
        var radius = 100;
        shape.graphics.beginFill("DarkRed").drawCircle(0, 0, radius);
    }
    if (mode == 'triangle') {
        shape.graphics.beginFill("Red");
        shape.graphics.moveTo(-60, +30);
        shape.graphics.lineTo(-60, -30);
        shape.graphics.lineTo(30, 0);
    }
    if (mode == 'square') {
        // 四角オブジェクトの作成
        shape.graphics.beginFill("blue").drawRect(0,0, 50, 50);
    }
    stage.addChild(shape);

    // インタラクティブ(相互作用)の設定
    shape.addEventListener("mousedown", handleDown);
    shape.addEventListener("pressmove", handleMove);
    shape.addEventListener("pressup", handleUp);

    // 押したときの処理
    function handleDown(event){
      // ドラッグを開始した座標を覚えておく
      dragPointX = stage.mouseX - shape.x;
      dragPointY = stage.mouseY - shape.y;
      // 半透明にする
      shape.alpha = 0.5;
    }

    // 押した状態で動かした時の処理
    function handleMove(event){

      // オブジェクトはマウス座標に追随する。ただしドラッグ開始地点との補正を入れる
      shape.x = stage.mouseX - dragPointX;
      shape.y = stage.mouseY - dragPointY;
    }

    // 離した時の処理
    function handleUp(event){

      // 元の透明度に戻す
      shape.alpha = 1.0
    }

    // 時間経過
    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick(event){
      stage.update(); // 画面更新
    }
}
function LayerMove(target, mode) {
    // 避難用配列の用意
    var shelter = [];
    // 指定のレイヤーの格納場所
    var targetObject = [];
    // オブジェクトの数を格納。(キャンバス上から変動するため。)
    var len = stage.children.length;
    // 指定レイヤーのStageキャンバスでのインデックス番号の取得。
    var targetIndex = stage.children.findIndex(n => n.name == target);
    console.log(targetIndex);
    // もし、ターゲットがない場合or最前面=lenと同じ場合は処理を中断する。
    if (len - 1 == targetIndex && mode == 'up') {
        return console.log('最前面です。')
    }
    if (targetIndex == 0 && mode == 'down') {
        return console.log('最背面です。')
    }
    // オブジェクトをcanvas上から避難用配列へ移動。
    for (let i = 0; i < len; i++){
        // ターゲットのインデックス番号がループ回数と一致、つまりターゲットを取り出す際はtargetObjectへ移動させる。
        if (i == targetIndex) {
            targetObject.push(stage.children.shift());
            continue;
        }
        // ターゲットのインデックス以外はシェルターへ移動。
        shelter.push(stage.children.shift());
    }
    console.log(shelter, targetObject, targetIndex)
    // 避難用配列からcanvasへ戻す。
    for (let i = 0; i < len; i++){
        // mode = upのとき、ターゲットが元あったインデックス番号のときに、
        // "先に"シェルターの要素を入れてからターゲットを入れることで
        // 入れ替え(レイヤーを上げること)が可能になる。
        if (i == targetIndex && mode == 'up') {
            console.log('up')
            stage.addChild(shelter.shift());
            stage.addChild(targetObject.shift());
            i++
            continue;
        }
        // mode = downのとき、ターゲットの"１つ前"のインデックス番号のときに、
        // ターゲットオブジェクトをstageに追加し、その後にシェルターの要素を入れることで
        // 入れ替え(レイヤーを下げる)が可能になる。
        if (i == targetIndex - 1 && mode == 'down') {
            console.log('down')
            stage.addChild(targetObject.shift());
            stage.addChild(shelter.shift());
            i++;
            continue;
        }
        // それ以外はシェルターからcanvasへ戻していく。
        stage.addChild(shelter.shift());
    }
}
document.getElementById('btn-save').addEventListener('click', () => {
    var cvs = document.getElementById('summary');


    stage.update();

    var base64 = cvs.toDataURL("image/png");
    var DL = document.getElementById('download');
    DL.href = base64;
    var summary = new createjs.Stage('summary');

})