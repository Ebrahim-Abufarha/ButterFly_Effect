<?php

use App\Http\Controllers\Admin\CounseleesAdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserAdminController;
use App\Http\Controllers\Admin\InstitutionAdminController;
use App\Http\Controllers\Admin\RecommendationsAdminController;
use App\Http\Controllers\Admin\SessionsAdminController;
use App\Http\Controllers\Counselee\InstitutionCounseleeController;
use App\Http\Controllers\Counselee\RecommendationsCounseleeController;
use App\Http\Controllers\Counselee\SessionsCounseleeController;
use App\Http\Controllers\Counselee\UserCounseleeController;



Route::Resource('users', UserAdminController::class);
Route::Resource('institutions', InstitutionAdminController::class);
Route::Resource('counselee', CounseleesAdminController::class);
Route::Resource('recommendations', RecommendationsAdminController::class);
Route::Resource('sessions', SessionsAdminController::class);



Route::get('counselees/{id}/institution', [InstitutionCounseleeController::class, 'showInstitution']);
Route::Resource('sessionscounselee', SessionsCounseleeController::class);
Route::Resource('recommendationscounselee', RecommendationsCounseleeController::class);
Route::Resource('usercounselee', UserCounseleeController::class);






