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
}
