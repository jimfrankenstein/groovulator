"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "./PasswordProtect/Icons";

/**
 * BasicAccessControl - Client-side password prompt for basic content obscurity
 *
 * ⚠️ WARNING: THIS IS NOT SECURE
 * - Password is visible in the client JavaScript bundle (unavoidable for client-side auth)
 * - Anyone can bypass via sessionStorage manipulation in browser console
 * - Provides zero cryptographic security
 *
 * ✅ Good for:
 * - Hiding work-in-progress from search engines and bots (requires JS execution)
 * - Preventing accidental access by casual visitors
 * - Sharing prototype links with light access control
 *
 * ❌ DO NOT USE for:
 * - Protecting sensitive data or PII
 * - Actual user authentication
 * - Compliance requirements (GDPR, HIPAA, etc.)
 * - Anything you wouldn't want public
 */

interface PasswordProtectProps {
  children: React.ReactNode;
  /**
   * The password to check against (will be visible in browser JS bundle).
   * Pass from environment variable at call site: process.env.NEXT_PUBLIC_YOUR_CODE
   */
  password: string;
  /** The title to display on the password prompt */
  title?: string;
  /** The description to display below the title */
  description?: string;
  /** The sessionStorage key to store unlock status. Must be unique per protected area. */
  storageKey: string;
}

/**
 * Hook to provide logout functionality for password-protected areas
 */
export function usePasswordProtect(storageKey: string) {
  const logout = () => {
    try {
      sessionStorage.removeItem(storageKey);
    } catch (error) {
      console.error("[PasswordProtect] Failed to clear session:", error);
      // Continue to reload anyway
    }
    // Always reload to reset state
    window.location.reload();
  };

  return { logout };
}

export default function PasswordProtect({
  children,
  password: correctPassword,
  title = "🔒 Protected Area",
  description = "This area is password protected",
  storageKey,
}: PasswordProtectProps) {
  // Initialize unlock state directly from sessionStorage (synchronous, no loading needed)
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(storageKey) === "true";
    } catch (error) {
      console.error("[PasswordProtect] sessionStorage error:", error);
      return false;
    }
  });

  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!correctPassword) {
      setError("Password not configured. Check your environment variables.");
      return;
    }

    if (passwordInput === correctPassword) {
      try {
        sessionStorage.setItem(storageKey, "true");
        setIsUnlocked(true);
        setError("");
      } catch (error) {
        console.error("[PasswordProtect] Failed to save session:", error);
        setError("Failed to save session. Try again.");
      }
    } else {
      setError("Incorrect password");
      setPasswordInput("");
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white flex items-center justify-center transition-colors">
      <div className="w-full max-w-md px-4">
        <div className="border border-black/10 dark:border-white/10 p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 font-fugaz tracking-tight lowercase">
            {title}
          </h2>
          <p className="opacity-70 mb-6 text-sm">{description}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                className="w-full border border-black/20 dark:border-white/20 bg-transparent px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 dark:focus:ring-yellow-300 transition-colors"
                placeholder="Enter password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            {error && <p className="text-pink-500 dark:text-yellow-300 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full border border-black dark:border-white px-4 py-3 text-sm font-medium hover:-translate-y-0.5 hover:bg-pink-500 hover:text-white hover:border-pink-500 dark:hover:bg-yellow-300 dark:hover:text-black dark:hover:border-yellow-300 transition-all duration-200"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
