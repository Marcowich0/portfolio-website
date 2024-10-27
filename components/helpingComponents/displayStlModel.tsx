import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Center, Edges } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

const Model = ({ url, onLoaded }: { url: string; onLoaded?: (size: THREE.Vector3) => void }) => {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(url, (geometry) => {
      geometry.center();
      geometry.computeVertexNormals();
      geometry.computeBoundingBox();

      // Rotate to match desired orientation (red up)
      geometry.rotateX(Math.PI);

      setGeometry(geometry);

      if (geometry.boundingBox && onLoaded) {
        const size = new THREE.Vector3();
        geometry.boundingBox.getSize(size);
        onLoaded(size);
      }
    });
  }, [url, onLoaded]);

  // Apply rotation to the model
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005; // Slow rotation around the x-axis
    }
  });

  if (!geometry) return null;

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial 
        color="#808080"
        roughness={0.5}
        metalness={0.5}
      />
      <Edges 
        threshold={15} // Adjust to make edges clearer
        color="black"
      />
    </mesh>
  );
};

const CameraController = ({ size }: { size: THREE.Vector3 }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (size) {
      const maxDimension = Math.max(size.x, size.y, size.z);
      const distance = maxDimension * 1.5; // Set distance based on the model size

      camera.position.set(0, -distance, 0);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [size, camera]);

  return null;
};

interface STLViewerProps {
  url?: string;
}

const STLViewer: React.FC<STLViewerProps> = ({ url = '/projectPictures/dart/dart2.STL' }) => {
  const [modelSize, setModelSize] = useState<THREE.Vector3 | null>(null);

  const handleModelLoaded = (size: THREE.Vector3) => {
    setModelSize(size);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '8px',
    }}>
      
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 20000,
          position: [0, -5000, 0], // Initial camera position
          up: new THREE.Vector3(1, 0, 0) // Set red axis as up
        }}
        style={{ background: 'transparent' }} // Transparent background
      >
        {modelSize && <CameraController size={modelSize} />}

        <ambientLight intensity={0.6} />
        <hemisphereLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={0.8}
          castShadow
        />

        <Center>
          <Model url={url} onLoaded={handleModelLoaded} />
        </Center>

        {/* Disable all user interactions in OrbitControls */}
        <OrbitControls
          enableDamping={false}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          up={new THREE.Vector3(1, 0, 0)} // Set red axis as up
        />
      </Canvas>
    </div>
  );
};

export default STLViewer;
