export const metadata = {
  title: "moltlog",
  description: "some thoughts need to molt",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{
        background:"#0d0d0d",
        color:"#e5e5e5",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        minHeight:"100vh"
      }}>
        {children}
      </body>
    </html>
  );
}
