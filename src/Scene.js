import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import StewartPlatform from './components/StewartPlatform'

import './Scene.css';

//          Component Heirarchy
//
//                   ⭐️
//                 Scene
//                   |
//             StewartPlatform 
//                  |||
//           HexagonGeometry (Base)
//                  | |
//        HexagonGeometry (Platform)
//                   |
//                  Legs

export const Scene = () => {
  return (
    <Container>
      <Canvas camera={{ position: [0, 25, -25], fov: 45 }}>
        <OrbitControls />
        <ambientLight intensity={0.3} color="#FFFFFF" />
        <pointLight intensity={1.0} position={[10, 20, 10]} />
        <StewartPlatform
          height={10}
          baseRadius={8}
          platformRadius={5}
        />
      </Canvas>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background: springgreen;
`;

export default Scene;
