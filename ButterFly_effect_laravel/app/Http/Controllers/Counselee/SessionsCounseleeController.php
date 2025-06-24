<?php

namespace App\Http\Controllers\Counselee;

use App\Http\Controllers\Controller;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SessionsCounseleeController extends Controller
{
  
    public function index()
    {
        $user = Auth::user();

        if (!$user->counselee) {
            return response()->json(['message' => 'User is not a counselee.'], 403);
        }

        $sessions = Session::where('counselee_id', $user->counselee->id)
            ->with('counselor')
            ->get();

        return response()->json($sessions);
    }

    /**
     */
   public function store(Request $request)
{
    $user = Auth::user();

    if (!$user->counselee) {
        return response()->json(['message' => 'User is not a counselee.'], 403);
    }

    $validated = $request->validate([
        'date'           => 'required|date',
        'time'           => 'required|date_format:H:i',
        'duration'       => 'nullable|integer',
        'audio_url'      => 'nullable|string|max:255',
        'transcript_text'=> 'nullable|string',
        'comment'        => 'nullable|string',
    ]);

    $counselorId = $user->counselee->counselor_id;

    if (!$counselorId) {
        return response()->json(['message' => 'No counselor assigned to the counselee.'], 400);
    }

    $existingSession = Session::where('counselor_id', $counselorId)
        ->where('date', $validated['date'])
        ->whereRaw('HOUR(time) = ?', [date('H', strtotime($validated['time']))])
        ->first();

    if ($existingSession) {
        return response()->json([
            'message' => 'This time slot is already booked for the counselor.',
            'conflict_session' => $existingSession
        ], 409);
    }

    $session = Session::create([
        'counselee_id'    => $user->counselee->id,
        'counselor_id'    => $counselorId,
        'date'            => $validated['date'],
        'time'            => $validated['time'],
        'duration'        => $validated['duration'] ?? null,
        'audio_url'       => $validated['audio_url'] ?? null,
        'transcript_text' => $validated['transcript_text'] ?? null,
    ]);

    return response()->json([
        'message' => 'Session booked successfully',
        'session' => $session
    ], 201);
}


    public function show(string $id)
    {
        $user = Auth::user();

        if (!$user->counselee) {
            return response()->json(['message' => 'User is not a counselee.'], 403);
        }

        $session = Session::where('id', $id)
            ->where('counselee_id', $user->counselee->id)
            ->with('counselor')
            ->firstOrFail();

        return response()->json($session);
    }


    public function update(Request $request, string $id)
    {
        $user = Auth::user();

        if (!$user->counselee) {
            return response()->json(['message' => 'User is not a counselee.'], 403);
        }

        $session = Session::where('id', $id)
            ->where('counselee_id', $user->counselee->id)
            ->firstOrFail();

        $validated = $request->validate([
            'date'           => 'required|date',
            'time'           => 'required|date_format:H:i',
            'duration'       => 'nullable|integer',
            'audio_url'      => 'nullable|string|max:255',
            'transcript_text'=> 'nullable|string',
            'comment'        => 'nullable|string',
        ]);

        $session->update($validated);

        return response()->json([
            'message' => 'Session updated successfully',
            'session' => $session
        ]);
    }


    public function destroy(string $id)
    {
        $user = Auth::user();

        if (!$user->counselee) {
            return response()->json(['message' => 'User is not a counselee.'], 403);
        }

        $session = Session::where('id', $id)
            ->where('counselee_id', $user->counselee->id)
            ->firstOrFail();

        $session->delete();

        return response()->json(['message' => 'Session deleted successfully']);
    }
}
