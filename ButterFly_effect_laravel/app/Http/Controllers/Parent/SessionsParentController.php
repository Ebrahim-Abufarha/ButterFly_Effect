<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\Session;
use App\Models\Counselee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SessionsParentController extends Controller
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

        $sessions = Session::with(['counselor', 'counselee.user'])
            ->where('counselee_id', $counselee->id)
            ->get();

        return response()->json($sessions);
    }

    public function show(string $id)
    {
        $parent = Auth::user();

        if ($parent->role !== 'parent') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $counselee = Counselee::where('parent_id', $parent->id)->first();

        if (!$counselee) {
            return response()->json(['message' => 'No counselee found for this parent'], 404);
        }

        $session = Session::with(['counselor', 'counselee.user'])
            ->where('id', $id)
            ->where('counselee_id', $counselee->id)
            ->first();

        if (!$session) {
            return response()->json(['message' => 'Session not found or unauthorized'], 404);
        }

        return response()->json($session);
    }
}
