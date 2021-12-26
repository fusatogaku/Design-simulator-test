window.addEventListener('load', init)
function init() {
    // 背景canvasの作成。
    const wrap = document.getElementById('canvas-wrap')
    const cvs = document.createElement('canvas');
    cvs.classList.add('canvas');
    // 縦画面
    cvs.setAttribute('width', 318.18);
    cvs.setAttribute('height', 450);
    // 横画面
    // cvs.setAttribute('width',450);
    // cvs.setAttribute('height', 318.18);
    cvs.setAttribute('id', 'background-canvas')
    wrap.appendChild(cvs);
    stage = new createjs.Stage('background-canvas');
    stage.update();

    // 各種イベント登録
    addText('btn');
    addShapeBtn('btn-round', 'round');
    addShapeBtn('btn-delta', 'delta');
    addShapeBtn('btn-square', 'square');
    fontFamilySampleText();
}

/**
 * 指定のidにcanvasにテキストを挿入できるようにする。
 * @param {string} id 
 */
function addText(id) {
    var btnID = document.getElementById(id);
    btnID.addEventListener("click", () => {
        alert('今使ってないよ')
    });
}

/**
 * canvasに図形を描画 + クリックイベント各種を登録
 * round, delta, square,
 * @param {string} id 
 * @param {string} mode 
 */
function addShapeBtn(id, mode) {
    var btn = document.getElementById(id);
    btn.addEventListener('click', () => {

        // タッチ操作をサポートしているブラウザのみ有効
        if(createjs.Touch.isSupported() == true){
          // タッチ操作を有効化
          createjs.Touch.enable(stage);
        }
        var dragPointX;
        var dragPointY;
        
        // 図形の作成
        var shape = new createjs.Shape();
        shape.name = mode + shape.id;
        shape.x = stage.canvas.width / 2; // 画面中央に配置(幅)
        shape.y = stage.canvas.height / 2; // 画面中央に配置(高)
        if (mode == 'round') {
            // 図形(ボール)の半径
            shape.graphics.beginFill("DarkRed").drawCircle(0, 0, 100);
        }
        if (mode == 'delta') {
            shape.graphics.beginFill("Red");
            shape.graphics.moveTo(-100, +50);
            shape.graphics.lineTo(-100, -50);
            shape.graphics.lineTo(50, 0);
        }
        if (mode == 'square') {
            // 四角オブジェクトの作成
            shape.graphics.beginFill("blue").drawRect(0,0, 100, 100);
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
        }
        // 押した状態で動かした時の処理
        function handleMove(event){
          // オブジェクトはマウス座標に追随する。ただしドラッグ開始地点との補正を入れる
          shape.x = stage.mouseX - dragPointX;
          shape.y = stage.mouseY - dragPointY;
        }
        // 離した時の処理
        function handleUp(event){
            console.log('moving');
        }
    
        // 時間経過
        createjs.Ticker.addEventListener("tick", handleTick);
        function handleTick(event){
          stage.update(); // 画面更新
        }

        // layers要素(レイヤー設定画面)に追加したオブジェクトを追加。
        addLayerList(shape)
    })
}
/**
 * 追加したcanvas要素をlayer設定で調整できるようにする。
 * shape:
 *  作成したオブジェクト
 * @param {object} shape
 */
function addLayerList (shape) {
    var layer = document.getElementById('layers');
    layer.insertAdjacentHTML('afterbegin',
        `\n<li class="layerList" data-index="${shape.id}" data-name="${shape.name}">\n
        <div>\n
        <i class="bx bxs-up-arrow" onclick="layerMoveBtn('up')"></i>\n
        <i class="bx bxs-down-arrow" onclick="layerMoveBtn('down')"></i>\n
        </div>\n
        <div>${shape.name}</div>\n
        <div><i class="bx bx-show" onclick="showclk()"></i></div>\n
        </li>`
    );
}
/**
 * fontFamilyのサンプルテキスト用のイベント登録
 */
function fontFamilySampleText() {
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
}
/**
 * onclick属性用
 * setting-header要素がクリックされた際のセッティング画面の開閉。
 */
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

/**
 * onclick属性用
 * canvasの背景のセッティングに使用。
 * クリックされた要素の内容によって、canvasの背景を変更する。
 */
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

/**
 * onclick属性用
 * layers要素(レイヤー設定)で、上下ボタンに連動した
 * 重ね順の上下機能を設定する。
 */
function layerMoveBtn(mode){
    var source;
    var replace;
    var e = window.event;
    source = e.path[2]
    console.log(mode, source)
    var layers = document.getElementsByClassName('layerList');
    for (let i = 0; i < layers.length; i++){
        var jugde = layers[i].dataset.index == source.dataset.index;
        if (jugde && (mode == 'up')){
            replace = layers[i - 1].innerHTML
            layers[i-1].innerHTML = source.innerHTML;
            source.innerHTML = replace;
            layerMove(source.children[1].innerText, mode);
            break;
        }
        if (jugde && (mode == 'down')){
            replace = layers[i + 1].innerHTML
            layers[i+1].innerHTML = source.innerHTML;
            source.innerHTML = replace;
            layerMove(source.children[1].innerText, mode);
            break;
        }
    }
}

function layerMove(target, mode) {
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
            console.log('target is ', targetObject[0].name)
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