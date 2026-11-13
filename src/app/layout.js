import './globals.css';
import Header from '@/components/Header/Header';

export const metadata = {
  title: 'Controle de Estoque',
  description: 'Atividade 4º Bimestre - Front-End II',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
