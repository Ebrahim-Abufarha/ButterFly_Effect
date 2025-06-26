<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Counselor\InstitutationCounselorController;
use App\Http\Controllers\Institution\UsersInstitutionController;
use App\Http\Controllers\Parent\CounseleeParentController;
use App\Http\Controllers\Parent\RecommendationsParentController;
use App\Http\Controllers\Admin\UserAdminController;
use App\Http\Controllers\Admin\InstitutionAdminController;
use App\Http\Controllers\Admin\CounseleesAdminController;
use App\Http\Controllers\Admin\RecommendationsAdminController;
use App\Http\Controllers\Admin\SessionsAdminController;
use App\Http\Controllers\Counselee\InstitutionCounseleeController;
use App\Http\Controllers\Counselee\RecommendationsCounseleeController;
use App\Http\Controllers\Counselee\SessionsCounseleeController;
use App\Http\Controllers\Counselee\UserCounseleeController;
use App\Http\Controllers\Counselor\CounseleeCounselorController;
use App\Http\Controllers\Counselor\RecommendationsCounselorController;
use App\Http\Controllers\Counselor\SessionsCounselorController;
use App\Http\Controllers\Counselor\UserCounselorController;
use App\Http\Controllers\Institution\RecommendationsInstitutionController;
use App\Http\Controllers\Institution\SessionsInstitutionController;
use App\Http\Controllers\Parent\SessionsParentController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

    Route::resource('users', UserAdminController::class);
    Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', [UserAdminController::class, 'profile']);
    Route::put('/profile', [UserAdminController::class, 'updateProfile']);
});
    Route::resource('institutions', InstitutionAdminController::class);
    Route::resource('counselee', CounseleesAdminController::class);
    Route::resource('recommendations', RecommendationsAdminController::class);
    Route::resource('sessions', SessionsAdminController::class);

    Route::get('counselees/{id}/institution', [InstitutionCounseleeController::class, 'showInstitution']);
    Route::resource('sessionscounselee', SessionsCounseleeController::class);
    Route::resource('recommendationscounselee', RecommendationsCounseleeController::class);
    Route::resource('usercounselee', UserCounseleeController::class);

    Route::resource('sessionscounselor', SessionsCounselorController::class)->only(['show', 'destroy']);
        Route::resource('recommendationcounselor', RecommendationsCounselorController::class);
                Route::resource('institutoincounselor', controller: InstitutationCounselorController::class);
                                Route::resource('counseleecounselor', controller: CounseleeCounselorController::class);


        Route::resource('recommendationinstitutoin', RecommendationsInstitutionController::class);
                Route::resource('sessionsinstitutoin', SessionsInstitutionController::class);
                                Route::resource('usersinstitutoin', UsersInstitutionController::class);


                Route::resource('sessionsparent', SessionsParentController::class);
                        Route::resource('recommendationparent', RecommendationsParentController::class);
                                Route::resource('counseleeparent', controller: CounseleeParentController::class);







