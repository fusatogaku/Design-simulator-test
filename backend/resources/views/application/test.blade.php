<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>test-simulator</title>
        <link href="/css/style.css" rel="stylesheet">
        <link href="/css/styleAnime.css" rel="stylesheet">
        <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=The+Nautigal&display=swap" rel="stylesheet">
        <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
        <script
            src="https://code.jquery.com/jquery-3.6.0.slim.min.js"
            integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI="
            crossorigin="anonymous">
        </script>
        <script src="/js/createJs.js" rel="text/javascript"></script>
    </head>
    <body>
        <div id="loading-box">
            <div class="dot-flash"></div>
        </div>
        <div class="contentWrapper">
            <div class="mainContent-wrap">
                <div class="palette top">
                    <img src="/img/preview.png" alt="" id="preview-btn">
                    <p>砂プリント</p>
                    <img src="/img/buy.png" alt="" id="buy-btn">
                </div>
                <div id="canvas-wrap">
                    <noscript>
                    <span style="color:red;font-weight:bold">JavaScriptが無効になっています。</span><br/>
                    </noscript>
                    <!-- checkbox -->
                    <input type="checkbox" id="cBox-bgColor" class="checkBox">
                    <input type="checkbox" id="cBox-text" class="checkBox">
                    <input type="checkbox" id="cBox-sticky" class="checkBox">
                    <input type="checkbox" id="cBox-file" class="checkBox">
                    <!-- background-color -->
                    <label for="cBox-bgColor" id="space"></label>
                    <section id="bgColor-Screen" class="wrap-screen">
                        <div class="set-menu-header">
                            背景の色を変更する
                            <label for="cBox-bgColor"><i class='bx bx-x'></i></label>
                        </div>
                        <div class="setting-content" id="bgColor-content">
                            <div class="content-container">
                                <ul>
                                    <li><button class="propaties-box bgColors selected-item" style="background-color: transparent;"onclick="bg_clk()" disabled>
                                        <div class="propaties">clear</div></button></li>
                                    @foreach($colors as $color)
                                    <li><button class="propaties-box bgColors" style="background-color: {{ $color[1] }};" onclick="bg_clk()">
                                        <div class="propaties" value="{{ $color[0] }}">{{ $color[0] }}</div></button></li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </section>
                    <!-- text -->
                    <section id="text-Screen" class="wrap-screen">
                        <div id="textPreviewCanvas"><canvas id="previewArea" width="352" height="80"></canvas></div>
                        <input id="insertTextInput" type="text" placeholder="テキストを入力(20字以内)" maxlength="20" data-font="">
                        <button id='entryTextBtn' style="display: none;">決定</button>
                        <div class="text-options">
                            <a id="textFont-choice" class="selected"><strong>フォント</strong></a>
                            <a id="textColor-choice"><strong>文字の色</strong></a>
                            <a id="textOutline-choice" style="display: none;"><strong>ふちの色</strong></a>
                            <a id="textEtc-choice"><strong>その他</strong></a>
                        </div>
                        <div class="setting-content2 opScr" id="textFont">
                            <ul class="fontFamily-content">
                                <li class="fontFamilies selected" style='font-family: "Hiragino Kaku Gothic ProN", serif;' onclick="selectFontFamily()">ふぉんと フォント font FONT</li>
                                @foreach($fontFamilies as $fontFamily)
                                <li class="fontFamilies" style="font-family: {{ $fontFamily[0] }};" onclick="selectFontFamily()">ふぉんと フォント font FONT</li>
                                @endforeach
                            </ul>
                        </div>
                        <div class="setting-content2 opScr" id="textColor" style="display: none;">
                            <ul>
                                <li><button class="propaties-box bgColors" style="background-color: transparent;"onclick="fontColor_clk()">
                                    <div class="propaties">clear</div></button></li>
                                @foreach($colors as $color)
                                <li><button class="propaties-box bgColors" style="background-color: {{ $color[1] }};" onclick="fontColor_clk()">
                                    <div class="propaties" value="{{ $color[0] }}">{{ $color[0] }}</div></button></li>
                                @endforeach
                            </ul>
                        </div>
                        <div class="setting-content2 opScr" id="textOutline" style="display: none;">
                            <ul>
                                @foreach($colors as $color)
                                <li><button class="propaties-box bgColors" style="background-color: {{ $color[1] }};" onclick="fontColor_clk()">
                                    <div class="propaties" value="{{ $color[0] }}">{{ $color[0] }}</div></button></li>
                                @endforeach
                            </ul>
                        </div>
                        <div class="setting-content2 opScr" id="textEtc" style="display: none;">
                            <ul>
                                <!-- 縁取り文字 -->
                                <li>
                                    <div class="wrap" id="outlineSwitch">
                                        <div class="io-btn-wrap">
                                            <input type="checkbox" id="io-btn-outline">
                                            <div class="io-btn"></div>
                                        </div>
                                        <label for="io-btn-outline" style="width: 100%;">縁取り文字</label>
                                    </div>
                                </li>
                                <!-- 縦書き -->
                                <!-- <li>
                                    <div class="wrap" id="writingModeSwitch">
                                        <div class="io-btn-wrap">
                                            <input type="checkbox" id="io-btn-writingMode">
                                            <div class="io-btn"></div>
                                        </div>
                                        <label id="writingModeSwitch" for="io-btn-writingMode" style="width: 100%;">縦書き</label>
                                    </div>
                                </li> -->
                            </ul>
                        </div>
                    </section>
                    <!-- sticky -->
                    <section id="sticky-Screen" class="wrap-screen">
                        <button class="set-menu-header">
                            ステッカーを選択する。
                            <label for="cBox-sticky"><i class='bx bx-x'></i></label>
                        </button>
                        <div class="setting-content" id="sticky-content" class="wrap-screen">
                            <div class="content-container">
                                <ul>
                                    @foreach($stickies as $sticky)
                                    <?php $fileName = str_replace('public/items/', '', $sticky->itemName); ?>
                                    <li><img class="thum-sticky" src="{{ Storage::url($sticky->itemName) }}" data-sticky-name="{{ $fileName }}" onclick="addSticky()"></li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section></section>
                    <div class="options">
                        <img src="/img/reset.png" alt="" id="reset-btn" class="option">
                        <img src="/img/delete.png" alt="" id="delete-btn" class="option">
                        <img src="/img/scale - width.png" alt="" id="scaleWidthUp-btn" class="option">
                        <img src="/img/scale - width_shrink.png" alt="" id="scaleWidthDown-btn" class="option">
                        <img src="/img/scale - height.png" alt="" id="scaleHeightUp-btn" class="option">
                        <img src="/img/scale - height_shrink.png" alt="" id="scaleHeightDown-btn" class="option">
                        <img src="/img/scaleup.png" alt="" id="scaleUp-btn" class="option">
                        <img src="/img/scaledown.png" alt="" id="scaleDown-btn" class="option">
                        <img src="/img/bx-reset-reverse.png" alt="" id="rollReverse-btn" class="option">
                        <img src="/img/roll.png" alt="" id="roll-btn" class="option">
                        <img src="/img/layer-up.png" alt="" id="layerUp-btn" class="option">
                        <img src="/img/layer-down.png" alt="" id="layerDown-btn" class="option">
                        <img src="/img/copy.png" alt="" id="copy-btn" class="option">
                        <img src="/img/DL.png" alt="" id="DL-btn" class="option">
                    </div>
                    <!--  -->
                    <!-- <div id="loading-box">
                        <div class="dot-flash"></div>
                    </div> -->
                </div>
                <div class="palette bottom">
                    <div class="bgColor-icon b-menu">
                    <label id="bgColor-label" for="cBox-bgColor" class="label" data-label="bgColor">
                        <ul>
                            <li><i class='bx bx-palette' ></i></li>
                            <li><span>背景色</span></li>
                        </ul>
                    </label>
                    </div>
                    <div class="font-icon b-menu">
                    <label id="insertTextBtn" for="cBox-text" class="label" data-label="text">
                        <ul>
                            <li><i class='bx bx-font'></i></li>
                            <li><span>テキスト</span></li>
                        </ul>
                    </label>
                    </div>
                    <!-- <div class="fontCustom-icon b-menu">
                    <a id="">
                        <ul>
                            <li><i class='bx bxs-edit-alt' ></i></li>
                            <li><span>フォント設定</span></li>
                        </ul>
                    </a>
                    </div> -->
                    <div class="sticky-icon b-menu">
                    <label for="cBox-sticky" class="label" data-label="sticky">
                        <ul>
                            <li><i class='bx bxs-grid' ></i></li>
                            <li><span>ステッカー</span></li>
                        </ul>
                    </label>
                    </div>
                    <!-- <div class="layer-icon b-menu">
                    <label id="">
                        <ul>
                            <li><img src="img/Icons - layerImage.png" width="60px" height="60px"></i></li>
                            <li><span>レイヤー設定</span></li>
                        </ul>
                    </label>
                    </div> -->
                    <div class="image-icon b-menu">
                    <label id="inputFileBtn" for="cBox-file" class="label" data-label="file">
                        <ul>
                            <li><i class='bx bxs-camera-plus' ></i></li>
                            <li><span>取り込み</span></li>
                        </ul>
                    </label>
                    </div>
                </div>
            </div>
            <input id="inputFile" type="file" accept="image/*" style="display: none;">
        </div>
        <div id="inputFileArea" style="display: none;">
            <a id="download" href="" download="save.jpg" style="dispaly: none;"></a>
        </div>
        <div id="preload-imgs" style="display: none;">
            @foreach($stickies as $sticky)
            <?php $fileName = str_replace('public/items/', '', $sticky->itemName); ?>
            <li><img class="option-img" src="{{ Storage::url($sticky->itemName) }}" data-sticky-name="{{ $fileName }}" onclick="addSticky()"></li>
            @endforeach
        </div>
        <div id="previewImage" style="display: none">
            <img id="summary" src=""></img>
        </div>
        <div class="confirmScreen">
            <div id="confirmBack"></div>
            <div class="popUp">
                <img src="/img/confirm screen.png" id="confirm"></img>
                <a id="confirm-true" class="confirm-btn left"></a>
                <a id="confirm-false" class="confirm-btn right"></a>
            </div>
        </div>
    </body>
</html>
