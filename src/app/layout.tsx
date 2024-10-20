import { Poppins } from "next/font/google";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import { Metadata } from "next";
import Head from "next/head";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from 'next/script';
import { DataProvider } from "@/context/DataContext";
import SiteHeaderPage from "./(server-components)/SiteHeaderPage";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tickyourlist: Things To Do, Attractions, Tours, Events & Experiences",
  description: "Things To Do, Attractions, Tours, Events & Experiences, Booking Online",
  keywords: "Things To Do, Attractions, Tours, Events & Experiences, Booking Online",
  icons: {
    icon: '/favicon.ico',
    // shortcut: '/favicon.ico', // optional
    // apple: '/apple-touch-icon.png', // optional for Apple devices
  },
};

export const viewport = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ''}>
      <html lang="en" className={poppins.className}>
        <Head>
          <link rel="icon" href="/images/logo/tyllogo.png" /> {/* Add this line */}
        </Head>
        <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          <AuthProvider>
          <DataProvider>
            <ClientCommons />
          <SiteHeaderPage />
            {children}
            <FooterNav />
            <Footer />
            </DataProvider>
          </AuthProvider>
          <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6JM1JBYKM5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6JM1JBYKM5');
          `}
        </Script>

          <Script
            id="brevo-conversations-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                if (window.innerWidth > 768) {
                  (function(d, w, c) {
                      w.BrevoConversationsID = '${process.env.BREVO_CONVERSTATIONS_ID}';
                      w[c] = w[c] || function() {
                          (w[c].q = w[c].q || []).push(arguments);
                      };
                      var s = d.createElement('script');
                      s.async = true;
                      s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
                      if (d.head) d.head.appendChild(s);
                  })(document, window, 'BrevoConversations');
                }
              `,
            }}
          />
          <Script
            id="clarity-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
           (function(c,l,a,r,i,t,y){
              c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.CLARITY_KEY_ID}");
          `,
            }}
          />
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}
