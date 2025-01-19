import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function Avatar() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (!meshRef.current) return;
    
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
      }
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      // Cleanup
      if (meshRef.current) {
        meshRef.current.rotation.y = 0;
      }
    };
  }, []);

  return (
    <mesh ref={meshRef}>
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
      <Canvas
        camera={{ position: [0, 0, 4] }}
        style={{ background: 'transparent' }}
      >
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Avatar />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </motion.div>
  );
}