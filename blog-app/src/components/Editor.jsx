import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../utils/editorTools";

const EditorComponent = ({ onContentChange, initialData }) => {
  const ejInstance = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const initEditor = () => {
    // Destroy any existing editor instance before reinitializing
    if (ejInstance.current) {
      ejInstance.current.destroy();
    }

    const editor = new EditorJS({
      tools: EDITOR_JS_TOOLS,
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
        setIsLoading(false); // Editor is ready
        console.log("Editor initialized successfully");
      },
      // autofocus: true,
      data: { time: initialData.time, blocks: initialData.blocks } || {},
      onChange: async () => {
        try {
          const content = await editor.saver.save();
          if (onContentChange) {
            onContentChange(content);
          }
        } catch (error) {
          console.error("Error saving editor content:", error);
        }
      },
    });

    editor.isReady.catch((error) => {
      console.error("Editor initialization failed:", error);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    initEditor();

    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []); // Reinitialize when initialData changes

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-gray-500">Loading editor...</p>
        </div>
      )}
      <div
        id="editorjs"
        className={`text-black ${isLoading ? "hidden" : ""}`}
      ></div>
    </>
  );
};

export default EditorComponent;
