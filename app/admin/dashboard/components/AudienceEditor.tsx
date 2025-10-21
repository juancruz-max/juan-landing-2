import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface AudienceColumn {
  subtitle: string;
  points: string[];
}

interface AudienceContent {
  title: string;
  columns: AudienceColumn[];
}

export default function AudienceEditor() {
  const [content, setContent] = useState<AudienceContent>({
    title: "",
    columns: [],
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content/audience")
      .then((res) => res.json())
      .then((data) => {
        const processedData = {
          ...data,
          title: data.title || "",
          columns: data.columns ? data.columns.map((col: AudienceColumn) => ({
            ...col,
            subtitle: col.subtitle || "",
            points: col.points || []
          })) : []
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/audience", {
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

  const handleChange = (field: keyof AudienceContent, value: any) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleColumnChange = (
    index: number,
    field: keyof AudienceColumn,
    value: any
  ) => {
    setContent((prev) => ({
      ...prev,
      columns: prev.columns.map((col, i) =>
        i === index ? { ...col, [field]: value } : col
      ),
    }));
  };

  const handleAddColumn = () => {
    setContent((prev) => ({
      ...prev,
      columns: [...prev.columns, { subtitle: "", points: [] }],
    }));
  };

  const handleRemoveColumn = (index: number) => {
    setContent((prev) => ({
      ...prev,
      columns: prev.columns.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <EditorButtons
        handleSave={handleSave}
        setIsPreviewMode={setIsPreviewMode}
        isSaving={isSaving}
        isPreviewMode={isPreviewMode}
        sectionName="Audience Section"
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
              <label className="block text-sm font-medium">Columnas</label>
              <button
                onClick={handleAddColumn}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                + Agregar Columna
              </button>
            </div>

            {content.columns.map((column, index) => (
              <div key={index} className="border p-4 rounded-lg mb-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Columna {index + 1}</h4>
                  <button
                    onClick={() => handleRemoveColumn(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Eliminar
                  </button>
                </div>

                <input
                  type="text"
                  value={column.subtitle}
                  onChange={(e) =>
                    handleColumnChange(index, "subtitle", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Subtítulo"
                />

                <textarea
                  value={column.points.join("\n")}
                  onChange={(e) =>
                    handleColumnChange(
                      index,
                      "points",
                      e.target.value.split("\n").filter((p) => p.trim())
                    )
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Puntos (uno por línea)"
                  rows={4}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {isPreviewMode && (
        <div className="border p-4 rounded-lg bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.columns.map((column, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <h3 className="font-bold mb-2">{column.subtitle}</h3>
                <ul className="space-y-1">
                  {column.points.map((point, i) => (
                    <li key={i} className="text-sm">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

