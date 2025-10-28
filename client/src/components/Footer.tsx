import { Github, Linkedin, Twitter } from "lucide-react";
import { APP_TITLE } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <img
              src={theme === "dark" ? "/logo-white.png" : "/logo-dark.png"}
              alt="SOCO Logo"
              className="h-24 w-auto mb-4"
            />
            <p className="text-muted-foreground mb-4 max-w-md">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.links.title")}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.services")}
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.portfolio")}
                </a>
              </li>
              <li>
                <a href="#technologies" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.technologies")}
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.about")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.contact.title")}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>{t("contact.location.value")}</li>
              <li>contact@soco.com.mx</li>
              <li>+52 55 1234 5678</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {APP_TITLE}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

