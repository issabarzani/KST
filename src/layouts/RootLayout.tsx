import { Helmet } from '@dr.pogodin/react-helmet';
import { type ReactElement } from 'react';
import { ScrollRestoration } from 'react-router';

import ChatAgent from '@/components/ChatAgent';
import HomepageSameAsJsonLd from '@/components/HomepageSameAsJsonLd';
import Footer from '@/layouts/parts/Footer';
import Header from '@/layouts/parts/Header';
import Website from '@/layouts/Website';
import SkipLink from '@/components/SkipLink';
import { LangProvider } from '@/lib/lang-context';
import { ThemeProvider } from '@/lib/theme-context';

interface RootLayoutProps {
  children: ReactElement;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ThemeProvider>
      <LangProvider>
        <Website>
          <Helmet>
            <title>Kurdistan Service Team — تیمی خزمەتگوزاری کوردستان</title>
            <meta name="description" content="Kurdistan Service Team (KST) — Turnkey engineering solutions, general contracting, HVAC, electrical, medical, and IT services in Erbil, Kurdistan Region, Iraq." />
            <meta name="keywords" content="Kurdistan Service Team, KST, engineering, construction, HVAC, Erbil, Kurdistan, turnkey" />
            <meta property="og:site_name" content="Kurdistan Service Team" />
            <meta property="og:locale" content="ckb_IQ" />
          </Helmet>
          <HomepageSameAsJsonLd />
          <ScrollRestoration />
          <SkipLink />
          <Header />
          {children}
          <Footer />
          <ChatAgent />
        </Website>
      </LangProvider>
    </ThemeProvider>
  );
}
