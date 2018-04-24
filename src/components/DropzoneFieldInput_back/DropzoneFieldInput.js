import React from 'react'
import Dropzone from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import styles from './DropzoneFieldInput.less'

const DropzoneFieldInput = (field) => {
 /* eslint-disable */
 /* meta should be extracted to pass expected props to Dropzone  */
 let { input, meta, dropzoneOnDrop, ...props } = field
 /* eslint-enable */
  return (
    <Dropzone
      className={ styles.dropzone }
      activeClassName={ styles.activeDropzone }
      onDrop={ (acceptedFiles, rejectedFiles, e) => {
        input.onChange(acceptedFiles)
        dropzoneOnDrop && field.dropzoneOnDrop(acceptedFiles, rejectedFiles, e)
      } }
      { ...props } >
      { (input.value && input.value[0] && input.value[0].name)
         ? input.value[0].name
         : <FormattedMessage
           id='input.dropzone.file'
           description='file field'
           defaultMessage='Déplacez votre fichier ici ou cliquer pour le choisir' />
       }
    </Dropzone>
  )
}

export default DropzoneFieldInput
