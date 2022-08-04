
For migrate db and seeder

```
    php artisan migrate --seed
```
If any error happen then run 

```
    php artisan migrate:fresh --seed
```

Every time when need run seeder before it make sure run

```
    php artisan cache:clear
```
