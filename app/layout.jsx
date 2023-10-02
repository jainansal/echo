import "@/styles/globals.css";

export const metadata = {
  title: "Echo",
  description: "Real-time web chat application",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body className="bg-slate-950 text-slate-200">{children}</body>
    </html>
  );
};

export default RootLayout;
