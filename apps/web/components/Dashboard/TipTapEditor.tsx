'use client';

import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';
import { Markdown } from 'tiptap-markdown';

interface TiptapEditorProps {
  initialMarkdown?: string;
  onChange: (markdown: string) => void;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  initialMarkdown = '',
  onChange,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Underline,

      Markdown, // to support markdown in/out :contentReference[oaicite:2]{index=2}
    ],
    content: initialMarkdown,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      // get markdown output
      const md = editor.storage.markdown.getMarkdown();
      onChange(md);
    },
  });

  // If initialMarkdown updates (eg form reset), sync it
  useEffect(() => {
    if (editor && initialMarkdown) {
      editor.commands.setContent(initialMarkdown);
    }
  }, [editor, initialMarkdown]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="border border-green-300 rounded-lg p-2">
      <EditorContent editor={editor} />
    </div>
  );
};
