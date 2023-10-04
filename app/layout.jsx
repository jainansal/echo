import "@/styles/globals.css";

export const metadata = {
  title: "Echo",
  description: "Real-time web chat application",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      {/* <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </head> */}
      <body className="bg-slate-950 text-slate-200">{children}</body>
    </html>
  );
};

export default RootLayout;
