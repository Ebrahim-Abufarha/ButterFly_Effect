<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\Counselee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CounseleeParentController extends Controller
{
  public function index()
{
    $parent = Auth::user();

    if ($parent->role !== 'parent') {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $counselee = Counselee::with(['user', 'counselor'])
        ->where('parent_id', $parent->id)
        ->first();

    if (!$counselee) {
        return response()->json(['message' => 'No counselee found'], 404);
    }

    return response()->json($counselee);
}

    public function show(string $id)
    {
        $parent = Auth::user();

        $counselee = Counselee::with(['user', 'counselor'])
            ->where('id', $id)
            ->where('parent_id', $parent->id)
            ->first();

        if (!$counselee) {
            return response()->json(['message' => 'Counselee not found'], 404);
        }

        return response()->json($counselee);
    }

    public function update(Request $request, string $id)
    {
        $parent = Auth::user();

        $counselee = Counselee::where('id', $id)
            ->where('parent_id', $parent->id)
            ->firstOrFail();

        $validated = $request->validate([
            'birth_date' => 'required|date',
        ]);

        $counselee->update([
            'birth_date' => $validated['birth_date'],
        ]);

        return response()->json([
            'message' => 'Counselee updated successfully.',
            'counselee' => $counselee,
        ]);
    }

    public function destroy(string $id)
    {
        $parent = Auth::user();

        $counselee = Counselee::where('id', $id)
            ->where('parent_id', $parent->id)
            ->firstOrFail();

        $counselee->delete();

        return response()->json(['message' => 'Counselee deleted successfully.']);
    }
}
