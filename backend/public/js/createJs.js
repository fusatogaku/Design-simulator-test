
window.addEventListener('load', init)
function init() {
    
    dragPointX = 0;
    dragPointY = 0;
    // axisX = 0;
    // axisY = 0;
    // currentAngle = 0;

    textData = {
        'value': 'サンプル SAMPLE',
        'fontSize': 50,
        'fontFamily': '"Hiragino Kaku Gothic ProN", serif',
        'color': 'black',
        'outline': '',
    }
    // 背景canvasの作成。
    const wrap = document.getElementById('canvas-wrap')
    const cvs = changeCanvas('row') // 縦画面
    // const cvs = changeCanvas('column') // 横画面
    wrap.appendChild(cvs);
    stage = new createjs.Stage('background-canvas');
    stage.update();

    if(createjs.Touch.isSupported() == true){
        // タッチ操作を有効にします。
        createjs.Touch.enable(stage)
    }

    // 画面サイズの調整
    resizeWindow();
    window.addEventListener('resize', () => {
        resizeWindow();
    });

    // 各種イベント登録
    // addShapeBtn(stage, 'btn-round', 'round');
    // addShapeBtn(stage, 'btn-delta', 'delta');
    // addShapeBtn(stage, 'btn-square', 'square');
    // fontFamilySampleText();
    canvasSave(stage);
    addInputFile(stage);
    insertTextScreen();
    previewText(stage);
    externalOption(stage); // 仮設置。
    cBoxManage();
    textOption();
    confirmScreen();
    loadingBox('close');
}
/**
 * canvasに図形を描画 + クリックイベント各種を登録
 * round, delta, square,
 * @param {createjs.Stage()} stage 
 * @param {string} id 
 * @param {string} mode 
 */
// const addShapeBtn = (stage, id, mode) => {
//     var btn = document.getElementById(id);
//     btn.addEventListener('click', () => {

//         // タッチ操作をサポートしているブラウザのみ有効
//         if (createjs.Touch.isSupported() == true) {
//             // タッチ操作を有効化
//             createjs.Touch.enable(stage);
//         }
        
//         // 図形の作成
//         var shape = new createjs.Shape();
//         shape.name = mode + shape.id;
//         shape.x = stage.canvas.width / 2; // 画面中央に配置(幅)
//         shape.y = stage.canvas.height / 2; // 画面中央に配置(高)
//         if (mode == 'round') {
//             // 図形(ボール)の半径
//             shape.graphics.beginFill("DarkRed").drawCircle(0, 0, 100);
//         }
//         if (mode == 'delta') {
//             shape.graphics.beginFill("Red");
//             shape.graphics.moveTo(-100, +50);
//             shape.graphics.lineTo(-100, -50);
//             shape.graphics.lineTo(50, 0);
//         }
//         if (mode == 'square') {
//             // 四角オブジェクトの作成
//             shape.graphics.beginFill("blue").drawRect(0, 0, 100, 100);
//         }
//         stage.addChild(shape);
//         stage.update(); // 画面更新

//         addMouseEvents(stage, shape);

//         // layers要素(レイヤー設定画面)に追加したオブジェクトを追加。
//         // addLayerList(shape)
//     })
// };
/**
 * 追加したcanvas要素をlayer設定で調整できるようにする。
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
        if (eleClrs[i].classList.contains('selected-item')) {
            eleClrs[i].classList.remove('selected-item')
            eleClrs[i].disabled = false;
        } else if (eleClrs[i].innerText == color) {
            eleClrs[i].classList.toggle('selected-item')
            eleClrs[i].disabled = true;
        } else if (eleClrs[i].innerText == 'clear' && color == 'transparent') {
            eleClrs[i].classList.toggle('selected-item')
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
 * canvas保存用イベント
 * @param {object} stage 
 * - Stage instance created by createjs.
 */
function canvasSave(stage) {
    var previewImage = document.getElementById('previewImage');
    var background = document.getElementsByClassName('mainContent-wrap')[0];
    // 保存ボタンを取得 ~ クリックイベント登録
    document.getElementById('preview-btn').addEventListener('click', () => {
        save();
        background.style.filter = 'blur(10px)';
        previewImage.style.display = 'block';
    });

    previewImage.addEventListener('click', () => {
        loadingBox('open');
        background.style.filter = 'none';
        previewImage.style.display = 'none';
        stage.removeChildAt(0);
        loadingBox('close');
    });

    document.getElementById('DL-btn').addEventListener('click', () => {
        save();
        document.getElementById('download').click();
    });


    const save = async () => {
        loadingBox('open');
        await preExec(stage);
        // 保存するcanvas要素の取得
        var cvs = document.getElementById('background-canvas');
        var color = cvs.style.backgroundColor;

        // 背景用の矩形作成
        var b = new createjs.Shape();
        b.graphics.beginFill(color).drawRect(0, 0, stage.canvas.width, stage.canvas.height);

        await stage.addChildAt(b, 0); stage.update();
    
        // 取得したcanvas要素からpngイメージのbase64コードを受け取る
        // var base64 = await stage.toDataURL(color); // safariで動作不良のためこのやり方NG
        var base64 = await stage.toDataURL();
        // ダウンロードリンクを取得 ~ ダウンロードできるファイル(base64コード)を挿入。
        document.getElementById('download').href = base64;
        // 完成図のイメージ(base64コード)を挿入。
        document.getElementById('summary').src = base64;
        loadingBox('close');
    }
}
/**
 * onclick属性用
 * クリックされたステッカーをcanvas上に描画する。
 */
async function addSticky() {
    stickyElement = window.event.target;
    loadingBox('open');

    var sticky = await new createjs.Bitmap(stickyElement.src);
    sticky.name = stickyElement.dataset.stickyName;
    sticky = await resizeObject(stage, sticky, sticky.image.naturalWidth, sticky.image.naturalHeight);
    sticky = new createOption(stage, sticky);
    addMouseEvents(stage, sticky);

    stage.addChild(sticky);
    await stage.update();

    var check = document.getElementById('cBox-sticky');
    check.click();
    await wait(0.5);
    loadingBox('close');
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
 * @param {object} stage 
 * - createjs.Stage()インスタンス。
 */
function addInputFile(stage) {
    var inputElement = document.getElementById('inputFile'); // inputタグ

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
        try {
            const reader = new FileReader();
            reader.readAsDataURL(inputElement.files[0]);
            await wait(1); // 読み込みに時間かかるため、非同期処理で処理待機。
            // 画像インスタンス化
            inputImage = new Image();
            inputImage.src = reader.result;
            inputImage.setAttribute('id', 'inputFileImage');
    
            var file = new createjs.Bitmap(inputImage);
            file.name = inputElement.files[0].name + file.id;
            await wait(0.5); // 読み込みに時間かかるため、非同期処理で処理待機。
            file = resizeObject(stage, file, file.image.naturalWidth, file.image.naturalHeight);
            
            file = new createOption(stage, file);
            addMouseEvents(stage, file);
            stage.addChild(file); stage.update();
            await wait(1); // 読み込みに時間かかるため、非同期処理で処理待機。
            // addLayerList(file);
            loadingBox('close');
        } catch (error) {
            console.log(error);
            loadingBox('close');
        }
    }
    inputElement.addEventListener('change', addImage);
}
/**
 * 処理を待つ間、画面にローディング画面を出す。
 * @param {string} mode 
 * - open, close
 */
const loadingBox = (mode) => {
    loadingBoxElement = document.getElementById('loading-box');
    if (mode == 'open') {
        console.log('open loading-box')
        loadingBoxElement.style.display = 'flex';
    } else if(mode == 'close'){
        console.log('close loading-box')
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
 *  - resized object.
 */
const resizeObject = (stage, shape, naturalWidth, naturalHeight) => {
    var stageW = stage.canvas.width;
    var stageH = stage.canvas.height;
    scale = 1;

    if (stageW >= naturalWidth * scale) {
        console.log('width pass.')
    } else {
        console.log('width resize.')
        while (0 == 0) {
            scale -= 0.001;
            if (stageW >= naturalWidth * scale) {
                shape.scale = scale;
                break;
            } else if (scale <= 0) {
                break;
            }
        }
    }
    if (stageH >= naturalHeight * scale) {
        console.log('height pass.')
    } else {
        console.log('height resize.')
        while (0 == 0) {
            scale -= 0.001;
            console.log(scale)
            if (stageH >= naturalHeight * scale) {
                shape.scale = scale;
                break;
            } else if (scale <= 0) {
                break;
            }
        }
    }
    return shape;
}
function resizeOption(regW, regH, option) {
    var W = option.image.naturalWidth;
    var H = option.image.naturalHeight;
    scale = 1.25;
    if (regW >= W * scale) {
        console.log('横幅OK')
    } else {
        console.log('横幅調整')
        while (0 == 0) {
            scale -= 0.001;
            if (regW >= W * scale) {
                option.scaleX = scale;
                break;
            }
        }
    }
    
    scale = 1.25;
    if (regH >= H * scale) {
        console.log('縦幅OK')
    } else {
        console.log('縦幅調整')
        while (0 == 0) {
            scale -= 0.001;
            if (regH >= H * scale) {
                option.scaleY = scale;
                break;
            }
        }
    }
    return option;
}

/** 未使用*/
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
        cvs.setAttribute('width', 352);
        cvs.setAttribute('height', 498.08);
    }
    if (mode == 'column') {
        // 横画面
        cvs.setAttribute('width', 498.08);
        cvs.setAttribute('height', 352);
    }
    return cvs;
}
/**
 * テキスト挿入画面を生成。
 */
function insertTextScreen() {
    var previewCanvas = new createjs.Stage('previewArea');
    var sampleText = new createjs.Text('サンプルテキスト', '30px serif', '#000');

    previewCanvas.addChild(sampleText); previewCanvas.update();
}
/**
 * 入力されたテキストをプレビューエリアに表示させ、決定ボタンでcanvasに挿入させる。
 * @param {object} stage 
 */
function previewText(stage) {
    var textArea = document.getElementById('insertTextInput');
    var previewtAreaDOM = document.getElementById('previewArea');
    var entryTextBtn = document.getElementById('entryTextBtn');
    var fontFamilies = document.getElementsByClassName('fontFamilies');

    previewCanvas = new createjs.Stage('previewArea');
    var sampleText = new createjs.Text('サンプル SAMPLE', '50px "Hiragino Kaku Gothic ProN", serif', 'black');
    sampleText.scaleX = 0.73;
    sampleText.textAlign = 'center';
    sampleText.textBaseline = 'middle';
    sampleText.x = 176; // previewtAreaDOM.clientWidth / 2
    sampleText.y = 40; // previewtAreaDOM.clientHeight / 2
    previewCanvas.addChild(sampleText); previewCanvas.update();

    // その他ボタンのイベント
    var outline = document.getElementById('outlineSwitch');
    outline.addEventListener('click', () => {
        var io = document.getElementById('io-btn-outline');
        if (io.checked) {
            textData.outline = 1;
            previewCanvas.children[0].outline = textData.outline;
        } else {
            textData.outline = 0;
            previewCanvas.children[0].outline = textData.outline;
        }
        previewCanvas.update();
    })
    // 縦書き用（あとからや）
    var write = document.getElementById('writingModeSwitch');

    // 入力時のイベント
    textArea.addEventListener('input', (evt) => {
        previewCanvas.removeAllChildren();
        var baseWidth = previewtAreaDOM.clientWidth;
        textData.value = evt.currentTarget.value;
        for (let i = 0; i < fontFamilies.length; i++){
            if (fontFamilies[i].classList.contains('selected')) {
                textData.fontfamily = fontFamilies[i].style.fontFamily;
            }
        }
        if (textData.value == '') {
            textData.value = 'サンプル SAMPLE';
            entryTextBtn.style.display = 'none';
        } else {
            entryTextBtn.style.display = 'inline-block';
        }
        var proportialSize = textData.value.length * textData.fontSize;
        var scaleX = 1;
        if (proportialSize > baseWidth) {
            while (0 == 0) {
                scaleX -= 0.01;
                if (proportialSize * scaleX < baseWidth) {
                    break;
                }
            }
        }
        var text = new createjs.Text(textData.value, `${textData.fontSize}px ${textData.fontFamily}`, textData.color);
        text.outline = textData.outline;
        text.scaleX = scaleX;
        text.textAlign = 'center';
        text.textBaseline = 'middle';
        text.x = previewtAreaDOM.clientWidth / 2;
        text.y = previewtAreaDOM.clientHeight / 2;
        previewCanvas.addChild(text);
        previewCanvas.update();
    })

    // 決定（追加）時のイベント
    entryTextBtn.addEventListener('click', async () => {
        loadingBox('open');
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        var base64 = previewCanvas.toDataURL();
        await wait(1);
        img.src = base64;
        var textImg = new createjs.Bitmap(img);
        textImg.name = textArea.value;
        await wait(0.5);
        textImg = new createOption(stage, textImg);
        addMouseEvents(stage, textImg);
        stage.addChild(textImg)
        await wait(1);
        stage.update();

        var check = document.getElementById('cBox-text');
        check.click();
        loadingBox('close');
    })
}
/**
 * onclick属性用
 * サンプルテキストをクリックしたフォントファミリーに設定する。
 * @returns 
 */
function selectFontFamily() {
    var textArea = document.getElementById('insertTextInput');
    var e = window.event.target;
    textData.fontFamily = e.style.fontFamily;
    var fontFamilies = document.getElementsByClassName('fontFamilies');
    if (textArea.dataset.font == undefined || textData.fontFamily == textArea.dataset.font) {
        return;
    }
    for (let i = 0; i < fontFamilies.length; i++){
        if (fontFamilies[i].classList.contains('selected')) {
            fontFamilies[i].classList.remove('selected');
        } else if (fontFamilies[i].style.fontFamily == textData.fontFamily) {
            fontFamilies[i].classList.add('selected');
            textArea.dataset.font = textData.fontFamily;
        }
    }
    previewCanvas.children[0].font = `50px ${textData.fontFamily}`;
    previewCanvas.update();
}


/**
 * オブジェクト構造
 * - Stage
 *  - コンテンツコンテナ
 *    - コンテンツ
 *    - オプションコンテナ
 *      - オプションコンテンツ...
 *      - オプションコンテンツ...
 *      - オプションコンテンツ...
 * 
 *  - コンテンツコンテナ２
 *    - コンテンツ２
 *    - オプションコンテナ
 *      - オプションコンテンツ...
 *      - オプションコンテンツ...
 *      - オプションコンテンツ...
 */

/**
 * オプションを用意、追加するためのクラス。
 * 廃棄関数
 */
class createOption_haiki {
    constructor(id){
        this.id = id;
        this.container = new createjs.Container();
        this.container.name = 'optionContainer';
    }
    /**
     * stageインスタンスの大きさを基準に元となるオプションを用意する。
     * @param {object} stage 
     * - createjs.Stage()インスタンス。
     */
    create(stage) {
        var imgs = document.getElementsByClassName(this.id);
        // 背景
        var optionArea = new createjs.Bitmap(imgs[13]); optionArea.name = 'area';
        // 閉じるボタン
        var optionClose = new createjs.Bitmap(imgs[7]); optionClose.name = 'close';
        
        // 閉じるオプションを配置.(左上)
        optionClose.regX = 290 / 2;
        optionClose.regY = 290 / 2;
        optionClose.scale = 0.15;
        optionClose.addEventListener('click', (event) => {
            // クリックしたオブジェクトを特定。その親オブジェクト(stage)も特定。
            var target = event.target.parent.parent;
            var cvs = target.parent;
            // 削除対象にネーミング
            target.name = 'remove';
            // 索条対象を削除。
            cvs.removeChild(stage.getChildByName('remove'));
            console.log('object remove, done.');
        })
        
        // // 回すボタン
        // var optionRoll = new createjs.Bitmap(imgs[8]); optionRoll.name = 'roll';
        // // 回転オプションを配置.(右上)
        // optionRoll.regX = 500 / 2;
        // optionRoll.regY = 500 / 2;
        // optionRoll.scale = 0.087;
        
        
        // // 拡大・縮小ボタン
        // var optionScale = new createjs.Bitmap(imgs[9]); optionScale.name = 'scale';
        // // 拡大・縮小オプションを配置。(右下)
        // optionScale.regX = 500 / 2;
        // optionScale.regY = 500 / 2;
        // optionScale.scale = 0.087;
    
        this.container.addChild(optionArea, optionClose);
        // this.container.addChild(optionArea, optionClose, optionRoll, optionScale);
    }
    result() {
        return this.container;
    }
    /**
     * 生成されたBitmapにオプションを付けてコンテナに入れて返す。
     * @param {object} object 
     * - createjs.Bitmap()インスタンス
     * @param {object} stage 
     * - createjs.Stage()インスタンス
     * @returns オブジェクトとオプションが入ったコンテナ。
     */
    add(object, stage) {
        var objectContainer = new createjs.Container();
        var opCon = this.container;
        var area = opCon.getChildByName('area');
        var close = opCon.getChildByName('close');
        // var roll = opCon.getChildByName('roll');
        // var scale = opCon.getChildByName('scale');

        // 画面中央に配置
        objectContainer.x = stage.canvas.width / 2;
        objectContainer.y = stage.canvas.height / 2;

        // 基準となるオブジェクトの大きさ
        const reg = {
            'w': object.image.naturalWidth * object.scaleX,
            'h': object.image.naturalHeight * object.scaleY,
        };
        // 背景の大きさ調整
        area = resizeOption(reg.w, reg.h, area);

        // コンテナの基準点の調整
        objectContainer.regX = (area.image.width * area.scaleX / 2);
        objectContainer.regY = (area.image.height * area.scaleY / 2);
        // オプションの配置の調整。
        close.x = reg.w;
        // roll.x = reg.w;
        // console.log(scale)
        // scale.x = reg.w;
        // scale.y = reg.h;

        // // マウスイベントの登録
        // roll.addEventListener("mousedown", (event) => {
        //     // オブジェクトコンテナを取得。
        //     var regPoint = event.target.parent.parent
        //     // ドラッグを開始した座標を覚えておく
        //     dragPointX = (stage.mouseX - roll.x) + reg.w;
        //     dragPointY = (stage.mouseY - roll.y);
        //     // 回転軸を取得。
        //     axisX = regPoint.x;
        //     axisY = regPoint.y;
        //     // 現在の回転角度を取得。
        //     currentAngle = regPoint.rotation;
        //     console.log(dragPointX, dragPointY, axisX, axisY, currentAngle);
        // });
        // roll.addEventListener("pressmove", () => {
        //     var angle = calcAngle(axisX, axisY, dragPointX, dragPointY, stage.mouseX, stage.mouseY);
        //     console.log(angle);
        //     objectContainer.rotation = angle;
        // });
        // roll.addEventListener('pressup', () => {
        //     console.log('dragpoint= ',dragPointX,dragPointY)
        //     console.log('axis= ', axisX, axisY);
        //     console.log('mouse= ', stage.mouseX, stage.mouseY);
        // })

        // scale.addEventListener('mousedown', () => {
        //     // dragPointX = stage.mouseX - objectContainer.x;
        //     // dragPointY = stage.mouseY - objectContainer.y;
        //     dragPointX = stage.mouseX;
        //     dragPointY = stage.mouseY;
        //     var c = {
        //         'dragX': dragPointX, 'dragY': dragPointY,
        //         'mouseX': stage.mouseX, 'mouseY': stage.mouseY,
        //         'containerX': objectContainer.x, 'containerY': objectContainer.y,
        //     }
        //     currentAngle = objectContainer.scale
        //     console.log(c.dragX, c.dragY)
        // })
        // scale.addEventListener('pressmove', () => {
        //     // objectContainer.scale = (stage.mouseX - dragPointX) + (stage.mouseY - dragPointY) * -0.05;
        //     var a = ((dragPointX - stage.mouseX)**2) + ((dragPointY - stage.mouseY)**2); a = Math.sqrt(a) * 0.1;
        //     objectContainer.scale *= a;
        //     console.log(a, objectContainer.scale);
        // })

        objectContainer.name = 'option on';
        objectContainer.addChild(object, opCon);
        return objectContainer;
    }
}
/**
 * オプションを用意、追加するためのクラス。
 */
class createOption {
    /**
     * ステージに追加。
     * @param {object} stage 
     * - createjs.Stage()インスタンス。
     * @param {object} object 
     * - createjs.Bitmap()インスタンス。
     * @returns {object} objectContainer
     * - BitmapインスタンスをオプションとまとめたContainerオブジェクト。
     */
    constructor(stage, object) {
        preExec(stage);
        var opCon = new createjs.Container();
        opCon.name = 'optionContainer';
        var imgs = document.getElementsByClassName('option-img');
        var optionArea = new createjs.Bitmap(imgs[13]); optionArea.name = 'area';
        var hit = new createjs.Bitmap(imgs[11]); hit.name = 'hit';
        
        opCon.addChild(optionArea);

        var objectContainer = new createjs.Container();
        var area = opCon.getChildByName('area');
        
        

        // 画面中央に配置
        objectContainer.x = stage.canvas.width / 2;
        objectContainer.y = stage.canvas.height / 2;
        // 基準となるオブジェクトの大きさ
        const reg = {
            'w': object.image.naturalWidth * object.scaleX,
            'h': object.image.naturalHeight * object.scaleY,
        };
        // 背景の大きさ調整
        area = resizeOption(reg.w, reg.h, area);
        hit.scaleX = area.scaleX; hit.scaleY = area.scaleY; hit.alpha = 0.109;
        // コンテナの基準点の調整
        objectContainer.regX = (area.image.width * area.scaleX / 2);
        objectContainer.regY = (area.image.height * area.scaleY / 2);
        // オプションの配置の調整。
        objectContainer.name = 'option on';
        objectContainer.addChild(hit, object, opCon);
        return objectContainer;
    }
}
/**
 * 指定のオブジェクトにクリックイベントを登録する。
 * @param {object} stage 
 *  - Stage instance created by createjs.
 * @param {object} shape 
 *  - shape instance created by createjs.
 */
function addMouseEvents(stage, container) {
    var object = container.children[1];
    var options = container.getChildByName('optionContainer');
    var hit = container.getChildByName('hit');

    // インタラクティブ(相互作用)の設定
    object.addEventListener("mousedown", handleDown);
    object.addEventListener("pressmove", handleMove);
    object.addEventListener("pressup", handleUp);
    hit.addEventListener("mousedown", handleDown);
    hit.addEventListener("pressmove", handleMove);
    hit.addEventListener("pressup", handleUp);

    // 押したときの処理
    function handleDown(event){
        // ドラッグを開始した座標を覚えておく
        dragPointX = stage.mouseX - container.x;
        dragPointY = stage.mouseY - container.y;
        // 半透明にする
        options.alpha = 0;
        hit.alpha = 0;
        // 自分以外のオプションをoffにする。
        if (event.target.parent.name == 'option off') {
            preExec(stage);
        }
    }

    // 押した状態で動かした時の処理
    function handleMove(event){
        // オブジェクトはマウス座標に追随する。ただしドラッグ開始地点の補正を入れる
        container.x = stage.mouseX - dragPointX;
        container.y = stage.mouseY - dragPointY;
    }

    // 離した時の処理
    function handleUp(event){
        // 元の透明度に戻す
        options.alpha = 1;
        hit.alpha = 0.109;

        event.target.parent.name = 'option on';
    }
    // 時間経過
    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick(event) {
        stage.update(); // 画面更新
    }
}

// ボツうまく行かない回転軸
function calcAngle(Ax, Ay, Bx, By, Cx, Cy) {
    var A = { 'x': Ax, 'y': Ay };
    var B = { 'x': Bx, 'y': By * -1 };
    var C = { 'x': Cx, 'y': Cy * -1 };
    var a = ((C.x - B.x)**2) + ((C.y - B.y)**2); a = Math.sqrt(a);
    var b = ((C.x - A.x)**2) + ((C.y - A.y)**2); b = Math.sqrt(b);
    var c = ((B.x - A.x)**2) + ((B.y - A.x)**2); c = Math.sqrt(c);
    
    var cosA = ((c ** 2) + (b ** 2) - (a ** 2)) / (2 * c * b);
    return cosA / (180 / Math.PI);
}

/**
 * ステージ外にオプションを追加する。
 * @param {object} stage 
 */
function externalOption(stage) {
    var roll = document.getElementById('roll-btn');
    roll.addEventListener('click', () => {
        var target = stage.getChildByName('option on');
        target.rotation -= 10;
    });
    var scaleup = document.getElementById('scaleUp-btn');
    scaleup.addEventListener('click', () => {
        var target = stage.getChildByName('option on');
        target.scaleX += 0.1;
        target.scaleY += 0.1;
    });
    var scaledown = document.getElementById('scaleDown-btn');
    scaledown.addEventListener('click', () => {
        var target = stage.getChildByName('option on');
        target.scaleX -= 0.1;
        target.scaleY -= 0.1;
    });
    var scaledown = document.getElementById('reset-btn');
    scaledown.addEventListener('click', () => {
        var target = stage.getChildByName('option on');
        target.scale = 1;
        target.rotation = 0;
    });
    var dlt = document.getElementById('delete-btn');
    dlt.addEventListener('click', () => {
        var target = stage.getChildByName('option on');
        stage.removeChild(target);
    })

    var rollReverse = document.getElementById('rollReverse-btn');
    rollReverse.addEventListener('click', () => {
        var target = stage.getChildByName('option on');
        target.rotation += 10;
    })
    var scaleWidthUp = document.getElementById('scaleWidthUp-btn');
    scaleWidthUp.addEventListener('click', () => {
        var target = stage.getChildByName('option on');
        target.scaleX += 0.1;
    })
    var scaleWidthDown = document.getElementById('scaleWidthDown-btn');
    scaleWidthDown.addEventListener('click', () => {
        var target = stage.getChildByName('option on');
        target.scaleX -= 0.1;
    })
    var scaleHeightUp = document.getElementById('scaleHeightUp-btn');
    scaleHeightUp.addEventListener('click', () => {
        var target = stage.getChildByName('option on');
        target.scaleY += 0.1;
    })
    var scaleHeightDown = document.getElementById('scaleHeightDown-btn');
    scaleHeightDown.addEventListener('click', () => {
        var target = stage.getChildByName('option on');
        target.scaleY -= 0.1;
    })

    var layerUp = document.getElementById('layerUp-btn');
    layerUp.addEventListener('click', () => {
        var target = stage.getChildByName('option on');
        layerMove(target, 'up');
    })
    var layerDown = document.getElementById('layerDown-btn');
    layerDown.addEventListener('click', () => {
        var target = stage.getChildByName('option on');
        layerMove(target, 'down');
        
    })
    document.getElementById('copy-btn').addEventListener('click', async () => {
        var clone = stage.getChildByName('option on').clone(recursive = true);
        await preExec(stage);
        clone.x += 20; clone.y += 20;
        addMouseEvents(stage, clone);
        clone.getChildByName('optionContainer').alpha = 1;
        stage.addChild(clone); stage.update();
    });
}

const preExec = async (stage) => {
    try {
        for (let i = 0; i < stage.children.length; i++){
            objects = await stage.children[i]
            objects.getChildByName('optionContainer').alpha = 0;
            objects.name = 'option off';
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * チェックボックスで表示させる画面を管理する。
 */
const cBoxManage = () => {
    l = document.getElementsByClassName('label');
    for (let i = 0; i < l.length; i++) {
        l[i].addEventListener('click', (e) => {
            var me = document.getElementById(`cBox-${l[i].dataset.label}`)
            var check = document.getElementsByClassName('checkBox');
            for (let i = 0; i < check.length; i++) {
                if (check[i] == me) {
                    continue;
                } else if (check[i].checked) {
                    check[i].checked = false;
                };
            };
        });
    };
};

/**
 * onclick属性用
 * テキスト入力画面の色を変更する。
 */
const fontColor_clk = () => {
    // イベントから要素を取得
    var elemnt = window.event.target;
    // 要素のインナーテキストからカラーを取得
    var color = elemnt.innerText;
    textData.color = color;
    previewCanvas.children[0].color = color;
    previewCanvas.update();
}

/**
 * テキスト入力の画面表示
 */
const textOption = () => {
    var font = document.getElementById('textFont-choice');
    font.addEventListener('click', () => {
        clk('textFont')
    });
    
    var color = document.getElementById('textColor-choice');
    color.addEventListener('click', () => {
        clk('textColor')
    });

    var outline = document.getElementById('textOutline-choice');
    outline.addEventListener('click', () => {
        clk('textOutline')
    });

    var etc = document.getElementById('textEtc-choice');
    etc.addEventListener('click', () => {
        clk('textEtc')
    });
    function clk(id) {
        var target = document.getElementsByClassName('opScr');
        var options = document.getElementsByClassName('text-options')[0];
        for (let i = 0; i < target.length; i++) {
            var a = target[i];
            var me = options.children[i];
            if (a.id == id) {
                me.classList.add('selected');
                a.style.display = 'block';
            } else {
                me.classList.remove('selected');
                a.style.display = 'none';
            }
        }
    }
};

/**
 * layerMoveBtnで使用する関数。
 * targetのオブジェクトを１つ前面(背面)に移動させる。
 * @param {string} target 
 * - object
 * @param {string} mode 
 * - up, down
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
    var targetIndex = stage.children.findIndex(n => n.name == target.name);
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
    // 避難用配列からcanvasへ戻す。
    for (let i = 0; i < len; i++){
        // mode = upのとき、ターゲットが元あったインデックス番号のときに、
        // "先に"シェルターの要素を入れてからターゲットを入れることで
        // 入れ替え(レイヤーを上げること)が可能になる。
        if (i == targetIndex && mode == 'up') {
            stage.addChild(shelter.shift());
            stage.addChild(targetObject.shift());
            i++
            continue;
        }
        // mode = downのとき、ターゲットの"１つ前"のインデックス番号のときに、
        // ターゲットオブジェクトをstageに追加し、その後にシェルターの要素を入れることで
        // 入れ替え(レイヤーを下げる)が可能になる。
        if (i == targetIndex - 1 && mode == 'down') {
            stage.addChild(targetObject.shift());
            stage.addChild(shelter.shift());
            i++;
            continue;
        }
        // それ以外はシェルターからcanvasへ戻していく。
        stage.addChild(shelter.shift());
    }
}

const confirmScreen = () => {
    var confirm = document.getElementsByClassName('confirmScreen')[0];
    // 購入するボタンで確認画面出現
    document.getElementById('buy-btn').addEventListener('click', () => {
        confirm.style.display = 'flex';
    });

    document.getElementById('confirmBack').addEventListener('click', () => {
        confirm.style.display = 'none';
    });
    document.getElementById('confirm-true').addEventListener('click', () => {
        buy();
    });
    document.getElementById('confirm-false').addEventListener('click', () => {
        confirm.style.display = 'none';
    });

}

const buy = async () => {
    loadingBox('open');
    console.log('say yes.')
    await preExec(stage);
    // 保存するcanvas要素の取得
    var cvs = document.getElementById('background-canvas');
    var color = cvs.style.backgroundColor;

    // 取得したcanvas要素からpngイメージのbase64コードを受け取る
    var base64 = await stage.toDataURL(color);
    // ダウンロードリンクを取得 ~ ダウンロードできるファイル(base64コード)を挿入。
    document.getElementById('download').href = base64;
    
    var anchor = document.createElement('a');
    anchor.href = "";
    loadingBox('close');
    anchor.click();
}

/**
 * 画面サイズに合わせてコンテンツの大きさを調整する。
 */
const resizeWindow = () => {
    var b = document.getElementsByClassName('mainContent-wrap')[0];
    var a = {
        'w': b.offsetWidth, // もとの横幅
        'h': b.offsetHeight, // もとの縦幅
    }
    var c = { // current
        'w': window.innerWidth,
        'h': window.innerHeight,
    }
    var s = Math.min(
        Math.round((c.w / (a.w + 20)) * 1000) / 1000,
        Math.round((c.h / (a.h + 20)) * 1000) / 1000
    );
    // document.querySelector('body').style.transform = `scale(${s})`;
    document.getElementsByClassName('contentWrapper')[0].style.transform = `scale(${s})`;
    document.getElementById('summary').style.transform = `scale(${s})`;
}
