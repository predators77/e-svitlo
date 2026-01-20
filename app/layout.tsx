import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Чи є світло? — Закарпаття (MVP)",
  description: "Перевірка графіків відключення світла по місту та черзі. MVP сервіс для Закарпаття.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        {children}
      </body>
    </html>
  );
}
