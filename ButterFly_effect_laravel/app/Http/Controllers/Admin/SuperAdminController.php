<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Institution;
use App\Models\Session;
use App\Models\PsychologicalAssessment;
use App\Models\ParentM as ParentModel;
use App\Models\FinancialTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SuperAdminController extends Controller
{
    // -------------- Users ------------------

    public function usersIndex()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function usersShow($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function usersStore(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'user_type' => 'required|in:seeker,counselor,institution_admin,super_admin,finance_manager,parent',
            'age' => 'required|integer|min:0',

            // بيانات ولي الأمر إذا العمر أقل من 18
            'parent.name' => 'required_if:age,<,18|string',
            'parent.email' => 'required_if:age,<,18|email|unique:users,email',
            'parent.password' => 'required_if:age,<,18|string|min:6',
        ]);

        // إنشاء حساب ولي الأمر لو العمر أقل من 18
        $parentUserId = null;
        if ($request->age < 18) {
            $parentUser = User::create([
                'name' => $request->parent['name'],
                'email' => $request->parent['email'],
                'password' => Hash::make($request->parent['password']),
                'user_type' => 'parent',
            ]);
            $parentUserId = $parentUser->id;
        }

        // إنشاء حساب المسترشد
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => $request->user_type,
            'age' => $request->age,
        ]);

        // إذا عمر المسترشد أقل من 18، نضيف سجل في جدول Parents
        if ($request->age < 18 && $parentUserId) {
            ParentModel::create([
                'user_id' => $parentUserId,    // ولي الأمر
                'child_id' => $user->id,       // المسترشد
            ]);
        }

        return response()->json($user, 201);
    }

     public function usersUpdate(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'user_type' => 'sometimes|required|in:seeker,counselor,institution_admin,super_admin,finance_manager,parent',
            'age' => 'sometimes|required|integer|min:0',

            'parent.name' => 'required_if:age,<,18|string',
            'parent.email' => 'required_if:age,<,18|email|unique:users,email',
            'parent.password' => 'nullable|string|min:6',
        ]);

        $user->fill($request->only(['name', 'email', 'user_type', 'age']));
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        // التعامل مع ولي الأمر حسب العمر
        if ($request->age < 18) {
            $parentRelation = ParentModel::where('child_id', $user->id)->first();

            if ($parentRelation) {
                // تحديث ولي الأمر
                $parentUser = User::find($parentRelation->user_id);
                if ($parentUser) {
                    $parentUser->name = $request->parent['name'] ?? $parentUser->name;
                    $parentUser->email = $request->parent['email'] ?? $parentUser->email;
                    if (!empty($request->parent['password'])) {
                        $parentUser->password = Hash::make($request->parent['password']);
                    }
                    $parentUser->save();
                }
            } else {
                // إنشاء ولي أمر جديد
                $parentUser = User::create([
                    'name' => $request->parent['name'],
                    'email' => $request->parent['email'],
                    'password' => Hash::make($request->parent['password']),
                    'user_type' => 'parent',
                ]);

                ParentModel::create([
                    'user_id' => $parentUser->id,
                    'child_id' => $user->id,
                ]);
            }
        } else {
            // العمر 18 أو أكثر - حذف ولي الأمر المرتبط (اختياري)
            ParentModel::where('child_id', $user->id)->delete();
        }

        return response()->json($user);
    }

     public function usersDelete($id)
    {
        $user = User::findOrFail($id);

        // حذف سجلات ولي الأمر المرتبطة
        ParentModel::where('child_id', $user->id)->delete();

        $user->delete();

        return response()->json(['message' => 'User deleted']);
    }

    // -------------- Institutions ------------------

    public function institutionsIndex()
    {
        $institutions = Institution::with('user')->get();
        return response()->json($institutions);
    }

    public function institutionsShow($id)
    {
        $institution = Institution::with('user')->findOrFail($id);
        return response()->json($institution);
    }

    public function institutionsStore(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'sector' => 'required|in:public,private,school,non_profit',
            'mental_health_policy' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
        ]);

        $institution = Institution::create($request->only([
            'name', 'sector', 'mental_health_policy', 'user_id'
        ]));

        return response()->json($institution, 201);
    }

    public function institutionsUpdate(Request $request, $id)
    {
        $institution = Institution::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string',
            'sector' => 'sometimes|required|in:public,private,school,non_profit',
            'mental_health_policy' => 'nullable|string',
            'user_id' => 'sometimes|required|exists:users,id',
        ]);

        $institution->update($request->only([
            'name', 'sector', 'mental_health_policy', 'user_id'
        ]));

        return response()->json($institution);
    }

    public function institutionsDelete($id)
    {
        $institution = Institution::findOrFail($id);
        $institution->delete();

        return response()->json(['message' => 'Institution deleted successfully']);
    }

    // -------------- Sessions ------------------

    public function sessionsIndex()
    {
        $sessions = Session::with(['seeker', 'counselor'])->get();
        return response()->json($sessions);
    }

    public function sessionsStore(Request $request)
    {
        $request->validate([
            'seeker_id' => 'required|exists:users,id',
            'counselor_id' => 'required|exists:users,id',
            'session_date' => 'required|date',
            'duration_minutes' => 'required|integer',
            'topic' => 'required|string',
            'session_type' => 'required|in:individual,group,emergency',
            'notes' => 'nullable|string',
        ]);

        $session = Session::create($request->all());

        return response()->json($session, 201);
    }

    // يمكنك إضافة update و delete للجلسات لاحقًا حسب الحاجة

    // -------------- Psychological Assessments ------------------

    public function assessmentsIndex()
    {
        $assessments = PsychologicalAssessment::with('seeker')->get();
        return response()->json($assessments);
    }

    public function assessmentsStore(Request $request)
    {
        $request->validate([
            'seeker_id' => 'required|exists:users,id',
            'assessment_date' => 'required|date',
            'self_rating' => 'required|integer|min:1|max:10',
            'mood_level' => 'nullable|integer|min:1|max:10',
            'anxiety_score' => 'nullable|integer|min:1|max:10',
            'depression_score' => 'nullable|integer|min:1|max:10',
            'recommendation' => 'nullable|string',
            'ai_flags' => 'nullable|string',
        ]);

        $assessment = PsychologicalAssessment::create($request->all());

        return response()->json($assessment, 201);
    }

    // -------------- Parents ------------------

    public function parentsIndex()
    {
        $parents = ParentModel::with(['user', 'child'])->get();
        return response()->json($parents);
    }

    public function parentsStore(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'child_id' => 'required|exists:users,id',
        ]);

        $parent = ParentModel::create($request->all());

        return response()->json($parent, 201);
    }

    // -------------- Financial Transactions ------------------

    public function financialTransactionsIndex()
    {
        $transactions = FinancialTransaction::all();
        return response()->json($transactions);
    }

    public function financialTransactionsStore(Request $request)
    {
        $request->validate([
            'payer_type' => 'required|in:seeker,institution',
            'payer_id' => 'required|integer',
            'amount' => 'required|numeric',
            'service_type' => 'required|string',
            'payment_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $transaction = FinancialTransaction::create($request->all());

        return response()->json($transaction, 201);
    }
}
