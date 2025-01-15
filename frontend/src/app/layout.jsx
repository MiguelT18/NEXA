import "@fontsource/roboto";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import ThemeProvider from "@/hooks/useTheme";

export const metadata = {
  title: "Nexa AI",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased dark:bg-dark-background dark:text-white bg-white text-dark-gray flex flex-col min-h-dvh">
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
