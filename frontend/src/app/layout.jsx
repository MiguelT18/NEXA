import "@fontsource/roboto";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import ThemeProvider from "@/hooks/useTheme";
import { AvatarProvider } from "@/hooks/useAvatar";
import Footer from "@/components/ui/Footer";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata = {
  title: "Nexa AI",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased dark:bg-dark-background dark:text-white bg-white text-dark-gray flex flex-col min-h-dvh relative">
        <ThemeProvider>
          <AvatarProvider>
            <AuthProvider>
              <Navbar />
              {children}
              <Footer />
            </AuthProvider>
          </AvatarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
