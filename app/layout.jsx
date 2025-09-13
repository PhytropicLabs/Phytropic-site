// app/layout.jsx
import "./globals.css";
import Header from "@/components/Header";
import LinkInterceptor from "@/components/LinkInterceptor"; // ⬅ add this

export const metadata = {
  title: "Phytropic",
  description: "Ancient meets advanced. Nature’s frequency, your balance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-base text-text">
        <Header />

        {/* Global click interceptor.
           - Allowed paths here won’t be redirected.
           - Any element with data-allow will also bypass the redirect. */}
        <LinkInterceptor allowedPaths={["/finder"]} />

        <main className="flex-1">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
