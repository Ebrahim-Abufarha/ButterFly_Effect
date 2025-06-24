<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Session;
use Illuminate\Http\Request;

class SessionsAdminController extends Controller
{
    /**
     * Display a listing of all sessions.
     */
    public function index()
    {
        $sessions = Session::with(['counselee.user', 'counselor'])->get();
        return response()->json($sessions);
    }

    /**
     * Display a specific session.
     */
    public function show(string $id)
    {
        $session = Session::with(['counselee.user', 'counselor'])->findOrFail($id);
        return response()->json($session);
    }
}
