import React, { forwardRef } from "react";
import { Html, Line } from "@react-three/drei"

const Legs = forwardRef((props, ref) => {

    const intialPoints = [[0,0,0], [0,0,0]]
    const style = {
        color: "magenta",
        fontFamily: "Trebuchet MS",
        fontSize: "50px",
        userSelect: "none" }
    const legLabel = index => (
        <p>L<sub>{index}</sub>:&nbsp;{props.getLength(index)}</p>
    )

    return (
        <group {...props} ref={ref} >
            {props.baseVertices.map(({position}, index) => (
                <Line {...props} points={intialPoints} key={index}>
                    <Html {...props} key={index} style={style} 
                    position={[position.x, position.y, position.z]}>
                        {legLabel(index)}
                    </Html>
                </Line>
            ))}
        </group>
    )
});

export default Legs;
