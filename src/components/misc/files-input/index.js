import React, { useEffect, useCallback, useState } from 'react';
import { I18n } from 'react-i18next';

import styled from '@emotion/styled'

import { useDropzone } from 'react-dropzone';

import WebcamModal from 'Components/misc/webcam-modal'

export const FilesInput = ({onFiles}) => {
  const [showWebcamModal, setShowWebcamModal] = useState(false)
  const [myFiles, setMyFiles] = useState([])
  const onDrop = useCallback(drp => {
    setMyFiles(fls => [...fls, ...drp])
  })
  const [webcamItems, setWebcamItems] = useState([])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const getFileSrc = useCallback(file => (
    URL.createObjectURL(file)
  ), [])

  const onWebcamSelect = useCallback(e => {
    e.preventDefault()
    setShowWebcamModal(true)
  }, [])

  const onWebcam = useCallback((img) => {
    setWebcamItems(items => [...items, img])
  }, [])

  useEffect(() => {
    if (onFiles && typeof onFiles === 'function') {
      onFiles(myFiles, webcamItems)
    }
  }, [onFiles, myFiles, webcamItems])

  const removeFile = useCallback((thing, file) => {
    if (thing === 'files') setMyFiles(fls => fls.filter(f => f !== file))
    else setWebcamItems(shts => shts.filter(f => f !== file))
  }, [])

  return (
    <I18n ns="translations">
      {(t) => (
        <StyledFiles>
          <WebcamModal visible={showWebcamModal} onClose={() => setShowWebcamModal(false)}
                  onChange={onWebcam} />
          <div className='row'>
            <StyledDropzone {...getRootProps()} className={`files hoverer col-xs-12 col-sm-6 ${isDragActive ? 'drag-active' : ''}`} >
              <h3>Click Here or Drop Files</h3>
              <img style={{
                'textAlign': 'center',
                margin: 'auto', 'width': '100%', 'maxWidth': '100%'
              }} src="/img/order/selfie.jpg"
                alt={t('order.fiat.selfie')} title={t('order.fiat.click_to_upload')} />
              <input {...getInputProps()} />
            </StyledDropzone>
            <div className='col-sm-6 hidden-xs hoverer webcam' onClick={onWebcamSelect}>
              <h3>Use Webcam</h3>
              <img style={{
                  'textAlign': 'center',
                  margin: 'auto', 'width': '100%', 'maxWidth': '100%'
                }} src="/img/order/webcam.png"
                  alt={t('order.fiat.selfie')} title={t('order.fiat.click_to_upload')} />
            </div>
          </div>
          <div className='row previews'>
            {myFiles && !!myFiles.length && myFiles.map((f, i) => (
              <div className='item col-md-2 col-sm-3 col-xs-6' key={`upload-item-${i}`}>
                <button type="button" 
                  className="close" 
                  data-dismiss="screenshot" 
                  aria-hidden="true" 
                  onClick={() => removeFile('files', f)}
                >
                  <i className="material-icons">clear</i>
                </button>
                <img src={getFileSrc(f)} alt='' />
              </div>
            ))}
            {webcamItems && !!webcamItems.length && webcamItems.map((f, i) => (
              <div className='item col-md-2 col-sm-3 col-xs-6' key={`webcam-item-${i}`}>
                <button type="button" 
                  className="close" 
                  data-dismiss="screenshot" 
                  aria-hidden="true" 
                  onClick={() => removeFile('webcam', f)}
                >
                  <i className="material-icons">clear</i>
                </button>
                <img src={f} alt='' />
              </div>
            ))}
          </div>
        </StyledFiles>
      )}
    </I18n>
  )
}

const StyledFiles = styled.div`
  .hoverer {
    transform: scale(0.9);
    transition: all 80ms ease-out;
    cursor: pointer;
    opacity: 0.95;
    padding: 2rem;
    &:hover {
      transform: scale(1);
      opacity: 1;
    }
    h3 {
      margin: 0 auto;
    }
    img {
      max-width: 75%;
      display: block;
      margin: 0 auto;
    }
  }
  .previews {
    .item {
      position: relative;
      > button {
        position: absolute;
        top: .5rem;
        right: .5rem;
        background: rgba(210, 30, 40, 0.4);
        &:hover {
          background: rgba(210, 30, 40, 0.6);

        }
      }

    }
  }
`

const StyledDropzone = styled.div`
  border: 5px solid rgba(33, 33, 33, 0.1);
  border-style: dashed;
  border-radius: 10px;
  background: rgba(33, 33, 33, 0);
  transition: all 80ms ease-out;
  &.drag-active {
    border-color: rgba(33, 183, 33, 0.6);
    background: rgba(33, 183, 33, 0.1);
  }
`
export default FilesInput
