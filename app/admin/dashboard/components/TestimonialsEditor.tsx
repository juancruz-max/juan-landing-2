import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  thumbnail: string;
  authorImage: string;
  companyLogo: string;
  linkedinUrl: string;
  profileUrl: string;
  testimonial?: string;
  showVideo?: boolean;
}

interface TestimonialsContent {
  title: string;
  subtitle: string;
  viewText: string;
  items: TestimonialItem[];
}

export default function TestimonialsEditor() {
  const [content, setContent] = useState<TestimonialsContent>({
    title: "",
    subtitle: "",
    viewText: "",
    items: [],
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Cargar el contenido actual
    fetch("/api/content/testimonials")
      .then((res) => res.json())
      .then((data) => {
        // Asegurarse de que todos los campos estén inicializados correctamente
        const processedData = {
          ...data,
          items: data.items.map((item: TestimonialItem) => ({
            ...item,
            testimonial: item.testimonial || "",
            showVideo: item.showVideo || false
          }))
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/testimonials", {
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

  const handleChange = (field: keyof TestimonialsContent, value: any) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTestimonialChange = (
    index: number,
    field: keyof TestimonialItem,
    value: string | boolean
  ) => {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddTestimonial = () => {
    setContent((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          quote: "",
          author: "",
          role: "",
          thumbnail: "",
          authorImage: "",
          companyLogo: "",
          linkedinUrl: "",
          profileUrl: "",
          testimonial: "",
          showVideo: false,
        },
      ],
    }));
  };

  const handleRemoveTestimonial = (index: number) => {
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
          sectionName="Testimonials Section"
        />

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-3">{content.title}</h2>
          <p className="text-lg text-gray-600 mb-6">{content.subtitle}</p>
          <div className="grid gap-6 md:grid-cols-2">
            {content.items.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                  {testimonial.thumbnail && (
                    <div className="mb-4 relative aspect-video">
                      <img
                        src={testimonial.thumbnail}
                        alt={`${testimonial.author} company`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <p className="text-gray-600 italic mb-4">
                    {testimonial.quote}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {testimonial.authorImage && (
                    <img
                      src={testimonial.authorImage}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.author}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                  {testimonial.testimonial && (
                    <a
                      href={testimonial.testimonial}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm ml-auto"
                    >
                      {content.viewText}
                    </a>
                  )}
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
        sectionName="Testimonials Section"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Texto para Ver Testimonio
          </label>
          <input
            type="text"
            value={content.viewText}
            onChange={(e) => handleChange("viewText", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Testimonios</h3>
            <button
              onClick={handleAddTestimonial}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
            >
              + Agregar Testimonio
            </button>
          </div>

          {content.items.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    Testimonio {index + 1}
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
                  onClick={() => handleRemoveTestimonial(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonio
                </label>
                <textarea
                  value={testimonial.quote}
                  onChange={(e) =>
                    handleTestimonialChange(index, "quote", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Autor
                </label>
                <input
                  type="text"
                  value={testimonial.author}
                  onChange={(e) =>
                    handleTestimonialChange(index, "author", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cargo
                </label>
                <input
                  type="text"
                  value={testimonial.role}
                  onChange={(e) =>
                    handleTestimonialChange(index, "role", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL de la Imagen de Miniatura
                </label>
                <input
                  type="text"
                  value={testimonial.thumbnail}
                  onChange={(e) =>
                    handleTestimonialChange(index, "thumbnail", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="/testimonials/ejemplo.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL de la Imagen del Autor
                </label>
                <input
                  type="text"
                  value={testimonial.authorImage}
                  onChange={(e) =>
                    handleTestimonialChange(index, "authorImage", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="/testimonials/autor.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL del Logo de la Empresa
                </label>
                <input
                  type="text"
                  value={testimonial.companyLogo}
                  onChange={(e) =>
                    handleTestimonialChange(index, "companyLogo", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="/testimonials/logo.png"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL de LinkedIn de la Empresa
                </label>
                <input
                  type="text"
                  value={testimonial.linkedinUrl}
                  onChange={(e) =>
                    handleTestimonialChange(index, "linkedinUrl", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://www.linkedin.com/company/ejemplo/"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL del Perfil del Autor
                </label>
                <input
                  type="text"
                  value={testimonial.profileUrl}
                  onChange={(e) =>
                    handleTestimonialChange(index, "profileUrl", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://www.linkedin.com/in/ejemplo/"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL del Testimonio
                </label>
                <input
                  type="text"
                  value={testimonial.testimonial || ""}
                  onChange={(e) =>
                    handleTestimonialChange(index, "testimonial", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://www.linkedin.com/feed/update/urn:li:activity:123456/"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`showVideo-${index}`}
                  checked={testimonial.showVideo || false}
                  onChange={(e) =>
                    handleTestimonialChange(index, "showVideo", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`showVideo-${index}`} className="ml-2 block text-sm text-gray-900">
                  Mostrar Video
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
