<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'slug',
    ];

    public static function boot()
    {
        parent::boot();
        self::creating(function (Tag $tag) {
            $tag->slug = $tag->slug ?? Str::slug($tag->name);
        });
    }

    public function scopeFirstBySlug($q, $slug)
    {
        return $q->where('slug', $slug)->firstOrFail();
    }
}
