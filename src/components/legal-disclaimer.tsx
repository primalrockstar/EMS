import { useState } from "react";

export default function LegalDisclaimer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow max-w-md">
        <h2 className="text-lg font-bold mb-4">Legal Disclaimer</h2>
        <p className="mb-4">
          This is a sample legal disclaimer. Please accept to continue.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => onOpenChange(false)}
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export function useDisclaimerCheck() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  return { showDisclaimer, setShowDisclaimer };
}
