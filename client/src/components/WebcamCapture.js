import { useRef } from 'react'
import Webcam from 'react-webcam'

export default function WebcamCapture() {
  const webRef = useRef(null)

  return (
    <Webcam
      ref={webRef}
      width={1280}
      height={720} 
    />
  );
}