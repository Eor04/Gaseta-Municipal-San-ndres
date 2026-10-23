import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { NormasProvider } from './contexts/NormasContext';

export const metadata = {
  title: 'Gaceta Municipal – Gobierno Autónomo Municipal de San Andrés',
  description: 'Sistema de Gaceta Municipal del Gobierno Autónomo Municipal de San Andrés. Consulte la normativa municipal: leyes, decretos, resoluciones y ordenanzas. Provincia Marbán, Departamento del Beni, Bolivia.',
  keywords: 'Gaceta Municipal, San Andrés, Beni, normativa municipal, leyes municipales, Bolivia',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Merriweather:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <NormasProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </NormasProvider>
      </body>
    </html>
  );
}
