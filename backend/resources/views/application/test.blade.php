<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>test-simulator</title>
        <link href="/css/style.css" rel="stylesheet">
        <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
        <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
        <script
            src="https://code.jquery.com/jquery-3.6.0.slim.min.js"
            integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI="
            crossorigin="anonymous">
        </script>
        <script src="/js/createJs-test.js" rel="text/javascript"></script>
    </head>
    <body>
        <div class="contentWrapper">
            <div class="menu-wrap" id="left-menu">
            <button class="set-menu-header" value="bgColor" onclick="clk()">
                背景色
                <i class='bx bxs-chevron-down' ></i>
            </button>
            <div class="setting-content collapsed" id="bgColor-content" style="max-height: 166px;">
                <div class="content-container">
                <ul>
                    <li><div class="propaties-box" style="background-color: white;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: black;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: red;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: blue;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: green;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: yellow;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: purple;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: brown;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: white;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: black;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: red;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: blue;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: green;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: yellow;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: purple;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: brown;">
                    <div class="propaties">color</div></div></li>
                </ul>
                </div>
            </div>
            <button class="set-menu-header" value="fontFamily" onclick="clk()">
                フォント
                <i class='bx bxs-chevron-down' ></i>
            </button>
            <p class="sampleText" id="sampleText">サンプルテキスト</p>
            <div class="setting-content collapsed" id="fontFamily-content" style="max-height: 196px;">
                <div class="content-container">
                <ul>
                    <li class="selected" style="font-family: 'Courier New', Courier, monospace;">あいうえお abcde ABCDE</li>
                    <li style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">あいうえお abcde ABCDE</li>
                    <li style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">あいうえお abcde ABCDE</li>
                    <li style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;">あいうえお abcde ABCDE</li>
                    <li style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">あいうえお abcde ABCDE</li>
                    <li style="font-family: 'Times New Roman', Times, serif;">あいうえお abcde ABCDE</li>
                    <li style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">あいうえお abcde ABCDE</li>
                    <li style="font-family: Arial, Helvetica, sans-serif;">あいうえお abcde ABCDE</li>
                    <li style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">あいうえお abcde ABCDE</li>
                </ul>
                </div>
            </div>
            <button class="set-menu-header" value="fontSetting" onclick="clk()">
                フォント設定
                <i class='bx bxs-chevron-down' ></i>
            </button>
            <div class="setting-content collapsed" id="fontSetting-content" style="max-height: 166px;">
                <div class="propaties-list">
                <ul>
                    <li><span id="fontColor">文字色</span></li>
                    <li><span id="decoration">装飾</span></li>
                    <li><span id="etcSetting">その他</span></li>
                </ul>
                </div>
                <div class="content-container fontColor collapsed">
                <ul>
                    <li><div class="propaties-box" style="background-color: white;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: black;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: red;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: blue;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: green;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: yellow;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: purple;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: brown;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: white;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: black;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: red;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: blue;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: green;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: yellow;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: purple;">
                    <div class="propaties">color</div></div></li>
                    <li><div class="propaties-box" style="background-color: brown;">
                    <div class="propaties">color</div></div></li>
                </ul>
                </div>
                <div class="content-container decoration">
                <ul>
                    <li><div class="propaties-box">
                    <div class="propaties" style="text-decoration: underline;">下線</div></div></li>
                    <li><div class="propaties-box">
                    <div class="propaties" style="text-decoration: line-through;">取り消し線</div></div></li>
                    <li><div class="propaties-box">
                    <div class="propaties" style="text-decoration: overline;">上線</div></div></li>
                    <li><div class="propaties-box">
                    <div class="propaties" style="text-decoration: underline dotted red;">点線</div></div></li>
                </ul>
                </div>
                <div class="content-container etcSetting"></div>
            </div>
            </div>
            <div class="mainContent-wrap">
            <div class="palette-top">
                <p>枠内に収まる形でデザインしてください</p>
            </div>
            <div id="canvas-wrap">
                <noscript>
                <span style="color:red;font-weight:bold">JavaScriptが無効になっています。</span><br/>
                </noscript>
                <div class="loading-box" style="display: none;">
                <div class="dot-flash"></div>
                </div>
                <!-- <canvas class="mask" width="500" height="500"></canvas> -->
            </div>
            <div class="palette-bottom">
                <div class="bgColor-icon b-menu">
                <a id="">
                    <ul>
                    <li><i class='bx bx-palette' ></i></li>
                    <li><span>背景色</span></li>
                    </ul>
                </a>
                </div>
                <div class="font-icon b-menu">
                <a id="">
                    <ul>
                    <li><i class='bx bx-font'></i></li>
                    <li><span>フォント</span></li>
                    </ul>
                </a>
                </div>
                <div class="fontCustom-icon b-menu">
                <a id="">
                    <ul>
                    <li><i class='bx bxs-edit-alt' ></i></li>
                    <li><span>フォント設定</span></li>
                    </ul>
                </a>
                </div>
                <div class="sticky-icon b-menu">
                <a id="">
                    <ul>
                    <li><i class='bx bxs-grid' ></i></li>
                    <li><span>ステッカー</span></li>
                    </ul>
                </a>
                </div>
                <div class="layer-icon b-menu">
                <a id="">
                    <ul>
                    <li><img src="img/Icons.png" width="60px" height="60px"></i></li>
                    <li><span>レイヤー設定</span></li>
                    </ul>
                </a>
                </div>
                <div class="image-icon b-menu">
                <a id="">
                    <ul>
                    <li><i class='bx bxs-camera-plus' ></i></li>
                    <li><span>取り込み</span></li>
                    </ul>
                </a>
                </div>
            </div>
            </div>
            <div class="menu-wrap" id="right-menu">
            <button class="set-menu-header" value="sticky" onclick="clk()">
                ステッカー
                <i class='bx bxs-chevron-down' ></i>
            </button>
            <div class="setting-content" id="sticky-content" style="max-height: 306px;">
            <div class="content-container">
                <ul>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="/Users/hahaha/Desktop/createjs/img/Icons - square.png" alt=""></li>
                </ul>
            </div>
            </div>
            <button class="set-menu-header" value="layer" onclick="clk()">
                レイヤー設定
                <i class='bx bxs-chevron-down' ></i>
            </button>
            <div class="setting-content collapsed" id="layer-content" style="max-height: 306px;"></div>
            </div>
        </div>
        <button id="btn" value="btned">レイヤー追加</button>
        <button id="btn-round" value="btned">round追加</button>
        <button id="btn-triangle" value="btned">triangle追加</button>
        <button id="btn-square" value="btned">Square追加</button>
    </body>
</html>
