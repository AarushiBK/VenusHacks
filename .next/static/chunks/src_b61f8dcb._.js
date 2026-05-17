(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/layout/BottomNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BottomNav",
    ()=>BottomNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const SIDE_TABS = [
    {
        id: "carechain",
        href: "/carechain",
        label: "Carechain",
        icon: (active)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                className: "h-5 w-5",
                "aria-hidden": true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
        icon: (active)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                className: "h-5 w-5",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
        icon: (active)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                className: "h-5 w-5",
                "aria-hidden": true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
        icon: (active)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                className: "h-5 w-5",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M4 19V5M4 19h16",
                        stroke: "currentColor",
                        strokeWidth: active ? 2 : 1.6,
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/BottomNav.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
function HomeIcon(param) {
    let { active } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        className: "h-6 w-6",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
_c = HomeIcon;
function SideNavTab(param) {
    let { tab, isActive } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: tab.href,
        "aria-current": isActive ? "page" : undefined,
        className: "flex min-w-0 flex-1 flex-col items-center justify-end gap-1 pb-0.5 transition-colors ".concat(isActive ? "text-rose-deep" : "text-muted"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex h-11 w-11 items-center justify-center rounded-full border transition-colors ".concat(isActive ? "border-rose/40 bg-blush/60" : "border-blush/80 bg-white"),
                children: tab.icon(isActive)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/BottomNav.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] leading-none font-medium tracking-wide ".concat(isActive ? "font-semibold" : ""),
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
_c1 = SideNavTab;
function HomeNavTab(param) {
    let { isActive } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [expanding, setExpanding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    function handleClick() {
        if (isActive) return;
        setExpanding(true);
        window.setTimeout(()=>{
            router.push("/");
            setExpanding(false);
        }, 220);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: handleClick,
        "aria-current": isActive ? "page" : undefined,
        className: "flex min-w-0 flex-1 flex-col items-center justify-end gap-0.5 pb-0.5 transition-colors ".concat(isActive ? "text-rose-deep" : "text-muted"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center justify-center rounded-full border-2 shadow-md transition-all duration-200 ease-out ".concat(isActive ? "border-rose-deep bg-rose-deep text-white shadow-rose/25" : "border-blush bg-white text-muted shadow-rose/10", " h-14 w-14 -mt-4 ").concat(expanding ? "nav-home-expand" : "scale-100"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeIcon, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] leading-none font-medium tracking-wide ".concat(isActive ? "font-semibold" : ""),
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
_s(HomeNavTab, "4rpVvfyinGFGqSBvgTkCgCTTYsc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c2 = HomeNavTab;
function BottomNav(param) {
    let { active } = param;
    const left = SIDE_TABS.slice(0, 2);
    const right = SIDE_TABS.slice(2);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        "aria-label": "Main navigation",
        className: "phone-fixed-layer fixed bottom-0 z-40 border-t border-blush/60 bg-white/95 backdrop-blur-md",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex w-full items-end justify-between gap-1 px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]",
            children: [
                left.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SideNavTab, {
                        tab: tab,
                        isActive: active === tab.id
                    }, tab.id, false, {
                        fileName: "[project]/src/components/layout/BottomNav.tsx",
                        lineNumber: 203,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeNavTab, {
                    isActive: active === "platform"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/BottomNav.tsx",
                    lineNumber: 205,
                    columnNumber: 9
                }, this),
                right.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SideNavTab, {
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
_c3 = BottomNav;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "HomeIcon");
__turbopack_context__.k.register(_c1, "SideNavTab");
__turbopack_context__.k.register(_c2, "HomeNavTab");
__turbopack_context__.k.register(_c3, "BottomNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/vitals.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatRecordedAt",
    ()=>formatRecordedAt,
    "mockPatient",
    ()=>mockPatient,
    "mockVitals",
    ()=>mockVitals
]);
const mockPatient = {
    name: "Alex",
    phase: "pregnant",
    detail: "Week 28 · 3rd trimester"
};
const mockVitals = [
    {
        id: "bp-1",
        kind: "blood_pressure",
        label: "Blood pressure",
        unit: "mmHg",
        value: "118",
        secondaryValue: "76",
        recordedAt: "2026-05-16T08:42:00",
        status: "normal",
        statusLabel: "Within range",
        trend: "stable",
        note: "Pregnancy target: below 140/90"
    },
    {
        id: "hr-1",
        kind: "heart_rate",
        label: "Heart rate",
        unit: "bpm",
        value: "82",
        recordedAt: "2026-05-16T08:42:00",
        status: "normal",
        statusLabel: "Resting",
        trend: "down",
        note: "Typical pregnancy range: 70–90 bpm"
    },
    {
        id: "spo2-1",
        kind: "oxygen",
        label: "Blood oxygen",
        unit: "%",
        value: "98",
        recordedAt: "2026-05-16T08:42:00",
        status: "normal",
        statusLabel: "Healthy",
        trend: "stable"
    },
    {
        id: "wt-1",
        kind: "weight",
        label: "Weight",
        unit: "lbs",
        value: "162",
        recordedAt: "2026-05-16T07:15:00",
        status: "normal",
        statusLabel: "On track",
        trend: "up",
        note: "+12 lbs since pre-pregnancy baseline"
    },
    {
        id: "temp-1",
        kind: "temperature",
        label: "Temperature",
        unit: "°F",
        value: "98.4",
        recordedAt: "2026-05-16T07:15:00",
        status: "normal",
        statusLabel: "Normal",
        trend: "stable"
    }
];
function formatRecordedAt(iso) {
    const date = new Date(iso);
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/metrics.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "metricsSnapshot",
    ()=>metricsSnapshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/vitals.ts [app-client] (ecmascript)");
;
function statusToSeverity(status) {
    if (status === "high") return 2;
    if (status === "elevated") return 1;
    return 0;
}
function deriveAlert(vitals) {
    const maxSeverity = Math.max(...vitals.map((v)=>statusToSeverity(v.status)));
    if (maxSeverity >= 2) {
        return {
            alertLevel: "critical",
            alertTitle: "Attention needed",
            alertMessage: "One or more readings are outside safe range. Contact your care team if you have headache, vision changes, or sudden swelling."
        };
    }
    if (maxSeverity >= 1) {
        return {
            alertLevel: "caution",
            alertTitle: "Worth watching",
            alertMessage: "A reading is slightly elevated. Rest, hydrate, and recheck in 30 minutes. Reach out if it persists."
        };
    }
    return {
        alertLevel: "none",
        alertTitle: "Looking steady",
        alertMessage: "All current readings are within your expected range."
    };
}
const metricsSnapshot = (()=>{
    const heartRate = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockVitals"].find((v)=>v.kind === "heart_rate");
    const oxygen = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockVitals"].find((v)=>v.kind === "oxygen");
    const bloodPressure = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockVitals"].find((v)=>v.kind === "blood_pressure"),
        value: "138",
        secondaryValue: "88",
        status: "elevated",
        statusLabel: "Slightly elevated",
        recordedAt: new Date().toISOString(),
        note: "Above ideal pregnancy target of 140/90 — monitor closely"
    };
    const coreVitals = [
        bloodPressure,
        heartRate,
        oxygen
    ];
    const alert = deriveAlert(coreVitals);
    return {
        updatedAt: new Date().toISOString(),
        updatedLabel: "Updated just now",
        heartRate,
        bloodPressure,
        oxygen,
        ...alert
    };
})();
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/profileStorage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_ACCOUNT_EMAIL",
    ()=>DEFAULT_ACCOUNT_EMAIL,
    "DEFAULT_EMERGENCY_CONTACTS",
    ()=>DEFAULT_EMERGENCY_CONTACTS,
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
"[project]/src/lib/profile.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACCOUNT_SETTINGS",
    ()=>ACCOUNT_SETTINGS,
    "REPORT_OPTIONS",
    ()=>REPORT_OPTIONS,
    "getAvgMetrics",
    ()=>getAvgMetrics,
    "getProfileAwarenessItems",
    ()=>getProfileAwarenessItems,
    "getProfileHealthSummary",
    ()=>getProfileHealthSummary,
    "profileUser",
    ()=>profileUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/vitals.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metrics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/metrics.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/profileStorage.ts [app-client] (ecmascript)");
;
;
const profileUser = {
    name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockPatient"].name,
    detail: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockPatient"].detail,
    initials: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockPatient"].name.slice(0, 1).toUpperCase()
};
function bpDisplay() {
    const bp = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockVitals"].find((v)=>v.kind === "blood_pressure");
    var _bp_value;
    if (!(bp === null || bp === void 0 ? void 0 : bp.secondaryValue)) return (_bp_value = bp === null || bp === void 0 ? void 0 : bp.value) !== null && _bp_value !== void 0 ? _bp_value : "—";
    return "".concat(bp.value, "/").concat(bp.secondaryValue);
}
function getAvgMetrics() {
    const hr = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockVitals"].find((v)=>v.kind === "heart_rate");
    const spo2 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockVitals"].find((v)=>v.kind === "oxygen");
    const weight = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockVitals"].find((v)=>v.kind === "weight");
    var _hr_value, _spo2_value, _weight_value;
    return [
        {
            id: "bp",
            label: "Blood pressure",
            value: bpDisplay(),
            unit: "mmHg avg",
            accent: "rose"
        },
        {
            id: "hr",
            label: "Heart rate",
            value: (_hr_value = hr === null || hr === void 0 ? void 0 : hr.value) !== null && _hr_value !== void 0 ? _hr_value : "—",
            unit: "bpm avg",
            accent: "sage"
        },
        {
            id: "spo2",
            label: "Blood oxygen",
            value: (_spo2_value = spo2 === null || spo2 === void 0 ? void 0 : spo2.value) !== null && _spo2_value !== void 0 ? _spo2_value : "—",
            unit: "% avg",
            accent: "amber"
        },
        {
            id: "weight",
            label: "Weight",
            value: (_weight_value = weight === null || weight === void 0 ? void 0 : weight.value) !== null && _weight_value !== void 0 ? _weight_value : "—",
            unit: "lbs avg",
            accent: "amber"
        }
    ];
}
;
;
const ACCOUNT_SETTINGS = {
    email: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_ACCOUNT_EMAIL"]
};
const REPORT_OPTIONS = [
    {
        id: "bp",
        label: "Blood pressure readings",
        group: "data"
    },
    {
        id: "hr",
        label: "Heart rate & HRV",
        group: "data"
    },
    {
        id: "spo2",
        label: "Blood oxygen",
        group: "data"
    },
    {
        id: "weight",
        label: "Weight trend",
        group: "data"
    },
    {
        id: "headache",
        label: "Headache",
        group: "symptoms"
    },
    {
        id: "swelling",
        label: "Swelling",
        group: "symptoms"
    },
    {
        id: "vision",
        label: "Vision changes",
        group: "symptoms"
    },
    {
        id: "fatigue",
        label: "Fatigue",
        group: "symptoms"
    }
];
function getProfileHealthSummary() {
    const snapshot = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metrics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["metricsSnapshot"];
    return [
        "".concat(snapshot.bloodPressure.label, ": ").concat(snapshot.bloodPressure.value, "/").concat(snapshot.bloodPressure.secondaryValue, " ").concat(snapshot.bloodPressure.unit),
        "".concat(snapshot.heartRate.label, ": ").concat(snapshot.heartRate.value, " ").concat(snapshot.heartRate.unit),
        "".concat(snapshot.oxygen.label, ": ").concat(snapshot.oxygen.value).concat(snapshot.oxygen.unit)
    ];
}
function getProfileAwarenessItems() {
    const snapshot = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metrics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["metricsSnapshot"];
    if (snapshot.alertLevel === "critical") {
        return [
            snapshot.alertMessage
        ];
    }
    const elevated = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockVitals"].filter((v)=>v.status === "elevated" || v.status === "high");
    if (elevated.length > 0) {
        return elevated.map((v)=>"".concat(v.label.toLowerCase(), " — ").concat(v.statusLabel));
    }
    return [
        "No urgent patterns in today's vitals.",
        "Continue daily BP checks; log symptoms if headache or vision changes appear."
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/metricHistory.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "METRIC_TIMEFRAMES",
    ()=>METRIC_TIMEFRAMES,
    "getDailyPointsForMonth",
    ()=>getDailyPointsForMonth,
    "getMetricHistory",
    ()=>getMetricHistory,
    "isMetricId",
    ()=>isMetricId,
    "toDateISO",
    ()=>toDateISO,
    "toMonthKey",
    ()=>toMonthKey,
    "usesCalendarView",
    ()=>usesCalendarView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/vitals.ts [app-client] (ecmascript)");
;
function usesCalendarView(timeframe) {
    return timeframe !== "D";
}
const METRIC_META = {
    bp: {
        label: "Blood pressure",
        unit: "mmHg",
        accent: "rose",
        base: 118,
        spread: 12
    },
    hr: {
        label: "Heart rate",
        unit: "bpm",
        accent: "sage",
        base: 82,
        spread: 10
    },
    spo2: {
        label: "Blood oxygen",
        unit: "%",
        accent: "amber",
        base: 98,
        spread: 2
    },
    weight: {
        label: "Weight",
        unit: "lbs",
        accent: "amber",
        base: 162,
        spread: 4
    }
};
function seededNoise(index, spread) {
    const wave = Math.sin(index * 1.7) * spread * 0.45;
    const bump = index % 3 * (spread * 0.12);
    return Math.round(wave + bump);
}
function formatBp(systolic) {
    const diastolic = Math.max(60, Math.round(systolic * 0.62));
    return {
        value: "".concat(systolic, "/").concat(diastolic),
        numeric: systolic
    };
}
function formatValue(id, n) {
    if (id === "bp") return formatBp(n);
    if (id === "spo2") return {
        value: String(Math.min(100, Math.max(92, n))),
        numeric: n
    };
    return {
        value: String(n),
        numeric: n
    };
}
function countForTimeframe(tf) {
    switch(tf){
        case "D":
            return 1;
        case "W":
            return 7;
        case "M":
            return 30;
        case "6M":
            return 6;
        case "Y":
            return 12;
    }
}
function labelForPoint(tf, date, index, total) {
    if (tf === "D") {
        return {
            label: date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric"
            }),
            sublabel: date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit"
            })
        };
    }
    if (tf === "W") {
        return {
            label: date.toLocaleDateString("en-US", {
                weekday: "short"
            }),
            sublabel: date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
            })
        };
    }
    if (tf === "M") {
        return {
            label: date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
            }),
            sublabel: index === total - 1 ? "Today" : date.toLocaleDateString("en-US", {
                weekday: "short"
            })
        };
    }
    if (tf === "6M") {
        return {
            label: date.toLocaleDateString("en-US", {
                month: "short"
            }),
            sublabel: date.toLocaleDateString("en-US", {
                year: "numeric"
            })
        };
    }
    return {
        label: date.toLocaleDateString("en-US", {
            month: "long"
        }),
        sublabel: String(date.getFullYear())
    };
}
function stepDays(tf) {
    switch(tf){
        case "D":
            return 0;
        case "W":
            return 1;
        case "M":
            return 1;
        case "6M":
            return 30;
        case "Y":
            return 30;
    }
}
function getMetricHistory(metricId, timeframe) {
    const meta = METRIC_META[metricId];
    const vital = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockVitals"].find((v)=>{
        if (metricId === "bp") return v.kind === "blood_pressure";
        if (metricId === "hr") return v.kind === "heart_rate";
        if (metricId === "spo2") return v.kind === "oxygen";
        return v.kind === "weight";
    });
    var _vital_value, _vital_value1;
    const vitalBase = metricId === "bp" ? Number((_vital_value = vital === null || vital === void 0 ? void 0 : vital.value) !== null && _vital_value !== void 0 ? _vital_value : meta.base) : Number((_vital_value1 = vital === null || vital === void 0 ? void 0 : vital.value) !== null && _vital_value1 !== void 0 ? _vital_value1 : meta.base);
    const now = new Date();
    const points = [];
    if (timeframe === "M") {
        const year = now.getFullYear();
        const month = now.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for(let d = 1; d <= daysInMonth; d++){
            const date = new Date(year, month, d, 9, 0, 0, 0);
            const raw = vitalBase + seededNoise(d + month * 31, meta.spread);
            const formatted = formatValue(metricId, raw);
            const dateISO = toDateISO(date);
            points.push({
                id: "".concat(metricId, "-M-").concat(dateISO),
                date,
                dateISO,
                label: date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                }),
                sublabel: d === daysInMonth ? "Today" : date.toLocaleDateString("en-US", {
                    weekday: "short"
                }),
                value: formatted.value,
                numeric: formatted.numeric
            });
        }
    } else {
        const count = countForTimeframe(timeframe);
        const step = stepDays(timeframe);
        for(let i = 0; i < count; i++){
            const date = new Date(now);
            if (timeframe === "D") {
                date.setHours(8, 42, 0, 0);
            } else if (timeframe === "Y" || timeframe === "6M") {
                date.setMonth(now.getMonth() - (count - 1 - i));
                date.setDate(1);
                date.setHours(12, 0, 0, 0);
            } else {
                date.setDate(now.getDate() - (count - 1 - i) * step);
                date.setHours(9, 0, 0, 0);
            }
            const raw = vitalBase + seededNoise(i + count, meta.spread) + (i === count - 1 ? 0 : seededNoise(i, 3));
            const formatted = formatValue(metricId, raw);
            const { label, sublabel } = labelForPoint(timeframe, date, i, count);
            const dateISO = toDateISO(date);
            points.push({
                id: "".concat(metricId, "-").concat(timeframe, "-").concat(dateISO, "-").concat(i),
                date: new Date(date),
                dateISO,
                label,
                sublabel,
                value: formatted.value,
                numeric: formatted.numeric
            });
        }
    }
    const numerics = points.map((p)=>p.numeric);
    const avg = Math.round(numerics.reduce((a, b)=>a + b, 0) / numerics.length);
    const headlineFormatted = formatValue(metricId, avg);
    let headlineSub;
    if (metricId === "bp") {
        if (timeframe === "D") headlineSub = "Avg systolic · today";
        else if (timeframe === "M") headlineSub = "Avg systolic · this month";
        else if (timeframe === "6M") headlineSub = "Avg systolic · past 6 months";
        else headlineSub = "Avg systolic · last ".concat(timeframeLabel(timeframe));
    } else {
        headlineSub = timeframe === "D" ? "Latest reading" : timeframe === "M" ? "Average · this month" : timeframe === "6M" ? "Average · past 6 months" : "Average · ".concat(timeframeLabel(timeframe));
    }
    return {
        id: metricId,
        label: meta.label,
        unit: meta.unit,
        accent: meta.accent,
        timeframe,
        headline: headlineFormatted.value,
        headlineSub,
        points: timeframe === "D" ? points.slice(-1) : points
    };
}
function timeframeLabel(tf) {
    switch(tf){
        case "D":
            return "day";
        case "W":
            return "7 days";
        case "M":
            return "this month";
        case "6M":
            return "6 months";
        case "Y":
            return "year";
    }
}
const METRIC_TIMEFRAMES = [
    "D",
    "W",
    "M",
    "6M",
    "Y"
];
function isMetricId(id) {
    return id === "bp" || id === "hr" || id === "spo2" || id === "weight";
}
function toDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return "".concat(y, "-").concat(m, "-").concat(d);
}
function toMonthKey(date) {
    return "".concat(date.getFullYear(), "-").concat(String(date.getMonth() + 1).padStart(2, "0"));
}
function getDailyPointsForMonth(metricId, year, month) {
    const meta = METRIC_META[metricId];
    const vital = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockVitals"].find((v)=>{
        if (metricId === "bp") return v.kind === "blood_pressure";
        if (metricId === "hr") return v.kind === "heart_rate";
        if (metricId === "spo2") return v.kind === "oxygen";
        return v.kind === "weight";
    });
    var _vital_value, _vital_value1;
    const vitalBase = metricId === "bp" ? Number((_vital_value = vital === null || vital === void 0 ? void 0 : vital.value) !== null && _vital_value !== void 0 ? _vital_value : meta.base) : Number((_vital_value1 = vital === null || vital === void 0 ? void 0 : vital.value) !== null && _vital_value1 !== void 0 ? _vital_value1 : meta.base);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const points = [];
    for(let d = 1; d <= daysInMonth; d++){
        const date = new Date(year, month, d, 9, 0, 0, 0);
        const raw = vitalBase + seededNoise(d + month * 31, meta.spread);
        const formatted = formatValue(metricId, raw);
        const dateISO = toDateISO(date);
        points.push({
            id: "".concat(metricId, "-day-").concat(dateISO),
            date,
            dateISO,
            label: date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
            }),
            sublabel: date.toLocaleDateString("en-US", {
                weekday: "short"
            }),
            value: formatted.value,
            numeric: formatted.numeric
        });
    }
    return points;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/vitals/StatusBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatusBadge",
    ()=>StatusBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const styles = {
    normal: "bg-ok-bg text-ok",
    elevated: "bg-warning-bg text-warning",
    high: "bg-alert-bg text-alert"
};
function StatusBadge(param) {
    let { status, label, compact = false, className = "" } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex shrink-0 items-center rounded-full font-medium ".concat(styles[status], " ").concat(compact ? "px-2 py-0.5 text-[10px] leading-tight" : "px-2.5 py-0.5 text-xs", " ").concat(className),
        children: label
    }, void 0, false, {
        fileName: "[project]/src/components/vitals/StatusBadge.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = StatusBadge;
var _c;
__turbopack_context__.k.register(_c, "StatusBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/vitals/VitalIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VitalIcon",
    ()=>VitalIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const icons = {
    blood_pressure: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        className: "h-5 w-5",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 21s-6-4.35-6-9.5a4 4 0 0 1 7.2-2.4A4 4 0 0 1 18 11.5c0 5.15-6 9.5-6 9.5Z",
            stroke: "currentColor",
            strokeWidth: "1.75",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/components/vitals/VitalIcon.tsx",
            lineNumber: 6,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/vitals/VitalIcon.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)),
    heart_rate: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        className: "h-5 w-5",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3 12h4l2-7 4 14 2-7h6",
            stroke: "currentColor",
            strokeWidth: "1.75",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/components/vitals/VitalIcon.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/vitals/VitalIcon.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)),
    oxygen: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        className: "h-5 w-5",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "8",
                stroke: "currentColor",
                strokeWidth: "1.75"
            }, void 0, false, {
                fileName: "[project]/src/components/vitals/VitalIcon.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 12h8M12 8v8",
                stroke: "currentColor",
                strokeWidth: "1.75",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/vitals/VitalIcon.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/vitals/VitalIcon.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)),
    weight: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        className: "h-5 w-5",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 3v18M7 8l5-5 5 5",
            stroke: "currentColor",
            strokeWidth: "1.75",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/components/vitals/VitalIcon.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/vitals/VitalIcon.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)),
    temperature: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        className: "h-5 w-5",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M14 14.76V5.5a2 2 0 1 0-4 0v9.26a4 4 0 1 0 4 0Z",
            stroke: "currentColor",
            strokeWidth: "1.75",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/components/vitals/VitalIcon.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/vitals/VitalIcon.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0))
};
function VitalIcon(param) {
    let { kind } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-rose-deep",
        children: icons[kind]
    }, void 0, false, {
        fileName: "[project]/src/components/vitals/VitalIcon.tsx",
        lineNumber: 60,
        columnNumber: 10
    }, this);
}
_c = VitalIcon;
var _c;
__turbopack_context__.k.register(_c, "VitalIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/profile/AvgMetricGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AvgMetricGrid",
    ()=>AvgMetricGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metricHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/metricHistory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/vitals.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$vitals$2f$StatusBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/vitals/StatusBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$vitals$2f$VitalIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/vitals/VitalIcon.tsx [app-client] (ecmascript)");
;
;
;
;
;
const ACCENT_STYLES = {
    rose: {
        border: "border-rose/50",
        bg: "bg-white",
        value: "text-rose-deep"
    },
    sage: {
        border: "border-sage/45",
        bg: "bg-sage-light/40",
        value: "text-sage"
    },
    amber: {
        border: "border-warning/45",
        bg: "bg-warning-bg/50",
        value: "text-warning"
    }
};
const METRIC_VITAL_KIND = {
    bp: "blood_pressure",
    hr: "heart_rate",
    spo2: "oxygen",
    weight: "weight"
};
function vitalForMetric(metricId) {
    const kind = METRIC_VITAL_KIND[metricId];
    if (!kind) return undefined;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockVitals"].find((v)=>v.kind === kind);
}
function MetricTile(param) {
    let { metric, onSelect } = param;
    const style = ACCENT_STYLES[metric.accent];
    const canOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metricHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMetricId"])(metric.id);
    const vital = vitalForMetric(metric.id);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        disabled: !canOpen,
        onClick: ()=>canOpen && onSelect(metric.id),
        className: "flex min-h-[10.5rem] w-full flex-col gap-2.5 rounded-2xl border-2 p-3.5 text-left shadow-sm shadow-rose/5 transition-transform active:scale-[0.98] ".concat(style.border, " ").concat(style.bg, " ").concat(canOpen ? "cursor-pointer" : "cursor-default opacity-60"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-2",
                children: [
                    vital && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blush [&_svg]:h-4 [&_svg]:w-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$vitals$2f$VitalIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VitalIcon"], {
                            kind: vital.kind
                        }, void 0, false, {
                            fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-ink min-w-0 flex-1 text-xs leading-snug font-medium",
                        children: metric.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 flex-col justify-center py-0.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-display text-2xl font-semibold tabular-nums ".concat(style.value),
                        children: metric.value
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    metric.unit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted mt-0.5 text-[11px]",
                        children: metric.unit
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            vital && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-blush/50 mt-auto flex items-end justify-between gap-2 border-t pt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted min-w-0 flex-1 text-[10px] leading-snug",
                        children: [
                            "Last reading · ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRecordedAt"])(vital.recordedAt)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$vitals$2f$StatusBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                        status: vital.status,
                        label: vital.statusLabel,
                        compact: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c = MetricTile;
function AvgMetricGrid(param) {
    let { metrics, onSelectMetric } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-labelledby": "avg-metrics-heading",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex items-end justify-between gap-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    id: "avg-metrics-heading",
                    className: "text-muted text-xs font-semibold tracking-[0.14em] uppercase",
                    children: "Avg metrics"
                }, void 0, false, {
                    fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2.5",
                children: metrics.map((metric)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricTile, {
                        metric: metric,
                        onSelect: onSelectMetric
                    }, metric.id, false, {
                        fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/profile/AvgMetricGrid.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
_c1 = AvgMetricGrid;
var _c, _c1;
__turbopack_context__.k.register(_c, "MetricTile");
__turbopack_context__.k.register(_c1, "AvgMetricGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/icons/SettingsGearIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Standard app settings (cog) icon */ __turbopack_context__.s([
    "SettingsGearIcon",
    ()=>SettingsGearIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function SettingsGearIcon(param) {
    let { className = "h-5 w-5" } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        className: className,
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10.3 4.3a1.5 1.5 0 013.4 0l.2.6a1.5 1.5 0 001.9.9l.6-.2a1.5 1.5 0 012.1 2.1l-.2.6a1.5 1.5 0 00.9 1.9l.6.2a1.5 1.5 0 010 3l-.6.2a1.5 1.5 0 00-.9 1.9l.2.6a1.5 1.5 0 01-2.1 2.1l-.6-.2a1.5 1.5 0 00-1.9.9l-.2.6a1.5 1.5 0 01-3.4 0l-.2-.6a1.5 1.5 0 00-1.9-.9l-.6.2a1.5 1.5 0 01-2.1-2.1l.2-.6a1.5 1.5 0 00-.9-1.9l-.6-.2a1.5 1.5 0 010-3l.6-.2a1.5 1.5 0 00.9-1.9l-.2-.6a1.5 1.5 0 012.1-2.1l.6.2a1.5 1.5 0 001.9-.9l.2-.6z",
                stroke: "currentColor",
                strokeWidth: "1.6",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/icons/SettingsGearIcon.tsx",
                lineNumber: 5,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "2.25",
                stroke: "currentColor",
                strokeWidth: "1.6"
            }, void 0, false, {
                fileName: "[project]/src/components/icons/SettingsGearIcon.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/icons/SettingsGearIcon.tsx",
        lineNumber: 4,
        columnNumber: 5
    }, this);
}
_c = SettingsGearIcon;
var _c;
__turbopack_context__.k.register(_c, "SettingsGearIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/PageGreeting.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PAGE_GREETING_BOTTOM",
    ()=>PAGE_GREETING_BOTTOM,
    "PAGE_GREETING_TOP",
    ()=>PAGE_GREETING_TOP,
    "PageGreeting",
    ()=>PageGreeting
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$SettingsGearIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/SettingsGearIcon.tsx [app-client] (ecmascript)");
"use client";
;
;
const PAGE_GREETING_TOP = "pt-14";
const PAGE_GREETING_BOTTOM = "mb-8";
function PageGreeting(param) {
    let { name, detail, onOpenSettings } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "relative ".concat(PAGE_GREETING_TOP, " ").concat(PAGE_GREETING_BOTTOM),
        children: [
            onOpenSettings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onOpenSettings,
                className: "text-muted hover:text-ink absolute top-0 right-0 flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                "aria-label": "Open settings",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$SettingsGearIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SettingsGearIcon"], {}, void 0, false, {
                    fileName: "[project]/src/components/layout/PageGreeting.tsx",
                    lineNumber: 29,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/PageGreeting.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: onOpenSettings ? "pr-12" : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-display text-ink text-3xl font-semibold tracking-tight",
                        children: [
                            "Hi, ",
                            name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/PageGreeting.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    detail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted mt-1 text-base",
                        children: detail
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/PageGreeting.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/PageGreeting.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/PageGreeting.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = PageGreeting;
var _c;
__turbopack_context__.k.register(_c, "PageGreeting");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/profile/HomeHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HomeHeader",
    ()=>HomeHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$PageGreeting$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/PageGreeting.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/authSession.ts [app-client] (ecmascript)");
"use client";
;
;
;
function HomeHeader(param) {
    let { patient, onOpenSettings } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$PageGreeting$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageGreeting"], {
        name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDisplayName"])(),
        detail: patient.detail,
        onOpenSettings: onOpenSettings
    }, void 0, false, {
        fileName: "[project]/src/components/profile/HomeHeader.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = HomeHeader;
var _c;
__turbopack_context__.k.register(_c, "HomeHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/profile/MetricHistoryCalendar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetricHistoryCalendar",
    ()=>MetricHistoryCalendar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metricHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/metricHistory.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const WEEKDAYS = [
    "S",
    "M",
    "T",
    "W",
    "T",
    "F",
    "S"
];
function buildPointMap(points) {
    const map = new Map();
    for (const p of points)map.set(p.dateISO, p);
    return map;
}
function monthLabel(year, month) {
    return new Date(year, month, 1).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });
}
function MonthGrid(param) {
    let { year, month, pointMap, accent, selectedId, onSelect } = param;
    const first = new Date(year, month, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for(let i = 0; i < startPad; i++)cells.push({
        day: null
    });
    for(let d = 1; d <= daysInMonth; d++){
        cells.push({
            day: d,
            iso: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metricHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDateISO"])(new Date(year, month, d))
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted text-center text-xs font-medium",
                children: monthLabel(year, month)
            }, void 0, false, {
                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-7 gap-1",
                children: [
                    WEEKDAYS.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-muted text-center text-[9px] font-semibold",
                            children: d
                        }, "".concat(d, "-").concat(i), false, {
                            fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)),
                    cells.map((cell, idx)=>{
                        if (cell.day === null) {
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "aspect-square"
                            }, "empty-".concat(idx), false, {
                                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                                lineNumber: 75,
                                columnNumber: 20
                            }, this);
                        }
                        const point = cell.iso ? pointMap.get(cell.iso) : undefined;
                        const selected = (point === null || point === void 0 ? void 0 : point.id) === selectedId;
                        const hasData = Boolean(point);
                        var _cell_iso;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            disabled: !hasData,
                            onClick: ()=>point && onSelect(point),
                            className: "flex aspect-square flex-col items-center justify-center rounded-lg border text-center transition-all ".concat(selected ? accent.cellSelected : hasData ? "".concat(accent.cell, " hover:scale-[1.04]") : "border-transparent opacity-30", " text-[10px]"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-muted font-medium",
                                    children: cell.day
                                }, void 0, false, {
                                    fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this),
                                hasData && point && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-0.5 h-1.5 w-1.5 rounded-full ".concat(accent.dot),
                                            "aria-hidden": true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                                            lineNumber: 98,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-0.5 max-w-full truncate text-[8px] font-semibold leading-none ".concat(accent.value),
                                            children: point.value
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                                            lineNumber: 102,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, (_cell_iso = cell.iso) !== null && _cell_iso !== void 0 ? _cell_iso : idx, true, {
                            fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c = MonthGrid;
function WeekStrip(param) {
    let { points, accent, selectedId, onSelect } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-7 gap-1.5",
            children: [
                WEEKDAYS.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted text-center text-[10px] font-semibold",
                        children: d
                    }, "".concat(d, "-").concat(i), false, {
                        fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this)),
                points.map((point)=>{
                    const selected = point.id === selectedId;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onSelect(point),
                        className: "flex min-h-[3.25rem] flex-col items-center justify-center rounded-xl border py-2 transition-all ".concat(selected ? accent.cellSelected : "".concat(accent.cell, " hover:scale-[1.03]")),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted text-[10px] font-medium",
                                children: point.date.getDate()
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                                lineNumber: 150,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-1 text-[10px] font-semibold tabular-nums ".concat(accent.value),
                                children: point.value
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                                lineNumber: 153,
                                columnNumber: 15
                            }, this)
                        ]
                    }, point.id, true, {
                        fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                        lineNumber: 142,
                        columnNumber: 13
                    }, this);
                })
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
            lineNumber: 130,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_c1 = WeekStrip;
function SixMonthSummary(param) {
    let { points, accent, selectedId, onSelect } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted text-[10px] font-semibold tracking-[0.14em] uppercase",
                children: "Monthly breakdown"
            }, void 0, false, {
                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-2",
                children: points.map((point)=>{
                    const selected = selectedId === point.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onSelect(point),
                        className: "rounded-xl border px-2 py-3 text-center transition-all ".concat(selected ? accent.cellSelected : "".concat(accent.cell, " hover:scale-[1.02]")),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-ink text-xs font-semibold",
                                children: point.date.toLocaleDateString("en-US", {
                                    month: "short"
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                                lineNumber: 192,
                                columnNumber: 15
                            }, this),
                            point.sublabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted text-[10px]",
                                children: point.sublabel
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                                lineNumber: 196,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm font-semibold tabular-nums ".concat(accent.value),
                                children: point.value
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                                lineNumber: 198,
                                columnNumber: 15
                            }, this)
                        ]
                    }, point.id, true, {
                        fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                        lineNumber: 184,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
_c2 = SixMonthSummary;
function MonthPickerCalendar(param) {
    let { metricId, points, accent, selectedId, onSelect, columns = 3, hint } = param;
    _s();
    const [drill, setDrill] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const monthPoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MonthPickerCalendar.useMemo[monthPoints]": ()=>{
            if (!drill) return [];
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metricHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDailyPointsForMonth"])(metricId, drill.year, drill.month);
        }
    }["MonthPickerCalendar.useMemo[monthPoints]"], [
        metricId,
        drill
    ]);
    const monthMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MonthPickerCalendar.useMemo[monthMap]": ()=>buildPointMap(monthPoints)
    }["MonthPickerCalendar.useMemo[monthMap]"], [
        monthPoints
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted text-[10px] font-semibold tracking-[0.12em] uppercase",
                children: hint
            }, void 0, false, {
                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-2 ".concat(columns === 2 ? "grid-cols-2" : "grid-cols-3"),
                children: points.map((point)=>{
                    const y = point.date.getFullYear();
                    const m = point.date.getMonth();
                    const selected = selectedId === point.id || (drill === null || drill === void 0 ? void 0 : drill.year) === y && (drill === null || drill === void 0 ? void 0 : drill.month) === m;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            onSelect(point);
                            setDrill({
                                year: y,
                                month: m
                            });
                        },
                        className: "rounded-xl border px-2 py-3 text-center transition-all ".concat(selected ? accent.cellSelected : "".concat(accent.cell, " hover:scale-[1.02]")),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-ink text-xs font-semibold",
                                children: point.date.toLocaleDateString("en-US", {
                                    month: "short"
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                                lineNumber: 258,
                                columnNumber: 15
                            }, this),
                            point.sublabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted text-[10px]",
                                children: point.sublabel
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                                lineNumber: 262,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm font-semibold tabular-nums ".concat(accent.value),
                                children: point.value
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                                lineNumber: 264,
                                columnNumber: 15
                            }, this)
                        ]
                    }, point.id, true, {
                        fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                        lineNumber: 247,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            drill && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-blush/60 pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted mb-2 text-xs font-medium",
                        children: [
                            monthLabel(drill.year, drill.month),
                            " — daily readings"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                        lineNumber: 273,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MonthGrid, {
                        year: drill.year,
                        month: drill.month,
                        pointMap: monthMap,
                        accent: accent,
                        selectedId: selectedId,
                        onSelect: onSelect
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                        lineNumber: 276,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
                lineNumber: 272,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
        lineNumber: 236,
        columnNumber: 5
    }, this);
}
_s(MonthPickerCalendar, "j6y0G95Zkludkd+mqNAoPyMa/IE=");
_c3 = MonthPickerCalendar;
function MetricHistoryCalendar(param) {
    let { metricId, timeframe, points, accent, selectedId, onSelect } = param;
    _s1();
    const pointMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MetricHistoryCalendar.useMemo[pointMap]": ()=>buildPointMap(points)
    }["MetricHistoryCalendar.useMemo[pointMap]"], [
        points
    ]);
    if (timeframe === "W") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WeekStrip, {
            points: points,
            accent: accent,
            selectedId: selectedId,
            onSelect: onSelect
        }, void 0, false, {
            fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
            lineNumber: 309,
            columnNumber: 7
        }, this);
    }
    if (timeframe === "M") {
        var _points_;
        var _points__date;
        const anchor = (_points__date = (_points_ = points[0]) === null || _points_ === void 0 ? void 0 : _points_.date) !== null && _points__date !== void 0 ? _points__date : new Date();
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MonthGrid, {
            year: anchor.getFullYear(),
            month: anchor.getMonth(),
            pointMap: pointMap,
            accent: accent,
            selectedId: selectedId,
            onSelect: onSelect
        }, void 0, false, {
            fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
            lineNumber: 321,
            columnNumber: 7
        }, this);
    }
    if (timeframe === "6M") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SixMonthSummary, {
            points: points,
            accent: accent,
            selectedId: selectedId,
            onSelect: onSelect
        }, void 0, false, {
            fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
            lineNumber: 334,
            columnNumber: 7
        }, this);
    }
    if (timeframe === "Y") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MonthPickerCalendar, {
            metricId: metricId,
            points: points,
            accent: accent,
            selectedId: selectedId,
            onSelect: onSelect,
            columns: 3,
            hint: "Past 12 months · tap a month for daily readings"
        }, void 0, false, {
            fileName: "[project]/src/components/profile/MetricHistoryCalendar.tsx",
            lineNumber: 345,
            columnNumber: 7
        }, this);
    }
    return null;
}
_s1(MetricHistoryCalendar, "OzLPV9kP5mi2m9u0cXqOy/EgvEA=");
_c4 = MetricHistoryCalendar;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "MonthGrid");
__turbopack_context__.k.register(_c1, "WeekStrip");
__turbopack_context__.k.register(_c2, "SixMonthSummary");
__turbopack_context__.k.register(_c3, "MonthPickerCalendar");
__turbopack_context__.k.register(_c4, "MetricHistoryCalendar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/profile/MetricDetailView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MetricDetailView",
    ()=>MetricDetailView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metricHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/metricHistory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$MetricHistoryCalendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/profile/MetricHistoryCalendar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const ACCENT = {
    rose: {
        border: "border-rose/55",
        tab: "bg-rose-deep text-white",
        value: "text-rose-deep",
        calendar: {
            cell: "border-rose/30 bg-rose/5",
            cellSelected: "border-rose-deep bg-rose/15 ring-2 ring-rose/25",
            dot: "bg-rose-deep",
            value: "text-rose-deep"
        }
    },
    sage: {
        border: "border-sage/50",
        tab: "bg-sage text-white",
        value: "text-sage",
        calendar: {
            cell: "border-sage/35 bg-sage-light/50",
            cellSelected: "border-sage bg-sage-light ring-2 ring-sage/25",
            dot: "bg-sage",
            value: "text-sage"
        }
    },
    amber: {
        border: "border-warning/50",
        tab: "bg-warning text-white",
        value: "text-warning",
        calendar: {
            cell: "border-warning/35 bg-warning-bg/60",
            cellSelected: "border-warning bg-warning-bg ring-2 ring-warning/30",
            dot: "bg-warning",
            value: "text-warning"
        }
    }
};
const TF_LABELS = {
    D: "D",
    W: "W",
    M: "M",
    "6M": "6M",
    Y: "Y"
};
function MetricDetailView(param) {
    let { metricId, onBack } = param;
    _s();
    const [timeframe, setTimeframe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("W");
    const [selectedPoint, setSelectedPoint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const detail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MetricDetailView.useMemo[detail]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metricHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMetricHistory"])(metricId, timeframe)
    }["MetricDetailView.useMemo[detail]"], [
        metricId,
        timeframe
    ]);
    const style = ACCENT[detail.accent];
    const showCalendar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metricHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usesCalendarView"])(timeframe);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MetricDetailView.useEffect": ()=>{
            setSelectedPoint(null);
        }
    }["MetricDetailView.useEffect"], [
        timeframe,
        metricId
    ]);
    var _selectedPoint_value;
    const headline = (_selectedPoint_value = selectedPoint === null || selectedPoint === void 0 ? void 0 : selectedPoint.value) !== null && _selectedPoint_value !== void 0 ? _selectedPoint_value : detail.headline;
    const headlineSub = selectedPoint ? "".concat(selectedPoint.label).concat(selectedPoint.sublabel ? " · ".concat(selectedPoint.sublabel) : "") : detail.headlineSub;
    var _selectedPoint_id;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "opacity-0 animate-[fadeUp_0.35s_ease-out_forwards]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onBack,
                className: "text-muted hover:text-ink mb-4 inline-flex items-center gap-1 text-sm font-medium",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": true,
                        children: "‹"
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    " Back"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                className: "rounded-3xl border-2 bg-white p-5 shadow-md shadow-rose/10 ".concat(style.border),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1 rounded-xl bg-cream p-1",
                        role: "tablist",
                        "aria-label": "Time range",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metricHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRIC_TIMEFRAMES"].map((tf)=>{
                            const active = timeframe === tf;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                role: "tab",
                                "aria-selected": active,
                                onClick: ()=>setTimeframe(tf),
                                className: "flex-1 rounded-lg py-2 text-center text-xs font-semibold tracking-wide transition-colors ".concat(active ? style.tab : "text-muted hover:text-ink"),
                                children: TF_LABELS[tf]
                            }, tf, false, {
                                fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                                lineNumber: 107,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-ink mt-5 text-center text-sm font-semibold tracking-wide",
                        children: detail.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-display mt-2 text-center text-5xl font-semibold tabular-nums ".concat(style.value),
                        children: headline
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    headlineSub && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted mt-1 text-center text-xs",
                        children: headlineSub
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted mt-0.5 text-center text-[11px]",
                        children: detail.unit
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 border-t border-blush/60 pt-4",
                        children: showCalendar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                timeframe !== "6M" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted mb-3 text-[10px] font-semibold tracking-[0.14em] uppercase",
                                    children: "Calendar"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                                    lineNumber: 140,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$MetricHistoryCalendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricHistoryCalendar"], {
                                    metricId: metricId,
                                    timeframe: timeframe,
                                    points: detail.points,
                                    accent: style.calendar,
                                    selectedId: (_selectedPoint_id = selectedPoint === null || selectedPoint === void 0 ? void 0 : selectedPoint.id) !== null && _selectedPoint_id !== void 0 ? _selectedPoint_id : null,
                                    onSelect: setSelectedPoint
                                }, void 0, false, {
                                    fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted mb-3 text-[10px] font-semibold tracking-[0.14em] uppercase",
                                    children: "Today"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                                    lineNumber: 155,
                                    columnNumber: 15
                                }, this),
                                detail.points.map((point)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border border-blush/70 bg-cream/50 px-4 py-3 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-ink text-sm font-medium",
                                                children: point.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                                                lineNumber: 163,
                                                columnNumber: 19
                                            }, this),
                                            point.sublabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-muted text-xs",
                                                children: point.sublabel
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                                                lineNumber: 165,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-display mt-2 text-3xl font-semibold ".concat(style.value),
                                                children: point.value
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                                                lineNumber: 167,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, point.id, true, {
                                        fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/MetricDetailView.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/profile/MetricDetailView.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(MetricDetailView, "6wYxTGD598IzUOwYvfdNALATWYg=");
_c = MetricDetailView;
var _c;
__turbopack_context__.k.register(_c, "MetricDetailView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/profileStorage.ts [app-client] (ecmascript) <export DEFAULT_EMERGENCY_CONTACTS as EMERGENCY_CONTACTS>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EMERGENCY_CONTACTS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_EMERGENCY_CONTACTS"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/profileStorage.ts [app-client] (ecmascript)");
}),
"[project]/src/components/profile/SendReportPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SendReportPanel",
    ()=>SendReportPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/profile.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__DEFAULT_EMERGENCY_CONTACTS__as__EMERGENCY_CONTACTS$3e$__ = __turbopack_context__.i("[project]/src/lib/profileStorage.ts [app-client] (ecmascript) <export DEFAULT_EMERGENCY_CONTACTS as EMERGENCY_CONTACTS>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function SendReportPanel(param) {
    let { open, onClose } = param;
    _s();
    const defaultSelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SendReportPanel.useMemo[defaultSelected]": ()=>new Set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["REPORT_OPTIONS"].filter({
                "SendReportPanel.useMemo[defaultSelected]": (o)=>o.group === "data"
            }["SendReportPanel.useMemo[defaultSelected]"]).map({
                "SendReportPanel.useMemo[defaultSelected]": (o)=>o.id
            }["SendReportPanel.useMemo[defaultSelected]"]))
    }["SendReportPanel.useMemo[defaultSelected]"], []);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("select");
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultSelected);
    const [recipientName, setRecipientName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__DEFAULT_EMERGENCY_CONTACTS__as__EMERGENCY_CONTACTS$3e$__["EMERGENCY_CONTACTS"].provider.name);
    const [recipientClinic, setRecipientClinic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__DEFAULT_EMERGENCY_CONTACTS__as__EMERGENCY_CONTACTS$3e$__["EMERGENCY_CONTACTS"].provider.clinic);
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SendReportPanel.useEffect": ()=>{
            if (!open) return;
            setStep("select");
            setSelected(new Set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["REPORT_OPTIONS"].filter({
                "SendReportPanel.useEffect": (o)=>o.group === "data"
            }["SendReportPanel.useEffect"]).map({
                "SendReportPanel.useEffect": (o)=>o.id
            }["SendReportPanel.useEffect"])));
            setRecipientName(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__DEFAULT_EMERGENCY_CONTACTS__as__EMERGENCY_CONTACTS$3e$__["EMERGENCY_CONTACTS"].provider.name);
            setRecipientClinic(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__DEFAULT_EMERGENCY_CONTACTS__as__EMERGENCY_CONTACTS$3e$__["EMERGENCY_CONTACTS"].provider.clinic);
            setNote("");
        }
    }["SendReportPanel.useEffect"], [
        open
    ]);
    if (!open) return null;
    function toggle(id) {
        setSelected((prev)=>{
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }
    function handleConfirmSend() {
        setStep("sent");
    }
    const dataOptions = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["REPORT_OPTIONS"].filter((o)=>o.group === "data");
    const symptomOptions = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["REPORT_OPTIONS"].filter((o)=>o.group === "symptoms");
    const selectedLabels = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["REPORT_OPTIONS"].filter((o)=>selected.has(o.id)).map((o)=>o.label);
    const inputClass = "text-ink mt-1 w-full rounded-lg border border-blush bg-cream px-3 py-2 text-sm outline-none focus:border-rose/60 focus:ring-2 focus:ring-rose/15";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "phone-fixed-layer fixed inset-0 z-50 flex items-end justify-center",
        role: "dialog",
        "aria-modal": true,
        "aria-labelledby": "send-report-title",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "absolute inset-0 bg-ink/35 backdrop-blur-[2px]",
                onClick: onClose,
                "aria-label": "Close send report"
            }, void 0, false, {
                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white px-5 pt-5 pb-8 shadow-2xl",
                children: [
                    step === "select" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "send-report-title",
                                className: "font-display text-ink text-lg font-semibold",
                                children: "Send report"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted mt-1 text-sm leading-relaxed",
                                children: "Choose which data and symptoms to include."
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                                className: "mt-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                        className: "text-muted mb-2 text-[11px] font-semibold tracking-wide uppercase",
                                        children: "Vitals & data"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2",
                                        children: dataOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex cursor-pointer items-center gap-3 rounded-xl border border-blush/70 px-3 py-2.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: selected.has(opt.id),
                                                            onChange: ()=>toggle(opt.id),
                                                            className: "accent-rose-deep h-4 w-4 rounded"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                            lineNumber: 93,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-ink text-sm",
                                                            children: opt.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                            lineNumber: 99,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 21
                                                }, this)
                                            }, opt.id, false, {
                                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                lineNumber: 91,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                                className: "mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                        className: "text-muted mb-2 text-[11px] font-semibold tracking-wide uppercase",
                                        children: "Symptoms"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2",
                                        children: symptomOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex cursor-pointer items-center gap-3 rounded-xl border border-blush/70 px-3 py-2.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: selected.has(opt.id),
                                                            onChange: ()=>toggle(opt.id),
                                                            className: "accent-rose-deep h-4 w-4 rounded"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                            lineNumber: 114,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-ink text-sm",
                                                            children: opt.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 21
                                                }, this)
                                            }, opt.id, false, {
                                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                lineNumber: 112,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: onClose,
                                        className: "text-muted flex-1 rounded-xl border border-blush py-3 text-sm font-medium",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                        lineNumber: 128,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setStep("confirm"),
                                        disabled: selected.size === 0,
                                        className: "bg-rose-deep flex-1 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-40",
                                        children: "Continue"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    step === "confirm" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-display text-ink text-lg font-semibold",
                                children: "Confirm recipient"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted mt-1 text-sm leading-relaxed",
                                children: "Review who receives this report. You can edit details before sending."
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                lineNumber: 152,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 space-y-4 rounded-xl border border-blush/80 bg-cream/40 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted text-[10px] font-semibold tracking-[0.12em] uppercase",
                                                children: "Provider name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                lineNumber: 158,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: inputClass,
                                                value: recipientName,
                                                onChange: (e)=>setRecipientName(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                lineNumber: 161,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                        lineNumber: 157,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted text-[10px] font-semibold tracking-[0.12em] uppercase",
                                                children: "Clinic / practice"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: inputClass,
                                                value: recipientClinic,
                                                onChange: (e)=>setRecipientClinic(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                lineNumber: 171,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                        lineNumber: 167,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted text-[10px] font-semibold tracking-[0.12em] uppercase",
                                                children: "Note (optional)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                lineNumber: 178,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                className: "".concat(inputClass, " min-h-[4.5rem] resize-none"),
                                                value: note,
                                                onChange: (e)=>setNote(e.target.value),
                                                placeholder: "Add context for your care team…"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                lineNumber: 181,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                        lineNumber: 177,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 rounded-xl border border-blush/70 bg-white p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted text-[10px] font-semibold tracking-[0.12em] uppercase",
                                        children: "Included in report"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                        lineNumber: 191,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "text-ink mt-2 space-y-1 text-sm",
                                        children: selectedLabels.map((label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    "· ",
                                                    label
                                                ]
                                            }, label, true, {
                                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                                lineNumber: 196,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                        lineNumber: 194,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setStep("select"),
                                        className: "text-muted flex-1 rounded-xl border border-blush py-3 text-sm font-medium",
                                        children: "Back"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                        lineNumber: 202,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleConfirmSend,
                                        disabled: !recipientName.trim(),
                                        className: "bg-rose-deep flex-1 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-40",
                                        children: "Confirm send"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                        lineNumber: 209,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    step === "sent" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-display text-ink text-lg font-semibold",
                                children: "Report sent"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                lineNumber: 223,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sage mt-6 text-center text-sm leading-relaxed",
                                children: [
                                    "Your report was sent to",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: recipientName.trim()
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                        lineNumber: 228,
                                        columnNumber: 15
                                    }, this),
                                    recipientClinic.trim() ? " · ".concat(recipientClinic.trim()) : "",
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                className: "bg-rose-deep mt-8 w-full rounded-xl py-3 text-sm font-semibold text-white",
                                children: "Done"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/SendReportPanel.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/profile/SendReportPanel.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_s(SendReportPanel, "iZXvw8IWClNj26ghAWjSFrhg5fA=");
_c = SendReportPanel;
var _c;
__turbopack_context__.k.register(_c, "SendReportPanel");
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
"[project]/src/lib/carechain.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BRAND",
    ()=>BRAND,
    "EARLY_WARNING_CONDITIONS",
    ()=>EARLY_WARNING_CONDITIONS,
    "GAPS_FIXED",
    ()=>GAPS_FIXED,
    "POSITIONING",
    ()=>POSITIONING
]);
const BRAND = {
    name: "CARECHAIN CARDIO",
    tagline: "The Maternal Cardiovascular Continuity Infrastructure"
};
const POSITIONING = {
    not: [
        "A symptom tracker.",
        "An AI doctor."
    ],
    instead: "An intelligence layer that connects fragmented maternal cardiovascular care before deterioration becomes catastrophic."
};
const EARLY_WARNING_CONDITIONS = [
    "Gestational hypertension",
    "Preeclampsia",
    "Postpartum BP instability",
    "Chronic inflammation",
    "PCOS / metabolic dysfunction"
];
const GAPS_FIXED = [
    {
        id: "interpretation",
        label: "Interpretation gaps"
    },
    {
        id: "followup",
        label: "Follow-up gaps"
    },
    {
        id: "education",
        label: "Education gaps"
    },
    {
        id: "continuity",
        label: "Continuity gaps"
    },
    {
        id: "escalation",
        label: "Escalation gaps"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/profile/ChangePasswordForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChangePasswordForm",
    ()=>ChangePasswordForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/profileStorage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const inputClass = "text-ink mt-1 w-full rounded-lg border border-blush bg-cream px-3 py-2 text-sm outline-none focus:border-rose/60 focus:ring-2 focus:ring-rose/15";
function ChangePasswordForm(param) {
    let { onDone } = param;
    _s();
    const [current, setCurrent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [next, setNext] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [confirm, setConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const needsCurrent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasStoredPassword"])();
    function handleSubmit(e) {
        e.preventDefault();
        const validationError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateNewPassword"])(next, confirm, needsCurrent ? current : undefined);
        if (validationError) {
            setError(validationError);
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savePassword"])(next);
        setError(null);
        setSuccess(true);
        setCurrent("");
        setNext("");
        setConfirm("");
        window.setTimeout(()=>{
            setSuccess(false);
            onDone();
        }, 1200);
    }
    if (success) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sage mt-3 text-sm font-medium",
            children: "Password updated successfully."
        }, void 0, false, {
            fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "mt-4 space-y-3 border-t border-blush/60 pt-4",
        children: [
            needsCurrent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted text-[10px] font-medium uppercase",
                        children: "Current password"
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "password",
                        autoComplete: "current-password",
                        className: inputClass,
                        value: current,
                        onChange: (e)=>setCurrent(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted text-[10px] font-medium uppercase",
                        children: "New password"
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "password",
                        autoComplete: "new-password",
                        className: inputClass,
                        value: next,
                        onChange: (e)=>setNext(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted text-[10px] font-medium uppercase",
                        children: "Confirm new password"
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "password",
                        autoComplete: "new-password",
                        className: inputClass,
                        value: confirm,
                        onChange: (e)=>setConfirm(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-alert text-xs",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
                lineNumber: 88,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 pt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onDone,
                        className: "text-muted flex-1 rounded-lg border border-blush py-2 text-sm font-medium",
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "bg-rose-deep flex-1 rounded-lg py-2 text-sm font-semibold text-white",
                        children: "Update password"
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/profile/ChangePasswordForm.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(ChangePasswordForm, "Q9b7loA3RHM3eXwMYf78/L/OXnk=");
_c = ChangePasswordForm;
var _c;
__turbopack_context__.k.register(_c, "ChangePasswordForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/profile/EmergencyContactCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmergencyContactCard",
    ()=>EmergencyContactCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const inputClass = "text-ink mt-1 w-full rounded-lg border border-blush bg-cream px-3 py-2 text-sm outline-none focus:border-rose/60 focus:ring-2 focus:ring-rose/15";
function EmergencyContactCard(props) {
    _s();
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(props.contact);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmergencyContactCard.useEffect": ()=>{
            if (!editing) setDraft(props.contact);
        }
    }["EmergencyContactCard.useEffect"], [
        props.contact,
        editing
    ]);
    const title = props.kind === "family" ? "Family" : "Primary health provider";
    function startEdit() {
        setDraft(props.contact);
        setEditing(true);
    }
    function cancel() {
        setDraft(props.contact);
        setEditing(false);
    }
    function save() {
        if (props.kind === "family") {
            const c = draft;
            if (!c.name.trim() || !c.phone.trim()) return;
            props.onSave({
                name: c.name.trim(),
                relation: c.relation.trim(),
                phone: c.phone.trim()
            });
        } else {
            const c = draft;
            if (!c.name.trim() || !c.phone.trim()) return;
            props.onSave({
                name: c.name.trim(),
                clinic: c.clinic.trim(),
                phone: c.phone.trim()
            });
        }
        setEditing(false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-blush/80 bg-white p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted text-[10px] font-semibold tracking-[0.12em] uppercase",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    !editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: startEdit,
                        className: "text-rose-deep text-xs font-semibold",
                        children: "Edit"
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            !editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-ink text-sm font-medium",
                        children: props.contact.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    "relation" in props.contact ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted text-xs",
                        children: props.contact.relation
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                        lineNumber: 85,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted text-xs",
                        children: props.contact.clinic
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                        lineNumber: 87,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "tel:".concat(props.contact.phone.replace(/\D/g, "")),
                        className: "text-rose-deep mt-2 inline-block text-sm font-medium",
                        children: props.contact.phone
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this) : props.kind === "family" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted text-[10px] font-medium uppercase",
                                children: "Name"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: inputClass,
                                value: draft.name,
                                onChange: (e)=>setDraft({
                                        ...draft,
                                        name: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted text-[10px] font-medium uppercase",
                                children: "Relationship"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: inputClass,
                                value: draft.relation,
                                onChange: (e)=>setDraft({
                                        ...draft,
                                        relation: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted text-[10px] font-medium uppercase",
                                children: "Phone"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: inputClass,
                                type: "tel",
                                value: draft.phone,
                                onChange: (e)=>setDraft({
                                        ...draft,
                                        phone: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 pt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: cancel,
                                className: "text-muted flex-1 rounded-lg border border-blush py-2 text-sm font-medium",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: save,
                                className: "bg-rose-deep flex-1 rounded-lg py-2 text-sm font-semibold text-white",
                                children: "Save"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted text-[10px] font-medium uppercase",
                                children: "Name"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: inputClass,
                                value: draft.name,
                                onChange: (e)=>setDraft({
                                        ...draft,
                                        name: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted text-[10px] font-medium uppercase",
                                children: "Clinic"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: inputClass,
                                value: draft.clinic,
                                onChange: (e)=>setDraft({
                                        ...draft,
                                        clinic: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 160,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted text-[10px] font-medium uppercase",
                                children: "Phone"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: inputClass,
                                type: "tel",
                                value: draft.phone,
                                onChange: (e)=>setDraft({
                                        ...draft,
                                        phone: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 170,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 pt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: cancel,
                                className: "text-muted flex-1 rounded-lg border border-blush py-2 text-sm font-medium",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: save,
                                className: "bg-rose-deep flex-1 rounded-lg py-2 text-sm font-semibold text-white",
                                children: "Save"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
                lineNumber: 147,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/profile/EmergencyContactCard.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_s(EmergencyContactCard, "sFPBci/NRF2o2lc1bd7V7McsYtg=");
_c = EmergencyContactCard;
var _c;
__turbopack_context__.k.register(_c, "EmergencyContactCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/profile/SettingsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SettingsPanel",
    ()=>SettingsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/authSession.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/authService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$carechain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/carechain.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/profileStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$ChangePasswordForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/profile/ChangePasswordForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$EmergencyContactCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/profile/EmergencyContactCard.tsx [app-client] (ecmascript)");
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
const NOTIF_STORAGE_KEY = "carechain-notifications-enabled";
function Toggle(param) {
    let { checked, onChange, label } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        role: "switch",
        "aria-checked": checked,
        "aria-label": label,
        onClick: ()=>onChange(!checked),
        className: "relative h-7 w-12 shrink-0 rounded-full transition-colors ".concat(checked ? "bg-rose-deep" : "bg-blush"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ".concat(checked ? "translate-x-5" : "translate-x-0")
        }, void 0, false, {
            fileName: "[project]/src/components/profile/SettingsPanel.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/profile/SettingsPanel.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = Toggle;
function SettingsPanel(param) {
    let { open, onClose } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [notificationsOn, setNotificationsOn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [contacts, setContacts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SettingsPanel.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadEmergencyContacts"])()
    }["SettingsPanel.useState"]);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SettingsPanel.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadAccountEmail"])()
    }["SettingsPanel.useState"]);
    const [changingPassword, setChangingPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SettingsPanel.useEffect": ()=>{
            if (!open) return;
            const stored = window.localStorage.getItem(NOTIF_STORAGE_KEY);
            if (stored !== null) setNotificationsOn(stored === "true");
            setContacts((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadEmergencyContacts"])());
            setEmail((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadAccountEmail"])());
            setChangingPassword(false);
        }
    }["SettingsPanel.useEffect"], [
        open
    ]);
    function handleNotificationsChange(next) {
        setNotificationsOn(next);
        window.localStorage.setItem(NOTIF_STORAGE_KEY, String(next));
    }
    function updateFamily(family) {
        const next = {
            ...contacts,
            family
        };
        setContacts(next);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveEmergencyContacts"])(next);
    }
    function updateProvider(provider) {
        const next = {
            ...contacts,
            provider
        };
        setContacts(next);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profileStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveEmergencyContacts"])(next);
    }
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "phone-fixed-layer fixed inset-0 z-50 flex justify-end",
        role: "dialog",
        "aria-modal": true,
        "aria-labelledby": "settings-title",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "absolute inset-0 bg-ink/30 backdrop-blur-[2px]",
                onClick: onClose,
                "aria-label": "Close settings"
            }, void 0, false, {
                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "relative flex h-full w-full max-w-full flex-col bg-cream shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between border-b border-blush/60 px-5 py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "settings-title",
                                className: "font-display text-ink text-lg font-semibold",
                                children: "Settings"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                className: "text-muted hover:text-ink rounded-full px-2 py-1 text-sm font-medium",
                                children: "Done"
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto px-5 py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "border-blush/70 border-b pb-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-ink text-sm font-semibold",
                                                        children: "Notifications"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-muted mt-1 text-xs leading-relaxed",
                                                        children: [
                                                            "Allow notifications from ",
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$carechain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAND"].name,
                                                            " for vitals alerts, care reminders, and report updates."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                                lineNumber: 122,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toggle, {
                                                checked: notificationsOn,
                                                onChange: handleNotificationsChange,
                                                label: "App notifications"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                                lineNumber: 129,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted mt-3 text-[11px]",
                                        children: notificationsOn ? "You will receive push and in-app alerts." : "Notifications are off. You may miss time-sensitive vitals alerts."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "border-blush/70 border-b py-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-ink text-sm font-semibold",
                                        children: "Emergency contacts"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted mt-1 mb-4 text-xs",
                                        children: "People and providers we can reach if your readings need urgent follow-up."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$EmergencyContactCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmergencyContactCard"], {
                                                kind: "family",
                                                contact: contacts.family,
                                                onSave: updateFamily
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                                lineNumber: 149,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$EmergencyContactCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmergencyContactCard"], {
                                                kind: "provider",
                                                contact: contacts.provider,
                                                onSave: updateProvider
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                                lineNumber: 154,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "py-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-ink text-sm font-semibold",
                                        children: "Email & password"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 rounded-xl border border-blush/80 bg-white p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-muted text-[10px] font-semibold tracking-[0.12em] uppercase",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                                lineNumber: 165,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-ink mt-1 text-sm",
                                                children: email
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                                lineNumber: 168,
                                                columnNumber: 15
                                            }, this),
                                            !changingPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setChangingPassword(true),
                                                className: "text-rose-deep mt-4 text-sm font-medium",
                                                children: "Change password"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                                lineNumber: 171,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$ChangePasswordForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChangePasswordForm"], {
                                                onDone: ()=>setChangingPassword(false)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                                lineNumber: 179,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "border-t border-blush/60 py-5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: async ()=>{
                                        try {
                                            if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirebaseConfigured"]) {
                                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])();
                                            }
                                        } catch (e) {
                                        /* still clear local session */ }
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearAuthenticated"])();
                                        onClose();
                                        router.replace("/welcome");
                                    },
                                    className: "text-alert w-full rounded-xl border border-alert/30 bg-alert-bg py-3 text-sm font-semibold",
                                    children: "Sign out"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/profile/SettingsPanel.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/profile/SettingsPanel.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_s(SettingsPanel, "fE6JHg+cgZlXnwYaxCNc8NLEEZc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = SettingsPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "Toggle");
__turbopack_context__.k.register(_c1, "SettingsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/profile/ProfileHome.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProfileHome",
    ()=>ProfileHome
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/profile.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metricHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/metricHistory.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/vitals.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$AvgMetricGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/profile/AvgMetricGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$HomeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/profile/HomeHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$MetricDetailView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/profile/MetricDetailView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$SendReportPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/profile/SendReportPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$SettingsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/profile/SettingsPanel.tsx [app-client] (ecmascript)");
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
function ProfileHome() {
    _s();
    const [settingsOpen, setSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reportOpen, setReportOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedMetricId, setSelectedMetricId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const metrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProfileHome.useMemo[metrics]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$profile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAvgMetrics"])()
    }["ProfileHome.useMemo[metrics]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            selectedMetricId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$MetricDetailView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MetricDetailView"], {
                metricId: selectedMetricId,
                onBack: ()=>setSelectedMetricId(null)
            }, void 0, false, {
                fileName: "[project]/src/components/profile/ProfileHome.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$HomeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HomeHeader"], {
                        patient: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$vitals$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockPatient"],
                        onOpenSettings: ()=>setSettingsOpen(true)
                    }, void 0, false, {
                        fileName: "[project]/src/components/profile/ProfileHome.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setReportOpen(true),
                                className: "text-rose-deep inline-flex items-center gap-1 self-end text-sm font-semibold tracking-wide",
                                children: [
                                    "Send report",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": true,
                                        children: "›"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/profile/ProfileHome.tsx",
                                        lineNumber: 40,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/profile/ProfileHome.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$AvgMetricGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvgMetricGrid"], {
                                metrics: metrics,
                                onSelectMetric: (id)=>{
                                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metricHistory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMetricId"])(id)) setSelectedMetricId(id);
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/profile/ProfileHome.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/profile/ProfileHome.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$SettingsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SettingsPanel"], {
                open: settingsOpen,
                onClose: ()=>setSettingsOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/profile/ProfileHome.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$profile$2f$SendReportPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SendReportPanel"], {
                open: reportOpen,
                onClose: ()=>setReportOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/profile/ProfileHome.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(ProfileHome, "fZXQ5GA3ELh0GLey2hESdBCdgxI=");
_c = ProfileHome;
var _c;
__turbopack_context__.k.register(_c, "ProfileHome");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_b61f8dcb._.js.map