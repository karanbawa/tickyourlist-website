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

// Define your JSON-LD schemas
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "TickYourList",
  "alternateName": [
    "Tick Your List",
    "TYL",
    "TickYourList",
    "tickyourlist",
    "tick your list",
    "tick-your-list",
    "Tick your list",
    "TICKYOURLIST"
  ],
  "url": "https://www.tickyourlist.com",
  "description": "TickYourList (also known as Tick Your List) - Book top attractions, tours, and experiences worldwide. Seamless online booking for theme parks, adventures, museums, and more.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.tickyourlist.com/search?query={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Tick Your List: Book Top Attractions, Tours & Experiences",
    "item": "https://www.tickyourlist.com/"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "IMG Worlds of Adventure Tickets",
    "item": "https://www.tickyourlist.com/tickets/book-img-worlds-of-adventure-tickets"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "Ski Dubai Snow Park Tickets",
    "item": "https://www.tickyourlist.com/tickets/book-ski-dubai-snow-park-tickets"
  },{
    "@type": "ListItem",
    "position": 4,
    "name": "SeaWorld Abu Dhabi Tickets",
    "item": "https://www.tickyourlist.com/seaworld-abu-dhabi/book-seaworld-abu-dhabi"
  }]
} as const;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TickYourList",
  "alternateName": [
    "Tick Your List",
    "TYL",
    "TickYourList",
    "tickyourlist",
    "tick your list",
    "tick-your-list",
    "Tick your list",
    "TICKYOURLIST"
  ],
  "url": "https://www.tickyourlist.com",
  "logo": "https://tickyourlist-images.s3.ap-south-1.amazonaws.com/tyllogo.png",
  "description": "TickYourList (Tick Your List) is the leading platform for booking attractions and tours worldwide.",
  // ... rest of the schema
} as const;

const brandSchema = {
  "@context": "https://schema.org",
  "@type": "Brand",
  "name": "TickYourList",
  "alternateName": [
    "Tick Your List",
    "TYL",
    "TickYourList",
    "tickyourlist",
    "tick your list",
    "tick-your-list",
    "Tick your list",
    "TICKYOURLIST"
  ],
  "description": "TickYourList (Tick Your List) - Your trusted platform for booking attractions and experiences.",
  "logo": "https://tickyourlist-images.s3.ap-south-1.amazonaws.com/tyllogo.png"
} as const;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tickyourlist.com"),
  title: "Tick Your List: Book Top Attractions, Tours, & Unique Experiences",
  description: "Discover and book top attractions, tours, and unforgettable experiences with Tick Your List. Enjoy seamless online booking for theme parks, adventures, museums, and more, worldwide.",
  keywords: "Tick Your List, IMG Worlds of Adventure, IMG Adventure tickets, Yas Island tickets, Ferrari World, Yas Waterworld, SeaWorld Abu Dhabi tickets, Ski Dubai, Dubai Aquarium, Miracle Garden tickets, Desert Safari, Motiongate rides, Aquaventure tickets, TYL packages, TickYourList, Tick Your List",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    }
  },
  icons: {
    icon: [
      { url: '/images/logo/tyllogo.png' },
      { url: '/images/logo/tyllogo.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/logo/tyllogo.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/images/logo/tyllogo.png'
  },
  alternates: {
    canonical: 'https://www.tickyourlist.com/',
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(websiteSchema)
            }}
          />
          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(brandSchema)  // Add this new schema
          }}
        />
          {/* Breadcrumb Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbSchema)
            }}
          />
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
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16506531479"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16506531479');
          `}
        </Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS}');
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
          <Script id="checkout-tracking" strategy="afterInteractive">
              {`
                if (window.location.href.includes("/book?tourId")) {
                  gtag("event", "conversion", {
                    send_to: "AW-16506531479/8pFTCI2AluMZEJfd9r49",
                  });
                }
              `}
            </Script>

        </body>
      </html>
    </GoogleOAuthProvider>
  );
}
