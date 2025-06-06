<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Professor API Routes
|--------------------------------------------------------------------------
|
| These routes are for professor-specific functionality and require professor role.
|
*/

Route::middleware('auth:sanctum')->group(function () {
    
    // Professor dashboard data
    Route::get('/dashboard', function () {
        return response()->json([
            'message' => 'Professor dashboard data',
            'status' => 'success'
        ]);
    });

    // Add more professor routes here
    
}); 