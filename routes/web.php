<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;

Route::get('{all}', [AppController::class, 'index'])->where('all', '^(?!api).*$');
