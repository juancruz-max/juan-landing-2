import { useState, useEffect } from "react";
import EditorButtons from "./EditorButtons";

interface PricingCTA {
  text: string;
  url: string;
}

interface LimitedOffer {
  remainingSpots: number;
  currentPrice: string;
  futurePrice: string;
  originalPrice: string;
  urgencyText: string;
  isActive?: boolean;
}

interface PricingContent {
  title: string;
  note: string;
  cta: PricingCTA;
  limitedOffer?: LimitedOffer;
}

export default function PricingEditor() {
  const [content, setContent] = useState<PricingContent>({
    title: "",
    note: "",
    cta: { text: "", url: "" },
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content/pricing")
      .then((res) => res.json())
      .then((data) => {
        const processedData = {
          ...data,
          title: data.title || "",
          price: data.price || "$300",
          originalPrice: data.originalPrice || "$2,197 USD",
          futurePrice: data.futurePrice || "$1,997 USD",
          note: data.note || "",
          cta: data.cta || { text: "", url: "" },
          features: data.features || [],
          limitedOffer: data.limitedOffer || undefined
        };
        setContent(processedData);
      })
      .catch((error) => console.error("Error loading content:", error));
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/content/pricing", {
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

  const handleChange = (field: keyof PricingContent, value: any) => {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCTAChange = (field: keyof PricingCTA, value: string) => {
    setContent((prev) => ({
      ...prev,
      cta: {
        ...prev.cta,
        [field]: value,
      },
    }));
  };



  const handleLimitedOfferChange = (field: keyof LimitedOffer, value: any) => {
    setContent((prev) => ({
      ...prev,
      limitedOffer: {
        ...prev.limitedOffer || {
          remainingSpots: 0,
          currentPrice: "",
          futurePrice: "",
          originalPrice: "",
          urgencyText: "",
          isActive: false
        },
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <EditorButtons
        handleSave={handleSave}
        setIsPreviewMode={setIsPreviewMode}
        isSaving={isSaving}
        isPreviewMode={isPreviewMode}
        sectionName="Pricing Section"
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
            <label className="block text-sm font-medium mb-2">Nota</label>
            <textarea
              value={content.note}
              onChange={(e) => handleChange("note", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Nota adicional"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">CTA - Texto del Botón</label>
            <input
              type="text"
              value={content.cta?.text || ""}
              onChange={(e) => handleCTAChange("text", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ej: Quiero acceso ahora"
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

          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-bold mb-4">Oferta Limitada (Opcional)</h3>

            <div>
              <label className="block text-sm font-medium mb-2">¿Activar oferta limitada?</label>
              <input
                type="checkbox"
                checked={content.limitedOffer?.isActive || false}
                onChange={(e) => handleLimitedOfferChange("isActive", e.target.checked)}
                className="w-4 h-4"
              />
            </div>

            {content.limitedOffer?.isActive && (
              <>
        
                <div>
                  <label className="block text-sm font-medium mb-2">Precio Actual (Oferta)</label>
                  <input
                    type="text"
                    value={content.limitedOffer?.currentPrice || ""}
                    onChange={(e) => handleLimitedOfferChange("currentPrice", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Ej: $300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Precio Futuro (Oferta)</label>
                  <input
                    type="text"
                    value={content.limitedOffer?.futurePrice || ""}
                    onChange={(e) => handleLimitedOfferChange("futurePrice", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Ej: $1,997 USD"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Precio Original (Oferta)</label>
                  <input
                    type="text"
                    value={content.limitedOffer?.originalPrice || ""}
                    onChange={(e) => handleLimitedOfferChange("originalPrice", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Ej: $2,197 USD"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Texto de Urgencia</label>
                  <input
                    type="text"
                    value={content.limitedOffer?.urgencyText || ""}
                    onChange={(e) => handleLimitedOfferChange("urgencyText", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Ej: Solo para los próximos 10 estudiantes"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isPreviewMode && (
        <div className="border p-4 rounded-lg bg-gray-50">
          <h2 className="text-2xl font-bold mb-2 text-center">{content.title}</h2>
          <p className="text-center text-gray-600 mb-6">{content.note}</p>

          {content.limitedOffer && (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg border mb-6">
              <div className="text-center mb-6">
                <p className="text-gray-500 line-through mb-2">{content.limitedOffer.originalPrice}</p>
                <p className="text-5xl font-bold mb-2">{content.limitedOffer.currentPrice}</p>
                {content.limitedOffer.futurePrice && (
                  <p className="text-sm text-gray-500">Precio después: {content.limitedOffer.futurePrice}</p>
                )}
                {content.limitedOffer.urgencyText && (
                  <p className="text-red-600 font-bold text-sm mt-2">{content.limitedOffer.urgencyText}</p>
                )}
              </div>

              <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-bold mb-4">
                {content.cta?.text}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

