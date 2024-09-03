import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Hilma-biocare",
  description: "Developed by CodeBotX",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Z7QRJQK52S"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z7QRJQK52S');
          `}
        </Script>
        {/* LeadQuizzes Tracking Script */}
        <Script
          src="https://lq3-production01.s3.amazonaws.com/lead_quizzes_3.0/tracking/js/properties/ze1ffxuzfv9_bg.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <div>{children}</div>
      </body>
    </html>
  );
}