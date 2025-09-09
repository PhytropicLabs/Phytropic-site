// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Phytropic Labs",
  description: "Ancient meets advanced.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-base text-text">
        {/* TODO: add your header here if you like */}
        <main className="flex-1">{children}</main>
        {/* TODO: add your footer here if you like */}
      </body>
    </html>
  );
}
