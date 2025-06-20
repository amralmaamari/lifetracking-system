"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Blockquote from "@tiptap/extension-blockquote";
import Placeholder from "@tiptap/extension-placeholder";
import { lowlight } from "lowlight/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import { useEffect } from "react";

lowlight.registerLanguage("js", javascript);

// ✅ نضيف Props
interface TiptapProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TiptapEditor({ value, onChange }: TiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({ lowlight }),
      Bold,
      Italic,
      Underline,
      TextStyle,
      Color,
      Heading.configure({ levels: [1, 2] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      BulletList,
      OrderedList,
      ListItem,
      TaskList,
      TaskItem.configure({ nested: true }),
      Blockquote,
      Placeholder.configure({
        placeholder: "ابدأ الكتابة أو الصق المحتوى هنا...",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[300px] p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 rtl text-right",
        dir: "rtl",
      },
      handlePaste(view, event) {
        const html = event.clipboardData?.getData("text/html");
        const text = event.clipboardData?.getData("text/plain");
        return false;
      },
    },
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // تحديث المحتوى في حال تغيّر خارجيًا (تعديل مقال)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  const setColor = (color: string) => {
    editor?.chain().focus().setColor(color).run();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center border rounded p-2 bg-gray-50">
        <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className="btn">B</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className="btn">I</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleUnderline().run()} className="btn">U</button>

        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className="btn">H1</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className="btn">H2</button>

        <button type="button" onClick={() => editor?.chain().focus().setTextAlign("left").run()} className="btn">L</button>
        <button type="button" onClick={() => editor?.chain().focus().setTextAlign("center").run()} className="btn">C</button>
        <button type="button" onClick={() => editor?.chain().focus().setTextAlign("right").run()} className="btn">R</button>

        <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className="btn">•</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} className="btn">1.</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleTaskList().run()} className="btn">☑</button>

        <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()} className="btn">❝</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleCodeBlock().run()} className="btn">{"</>"}</button>

        <input
          type="color"
          onChange={(e) => setColor(e.target.value)}
          title="Text color"
          className="w-6 h-6 p-0 border rounded"
        />
      </div>

      <EditorContent className="leading-relaxed whitespace-pre-line" editor={editor} />
    </div>
  );
}
