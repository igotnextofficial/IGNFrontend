import React, { useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

function PageManagement() {
  const [editorState, setEditorState] = useState('');

  React.useEffect(() => {
    const editor = new Quill('#editor', {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['link', 'image', 'video'],
          ['clean'],
        ],
      },
      theme: 'snow',
    });

    const handleChange = () => {
      setEditorState(editor.root.innerHTML);
    };

    editor.on('text-change', handleChange);
    editor.on('selection-change', handleChange);
    editor.on('format-change', handleChange);

    return () => {
      editor.off('text-change', handleChange);
      editor.off('selection-change', handleChange);
      editor.off('format-change', handleChange);
      editor.destroy();
    };
  }, []);

  const handleSubmit = () => {
    // Send the editor content to the server using the fetch API
    fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editorState }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit article');
        }
        ('Article submitted successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div id="editor">
        <p>Hello, world!</p>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default PageManagement;
