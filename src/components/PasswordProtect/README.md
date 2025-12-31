# PasswordProtect Component

A client-side password prompt component for basic content obscurity in Next.js applications.

## ⚠️ Security Warning

**THIS IS NOT SECURE.** This component provides **obscurity, not security**.

### What it does:

- ✅ Hides content from search engines and bots (requires JavaScript execution)
- ✅ Prevents casual visitors from stumbling onto content
- ✅ Provides a lightweight "password gate" for prototypes and drafts

### What it doesn't do:

- ❌ Provide cryptographic security
- ❌ Hide the password (it's in the JavaScript bundle sent to browsers)
- ❌ Prevent determined users from accessing content (via DevTools)
- ❌ Comply with data protection requirements (GDPR, HIPAA, etc.)

**If you need real security, use server-side authentication with HTTP-only cookies.**

## Usage

### 1. Set up environment variable

Add to `.env.local`:

```bash
NEXT_PUBLIC_YOUR_PASSWORD=your-secret-code-here
```

**Important:** The `NEXT_PUBLIC_` prefix is required for client-side access. This also means the password will be visible in your JavaScript bundle.

### 2. Create a storage key constant

In your layout file:

```typescript
// app/your-protected-area/layout.tsx
export const YOUR_STORAGE_KEY = "your_area_unlocked";
```

### 3. Wrap your content

```typescript
import PasswordProtect from '@/components/PasswordProtect';
import { YOUR_STORAGE_KEY } from './layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PasswordProtect
      password={process.env.NEXT_PUBLIC_YOUR_PASSWORD || ''}
      title="🔒 Protected Area"
      description="This area is password protected"
      storageKey={YOUR_STORAGE_KEY}
    >
      {children}
    </PasswordProtect>
  );
}
```

### 4. Add logout functionality (optional)

```typescript
'use client';

import { usePasswordProtect } from '@/components/PasswordProtect';
import { YOUR_STORAGE_KEY } from './layout';

export function LogoutButton() {
  const { logout } = usePasswordProtect(YOUR_STORAGE_KEY);

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}
```

## Props

### PasswordProtect

| Prop          | Type     | Required | Default                             | Description                                       |
| ------------- | -------- | -------- | ----------------------------------- | ------------------------------------------------- |
| `password`    | `string` | Yes      | -                                   | The password to check against (from env var)      |
| `title`       | `string` | No       | `'🔒 Protected Area'`               | Title shown on password prompt                    |
| `description` | `string` | No       | `'This area is password protected'` | Description text                                  |
| `storageKey`  | `string` | Yes      | -                                   | Unique key for sessionStorage (must match logout) |

### usePasswordProtect Hook

```typescript
const { logout } = usePasswordProtect(storageKey);
```

Returns an object with a `logout` function that clears the session and reloads the page.

## Example: Multiple Protected Areas

```typescript
// app/admin/layout.tsx
export const ADMIN_STORAGE_KEY = 'admin_unlocked';

export default function AdminLayout({ children }) {
  return (
    <PasswordProtect
      password={process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''}
      title="🔐 Admin Panel"
      description="Admin access only"
      storageKey={ADMIN_STORAGE_KEY}
    >
      {children}
    </PasswordProtect>
  );
}

// app/beta/layout.tsx
export const BETA_STORAGE_KEY = 'beta_unlocked';

export default function BetaLayout({ children }) {
  return (
    <PasswordProtect
      password={process.env.NEXT_PUBLIC_BETA_CODE || ''}
      title="🚀 Beta Features"
      description="Early access area"
      storageKey={BETA_STORAGE_KEY}
    >
      {children}
    </PasswordProtect>
  );
}
```

## How It Works

1. Component checks `sessionStorage` for unlock status on mount
2. If unlocked, renders children immediately
3. If locked, shows password form
4. On correct password, sets `sessionStorage` flag and renders children
5. Session persists until tab/browser is closed

## Deployment

Make sure to set your `NEXT_PUBLIC_*` environment variables in your deployment platform (Vercel, Netlify, etc.).

**Remember:** Anyone can find these passwords by:

1. Opening browser DevTools
2. Searching JavaScript files for the password string
3. Or bypassing via `sessionStorage.setItem(storageKey, 'true')`

This is by design and unavoidable with client-side password checking.
