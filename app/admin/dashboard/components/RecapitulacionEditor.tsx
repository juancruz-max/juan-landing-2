import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface RecapItem {
  title: string;
  price: number;
  description: string;
}

interface RecapitulacionCTA {
  text: string;
  url: string;
}

interface RecapitulacionContent {
  title: string;
  subtitle: string;
  modules: RecapItem[];
  extras: RecapItem[];
  totalPrice: number;
  finalPrice: number;
  futurePrice?: number;
  priceNote?: string;
  cta: RecapitulacionCTA;
}

export default function RecapitulacionEditor() {
  const [content, setContent] = useState<RecapitulacionContent>({
    title: "",
    subtitle: "",
    modules: [],
    extras: [],
    totalPrice: 0,
    finalPrice: 0,
    futurePrice: 0,
    priceNote: "",
    cta: { text: "", url: "" },
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content/recapitulacion")
      .then((res) => res.json())
      .then((data) => {
        const processedData = {
          ...data,
          title: data.title || "",
          subtitle: data.subtitle || "",
          modules: data.modules || [],
          extras: data.extras || [],
          totalPrice: data.totalPrice || 0,
          finalPrice: data.finalPrice || 0,
          futurePrice: data.futurePrice || 0,
          priceNote: data.priceNote || "",
          cta: data.cta || { text: "", url: "" }
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/recapitulacion", {
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

  const handleChange = (field: keyof RecapitulacionContent, value: any) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCTAChange = (field: keyof RecapitulacionCTA, value: string) => {
    setContent((prev) => ({
      ...prev,
      cta: {
        ...prev.cta,
        [field]: value,
      },
    }));
  };

  const handleModuleChange = (
    index: number,
    field: keyof RecapItem,
    value: any
  ) => {
    setContent((prev) => ({
      ...prev,
      modules: prev.modules.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleExtraChange = (
    index: number,
    field: keyof RecapItem,
    value: any
  ) => {
    setContent((prev) => ({
      ...prev,
      extras: prev.extras.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddModule = () => {
    setContent((prev) => ({
      ...prev,
      modules: [...prev.modules, { title: "", price: 0, description: "" }],
    }));
  };

  const handleAddExtra = () => {
    setContent((prev) => ({
      ...prev,
      extras: [...prev.extras, { title: "", price: 0, description: "" }],
    }));
  };

  const handleRemoveModule = (index: number) => {
    setContent((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveExtra = (index: number) => {
    setContent((prev) => ({
      ...prev,
      extras: prev.extras.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <EditorButtons
        handleSave={handleSave}
        setIsPreviewMode={setIsPreviewMode}
        isSaving={isSaving}
        isPreviewMode={isPreviewMode}
        sectionName="Recapitulacion Section"
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
            <label className="block text-sm font-medium mb-2">Subtítulo</label>
            <input
              type="text"
              value={content.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Subtítulo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Precio Total</label>
            <input
              type="number"
              value={content.totalPrice}
              onChange={(e) => handleChange("totalPrice", parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Precio total"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Precio Final</label>
            <input
              type="number"
              value={content.finalPrice}
              onChange={(e) => handleChange("finalPrice", parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Precio final"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Precio Futuro</label>
            <input
              type="number"
              value={content.futurePrice || 0}
              onChange={(e) => handleChange("futurePrice", parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Precio futuro"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Nota de Precio</label>
            <input
              type="text"
              value={content.priceNote || ""}
              onChange={(e) => handleChange("priceNote", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Nota adicional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">CTA - Texto</label>
            <input
              type="text"
              value={content.cta?.text || ""}
              onChange={(e) => handleCTAChange("text", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Texto del botón"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">CTA - URL</label>
            <input
              type="text"
              value={content.cta?.url || ""}
              onChange={(e) => handleCTAChange("url", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://..."
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Módulos</label>
              <button
                onClick={handleAddModule}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                + Agregar Módulo
              </button>
            </div>

            {content.modules.map((item, index) => (
              <div key={index} className="border p-4 rounded-lg mb-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Módulo {index + 1}</h4>
                  <button
                    onClick={() => handleRemoveModule(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Eliminar
                  </button>
                </div>

                <input
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    handleModuleChange(index, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Título"
                />

                <input
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    handleModuleChange(index, "price", parseInt(e.target.value))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Precio"
                />

                <textarea
                  value={item.description}
                  onChange={(e) =>
                    handleModuleChange(index, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Descripción"
                  rows={3}
                />
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Extras</label>
              <button
                onClick={handleAddExtra}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                + Agregar Extra
              </button>
            </div>

            {content.extras.map((item, index) => (
              <div key={index} className="border p-4 rounded-lg mb-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Extra {index + 1}</h4>
                  <button
                    onClick={() => handleRemoveExtra(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Eliminar
                  </button>
                </div>

                <input
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    handleExtraChange(index, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Título"
                />

                <input
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    handleExtraChange(index, "price", parseInt(e.target.value))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Precio"
                />

                <textarea
                  value={item.description}
                  onChange={(e) =>
                    handleExtraChange(index, "description", e.target.value)
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
          <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
          <p className="text-gray-600 mb-4">{content.subtitle}</p>

          <div className="space-y-4 mb-6">
            <h3 className="font-bold">Módulos:</h3>
            {content.modules.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <div className="flex justify-between">
                  <h4 className="font-bold">{item.title}</h4>
                  <span className="font-bold">${item.price}</span>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="font-bold">Extras:</h3>
            {content.extras.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <div className="flex justify-between">
                  <h4 className="font-bold">{item.title}</h4>
                  <span className="font-bold">${item.price}</span>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-sm mb-2">Valor total: ${content.totalPrice}</p>
            <p className="text-2xl font-bold mb-2">Hoy: ${content.finalPrice}</p>
            {content.futurePrice && (
              <p className="text-sm text-gray-600">Precio después: ${content.futurePrice}</p>
            )}
            {content.priceNote && (
              <p className="text-xs text-gray-600 mt-2">{content.priceNote}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

