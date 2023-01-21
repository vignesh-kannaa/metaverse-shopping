import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useHelper, useTexture } from "@react-three/drei";
import { BoxHelper } from "three";
type Props = {
  isTest: boolean;
};

const TexturedShpere = () => {
  const map = useTexture("./textures/metal_plate_diff_1k.png");
  const rough = useTexture("./textures/metal_plate_rough_1k.png");
  const normal = useTexture("./textures/metal_plate_metal_1k.png");
  return (
    <>
      <mesh scale={[0.5, 0.5, 0.5]} position={[0, 1, 0]} castShadow>
        <sphereGeometry />
        <meshStandardMaterial
          map={map}
          roughnessMap={rough}
          normalMap={normal}
        />
      </mesh>
    </>
  );
};
const AnimatedBox: React.FC<Props> = (isTest) => {
  const meshRef = useRef<THREE.Mesh>(null);
  {
    isTest ? useHelper(meshRef, BoxHelper, "blue") : null;
  }
  useFrame(() => {
    console.log("Hey, I'm executing every frame!");
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.05;
    }
  });
  return <TexturedShpere />;
};
export default AnimatedBox;
