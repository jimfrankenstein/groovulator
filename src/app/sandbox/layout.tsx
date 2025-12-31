import SandboxProtection from "./SandboxProtection";

export const metadata = {
  title: "Sandbox | Groovulator",
  description: "Protected sandbox area",
};

export default function SandboxLayout({ children }: { children: React.ReactNode }) {
  return <SandboxProtection>{children}</SandboxProtection>;
}
