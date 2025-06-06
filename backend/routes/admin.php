<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin API Routes
|--------------------------------------------------------------------------
|
| These routes are for admin-specific functionality and require admin role.
|
*/

Route::middleware('auth:sanctum')->group(function () {
    
    // Admin dashboard data
    Route::get('/dashboard', function () {
        return response()->json([
            'message' => 'Admin dashboard data',
            'status' => 'success'
        ]);
    });

    // Add more admin routes here
    
}); 