import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface CalendlyContent {
  url: string;
}

export default function CalendlyEditor() {
  const [content, setContent] = useState<CalendlyContent>({
    url: "https://calendly.com/cromax/reunion-30min"
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar el contenido actual
    fetch("/api/content/calendly")
      .then((res) => res.json())
      .then((data) => {
        // Asegurarse de que todos los campos estén inicializados correctamente
        const processedData = {
          ...data,
          url: data.url || "https://calendly.com/cromax/reunion-30min"
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/calendly", {
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

  const handleChange = (field: keyof CalendlyContent, value: string) => {
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
          sectionName="Calendly Integration"
        />

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">URL de Calendly:</h3>
          <p className="text-blue-600 underline mb-6">{content.url}</p>

          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <p className="text-center text-gray-500 italic">
              Aquí se mostrará el widget de Calendly con la URL proporcionada
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
        sectionName="Calendly Integration"
      />

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL de Calendly
          </label>
          <input
            type="text"
            value={content.url}
            onChange={(e) => handleChange("url", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://calendly.com/tu-usuario/nombre-de-evento"
          />
          <p className="mt-2 text-sm text-gray-500">
            Ingresa la URL completa de tu evento de Calendly. Por ejemplo: https://calendly.com/cromax/reunion-30min
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Instrucciones:</h3>
          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
            <li>Inicia sesión en tu cuenta de Calendly</li>
            <li>Crea o selecciona el evento que deseas mostrar en tu sitio web</li>
            <li>Copia la URL del evento desde la barra de direcciones o desde la opción "Compartir"</li>
            <li>Pega la URL completa en el campo de arriba</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
