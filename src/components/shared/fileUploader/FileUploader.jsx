import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import React, { memo, useRef } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import fileUploaderConfig from 'utils/js/private/fileUploaderConfig';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFilePoster,
  FilePondPluginFileValidateSize,
  FilePondPluginImageValidateSize,
  FilePondPluginFileValidateType,
);

const FileUploader = props => {
  let filePondRef = useRef(null);

  return (
    <FilePond
      ref={ref => (filePondRef = ref)}
      {...fileUploaderConfig}
      {...props}
    />
  );
};

export default FileUploader;
