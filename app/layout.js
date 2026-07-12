import "./globals.css";

export const metadata = {
  title: "Predixion",
  description: "Plateforme de pronostics sportifs avec crédits virtuels"
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
