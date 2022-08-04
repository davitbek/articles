<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\TagResource;
use App\Models\Tag;

class TagController extends BaseController
{

    public function show($slug)
    {
        $tag = Tag::select('name', 'slug', 'description')->firstBySlug($slug);
        return new TagResource($tag);
    }
}
