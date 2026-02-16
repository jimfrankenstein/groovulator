export const metadata = {
  title:
    "Undead Justice Warriors of Taxidermia vs Evil Corporations: FIGHT FOR YOUR LIFE! | Groovulator",
  description:
    "Starring delightfully disgusting taxidermied monsters, this illustrated rock opera is a loving tribute to ‘90s music and absurd cartoons, and a hate letter to late-stage capitalism. Get stuffed!",
};

export default function TaxidermiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="https://use.typekit.net/mol1kbc.css" />
      {children}
    </>
  );
}
