import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Table from "@editorjs/table";
import Delimiter from "@editorjs/delimiter";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
// import List from "@editorjs/list";
// import Quote from "@editorjs/quote";
// import Warning from "@editorjs/warning";
// import ImageTool from "@editorjs/image";
// import Embed from "@editorjs/embed";
// import LinkTool from "@editorjs/link";
// import Checklist from "@editorjs/checklist";
// import Marker from "@editorjs/marker";

export const EDITOR_JS_TOOLS = {
    header: {
        class: Header,
        inlineToolbar: ["marker", "link"],
        config: {
            levels: [1, 2, 3, 4],
            defaultLevel: 2,
        },
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },
    // list: {
    //     class: List,
    //     inlineToolbar: true,
    // },
    // image: {
    //   class: ImageTool,
    //   config: {
    //     endpoints: {
    //       byFile: "http://localhost:3000/uploadFile", // Your backend endpoint for file uploads
    //       byUrl: "http://localhost:3000/fetchUrl", // Your backend endpoint for URL-based images
    //     },
    //   },
    // },
    table: {
        class: Table,
        inlineToolbar: true,
        config: {
            rows: 2,
            cols: 3,
        },
    },
    // embed: {
    //     class: Embed,
    //     config: {
    //         services: {
    //             youtube: true,
    //             twitter: true,
    //             instagram: true,
    //             codepen: true,
    //         },
    //     },
    // },
    // quote: {
    //     class: Quote,
    //     inlineToolbar: true,
    //     config: {
    //         quotePlaceholder: "Enter a quote",
    //         captionPlaceholder: "Author",
    //     },
    // },
    delimiter: Delimiter, // A simple horizontal line
    // warning: {
    //     class: Warning,
    //     config: {
    //         titlePlaceholder: "Title",
    //         messagePlaceholder: "Message",
    //     },
    // },
    code: Code, // Code block
    // marker: Marker, // Highlight text
    inlineCode: InlineCode, // Inline code snippets
};
