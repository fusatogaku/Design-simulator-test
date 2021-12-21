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
            <button class="set-menu-header" value="bgColor" onclick="header_clk()">
                背景色
                <i class='bx bxs-chevron-down' ></i>
            </button>
            <div class="setting-content collapsed" id="bgColor-content" style="max-height: 166px;">
                <div class="content-container">
                    <ul>
                        <li><div class="propaties-box bgColors selected" style="background-color: transparent;"onclick="bg_clk()">
                            <div class="propaties">clear</div></div></li>
                        @foreach($colors as $color)
                        <li><button class="propaties-box bgColors" style="background-color: {{ $color[1] }};" onclick="bg_clk()">
                            <div class="propaties" value="{{ $color[0] }}">{{ $color[0] }}</div></button></li>
                        @endforeach
                    </ul>
                </div>
            </div>
            <button class="set-menu-header" value="fontFamily" onclick="header_clk()">
                テキスト
                <i class='bx bxs-chevron-down' ></i>
            </button>
            <div id="sampleText-wrap" class="collapsed">
                <p id="sampleText" style="font-size: 1em;">サンプルテキスト</p>
                <input id="InsertText" type="text" placeholder="テキストを入力(20字以内)" maxlength="20">
            </div>
            <div class="setting-content collapsed" id="fontFamily-content" style="max-height: 196px;">
                <div class="content-container">
                <ul>
                    <li class="fontFamilies selected" style="font-family: initial;">ふぉんと フォント font FONT</li>
                    @foreach($fontFamilies as $fontFamily)
                    <li class="fontFamilies" style="font-family: {{ $fontFamily[0] }};">ふぉんと フォント font FONT</li>
                    @endforeach
                </ul>
                </div>
            </div>
            <button class="set-menu-header" value="fontSetting" onclick="header_clk()">
                フォント設定
                <i class='bx bxs-chevron-down' ></i>
            </button>
            <div class="setting-content collapsed" id="fontSetting-content" style="max-height: 166px;">
                <div class="propaties-list">
                <ul>
                    <li class="selected"><span id="fontColor">文字色</span></li>
                    <li><span id="decoration">装飾</span></li>
                    <li><span id="etcSetting">その他</span></li>
                </ul>
                </div>
                <div class="content-container fontColor">
                <ul>
                    <li><div class="propaties-box fontColors" style="background-color: transparent;"onclick="bg_clk()">
                        <div class="propaties">clear</div></div></li>
                    @foreach($colors as $color)
                    <li><button class="propaties-box fontColors" style="background-color: {{ $color[1] }};" onclick="bg_clk()">
                        <div class="propaties" value="{{ $color[0] }}">{{ $color[0] }}</div></button></li>
                    @endforeach
                    
                </ul>
                </div>
                <div class="content-container decoration collapsed">
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
                <div class="content-container etcSetting collapsed"></div>
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
                    <li><span>テキスト</span></li>
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
                    <li><img src="img/Icons - layerImage.png" width="60px" height="60px"></i></li>
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
            <button class="set-menu-header" value="sticky" onclick="header_clk()">
                ステッカー
                <i class='bx bxs-chevron-down' ></i>
            </button>
            <div class="setting-content" id="sticky-content" style="max-height: 306px;">
            <div class="content-container">
                <ul>
                <li><img class="thum-sticky" src="img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - square.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - star.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - triangle.png" alt=""></li>
                <li><img class="thum-sticky" src="img/Icons - square.png" alt=""></li>
                </ul>
            </div>
            </div>
            <button class="set-menu-header" value="layer" onclick="header_clk()">
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