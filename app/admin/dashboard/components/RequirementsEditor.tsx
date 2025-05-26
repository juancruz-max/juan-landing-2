import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface RequirementItem {
  title: string;
  description: string;
}

interface RequirementsContent {
  title: string;
  subtitle: string;
  cta: string;
  items: RequirementItem[];
}

export default function RequirementsEditor() {
  const [content, setContent] = useState<RequirementsContent>({
    title: "¿Es esto para ti?",
    subtitle: "Para asegurar los mejores resultados, trabajamos solo con empresas que cumplen estos requisitos",
    cta: "Agendar Llamada",
    items: [
      {
        title: "Oferta Validada",
        description: "Tener al menos un caso de éxito comprobable"
      },
      {
        title: "Compromiso",
        description: "Disponibilidad para reuniones semanales de seguimiento"
      },
      {
        title: "LinkedIn",
        description: "Perfil con más de 300 contactos"
      }
    ]
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar el contenido actual
    fetch("/api/content/requirements")
      .then((res) => res.json())
      .then((data) => {
        // Asegurarse de que todos los campos estén inicializados correctamente
        const processedData = {
          ...data,
          title: data.title || "¿Es esto para ti?",
          subtitle: data.subtitle || "Para asegurar los mejores resultados, trabajamos solo con empresas que cumplen estos requisitos",
          cta: data.cta || "Agendar Llamada",
          items: data.items ? data.items.map((item: RequirementItem) => ({
            ...item,
            title: item.title || "",
            description: item.description || ""
          })) : [
            {
              title: "Oferta Validada",
              description: "Tener al menos un caso de éxito comprobable"
            },
            {
              title: "Compromiso",
              description: "Disponibilidad para reuniones semanales de seguimiento"
            },
            {
              title: "LinkedIn",
              description: "Perfil con más de 300 contactos"
            }
          ]
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/requirements", {
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

  const handleChange = (field: keyof RequirementsContent, value: string) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRequirementChange = (
    index: number,
    field: keyof RequirementItem,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddRequirement = () => {
    setContent((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          title: "",
          description: ""
        },
      ],
    }));
  };

  const handleRemoveRequirement = (index: number) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleMoveRequirementUp = (index: number) => {
    if (index === 0) return;

    setContent((prev) => {
      const newItems = [...prev.items];
      const temp = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = temp;
      return { ...prev, items: newItems };
    });
  };

  const handleMoveRequirementDown = (index: number) => {
    setContent((prev) => {
      if (index === prev.items.length - 1) return prev;

      const newItems = [...prev.items];
      const temp = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = temp;
      return { ...prev, items: newItems };
    });
  };

  if (isPreviewMode) {
    return (
      <div className="space-y-6">
        <EditorButtons
          isPreviewMode={isPreviewMode}
          setIsPreviewMode={setIsPreviewMode}
          handleSave={handleSave}
          isSaving={isSaving}
          sectionName="Requirements Section"
        />

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-3">{content.title}</h2>
          <p className="text-gray-600 mb-6">{content.subtitle}</p>

          <div className="space-y-4">
            {content.items.map((requirement, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">{requirement.title}</h3>
                <p className="text-gray-600">{requirement.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Si cumples con estos requisitos, agenda una llamada gratuita para
              explorar cómo podemos ayudarte
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
              {content.cta}
            </button>
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
        sectionName="Requirements Section"
      />

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título de la Sección
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
            Subtítulo de la Sección
          </label>
          <textarea
            value={content.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Texto del Botón CTA
          </label>
          <input
            type="text"
            value={content.cta}
            onChange={(e) => handleChange("cta", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Requisitos</h3>
            <button
              onClick={handleAddRequirement}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
            >
              + Agregar Requisito
            </button>
          </div>

          {content.items.map((requirement, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    Requisito {index + 1}
                  </h4>
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      onClick={() => handleMoveRequirementUp(index)}
                      disabled={index === 0}
                      className={`inline-flex items-center px-2 py-1 text-xs border border-gray-300 rounded-md ${
                        index === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveRequirementDown(index)}
                      disabled={index === content.items.length - 1}
                      className={`inline-flex items-center px-2 py-1 text-xs border border-gray-300 rounded-md ${
                        index === content.items.length - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      ↓
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveRequirement(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={requirement.title}
                  onChange={(e) =>
                    handleRequirementChange(index, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={requirement.description}
                  onChange={(e) =>
                    handleRequirementChange(index, "description", e.target.value)
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
