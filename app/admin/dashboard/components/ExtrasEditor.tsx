import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface Extra {
  title: string;
  description: string;
}

interface ExtrasContent {
  title: string;
  items: Extra[];
}

export default function ExtrasEditor() {
  const [content, setContent] = useState<ExtrasContent>({
    title: "",
    items: [],
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content/extras")
      .then((res) => res.json())
      .then((data) => {
        const processedData = {
          ...data,
          title: data.title || "",
          items: data.items ? data.items.map((item: Extra) => ({
            ...item,
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
      const response = await fetch("/api/content/extras", {
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

  const handleChange = (field: keyof ExtrasContent, value: any) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemChange = (
    index: number,
    field: keyof Extra,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddItem = () => {
    setContent((prev) => ({
      ...prev,
      items: [...prev.items, { title: "", description: "" }],
    }));
  };

  const handleRemoveItem = (index: number) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <EditorButtons
        handleSave={handleSave}
        setIsPreviewMode={setIsPreviewMode}
        isSaving={isSaving}
        isPreviewMode={isPreviewMode}
        sectionName="Extras Section"
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
              <label className="block text-sm font-medium">Items</label>
              <button
                onClick={handleAddItem}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                + Agregar Item
              </button>
            </div>

            {content.items.map((item, index) => (
              <div key={index} className="border p-4 rounded-lg mb-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Item {index + 1}</h4>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Eliminar
                  </button>
                </div>

                <input
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    handleItemChange(index, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Título"
                />

                <textarea
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.items.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

