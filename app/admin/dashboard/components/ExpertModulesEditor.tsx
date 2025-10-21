import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface Expert {
  name: string;
  title: string;
  location: string;
  image: string;
  bio: string;
  learningPoints: string[];
  finalNote: string;
  highlights?: string[];
}

interface ExpertModulesContent {
  title: string;
  subtitle: string;
  experts: Expert[];
}

export default function ExpertModulesEditor() {
  const [content, setContent] = useState<ExpertModulesContent>({
    title: "",
    subtitle: "",
    experts: [],
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content/expertModules")
      .then((res) => res.json())
      .then((data) => {
        const processedData = {
          ...data,
          title: data.title || "",
          subtitle: data.subtitle || "",
          experts: data.experts ? data.experts.map((expert: Expert) => ({
            ...expert,
            name: expert.name || "",
            title: expert.title || "",
            location: expert.location || "",
            image: expert.image || "",
            bio: expert.bio || "",
            learningPoints: expert.learningPoints || [],
            finalNote: expert.finalNote || "",
            highlights: expert.highlights || []
          })) : []
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/expertModules", {
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

  const handleChange = (field: keyof ExpertModulesContent, value: any) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExpertChange = (
    index: number,
    field: keyof Expert,
    value: any
  ) => {
    setContent((prev) => ({
      ...prev,
      experts: prev.experts.map((expert, i) =>
        i === index ? { ...expert, [field]: value } : expert
      ),
    }));
  };

  const handleAddExpert = () => {
    setContent((prev) => ({
      ...prev,
      experts: [...prev.experts, {
        name: "",
        title: "",
        location: "",
        image: "",
        bio: "",
        learningPoints: [],
        finalNote: "",
        highlights: []
      }],
    }));
  };

  const handleRemoveExpert = (index: number) => {
    setContent((prev) => ({
      ...prev,
      experts: prev.experts.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <EditorButtons
        handleSave={handleSave}
        setIsPreviewMode={setIsPreviewMode}
        isSaving={isSaving}
        isPreviewMode={isPreviewMode}
        sectionName="Expert Modules Section"
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
            <textarea
              value={content.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Subtítulo de la sección"
              rows={2}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Expertos</label>
              <button
                onClick={handleAddExpert}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                + Agregar Experto
              </button>
            </div>

            {content.experts.map((expert, index) => (
              <div key={index} className="border p-4 rounded-lg mb-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Experto {index + 1}</h4>
                  <button
                    onClick={() => handleRemoveExpert(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Eliminar
                  </button>
                </div>

                <input
                  type="text"
                  value={expert.name}
                  onChange={(e) =>
                    handleExpertChange(index, "name", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Nombre"
                />

                <input
                  type="text"
                  value={expert.title}
                  onChange={(e) =>
                    handleExpertChange(index, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Título/Módulo"
                />

                <input
                  type="text"
                  value={expert.location}
                  onChange={(e) =>
                    handleExpertChange(index, "location", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Ubicación"
                />

                <input
                  type="text"
                  value={expert.image}
                  onChange={(e) =>
                    handleExpertChange(index, "image", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="URL de imagen"
                />

                <textarea
                  value={expert.bio}
                  onChange={(e) =>
                    handleExpertChange(index, "bio", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Biografía"
                  rows={3}
                />

                <textarea
                  value={expert.learningPoints.join("\n")}
                  onChange={(e) =>
                    handleExpertChange(
                      index,
                      "learningPoints",
                      e.target.value.split("\n").filter((t) => t.trim())
                    )
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Puntos de aprendizaje (uno por línea)"
                  rows={4}
                />

                <textarea
                  value={expert.finalNote}
                  onChange={(e) =>
                    handleExpertChange(index, "finalNote", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Nota final"
                  rows={2}
                />

                <textarea
                  value={expert.highlights?.join("\n") || ""}
                  onChange={(e) =>
                    handleExpertChange(
                      index,
                      "highlights",
                      e.target.value.split("\n").filter((t) => t.trim())
                    )
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Destacados (uno por línea)"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {isPreviewMode && (
        <div className="border p-4 rounded-lg bg-gray-50">
          <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
          <p className="text-sm mb-4">{content.subtitle}</p>
          <div className="space-y-4">
            {content.experts.map((expert, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <h3 className="font-bold mb-1">{expert.name}</h3>
                <p className="text-sm font-semibold mb-1">{expert.title}</p>
                <p className="text-xs mb-2">{expert.location}</p>
                <p className="text-sm mb-2">{expert.bio}</p>
                <p className="text-sm font-semibold mb-1">Aprenderás:</p>
                <ul className="space-y-1 mb-2">
                  {expert.learningPoints.map((point, i) => (
                    <li key={i} className="text-sm">
                      • {point}
                    </li>
                  ))}
                </ul>
                <p className="text-sm">{expert.finalNote}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

