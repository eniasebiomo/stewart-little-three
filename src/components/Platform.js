import React, {useRef, forwardRef } from "react";
import { useFrame } from "@react-three/fiber"
import { Line } from "@react-three/drei"
import { useControls } from 'leva';
import { Object3D } from "three";

export default function StewartPlatform(props) {
    const baseRef = useRef(null)
    const platformRef = useRef(null)
    const legGroupRef = useRef(null)

    const { pitch, yaw, roll } = useControls({
        pitch: { value: 0, min: -Math.PI, max: Math.PI, step: .01 },
        yaw: { value: 0, min: -Math.PI, max: Math.PI, step: .01 },
        roll: { value: 0, min: -Math.PI, max: Math.PI, step: .01 }
      });

    const baseVerts = getHexagonVertices(props.baseRadius)
    const platformVerts = getHexagonVertices(props.platformRadius)
    const initialGlobalPlatformVerts = getHexagonVertices(props.platformRadius, props.height)

    const baseVertsRef = useRef(baseVerts)
    const platformVertsRef = useRef(platformVerts)
    const legsVertsRef = useRef(initialGlobalPlatformVerts)
    
    useFrame(() => {
        platformRef.current.rotation.x = pitch
        platformRef.current.rotation.y = yaw
        platformRef.current.rotation.z = roll
        
        let getGlobal = vert => {
            let v = vert.clone()
            platformRef.current.localToWorld(v)
            return v
        }
        
        let currentLeg = legGroupRef.current.vertsRef.current
        let currentPlat = platformRef.current.vertsRef.current

        currentLeg.A = getGlobal(currentPlat.A)
        currentLeg.B = getGlobal(currentPlat.B)
        currentLeg.C = getGlobal(currentPlat.C)
        currentLeg.D = getGlobal(currentPlat.D)
        currentLeg.E = getGlobal(currentPlat.E)
        currentLeg.F = getGlobal(currentPlat.F)

        legGroupRef.current.baseVertsRef.current.A = baseRef.current.vertsRef.current.A
        legGroupRef.current.baseVertsRef.current.B = baseRef.current.vertsRef.current.B
        legGroupRef.current.baseVertsRef.current.C = baseRef.current.vertsRef.current.C
        legGroupRef.current.baseVertsRef.current.D = baseRef.current.vertsRef.current.D
        legGroupRef.current.baseVertsRef.current.E = baseRef.current.vertsRef.current.E
        legGroupRef.current.baseVertsRef.current.F = baseRef.current.vertsRef.current.F

    });

    // useEffect(() => {
    //     console.log(legGroupRef.current.vertsRef.current.F.position)
    //     let vert = platformRef.current.vertsRef.current.F
    //     let v = vert.clone()
    //     platformRef.current.localToWorld(v)
    //     console.log(v.position)
    //     console.log("----")
    // }, [pitch, yaw, roll]);

    return (
        <>
            <HexagonMesh
                ref={baseRef}
                radius={props.baseRadius} 
                color={"slateblue"} 
                vertsRef={baseVertsRef} 
            />
            <HexagonMesh 
                ref={platformRef} 
                radius={props.platformRadius}
                color={"aquamarine"} 
                position={[0, props.height, 0]} 
                vertsRef={platformVertsRef}
            />
            <Legs 
                ref={legGroupRef}
                baseVertsRef={baseVertsRef}
                vertsRef={legsVertsRef}
            />

        </>
    )
}

const getHexagonVertices = (radius, yPos = 0) => {
    let root3over2 = Math.sqrt(3) / 2 * radius;
    let over2 = radius / 2;

    const getObject3DFromPosition = (x, y, z) => {
        const vert = new Object3D()
        vert.position.set(x,y,z)
        return vert;
    }
    
    const hexVerts = {
        A: getObject3DFromPosition(0, yPos, radius),
        B: getObject3DFromPosition(root3over2, yPos, over2),
        C: getObject3DFromPosition(root3over2, yPos, -over2),
        D: getObject3DFromPosition(0, yPos, -radius),
        E: getObject3DFromPosition(-root3over2, yPos, -over2),
        F: getObject3DFromPosition(-root3over2, yPos, over2),
    }

    return hexVerts
}; 



const HexagonMesh = forwardRef((props, ref) => {
    const lineWidth = 5;
    const thickness = 1;
    const verts = props.vertsRef.current

    return (
        <mesh {...props} ref={ref}>
            <cylinderGeometry args={[props.radius, props.radius, thickness, 6]}/>
            <meshStandardMaterial wireframe={props.wireframe} color={props.color} />
            <Line points={[verts.A.position, verts.B.position]} color="crimson" LineWidth={lineWidth}/>
            <Line points={[verts.B.position, verts.C.position]} color="coral" LineWidth={lineWidth}/>
            <Line points={[verts.C.position, verts.D.position]} color="gold" LineWidth={lineWidth}/>
            <Line points={[verts.D.position, verts.E.position]} color="green" LineWidth={lineWidth}/>
            <Line points={[verts.E.position, verts.F.position]} color="blue" LineWidth={lineWidth}/>
            <Line points={[verts.F.position, verts.A.position]} color="indigo" LineWidth={lineWidth}/>
            <Line points={[[0,0,0], verts.A.position]} color="white" LineWidth={lineWidth}/>
            <Line points={[[0,0,0], verts.B.position]} color="white" LineWidth={lineWidth}/>
            <Line points={[[0,0,0], verts.C.position]} color="white" LineWidth={lineWidth}/>
            <Line points={[[0,0,0], verts.D.position]} color="white" LineWidth={lineWidth}/>
            <Line points={[[0,0,0], verts.E.position]} color="white" LineWidth={lineWidth}/>
            <Line points={[[0,0,0], verts.F.position]} color="white" LineWidth={lineWidth}/>
        </mesh>
    );
});

const Legs = forwardRef((props, ref) => {
    
    const verts = props.vertsRef.current
    const baseVerts = props.baseVertsRef.current

    return (
        <group {...props} ref={ref}>
            <Line points={[baseVerts.A.position, verts.A.position]} color="crimson" LineWidth={5} />
            <Line points={[baseVerts.B.position, verts.B.position]} color="crimson" LineWidth={5} />
            <Line points={[baseVerts.C.position, verts.C.position]} color="crimson" LineWidth={5} />
            <Line points={[baseVerts.D.position, verts.D.position]} color="crimson" LineWidth={5} />
            <Line points={[baseVerts.E.position, verts.E.position]} color="crimson" LineWidth={5} />
            <Line points={[baseVerts.F.position, verts.F.position]} color="crimson" LineWidth={5} />
        </group>
    )
});
