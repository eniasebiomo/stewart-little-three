import React, { forwardRef } from "react";
import { Object3D } from "three";


export const getHexagonVertices = (radius) => {
    const points = []
    const getHexagonVertex = (i, radius) => {
        const root3over2 = Math.sqrt(3) / 2 * radius;
        const over2 = radius / 2;
        return [
            [0, 0, radius],
            [root3over2, 0, over2],
            [root3over2, 0, -over2],
            [0, 0, -radius],
            [-root3over2, 0, -over2],
            [-root3over2, 0, over2]
        ][i];
    }

    for (let point = 0; point < 6; point++) {
        const vertex = new Object3D();
        vertex.position.set(...getHexagonVertex(point, radius))
        points[point] = vertex
    }

    return points;
};

const HexagonGeometry = forwardRef((props, ref) => {
    
    return (
        <mesh ref={ref}>
            <cylinderGeometry args={[props.radius, props.radius, props.h, 6]}/>
            <meshStandardMaterial color={"#0034F1"} />
        </mesh>
    );
});

export default HexagonGeometry;
