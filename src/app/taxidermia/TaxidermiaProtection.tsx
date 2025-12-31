"use client";

import PasswordProtect from "../../components/PasswordProtect";

export const TAXIDERMIA_STORAGE_KEY = "taxidermia_unlocked";

export default function TaxidermiaProtection({ children }: { children: React.ReactNode }) {
  return (
    <PasswordProtect
      password={process.env.NEXT_PUBLIC_UJW_CODE || ""}
      title="🎭 taxidermia"
      description="This area is password protected"
      storageKey={TAXIDERMIA_STORAGE_KEY}
    >
      {children}
    </PasswordProtect>
  );
}
