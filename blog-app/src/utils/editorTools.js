import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Table from "@editorjs/table";
import Delimiter from "@editorjs/delimiter";
import Code from "@editorjs/code";

export const EDITOR_JS_TOOLS = {
    header: {
        class: Header,
        config: {
            levels: [1, 2, 3, 4],
            defaultLevel: 2,
        },
    },
    paragraph: {
        class: Paragraph,
    },
    table: {
        class: Table,
        config: {
            rows: 2,
            cols: 3,
        },
    },
    delimiter: Delimiter, // A simple horizontal line
    code: Code, // Code block
};
