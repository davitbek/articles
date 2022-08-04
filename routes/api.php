<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\Api\ArticleController;
use  App\Http\Controllers\Api\TagController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('articles', [ArticleController::class, 'index']);
Route::get('articles/{slug}', [ArticleController::class, 'show']);
Route::put('articles/{slug}/like', [ArticleController::class, 'like']);
Route::get('articles/{slug}/comments', [ArticleController::class, 'comments']);
Route::post('articles/{slug}/comments', [ArticleController::class, 'storeComments']);

Route::get('tags/{slug}', [TagController::class, 'show']);
