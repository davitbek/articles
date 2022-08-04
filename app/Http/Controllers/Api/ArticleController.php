<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;

class ArticleController extends BaseController
{
    public function index()
    {
        $articles = Article::paginate();
        return response()->json($articles);
    }
}
