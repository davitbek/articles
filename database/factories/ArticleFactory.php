<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    protected $seconds = 365 * 24 * 60;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $seconds = random_int(0, $this->seconds);
        return [
            'name' => $this->faker->words(random_int(1, 5), true),
            'image_path' => $this->faker->imageUrl(),
            'text' => $this->faker->text(random_int(50, 200)),
            'created_at' => now()->subSeconds($seconds),
            'updated_at' => now()->subSeconds(random_int(0, $seconds))
        ];
    }
}
