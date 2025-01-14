import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { EDITOR_JS_TOOLS } from "../utils/editorTools";

const EditorComponent = ({ onContentChange, initialData }) => {
    const ejInstance = useRef();

    const initEditor = () => {
        const editor = new EditorJS({
            holder: "editorjs",
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
            data: initialData,
            onChange: async () => {
                let content = await editor.saver.save();

                if (onContentChange) {
                    onContentChange(content);
                }
            },
            tools: EDITOR_JS_TOOLS,
        });
    };

    // This will run only once
    useEffect(() => {
        if (ejInstance.current === null) {
            initEditor();
        }

        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        };
    }, []);

    return (
        <>
            <div id="editorjs" className="text-black"></div>
        </>
    );
};

export default EditorComponent;
