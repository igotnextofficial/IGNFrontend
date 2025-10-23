import React, { useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { safeFetch } from '../../utils/safeFetch';

function PageManagement() {
  const [editorState, setEditorState] = useState('');
  const [submitError, setSubmitError] = useState(null);

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

  const handleSubmit = async () => {
    try {
      setSubmitError(null);
      await safeFetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editorState }),
        requestName: 'PageManagement.submitArticle'
      });
      // Article submitted successfully
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to submit article. Please try again.';
      setSubmitError(message);
    }
  };

  return (
    <>
      <div id="editor">
        <p>Hello, world!</p>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {submitError && (
        <p role="alert" style={{ color: 'red', marginTop: '0.75rem' }}>
          {submitError}
        </p>
      )}
    </>
  );
}

export default PageManagement;
