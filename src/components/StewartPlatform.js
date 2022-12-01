import React, { forwardRef, useRef, useMemo, useCallback, useState } from "react";
import { useFrame } from "@react-three/fiber"
import { button, useControls } from 'leva';
import { Object3D } from "three";

import HexagonGeometry, { getHexagonVertices } from "./HexagonGeometry";
import Legs from "./Leg";


const StewartPlatform = forwardRef((props, ref) => {
    let n_frame = 0;
    const baseRef = useRef(null);
    const platformRef = useRef(null);
    const legsRef = useRef(null);

    const baseVertices = useMemo(() => 
        getHexagonVertices(props.baseRadius), [props.baseRadius]);
    const [legLengths, setLegLengths] = useState([0,0,0,0,0,0]);
    const getLength = useCallback((index) => legLengths[index], [legLengths]);

    /**
     * Configure leva GUI
     */
    const rotationBounds = { 
        value: 0, min: -Math.PI/2, max: Math.PI/2, step: .1 };
    const heaveBounds = { 
        value: props.height, min: props.height-2, max: props.height+2, step: .1 };
    const swaySurgeBounds = { 
        value: 0, min: -props.height/2, max: props.height/2, step: .1 };
    const [{pitch, yaw, roll, sway, heave, surge}, set] = useControls(() => ({
        pitch: {
            ...rotationBounds },
        yaw: {
            ...rotationBounds },
        roll: {
            ...rotationBounds }, 
        sway: {
            ...swaySurgeBounds }, 
        heave: { 
            ...heaveBounds },
        surge: {
            ...swaySurgeBounds }, 
        mesh: {
            value: true, 
            onChange: (value) => {
                baseRef.current.material.wireframe = !value
                platformRef.current.material.wireframe = !value; }}, 
        reset: button(() => {
            set({ pitch: 0 })
            set({ yaw: 0 })
            set({ roll: 0})
            set({ heave: props.height })
            set({ sway: 0 })
            set({ surge: 0 })
        })}));

      /**
       * Update the global position of each platform vertex and set each leg
       * with its new respective start and end position. Vertex positions
       * are stored in three.js buffer geometry in an array i.e.
       * [x1, y1, z1, x2, y2, z2]
       */
      const updateVertices = (renderFlag) => {

        const vertices = platformRef.current.geometry.attributes.position.array;
        const legs = legsRef.current.children;
        const lengths = [];

        for (let leg = 0; leg < 6; leg++) {
            const [x, y, z] = vertices.slice(3*leg, 3*leg+3)
            const platformVertex = new Object3D();
            platformVertex.position.set(x, y, z)
            platformRef.current.localToWorld(platformVertex)

            legs[leg].geometry.setPositions([
                baseVertices[leg].position.x,
                baseVertices[leg].position.y,
                baseVertices[leg].position.z, 
                platformVertex.position.x,
                platformVertex.position.y,
                platformVertex.position.z
            ])
            lengths[leg] = baseVertices[leg].position.distanceTo(platformVertex.position).toFixed(2);
        }

        if (renderFlag) {
            setLegLengths(lengths)
            platformRef.current.rotation.y = pitch
            platformRef.current.rotation.x = yaw
            platformRef.current.rotation.z = roll
            platformRef.current.position.x = sway
            platformRef.current.position.y = heave
            platformRef.current.position.z = surge
        }
    };

    /**
     * react-three-fiber custom hook that is called before each render
    */
    useFrame(() => {
        const conditionalRender = n_frame++ % 39 === 0;
        updateVertices(conditionalRender); // 1.538 Hz
    });

    return (
        <>
            <HexagonGeometry ref={baseRef} radius={props.baseRadius} h={1}/>
            <HexagonGeometry ref={platformRef} radius={props.platformRadius} h={0}/>
            <Legs {...props} getLength={getLength} ref={legsRef} baseVertices={baseVertices}/>
        </>
    )   
});

export default StewartPlatform;
