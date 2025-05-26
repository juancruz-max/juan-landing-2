import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface HeroCard {
  title: string;
  subtitle: string;
}

interface HeroContent {
  title: string;
  subtitle: string;
  cta: string;
  cards: {
    profileOptimization: HeroCard;
    responseRate: HeroCard;
    testimonial: {
      text: string;
      author: string;
    };
    newConnection: HeroCard;
  };
}

export default function HeroEditor() {
  const [content, setContent] = useState<HeroContent>({
    title: "",
    subtitle: "",
    cta: "",
    cards: {
      profileOptimization: {
        title: "Perfil Optimizado",
        subtitle: "+500% visibilidad"
      },
      responseRate: {
        title: "Tasa de Respuesta",
        subtitle: "87% efectividad"
      },
      testimonial: {
        text: "Pasamos de 2 a 45 reuniones en solo 3 meses y cerramos 3 clientes nuevos",
        author: "Founder - SolvIT"
      },
      newConnection: {
        title: "Nueva Conexión",
        subtitle: "Lead Calificado"
      }
    }
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar el contenido actual
    fetch("/api/content/hero")
      .then((res) => res.json())
      .then((data) => {
        // Asegurarse de que todos los campos estén inicializados correctamente
        const processedData = {
          ...data,
          title: data.title || "",
          subtitle: data.subtitle || "",
          cta: data.cta || "",
          cards: {
            profileOptimization: {
              title: data.cards?.profileOptimization?.title || "Perfil Optimizado",
              subtitle: data.cards?.profileOptimization?.subtitle || "+500% visibilidad"
            },
            responseRate: {
              title: data.cards?.responseRate?.title || "Tasa de Respuesta",
              subtitle: data.cards?.responseRate?.subtitle || "87% efectividad"
            },
            testimonial: {
              text: data.cards?.testimonial?.text || "Pasamos de 2 a 45 reuniones en solo 3 meses y cerramos 3 clientes nuevos",
              author: data.cards?.testimonial?.author || "Founder - SolvIT"
            },
            newConnection: {
              title: data.cards?.newConnection?.title || "Nueva Conexión",
              subtitle: data.cards?.newConnection?.subtitle || "Lead Calificado"
            }
          }
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/hero", {
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

  const handleChange = (field: keyof HeroContent, value: string) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCardChange = (
    cardType: 'profileOptimization' | 'responseRate' | 'newConnection',
    field: 'title' | 'subtitle',
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      cards: {
        ...prev.cards,
        [cardType]: {
          ...prev.cards[cardType],
          [field]: value
        }
      }
    }));
  };

  const handleTestimonialChange = (
    field: 'text' | 'author',
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      cards: {
        ...prev.cards,
        testimonial: {
          ...prev.cards.testimonial,
          [field]: value
        }
      }
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
          sectionName="Hero Section"
        />

        <div className="bg-gray-50 p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{content.subtitle}</p>
          <div className="inline-block">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {content.cta}
            </button>
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
        sectionName="Hero Section"
      />

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título Principal
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
            Subtítulo
          </label>
          <input
            type="text"
            value={content.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Texto del CTA
          </label>
          <input
            type="text"
            value={content.cta}
            onChange={(e) => handleChange("cta", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>



        {/* Tarjetas pequeñas */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tarjetas Pequeñas</h3>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Perfil Optimizado</h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={content.cards.profileOptimization.title}
                  onChange={(e) => handleCardChange("profileOptimization", "title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={content.cards.profileOptimization.subtitle}
                  onChange={(e) => handleCardChange("profileOptimization", "subtitle", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Tasa de Respuesta</h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={content.cards.responseRate.title}
                  onChange={(e) => handleCardChange("responseRate", "title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={content.cards.responseRate.subtitle}
                  onChange={(e) => handleCardChange("responseRate", "subtitle", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Testimonio</h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texto
                </label>
                <textarea
                  value={content.cards.testimonial.text}
                  onChange={(e) => handleTestimonialChange("text", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Autor
                </label>
                <input
                  type="text"
                  value={content.cards.testimonial.author}
                  onChange={(e) => handleTestimonialChange("author", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Nueva Conexión</h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={content.cards.newConnection.title}
                  onChange={(e) => handleCardChange("newConnection", "title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={content.cards.newConnection.subtitle}
                  onChange={(e) => handleCardChange("newConnection", "subtitle", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
