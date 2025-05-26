import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface AboutContent {
  title: string;
  company: {
    title: string;
    description: string[];
    commitment: string;
    tags: string[];
  };
  founder: {
    name: string;
    role: string;
    description: string;
    tags: string[];
  };
}

export default function AboutEditor() {
  const [content, setContent] = useState<AboutContent>({
    title: "Quiénes Somos",
    company: {
      title: "Especialistas en Prospección B2B para Empresas de TI",
      description: [
        "En Cromax, acompañamos a empresas de tecnología y software, que ya cuentan con una base de clientes, a eliminar su dependencia de referidos y expandirse a nuevos mercados.",
        "Nos enfocamos en construir sistemas de prospección efectivos que generen entre 15 y 35 reuniones calificadas en menos de 90 días. +30 reuniones calificadas en menos de 90 días."
      ],
      commitment: "Aumentar la cantidad de reuniones con clientes potenciales, brindando un proceso estructurado que ayude a entender mejor cómo venderles y, además, transferir el know-how para que su equipo pueda seguir escalando la estrategia a largo plazo.",
      tags: ["Linkedin", "Email Masivo Personalizado", "Prospectos Calificados", "Analisis de mercado"]
    },
    founder: {
      name: "Juan Cruz Cummaudo",
      role: "Fundador & CEO",
      description: "Después de invertir más de $6,000 en capacitaciones y años de experiencia en el campo, Juan desarrolló un sistema efectivo de prospección B2B. Su experiencia y metodología son la base de Cromax, ayudando a empresas TI a conseguir reuniones calificadas de manera consistente.",
      tags: ["Especialista en Linkedin", "Lider de equipo", "Analista de negocios B2B"]
    }
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar el contenido actual
    fetch("/api/content/about")
      .then((res) => res.json())
      .then((data) => {
        // Asegurarse de que todos los campos estén inicializados correctamente
        const processedData = {
          ...data,
          title: data.title || "Quiénes Somos",
          company: {
            title: data.company?.title || "Especialistas en Prospección B2B para Empresas de TI",
            description: data.company?.description || [
              "En Cromax, acompañamos a empresas de tecnología y software, que ya cuentan con una base de clientes, a eliminar su dependencia de referidos y expandirse a nuevos mercados.",
              "Nos enfocamos en construir sistemas de prospección efectivos que generen entre 15 y 35 reuniones calificadas en menos de 90 días. +30 reuniones calificadas en menos de 90 días."
            ],
            commitment: data.company?.commitment || "Aumentar la cantidad de reuniones con clientes potenciales, brindando un proceso estructurado que ayude a entender mejor cómo venderles y, además, transferir el know-how para que su equipo pueda seguir escalando la estrategia a largo plazo.",
            tags: data.company?.tags || ["Linkedin", "Email Masivo Personalizado", "Prospectos Calificados", "Analisis de mercado"]
          },
          founder: {
            name: data.founder?.name || "Juan Cruz Cummaudo",
            role: data.founder?.role || "Fundador & CEO",
            description: data.founder?.description || "Después de invertir más de $6,000 en capacitaciones y años de experiencia en el campo, Juan desarrolló un sistema efectivo de prospección B2B. Su experiencia y metodología son la base de Cromax, ayudando a empresas TI a conseguir reuniones calificadas de manera consistente.",
            tags: data.founder?.tags || ["Especialista en Linkedin", "Lider de equipo", "Analista de negocios B2B"]
          }
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/about", {
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

  const handleChange = (field: keyof AboutContent, value: string) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCompanyChange = (field: keyof AboutContent["company"], value: any) => {
    setContent((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value,
      },
    }));
  };

  const handleFounderChange = (field: keyof AboutContent["founder"], value: any) => {
    setContent((prev) => ({
      ...prev,
      founder: {
        ...prev.founder,
        [field]: value,
      },
    }));
  };

  const handleCompanyDescriptionChange = (index: number, value: string) => {
    setContent((prev) => {
      const newDescription = [...prev.company.description];
      newDescription[index] = value;
      return {
        ...prev,
        company: {
          ...prev.company,
          description: newDescription,
        },
      };
    });
  };

  const handleAddCompanyDescription = () => {
    setContent((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        description: [...prev.company.description, ""],
      },
    }));
  };

  const handleRemoveCompanyDescription = (index: number) => {
    setContent((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        description: prev.company.description.filter((_, i) => i !== index),
      },
    }));
  };

  const handleCompanyTagChange = (index: number, value: string) => {
    setContent((prev) => {
      const newTags = [...prev.company.tags];
      newTags[index] = value;
      return {
        ...prev,
        company: {
          ...prev.company,
          tags: newTags,
        },
      };
    });
  };

  const handleAddCompanyTag = () => {
    setContent((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        tags: [...prev.company.tags, ""],
      },
    }));
  };

  const handleRemoveCompanyTag = (index: number) => {
    setContent((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        tags: prev.company.tags.filter((_, i) => i !== index),
      },
    }));
  };

  const handleFounderTagChange = (index: number, value: string) => {
    setContent((prev) => {
      const newTags = [...prev.founder.tags];
      newTags[index] = value;
      return {
        ...prev,
        founder: {
          ...prev.founder,
          tags: newTags,
        },
      };
    });
  };

  const handleAddFounderTag = () => {
    setContent((prev) => ({
      ...prev,
      founder: {
        ...prev.founder,
        tags: [...prev.founder.tags, ""],
      },
    }));
  };

  const handleRemoveFounderTag = (index: number) => {
    setContent((prev) => ({
      ...prev,
      founder: {
        ...prev.founder,
        tags: prev.founder.tags.filter((_, i) => i !== index),
      },
    }));
  };

  if (isPreviewMode) {
    return (
      <div className="space-y-6">
        <EditorButtons
          isPreviewMode={isPreviewMode}
          setIsPreviewMode={setIsPreviewMode}
          handleSave={handleSave}
          isSaving={isSaving}
          sectionName="About Section"
        />

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">{content.title}</h2>

          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-4">{content.company.title}</h3>
            <div className="space-y-4">
              {content.company.description.map((paragraph, index) => (
                <p key={index} className="text-gray-600">{paragraph}</p>
              ))}
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Nuestro compromiso:</h4>
              <p className="italic text-gray-600">"{content.company.commitment}"</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {content.company.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{content.founder.name}</h3>
            <h4 className="text-gray-700 mb-4">{content.founder.role}</h4>
            <p className="text-gray-600 mb-4">{content.founder.description}</p>
            <div className="flex flex-wrap gap-2">
              {content.founder.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
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
        sectionName="About Section"
      />

      <div className="space-y-8">
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

        {/* Empresa */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Información de la Empresa</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                value={content.company.title}
                onChange={(e) => handleCompanyChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <button
                  onClick={handleAddCompanyDescription}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Agregar Párrafo
                </button>
              </div>

              {content.company.description.map((paragraph, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <textarea
                    value={paragraph}
                    onChange={(e) => handleCompanyDescriptionChange(index, e.target.value)}
                    rows={3}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleRemoveCompanyDescription(index)}
                    className="text-red-600 hover:text-red-700 px-2 self-start"
                    disabled={content.company.description.length <= 1}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Compromiso
              </label>
              <textarea
                value={content.company.commitment}
                onChange={(e) => handleCompanyChange("commitment", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Etiquetas
                </label>
                <button
                  onClick={handleAddCompanyTag}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Agregar Etiqueta
                </button>
              </div>

              <div className="space-y-2">
                {content.company.tags.map((tag, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleCompanyTagChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => handleRemoveCompanyTag(index)}
                      className="text-red-600 hover:text-red-700 px-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fundador */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Fundador</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={content.founder.name}
                onChange={(e) => handleFounderChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cargo
              </label>
              <input
                type="text"
                value={content.founder.role}
                onChange={(e) => handleFounderChange("role", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                value={content.founder.description}
                onChange={(e) => handleFounderChange("description", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Etiquetas
                </label>
                <button
                  onClick={handleAddFounderTag}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Agregar Etiqueta
                </button>
              </div>

              <div className="space-y-2">
                {content.founder.tags.map((tag, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleFounderTagChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => handleRemoveFounderTag(index)}
                      className="text-red-600 hover:text-red-700 px-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
