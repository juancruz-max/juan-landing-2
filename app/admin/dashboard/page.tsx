"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Importar dinámicamente los componentes de edición
const HeroEditor = dynamic(() => import("./components/HeroEditor"));
const ProblemsEditor = dynamic(() => import("./components/ProblemsEditor"));
const MethodologyEditor = dynamic(
  () => import("./components/MethodologyEditor")
);
const BenefitsEditor = dynamic(() => import("./components/BenefitsEditor"));
const ServicesEditor = dynamic(() => import("./components/ServicesEditor"));
const TestimonialsEditor = dynamic(
  () => import("./components/TestimonialsEditor")
);
const RequirementsEditor = dynamic(() => import("./components/RequirementsEditor"));
const FAQEditor = dynamic(() => import("./components/FAQEditor"));
const CalendlyEditor = dynamic(() => import("./components/CalendlyEditor"));
const CTAEditor = dynamic(() => import("./components/CTAEditor"));
const AboutEditor = dynamic(() => import("./components/AboutEditor"));
const FooterEditor = dynamic(() => import("./components/FooterEditor"));

const sections = [
  { id: "hero", name: "Hero Section", icon: "🎯" },
  { id: "problems", name: "Problems", icon: "❗" },
  { id: "methodology", name: "Methodology", icon: "📈" },
  { id: "services", name: "Services", icon: "💼" },
  { id: "about", name: "Quienes Somos", icon: "👥" },
  { id: "benefits", name: "Benefits", icon: "🏆" },
  { id: "testimonials", name: "Testimonials", icon: "💬" },
  { id: "requirements", name: "Requisitos", icon: "✅" },
  { id: "faq", name: "FAQ", icon: "❓" },
  { id: "calendly", name: "Calendly", icon: "📅" },
  { id: "cta", name: "Call to Action", icon: "📞" },
  { id: "footer", name: "Footer", icon: "🔽" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isProduction = process.env.NODE_ENV === 'production';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handlePublishChanges = async () => {
    try {
      setIsPublishing(true);
      const response = await fetch("/api/content/publish", {
        method: "POST",
      });

      const result = await response.json();

      if (response.ok) {
        if (result.warning) {
          alert(`Cambios guardados: ${result.warning}`);
        } else {
          alert("Cambios publicados exitosamente");
        }
      } else {
        throw new Error(result.error || "Error al publicar los cambios");
      }
    } catch (error) {
      alert(`Error al publicar los cambios: ${(error as Error).message}`);
      console.error("Publish error:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  // Renderizar el editor correspondiente según la sección activa
  const renderEditor = () => {
    switch (activeSection) {
      case "hero":
        return <HeroEditor />;
      case "problems":
        return <ProblemsEditor />;
      case "methodology":
        return <MethodologyEditor />;
      case "services":
        return <ServicesEditor />;
      case "about":
        return <AboutEditor />;
      case "benefits":
        return <BenefitsEditor />;
      case "testimonials":
        return <TestimonialsEditor />;
      case "requirements":
        return <RequirementsEditor />;
      case "faq":
        return <FAQEditor />;
      case "calendly":
        return <CalendlyEditor />;
      case "cta":
        return <CTAEditor />;
      case "footer":
        return <FooterEditor />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Bienvenido al Panel de Administración
            </h2>
            <p className="text-gray-600">
              Selecciona una sección del menú para comenzar a editar
            </p>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // La redirección se maneja en el useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            {!isProduction && (
              <button
                onClick={handlePublishChanges}
                disabled={isPublishing}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
              >
                {isPublishing ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Publicando...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span>Publicar Cambios</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Page Sections
                </h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex w-full items-center px-4 py-3 text-sm rounded-lg transition-colors duration-150 ${
                        activeSection === section.id
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="mr-3 text-lg">{section.icon}</span>
                      {section.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            <div className="bg-white rounded-lg shadow p-8">
              {renderEditor()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
