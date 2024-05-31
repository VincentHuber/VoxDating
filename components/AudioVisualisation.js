import React from "react";
import { useSpring as useSpringThree, animated as animatedThree } from "@react-spring/three";
import { MeshDistortMaterial } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';



export default function AudioVisualisation({ currentVolume }) {
  const { distort } = useSpringThree({ distort: currentVolume });
  const AnimatedMeshDistortMaterial = animatedThree(MeshDistortMaterial);
  
  return (
    <Canvas>
      <color attach="background" args={['black']} />
      <ambientLight intensity={0.0} />
      <directionalLight intensity={1.5} position={[0, 0, 50]} />

      <mesh position={[0, 0, 1]}>
        <sphereGeometry args={[0.9, 70, 70]} />
        <meshBasicMaterial wireframe={true} />
        <AnimatedMeshDistortMaterial
          speed={4}
          distort={distort}
          color={'white'}
        />
      </mesh>
    </Canvas>
  );
} 
