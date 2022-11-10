import React from "react";
import { Line } from "@react-three/drei"

export default function Platform(props) {
    const radius = 5;
    const root3over2 = Math.sqrt(3) / 2 * radius;
    const over2 = radius / 2;

    const hexPoints = {
        A: [0, 0,  radius],
        B: [root3over2, 0, over2],
        C: [root3over2, 0, -over2],
        D: [0, 0,  -radius],
        E: [-root3over2, 0, -over2,],
        F: [-root3over2, 0, over2]
    }

    const lineWidth = 5;

    return (
        <mesh {...props}>
            <cylinderGeometry args={[radius, radius, 1, 6]}/>
            <meshStandardMaterial wireframe={props.wireframe} color={'slateblue'} />
            <Line points={[[0,0,0], hexPoints.A]} color="white" LineWidth={lineWidth}/>
            <Line points={[[0,0,0], hexPoints.B]} color="white" LineWidth={lineWidth}/>
            <Line points={[[0,0,0], hexPoints.C]} color="white" LineWidth={lineWidth}/>
            <Line points={[[0,0,0], hexPoints.D]} color="white" LineWidth={lineWidth}/>
            <Line points={[[0,0,0], hexPoints.E]} color="white" LineWidth={lineWidth}/>
            <Line points={[[0,0,0], hexPoints.F]} color="white" LineWidth={lineWidth}/>
            <Line points={[hexPoints.A, hexPoints.B]} color="crimson" LineWidth={lineWidth}/>
            <Line points={[hexPoints.B, hexPoints.C]} color="coral" LineWidth={lineWidth}/>
            <Line points={[hexPoints.C, hexPoints.D]} color="gold" LineWidth={lineWidth}/>
            <Line points={[hexPoints.D, hexPoints.E]} color="green" LineWidth={lineWidth}/>
            <Line points={[hexPoints.E, hexPoints.F]} color="blue" LineWidth={lineWidth}/>
            <Line points={[hexPoints.F, hexPoints.A]} color="indigo" LineWidth={lineWidth}/>
        </mesh>
    );
}