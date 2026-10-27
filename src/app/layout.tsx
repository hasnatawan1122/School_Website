import type { Metadata } from 'next';
import './globals.css';
import ChalkboardLoader from '@/components/ChalkboardLoader';

export const metadata: Metadata = {
  metadataBase: new URL('https://fisengesecondary.edu.zm'),
  title: 'Fisenge Secondary School | Luanshya, Copperbelt Province',
  description: 'Official website of Fisenge Secondary School in Luanshya District, Zambia. Providing high quality junior and senior secondary education, sciences, commercial and practical subjects.',
  keywords: ['Fisenge Secondary School', 'Luanshya Schools', 'Copperbelt Education', 'Zambia Secondary Schools', 'ECZ Exams', 'Grade 8 to 12'],
  authors: [{ name: 'Fisenge Secondary School Administration' }],
  openGraph: {
    title: 'Fisenge Secondary School | Excellence in Character, Scholarship & Service',
    description: 'Providing comprehensive secondary education in Luanshya, Copperbelt Province.',
    url: 'https://fisengesecondary.edu.zm',
    siteName: 'Fisenge Secondary School',
    images: [
      {
        url: '/images/campus_hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Fisenge Secondary School Campus'
      }
    ],
    locale: 'en_ZM',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <ChalkboardLoader />
        {children}
      </body>
    </html>
  );
}
