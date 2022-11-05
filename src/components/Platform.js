import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Platform(props) {
    const ref = useRef()

    useFrame((state, delta) => (ref.current.rotation.x += 0.01));

    return (
        <mesh {...props} ref={ref}>
            <cylinderGeometry args={[5, 5, 1, 6]} />
            <meshStandardMaterial wireframe={props.wireframe} color={'slateblue'} />
        </mesh>
    );
}