<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\InstitutionController;

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

Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'me']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});






use App\Http\Controllers\Admin\SuperAdminController;

Route::middleware(['auth:sanctum', 'user_type:super_admin'])->group(function () {
    

    // Institutions
  
 Route::get('/institutions', [InstitutionController::class, 'index']);
    Route::post('/institutions', [InstitutionController::class, 'store']);
    Route::put('/institutions/{id}', [InstitutionController::class, 'update']);
    Route::delete('/institutions/{id}', [InstitutionController::class, 'destroy']);
    Route::get('/institutions/{id}', [InstitutionController::class, 'show']);

    // Sessions
 
    

    // Psychological assessments

    

    // Parents

    

    // Financial transactions

    
    // Dashboard stats
   Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    
});
