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
        
        window.addEventListener("DOMContentLoaded", () => {
            // const lcv = layerCanvas("canvas-wrap", 450, 318.18); // 横画面
            const lcv = layerCanvas("canvas-wrap", 318.18, 450); // 縦画面
            let count = 0;

            const cvs = lcv.addCanvas();
            cvs.setAttribute('id', 'background-canvas');
    
            // レイヤー追加ボタンのイベント登録
            btnID = document.getElementById("btn");
            btnID.addEventListener("click", () => {
                const newCanvas = lcv.addCanvas();
                count++;
                const ctx = newCanvas.getContext("2d");
                const v = btnID.value;
                ctx.fillText(v + count, count * 20, count * 20);
                // レイヤー設定エリアにレイヤー情報を追加
                var layer = document.getElementById('layers');
                layer.insertAdjacentHTML('beforeend', `\n<li class="layerList" data-index="${count}">\n<div>\n<i class="bx bxs-up-arrow" onclick="layerUpclk()"></i>\n<i class="bx bxs-down-arrow" onclick="layerDownclk()"></i>\n</div>\n<div>${v + count}</div>\n<div><i class="bx bx-show" onclick="showclk()"></i></div>\n</li>`);
            });

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