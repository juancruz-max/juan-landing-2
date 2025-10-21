import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface Section {
  title: string;
  description: string;
}

interface ModulesContent {
  title: string;
  sections: Section[];
}

export default function ModulesEditor() {
  const [content, setContent] = useState<ModulesContent>({
    title: "",
    sections: [],
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content/modules")
      .then((res) => res.json())
      .then((data) => {
        const processedData = {
          ...data,
          title: data.title || "",
          sections: data.sections ? data.sections.map((section: Section) => ({
            ...section,
            title: section.title || "",
            description: section.description || ""
          })) : []
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const handleChange = (field: keyof ModulesContent, value: any) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSectionChange = (
    index: number,
    field: keyof Section,
    value: any
  ) => {
    setContent((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      ),
    }));
  };

  const handleAddSection = () => {
    setContent((prev) => ({
      ...prev,
      sections: [...prev.sections, { title: "", description: "" }],
    }));
  };

  const handleRemoveSection = (index: number) => {
    setContent((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <EditorButtons
        handleSave={handleSave}
        setIsPreviewMode={setIsPreviewMode}
        isSaving={isSaving}
        isPreviewMode={isPreviewMode}
        sectionName="Modules Section"
      />

      {!isPreviewMode && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Título</label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Título de la sección"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Secciones</label>
              <button
                onClick={handleAddSection}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                + Agregar Sección
              </button>
            </div>

            {content.sections.map((section, index) => (
              <div key={index} className="border p-4 rounded-lg mb-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Sección {index + 1}</h4>
                  <button
                    onClick={() => handleRemoveSection(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Eliminar
                  </button>
                </div>

                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    handleSectionChange(index, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Título de la sección"
                />

                <textarea
                  value={section.description}
                  onChange={(e) =>
                    handleSectionChange(index, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Descripción"
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {isPreviewMode && (
        <div className="border p-4 rounded-lg bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
          <div className="space-y-4">
            {content.sections.map((section, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <h3 className="font-bold mb-2">{section.title}</h3>
                <p className="text-sm mb-2">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

