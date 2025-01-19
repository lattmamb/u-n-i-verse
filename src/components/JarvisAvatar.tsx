import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function Avatar() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
      mesh.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#00a2ff"
        emissive="#00a2ff"
        emissiveIntensity={0.5}
        metalness={1}
        roughness={0.2}
      />
    </mesh>
  );
}

export function JarvisAvatar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-32 h-32 absolute bottom-24 right-4 z-50"
    >
      <Canvas camera={{ position: [0, 0, 4] }}>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Avatar />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </motion.div>
  );
}