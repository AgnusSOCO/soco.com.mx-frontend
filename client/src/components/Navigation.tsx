import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { APP_TITLE } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.odoo"), href: "#odoo" },
    { name: t("nav.portfolio"), href: "#portfolio" },
    { name: t("nav.technologies"), href: "#technologies" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5" 
          : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="container">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-20"
        }`}>
          {/* Logo with animation */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <img 
                src={theme === "dark" ? "/logo-white.png" : "/logo-dark.png"}
                alt="SOCO" 
                className={`transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-3/4 transition-all duration-300" />
              </a>
            ))}
            
            <div className="ml-4 flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
              <Button 
                variant="default" 
                size="sm"
                className="relative overflow-hidden group shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("nav.getStarted")}
                  <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-300 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu 
                size={20} 
                className={`absolute inset-0 m-auto transition-all duration-300 ${
                  isOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X 
                size={20} 
                className={`absolute inset-0 m-auto transition-all duration-300 ${
                  isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation with slide animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-border/50">
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-3 text-foreground/70 hover:text-foreground transition-all duration-300 rounded-lg hover:bg-primary/10 group"
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? "slideInRight 0.3s ease-out forwards" : "none"
                  }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-primary to-accent group-hover:h-3/4 transition-all duration-300 rounded-r" />
                </a>
              ))}
              <div className="flex gap-2 mt-2 px-4">
                <LanguageSwitcher />
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex-1 shadow-lg shadow-primary/25"
                >
                  {t("nav.getStarted")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

