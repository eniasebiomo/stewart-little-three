# Stewart Little Three.js

A *little* web robotics visualization project built with [React](https://reactjs.org/), [Three.js](https://threejs.org/) and [react-three-fiber](https://github.com/pmndrs/react-three-fiber) to solve for the inverse kinematics of a [Stewart-Gough Platform](https://en.wikipedia.org/wiki/Stewart_platform). This implementation primarily utilizes `three.js's` [`localToWorld`](https://threejs.org/docs/#api/en/core/Object3D.localToWorld) function as a geometric method for solving for linear leg lengths.

## Inverse Kinematics of a Stewart Platform
Inverse kinematics is a method to calculate robotic motion based on a desired [end effector](https://en.wikipedia.org/wiki/Robot_end_effector) position. In this case, the end effector is our platform and the inputs are our leg lengths. There are [various combinations of hexagons and triangles](https://www.researchgate.net/publication/260637657/figure/fig1/AS:622401805090816@1525403562379/Top-view-of-different-configurations-for-Stewart-platforms-a-configuration-with.png)<sup>1</sup> that can make up the geometry of a Stewart platform, both of 3 and 6 degrees of freedom.

## Implementation
This implementation employs regular hexagons for both the platform and base in order to take advantage of symmetries while demonstrating 6 degrees of freedom. Platform position and leg lengths are calulated at a frequency of approximately `1.538Hz`. See [react-three-fiber docs](https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls) for more on performance.

## Controls
Use pan and zoom controls to navigate the Scene. Adjust sliders to change platform position. Note platform controls are not set to realistic physical constraints.

## Reference
stewart-little-three was built by [Eni](https://eni.asebiomo.com/) and is hosted on Github Pages  
  
1 - [Martinez, Peña, Soto - International Journal of Advanced Robotic Systems](https://www.researchgate.net/publication/260637657_Towards_a_Robust_Solution_of_the_Non-Linear_Kinematics_for_the_General_Stewart_Platform_with_Estimation_of_Distribution_Algorithms)
