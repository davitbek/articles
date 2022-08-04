<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'views_count',
        'likes_count',
        'name',
        'slug',
        'image_path',
        'text',
    ];

    public static function boot()
    {
        parent::boot();
        self::creating(function (Article $article) {
            $article->slug = $article->slug ?? Str::slug($article->name);
        });
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function scopeFirstBySlug($q, $slug)
    {
        return $q->where('slug', $slug)->firstOrFail();
    }
}
