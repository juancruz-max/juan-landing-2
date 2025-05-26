import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface Stat {
  label: string;
  value: string;
}

interface ServiceItem {
  title: string;
  description: string;
  features: string[];
  exampleTitle?: string;
  exampleContent?: string;
  stats?: Stat[];
}

interface ServicesContent {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export default function ServicesEditor() {
  const [content, setContent] = useState<ServicesContent>({
    title: "",
    subtitle: "",
    items: [],
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar el contenido actual
    fetch("/api/content/services")
      .then((res) => res.json())
      .then((data) => {
        // Asegurarse de que cada servicio tenga un array de características y todos los campos estén inicializados
        const processedData = {
          ...data,
          title: data.title || "",
          subtitle: data.subtitle || "",
          items: data.items ? data.items.map((item: ServiceItem) => ({
            ...item,
            title: item.title || "",
            description: item.description || "",
            features: item.features || []
          })) : []
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/services", {
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

  const handleChange = (field: keyof ServicesContent, value: any) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleServiceChange = (
    index: number,
    field: keyof ServiceItem,
    value: any
  ) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleFeatureChange = (
    serviceIndex: number,
    featureIndex: number,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === serviceIndex
          ? {
              ...item,
              features: item.features.map((feature, j) =>
                j === featureIndex ? value : feature
              ),
            }
          : item
      ),
    }));
  };

  const handleAddService = () => {
    setContent((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          title: "",
          description: "",
          features: [],
          exampleTitle: "Ejemplo de mensaje",
          exampleContent: "",
          stats: [
            { label: "", value: "" },
            { label: "", value: "" }
          ]
        },
      ],
    }));
  };

  const handleRemoveService = (index: number) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleMoveServiceUp = (index: number) => {
    if (index === 0) return;

    setContent((prev) => {
      const newItems = [...prev.items];
      const temp = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = temp;
      return { ...prev, items: newItems };
    });
  };

  const handleMoveServiceDown = (index: number) => {
    setContent((prev) => {
      if (index === prev.items.length - 1) return prev;

      const newItems = [...prev.items];
      const temp = newItems[index];
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = temp;
      return { ...prev, items: newItems };
    });
  };

  const handleAddFeature = (serviceIndex: number) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === serviceIndex
          ? { ...item, features: [...item.features, ""] }
          : item
      ),
    }));
  };

  const handleRemoveFeature = (serviceIndex: number, featureIndex: number) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === serviceIndex
          ? {
              ...item,
              features: item.features.filter((_, j) => j !== featureIndex),
            }
          : item
      ),
    }));
  };

  const handleMoveFeatureUp = (serviceIndex: number, featureIndex: number) => {
    if (featureIndex === 0) return;

    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => {
        if (i !== serviceIndex) return item;

        const newFeatures = [...item.features];
        const temp = newFeatures[featureIndex];
        newFeatures[featureIndex] = newFeatures[featureIndex - 1];
        newFeatures[featureIndex - 1] = temp;

        return { ...item, features: newFeatures };
      }),
    }));
  };

  const handleMoveFeatureDown = (serviceIndex: number, featureIndex: number) => {
    setContent((prev) => {
      const service = prev.items[serviceIndex];
      if (featureIndex === service.features.length - 1) return prev;

      return {
        ...prev,
        items: prev.items.map((item, i) => {
          if (i !== serviceIndex) return item;

          const newFeatures = [...item.features];
          const temp = newFeatures[featureIndex];
          newFeatures[featureIndex] = newFeatures[featureIndex + 1];
          newFeatures[featureIndex + 1] = temp;

          return { ...item, features: newFeatures };
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
          sectionName="Services Section"
        />

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-3">{content.title}</h2>
          <p className="text-xl text-gray-600 mb-8">{content.subtitle}</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.items.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                {/* Ejemplo de mensaje */}
                <div className="bg-gray-100 p-3 rounded-lg mb-4">
                  <p className="text-sm font-medium text-blue-600 mb-1">
                    {service.exampleTitle || "Ejemplo"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {service.exampleContent || ""}
                  </p>
                </div>

                {/* Estadísticas */}
                {service.stats && service.stats.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {service.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center">
                        <p className="text-lg font-bold text-blue-600">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}
                <ul className="space-y-2">
                  {(service.features || []).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <span className="text-blue-500">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
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
        sectionName="Services Section"
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
            <h3 className="text-lg font-medium text-gray-900">Servicios</h3>
            <button
              onClick={handleAddService}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
            >
              + Agregar Servicio
            </button>
          </div>

          {content.items.map((service, serviceIndex) => (
            <div
              key={serviceIndex}
              className="bg-gray-50 p-4 rounded-lg space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    Servicio {serviceIndex + 1}
                  </h4>
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      onClick={() => handleMoveServiceUp(serviceIndex)}
                      disabled={serviceIndex === 0}
                      className={`inline-flex items-center px-2 py-1 text-xs border border-gray-300 rounded-md ${
                        serviceIndex === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveServiceDown(serviceIndex)}
                      disabled={serviceIndex === content.items.length - 1}
                      className={`inline-flex items-center px-2 py-1 text-xs border border-gray-300 rounded-md ${
                        serviceIndex === content.items.length - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      ↓
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveService(serviceIndex)}
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
                  value={service.title}
                  onChange={(e) =>
                    handleServiceChange(serviceIndex, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={service.description}
                  onChange={(e) =>
                    handleServiceChange(
                      serviceIndex,
                      "description",
                      e.target.value
                    )
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título del Ejemplo
                </label>
                <input
                  type="text"
                  value={service.exampleTitle || ""}
                  onChange={(e) =>
                    handleServiceChange(
                      serviceIndex,
                      "exampleTitle",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenido del Ejemplo
                </label>
                <textarea
                  value={service.exampleContent || ""}
                  onChange={(e) =>
                    handleServiceChange(
                      serviceIndex,
                      "exampleContent",
                      e.target.value
                    )
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Estadísticas
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {(service.stats || []).map((stat, statIndex) => (
                    <div key={statIndex} className="space-y-2">
                      <input
                        type="text"
                        placeholder="Etiqueta"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...(service.stats || [])];
                          newStats[statIndex] = {
                            ...newStats[statIndex],
                            label: e.target.value
                          };
                          handleServiceChange(
                            serviceIndex,
                            "stats",
                            newStats
                          );
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Valor"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...(service.stats || [])];
                          newStats[statIndex] = {
                            ...newStats[statIndex],
                            value: e.target.value
                          };
                          handleServiceChange(
                            serviceIndex,
                            "stats",
                            newStats
                          );
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>


              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Características
                  </label>
                  <button
                    onClick={() => handleAddFeature(serviceIndex)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Agregar Característica
                  </button>
                </div>

                {(service.features || []).map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex gap-2">
                    <div className="flex flex-col justify-center space-y-1 mr-1">
                      <button
                        type="button"
                        onClick={() => handleMoveFeatureUp(serviceIndex, featureIndex)}
                        disabled={featureIndex === 0}
                        className={`inline-flex items-center justify-center w-5 h-5 text-xs border border-gray-300 rounded-md ${
                          featureIndex === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveFeatureDown(serviceIndex, featureIndex)}
                        disabled={featureIndex === (service.features || []).length - 1}
                        className={`inline-flex items-center justify-center w-5 h-5 text-xs border border-gray-300 rounded-md ${
                          featureIndex === (service.features || []).length - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        ↓
                      </button>
                    </div>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(
                          serviceIndex,
                          featureIndex,
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() =>
                        handleRemoveFeature(serviceIndex, featureIndex)
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
