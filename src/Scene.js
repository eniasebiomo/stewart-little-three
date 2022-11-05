import './Scene.css';
import styled from "styled-components";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Platform from './components/Platform'

export const Scene = () => {
  return (
    <Container>
      <Canvas camera={{ position: [-10, 10, 10], fov: 45 }}>
        <OrbitControls />
        <ambientLight intensity={0.3} color="#FFFFFF" />
        <pointLight intensity={1.0} position={[10, 10, 10]} />
        <Platform position={[1.2, 0, 0]} />
      </Canvas>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  background: springgreen;
`;

export default Scene;
