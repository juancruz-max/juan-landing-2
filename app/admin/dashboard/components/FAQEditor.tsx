import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQContent {
  title: string;
  subtitle?: string;
  items: FAQItem[];
}

export default function FAQEditor() {
  const [content, setContent] = useState<FAQContent>({
    title: "",
    subtitle: "",
    items: [],
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar el contenido actual
    fetch("/api/content/faq")
      .then((res) => res.json())
      .then((data) => {
        // Asegurarse de que items sea un array
        const processedData = {
          ...data,
          items: data.items ? data.items.map((item: FAQItem) => ({
            ...item,
            question: item.question || "",
            answer: item.answer || ""
          })) : []
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/faq", {
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

  const handleChange = (field: keyof FAQContent, value: any) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFAQChange = (
    index: number,
    field: keyof FAQItem,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddFAQ = () => {
    setContent((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          question: "",
          answer: "",
        },
      ],
    }));
  };

  const handleRemoveFAQ = (index: number) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;

    setContent((prev) => {
      const newItems = [...prev.items];
      const temp = newItems[index];
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = temp;
      return { ...prev, items: newItems };
    });
  };

  const handleMoveDown = (index: number) => {
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
          sectionName="FAQ Section"
        />

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-1">{content.title}</h2>
          {content.subtitle && (
            <p className="text-gray-600 mb-6">{content.subtitle}</p>
          )}
          <div className="space-y-4">
            {content.items.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
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
        sectionName="FAQ Section"
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
            Subtítulo (Opcional)
          </label>
          <input
            type="text"
            value={content.subtitle || ""}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Subtítulo de la sección"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Preguntas Frecuentes
            </h3>
            <button
              onClick={handleAddFAQ}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
            >
              + Agregar Pregunta
            </button>
          </div>

          {content.items.map((faq, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    Pregunta {index + 1}
                  </h4>
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className={`inline-flex items-center px-2 py-1 text-xs border border-gray-300 rounded-md ${
                        index === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveDown(index)}
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
                  onClick={() => handleRemoveFAQ(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pregunta
                </label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) =>
                    handleFAQChange(index, "question", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Respuesta
                </label>
                <textarea
                  value={faq.answer}
                  onChange={(e) =>
                    handleFAQChange(index, "answer", e.target.value)
                  }
                  rows={4}
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
