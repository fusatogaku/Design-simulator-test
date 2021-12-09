<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>item一覧</title>
        <link href="/css/style.css" rel="stylesheet">
        <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
        <script src="/js/createJs.js" rel="text/javascript"></script>
    </head>
    <body>
        <div class="container">
            <h1>画像一覧</h1>
            @foreach($items as $item)

            <div>
                <img src="{{ Storage::url($item->itemName) }}" width="50px" height="50px">
                <p>
                    <?php 
                        $fileName = str_replace('public/items/', '', $item->itemName);
                    ?>
                    ファイル名: {{ $fileName }}
                </p>
            </div>

            @endforeach
            <div>
                <a href="{{ route('design') }}">シミュレータ</a>
                <a href="{{ route('items') }}">stamp一覧</a>
                <a href="{{ route('itemform') }}">stamp登録</a>
            </div>
        </div>
    </body>
</html>
