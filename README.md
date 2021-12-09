# Design-simulator-test
# コマンド忘れたとき用メモ
## 起動(コンテナ立ち上げ)
mac $ docker compose up -d

## laravel使うとき
mac $ docker compose exec app bash
app $ php artisan [command]

## テーブル作成
app $ php artisan create_[table名s]_table
-----------------
(backend/database/migrations　に作成されたphpにて)
up関数内にSchemaのhasTbaleで分岐させたif文内に作成するカラムのデータを入れる。
-----------------
public function up()
    {
        if(!Schema::hasTable('テーブル名')){
            Schema::create('テーブル名', function (Blueprint $table) {
                $table->id();
                $table->型('カラム名', 文字数);
                $table->string('itemsColor', 100);
                $table->timestamps();
            });
        }
    }
-----------------
php artisan migrate
-----------------

## テーブルにカラム追加
app $ php artisan add_[新規カラム名]_to_[追加するテーブル名]_table --table=[追加するテーブル名]
--------
databases/migrations に作成されたphpファイルに追記していく。

public function up()
{
    Schema::table('items', function (Blueprint $table) {
        //itemCategoryを追加
        $table->string('itemCategory');
    });
}
--------
