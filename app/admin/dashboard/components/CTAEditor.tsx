import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface CTAContent {
  title: string;
  subtitle: string;
  button: string;
  link: string;
}

export default function CTAEditor() {
  const [content, setContent] = useState<CTAContent>({
    title: "",
    subtitle: "",
    button: "",
    link: "",
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar el contenido actual
    fetch("/api/content/cta")
      .then((res) => res.json())
      .then((data) => {
        // Asegurarse de que todos los campos estén inicializados correctamente
        const processedData = {
          ...data,
          title: data.title || "",
          subtitle: data.subtitle || "",
          button: data.button || "",
          link: data.link || ""
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/cta", {
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

  const handleChange = (field: keyof CTAContent, value: string) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
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
          sectionName="CTA Section"
        />

        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="w-full">
              <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
              <p className="text-gray-600 mb-6">{content.subtitle}</p>
              <div className="flex justify-center">
                <a
                  href={content.link}
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                >
                  {content.button}
                </a>
              </div>
            </div>
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
        sectionName="CTA Section"
      />

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            value={content.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtítulo
          </label>
          <textarea
            value={content.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Texto del Botón
          </label>
          <input
            type="text"
            value={content.button}
            onChange={(e) => handleChange("button", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            El botón abrirá el formulario de contacto directamente en la página.
          </p>
        </div>
      </div>
    </div>
  );
}
