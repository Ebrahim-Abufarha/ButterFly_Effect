<?php

namespace App\Http\Controllers\Counselor;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InstitutationCounselorController extends Controller
{
  
    public function showInstitution()
    {
        $user = Auth::user();

        if (!$user->counselor) {
            return response()->json(['message' => 'User is not a counselor.'], 403);
        }

        $counselor = $user->counselor;

        if (!$counselor->counselor_id) {
            return response()->json(['message' => 'No counselor assigned.'], 404);
        }

        $counselor = User::with('institution')->find($counselor->counselor_id);

        if (!$counselor || !$counselor->institution) {
            return response()->json(['message' => 'Institution not found.'], 404);
        }

        return response()->json($counselor->institution);
    }
}
