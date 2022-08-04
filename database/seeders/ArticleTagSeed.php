<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class ArticleTagSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $articles = Article::doesntHave('tags')->get(['id', 'created_at']);
        if ($articles->isEmpty()) {
            return;
        }

        $tags = Tag::get(['id', 'created_at']);
        foreach ($articles as $article) {
            $articleTags = $tags->filter(function ($tag) use ($article) {
                return $article->created_at >= $tag->created_at;
            });
            if ($articleTags->isEmpty()) {
                $articleTags = Tag::factory()->create([
                    'created_at' => $article->created_at,
                    'updated_at' => $article->created_at,
                ]);
            }
            $tagIds = $articleTags->pluck('id')->random(random_int(1, $articleTags->count()));
            $article->tags()->attach($tagIds);
        }
    }
}
