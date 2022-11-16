# Stewart Little Three

---

A little web robotics visualization project built with ReactJS, ThreeJS and react-three-fiber to solve for the inverse kinematics of a Stewart-Gough Platform (Stewart, not Stuart). This app employs a geometric method for solving inverse kinematics (, as opposed to a numerical one - Python )

Inverse kinematics is a robotics method to solve for

Given a desired [end effector](https://en.wikipedia.org/wiki/Robot_end_effector) position, what inputs are needed in order to achieve said result? In this case, the end effector is our platform and the inputs are our leg lengths.

There are various combinations of hexagons and triangles that make up the geometry of a Stewart platform, both of 3 and 6 degrees of freedom.

![Stewart Platform Configurations](https://www.researchgate.net/publication/260637657/figure/fig1/AS:622401805090816@1525403562379/Top-view-of-different-configurations-for-Stewart-platforms-a-configuration-with.png)

Source: [Martinez, Peña, Soto - International Journal of Advanced Robotic Systems](https://www.researchgate.net/publication/260637657_Towards_a_Robust_Solution_of_the_Non-Linear_Kinematics_for_the_General_Stewart_Platform_with_Estimation_of_Distribution_Algorithms)

I employed regular hexagons for both the platform and base in order to take advantage of symmetries while demonstrating 6 DOF.

stewart-little-three is hosted on Github Pages using ghpages react