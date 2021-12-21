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
                const v = btnID.value
                ctx.fillText(v + count, count * 20, count * 20);
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
        } else if (eleClrs[i].innerText == color){
            eleClrs[i].classList.toggle('selected')
        }
    }
}

