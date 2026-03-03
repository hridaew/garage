"use client";

import { useState } from "react";
import { Copy } from "@phosphor-icons/react";

export default function EmailCopyToast() {
    const [copied, setCopied] = useState(false);
    const email = "info@garage1880.com";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="relative inline-flex flex-col items-start gap-1">
            <button
                type="button"
                onClick={handleCopy}
                className="group flex items-center gap-2 text-lg text-garage-gray transition-colors hover:text-garage-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-garage-lilac focus-visible:ring-offset-2"
                aria-label="Copy email address"
            >
                <span>{email}</span>
                <Copy
                    size={16}
                    weight="bold"
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                />
            </button>

            {/* Floating Toast Notification */}
            <div
                className={`pointer-events-none absolute -top-10 left-0 rounded-md bg-garage-black px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-all duration-300 ${copied ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                    }`}
                role="status"
                aria-live="polite"
            >
                Email address copied!
            </div>
        </div>
    );
}
