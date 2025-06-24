<?php

namespace App\Http\Controllers\Counselor;

use App\Http\Controllers\Controller;
use App\Models\Recommendation;
use App\Models\Counselee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class RecommendationsCounselorController extends Controller
{
    public function index()
    {
        $counselor = Auth::user();

        if ($counselor->role !== 'counselor') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $recommendations = Recommendation::where('counselor_id', $counselor->id)
            ->with(['counselee.user', 'counselee.parent'])
            ->get();

        return response()->json($recommendations);
    }

    // Create a new recommendation for a counselee (or their parent if under 18)
    public function store(Request $request)
    {
        $counselor = Auth::user();

        if ($counselor->role !== 'counselor') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'counselee_id' => 'required|exists:counselees,id',
            'text' => 'required|string',
            'for_parent' => 'sometimes|boolean',
        ]);

        $counselee = Counselee::with('user', 'parent')->findOrFail($validated['counselee_id']);

        if ($counselee->counselor_id !== $counselor->id) {
            return response()->json(['message' => 'This counselee is not assigned to you.'], 403);
        }

        $age = Carbon::parse($counselee->birth_date)->age;
        $forParent = $age < 18;

        if (isset($validated['for_parent'])) {
            $forParent = $validated['for_parent'] && $age < 18;
        }

        $recommendation = Recommendation::create([
            'counselee_id' => $counselee->id,
            'counselor_id' => $counselor->id,
            'text' => $validated['text'],
            'for_parent' => $forParent,
        ]);

        return response()->json([
            'message' => 'Recommendation created successfully',
            'recommendation' => $recommendation,
        ], 201);
    }

    public function show(string $id)
    {
        $counselor = Auth::user();

        $recommendation = Recommendation::with(['counselee.user', 'counselee.parent'])
            ->findOrFail($id);

        if ($recommendation->counselor_id !== $counselor->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($recommendation);
    }

    public function update(Request $request, string $id)
    {
        $counselor = Auth::user();

        $recommendation = Recommendation::findOrFail($id);

        if ($recommendation->counselor_id !== $counselor->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'text' => 'required|string',
            'for_parent' => 'sometimes|boolean',
        ]);

        $counselee = Counselee::findOrFail($recommendation->counselee_id);
        $age = Carbon::parse($counselee->birth_date)->age;

        $forParent = $age < 18;

        if (isset($validated['for_parent'])) {
            $forParent = $validated['for_parent'] && $age < 18;
        }

        $recommendation->update([
            'text' => $validated['text'],
            'for_parent' => $forParent,
        ]);

        return response()->json([
            'message' => 'Recommendation updated successfully',
            'recommendation' => $recommendation,
        ]);
    }

    public function destroy(string $id)
    {
        $counselor = Auth::user();

        $recommendation = Recommendation::findOrFail($id);

        if ($recommendation->counselor_id !== $counselor->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $recommendation->delete();

        return response()->json(['message' => 'Recommendation deleted successfully']);
    }
}
