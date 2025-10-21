import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface InstructorContent {
  name: string;
  title: string;
  description: string;
  bio: string;
  image?: string;
  credentials?: string[];
  sectionTitle?: string;
  linkedinUrl?: string;
}

export default function InstructorEditor() {
  const [content, setContent] = useState<InstructorContent>({
    name: "",
    title: "",
    description: "",
    bio: "",
    image: "",
    credentials: [],
    sectionTitle: "Conoce a tu instructor",
    linkedinUrl: "https://www.linkedin.com/in/juan-cruz-cummaudo",
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content/instructor")
      .then((res) => res.json())
      .then((data) => {
        const processedData = {
          ...data,
          name: data.name || "",
          title: data.title || "",
          description: data.description || "",
          bio: data.bio || "",
          image: data.image || "",
          credentials: data.credentials || [],
          sectionTitle: data.sectionTitle || "Conoce a tu instructor",
          linkedinUrl: data.linkedinUrl || "https://www.linkedin.com/in/juan-cruz-cummaudo"
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/instructor", {
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

  const handleChange = (field: keyof InstructorContent, value: any) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <EditorButtons
        handleSave={handleSave}
        setIsPreviewMode={setIsPreviewMode}
        isSaving={isSaving}
        isPreviewMode={isPreviewMode}
        sectionName="Instructor Section"
      />

      {!isPreviewMode && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              value={content.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Nombre del instructor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Título</label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Título o posición"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea
              value={content.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Descripción del instructor (soporta **negrita**)"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Biografía</label>
            <textarea
              value={content.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Biografía del instructor"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Imagen URL</label>
            <input
              type="text"
              value={content.image}
              onChange={(e) => handleChange("image", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="URL de la imagen"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Credenciales</label>
            <textarea
              value={content.credentials?.join("\n") || ""}
              onChange={(e) =>
                handleChange(
                  "credentials",
                  e.target.value.split("\n").filter((c) => c.trim())
                )
              }
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Credenciales (una por línea)"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Título de la Sección</label>
            <input
              type="text"
              value={content.sectionTitle || ""}
              onChange={(e) => handleChange("sectionTitle", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ej: Conoce a tu instructor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">URL de LinkedIn</label>
            <input
              type="text"
              value={content.linkedinUrl || ""}
              onChange={(e) => handleChange("linkedinUrl", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://www.linkedin.com/in/..."
            />
          </div>
        </div>
      )}

      {isPreviewMode && (
        <div className="border p-4 rounded-lg bg-gray-50">
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
            {content.image && (
              <img
                src={content.image}
                alt={content.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-2xl font-bold mb-1">{content.name}</h2>
            <p className="text-gray-600 mb-4">{content.title}</p>
            <p className="text-sm mb-4">{content.bio}</p>
            {content.credentials && content.credentials.length > 0 && (
              <div>
                <h3 className="font-bold mb-2">Credenciales:</h3>
                <ul className="space-y-1">
                  {content.credentials.map((cred, i) => (
                    <li key={i} className="text-sm">
                      • {cred}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

