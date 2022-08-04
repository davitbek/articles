<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ArticleResource;
use App\Http\Resources\CommentResource;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArticleController extends BaseController
{
    public function index(Request $request)
    {
        $length = 100;
        $articles = Article::select('id', 'name', 'slug', 'views_count', 'image_path')
            ->addSelect(DB::raw(sprintf('CONCAT(SUBSTRING(`text`, 1, %s), IF(CHAR_LENGTH(`text`) < %s, "", "...")) as text', $length, $length)))
            ->when($request->with_tags, function ($q) {
                $q->with([
                    'tags' => function ($q) {
                        $q->select('tags.id', 'tags.name', 'tags.slug');
                    }
                ]);
            })
            ->when($request->tag, function ($q) use ($request) {
                $q->whereHas('tags', function ($q) use ($request) {
                    $q->where('tags.slug', $request->tag);
                });
            })
            ->latest()
            ->paginate($request->per_page);
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

    public function comments(Request $request, $slug)
    {
        $article = Article::select('id')->firstBySlug($slug);
        $comments = $article->comments()->latest()->paginate($request->per_page);
        return CommentResource::collection($comments);
    }

    public function storeComments(Request $request, $slug)
    {
        $article = Article::select('id')->firstBySlug($slug);
        $data = $request->validate([
            'theme' => 'required|max:100',
            'comment' => 'required|max:65,535',
        ]);
        $data['ip'] = $request->ip();
        $data['article_id'] = $article->id;
        $comment = Comment::create($data);

        return new CommentResource($comment);
    }
}
