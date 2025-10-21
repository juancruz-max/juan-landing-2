import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

interface BenefitsContent {
  title: string;
  videoUrl?: string;
  items: BenefitItem[];
}

export default function BenefitsEditor() {
  const [content, setContent] = useState<BenefitsContent>({
    title: "",
    videoUrl: "",
    items: [],
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar el contenido actual
    fetch("/api/content/benefits")
      .then((res) => res.json())
      .then((data) => {
        // Asegurarse de que items sea un array y todos los campos estén inicializados
        const processedData = {
          ...data,
          title: data.title || "",
          videoUrl: data.videoUrl || "",
          items: data.items ? data.items.map((item: BenefitItem) => ({
            ...item,
            icon: item.icon || "🚀",
            title: item.title || "",
            description: item.description || ""
          })) : []
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/benefits", {
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

  const handleChange = (field: keyof BenefitsContent, value: any) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBenefitChange = (
    index: number,
    field: keyof BenefitItem,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddBenefit = () => {
    // Asignar un ícono predeterminado según el índice
    const icons = ["🚀", "🎯", "🏆", "🔄", "📊", "🎓"];
    const nextIndex = content.items.length;
    const icon = icons[nextIndex % icons.length];

    setContent((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          icon: icon,
          title: "",
          description: "",
        },
      ],
    }));
  };

  const handleRemoveBenefit = (index: number) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleMoveBenefitUp = (index: number) => {
    if (index === 0) return;

    setContent((prev) => {
      const newItems = [...prev.items];
      const temp = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = temp;
      return { ...prev, items: newItems };
    });
  };

  const handleMoveBenefitDown = (index: number) => {
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
          sectionName="Benefits Section"
        />

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">{content.title}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.items.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
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
        sectionName="Benefits Section"
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
            URL del Video (Opcional)
          </label>
          <input
            type="text"
            value={content.videoUrl || ""}
            onChange={(e) => handleChange("videoUrl", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Beneficios</h3>
            <button
              onClick={handleAddBenefit}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
            >
              + Agregar Beneficio
            </button>
          </div>

          {content.items.map((benefit, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    Beneficio {index + 1}
                  </h4>
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      onClick={() => handleMoveBenefitUp(index)}
                      disabled={index === 0}
                      className={`inline-flex items-center px-2 py-1 text-xs border border-gray-300 rounded-md ${
                        index === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveBenefitDown(index)}
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
                  onClick={() => handleRemoveBenefit(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>

              <div className="hidden">
                <input
                  type="hidden"
                  value={benefit.icon}
                  onChange={(e) =>
                    handleBenefitChange(index, "icon", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={benefit.title}
                  onChange={(e) =>
                    handleBenefitChange(index, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={benefit.description}
                  onChange={(e) =>
                    handleBenefitChange(index, "description", e.target.value)
                  }
                  rows={3}
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
