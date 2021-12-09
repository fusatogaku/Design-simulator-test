<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>登録フォーム</title>
        <!-- <link href="/css/style.css" rel="stylesheet">
        <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
        <script src="/js/createJs.js" rel="text/javascript"></script> -->
    </head>
    <body>
        <div class="container">
            <h1>stamp投稿用フォーム</h1>
            <form action="{{ route('itemstore') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <p>
                    <label>
                        登録するイメージを選択<br>
                        <input type="file" name="item" accept="image/*">
                    </label>
                </p>
                <p>
                    <label>
                        カテゴリーを入力<br>
                        <input type="text" name="category" required>
                    </label>
                </p>
                <p>
                    <label>
                        色の種類を入力<br>
                        <input type="text" name="color" required>
                    </label>
                </p>
                <input type="submit" value="登録">
            </form>
            <div>
                <a href="{{ route('design') }}">シミュレータ</a>
                <a href="{{ route('items') }}">stamp一覧</a>
                <a href="{{ route('itemform') }}">stamp登録</a>
            </div>
        </div>
    </body>
</html>
