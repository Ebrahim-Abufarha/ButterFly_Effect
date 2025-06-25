<?php

namespace App\Http\Controllers\Counselee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
   use App\Models\Recommendation;
use Illuminate\Support\Facades\Auth;


class RecommendationsCounseleeController extends Controller
{
    /**
     * Display a listing of the resource.
     */

public function index()
{
    $user = Auth::user();

    if (!$user->counselee) {
        return response()->json(['message' => 'User is not a counselee.'], 403);
    }

    $recommendations = Recommendation::with('counselor')
        ->where('counselee_id', $user->counselee->id)
        ->get();

    return response()->json($recommendations);
}

}
