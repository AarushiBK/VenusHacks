module.exports = [
"[project]/src/lib/signalreplay.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONTINUITY_EVENTS",
    ()=>CONTINUITY_EVENTS,
    "CONTINUITY_INSIGHT",
    ()=>CONTINUITY_INSIGHT,
    "INTERPRETATION_ROWS",
    ()=>INTERPRETATION_ROWS,
    "SIGNAL_EVENTS",
    ()=>SIGNAL_EVENTS,
    "SYSTEM_VERDICTS",
    ()=>SYSTEM_VERDICTS
]);
const SIGNAL_EVENTS = [
    {
        id: "s1",
        day: 1,
        signal: "Fatigue",
        detail: "Postpartum day 1. Exhaustion noted.",
        urgentCare: {
            label: "Expected postpartum",
            level: "low"
        },
        thresholdAI: {
            label: "Within normal range",
            level: "low"
        },
        carechain: {
            label: "Noted — baseline established",
            level: "low"
        },
        carechainNote: "Establishing physiological context."
    },
    {
        id: "s2",
        day: 5,
        signal: "Mild dizziness",
        detail: "Reported during routine check. BP 124/80.",
        urgentCare: {
            label: "Monitor",
            level: "monitor"
        },
        thresholdAI: {
            label: "Monitor symptoms",
            level: "monitor"
        },
        carechain: {
            label: "Postpartum context weighted",
            level: "moderate"
        },
        carechainNote: "Dizziness in week 1 postpartum warrants tracking — not isolation."
    },
    {
        id: "s3",
        day: 8,
        signal: "Sleep disruption",
        detail: "Persistent insomnia, 3–4 hrs/night.",
        urgentCare: {
            label: "Unrelated — new mother",
            level: "ignored"
        },
        thresholdAI: {
            label: "Not flagged",
            level: "ignored"
        },
        carechain: {
            label: "Compounding factor",
            level: "elevated"
        },
        carechainNote: "Chronic sleep disruption elevates cardiovascular signal weight in postpartum window."
    },
    {
        id: "s4",
        day: 11,
        signal: "Elevated BP",
        detail: "138/90 recorded at home. Headache.",
        urgentCare: {
            label: "Borderline — recheck",
            level: "monitor"
        },
        thresholdAI: {
            label: "Moderate concern",
            level: "moderate"
        },
        carechain: {
            label: "Escalating trajectory",
            level: "escalating"
        },
        carechainNote: "Combined with fatigue, dizziness, sleep disruption in week 2 postpartum — pattern is forming."
    },
    {
        id: "s5",
        day: 14,
        signal: "Chest discomfort",
        detail: "Brief tightness. Dismissed as anxiety.",
        urgentCare: {
            label: "Low concern — likely anxiety",
            level: "low"
        },
        thresholdAI: {
            label: "Monitor symptoms",
            level: "monitor"
        },
        carechain: {
            label: "Pattern detected",
            level: "critical_context"
        },
        carechainNote: "5-signal escalation over 14 days. Postpartum cardiovascular interpretation trajectory warrants clinical attention."
    }
];
const INTERPRETATION_ROWS = [
    {
        id: "fatigue",
        signal: "Fatigue",
        urgentCare: {
            label: "Low",
            level: "low"
        },
        thresholdAI: {
            label: "Low",
            level: "low"
        },
        carechain: {
            label: "Moderate (postpartum ctx)",
            level: "moderate"
        }
    },
    {
        id: "hrv",
        signal: "HRV irregularity",
        urgentCare: {
            label: "Ignored",
            level: "ignored"
        },
        thresholdAI: {
            label: "Ignored",
            level: "ignored"
        },
        carechain: {
            label: "Elevated",
            level: "elevated"
        }
    },
    {
        id: "postpartum_week",
        signal: "Postpartum week 2",
        urgentCare: {
            label: "Not asked",
            level: "not_asked"
        },
        thresholdAI: {
            label: "Not factored",
            level: "ignored"
        },
        carechain: {
            label: "Critical context",
            level: "critical_context"
        }
    },
    {
        id: "sleep",
        signal: "Sleep disruption",
        urgentCare: {
            label: "Minimal",
            level: "low"
        },
        thresholdAI: {
            label: "Minimal",
            level: "low"
        },
        carechain: {
            label: "Compounding factor",
            level: "compounding"
        }
    },
    {
        id: "trajectory",
        signal: "Symptom trajectory",
        urgentCare: {
            label: "None modeled",
            level: "ignored"
        },
        thresholdAI: {
            label: "None modeled",
            level: "ignored"
        },
        carechain: {
            label: "Escalating",
            level: "escalating"
        }
    }
];
const SYSTEM_VERDICTS = {
    urgentCare: "Continue monitoring symptoms.",
    thresholdAI: "Monitor symptoms. Recheck BP in 72 hours.",
    carechain: "Interpretation mismatch detected. Contextual escalation pattern warrants cardiovascular follow-up."
};
const CONTINUITY_EVENTS = [
    {
        id: "c1",
        label: "OB discharge",
        provider: "OB",
        date: "Week 0",
        note: "BP 138/88. Hypertensive disorder noted.",
        status: "connected"
    },
    {
        id: "c2",
        label: "OB 2-week visit",
        provider: "OB",
        date: "Week 2",
        note: "BP 140/90. Referred to PCP.",
        status: "connected"
    },
    {
        id: "c3",
        label: "ER visit",
        provider: "ER",
        date: "Week 3",
        note: "Headache + dizziness. No obstetric history reviewed.",
        status: "gap"
    },
    {
        id: "c4",
        label: "PCP follow-up",
        provider: "PCP",
        date: "Week 6",
        note: "Appointment not attended. No outreach.",
        status: "missed"
    },
    {
        id: "c5",
        label: "Urgent care",
        provider: "Urgent Care",
        date: "Week 8",
        note: "Fatigue + BP 144/92. Postpartum history not flagged.",
        status: "gap"
    },
    {
        id: "c6",
        label: "Symptom recurrence",
        provider: "None",
        date: "Week 12",
        note: "Chest discomfort. No care contact made.",
        status: "unresolved"
    }
];
const CONTINUITY_INSIGHT = "Maternal cardiovascular harm is rarely one bad moment. It is a chain of disconnected moments that no single provider ever sees in full.";
}),
"[project]/src/components/carechain/MissedSignalReplay.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MissedSignalReplay",
    ()=>MissedSignalReplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signalreplay$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/signalreplay.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const LEVEL_STYLES = {
    ignored: "text-slate-muted cc-mono",
    not_asked: "text-slate-muted cc-mono",
    low: "text-slate-muted cc-mono",
    monitor: "text-warning cc-mono",
    moderate: "text-warning cc-mono font-semibold",
    elevated: "text-alert cc-mono font-semibold",
    compounding: "text-alert cc-mono font-semibold",
    escalating: "text-alert cc-mono font-semibold",
    critical_context: "text-alert cc-mono font-bold"
};
const CC_DOT = {
    ignored: "bg-slate-border",
    not_asked: "bg-slate-border",
    low: "bg-slate-muted",
    monitor: "bg-warning",
    moderate: "bg-warning",
    elevated: "bg-alert",
    compounding: "bg-alert",
    escalating: "bg-alert",
    critical_context: "bg-alert ring-2 ring-alert/30"
};
function MissedSignalReplay() {
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const showAll = revealed >= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signalreplay$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SIGNAL_EVENTS"].length;
    function advance() {
        if (revealed < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signalreplay$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SIGNAL_EVENTS"].length) setRevealed((n)=>n + 1);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "replay-heading",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-rose cc-mono text-xs tracking-[0.18em] uppercase",
                        children: "Demo · Missed Signal Replay"
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "replay-heading",
                        className: "font-display mt-2 text-2xl font-semibold text-white",
                        children: "If this had been connected earlier…"
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm leading-relaxed text-slate-muted",
                        children: "Each signal appeared individually low-risk. Watch how CARECHAIN weights them differently as postpartum context accumulates."
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signalreplay$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SIGNAL_EVENTS"].map((event, i)=>{
                    if (i >= revealed) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "cc-signal-row space-y-3 rounded-xl border border-slate-border bg-slate-mid p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "cc-mono text-xs text-slate-muted",
                                        children: [
                                            "Day ",
                                            event.day
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                        lineNumber: 67,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-sm font-semibold text-white",
                                        children: event.signal
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                        lineNumber: 68,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${CC_DOT[event.urgentCare.level]}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                                lineNumber: 72,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "cc-mono text-[10px] uppercase text-slate-muted",
                                                        children: "Urgent care"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: LEVEL_STYLES[event.urgentCare.level],
                                                        children: event.urgentCare.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                                lineNumber: 75,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                        lineNumber: 71,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${CC_DOT[event.thresholdAI.level]}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                                lineNumber: 85,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "cc-mono text-[10px] uppercase text-slate-muted",
                                                        children: "Threshold AI"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                                        lineNumber: 89,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: LEVEL_STYLES[event.thresholdAI.level],
                                                        children: event.thresholdAI.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                                lineNumber: 88,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                        lineNumber: 84,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "cc-diff-carechain rounded-lg px-2.5 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${CC_DOT[event.carechain.level]}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "cc-mono text-[10px] uppercase text-rose",
                                                                children: "CARECHAIN"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                                                lineNumber: 103,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: LEVEL_STYLES[event.carechain.level],
                                                                children: event.carechain.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                                                lineNumber: 104,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                                lineNumber: 98,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "cc-mono mt-1 text-[11px] leading-relaxed text-rose-deep/80",
                                                children: event.carechainNote
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                                lineNumber: 109,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                        lineNumber: 97,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                                lineNumber: 70,
                                columnNumber: 15
                            }, this)
                        ]
                    }, event.id, true, {
                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                        lineNumber: 62,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            !showAll ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: advance,
                className: "mt-4 rounded-full bg-rose-deep px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-deep/80",
                children: revealed === 0 ? "Start replay →" : `Day ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signalreplay$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SIGNAL_EVENTS"][revealed]?.day}: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signalreplay$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SIGNAL_EVENTS"][revealed]?.signal} →`
            }, void 0, false, {
                fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                lineNumber: 120,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cc-verdict mt-5 rounded-2xl border border-alert/30 bg-alert/10 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "cc-mono text-xs uppercase tracking-wide text-alert",
                        children: "CARECHAIN — pattern conclusion"
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-base leading-snug font-semibold text-white",
                        children: "These signals individually appeared low-risk. Together they formed an escalating postpartum cardiovascular interpretation trajectory."
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm leading-relaxed text-slate-muted",
                        children: "Threshold-based systems evaluated each signal in isolation. CARECHAIN modeled how interpretation should evolve as postpartum context accumulated."
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setRevealed(0),
                        className: "mt-4 text-xs text-slate-muted underline-offset-2 hover:underline",
                        children: "Reset replay"
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                        lineNumber: 142,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
                lineNumber: 130,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/carechain/MissedSignalReplay.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/carechain/PreventionCoachDemo.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PreventionCoachDemo",
    ()=>PreventionCoachDemo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const PROFILES = [
    {
        id: "week6",
        label: "Week 6 postpartum",
        context: "6 weeks after delivery. BP 138/88. Sleep: 3–4 hrs fragmented. HR elevated. Breastfeeding.",
        coaching: [
            {
                priority: "elevated",
                category: "Blood pressure",
                recommendation: "138/88 is outside the normal postpartum range. A follow-up reading within 72 hours is important. Do not wait for your 6-week appointment if headache or visual changes occur.",
                generic: "Reduce sodium. Drink water."
            },
            {
                priority: "moderate",
                category: "Sleep",
                recommendation: "Fragmented sleep at this stage is expected but compounds cardiovascular stress. Prioritize one consolidated 4-hour block where possible. Partner or support-person involvement here is clinically relevant.",
                generic: "Get more sleep."
            },
            {
                priority: "moderate",
                category: "Activity",
                recommendation: "Walking 10–15 min/day is appropriate and cardioprotective at this stage. Avoid high-intensity activity until 12-week clearance.",
                generic: "Exercise regularly."
            },
            {
                priority: "low",
                category: "Follow-up scheduling",
                recommendation: "Schedule a postpartum cardiovascular check at week 8–12 in addition to the standard OB follow-up. BP trend monitoring is clinically indicated given current readings.",
                generic: "See your doctor."
            }
        ]
    },
    {
        id: "month6",
        label: "6 months postpartum",
        context: "6 months after delivery. History: gestational hypertension. BP now 126/82. HR normalized. Sleep improving.",
        coaching: [
            {
                priority: "moderate",
                category: "Blood pressure",
                recommendation: "BP has improved but remains borderline. Given gestational hypertension history, annual cardiovascular monitoring is part of your long-term health profile and should continue beyond the postpartum window.",
                generic: "Keep monitoring your BP."
            },
            {
                priority: "low",
                category: "Activity",
                recommendation: "Full cardiovascular exercise is now appropriate. 150 min/week of moderate aerobic activity has strong evidence for reducing long-term hypertension risk in women with gestational hypertension history.",
                generic: "Exercise regularly."
            },
            {
                priority: "low",
                category: "Long-term risk awareness",
                recommendation: "Gestational hypertension increases lifetime cardiovascular risk. This is preserved in your cardiovascular passport so it can inform care decisions years from now. Annual BP review and lipid panel by age 40 are recommended as preventive infrastructure.",
                generic: "Eat healthy."
            },
            {
                priority: "low",
                category: "Mental health",
                recommendation: "Postpartum mental health affects cardiovascular stress pathways. A brief check-in for anxiety or mood patterns at 6 months is medically relevant.",
                generic: "Practice self-care."
            }
        ]
    }
];
const PRIORITY_BADGE = {
    elevated: {
        dot: "bg-alert",
        text: "text-alert"
    },
    moderate: {
        dot: "bg-warning",
        text: "text-warning"
    },
    low: {
        dot: "bg-sage",
        text: "text-slate-muted"
    }
};
function PreventionCoachDemo() {
    const [activeId, setActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("week6");
    const profile = PROFILES.find((p)=>p.id === activeId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "coach-heading",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-rose cc-mono text-xs tracking-[0.18em] uppercase",
                        children: "Demo · Prevention Coach"
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "coach-heading",
                        className: "font-display mt-2 text-2xl font-semibold text-white",
                        children: "Contextual coaching — not generic advice"
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 max-w-xl text-sm leading-relaxed text-slate-muted",
                        children: "The same patient at different points in her postpartum journey receives completely different guidance. Context drives everything."
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 inline-flex rounded-xl border border-slate-border bg-slate-mid p-1",
                role: "tablist",
                "aria-label": "Patient timeline",
                children: PROFILES.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        role: "tab",
                        "aria-selected": p.id === activeId,
                        onClick: ()=>setActiveId(p.id),
                        className: `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${p.id === activeId ? "bg-rose-deep text-white shadow" : "text-white/50 hover:text-white"}`,
                        children: p.label
                    }, p.id, false, {
                        fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 rounded-xl border border-slate-border/60 bg-slate-mid/60 px-4 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "cc-mono text-[10px] uppercase text-slate-muted",
                        children: "Patient context"
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-white/80",
                        children: profile.context
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: profile.coaching.map((item)=>{
                    const badge = PRIORITY_BADGE[item.priority];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-slate-border bg-slate-mid p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `h-2 w-2 shrink-0 rounded-full ${badge.dot}`,
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                                        lineNumber: 154,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "cc-mono text-[10px] uppercase text-slate-muted",
                                        children: item.category
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                                lineNumber: 153,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border border-slate-border/60 bg-slate/40 px-3 py-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "cc-mono text-[10px] uppercase text-slate-muted",
                                                children: "Generic advice"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                                                lineNumber: 166,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm text-white/40 italic",
                                                children: [
                                                    "“",
                                                    item.generic,
                                                    "”"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                                                lineNumber: 169,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                                        lineNumber: 165,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border border-rose-deep/25 bg-rose-deep/8 px-3 py-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "cc-mono text-[10px] uppercase text-rose",
                                                children: "CARECHAIN"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                                                lineNumber: 174,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm leading-relaxed text-white/85",
                                                children: item.recommendation
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                                                lineNumber: 177,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                                        lineNumber: 173,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                                lineNumber: 164,
                                columnNumber: 15
                            }, this)
                        ]
                    }, item.category, true, {
                        fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                        lineNumber: 149,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "cc-mono mt-5 text-[11px] text-slate-muted/60",
                children: "Coaching is contextual guidance — not clinical diagnosis or prescription."
            }, void 0, false, {
                fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/carechain/PreventionCoachDemo.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/carechain/TrajectoryDemo.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrajectoryDemo",
    ()=>TrajectoryDemo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const RISK_FACTORS = [
    {
        id: "gesthtn",
        label: "Gestational hypertension",
        weight: 3,
        note: "strongly elevates long-term hypertension and stroke risk"
    },
    {
        id: "preeclampsia",
        label: "Preeclampsia",
        weight: 4,
        note: "significant marker for future cardiovascular events"
    },
    {
        id: "stress",
        label: "Chronic stress",
        weight: 2,
        note: "sustained cortisol elevation affects cardiac remodeling"
    },
    {
        id: "sleep",
        label: "Poor sleep quality",
        weight: 2,
        note: "HRV depression and metabolic disruption compound over time"
    },
    {
        id: "inactivity",
        label: "Inactivity",
        weight: 1,
        note: "modifiable factor with high intervention ROI"
    }
];
function getFraming(selected) {
    const total = RISK_FACTORS.filter((f)=>selected.has(f.id)).reduce((sum, f)=>sum + f.weight, 0);
    if (total === 0) {
        return {
            headline: "No risk factors selected.",
            detail: "Select the factors that apply to this patient to generate contextual monitoring framing.",
            priority: "low"
        };
    }
    if (total <= 2) {
        return {
            headline: "Routine postpartum cardiovascular monitoring is appropriate.",
            detail: "Selected factors suggest standard follow-up cadence. Annual BP check and lifestyle review recommended.",
            priority: "low"
        };
    }
    if (total <= 5) {
        return {
            headline: "This postpartum profile warrants structured cardiovascular follow-up.",
            detail: "The combination of selected factors elevates the monitoring priority beyond routine care. Semi-annual BP tracking and HRV trend review are recommended. Educational framing around long-term risk should be introduced now.",
            priority: "moderate"
        };
    }
    return {
        headline: "High-priority cardiovascular monitoring framing indicated by context.",
        detail: "This combination of factors — particularly hypertensive pregnancy conditions — reflects a profile where long-term cardiovascular risk warrants meaningful attention. Quarterly BP review, HRV baseline establishment, and proactive care continuity planning are reasonable considerations to raise with a clinician.",
        priority: "elevated"
    };
}
const PRIORITY_STYLES = {
    low: {
        container: "border-sage/30 bg-sage-light/50",
        label: "text-sage",
        badge: "bg-sage-light border-sage/30 text-sage",
        badgeText: "Low monitoring priority"
    },
    moderate: {
        container: "border-warning/30 bg-warning-bg/60",
        label: "text-warning",
        badge: "bg-warning-bg border-warning/30 text-warning",
        badgeText: "Moderate monitoring priority"
    },
    elevated: {
        container: "border-alert/30 bg-alert-bg/60",
        label: "text-alert",
        badge: "bg-alert-bg border-alert/30 text-alert",
        badgeText: "Elevated monitoring priority"
    }
};
function TrajectoryDemo() {
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    function toggle(id) {
        setSelected((prev)=>{
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }
    const framing = getFraming(selected);
    const styles = PRIORITY_STYLES[framing.priority];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "trajectory-heading",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-rose cc-mono text-xs tracking-[0.18em] uppercase",
                        children: "Demo · Trajectory Engine"
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "trajectory-heading",
                        className: "font-display mt-2 text-2xl font-semibold text-white",
                        children: "Contextual monitoring framing"
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 max-w-xl text-sm leading-relaxed text-slate-muted",
                        children: "Select the factors present in this patient's history. Watch how CARECHAIN reframes monitoring priority — not as a diagnosis, but as an educational context model."
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex flex-col gap-2",
                children: RISK_FACTORS.map((factor)=>{
                    const on = selected.has(factor.id);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>toggle(factor.id),
                        "aria-pressed": on,
                        className: `flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${on ? "border-rose-deep/50 bg-rose-deep/10" : "border-slate-border bg-slate-mid hover:border-rose-deep/30"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] font-bold transition-colors ${on ? "border-rose-deep bg-rose-deep text-white" : "border-slate-border bg-transparent text-transparent"}`,
                                "aria-hidden": true,
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                                lineNumber: 157,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-sm font-medium ${on ? "text-white" : "text-white/70"}`,
                                        children: factor.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                                        lineNumber: 168,
                                        columnNumber: 17
                                    }, this),
                                    on && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "cc-mono mt-0.5 text-[11px] text-slate-muted",
                                        children: factor.note
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                                        lineNumber: 174,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                                lineNumber: 167,
                                columnNumber: 15
                            }, this)
                        ]
                    }, factor.id, true, {
                        fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                        lineNumber: 147,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `rounded-2xl border p-5 transition-all ${styles.container}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "cc-mono text-[10px] uppercase text-slate-muted",
                                children: "CARECHAIN framing"
                            }, void 0, false, {
                                fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${styles.badge}`,
                                children: styles.badgeText
                            }, void 0, false, {
                                fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-base font-semibold leading-snug ${styles.label}`,
                        children: framing.headline
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm leading-relaxed text-slate-muted",
                        children: framing.detail
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "cc-mono mt-4 text-[11px] text-slate-muted/60",
                        children: "Not prediction — education and preventative modeling only."
                    }, void 0, false, {
                        fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/carechain/TrajectoryDemo.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/BottomNav.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BottomNav",
    ()=>BottomNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const SIDE_TABS = [
    {
        id: "carechain",
        href: "/carechain",
        label: "Carechain",
        icon: (active)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                className: "h-5 w-5",
                "aria-hidden": true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M3 12h3.5l2-5 3 10 2.5-6 1.8 3.5H21",
                    stroke: "currentColor",
                    strokeWidth: active ? 2 : 1.6,
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/BottomNav.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/layout/BottomNav.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: "motherboard",
        href: "/motherboard",
        label: "Passport",
        icon: (active)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                className: "h-5 w-5",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "4",
                        y: "3.5",
                        width: "16",
                        height: "17",
                        rx: "2",
                        stroke: "currentColor",
                        strokeWidth: active ? 2 : 1.6
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/BottomNav.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M8 8h8M8 12h8M8 16h5",
                        stroke: "currentColor",
                        strokeWidth: 1.5,
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/BottomNav.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/BottomNav.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: "health",
        href: "/health",
        label: "Health",
        icon: (active)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                className: "h-5 w-5",
                "aria-hidden": true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M12 20s-7-4.5-7-10a4 4 0 017-2.65A4 4 0 0119 10c0 5.5-7 10-7 10z",
                    stroke: "currentColor",
                    strokeWidth: active ? 2 : 1.6,
                    strokeLinejoin: "round"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/BottomNav.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/layout/BottomNav.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: "metrics",
        href: "/metrics",
        label: "Metrics",
        icon: (active)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                className: "h-5 w-5",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M4 19V5M4 19h16",
                        stroke: "currentColor",
                        strokeWidth: active ? 2 : 1.6,
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/BottomNav.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M8 15v-3M12 15V9M16 15v-6",
                        stroke: "currentColor",
                        strokeWidth: active ? 2.4 : 1.8,
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/BottomNav.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/BottomNav.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    }
];
function HomeIcon({ active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        className: "h-6 w-6",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4.5 11.5 12 5l7.5 6.5V19a1.25 1.25 0 01-1.25 1.25H15v-5.5H9v5.5H5.75A1.25 1.25 0 014.5 19v-7.5z",
            stroke: "currentColor",
            strokeWidth: active ? 2 : 1.7,
            strokeLinejoin: "round",
            fill: active ? "currentColor" : "none",
            fillOpacity: active ? 0.15 : 0
        }, void 0, false, {
            fileName: "[project]/src/components/layout/BottomNav.tsx",
            lineNumber: 103,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/BottomNav.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
function SideNavTab({ tab, isActive }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: tab.href,
        "aria-current": isActive ? "page" : undefined,
        className: `flex min-w-0 flex-1 flex-col items-center justify-end gap-1 pb-0.5 transition-colors ${isActive ? "text-rose-deep" : "text-muted"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${isActive ? "border-rose/40 bg-blush/60" : "border-blush/80 bg-white"}`,
                children: tab.icon(isActive)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/BottomNav.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-[10px] leading-none font-medium tracking-wide ${isActive ? "font-semibold" : ""}`,
                children: tab.label
            }, void 0, false, {
                fileName: "[project]/src/components/layout/BottomNav.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/BottomNav.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
function HomeNavTab({ isActive }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [expanding, setExpanding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    function handleClick() {
        if (isActive) return;
        setExpanding(true);
        window.setTimeout(()=>{
            router.push("/");
            setExpanding(false);
        }, 220);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: handleClick,
        "aria-current": isActive ? "page" : undefined,
        className: `flex min-w-0 flex-1 flex-col items-center justify-end gap-0.5 pb-0.5 transition-colors ${isActive ? "text-rose-deep" : "text-muted"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `flex items-center justify-center rounded-full border-2 shadow-md transition-all duration-200 ease-out ${isActive ? "border-rose-deep bg-rose-deep text-white shadow-rose/25" : "border-blush bg-white text-muted shadow-rose/10"} h-14 w-14 -mt-4 ${expanding ? "nav-home-expand" : "scale-100"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeIcon, {
                    active: isActive
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/BottomNav.tsx",
                    lineNumber: 179,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/BottomNav.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-[10px] leading-none font-medium tracking-wide ${isActive ? "font-semibold" : ""}`,
                children: "Home"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/BottomNav.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/BottomNav.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
function BottomNav({ active }) {
    const left = SIDE_TABS.slice(0, 2);
    const right = SIDE_TABS.slice(2);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        "aria-label": "Main navigation",
        className: "phone-fixed-layer fixed bottom-0 z-40 border-t border-blush/60 bg-white/95 backdrop-blur-md",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex w-full items-end justify-between gap-1 px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]",
            children: [
                left.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SideNavTab, {
                        tab: tab,
                        isActive: active === tab.id
                    }, tab.id, false, {
                        fileName: "[project]/src/components/layout/BottomNav.tsx",
                        lineNumber: 203,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeNavTab, {
                    isActive: active === "platform"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/BottomNav.tsx",
                    lineNumber: 205,
                    columnNumber: 9
                }, this),
                right.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SideNavTab, {
                        tab: tab,
                        isActive: active === tab.id
                    }, tab.id, false, {
                        fileName: "[project]/src/components/layout/BottomNav.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/BottomNav.tsx",
            lineNumber: 201,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/BottomNav.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_7b849700._.js.map