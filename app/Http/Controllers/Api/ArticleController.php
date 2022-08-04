<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends BaseController
{
    public function index(Request $request)
    {
        $articles = Article::select('id', 'name', 'slug', 'text', 'views_count', 'image_path')
            ->with([
                'tags' => function ($q) {
                    $q->select('tags.id', 'tags.name', 'tags.slug');
                }
            ])
            ->paginate();
        return ArticleResource::collection($articles);
    }

    public function show($slug)
    {
        $article = Article::select('id', 'name', 'slug', 'text', 'views_count', 'likes_count', 'image_path')
            ->with([
                'tags' => function ($q) {
                    $q->select('tags.id', 'tags.name', 'tags.slug');
                }
            ])
            ->firstBySlug($slug);
        $article->increment('views_count');
        return new ArticleResource($article);
    }

    public function like($slug)
    {
        $article = Article::select('id', 'likes_count')->firstBySlug($slug);
        $article->increment('likes_count');
        return response()->json(['success' => true]);
    }
}
