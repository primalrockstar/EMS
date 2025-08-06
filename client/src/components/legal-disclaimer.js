import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function LegalDisclaimer({ open, onOpenChange, }) {
    if (!open)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white p-8 rounded shadow max-w-md", children: [_jsx("h2", { className: "text-lg font-bold mb-4", children: "Legal Disclaimer" }), _jsx("p", { className: "mb-4", children: "This is a sample legal disclaimer. Please accept to continue." }), _jsx("button", { className: "bg-blue-500 text-white px-4 py-2 rounded", onClick: () => onOpenChange(false), children: "Accept" })] }) }));
}
export function useDisclaimerCheck() {
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    return { showDisclaimer, setShowDisclaimer };
}
