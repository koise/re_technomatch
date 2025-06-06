<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Student API Routes
|--------------------------------------------------------------------------
|
| These routes are for student-specific functionality and require student role.
|
*/

Route::middleware('auth:sanctum')->group(function () {
    
    // Student dashboard data
    Route::get('/dashboard', function () {
        return response()->json([
            'message' => 'Student dashboard data',
            'status' => 'success'
        ]);
    });

    // Add more student routes here
    
}); 