<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationCodeMail;
use Illuminate\Support\Facades\Storage;

class SignUpController extends Controller
{
    /**
     * Handle the first step of registration: saving credentials
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function credentials(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[!@#$%^&*(),_.?":{}|<>]/',
            ],
            'terms_accepted' => 'required|boolean|accepted',
        ], [
            'password.min' => 'Password must be at least 8 characters.',
            'password.regex' => 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
            'terms_accepted.required' => 'You must accept the Terms and Conditions to proceed.',
            'terms_accepted.accepted' => 'You must accept the Terms and Conditions to proceed.',
        ]);
$user = new User();
$user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->registration_progress = 'information';
        $user->save();
        User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'registration_progress' => 'Information',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Credentials saved successfully'
        ]);
    }

    /**
     * Handle the second step of registration: saving user information
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function information(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'role' => 'required|in:student,professor',
            'gender' => 'required|in:male,female,others',
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'university' => 'nullable|string|max:255',
        ]);

        $user = User::where('email', $request->email)->first();
        if ($user->registration_progress !== 'information') {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid signup step'
            ], 400);
        }

        $user->profile()->create([
            'first_name' => ucwords(strtolower($request->firstname)),
            'last_name' => ucwords(strtolower($request->lastname)),
            'gender' => $request->gender,
            'university' => $request->university ? strtoupper($request->university) : null,
        ]);

        $code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
        $user->update([
            'role' => $request->role,
            'registration_progress' => 'verification',
            'verification_code' => $code,
            'verification_code_expires_at' => now()->addMinutes(15),
        ]);

        Mail::to($user->email)->send(new VerificationCodeMail($code));

        return response()->json([
            'status' => 'success',
            'message' => 'Information saved. Check your email for the verification code.'
        ]);
    }

    /**
     * Handle the final step of registration: email verification
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'code' => 'required|string|size:6',
        ]);

        $user = User::where('email', $request->email)->first();
        if ($user->registration_progress !== 'verification') {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid signup step'
            ], 400);
        }

        if ($user->verification_code !== $request->code || $user->verification_code_expires_at < now()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid or expired verification code'
            ], 400);
        }

        // Generate avatar for the user
        $avatarPath = $this->generateAvatar($user);
        
        // Update user profile with avatar if it exists
        if ($user->profile) {
            $user->profile->update([
                'avatar' => $avatarPath
            ]);
        }

        $user->update([
            'registration_progress' => 'completed',
            'email_verified_at' => now(),
            'verification_code' => null,
            'verification_code_expires_at' => null,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Email verified. Please log in.',
            'data' => [
                'avatar_path' => $avatarPath ? url($avatarPath) : null
            ]
        ]);
    }

    /**
     * Generate a Google-like avatar for the user
     * 
     * @param User $user
     * @return string|null
     */
    protected function generateAvatar(User $user)
    {
        // Make sure we have the profile data
        $profile = $user->profile;
        if (!$profile) {
            return null;
        }

        // Generate a unique filename
        $uniqueName = 'avatar_' . Str::uuid() . '.svg';
        
        // Create direct path to public directory
        $publicAvatarDir = public_path('avatars');
        $avatarPath = 'avatars/' . $uniqueName; // For database storage
        $fullPath = public_path($avatarPath); // Full server path
        
        // Get initials from name
        $initials = strtoupper(substr($profile->first_name, 0, 1) . substr($profile->last_name, 0, 1));
        
        // Define background colors (Google-like)
        $colors = [
            '#DB4437', // Red
            '#0F9D58', // Green
            '#4285F4', // Blue
            '#F4B400', // Yellow
        ];
        
        // Select random color
        $bgColor = $colors[array_rand($colors)];
        
        // Create SVG content
        $svgContent = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="$bgColor" />
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="white">$initials</text>
</svg>
SVG;
        
        // Make sure the avatars directory exists in public
        if (!file_exists($publicAvatarDir)) {
            mkdir($publicAvatarDir, 0755, true);
        }

        // Save the SVG file directly to public directory
        file_put_contents($fullPath, $svgContent);
        
        return $avatarPath;
    }

    /**
     * Resend verification code to the user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resendVerification(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users,email']);

        $user = User::where('email', $request->email)->first();
        if ($user->registration_progress !== 'verification') {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid signup step'
            ], 400);
        }

        $code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
        $user->update([
            'verification_code' => $code,
            'verification_code_expires_at' => now()->addMinutes(15),
        ]);

        Mail::to($user->email)->send(new VerificationCodeMail($code));

        return response()->json([
            'status' => 'success',
            'message' => 'Verification code resent successfully'
        ]);
    }
}