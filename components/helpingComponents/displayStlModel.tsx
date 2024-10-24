import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Html, Center } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

const Model = ({ url }: { url: string }) => {
  const geometry = useLoader(STLLoader, url) as THREE.BufferGeometry;
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.000; // Slow rotation speed
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
      const center = boundingBox.getCenter(new THREE.Vector3());
      
      camera.position.set(0, 0, 1400);
      camera.near = 0.1;
      camera.far = 50000;
      camera.lookAt(center);
      camera.updateProjectionMatrix();
    }
  }, [geometry, camera]);

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry}
      rotation={[Math.PI / 2, Math.PI / 2, 0]}
    >
      <meshPhongMaterial 
        color="#e0e0e0"  // Light grey color
        specular="#ffffff"
        shininess={100}
      />
    </mesh>
  );
};

const LoadingIndicator = () => {
  return (
    <Html center>
      <div className="text-blue-500 text-lg">Loading...</div>
    </Html>
  );
};

const STLViewer = ({ url = '/sample.stl', width = 400, height = 400 }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div 
        style={{ 
          width: width, 
          height: height 
        }} 
        className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
      >
        <Canvas camera={{ near: 0.1, far: 50000 }}>
          <Suspense fallback={<LoadingIndicator />}>
            <PerspectiveCamera 
              makeDefault 
              position={[0, 0, 1400]}
              fov={45}
              near={0.1}
              far={50000}
            />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <Center>
              <Model url={url} />
            </Center>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default STLViewer;