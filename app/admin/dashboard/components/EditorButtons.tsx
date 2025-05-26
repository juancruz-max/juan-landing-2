import React from 'react';

interface EditorButtonsProps {
  isPreviewMode: boolean;
  setIsPreviewMode: (value: boolean) => void;
  handleSave: () => void;
  isSaving: boolean;
  sectionName?: string;
}

const EditorButtons: React.FC<EditorButtonsProps> = ({
  isPreviewMode,
  setIsPreviewMode,
  handleSave,
  isSaving,
  sectionName = "Section"
}) => {
  const sectionTitle = isPreviewMode ? "Vista Previa" : "Editar";
  const displayName = isPreviewMode ? "" : ` ${sectionName}`;

  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-xl font-semibold text-gray-900">
        {sectionTitle}{displayName}
      </h2>
      <div className="flex space-x-3">
        {isPreviewMode ? (
          <button
            onClick={() => setIsPreviewMode(false)}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
          >
            Volver a Editar
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsPreviewMode(true)}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
            >
              Vista Previa
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center min-w-[150px]"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Guardando...</span>
                </>
              ) : (
                "Guardar Cambios"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditorButtons;
