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
    
            btnID = document.getElementById("btn");
                btnID.addEventListener("click", () => {
                const newCanvas = lcv.addCanvas();
                count++;
                const ctx = newCanvas.getContext("2d");
                const v = btnID.value
                ctx.fillText(v + count, count * 20, count * 20);
            });

            document.getElementById("btn-round").addEventListener("click", () => {
                const newCanvas = lcv.addCanvas();
            });
        })();
    }
)();
function clk() {
    // クリックされたイベントを取得
    var event = window.event;
    // イベントから要素を取得
    var elemnt = event.target;
    // 要素からvalueを取得
    var eValue = elemnt.value;
    var collapseDOM = document.getElementById(`${eValue}-content`);
    if (collapseDOM.classList.contains('collapsed')) {
        collapseDOM.classList.remove('collapsed')
    } else {
        collapseDOM.classList.toggle('collapsed')
    }
}
