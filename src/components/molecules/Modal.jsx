import React, { useEffect } from "react";

const Modal = ({ open, onClose, title, children, maxWidth = "lg" }) => {
  useEffect(() => {
    if (!open) return;

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    full: "max-w-full"
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4" 
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded shadow w-full ${maxWidthClasses[maxWidth]} relative max-h-[90vh] flex flex-col`} 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          title="Закрыть"
        >
          ×
        </button>
        <div className="px-8 pt-8">
          {title && <h2 className="text-xl font-bold mb-6">{title}</h2>}
        </div>
        <div className="px-8 pb-8 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal; 