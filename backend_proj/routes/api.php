<?php

use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/adduser', [userController::class, 'store']);
Route::delete('/destroy/{id}', [userController::class, 'destroy']);
Route::get('/users', [userController::class, 'index']);
Route::get('/show/{id}', [userController::class, 'show']);
Route::put('/update', [userController::class, 'update']);
