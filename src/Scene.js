import './Scene.css';
import styled from "styled-components";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Platform from './components/Platform'
import Base from './components/Base';
import { useControls } from 'leva';


export const Scene = () => {

  const { pitch, yaw, roll } = useControls({
    pitch: { value: 0, min: -Math.PI, max: Math.PI, step: .1 },
    yaw: { value: 0, min: -Math.PI, max: Math.PI, step: .1 },
    roll: { value: 0, min: -Math.PI, max: Math.PI, step: .1 }
  })

  return (
    <Container>
      <Canvas camera={{ position: [0, 25, -25], fov: 45 }}>
        <OrbitControls />
        <ambientLight intensity={0.3} color="#FFFFFF" />
        <pointLight intensity={1.0} position={[10, 20, 10]} />
        <Platform position={[0, 10, 0]} rotation={[pitch, yaw, roll]} />
        <Base position={[0,0,0]}/>
      </Canvas>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background: springgreen;
`;

export default Scene;
