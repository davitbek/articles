<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Cache;

class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $firstArticleCreatedAt = Cache::remember('first_article_creation_time', 60, function () {
            return Article::min('created_at');
        });
        $seconds = now()->diffInSeconds($firstArticleCreatedAt) + random_int(1, 10000);
        return [
            'name' => $this->faker->name,
            'created_at' => now()->subSeconds($seconds),
            'updated_at' => now()->subSeconds(random_int(0, $seconds))
        ];
    }
}
