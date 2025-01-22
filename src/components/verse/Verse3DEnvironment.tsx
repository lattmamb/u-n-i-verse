import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { motion } from 'framer-motion';

interface Verse3DEnvironmentProps {
  activeUsers: Array<{
    id: number;
    position: [number, number, number];
    active: boolean;
  }>;
}

export const Verse3DEnvironment = ({ activeUsers }: Verse3DEnvironmentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    sceneRef.current = new THREE.Scene();
    
    // Camera setup
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current.position.z = 5;

    // Renderer setup
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Controls setup
    if (cameraRef.current && rendererRef.current) {
      controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
      controlsRef.current.enableDamping = true;
      controlsRef.current.dampingFactor = 0.05;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    sceneRef.current.add(ambientLight);
    sceneRef.current.add(directionalLight);

    // Add user markers
    activeUsers.forEach(user => {
      const geometry = new THREE.SphereGeometry(0.1, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: user.active ? 0x00ff00 : 0xff0000,
        emissive: user.active ? 0x00ff00 : 0xff0000,
        emissiveIntensity: 0.5,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(...user.position);
      sceneRef.current?.add(sphere);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controlsRef.current?.update();
      rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
    };
    animate();

    // Cleanup
    return () => {
      rendererRef.current?.dispose();
      containerRef.current?.removeChild(rendererRef.current!.domElement);
    };
  }, [activeUsers]);

  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};