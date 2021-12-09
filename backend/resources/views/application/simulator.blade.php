<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Design-Simulator</title>
        <link href="/css/style.css" rel="stylesheet">
        <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
        <script src="/js/createJs.js" rel="text/javascript"></script>
    </head>
    <body>
        <div class="container">
            <noscript>
            <span style="color:red;font-weight:bold">JavaScriptが無効になっています。</span><br/>
            </noscript>
            <h1 style="font-size: 60px;">テスト</h1>
            <canvas id="myCanvas" width="1920" height="1080"></canvas>
            <div>
                <input id="inputColor" type="color" value="#000000">
                <button id="buttonSave">保存</button>
                <button id="buttonReset">リセット</button>
            </div>
            <div>
                <button id="stamps">スタンプ一覧</button>
                <button id="addImages">写真を追加</button>
            </div>
            <div>
                <button id="layer">レイヤー</button>
            </div>
        </div>
        <div>
            <a href="{{ route('design') }}">シミュレータ</a>
            <a href="{{ route('items') }}">stamp一覧</a>
            <a href="{{ route('itemform') }}">stamp登録</a>
        </div>
    </body>
</html>
