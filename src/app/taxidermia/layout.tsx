import TaxidermiaProtection from "./TaxidermiaProtection";

export const metadata = {
  title: "Taxidermia | Groovulator",
  description: "Protected taxidermia area",
};

export default function TaxidermiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/mol1kbc.css" />
      <TaxidermiaProtection>{children}</TaxidermiaProtection>
    </>
  );
}
