import {
    useSpring as useSpringThree,
      animated as animatedThree
    } from "@react-spring/three"
    import { MeshDistortMaterial } from '@react-three/drei'
    import { Canvas } from '@react-three/fiber'
    import * as THREE from 'three';

    
    export default function AudioVisualisation() {
    
      const AnimatedMeshDistortMaterial = animatedThree(MeshDistortMaterial)
    
      return (
        <Canvas>
        <color attach="background" args={['black']} />
        <ambientLight intensity={0.0} />
        <directionalLight 
        intensity={1.5} 
        position={[0, 0, 50]}
        />
    
        <mesh position={[0, 0, 1]}>
        <sphereGeometry args={[0.9, 70,70]} />
        <meshBasicMaterial wireframe={true} />
        <AnimatedMeshDistortMaterial
          speed={5}
          distort={0.8}
          color={'white'}
        />
      </mesh>
      </Canvas>
      )
    }
    

// import { SafeAreaView, Text, View, Image } from "react-native";
// import React, { Suspense, useMemo } from "react";
// import * as THREE from "three";
// import { Canvas, useLoader } from "@react-three/fiber";
// import rond from "../../assets/rond.png";

// function SimpleSphere() {
//   return (
//     <mesh position={[0, 0, 0]}>
//       <sphereGeometry args={[5, 50, 50]} />
//       <meshStandardMaterial color="hotpink" />
//     </mesh>
//   );
// }

// function Points() {
//   const imgTex = useLoader(THREE.TextureLoader, rond);

//   const count = 100;
//   const sep = 3;

//   let positions = useMemo(() => {
//     let positions = [];

//     for (let xi = 0; xi < count; xi++) {
//       for (let zi = 0; zi < count; zi++) {
//         let x = sep * (xi - count / 2);
//         let z = sep * (zi - count / 2);
//         let y = 0;
//         positions.push(x, y, z);
//       }
//     }

//     return new Float32Array(positions);
//   }, [count, sep]);

//   return (
//     <points>
//       <bufferGeometry attach="geometry">
//         <bufferAttribute
//           attachObject={["attributes", "position"]}
//           array={positions}
//           count={positions.length / 3}
//           itemSize={3}
//         />
//       </bufferGeometry>

//       <pointsMaterial
//         attach="material"
//         map={imgTex}
//         color={0xffffff} // Utiliser une couleur blanche pour les points
//         size={1} // Augmenter la taille des points
//         sizeAttenuation={false} // Désactiver l'atténuation de la taille
//         transparent={true} // Activer la transparence
//         alphaTest={0.5}
//         opacity={1.0}
//       />
//     </points>
//   );
// }

// function AnimationCanvas() {
//   return (
//     <Canvas
//       colorManagement={false}
//       camera={{ position: [100, 10, 0], fov: 75 }}
//     >
//       <color attach="background" args={["black"]} />

//       <ambientLight intensity={2} />
//       <Suspense fallback={null}>
//         <SimpleSphere />

//         <Points />
//       </Suspense>
//     </Canvas>
//   );
// }

// const ChatScreen = () => {
//   return (
//     <AnimationCanvas />
//     // <SafeAreaView
//     //   style={{
//     //     flex: 1,
//     //     justifyContent: "center",
//     //     alignItems: "center",
//     //     backgroundColor: "black",
//     //   }}
//     //   >
//     //   <Suspense fallback={<Text>Loading...</Text>}>
//     //   </Suspense>
//     // </SafeAreaView>
//   );
// };

// export default ChatScreen;

