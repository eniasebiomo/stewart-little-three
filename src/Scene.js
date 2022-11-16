import './Scene.css';
import styled from "styled-components";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import StewartPlatform from './components/Platform'
// import { useControls } from 'leva';


export const Scene = () => {

  // const { pitch, yaw, roll } = useControls({
  //   pitch: { value: 0, min: -Math.PI, max: Math.PI, step: .1 },
  //   yaw: { value: 0, min: -Math.PI, max: Math.PI, step: .1 },
  //   roll: { value: 0, min: -Math.PI, max: Math.PI, step: .1 }
  // });

  // # todo reset button
  // contraints on / off boolean

  const height = 10;
  const baseRadius = 8;
  const platformRadius = 5;
  // var baseHexVerts = getHexagonVertices(baseRadius)
  // var platformHexVerts = getHexagonVertices(platformRadius)

  return (
    <Container>
      <Canvas camera={{ position: [0, 25, -25], fov: 45 }}>
        <OrbitControls />
        <ambientLight intensity={0.3} color="#FFFFFF" />
        <pointLight intensity={1.0} position={[10, 20, 10]} />
        <StewartPlatform 
          height={height}
          baseRadius={baseRadius}
          // baseHexVerts={baseHexVerts}
          basePosition={[0,0,0]}
          platformRadius={platformRadius} 
          // platformHexVerts={platformHexVerts}
          // platformPosition={[0, 10, 0]}
          // platformRotation={[0, 0, 0]} 
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
