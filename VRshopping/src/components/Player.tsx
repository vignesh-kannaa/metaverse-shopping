import useInput from "../hooks/useInput";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

let walkDirection = new THREE.Vector3();
let roateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuarternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

const direcitonOffset = ({ forward, backward, left, right }) => {
  let directionOffset = 0; //w

  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4; //w+a
    } else if (right) {
      directionOffset = -Math.PI / 4; //w+d
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2; //s+a
    } else if (right) {
      directionOffset = -Math.PI / 4 - Math.PI / 2; //s+d
    } else {
      directionOffset = Math.PI; //s
    }
  } else if (right) {
    directionOffset = -Math.PI / 2; //d
  } else if (left) {
    directionOffset = Math.PI / 2; //a
  }
  return directionOffset;
};
const Player = () => {
  const { forward, backward, left, right, jumping } = useInput();
  const player = useGLTF("./model/player.glb");
  const { actions } = useAnimations(player.animations, player.scene);
  // console.log("playerdata:", player);
  // console.log("action:", actions);
  player.scene.scale.set(10, 10, 10);
  player.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });
  // useEffect(() => {
  //   console.log("forward:", forward);
  //   console.log("backward:", backward);
  //   console.log("left:", left);
  //   console.log("right:", right);
  //   console.log("jumping:", jumping);
  //   actions?.idle?.play();
  // }),
  //   [];
  const currentAction = useRef("");
  const controlsRef = useRef<typeof OrbitControls>();
  const camera = useThree((state) => state.camera);

  const updateCameraTarget = (moveX: number, moveZ: number) => {
    //move camera
    camera.position.x += moveX;
    camera.position.z += moveZ;
    //update camera target
    cameraTarget.x = player.scene.position.x;
    cameraTarget.y = player.scene.position.y + 2;
    cameraTarget.z = player.scene.position.z;
    if (controlsRef.current) controlsRef.current.target = cameraTarget;
  };
  useEffect(() => {
    let action = "";

    if (forward || backward || left || right) {
      action = "walking";
    } else if (jumping) {
      action = "jumping";
    } else {
      action = "idle";
    }

    if (currentAction.current != action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }),
    [forward, backward, left, right, jumping];

  useFrame((state, delta) => {
    if (
      currentAction.current == "running" ||
      currentAction.current == "walking"
    ) {
      //calculate towards camera direction
      let angleYcameraDirection = Math.atan2(
        camera.position.x - player.scene.position.x,
        camera.position.z - player.scene.position.z
      );
      //diagonal movement angle offset
      let newDirectionOffset = direcitonOffset({
        forward,
        backward,
        right,
        left,
      });
      // roate model
      rotateQuarternion.setFromAxisAngle(
        roateAngle,
        angleYcameraDirection + newDirectionOffset
      );
      player.scene.quaternion.rotateTowards(rotateQuarternion, 0.2);

      //calculate direction
      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(roateAngle, newDirectionOffset);

      //run/walk velocity
      const velocity = currentAction.current == "running" ? 5 : 10;
      // move model & camera
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      player.scene.position.x += moveX;
      player.scene.position.z += moveZ;
      updateCameraTarget(moveX, moveZ);
    }
  });
  return (
    <>
      <OrbitControls ref={controlsRef} />
      <primitive object={player.scene} />
    </>
  );
};
export default Player;
