import React from "react";
import { useSpring as useSpringThree, animated as animatedThree } from "@react-spring/three";
import { MeshDistortMaterial } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';



export default function AudioVisualisation({ currentVolume }) {

  const { distort } = useSpringThree({ distort: currentVolume === 1 ? 0.9 : 0.3 });

  const AnimatedMeshDistortMaterial = animatedThree(MeshDistortMaterial);
  
  return (
    <Canvas>
      <color attach="background" args={['black']} />
      <directionalLight intensity={1.5} position={[0, 0, 50]} />

      <mesh position={[0, 0, 1]}>
        <sphereGeometry args={[0.9, 70, 70]} />
        <AnimatedMeshDistortMaterial
          speed={4}
          distort={distort}
          color={'white'}
        />
      </mesh>
    </Canvas>
  );
} 
