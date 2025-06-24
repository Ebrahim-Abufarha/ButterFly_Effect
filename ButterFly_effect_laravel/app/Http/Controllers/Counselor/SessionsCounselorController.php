<?php

namespace App\Http\Controllers\Counselor;

use App\Http\Controllers\Controller;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SessionsCounselorController extends Controller
{
    /**
     * Display the specified session for the authenticated counselor.
     */
    public function show(string $id)
    {
        $counselorId = Auth::id(); // Get the logged-in counselor ID

        $session = Session::where('id', $id)
            ->where('counselor_id', $counselorId)
            ->firstOrFail();

        return response()->json($session);
    }

    /**
     * Remove the specified session (soft delete) for the authenticated counselor.
     */
    public function destroy(string $id)
    {
        $counselorId = Auth::id(); // Get the logged-in counselor ID

        $session = Session::where('id', $id)
            ->where('counselor_id', $counselorId)
            ->firstOrFail();

        $session->delete();

        return response()->json(['message' => 'Session deleted successfully.']);
    }
}
