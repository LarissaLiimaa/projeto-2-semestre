import "./globals.css";
import Header from "@/components/Header/Header";

export const metadata = {
  title: "Lima - Controle de Estoque",
  description: "Aplicação web para controle de estoque - 4º Bimestre",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="conteudo-principal">{children}</main>
        <footer className="rodape">
          Lima - Controle de Estoque • Desenvolvido por Larissa da Silva Lima
        </footer>
      </body>
    </html>
  );
}
