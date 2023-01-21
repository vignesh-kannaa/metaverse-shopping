import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Trees = () => {
  const model = useLoader(GLTFLoader, "./model/vr_store.glb");
  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });
  return (
    <group rotation={[0, 2, 0]}>
      {/* <object3D scale={[0.1, 0.1, 0.1]} position={[10, 0, 10]}>
        <primitive object={model.scene.clone()} />
      </object3D>
      <object3D scale={[0.1, 0.1, 0.1]} position={[1, 0, 10]}>
        <primitive object={model.scene.clone()} />
      </object3D> */}
      <object3D scale={[10, 10, 10]} position={[0, 0, 0]}>
        <primitive object={model.scene.clone()} />
      </object3D>
    </group>
  );
};
export default Trees;
