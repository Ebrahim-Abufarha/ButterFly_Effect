<?php

namespace App\Http\Controllers\Counselee;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InstitutionCounseleeController extends Controller
{
  
    public function showInstitution()
    {
        $user = Auth::user();

        if (!$user->counselee) {
            return response()->json(['message' => 'User is not a counselee.'], 403);
        }

        $counselee = $user->counselee;

        if (!$counselee->counselor_id) {
            return response()->json(['message' => 'No counselor assigned.'], 404);
        }

        $counselor = User::with('institution')->find($counselee->counselor_id);

        if (!$counselor || !$counselor->institution) {
            return response()->json(['message' => 'Institution not found.'], 404);
        }

        return response()->json($counselor->institution);
    }
}
