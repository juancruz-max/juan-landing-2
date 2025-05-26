import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface MethodologyMetric {
  value: string;
  label: string;
  color?: string;
}

interface MethodologyStep {
  title: string;
  description: string;
  items: string[];
  icon?: string;
  metric: MethodologyMetric;
}

interface MethodologyContent {
  title: string;
  subtitle: string;
  items: MethodologyStep[];
}

export default function MethodologyEditor() {
  const [content, setContent] = useState<MethodologyContent>({
    title: "",
    subtitle: "",
    items: [],
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar el contenido actual
    fetch("/api/content/methodology")
      .then((res) => res.json())
      .then((data) => {
        // Asegurarse de que cada paso tenga un array de características y métricas
        const processedData = {
          ...data,
          title: data.title || "",
          subtitle: data.subtitle || "",
          items: data.items.map((item: MethodologyStep, index: number) => ({
            ...item,
            title: item.title || "",
            description: item.description || "",
            items: item.items || [],
            icon: item.icon || "📈",
            metric: {
              value: item.metric?.value || `+${(index + 1) * 25}%`,
              label: item.metric?.label || "Mejora",
              color: item.metric?.color || "blue"
            }
          }))
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/methodology", {
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

  const handleChange = (field: keyof MethodologyContent, value: any) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStepChange = (
    index: number,
    field: keyof MethodologyStep,
    value: any
  ) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleMetricChange = (
    stepIndex: number,
    field: keyof MethodologyMetric,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === stepIndex
          ? {
              ...item,
              metric: {
                ...item.metric,
                [field]: value
              }
            }
          : item
      ),
    }));
  };

  const handleItemChange = (
    stepIndex: number,
    itemIndex: number,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === stepIndex
          ? {
              ...item,
              items: item.items.map((feature, j) =>
                j === itemIndex ? value : feature
              ),
            }
          : item
      ),
    }));
  };

  const handleAddStep = () => {
    const newIndex = content.items.length;
    setContent((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          title: "",
          description: "",
          items: [],
          icon: "📈",
          metric: {
            value: `+${(newIndex + 1) * 25}%`,
            label: "Mejora",
            color: "blue"
          }
        },
      ],
    }));
  };

  const handleRemoveStep = (index: number) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleMoveStepUp = (index: number) => {
    if (index === 0) return;

    setContent((prev) => {
      const newItems = [...prev.items];
      const temp = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = temp;
      return { ...prev, items: newItems };
    });
  };

  const handleMoveStepDown = (index: number) => {
    setContent((prev) => {
      if (index === prev.items.length - 1) return prev;

      const newItems = [...prev.items];
      const temp = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = temp;
      return { ...prev, items: newItems };
    });
  };

  const handleAddItem = (stepIndex: number) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === stepIndex ? { ...item, items: [...item.items, ""] } : item
      ),
    }));
  };

  const handleRemoveItem = (stepIndex: number, itemIndex: number) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === stepIndex
          ? {
              ...item,
              items: item.items.filter((_, j) => j !== itemIndex),
            }
          : item
      ),
    }));
  };

  const handleMoveItemUp = (stepIndex: number, itemIndex: number) => {
    if (itemIndex === 0) return;

    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => {
        if (i !== stepIndex) return item;

        const newItems = [...item.items];
        const temp = newItems[itemIndex];
        newItems[itemIndex] = newItems[itemIndex - 1];
        newItems[itemIndex - 1] = temp;

        return { ...item, items: newItems };
      }),
    }));
  };

  const handleMoveItemDown = (stepIndex: number, itemIndex: number) => {
    setContent((prev) => {
      const step = prev.items[stepIndex];
      if (itemIndex === step.items.length - 1) return prev;

      return {
        ...prev,
        items: prev.items.map((item, i) => {
          if (i !== stepIndex) return item;

          const newItems = [...item.items];
          const temp = newItems[itemIndex];
          newItems[itemIndex] = newItems[itemIndex + 1];
          newItems[itemIndex + 1] = temp;

          return { ...item, items: newItems };
        }),
      };
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
          sectionName="Methodology Section"
        />

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-3">{content.title}</h2>
          <p className="text-xl text-gray-600 mb-6">{content.subtitle}</p>
          <div className="space-y-8">
            {content.items.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{step.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {(step.items || []).map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center gap-2"
                        >
                          <span className="text-blue-500">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
        sectionName="Methodology Section"
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
          <input
            type="text"
            value={content.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Pasos de la Metodología
            </h3>
            <button
              onClick={handleAddStep}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
            >
              + Agregar Paso
            </button>
          </div>

          {content.items.map((step, stepIndex) => (
            <div
              key={stepIndex}
              className="bg-gray-50 p-4 rounded-lg space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    Paso {stepIndex + 1}
                  </h4>
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      onClick={() => handleMoveStepUp(stepIndex)}
                      disabled={stepIndex === 0}
                      className={`inline-flex items-center px-2 py-1 text-xs border border-gray-300 rounded-md ${
                        stepIndex === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveStepDown(stepIndex)}
                      disabled={stepIndex === content.items.length - 1}
                      className={`inline-flex items-center px-2 py-1 text-xs border border-gray-300 rounded-md ${
                        stepIndex === content.items.length - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      ↓
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveStep(stepIndex)}
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
                  value={step.title}
                  onChange={(e) =>
                    handleStepChange(stepIndex, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={step.description}
                  onChange={(e) =>
                    handleStepChange(stepIndex, "description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>



              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3">Tarjeta de Métrica</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valor
                    </label>
                    <input
                      type="text"
                      value={step.metric?.value || ""}
                      onChange={(e) =>
                        handleMetricChange(stepIndex, "value", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: +25%"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Etiqueta
                    </label>
                    <input
                      type="text"
                      value={step.metric?.label || ""}
                      onChange={(e) =>
                        handleMetricChange(stepIndex, "label", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ej: Mejora"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Características (Checks)
                  </label>
                  <button
                    onClick={() => handleAddItem(stepIndex)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Agregar Característica
                  </button>
                </div>

                {(step.items || []).map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2">
                    <div className="flex flex-col justify-center space-y-1 mr-1">
                      <button
                        type="button"
                        onClick={() => handleMoveItemUp(stepIndex, itemIndex)}
                        disabled={itemIndex === 0}
                        className={`inline-flex items-center justify-center w-5 h-5 text-xs border border-gray-300 rounded-md ${
                          itemIndex === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveItemDown(stepIndex, itemIndex)}
                        disabled={itemIndex === (step.items || []).length - 1}
                        className={`inline-flex items-center justify-center w-5 h-5 text-xs border border-gray-300 rounded-md ${
                          itemIndex === (step.items || []).length - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        ↓
                      </button>
                    </div>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleItemChange(
                          stepIndex,
                          itemIndex,
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() =>
                        handleRemoveItem(stepIndex, itemIndex)
                      }
                      className="text-red-600 hover:text-red-700 px-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
