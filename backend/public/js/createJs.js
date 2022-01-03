window.addEventListener('load', init)
function init() {
    // 背景canvasの作成。
    const wrap = document.getElementById('canvas-wrap')
    const cvs = changeCanvas('row') // 縦画面
    // const cvs = changeCanvas('column') // 横画面
    wrap.appendChild(cvs);
    stage = new createjs.Stage('background-canvas');
    stage.update();

    // 各種イベント登録
    addText('btn');
    addShapeBtn(stage, 'btn-round', 'round');
    addShapeBtn(stage, 'btn-delta', 'delta');
    addShapeBtn(stage, 'btn-square', 'square');
    fontFamilySampleText();
    canvasSave();
    addInputFile(stage);
    // addCustomText(stage);
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
 * @param {createjs.Stage()} stage 
 * @param {string} id 
 * @param {string} mode 
 */
function addShapeBtn(stage, id, mode) {
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
        stage.update(); // 画面更新

        addMouseEvents(stage, shape);

        // layers要素(レイヤー設定画面)に追加したオブジェクトを追加。
        addLayerList(shape)
    })
}
/**
 * 指定のオブジェクトにクリックイベントを登録する。
 * @param {object} stage 
 *  - Stage instance created by createjs.
 * @param {object} shape 
 *  - shape instance created by createjs.
 */
function addMouseEvents(stage, shape) {
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
    function handleTick(event) {
        stage.update(); // 画面更新
    }
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
        `\n<li class="layerList" data-index="${shape.id}">\n
        <div>\n
        <i class="bx bxs-up-arrow" onclick="layerMoveBtn('up')"></i>\n
        <i class="bx bxs-down-arrow" onclick="layerMoveBtn('down')"></i>\n
        </div>\n
        <div>${shape.name}</div>\n
        <div><i class="bx bxs-show" onclick="layerSwicthBtn('hide')"></i></div>\n
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
    // イベントから要素を取得
    var elemnt = window.event.target;
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
    source = window.event.path[2]
    console.log(mode, source)
    var layers = document.getElementsByClassName('layerList');
    for (let i = 0; i < layers.length; i++){
        var jugde = layers[i].dataset.index == source.dataset.index;
        if (jugde && (mode == 'up')){
            layerMove(source.children[1].innerText, mode);
            replace = layers[i - 1].innerHTML
            layers[i-1].innerHTML = source.innerHTML;
            source.innerHTML = replace;
            break;
        }
        if (jugde && (mode == 'down')){
            layerMove(source.children[1].innerText, mode);
            replace = layers[i + 1].innerHTML
            layers[i+1].innerHTML = source.innerHTML;
            source.innerHTML = replace;
            break;
        }
    }
}
/**
 * layerMoveBtnで使用する関数。
 * targetのオブジェクトを１つ前面(背面)に移動させる。
 * @param {string} target 
 * @param {string} mode 
 * @returns message -> 最前面 or 最背面です。
 */
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
/**
 * 保存用イベント
 */
function canvasSave() {
    // 保存ボタンを取得 ~ クリックイベント登録
    document.getElementById('btn-save').addEventListener('click', () => {
        // 保存するcanvas要素の取得
        var cvs = document.getElementById('background-canvas');
    
        // 取得したcanvas要素からpngイメージのbase64コードを受け取る
        var base64 = cvs.toDataURL("image/png");
        // ダウンロードリンクを取得 ~ ダウンロードできるファイル(base64コード)を挿入。
        var DL = document.getElementById('download');
        DL.href = base64;
        // 完成図のイメージ(base64コード)を挿入。
        document.getElementById('summary').src = base64;
    })
}
/**
 * onclick属性用
 * クリックされたステッカーをcanvas上に描画する。
 */
function addSticky() {
    stickyElement = window.event.target;
    console.log(stickyElement);

    var sticky = new createjs.Bitmap(stickyElement.src);
    sticky.name = stickyElement.dataset.stickyName

    // インタラクティブ(相互作用)の設定
    sticky.addEventListener("mousedown", () => {
        // ドラッグを開始した座標を覚えておく
        dragPointX = stage.mouseX - sticky.x;
        dragPointY = stage.mouseY - sticky.y;
    });
    sticky.addEventListener("pressmove", () => {
        // オブジェクトはマウス座標に追随する。ただしドラッグ開始地点との補正を入れる
        sticky.x = stage.mouseX - dragPointX;
        sticky.y = stage.mouseY - dragPointY;

    });
    sticky.addEventListener("pressup", () => {
        console.log('moved')
    });
    
    // 時間経過
    createjs.Ticker.addEventListener("tick", () => {
        stage.update(); // 画面更新
    });

    stage.addChild(sticky);
    addLayerList(sticky)
    stage.update();
}
/**
 * onclick属性用
 * クリックしたレイヤーのオブジェクトを表示・非表示にする。
 * @param {string} mode 
 *  - hide, show
 */
function layerSwicthBtn(mode) {
    var e = window.event;

    var n = e.path[2].children[1].innerText
    for (let i = 0; i < stage.children.length; i++){
        var targetObject = stage.children[i]
        var judge = targetObject.name == n
        if (judge && (mode == 'hide')) {
            targetObject.visible = false;
            e.path[1].innerHTML = `<i class='bx bxs-hide' onclick="layerSwicthBtn('show')"></i>`
        }
        if (judge && (mode == 'show')) {
            targetObject.visible = true;
            e.path[1].innerHTML = `<i class='bx bxs-show' onclick="layerSwicthBtn('hide')"></i>`
        }
    }
    console.log(e)
    stage.update();
}
/**
 * テスト用
 * 指定のオブジェクトを削除する。
 * @param {string} o 
 * - オブジェクトの名前
 */
function deleteObject(o) {
    // canvas上
    for (let i = 0; i < stage.children.length; i++){
        var c = stage.children[i];
        var judge = c.name == o;
        if (judge) {
            stage.removeChild(c)
            break;
        }
    }
    // レイヤー画面上
    layers = document.getElementById('layers')
    for (let i = 0; i < layers.children.length; i++){
        var c = layers.children[i];
        var judge = c.children[1].innerText == o;
        if (judge) {
            layers.removeChild(c)
            break;
        } 
    }
}
/**
 * 画像を取り込み、stageに追加する。
 * @param {createjs.Stage()} stage 
 */
function addInputFile(stage) {
    var inputElement = document.getElementById('inputFile'); // inputタグ
    var inputArea = document.getElementById('inputFileArea'); // 画像インスタンスの置き場所(display: none;)

    // 「取り込み」を押したら、非表示にしてあるinputをクリックする。
    var inputBtn = document.getElementById('inputFileBtn');
    const fileSelect = () => {
        inputElement.click();
        return false;
    }
    inputBtn.addEventListener('click', fileSelect);

    // 取り込んだ画像をimgとしてインスタンス化。imgをbitmapインスタンスへ変換してstageへ挿入。
    const addImage = async () => {
        loadingBox('open');
        // 同じimgタグを使用すると、先に描画した内容まで変わってしまうので、一度削除
        if (inputArea.children.length !== 0) {
            inputArea.removeChild(inputArea.firstChild)
        }
        console.log('reading file ->', inputElement.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(inputElement.files[0]);
        await wait(1); // 読み込みに時間かかるため、非同期処理で処理待機。
        inputArea.insertAdjacentHTML('beforeend',
            `<img id="inputFileImage" src="${reader.result}">`);
        var inputImage = document.getElementById('inputFileImage'); // imgタグ

        var file = new createjs.Bitmap(inputImage);
        file.name = inputElement.files[0].name + file.id;
        await wait(0.5);　// 読み込みに時間かかるため、非同期処理で処理待機。
        file = resizeObject(stage, file, file.image.naturalWidth, file.image.naturalHeight);
        stage.addChild(file)
        await wait(1);　// 読み込みに時間かかるため、非同期処理で処理待機。
        stage.update();
        addMouseEvents(stage, file);
        addLayerList(file);
        loadingBox('close');
    }
    inputElement.addEventListener('change', addImage)
}
/**
 * 処理を待つ間、画面にローディング画面を出す。
 * @param {string} mode 
 * - open, close
 */
const loadingBox = (mode) => {
    loadingBoxElement = document.getElementById('loading-box');
    if (mode == 'open') {
        loadingBoxElement.style.display = 'flex';
    } else if(mode == 'close'){
        loadingBoxElement.style.display = 'none';
    }
}
/**
 * 非同期処理用のawait用関数
 * @param {Number} sec 
 * @returns wait time.
 */
const wait = (sec) => {
    return new Promise((resolve) => {
      setTimeout(resolve, sec*1000);
    });
};
/**
 * 指定のCanvasオブジェクトをstageのサイズに合うようにリサイズする。
 * 
 * @param {object} stage 
 *  - Stage instance created by createjs.
 * @param {object} shape 
 *  - Object instance created by createjs.
 * @param {Number} naturalWidth 
 *  - The original width of the object.
 * @param {Number} naturalHeight 
 *  - The original height of the object.
 * @returns 
 */
function resizeObject(stage, shape, naturalWidth, naturalHeight) {
    console.log('start resizeSequence', stage, shape)
    var stageW = stage.canvas.width;
    var stageH = stage.canvas.height;
    scale = 1;
    console.log(stageW, stageH, naturalWidth, naturalHeight)

    if (stageW >= naturalWidth * scale) {
        console.log('Wstageのほうが大きいのでOK')
    } else {
        console.log('Wstageのほうが小さいので、リサイズ')
        while (0 == 0) {
            scale -= 0.01;
            if (stageW >= naturalWidth * scale) {
                shape.scale = scale;
                break;
            }
        }
        shape.scale 
    }
    if (stageH >= naturalHeight * scale) {
        console.log('Hstageのほうが大きいのでOK')
    } else {
        console.log('Hstageのほうが小さいので、リサイズ')
        while (0 == 0) {
            scale -= 0.01;
            if (stageH >= naturalHeight * scale) {
                shape.scale = scale;
                break;
            }
        }
        shape.scale
    }
    return shape;
}
/**
 * onclick属性用
 * サンプルテキストをクリックしたフォントファミリーに設定する。
 * @returns 
 */
function selectFontFamily() {
    var e = window.event.target;
    var targetFont = e.style.fontFamily;
    var fontFamilies = document.getElementsByClassName('fontFamilies');
    var sampleTextDom = document.getElementById('sampleText');
    if (targetFont == sampleTextDom.style.fontFamily) {
        console.log('pass', targetFont, sampleTextDom.style.fontFamily);
        return;
    }
    for (let i = 0; i < fontFamilies.length; i++){
        if (fontFamilies[i].classList.contains('selected')) {
            fontFamilies[i].classList.remove('selected');
            console.log('remove', fontFamilies[i])
        } else if (fontFamilies[i].style.fontFamily == targetFont) {
            fontFamilies[i].classList.toggle('selected');
            sampleTextDom.style.fontFamily = targetFont;
            console.log('toggle');
        }
    }
}

function addCustomText(stage) {
    var insertTextBtn = document.getElementById('insertText-btn');
    insertTextBtn.addEventListener('click', () => {
        var insertText = document.getElementById('sampleText');
        var inputFileArea = document.getElementById('inputFileArea');
        console.log(insertText.innerText);
        
        // var inputTextCanvas = document.createElement('canvas').classList.toggle('addText');
        // inputTextCanvas.setAttribute('width', )
        // inputFileArea.appendChild(inputTextCanvas)
        // var textCanvas = new createjs.Stage('addText');
        // var preText = new createjs.Text(insertText.innerText, `30px ${insertText.style.fontFamily}`, 'DarkRed');
        // textCanvas.addChild(preText);
        // textCanvas.update();
        


        // var container = new createjs.Container();
        // stage.addChild(container);
        // var text = new createjs.Text(insertText.innerText, `30px ${insertText.style.fontFamily}`, 'DarkRed');
        // container.name = `Text - ${insertText.innerText} - ${text.id}`;
        // addMouseEvents(stage, text)
        
        // container.addChild(text);
        // stage.update();
        // addLayerList(container)
    })
}
// ２段構え
// ・テキスト抽出 = insertText.innerText
// ・divタグを作成、抽出したテキストを挿入。
// ・inputFileAreaにdivタグを挿入
function addInfoText() {
    var infoElement = document.createElement('p');
    infoElement.innerHTML = '枠内に収まる形でデザインしてください';
    infoElement.classList.toggle('info');
    infoElement.classList.toggle('column');
    var wrap = document.getElementById('canvas-wrap');
    wrap.appendChild(infoElement);
}

/**
 * canvas要素を縦 or 横画面で生成する。
 * @param {string} mode 
 * - row, column
 * @returns cvs
 */
function changeCanvas(mode) {
    var cvs = document.createElement('canvas')
    cvs.classList.add('canvas')
    cvs.setAttribute('id', 'background-canvas')
    if (mode == 'row') {
        // 縦画面
        cvs.setAttribute('width', 318.18);
        cvs.setAttribute('height', 450);
    }
    if (mode == 'column') {
        // 横画面
        cvs.setAttribute('width',450);
        cvs.setAttribute('height', 318.18);
    }
    return cvs;
}