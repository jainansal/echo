import "@/styles/globals.css";

export const metadata = {
  title: "Echo",
  description: "Real-time web chat application",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
