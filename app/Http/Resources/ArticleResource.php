<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'slug' => $this->slug,
            'text' => $this->text,
            'image_path' => $this->when(null !== $this->image_path, $this->image_path),
            'views_count' => $this->views_count,
            'likes_count' => $this->when(null !== $this->likes_count, $this->likes_count),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
        ];
    }
}
