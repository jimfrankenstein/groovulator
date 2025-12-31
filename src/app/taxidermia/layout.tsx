import TaxidermiaProtection from "./TaxidermiaProtection";

export const metadata = {
  title: "Taxidermia | Groovulator",
  description: "Protected taxidermia area",
};

export default function TaxidermiaLayout({ children }: { children: React.ReactNode }) {
  return <TaxidermiaProtection>{children}</TaxidermiaProtection>;
}
