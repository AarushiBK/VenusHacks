(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/profileStorage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_ACCOUNT_EMAIL",
    ()=>DEFAULT_ACCOUNT_EMAIL,
    "DEFAULT_EMERGENCY_CONTACTS",
    ()=>DEFAULT_EMERGENCY_CONTACTS,
    "DEMO_GOOGLE_EMAIL",
    ()=>DEMO_GOOGLE_EMAIL,
    "hasStoredPassword",
    ()=>hasStoredPassword,
    "loadAccountEmail",
    ()=>loadAccountEmail,
    "loadEmergencyContacts",
    ()=>loadEmergencyContacts,
    "saveAccountEmail",
    ()=>saveAccountEmail,
    "saveEmergencyContacts",
    ()=>saveEmergencyContacts,
    "savePassword",
    ()=>savePassword,
    "validateNewPassword",
    ()=>validateNewPassword,
    "verifyPassword",
    ()=>verifyPassword
]);
const DEFAULT_EMERGENCY_CONTACTS = {
    family: {
        name: "Jordan Lee",
        relation: "Partner · emergency contact",
        phone: "(555) 014-8821"
    },
    provider: {
        name: "Dr. Elena Rivera",
        clinic: "Maternal Cardiology · Bayview Women's Health",
        phone: "(555) 014-2200"
    }
};
const DEFAULT_ACCOUNT_EMAIL = "alex.care@example.com";
const DEMO_GOOGLE_EMAIL = "alex.google.demo@vitacor.app";
const CONTACTS_KEY = "carechain-emergency-contacts";
const EMAIL_KEY = "carechain-account-email";
const PASSWORD_KEY = "carechain-account-password";
function isBrowser() {
    return "object" !== "undefined";
}
function loadEmergencyContacts() {
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    try {
        var _parsed_family, _parsed_provider;
        const raw = window.localStorage.getItem(CONTACTS_KEY);
        if (!raw) return DEFAULT_EMERGENCY_CONTACTS;
        const parsed = JSON.parse(raw);
        if (!(parsed === null || parsed === void 0 ? void 0 : (_parsed_family = parsed.family) === null || _parsed_family === void 0 ? void 0 : _parsed_family.name) || !(parsed === null || parsed === void 0 ? void 0 : (_parsed_provider = parsed.provider) === null || _parsed_provider === void 0 ? void 0 : _parsed_provider.name)) {
            return DEFAULT_EMERGENCY_CONTACTS;
        }
        return parsed;
    } catch (e) {
        return DEFAULT_EMERGENCY_CONTACTS;
    }
}
function saveEmergencyContacts(contacts) {
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    window.localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}
function loadAccountEmail() {
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    var _window_localStorage_getItem;
    return (_window_localStorage_getItem = window.localStorage.getItem(EMAIL_KEY)) !== null && _window_localStorage_getItem !== void 0 ? _window_localStorage_getItem : DEFAULT_ACCOUNT_EMAIL;
}
function saveAccountEmail(email) {
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    window.localStorage.setItem(EMAIL_KEY, email);
}
function hasStoredPassword() {
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    return Boolean(window.localStorage.getItem(PASSWORD_KEY));
}
function verifyPassword(password) {
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    const stored = window.localStorage.getItem(PASSWORD_KEY);
    if (!stored) return true;
    return stored === password;
}
function savePassword(password) {
    if (!isBrowser()) //TURBOPACK unreachable
    ;
    window.localStorage.setItem(PASSWORD_KEY, password);
}
function validateNewPassword(newPassword, confirmPassword, currentPassword) {
    if (hasStoredPassword() && isBrowser()) {
        if (!(currentPassword === null || currentPassword === void 0 ? void 0 : currentPassword.trim())) {
            return "Enter your current password.";
        }
        if (!verifyPassword(currentPassword)) {
            return "Current password is incorrect.";
        }
    }
    if (newPassword.length < 8) {
        return "Password must be at least 8 characters.";
    }
    if (newPassword !== confirmPassword) {
        return "Passwords do not match.";
    }
    return null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/authService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isGoogleUser",
    ()=>isGoogleUser,
    "signInWithEmail",
    ()=>signInWithEmail,
    "signInWithGoogle",
    ()=>signInWithGoogle,
    "signOut",
    ()=>signOut,
    "signUpWithEmail",
    ()=>signUpWithEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript)");
;
;
const googleProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleAuthProvider"]();
googleProvider.addScope("email");
googleProvider.addScope("profile");
googleProvider.setCustomParameters({
    prompt: "select_account"
});
async function signUpWithEmail(email, password) {
    const credential = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createUserWithEmailAndPassword"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requireAuth"])(), email, password);
    return credential.user;
}
async function signInWithEmail(email, password) {
    const credential = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithEmailAndPassword"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requireAuth"])(), email, password);
    return credential.user;
}
async function signInWithGoogle() {
    const credential = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithPopup"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requireAuth"])(), googleProvider);
    return credential.user;
}
function signOut() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requireAuth"])());
}
function isGoogleUser(user) {
    return user.providerData.some((p)=>p.providerId === "google.com");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/authErrors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuthErrorMessage",
    ()=>getAuthErrorMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript)");
;
function getAuthErrorMessage(error) {
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FirebaseError"]) {
        switch(error.code){
            case "auth/email-already-in-use":
                return "An account with this email already exists. Try signing in instead.";
            case "auth/invalid-email":
                return "Please enter a valid email address.";
            case "auth/weak-password":
                return "Password should be at least 6 characters.";
            case "auth/user-not-found":
            case "auth/wrong-password":
            case "auth/invalid-credential":
                return "Incorrect email or password.";
            case "auth/too-many-requests":
                return "Too many attempts. Please wait a moment and try again.";
            case "auth/popup-closed-by-user":
                return "Sign-in was cancelled.";
            case "auth/popup-blocked":
                return "Pop-up was blocked. Allow pop-ups for this site and try again.";
            case "auth/account-exists-with-different-credential":
                return "An account already exists with this email using a different sign-in method.";
            case "auth/network-request-failed":
                return "Network error. Check your connection and try again.";
            default:
                return error.message || "Something went wrong. Please try again.";
        }
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "Something went wrong. Please try again.";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useGoogleAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGoogleAuth",
    ()=>useGoogleAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/authSession.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/profileStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/authService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userProfileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/userProfileService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$authErrors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/authErrors.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
async function handleDemoGoogleAuth(intent, router) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveAccountEmail"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_GOOGLE_EMAIL"]);
    if ("TURBOPACK compile-time truthy", 1) {
        window.localStorage.setItem("carechain_user_name", "Alex");
        window.localStorage.setItem("carechain_auth_provider", "google");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthenticated"])("Alex");
    const completed = window.localStorage.getItem("carechain_demo_profile_complete");
    if (!completed) {
        router.replace("/signup?complete=1&demo=1");
        return;
    }
    router.replace("/");
}
function useGoogleAuth() {
    let intent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "signin";
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { refreshProfile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const signInWithGoogleAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGoogleAuth.useCallback[signInWithGoogleAccount]": async ()=>{
            setLoading(true);
            setError(null);
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirebaseConfigured"]) {
                try {
                    await handleDemoGoogleAuth(intent, router);
                } catch (err) {
                    setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$authErrors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthErrorMessage"])(err));
                } finally{
                    setLoading(false);
                }
                return;
            }
            try {
                var _profile_fullName, _user_displayName;
                const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithGoogle"])();
                const profile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userProfileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserProfile"])(user.uid);
                await refreshProfile();
                var _profile_fullName_split_, _ref;
                const name = (_ref = (_profile_fullName_split_ = profile === null || profile === void 0 ? void 0 : (_profile_fullName = profile.fullName) === null || _profile_fullName === void 0 ? void 0 : _profile_fullName.split(/\s+/)[0]) !== null && _profile_fullName_split_ !== void 0 ? _profile_fullName_split_ : (_user_displayName = user.displayName) === null || _user_displayName === void 0 ? void 0 : _user_displayName.split(/\s+/)[0]) !== null && _ref !== void 0 ? _ref : "Alex";
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthenticated"])(name);
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userProfileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasCompletedProfile"])(profile)) {
                    router.replace("/");
                } else {
                    router.replace("/signup?complete=1");
                }
            } catch (err) {
                setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$authErrors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthErrorMessage"])(err));
            } finally{
                setLoading(false);
            }
        }
    }["useGoogleAuth.useCallback[signInWithGoogleAccount]"], [
        intent,
        router,
        refreshProfile
    ]);
    const googleButtonLabel = intent === "signup" ? "Sign up with Google" : "Continue with Google";
    return {
        signInWithGoogleAccount,
        googleLoading: loading,
        googleError: error,
        clearGoogleError: ()=>setError(null),
        googleButtonLabel,
        googleAvailable: true
    };
}
_s(useGoogleAuth, "fZ/YPeG7tQokUtpQvb9YXiSK9WE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/types/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialSignUpFormState",
    ()=>initialSignUpFormState
]);
const initialSignUpFormState = {
    fullName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    pronouns: "",
    ethnicity: "",
    smokes: false,
    vapes: false,
    physicalActivity: "",
    familyHeartDisease: false,
    familyHeartDiseaseDetails: "",
    preExistingConditions: [],
    connectedWearables: [],
    appleHealthImport: false,
    pendingMedicalFiles: []
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/FirebaseSetupNotice.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FirebaseSetupNotice",
    ()=>FirebaseSetupNotice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript)");
;
;
function FirebaseSetupNotice() {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirebaseConfigured"]) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ios-toast",
        role: "alert",
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "ios-toast-title",
                children: "Demo mode"
            }, void 0, false, {
                fileName: "[project]/src/components/FirebaseSetupNotice.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "ios-toast-body",
                children: [
                    "Firebase is not configured — using demo sign-in. Copy",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: ".env.example"
                    }, void 0, false, {
                        fileName: "[project]/src/components/FirebaseSetupNotice.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    " to ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: ".env.local"
                    }, void 0, false, {
                        fileName: "[project]/src/components/FirebaseSetupNotice.tsx",
                        lineNumber: 15,
                        columnNumber: 38
                    }, this),
                    " for real accounts."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FirebaseSetupNotice.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FirebaseSetupNotice.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = FirebaseSetupNotice;
var _c;
__turbopack_context__.k.register(_c, "FirebaseSetupNotice");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/auth/AuthShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthShell",
    ()=>AuthShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FirebaseSetupNotice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FirebaseSetupNotice.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$PhoneDeviceFrame$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/PhoneDeviceFrame.tsx [app-client] (ecmascript)");
;
;
;
function AuthShell(param) {
    let { children, variant = "auth" } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "auth-flow-root",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "phone-app-viewport",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$PhoneDeviceFrame$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PhoneDeviceFrame"], {
                variant: variant,
                overlay: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FirebaseSetupNotice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FirebaseSetupNotice"], {}, void 0, false, {
                    fileName: "[project]/src/components/auth/AuthShell.tsx",
                    lineNumber: 17,
                    columnNumber: 54
                }, void 0),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "auth-flow-inner auth-flow-inner--".concat(variant),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/AuthShell.tsx",
                    lineNumber: 18,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/auth/AuthShell.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/auth/AuthShell.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/auth/AuthShell.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = AuthShell;
var _c;
__turbopack_context__.k.register(_c, "AuthShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/constants/formOptions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTIVITY_OPTIONS",
    ()=>ACTIVITY_OPTIONS,
    "ETHNICITY_OPTIONS",
    ()=>ETHNICITY_OPTIONS,
    "PRONOUN_OPTIONS",
    ()=>PRONOUN_OPTIONS,
    "SIGNUP_STEPS",
    ()=>SIGNUP_STEPS,
    "WEARABLE_OPTIONS",
    ()=>WEARABLE_OPTIONS
]);
const PRONOUN_OPTIONS = [
    "She/her",
    "He/him",
    "They/them",
    "Prefer to self-describe",
    "Prefer not to say"
];
const ETHNICITY_OPTIONS = [
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Hispanic or Latina",
    "Middle Eastern or North African",
    "Native Hawaiian or Pacific Islander",
    "White",
    "Multiracial",
    "Prefer to self-describe",
    "Prefer not to say"
];
const ACTIVITY_OPTIONS = [
    {
        value: "sedentary",
        label: "Mostly sedentary",
        description: "Little to no intentional exercise"
    },
    {
        value: "light",
        label: "Light activity",
        description: "Walking or light movement a few days per week"
    },
    {
        value: "moderate",
        label: "Moderate activity",
        description: "150+ minutes of moderate exercise per week"
    },
    {
        value: "active",
        label: "Active",
        description: "Regular cardio or strength training most days"
    },
    {
        value: "very_active",
        label: "Very active",
        description: "Daily vigorous exercise or athletic training"
    }
];
const WEARABLE_OPTIONS = [
    {
        id: "apple_watch",
        name: "Apple Watch",
        description: "Heart rate, activity, sleep, and workout data"
    },
    {
        id: "oura",
        name: "Oura Ring",
        description: "Sleep, readiness, and cardiovascular insights"
    },
    {
        id: "fitbit",
        name: "Fitbit",
        description: "Steps, heart rate, and activity trends"
    },
    {
        id: "garmin",
        name: "Garmin",
        description: "Fitness and heart-rate variability data"
    },
    {
        id: "whoop",
        name: "WHOOP",
        description: "Strain, recovery, and sleep metrics"
    },
    {
        id: "other",
        name: "Other wearable",
        description: "Connect another supported device later"
    }
];
const SIGNUP_STEPS = [
    {
        id: 1,
        title: "Account",
        subtitle: "Create your secure profile"
    },
    {
        id: 2,
        title: "About you",
        subtitle: "Basic health identifiers"
    },
    {
        id: 3,
        title: "Lifestyle",
        subtitle: "Habits that affect heart risk"
    },
    {
        id: 4,
        title: "Family history",
        subtitle: "Early heart disease in relatives"
    },
    {
        id: 5,
        title: "Health history",
        subtitle: "Pre-existing conditions"
    },
    {
        id: 6,
        title: "Connect data",
        subtitle: "Optional — wearables & records"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/conditionsApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "searchConditions",
    ()=>searchConditions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_ROOT = ("TURBOPACK compile-time truthy", 1) ? "/api/clinicaltables" : "TURBOPACK unreachable";
async function searchConditions(query, signal) {
    const terms = query.trim();
    if (terms.length < 2) return [];
    const params = new URLSearchParams({
        terms,
        maxList: "8",
        df: "consumer_name",
        ef: "ICD10CM,term_icd9_code"
    });
    const res = await fetch("".concat(API_ROOT, "/conditions/v3/search?").concat(params), {
        signal
    });
    if (!res.ok) {
        throw new Error("Could not search conditions. Try again in a moment.");
    }
    const data = await res.json();
    const [, codes, extra, displayRows] = data;
    if (!(codes === null || codes === void 0 ? void 0 : codes.length) || !(displayRows === null || displayRows === void 0 ? void 0 : displayRows.length)) return [];
    var _extra_ICD10CM;
    const icd10List = (_extra_ICD10CM = extra.ICD10CM) !== null && _extra_ICD10CM !== void 0 ? _extra_ICD10CM : [];
    var _extra_term_icd9_code;
    const icd9List = (_extra_term_icd9_code = extra.term_icd9_code) !== null && _extra_term_icd9_code !== void 0 ? _extra_term_icd9_code : [];
    return codes.map((code, i)=>{
        var _displayRows_i;
        var _displayRows_i_, _icd10List_i, _ref;
        return {
            id: code,
            name: (_displayRows_i_ = (_displayRows_i = displayRows[i]) === null || _displayRows_i === void 0 ? void 0 : _displayRows_i[0]) !== null && _displayRows_i_ !== void 0 ? _displayRows_i_ : code,
            icd10: (_ref = (_icd10List_i = icd10List[i]) !== null && _icd10List_i !== void 0 ? _icd10List_i : icd9List[i]) !== null && _ref !== void 0 ? _ref : ""
        };
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useDebouncedValue.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDebouncedValue",
    ()=>useDebouncedValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useDebouncedValue(value) {
    let delayMs = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 300;
    _s();
    const [debounced, setDebounced] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDebouncedValue.useEffect": ()=>{
            const timer = window.setTimeout({
                "useDebouncedValue.useEffect.timer": ()=>setDebounced(value)
            }["useDebouncedValue.useEffect.timer"], delayMs);
            return ({
                "useDebouncedValue.useEffect": ()=>window.clearTimeout(timer)
            })["useDebouncedValue.useEffect"];
        }
    }["useDebouncedValue.useEffect"], [
        value,
        delayMs
    ]);
    return debounced;
}
_s(useDebouncedValue, "33bQBlXg6j7MFSTRBeGy5/ui5G8=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useConditionSearch.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useConditionSearch",
    ()=>useConditionSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$conditionsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/conditionsApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDebouncedValue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useDebouncedValue.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useConditionSearch(query) {
    _s();
    const debouncedQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDebouncedValue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebouncedValue"])(query, 300);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useConditionSearch.useEffect": ()=>{
            if (debouncedQuery.trim().length < 2) {
                setResults([]);
                setError(null);
                setLoading(false);
                return;
            }
            const controller = new AbortController();
            setLoading(true);
            setError(null);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$conditionsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchConditions"])(debouncedQuery, controller.signal).then({
                "useConditionSearch.useEffect": (items)=>{
                    if (!controller.signal.aborted) setResults(items);
                }
            }["useConditionSearch.useEffect"]).catch({
                "useConditionSearch.useEffect": (err)=>{
                    if (controller.signal.aborted) return;
                    setResults([]);
                    setError(err instanceof Error ? err.message : "Search failed");
                }
            }["useConditionSearch.useEffect"]).finally({
                "useConditionSearch.useEffect": ()=>{
                    if (!controller.signal.aborted) setLoading(false);
                }
            }["useConditionSearch.useEffect"]);
            return ({
                "useConditionSearch.useEffect": ()=>controller.abort()
            })["useConditionSearch.useEffect"];
        }
    }["useConditionSearch.useEffect"], [
        debouncedQuery
    ]);
    return {
        results,
        loading,
        error
    };
}
_s(useConditionSearch, "SM5Y6v7hKkoi4ChWr0rW73nSUHI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDebouncedValue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebouncedValue"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/SelectInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectInput",
    ()=>SelectInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function normalizeOptions(options) {
    return options.map((o)=>typeof o === "string" ? {
            value: o,
            label: o
        } : o);
}
function Chevron(param) {
    let { open } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "h-4 w-4 shrink-0 text-muted/80 transition-transform ".concat(open ? "rotate-180" : ""),
        viewBox: "0 0 20 20",
        fill: "none",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M5 7.5L10 12.5L15 7.5",
            stroke: "currentColor",
            strokeWidth: "1.75",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/SelectInput.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/SelectInput.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = Chevron;
const triggerClassName = "flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-white px-4 py-3 text-left text-sm outline-none transition focus:border-burgundy focus:ring-2 focus:ring-burgundy/15 disabled:cursor-not-allowed disabled:opacity-60";
function SelectInput(param) {
    let { id, value, onChange, options, placeholder, error, disabled } = param;
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const listId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const items = normalizeOptions(options);
    const selected = items.find((o)=>o.value === value);
    const isEmpty = !value;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SelectInput.useEffect": ()=>{
            if (!open) return;
            const onPointerDown = {
                "SelectInput.useEffect.onPointerDown": (e)=>{
                    var _containerRef_current;
                    if (!((_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.contains(e.target))) {
                        setOpen(false);
                    }
                }
            }["SelectInput.useEffect.onPointerDown"];
            const onKeyDown = {
                "SelectInput.useEffect.onKeyDown": (e)=>{
                    if (e.key === "Escape") setOpen(false);
                }
            }["SelectInput.useEffect.onKeyDown"];
            document.addEventListener("pointerdown", onPointerDown);
            document.addEventListener("keydown", onKeyDown);
            return ({
                "SelectInput.useEffect": ()=>{
                    document.removeEventListener("pointerdown", onPointerDown);
                    document.removeEventListener("keydown", onKeyDown);
                }
            })["SelectInput.useEffect"];
        }
    }["SelectInput.useEffect"], [
        open
    ]);
    const errorClass = error ? "border-coral focus:border-coral focus:ring-coral/15" : "";
    var _selected_label;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                id: id,
                disabled: disabled,
                "aria-haspopup": "listbox",
                "aria-expanded": open,
                "aria-controls": listId,
                onClick: ()=>!disabled && setOpen((prev)=>!prev),
                className: "".concat(triggerClassName, " ").concat(isEmpty ? "text-muted" : "text-ink", " ").concat(errorClass),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "truncate",
                        children: (_selected_label = selected === null || selected === void 0 ? void 0 : selected.label) !== null && _selected_label !== void 0 ? _selected_label : placeholder
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/SelectInput.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chevron, {
                        open: open
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/SelectInput.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/SelectInput.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                id: listId,
                role: "listbox",
                "aria-labelledby": id,
                className: "absolute z-50 mt-1.5 max-h-60 w-full overflow-auto rounded-xl border border-border bg-white py-1 shadow-lg shadow-ink/8",
                children: items.map((opt)=>{
                    const isSelected = value === opt.value;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        role: "presentation",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            role: "option",
                            "aria-selected": isSelected,
                            onClick: ()=>{
                                onChange(opt.value);
                                setOpen(false);
                            },
                            className: "w-full px-4 py-2.5 text-left text-sm transition ".concat(isSelected ? "bg-burgundy/8 font-medium text-ink" : "text-muted hover:bg-cream-dark/60 hover:text-ink"),
                            children: opt.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/SelectInput.tsx",
                            lineNumber: 109,
                            columnNumber: 17
                        }, this)
                    }, opt.value, false, {
                        fileName: "[project]/src/components/ui/SelectInput.tsx",
                        lineNumber: 108,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ui/SelectInput.tsx",
                lineNumber: 99,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/SelectInput.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(SelectInput, "2dJCtUidUm7JVCGDDIJEaDEkiMQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c1 = SelectInput;
var _c, _c1;
__turbopack_context__.k.register(_c, "Chevron");
__turbopack_context__.k.register(_c1, "SelectInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/FormField.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormField",
    ()=>FormField,
    "TextInput",
    ()=>TextInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SelectInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/SelectInput.tsx [app-client] (ecmascript)");
;
;
function FormField(param) {
    let { label, htmlFor, hint, error, required, children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: htmlFor,
                className: "text-sm font-medium text-ink",
                children: [
                    label,
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-0.5 text-coral",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/FormField.tsx",
                        lineNumber: 27,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/FormField.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            children,
            hint && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs leading-relaxed text-muted",
                children: hint
            }, void 0, false, {
                fileName: "[project]/src/components/ui/FormField.tsx",
                lineNumber: 30,
                columnNumber: 26
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-coral",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/ui/FormField.tsx",
                lineNumber: 31,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/FormField.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = FormField;
const inputClassName = "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-burgundy focus:ring-2 focus:ring-burgundy/15";
function TextInput(param) {
    let { id, error, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        id: id,
        className: "".concat(inputClassName, " ").concat(error ? "border-coral focus:border-coral focus:ring-coral/15" : ""),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/FormField.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c1 = TextInput;
var _c, _c1;
__turbopack_context__.k.register(_c, "FormField");
__turbopack_context__.k.register(_c1, "TextInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/health/ConditionSearch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConditionSearch",
    ()=>ConditionSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useConditionSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useConditionSearch.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/FormField.tsx [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function ConditionSearch(param) {
    let { selected, onChange } = param;
    _s();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const listId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const inputId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const { results, loading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useConditionSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConditionSearch"])(query);
    const selectedIds = new Set(selected.map((c)=>c.id));
    const visibleResults = results.filter((r)=>!selectedIds.has(r.id));
    const showDropdown = open && query.trim().length >= 2;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConditionSearch.useEffect": ()=>{
            if (!open) return;
            const onPointerDown = {
                "ConditionSearch.useEffect.onPointerDown": (e)=>{
                    var _containerRef_current;
                    if (!((_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.contains(e.target))) {
                        setOpen(false);
                    }
                }
            }["ConditionSearch.useEffect.onPointerDown"];
            const onKeyDown = {
                "ConditionSearch.useEffect.onKeyDown": (e)=>{
                    if (e.key === "Escape") setOpen(false);
                }
            }["ConditionSearch.useEffect.onKeyDown"];
            document.addEventListener("pointerdown", onPointerDown);
            document.addEventListener("keydown", onKeyDown);
            return ({
                "ConditionSearch.useEffect": ()=>{
                    document.removeEventListener("pointerdown", onPointerDown);
                    document.removeEventListener("keydown", onKeyDown);
                }
            })["ConditionSearch.useEffect"];
        }
    }["ConditionSearch.useEffect"], [
        open
    ]);
    function addCondition(condition) {
        if (selectedIds.has(condition.id)) return;
        onChange([
            ...selected,
            condition
        ]);
        setQuery("");
        setOpen(false);
    }
    function removeCondition(id) {
        onChange(selected.filter((c)=>c.id !== id));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-w-0 space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "relative min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: inputId,
                        className: "text-sm font-medium text-ink",
                        children: "Search conditions"
                    }, void 0, false, {
                        fileName: "[project]/src/components/health/ConditionSearch.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-muted",
                        children: "Start typing (e.g. diabetes, endometriosis). Powered by NIH Clinical Tables."
                    }, void 0, false, {
                        fileName: "[project]/src/components/health/ConditionSearch.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1.5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TextInput"], {
                            id: inputId,
                            type: "search",
                            autoComplete: "off",
                            role: "combobox",
                            "aria-expanded": showDropdown,
                            "aria-controls": listId,
                            "aria-autocomplete": "list",
                            placeholder: "Search for a condition…",
                            value: query,
                            onChange: (e)=>{
                                setQuery(e.target.value);
                                setOpen(true);
                            },
                            onFocus: ()=>setOpen(true)
                        }, void 0, false, {
                            fileName: "[project]/src/components/health/ConditionSearch.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/health/ConditionSearch.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    showDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        id: listId,
                        role: "listbox",
                        className: "absolute left-0 right-0 z-50 mt-1.5 max-h-56 min-w-0 overflow-x-hidden overflow-y-auto rounded-xl border border-border bg-white py-1 shadow-lg shadow-ink/8",
                        children: [
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "px-4 py-2.5 text-sm text-muted",
                                children: "Searching…"
                            }, void 0, false, {
                                fileName: "[project]/src/components/health/ConditionSearch.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this),
                            error && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "px-4 py-2.5 text-sm text-coral",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/components/health/ConditionSearch.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this),
                            !loading && !error && visibleResults.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "px-4 py-2.5 text-sm text-muted",
                                children: "No matching conditions"
                            }, void 0, false, {
                                fileName: "[project]/src/components/health/ConditionSearch.tsx",
                                lineNumber: 96,
                                columnNumber: 15
                            }, this),
                            !loading && !error && visibleResults.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    role: "presentation",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        role: "option",
                                        className: "w-full min-w-0 px-4 py-2.5 text-left text-sm transition text-muted hover:bg-cream-dark/60 hover:text-ink",
                                        onClick: ()=>addCondition(item),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block font-medium leading-snug break-words whitespace-normal text-ink",
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/health/ConditionSearch.tsx",
                                            lineNumber: 108,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/health/ConditionSearch.tsx",
                                        lineNumber: 102,
                                        columnNumber: 19
                                    }, this)
                                }, item.id, false, {
                                    fileName: "[project]/src/components/health/ConditionSearch.tsx",
                                    lineNumber: 101,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/health/ConditionSearch.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/health/ConditionSearch.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            selected.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "flex flex-wrap gap-2",
                "aria-label": "Selected conditions",
                children: selected.map((condition)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-flex max-w-full items-start gap-1.5 rounded-2xl border border-burgundy/25 bg-burgundy/5 py-1.5 pl-3 pr-1.5 text-sm text-ink",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "min-w-0 leading-snug break-words whitespace-normal",
                                    children: condition.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/health/ConditionSearch.tsx",
                                    lineNumber: 123,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>removeCondition(condition.id),
                                    className: "shrink-0 rounded-full p-0.5 text-muted transition hover:bg-burgundy/10 hover:text-coral",
                                    "aria-label": "Remove ".concat(condition.name),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "h-4 w-4",
                                        viewBox: "0 0 20 20",
                                        fill: "none",
                                        "aria-hidden": true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M6 6l8 8M14 6l-8 8",
                                            stroke: "currentColor",
                                            strokeWidth: "1.75",
                                            strokeLinecap: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/health/ConditionSearch.tsx",
                                            lineNumber: 133,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/health/ConditionSearch.tsx",
                                        lineNumber: 132,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/health/ConditionSearch.tsx",
                                    lineNumber: 126,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/health/ConditionSearch.tsx",
                            lineNumber: 122,
                            columnNumber: 15
                        }, this)
                    }, condition.id, false, {
                        fileName: "[project]/src/components/health/ConditionSearch.tsx",
                        lineNumber: 121,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/health/ConditionSearch.tsx",
                lineNumber: 119,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/health/ConditionSearch.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(ConditionSearch, "1cXV24ulDflGSpFMsN51x9qNqcI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useConditionSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConditionSearch"]
    ];
});
_c = ConditionSearch;
var _c;
__turbopack_context__.k.register(_c, "ConditionSearch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const variants = {
    primary: "bg-burgundy text-white shadow-md shadow-burgundy/20 hover:bg-burgundy-dark focus-visible:ring-burgundy/30",
    secondary: "border border-border bg-white text-ink hover:border-burgundy/40 hover:bg-cream-dark focus-visible:ring-burgundy/20",
    ghost: "text-burgundy hover:bg-burgundy/5 focus-visible:ring-burgundy/20"
};
function Button(param) {
    let { variant = "primary", fullWidth, className = "", type = "button", children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: type,
        className: "ios-touch-target inline-flex items-center justify-center gap-2 px-5 py-3.5 transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ".concat(variants[variant], " ").concat(fullWidth ? "w-full" : "", " ").concat(className),
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Button.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Toggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toggle",
    ()=>Toggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Toggle(param) {
    let { id, label, description, checked, onChange } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        htmlFor: id,
        className: "flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-white p-4 transition hover:border-burgundy/30",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                id: id,
                type: "checkbox",
                checked: checked,
                onChange: (e)=>onChange(e.target.checked),
                className: "mt-0.5 size-4 shrink-0 accent-burgundy"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Toggle.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex flex-col gap-0.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium text-ink",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Toggle.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs leading-relaxed text-muted",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Toggle.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Toggle.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Toggle.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = Toggle;
var _c;
__turbopack_context__.k.register(_c, "Toggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/auth/AuthDivider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthDivider",
    ()=>AuthDivider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function AuthDivider() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "h-px flex-1 bg-border"
            }, void 0, false, {
                fileName: "[project]/src/components/auth/AuthDivider.tsx",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-medium text-muted",
                children: "or"
            }, void 0, false, {
                fileName: "[project]/src/components/auth/AuthDivider.tsx",
                lineNumber: 5,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "h-px flex-1 bg-border"
            }, void 0, false, {
                fileName: "[project]/src/components/auth/AuthDivider.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/auth/AuthDivider.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = AuthDivider;
var _c;
__turbopack_context__.k.register(_c, "AuthDivider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/auth/GoogleSignInButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GoogleSignInButton",
    ()=>GoogleSignInButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function GoogleSignInButton(param) {
    let { onClick, disabled, loading, label = "Continue with Google" } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        disabled: disabled || loading,
        className: "ios-touch-target flex w-full items-center justify-center gap-3 rounded-[14px] border border-border bg-white px-4 text-[17px] font-semibold tracking-[-0.022em] text-ink shadow-sm transition hover:border-burgundy/30 hover:bg-cream-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GoogleIcon, {}, void 0, false, {
                fileName: "[project]/src/components/auth/GoogleSignInButton.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            loading ? "Connecting…" : label
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/auth/GoogleSignInButton.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = GoogleSignInButton;
function GoogleIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#4285F4",
                d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            }, void 0, false, {
                fileName: "[project]/src/components/auth/GoogleSignInButton.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#34A853",
                d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            }, void 0, false, {
                fileName: "[project]/src/components/auth/GoogleSignInButton.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#FBBC05",
                d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            }, void 0, false, {
                fileName: "[project]/src/components/auth/GoogleSignInButton.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#EA4335",
                d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            }, void 0, false, {
                fileName: "[project]/src/components/auth/GoogleSignInButton.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/auth/GoogleSignInButton.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c1 = GoogleIcon;
var _c, _c1;
__turbopack_context__.k.register(_c, "GoogleSignInButton");
__turbopack_context__.k.register(_c1, "GoogleIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/auth/SignUpProgressBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignUpProgressBar",
    ()=>SignUpProgressBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/formOptions.ts [app-client] (ecmascript)");
;
;
function SignUpProgressBar(param) {
    let { currentStep } = param;
    const total = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIGNUP_STEPS"].length;
    const stepMeta = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIGNUP_STEPS"][currentStep - 1];
    const percent = Math.round(currentStep / total * 100);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-6",
        "aria-label": "Sign up progress: step ".concat(currentStep, " of ").concat(total),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 flex items-center justify-between text-xs font-medium",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted",
                        children: [
                            "Step ",
                            currentStep,
                            " of ",
                            total
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/auth/SignUpProgressBar.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-burgundy",
                        children: [
                            percent,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/auth/SignUpProgressBar.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/SignUpProgressBar.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-2 overflow-hidden rounded-full bg-cream-dark",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full rounded-full bg-gradient-to-r from-burgundy-dark to-burgundy transition-all duration-500 ease-out",
                    style: {
                        width: "".concat(percent, "%")
                    },
                    role: "progressbar",
                    "aria-valuenow": percent,
                    "aria-valuemin": 0,
                    "aria-valuemax": 100
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/SignUpProgressBar.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SignUpProgressBar.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 font-display text-xl font-semibold text-ink",
                children: stepMeta.title
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SignUpProgressBar.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted",
                children: stepMeta.subtitle
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SignUpProgressBar.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/auth/SignUpProgressBar.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = SignUpProgressBar;
var _c;
__turbopack_context__.k.register(_c, "SignUpProgressBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/auth/SignUpForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignUpForm",
    ()=>SignUpForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/formOptions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$health$2f$ConditionSearch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/health/ConditionSearch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/FormField.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SelectInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/SelectInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthDivider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/AuthDivider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$GoogleSignInButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/GoogleSignInButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$SignUpProgressBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/SignUpProgressBar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
function SignUpForm(param) {
    let { profile, onChange, onSubmit, skipAccountStep = false, initialStep = 1, onGoogleSignIn, googleButtonLabel = "Sign up with Google", submitting, errorMessage } = param;
    _s();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(skipAccountStep ? Math.max(initialStep, 2) : initialStep);
    const [confirmPassword, setConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [customPronouns, setCustomPronouns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [customEthnicity, setCustomEthnicity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const pronounsValue = profile.pronouns === "Prefer to self-describe" ? customPronouns : profile.pronouns;
    const ethnicityValue = profile.ethnicity === "Prefer to self-describe" ? customEthnicity : profile.ethnicity;
    function validateStep() {
        const next = {};
        if (step === 1 && !skipAccountStep) {
            if (!profile.fullName.trim()) next.fullName = "Name is required";
            if (!profile.email.trim()) next.email = "Email is required";
            if (!profile.password || profile.password.length < 8) {
                next.password = "Use at least 8 characters";
            }
            if (profile.password !== confirmPassword) {
                next.confirmPassword = "Passwords do not match";
            }
        }
        if (step === 2) {
            if (!profile.dateOfBirth) next.dateOfBirth = "Date of birth is required";
            if (!profile.pronouns) next.pronouns = "Please select pronouns";
            if (profile.pronouns === "Prefer to self-describe" && !customPronouns.trim()) {
                next.pronouns = "Please enter your pronouns";
            }
            if (!profile.ethnicity) next.ethnicity = "Please select ethnicity";
            if (profile.ethnicity === "Prefer to self-describe" && !customEthnicity.trim()) {
                next.ethnicity = "Please describe your ethnicity";
            }
        }
        if (step === 3) {
            if (!profile.physicalActivity) {
                next.physicalActivity = "Please select your activity level";
            }
        }
        if (step === 4) {
            if (profile.familyHeartDisease && !profile.familyHeartDiseaseDetails.trim()) {
                next.familyHeartDiseaseDetails = "Please share which relative and approximate age of diagnosis";
            }
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    }
    function goNext() {
        if (!validateStep()) return;
        setStep((s)=>Math.min(s + 1, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIGNUP_STEPS"].length));
    }
    function goBack() {
        setErrors({});
        const minStep = skipAccountStep ? 2 : 1;
        setStep((s)=>Math.max(s - 1, minStep));
    }
    function toggleWearable(id) {
        const connected = profile.connectedWearables.includes(id) ? profile.connectedWearables.filter((w)=>w !== id) : [
            ...profile.connectedWearables,
            id
        ];
        onChange({
            connectedWearables: connected
        });
    }
    function handleFiles(files) {
        if (!files) return;
        onChange({
            pendingMedicalFiles: [
                ...profile.pendingMedicalFiles,
                ...Array.from(files)
            ]
        });
    }
    function removeFile(index) {
        onChange({
            pendingMedicalFiles: profile.pendingMedicalFiles.filter((_, i)=>i !== index)
        });
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (step < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIGNUP_STEPS"].length) {
            goNext();
            return;
        }
        onSubmit({
            ...profile,
            pronouns: pronounsValue,
            ethnicity: ethnicityValue
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "flex min-h-0 flex-1 flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$SignUpProgressBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignUpProgressBar"], {
                currentStep: step
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-4 rounded-xl border border-coral/30 bg-coral/5 px-4 py-3 text-sm text-coral",
                children: errorMessage
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                lineNumber: 145,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto pb-4",
                children: [
                    step === 1 && !skipAccountStep && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            onGoogleSignIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$GoogleSignInButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleSignInButton"], {
                                        onClick: onGoogleSignIn,
                                        disabled: submitting,
                                        loading: submitting,
                                        label: googleButtonLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                        lineNumber: 155,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthDivider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthDivider"], {}, void 0, false, {
                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FormField"], {
                                label: "Full name",
                                htmlFor: "fullname",
                                required: true,
                                error: errors.fullName,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TextInput"], {
                                    id: "fullname",
                                    autoComplete: "name",
                                    placeholder: "Your name",
                                    value: profile.fullName,
                                    onChange: (e)=>onChange({
                                            fullName: e.target.value
                                        }),
                                    error: !!errors.fullName
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                    lineNumber: 165,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FormField"], {
                                label: "Email",
                                htmlFor: "signup-email",
                                required: true,
                                error: errors.email,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TextInput"], {
                                    id: "signup-email",
                                    type: "email",
                                    autoComplete: "email",
                                    placeholder: "you@example.com",
                                    value: profile.email,
                                    onChange: (e)=>onChange({
                                            email: e.target.value
                                        }),
                                    error: !!errors.email
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                    lineNumber: 175,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FormField"], {
                                label: "Password",
                                htmlFor: "signup-password",
                                required: true,
                                error: errors.password,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TextInput"], {
                                    id: "signup-password",
                                    type: "password",
                                    autoComplete: "new-password",
                                    placeholder: "At least 8 characters",
                                    value: profile.password,
                                    onChange: (e)=>onChange({
                                            password: e.target.value
                                        }),
                                    error: !!errors.password
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FormField"], {
                                label: "Confirm password",
                                htmlFor: "confirm-password",
                                required: true,
                                error: errors.confirmPassword,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TextInput"], {
                                    id: "confirm-password",
                                    type: "password",
                                    autoComplete: "new-password",
                                    placeholder: "Re-enter password",
                                    value: confirmPassword,
                                    onChange: (e)=>setConfirmPassword(e.target.value),
                                    error: !!errors.confirmPassword
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                    lineNumber: 202,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FormField"], {
                                label: "Date of birth",
                                htmlFor: "dob",
                                required: true,
                                hint: "Used to personalize cardiovascular risk assessments.",
                                error: errors.dateOfBirth,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TextInput"], {
                                    id: "dob",
                                    type: "date",
                                    value: profile.dateOfBirth,
                                    onChange: (e)=>onChange({
                                            dateOfBirth: e.target.value
                                        }),
                                    error: !!errors.dateOfBirth
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                    lineNumber: 224,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 217,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FormField"], {
                                label: "Pronouns",
                                htmlFor: "pronouns",
                                required: true,
                                error: errors.pronouns,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SelectInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectInput"], {
                                    id: "pronouns",
                                    value: profile.pronouns,
                                    onChange: (value)=>onChange({
                                            pronouns: value
                                        }),
                                    placeholder: "Select pronouns",
                                    options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRONOUN_OPTIONS"],
                                    error: !!errors.pronouns
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                    lineNumber: 233,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 232,
                                columnNumber: 13
                            }, this),
                            profile.pronouns === "Prefer to self-describe" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FormField"], {
                                label: "Your pronouns",
                                htmlFor: "custom-pronouns",
                                required: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TextInput"], {
                                    id: "custom-pronouns",
                                    placeholder: "e.g. xe/xem",
                                    value: customPronouns,
                                    onChange: (e)=>setCustomPronouns(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                    lineNumber: 244,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 243,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FormField"], {
                                label: "Ethnicity",
                                htmlFor: "ethnicity",
                                required: true,
                                error: errors.ethnicity,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SelectInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectInput"], {
                                    id: "ethnicity",
                                    value: profile.ethnicity,
                                    onChange: (value)=>onChange({
                                            ethnicity: value
                                        }),
                                    placeholder: "Select ethnicity",
                                    options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ETHNICITY_OPTIONS"],
                                    error: !!errors.ethnicity
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                    lineNumber: 253,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 252,
                                columnNumber: 13
                            }, this),
                            profile.ethnicity === "Prefer to self-describe" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FormField"], {
                                label: "Describe your ethnicity",
                                htmlFor: "custom-ethnicity",
                                required: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TextInput"], {
                                    id: "custom-ethnicity",
                                    value: customEthnicity,
                                    onChange: (e)=>setCustomEthnicity(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                    lineNumber: 264,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 263,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true),
                    step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted",
                                children: "Smoking and vaping can increase cardiovascular risk, especially during pregnancy and postpartum."
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 276,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toggle"], {
                                id: "smokes",
                                label: "I currently smoke cigarettes",
                                checked: profile.smokes,
                                onChange: (smokes)=>onChange({
                                        smokes
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 280,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toggle"], {
                                id: "vapes",
                                label: "I currently vape or use e-cigarettes",
                                checked: profile.vapes,
                                onChange: (vapes)=>onChange({
                                        vapes
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 286,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                        className: "text-sm font-medium text-ink",
                                        children: [
                                            "Physical activity level ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-coral",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                lineNumber: 294,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this),
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACTIVITY_OPTIONS"].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex cursor-pointer gap-3 rounded-xl border p-4 transition ".concat(profile.physicalActivity === opt.value ? "border-burgundy bg-burgundy/5 ring-2 ring-burgundy/15" : "border-border bg-white hover:border-burgundy/30"),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "radio",
                                                    name: "activity",
                                                    value: opt.value,
                                                    checked: profile.physicalActivity === opt.value,
                                                    onChange: ()=>onChange({
                                                            physicalActivity: opt.value
                                                        }),
                                                    className: "mt-1 accent-burgundy"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-sm font-medium text-ink",
                                                            children: opt.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                            lineNumber: 314,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-xs text-muted",
                                                            children: opt.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, opt.value, true, {
                                            fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                            lineNumber: 297,
                                            columnNumber: 17
                                        }, this)),
                                    errors.physicalActivity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-coral",
                                        children: errors.physicalActivity
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                        lineNumber: 320,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-coral/30 bg-coral/5 p-4 text-sm leading-relaxed text-ink",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "font-semibold",
                                        children: "Why we ask:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                        lineNumber: 329,
                                        columnNumber: 15
                                    }, this),
                                    " You may be at higher risk if a close family member (parent or sibling) developed heart disease early in life—before age 55 for men or before age 65 for women."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 328,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toggle"], {
                                id: "family-heart",
                                label: "A parent or sibling had early heart disease",
                                description: "Heart attack, stroke, coronary artery disease, or similar before those ages",
                                checked: profile.familyHeartDisease,
                                onChange: (familyHeartDisease)=>onChange({
                                        familyHeartDisease
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 333,
                                columnNumber: 13
                            }, this),
                            profile.familyHeartDisease && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$FormField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["FormField"], {
                                label: "Tell us more",
                                htmlFor: "family-details",
                                required: true,
                                hint: "Who was affected and roughly when (approximate age is fine).",
                                error: errors.familyHeartDiseaseDetails,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    id: "family-details",
                                    rows: 4,
                                    className: "w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/15",
                                    placeholder: "e.g. Mother — heart attack at age 52",
                                    value: profile.familyHeartDiseaseDetails,
                                    onChange: (e)=>onChange({
                                            familyHeartDiseaseDetails: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                    lineNumber: 348,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 341,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true),
                    step === 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted",
                                children: "Conditions such as diabetes or endometriosis can affect cardiovascular risk, especially during pregnancy. Add any that apply — you can update this later."
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 363,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$health$2f$ConditionSearch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConditionSearch"], {
                                selected: profile.preExistingConditions,
                                onChange: (preExistingConditions)=>onChange({
                                        preExistingConditions
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 367,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    step === 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted",
                                children: "All connections are optional. You can add or change these anytime in settings."
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 376,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-ink",
                                        children: "Connect wearables"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                        lineNumber: 381,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-2 sm:grid-cols-2",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WEARABLE_OPTIONS"].map((w)=>{
                                            const selected = profile.connectedWearables.includes(w.id);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>toggleWearable(w.id),
                                                className: "rounded-xl border p-4 text-left transition ".concat(selected ? "border-burgundy bg-burgundy/5 ring-2 ring-burgundy/15" : "border-border bg-white hover:border-burgundy/30"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-sm font-semibold text-ink",
                                                        children: w.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-0.5 block text-xs text-muted",
                                                        children: w.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 23
                                                    }, this),
                                                    selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-2 inline-block text-xs font-medium text-sage",
                                                        children: "Selected — connect after signup"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                        lineNumber: 399,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, w.id, true, {
                                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                lineNumber: 386,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                        lineNumber: 382,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toggle"], {
                                id: "apple-health",
                                label: "Import from Apple Health",
                                description: "Sync heart rate, activity, sleep, and reproductive health data from your iPhone",
                                checked: profile.appleHealthImport,
                                onChange: (appleHealthImport)=>onChange({
                                        appleHealthImport
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 409,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-ink",
                                        children: "Upload medical records"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                        lineNumber: 418,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted",
                                        children: "Lab results, prenatal records, ECG reports, or other documents (PDF, images)."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                        lineNumber: 419,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-cream-dark/50 px-6 py-8 transition hover:border-burgundy/40 hover:bg-white",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                "aria-hidden": true,
                                                children: "📄"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                lineNumber: 423,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-burgundy",
                                                children: "Choose files or drag here"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                lineNumber: 426,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-muted",
                                                children: "PDF, PNG, JPG up to 25 MB each"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                lineNumber: 429,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                className: "sr-only",
                                                accept: ".pdf,.png,.jpg,.jpeg,.heic",
                                                multiple: true,
                                                onChange: (e)=>handleFiles(e.target.files)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                lineNumber: 430,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                        lineNumber: 422,
                                        columnNumber: 15
                                    }, this),
                                    profile.pendingMedicalFiles.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2",
                                        children: profile.pendingMedicalFiles.map((file, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "truncate text-ink",
                                                        children: file.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>removeFile(i),
                                                        className: "shrink-0 text-xs font-medium text-coral hover:underline",
                                                        children: "Remove"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                        lineNumber: 446,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, "".concat(file.name, "-").concat(i), true, {
                                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                                lineNumber: 441,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                        lineNumber: 439,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                                lineNumber: 417,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-border/60 bg-cream safe-bottom mt-4 flex shrink-0 gap-3 border-t pt-4",
                children: [
                    (step > 1 || !skipAccountStep) && step > (skipAccountStep ? 2 : 1) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        variant: "secondary",
                        onClick: goBack,
                        className: "flex-1",
                        disabled: submitting,
                        children: "Back"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                        lineNumber: 464,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "submit",
                        fullWidth: true,
                        className: step > (skipAccountStep ? 2 : 1) ? "flex-[2]" : "",
                        disabled: submitting,
                        children: submitting ? "Saving…" : step < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIGNUP_STEPS"].length ? "Continue" : "Create account"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                        lineNumber: 468,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                lineNumber: 462,
                columnNumber: 7
            }, this),
            !skipAccountStep && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted mt-4 shrink-0 pb-1 text-center text-sm",
                children: [
                    "Already have an account?",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/login",
                        className: "text-rose-deep font-semibold",
                        children: "Sign in"
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/SignUpForm.tsx",
                        lineNumber: 479,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/auth/SignUpForm.tsx",
                lineNumber: 477,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/auth/SignUpForm.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
_s(SignUpForm, "N3Eu4MOIAubnkUKSX36rwsICPLw=");
_c = SignUpForm;
var _c;
__turbopack_context__.k.register(_c, "SignUpForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/auth/SignUpScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignUpScreen",
    ()=>SignUpScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGoogleAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useGoogleAuth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/authSession.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/profileStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/authService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userProfileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/userProfileService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$authErrors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/authErrors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/AuthShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$SignUpForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/SignUpForm.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function SignUpContent() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const completeProfile = searchParams.get("complete") === "1";
    const isDemoComplete = searchParams.get("demo") === "1";
    const { user, profile, refreshProfile, loading: authLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { signInWithGoogleAccount, googleLoading, googleError, googleButtonLabel } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGoogleAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGoogleAuth"])("signup");
    var _ref;
    const activeUser = (_ref = user !== null && user !== void 0 ? user : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"] === null || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"] === void 0 ? void 0 : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].currentUser) !== null && _ref !== void 0 ? _ref : null;
    const skipAccountStep = Boolean(completeProfile && (activeUser || isDemoComplete));
    const [profileData, setProfileData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialSignUpFormState"]);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SignUpContent.useEffect": ()=>{
            if (isDemoComplete) {
                const demoName = ("TURBOPACK compile-time truthy", 1) ? window.localStorage.getItem("carechain_user_name") : "TURBOPACK unreachable";
                setProfileData({
                    "SignUpContent.useEffect": (prev)=>{
                        var _ref;
                        return {
                            ...prev,
                            email: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_GOOGLE_EMAIL"],
                            fullName: (_ref = demoName !== null && demoName !== void 0 ? demoName : prev.fullName) !== null && _ref !== void 0 ? _ref : "Alex"
                        };
                    }
                }["SignUpContent.useEffect"]);
                return;
            }
            if (!activeUser) return;
            setProfileData({
                "SignUpContent.useEffect": (prev)=>{
                    var _activeUser_email, _activeUser_displayName;
                    return {
                        ...prev,
                        email: (_activeUser_email = activeUser.email) !== null && _activeUser_email !== void 0 ? _activeUser_email : prev.email,
                        fullName: (_activeUser_displayName = activeUser.displayName) !== null && _activeUser_displayName !== void 0 ? _activeUser_displayName : prev.fullName
                    };
                }
            }["SignUpContent.useEffect"]);
        }
    }["SignUpContent.useEffect"], [
        activeUser,
        isDemoComplete
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SignUpContent.useEffect": ()=>{
            if (submitting) return;
            if (profile && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userProfileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasCompletedProfile"])(profile)) {
                router.replace("/");
            }
        }
    }["SignUpContent.useEffect"], [
        profile,
        router,
        submitting
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SignUpContent.useEffect": ()=>{
            if (!completeProfile || authLoading || isDemoComplete) return;
            if (!activeUser && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirebaseConfigured"]) {
                router.replace("/login");
            }
        }
    }["SignUpContent.useEffect"], [
        completeProfile,
        authLoading,
        activeUser,
        isDemoComplete,
        router
    ]);
    function updateProfile(updates) {
        setProfileData((prev)=>({
                ...prev,
                ...updates
            }));
    }
    async function handleDemoSignUp(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveAccountEmail"])(data.email.trim() || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_GOOGLE_EMAIL"]);
        if (!skipAccountStep) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savePassword"])(data.password);
        }
        var _data_fullName_trim_split_;
        const firstName = (_data_fullName_trim_split_ = data.fullName.trim().split(/\s+/)[0]) !== null && _data_fullName_trim_split_ !== void 0 ? _data_fullName_trim_split_ : "Alex";
        if ("TURBOPACK compile-time truthy", 1) {
            window.localStorage.setItem("carechain_user_name", data.fullName.trim());
            window.localStorage.setItem("carechain_demo_profile_complete", "1");
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthenticated"])(firstName);
        router.replace("/");
    }
    async function handleSignUp(data) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirebaseConfigured"]) {
            await handleDemoSignUp(data);
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            let uid;
            let authProvider;
            if (skipAccountStep && activeUser) {
                uid = activeUser.uid;
                authProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGoogleUser"])(activeUser) ? "google" : "email";
            } else {
                const authUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signUpWithEmail"])(data.email, data.password);
                uid = authUser.uid;
                authProvider = "email";
            }
            var _activeUser_email;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userProfileService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveUserProfile"])(uid, {
                ...data,
                email: (_activeUser_email = activeUser === null || activeUser === void 0 ? void 0 : activeUser.email) !== null && _activeUser_email !== void 0 ? _activeUser_email : data.email
            }, authProvider);
            await refreshProfile();
            var _data_fullName_trim_split_;
            const name = (_data_fullName_trim_split_ = data.fullName.trim().split(/\s+/)[0]) !== null && _data_fullName_trim_split_ !== void 0 ? _data_fullName_trim_split_ : "Alex";
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthenticated"])(name);
            router.replace("/");
        } catch (err) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$authErrors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthErrorMessage"])(err));
        } finally{
            setSubmitting(false);
        }
    }
    const displayError = error !== null && error !== void 0 ? error : googleError;
    if (completeProfile && authLoading && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirebaseConfigured"]) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthShell"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 items-center justify-center px-5 py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted text-sm",
                    children: "Loading your account…"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/SignUpScreen.tsx",
                    lineNumber: 149,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SignUpScreen.tsx",
                lineNumber: 148,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/auth/SignUpScreen.tsx",
            lineNumber: 147,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthShell"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-2 pt-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: skipAccountStep ? "/login" : "/welcome",
                    className: "text-muted hover:text-ink mb-4 inline-flex items-center gap-1 text-sm font-medium",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "aria-hidden": true,
                            children: "‹"
                        }, void 0, false, {
                            fileName: "[project]/src/components/auth/SignUpScreen.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this),
                        " Back"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/auth/SignUpScreen.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "font-display text-ink text-2xl font-semibold",
                    children: skipAccountStep ? "Complete profile" : "Sign up"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/SignUpScreen.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this),
                skipAccountStep && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted mt-2 text-sm leading-relaxed",
                    children: "You're signed in. Finish your health profile to get started."
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/SignUpScreen.tsx",
                    lineNumber: 169,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 flex min-h-0 flex-1 flex-col",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$SignUpForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignUpForm"], {
                        profile: profileData,
                        onChange: updateProfile,
                        onSubmit: handleSignUp,
                        skipAccountStep: skipAccountStep,
                        onGoogleSignIn: skipAccountStep ? undefined : signInWithGoogleAccount,
                        googleButtonLabel: googleButtonLabel,
                        submitting: submitting || googleLoading,
                        errorMessage: displayError
                    }, void 0, false, {
                        fileName: "[project]/src/components/auth/SignUpScreen.tsx",
                        lineNumber: 175,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/SignUpScreen.tsx",
                    lineNumber: 174,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/SignUpScreen.tsx",
            lineNumber: 157,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/auth/SignUpScreen.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
_s(SignUpContent, "kwxdZUFS4KXZs/CTBp1hRkMU5fk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useGoogleAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGoogleAuth"]
    ];
});
_c = SignUpContent;
function SignUpScreen() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$AuthShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthShell"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 items-center justify-center py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted text-sm",
                    children: "Loading…"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/SignUpScreen.tsx",
                    lineNumber: 198,
                    columnNumber: 13
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/components/auth/SignUpScreen.tsx",
                lineNumber: 197,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/src/components/auth/SignUpScreen.tsx",
            lineNumber: 196,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SignUpContent, {}, void 0, false, {
            fileName: "[project]/src/components/auth/SignUpScreen.tsx",
            lineNumber: 203,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/auth/SignUpScreen.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
_c1 = SignUpScreen;
var _c, _c1;
__turbopack_context__.k.register(_c, "SignUpContent");
__turbopack_context__.k.register(_c1, "SignUpScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_d81d4512._.js.map