<?php

namespace App\Http\Controllers;
use App\Models\Item;

use Illuminate\Http\Request;

class SimulateController extends Controller
{
    /**
     * シミュレータ表示
     * 
     * @return view
     */
    public function toDesign()
    {
        return view('application.simulator');
    }

    /**
     * item表示用
     * 
     * @return view
     */
    public function showItems()
    {
        $items = Item::all(); // レコード取得
        return view('item.index', compact('items')); // 一覧ページ表示
    }

    /**
     * item登録用
     * 
     * @return view
     */
    public function form()
    {
        return view('item.form');
    }

    /**
     * item保存用
     * 処理用関数
     * 
     * @return redirect('items')
     */
    public function store(Request $request)
    {
        // 画像の処理
        $item = $request->file('item'); // file()で受け取る
        if ($request->hasFile('item') && $item->isValid()) // 画像の有無で分岐
        {
            $item = $item->getClientOriginalName(); // storeAsで指定する画像名を作成
        } else {
            return ;
        }

        // DBに登録
        Item::create([
            // strage/app/public/itemsに保存(itemsフォルダは作成される)
            'itemName' => $request->file('item')->storeAs('public/items', $item),
            'itemCategory' => $request->get('category'),
            'itemColor' => $request->get('color'),
        ]);
        
        return redirect('/items'); // 保存処理後は一覧に飛ばす
    }

    /**
     * テスト用
     * 
     * @return view
     */
    public function test()
    {
        // フォントの種類。
        $fontFamilies = [
            ['"Century", serif'],
            ['"Estrangelo Edessa", serif'],
            ['"Gungsuh", serif'],
            ['"Shruti", serif'],
            ['Cambria, Cochin, Georgia, Times, "Times New Roman", serif'],
            ['"Times New Roman", Times, serif'],
            ['"Yu Mincho", "YuMincho", serif'],
            ['"Arial", sans-serif'],
            ['"Arial Black", sans-serif'],
            ['"Impact", sans-serif'],
            ['"Century Gothic", sans-serif'],
            ['monospace'],
            ['"HG行書体", monospace'],
            ['"ＭＳ ゴシック", monospace'],
            ['"ＭＳ 明朝", monospace'],
            ['"BatangChe", monospace'],
            ['fantasy'],
            ['"Modern", fantasy'],
            ['"Monotype Corsiva", fantasy'],
            ['cursive'],
            ['"HGP行書体", cursive'],
            ['"HG正楷書体-PRO", cursive'],
            ['"Comic Sans MS", cursive'],
            ['"Script", cursive'],
        ];
        // 色の設定。
        $colors = [
            ['Black', '#000000'],
            ['Navy', '#000080'],
            ['Darkblue', '#00008b'],
            ['Blue', '#0000ff'],
            ['Darkgreen', '#006400'],
            ['Green', '#008000'],
            ['Teal', '#008080'],
            ['Darkcyan', '#008b8b'],
            ['Lime', '#00ff00'],
            ['Aqua', '#00ffff'],
            ['Limegreen', '#32cd32'],
            ['Turquoise', '#40e0d0'],
            ['Royalblue', '#4169e1'],
            ['Steelblue', '#4682b4'],
            ['Indigo', '#4b0082'],
            ['Cadetblue', '#5f9ea0'],
            ['Dimgray', '#696969'],
            ['Slateblue', '#6a5acd'],
            ['Olivedrab', '#6b8e23'],
            ['Slategray', '#708090'],
            ['Lawngreen', '#7cfc00'],
            ['Maroon', '#800000'],
            ['Purple', '#800080'],
            ['Olive', '#808000'],
            ['Gray', '#808080'],
            ['Skyblue', '#87ceeb'],
            ['Darkred', '#8b0000'],
            ['Palegreen', '#98fb98'],
            ['Sienna', '#a0522d'],
            ['Brown', '#a52a2a'],
            ['Darkgray', '#a9a9a9'],
            ['Lightblue', '#add8e6'],
            ['Firebrick', '#b22222'],
            ['Rosybrown', '#bc8f8f'],
            ['Darkkhaki', '#bdb76b'],
            ['Silver', '#c0c0c0'],
            ['Indianred', '#cd5c5c'],
            ['Peru', '#cd853f'],
            ['Chocolate', '#d2691e'],
            ['Tan', '#d2b48c'],
            ['Lightgray', '#d3d3d3'],
            ['Thistle', '#d8bfd8'],
            ['Orchid', '#da70d6'],
            ['Goldenrod', '#daa520'],
            ['Crimson', '#dc143c'],
            ['Gainsboro', '#dcdcdc'],
            ['Plum', '#dda0dd'],
            ['Burlywood', '#deb887'],
            ['Lightcyan', '#e0ffff'],
            ['Lavender', '#e6e6fa'],
            ['Violet', '#ee82ee'],
            ['Khaki', '#f0e68c'],
            ['Aliceblue', '#f0f8ff'],
            ['Honeydew', '#f0fff0'],
            ['Azure', '#f0ffff'],
            ['Wheat', '#f5deb3'],
            ['Beige', '#f5f5dc'],
            ['Mintcream', '#f5fffa'],
            ['Salmon', '#fa8072'],
            ['Linen', '#faf0e6'],
            ['Red', '#ff0000'],
            ['Fuchsia', '#ff00ff'],
            ['Deeppink', '#ff1493'],
            ['Orangered', '#ff4500'],
            ['Tomato', '#ff6347'],
            ['Hotpink', '#ff69b4'],
            ['Coral', '#ff7f50'],
            ['Orange', '#ffa500'],
            ['Lightpink', '#ffb6c1'],
            ['Pink', '#ffc0cb'],
            ['Gold', '#ffd700'],
            ['Peachpuff', '#ffdab9'],
            ['Moccasin', '#ffe4b5'],
            ['Bisque', '#ffe4c4'],
            ['Mistyrose', '#ffe4e1'],
            ['Seashell', '#fff5ee'],
            ['Cornsilk', '#fff8dc'],
            ['Yellow', '#ffff00'],
            ['Ivory', '#fffff0'],
            ['White', '#ffffff']
        ];
        // ステッカーのデータをDBから取得
        $stickies = Item::all();
        
        return view('application.test', compact('colors', 'fontFamilies', 'stickies'));
    }
}
