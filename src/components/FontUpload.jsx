import React, { useRef, useState } from "react";
import { TbCloudUpload } from "react-icons/tb";

export default function FontUpload({ onUpload }) {
  const inputRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Function to handle file upload

  const handleFile = (file) => {
    if (!file) return;

    setUploadError("");
    if (!file.name.toLowerCase().endsWith(".ttf")) {
      setUploadError("Only .ttf fonts are supported");
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = () => {
      const fontName = file.name.replace(/\.ttf$/i, "");
      const fontFace = new FontFace(fontName, `url(${reader.result})`);

      fontFace
        .load()
        .then((loadedFont) => {
          document.fonts.add(loadedFont);
          onUpload({ name: fontName, url: reader.result });
          setIsLoading(false);
        })
        .catch(() => {
          setUploadError("Failed to load font");
          setIsLoading(false);
        });
    };

    reader.onerror = () => {
      setUploadError("Error reading file");
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  // Functions to handle drag and drop events

  const handleDragEnter = (e) => {
    e.preventDefault();
    if (!isLoading) setIsDragging(true);
  };

  // Function to handle drag over event

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Function to handle drop event

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (isLoading) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
  };

  return (
    <div
      className={`border-2 border-dashed ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      } rounded-lg p-6 text-center cursor-pointer transition-colors relative ${
        isLoading ? "opacity-75 pointer-events-none" : "hover:bg-gray-50"
      }`}
      onClick={() => !isLoading && inputRef.current.click()}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-gray-400">
          {isLoading ? (
            <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent rounded-full" />
          ) : (
            <TbCloudUpload className="w-8 h-8" />
          )}
        </div>

        <div className="space-y-1">
          <p className="text-gray-600 font-medium">
            {isLoading
              ? "Uploading..."
              : isDragging
              ? "Drop to upload"
              : "Click or drag to upload"}
          </p>
          <p className="text-sm text-gray-400">.ttf files only</p>
        </div>

        {uploadError && (
          <p className="text-red-500 text-sm absolute bottom-2">
            {uploadError}
          </p>
        )}

        <input
          type="file"
          accept=".ttf"
          className="hidden"
          ref={inputRef}
          onChange={(e) => handleFile(e.target.files[0])}
          onClick={(e) => (e.target.value = null)}
        />
      </div>
    </div>
  );
}
