import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface FooterContent {
  companyName: string;
  email: string;
  socialLinks: {
    linkedin: string;
  };
}

export default function FooterEditor() {
  const [content, setContent] = useState<FooterContent>({
    companyName: "Cromax",
    email: "contacto@cromax.io",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/cromax"
    }
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar el contenido actual
    fetch("/api/content/footer")
      .then((res) => res.json())
      .then((data) => {
        // Asegurarse de que todos los campos estén inicializados correctamente
        const processedData = {
          ...data,
          companyName: data.companyName || "Cromax",
          email: data.email || "contacto@cromax.io",
          socialLinks: {
            linkedin: data.socialLinks?.linkedin || "https://www.linkedin.com/company/cromax"
          }
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/footer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        alert("Contenido guardado exitosamente");
      } else {
        throw new Error("Error al guardar");
      }
    } catch (error) {
      alert("Error al guardar el contenido");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof FooterContent, value: string) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialLinkChange = (field: keyof FooterContent["socialLinks"], value: string) => {
    setContent((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [field]: value
      }
    }));
  };

  if (isPreviewMode) {
    return (
      <div className="space-y-6">
        <EditorButtons
          isPreviewMode={isPreviewMode}
          setIsPreviewMode={setIsPreviewMode}
          handleSave={handleSave}
          isSaving={isSaving}
          sectionName="Footer"
        />

        <div className="bg-white text-gray-800 p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-lg mr-2"></div>
              <span className="font-medium">{content.companyName}</span>
              <a href={content.socialLinks.linkedin} className="ml-2 text-blue-600">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>

            <nav>
              <ul className="flex gap-4">
                <li><a href="#" className="text-sm text-gray-500">Inicio</a></li>
                <li><a href="#methodology" className="text-sm text-gray-500">Metodología</a></li>
                <li><a href="#services" className="text-sm text-gray-500">Servicios</a></li>
                <li><a href="#about" className="text-sm text-gray-500">About</a></li>
                <li><a href="#testimonials" className="text-sm text-gray-500">Testimonios</a></li>
              </ul>
            </nav>

            <a href={`mailto:${content.email}`} className="text-sm text-gray-500">
              {content.email}
            </a>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} {content.companyName}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <EditorButtons
        isPreviewMode={isPreviewMode}
        setIsPreviewMode={setIsPreviewMode}
        handleSave={handleSave}
        isSaving={isSaving}
        sectionName="Footer"
      />

      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Información de la Empresa</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Empresa
            </label>
            <input
              type="text"
              value={content.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={content.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Redes Sociales</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              type="url"
              value={content.socialLinks.linkedin}
              onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://www.linkedin.com/company/tu-empresa"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
