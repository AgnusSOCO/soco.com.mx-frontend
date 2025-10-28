import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Navigation
    "nav.services": "Servicios",
    "nav.portfolio": "Portafolio",
    "nav.technologies": "Tecnologías",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.getStarted": "Comenzar",
    
    // Hero
    "hero.badge": "Agencia de Innovación Digital",
    "hero.title": "Transformando Ideas en Realidad Digital",
    "hero.subtitle": "El principal integrador tecnológico de la Ciudad de México, especializado en desarrollo de software, investigación en IA y soluciones de automatización inteligente.",
    "hero.cta.primary": "Iniciar Tu Proyecto",
    "hero.cta.secondary": "Ver Nuestro Trabajo",
    "hero.stats.projects": "Proyectos Entregados",
    "hero.stats.satisfaction": "Satisfacción del Cliente",
    "hero.stats.support": "Soporte Disponible",
    "hero.features.innovation": "Innovación",
    "hero.features.speed": "Velocidad",
    "hero.features.precision": "Precisión",
    "hero.features.quality": "Calidad",
    "hero.cards.clients": "Clientes",
    "hero.cards.projects": "Proyectos",
    "hero.cards.experience": "Años de Experiencia",
    
    // Services
    "services.title": "Nuestros Servicios",
    "services.subtitle": "Soluciones digitales integrales para impulsar tu negocio",
    "services.software.title": "Desarrollo de Software",
    "services.software.desc": "Aplicaciones web y móviles personalizadas construidas con tecnologías de vanguardia y mejores prácticas.",
    "services.ai.title": "Investigación e Integración de IA",
    "services.ai.desc": "Soluciones avanzadas de aprendizaje automático y sistemas impulsados por IA adaptados a tus necesidades empresariales.",
    "services.automation.title": "Automatización de Procesos",
    "services.automation.desc": "Optimiza operaciones con automatización inteligente que ahorra tiempo y reduce costos.",
    "services.design.title": "Diseño UI/UX",
    "services.design.desc": "Interfaces hermosas e intuitivas que deleitan a los usuarios e impulsan el compromiso.",
    "services.data.title": "Ingeniería de Datos",
    "services.data.desc": "Pipelines de datos robustos y soluciones de análisis para la toma de decisiones basada en datos.",
    "services.cloud.title": "Soluciones en la Nube",
    "services.cloud.desc": "Infraestructura en la nube escalable y prácticas DevOps para aplicaciones modernas.",
    
    // Portfolio
    "portfolio.title": "Proyectos Destacados",
    "portfolio.subtitle": "Mostrando nuestro último trabajo y soluciones innovadoras",
    "portfolio.project1.title": "Plataforma de E-Commerce",
    "portfolio.project1.desc": "Solución de e-commerce completa con recomendaciones impulsadas por IA y gestión de inventario en tiempo real.",
    "portfolio.project2.title": "Dashboard de Análisis de Salud",
    "portfolio.project2.desc": "Plataforma de análisis avanzada para proveedores de salud con insights predictivos y visualización de datos de pacientes.",
    "portfolio.project3.title": "Suite de Automatización",
    "portfolio.project3.desc": "Plataforma de automatización empresarial que reduce procesos manuales en un 80% mediante orquestación inteligente de flujos de trabajo.",
    "portfolio.project4.title": "App Móvil FinTech",
    "portfolio.project4.desc": "Aplicación bancaria móvil segura con autenticación biométrica y procesamiento de transacciones en tiempo real.",
    "portfolio.cta": "Ver Caso de Estudio",
    
    // Technologies
    "tech.title": "Stack Tecnológico",
    "tech.subtitle": "Aprovechamos tecnologías de vanguardia para construir soluciones robustas y escalables",
    "tech.stats.count": "Tecnologías",
    "tech.stats.modern": "Stack Moderno",
    "tech.stats.updates": "Actualizaciones",
    "tech.stats.experience": "Años de Experiencia",
    "tech.category.frontend": "Frontend",
    "tech.category.framework": "Framework",
    "tech.category.language": "Lenguaje",
    "tech.category.backend": "Backend",
    "tech.category.aiml": "IA/ML",
    "tech.category.database": "Base de Datos",
    "tech.category.cloud": "Nube",
    "tech.category.devops": "DevOps",
    "tech.category.api": "API",
    "techStack.title": "Stack Tecnológico",
    "techStack.subtitle": "Aprovechamos tecnologías de vanguardia para construir soluciones robustas y escalables",
    "techStack.stats.technologies": "Tecnologías",
    "techStack.stats.categories": "Categorías",
    "techStack.stats.modern": "Stack Moderno",
    "techStack.stats.support": "Actualizaciones",
    
    // About
    "about.title": "Acerca de SOCO",
    "about.p1": "Somos un integrador tecnológico con sede en la Ciudad de México, especializado en transformar negocios a través de soluciones digitales innovadoras. Nuestra experiencia abarca desarrollo de software, investigación en IA y automatización inteligente.",
    "about.p2": "Fundada con la visión de cerrar la brecha entre la tecnología de vanguardia y las aplicaciones empresariales prácticas, SOCO se ha convertido en un socio de confianza para empresas que buscan aprovechar la transformación digital.",
    "about.p3": "Nuestro equipo de profesionales experimentados combina excelencia técnica con resolución creativa de problemas para entregar soluciones que no solo cumplen sino que superan las expectativas.",
    "about.highlight1.title": "Con Base en Ciudad de México",
    "about.highlight1.desc": "Sirviendo con orgullo a clientes locales y globales desde el corazón de la Ciudad de México",
    "about.highlight2.title": "Equipo Experto",
    "about.highlight2.desc": "Desarrolladores, diseñadores y especialistas en IA talentosos dedicados a tu éxito",
    "about.highlight3.title": "Galardonados",
    "about.highlight3.desc": "Reconocidos por excelencia en innovación digital y satisfacción del cliente",
    "about.highlight4.title": "Orientados a Resultados",
    "about.highlight4.desc": "Enfocados en entregar resultados medibles que impulsan el crecimiento empresarial",
    "about.subtitle": "Explora nuestra empresa de forma interactiva",
    "about.mission": "Misión",
    "about.missionContent": "Transformar negocios a través de soluciones tecnológicas innovadoras que impulsan el crecimiento y la eficiencia.",
    "about.vision": "Visión",
    "about.visionContent": "Ser el integrador tecnológico líder en América Latina, reconocido por excelencia e innovación.",
    "about.team": "Equipo",
    "about.teamContent": "Un equipo diverso de expertos apasionados por crear soluciones digitales excepcionales.",
    "about.innovation": "Innovación",
    "about.innovationContent": "Adoptando tecnologías de vanguardia para mantenernos a la vanguardia de la transformación digital.",
    "about.excellence": "Excelencia",
    "about.excellenceContent": "Comprometidos con la más alta calidad en cada proyecto que emprendemos.",
    "about.global": "Alcance Global",
    "about.globalContent": "Sirviendo clientes localmente en CDMX y globalmente con soluciones de clase mundial.",
    "about.dragToRotate": "Arrastra para rotar",
    "about.scrollToZoom": "Desplázate para zoom",
    "about.clickCards": "Haz clic en las tarjetas",
    
    // Contact
    "contact.title": "Contáctanos",
    "contact.subtitle": "¿Listo para comenzar tu próximo proyecto? Hablemos de cómo podemos ayudarte",
    "contact.email": "Correo Electrónico",
    "contact.phone": "Teléfono",
    "contact.location": "Ubicación",
    "contact.location.value": "Ciudad de México, CDMX",
    "contact.form.title": "Envíanos un mensaje",
    "contact.form.subtitle": "Completa el formulario a continuación y te responderemos lo antes posible",
    "contact.form.name": "Nombre",
    "contact.form.name.placeholder": "Tu nombre",
    "contact.form.email": "Correo Electrónico",
    "contact.form.email.placeholder": "tu@correo.com",
    "contact.form.subject": "Asunto",
    "contact.form.subject.placeholder": "¿De qué se trata?",
    "contact.form.message": "Mensaje",
    "contact.form.message.placeholder": "Cuéntanos sobre tu proyecto...",
    "contact.form.submit": "Enviar Mensaje",
    "contact.form.success": "¡Gracias por tu mensaje! Te responderemos pronto.",
    
    // Footer
    "footer.tagline": "El principal integrador tecnológico de la Ciudad de México, transformando negocios a través de desarrollo de software innovador, investigación en IA y automatización inteligente.",
    "footer.links.title": "Enlaces Rápidos",
    "footer.contact.title": "Contacto",
  },
  en: {
    // Navigation
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.technologies": "Technologies",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.getStarted": "Get Started",
    
    // Hero
    "hero.badge": "Digital Innovation Agency",
    "hero.title": "Transforming Ideas Into Digital Reality",
    "hero.subtitle": "Mexico City's premier tech integrator specializing in software development, AI research, and intelligent automation solutions.",
    "hero.cta.primary": "Start Your Project",
    "hero.cta.secondary": "View Our Work",
    "hero.stats.projects": "Projects Delivered",
    "hero.stats.satisfaction": "Client Satisfaction",
    "hero.stats.support": "Support Available",
    "hero.features.innovation": "Innovation",
    "hero.features.speed": "Speed",
    "hero.features.precision": "Precision",
    "hero.features.quality": "Quality",
    "hero.cards.clients": "Clients",
    "hero.cards.projects": "Projects",
    "hero.cards.experience": "Years of Experience",
    
    // Services
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive digital solutions to power your business forward",
    "services.software.title": "Software Development",
    "services.software.desc": "Custom web and mobile applications built with cutting-edge technologies and best practices.",
    "services.ai.title": "AI Research & Integration",
    "services.ai.desc": "Advanced machine learning solutions and AI-powered systems tailored to your business needs.",
    "services.automation.title": "Process Automation",
    "services.automation.desc": "Streamline operations with intelligent automation that saves time and reduces costs.",
    "services.design.title": "UI/UX Design",
    "services.design.desc": "Beautiful, intuitive interfaces that delight users and drive engagement.",
    "services.data.title": "Data Engineering",
    "services.data.desc": "Robust data pipelines and analytics solutions for data-driven decision making.",
    "services.cloud.title": "Cloud Solutions",
    "services.cloud.desc": "Scalable cloud infrastructure and DevOps practices for modern applications.",
    
    // Portfolio
    "portfolio.title": "Featured Projects",
    "portfolio.subtitle": "Showcasing our latest work and innovative solutions",
    "portfolio.project1.title": "E-Commerce Platform",
    "portfolio.project1.desc": "Full-stack e-commerce solution with AI-powered recommendations and real-time inventory management.",
    "portfolio.project2.title": "Healthcare Analytics Dashboard",
    "portfolio.project2.desc": "Advanced analytics platform for healthcare providers with predictive insights and patient data visualization.",
    "portfolio.project3.title": "Automation Suite",
    "portfolio.project3.desc": "Enterprise automation platform reducing manual processes by 80% through intelligent workflow orchestration.",
    "portfolio.project4.title": "FinTech Mobile App",
    "portfolio.project4.desc": "Secure mobile banking application with biometric authentication and real-time transaction processing.",
    "portfolio.cta": "View Case Study",
    
    // Technologies
    "tech.title": "Technology Stack",
    "tech.subtitle": "We leverage cutting-edge technologies to build robust, scalable solutions",
    "tech.stats.count": "Technologies",
    "tech.stats.modern": "Modern Stack",
    "tech.stats.updates": "Updates",
    "tech.stats.experience": "Years Experience",
    "tech.category.frontend": "Frontend",
    "tech.category.framework": "Framework",
    "tech.category.language": "Language",
    "tech.category.backend": "Backend",
    "tech.category.aiml": "AI/ML",
    "tech.category.database": "Database",
    "tech.category.cloud": "Cloud",
    "tech.category.devops": "DevOps",
    "tech.category.api": "API",
    "techStack.title": "Technology Stack",
    "techStack.subtitle": "We leverage cutting-edge technologies to build robust, scalable solutions",
    "techStack.stats.technologies": "Technologies",
    "techStack.stats.categories": "Categories",
    "techStack.stats.modern": "Modern Stack",
    "techStack.stats.support": "Updates",
    
    // About
    "about.title": "About SOCO",
    "about.p1": "We are a Mexico City-based tech integrator specializing in transforming businesses through innovative digital solutions. Our expertise spans software development, AI research, and intelligent automation.",
    "about.p2": "Founded with a vision to bridge the gap between cutting-edge technology and practical business applications, SOCO has grown into a trusted partner for companies seeking to leverage digital transformation.",
    "about.p3": "Our team of experienced professionals combines technical excellence with creative problem-solving to deliver solutions that not only meet but exceed expectations.",
    "about.highlight1.title": "Mexico City Based",
    "about.highlight1.desc": "Proudly serving clients locally and globally from the heart of Mexico City",
    "about.highlight2.title": "Expert Team",
    "about.highlight2.desc": "Talented developers, designers, and AI specialists dedicated to your success",
    "about.highlight3.title": "Award Winning",
    "about.highlight3.desc": "Recognized for excellence in digital innovation and client satisfaction",
    "about.highlight4.title": "Results Driven",
    "about.highlight4.desc": "Focused on delivering measurable outcomes that drive business growth",
    "about.subtitle": "Explore our company interactively",
    "about.mission": "Mission",
    "about.missionContent": "Transform businesses through innovative technology solutions that drive growth and efficiency.",
    "about.vision": "Vision",
    "about.visionContent": "To be the leading tech integrator in Latin America, recognized for excellence and innovation.",
    "about.team": "Team",
    "about.teamContent": "A diverse team of experts passionate about creating exceptional digital solutions.",
    "about.innovation": "Innovation",
    "about.innovationContent": "Embracing cutting-edge technologies to stay at the forefront of digital transformation.",
    "about.excellence": "Excellence",
    "about.excellenceContent": "Committed to the highest quality in every project we undertake.",
    "about.global": "Global Reach",
    "about.globalContent": "Serving clients locally in CDMX and globally with world-class solutions.",
    "about.dragToRotate": "Drag to rotate",
    "about.scrollToZoom": "Scroll to zoom",
    "about.clickCards": "Click cards",
    
    // Contact
    "contact.title": "Get In Touch",
    "contact.subtitle": "Ready to start your next project? Let's discuss how we can help",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.location.value": "Mexico City, CDMX",
    "contact.form.title": "Send us a message",
    "contact.form.subtitle": "Fill out the form below and we'll get back to you as soon as possible",
    "contact.form.name": "Name",
    "contact.form.name.placeholder": "Your name",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "your@email.com",
    "contact.form.subject": "Subject",
    "contact.form.subject.placeholder": "What's this about?",
    "contact.form.message": "Message",
    "contact.form.message.placeholder": "Tell us about your project...",
    "contact.form.submit": "Send Message",
    "contact.form.success": "Thank you for your message! We'll get back to you soon.",
    
    // Footer
    "footer.tagline": "Mexico City's premier tech integrator, transforming businesses through innovative software development, AI research, and intelligent automation.",
    "footer.links.title": "Quick Links",
    "footer.contact.title": "Contact",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.es] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

