import React from "react";

export default function Base(props) {
    return (
        <mesh {...props}>
            <cylinderGeometry args={[8, 8, 1, 6]} />
            <meshStandardMaterial 
                wireframe={props.wireframe}
                color={'slateblue'}
            />
        </mesh>
    );
}