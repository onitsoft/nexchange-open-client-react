import React, { useEffect, useRef, useCallback, useState } from 'react'
import { Modal } from 'react-bootstrap'

import Webcam from 'react-webcam'

export const WebcamModal = (props) => {
  const { visible, onClose, onChange } = props
  const [show, setShow] = useState(false)
  const [myShot, setMyShot] = useState('')
  const webcamRef = useRef(null)

  const onHide = useCallback(() => {
    onClose()
    setMyShot('')
  }, [onClose])
 
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setMyShot(imageSrc)
  }, [webcamRef])

  const approve = useCallback(() => {
    onChange(myShot)
    onHide()
  }, [myShot])

  useEffect(() => {
    if (visible !== show) {
      setShow(visible)
    }
  }, [visible, show])

  return (
    <Modal id='webcam-modal' show={show} onHide={onHide}>
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={onHide}>
            <i className="material-icons">clear</i>
          </button>
          <h4 className={`modal-title`}>Webcam</h4>
        </div>

        <div className="modal-body">
          {!myShot && (
            <Webcam 
              ref={webcamRef}
              audio={false}
              screenshotFormat='image/jpeg'
            />
          )}
          {myShot && (
            <img src={myShot} alt='preview' />
          )}
        </div>

        <div className="modal-footer">
          {!myShot && (
            <button 
              className="btn btn-themed btn-md" 
              onClick={capture}
            >Capture</button>
          )}
          {myShot && (
            <>
              <button 
                className="btn btn-themed btn-secondary btn-md" 
                onClick={() => setMyShot(null)}
              >Retake</button>
              <button 
                className="btn btn-themed btn-md" 
                onClick={approve}
              >Approve</button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default WebcamModal