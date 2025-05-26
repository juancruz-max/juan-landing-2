"use client";

import { useState, useEffect } from "react";
import { Content } from "../../types/content";
import content from "@/data/content.json";

export default function AdminPage() {
  const [formData, setFormData] = useState<Content>(content as Content);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/update-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save content");
      }

      setMessage("Content saved successfully!");
    } catch (error) {
      setMessage("Error saving content. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (section: keyof Content, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

        {message && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              message.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hero Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.hero.title}
                  onChange={(e) =>
                    handleChange("hero", "title", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.hero.subtitle}
                  onChange={(e) =>
                    handleChange("hero", "subtitle", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CTA Text
                </label>
                <input
                  type="text"
                  value={formData.hero.cta}
                  onChange={(e) => handleChange("hero", "cta", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CTA Link
                </label>
                <input
                  type="text"
                  value={formData.hero.ctaLink}
                  onChange={(e) =>
                    handleChange("hero", "ctaLink", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Add more sections here */}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
