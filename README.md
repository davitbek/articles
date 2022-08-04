
For migrate db

```
    php artisan migrate
```
Fill database

```
    php artisan db:seed
```

If any error happen then run 

```
    php artisan migrate:fresh --seed
```

Every time when need run seeder before it make sure run

```
    php artisan cache:clear
```

###available enpoints

#GET methods
```
/api/articles                               // will return paginated articles
/api/articles?with_tags=true                // will return paginated articles with tags  
/api/articles?tag={tag_slug}                // will return paginated articles which has tage with slug={tag_slug} 
/api/articles?tag={tag_slug}&with_tags=true // will return paginated articles with tags which has tage with slug={tag_slug} 
/api/articles/{slug}                        // will return article with slug={slug}(and every time will increase views_count) if not found then laravel default not found response
/api/articles/{slug}/comments               // will return article comments with pagination based slug={slug} if not found article then laravel default not found response
/api/tags/{slug}                            // will return tag with slug={slug} if not found then laravel default not found response
```
#put methods
```
/api/articles/{slug}/like                    // will increase likes_count if found article by slug otherwise laravel default not found response
```
next step of development make article_likes table with user_id. For each user only one time like each article or based ip one time like article if not logged

#post methods
now saved only ip, theme, and comment. Later development will save user id if logged and also permit edit, delete comment(if need within same duration)
```
/api/articles/{slug}/comments               // will save new comment for article based slug. If not found article then laravel default not found response.
```
