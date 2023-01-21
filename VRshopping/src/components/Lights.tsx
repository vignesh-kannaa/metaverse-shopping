import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";

type Props = {
  isTest: boolean;
};

const Lights: React.FC<Props> = (isTest) => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  {
    isTest ? useHelper(lightRef, DirectionalLightHelper, 5, "white") : null;
  }
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        ref={lightRef}
        position={[0, 50, 50]}
        shadow-mapSize-height={1000}
        shadow-mapSize-width={1000}
        castShadow
      />
    </>
  );
};
export default Lights;
