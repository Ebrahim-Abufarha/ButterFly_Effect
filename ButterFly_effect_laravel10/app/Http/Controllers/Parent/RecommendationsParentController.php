<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\Recommendation;
use App\Models\Counselee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecommendationsParentController extends Controller
{

    public function index()
    {
        $parent = Auth::user();

        if ($parent->role !== 'parent') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $counselee = Counselee::where('parent_id', $parent->id)->first();

        if (!$counselee) {
            return response()->json(['message' => 'No counselee found for this parent'], 404);
        }

        $recommendations = Recommendation::with(['counselor', 'counselee.user'])
            ->where('counselee_id', $counselee->id)
            ->get();

        return response()->json($recommendations);
    }
}
