"use client";

import PasswordProtect from "../../components/PasswordProtect";

export const SANDBOX_STORAGE_KEY = "sandbox_unlocked";

export default function SandboxProtection({ children }: { children: React.ReactNode }) {
  return (
    <PasswordProtect
      password={process.env.NEXT_PUBLIC_SANDBOX_CODE || ""}
      title="🧪 sandbox"
      description="This area is password protected"
      storageKey={SANDBOX_STORAGE_KEY}
    >
      {children}
    </PasswordProtect>
  );
}
