<?php

namespace App\Http\Controllers\Institution;

use App\Http\Controllers\Controller;
use App\Models\Session;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SessionsInstitutionController extends Controller
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

        $sessions = Session::whereIn('counselor_id', $counselorIds)
                           ->with(['counselee.user', 'counselor'])
                           ->get();

        return response()->json($sessions);
    }

 
    public function destroy(string $id)
    {
        $institution = Auth::user();

        if ($institution->role !== 'institution') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $counselorIds = User::where('institution_id', $institution->id)
                            ->where('role', 'counselor')
                            ->pluck('id');

        $session = Session::where('id', $id)
                          ->whereIn('counselor_id', $counselorIds)
                          ->first();

        if (!$session) {
            return response()->json(['message' => 'Session not found or unauthorized'], 404);
        }

        $session->delete();

        return response()->json(['message' => 'Session deleted successfully']);
    }
}
