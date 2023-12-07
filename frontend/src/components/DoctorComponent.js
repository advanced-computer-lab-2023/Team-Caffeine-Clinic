// DoctorComponent.js
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const DoctorComponent = () => {
  const [stream, setStream] = useState(null);
  const partnerVideoRef = useRef();
  const socket = io('http://localhost:3001');
  const peer = new Peer({ initiator: false, trickle: false });
  const [isCallStarted, setCallStarted] = useState(false);

  useEffect(() => {
    if (isCallStarted) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          partnerVideoRef.current.srcObject = stream;

          peer.addStream(stream);

          peer.on('signal', (data) => {
            socket.emit('answer', { signalData: data });
          });

          socket.on('offer', (data) => {
            peer.signal(data.signalData);
          });

          socket.on('ice-candidate', (data) => {
            peer.addIceCandidate(data);
          });
        })
        .catch((error) => console.error(error));
    }
  }, [isCallStarted]);

  const handleStartCall = () => {
    setCallStarted(true);
  };

  return (
    <div>
      <button onClick={handleStartCall}>Start Call</button>
      {isCallStarted && <video ref={partnerVideoRef} autoPlay playsInline />}
    </div>
  );
};

export default DoctorComponent;
