import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FileUploadProvider from '../Providers/FileUploadProvider';
import { FileUploadContext } from '../Contexts/FileUploadContext';


const mockFile = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

it('renders and provides the file upload context', () => {

    const { getByText } = render(
      <FileUploadProvider myFile={mockFile}>
       
      </FileUploadProvider>
    );
  
    expect(getByText('Found')).toBeInTheDocument();
  });
  
