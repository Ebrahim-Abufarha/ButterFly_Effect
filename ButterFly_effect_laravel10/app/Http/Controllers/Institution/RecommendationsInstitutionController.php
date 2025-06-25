<?php

namespace App\Http\Controllers\Institution;

use App\Http\Controllers\Controller;
use App\Models\Recommendation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecommendationsInstitutionController extends Controller
{
    public function index()
    {
        $institution = Auth::user();

        if ($institution->role !== 'institution') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $counselorIds = User::where('institution_id', $institution->id)
            ->where('role', 'counselor')
            ->pluck('id');

        $recommendations = Recommendation::with(['counselor', 'counselee.user'])
            ->whereIn('counselor_id', $counselorIds)
            ->get();

        return response()->json($recommendations);
    }
}
