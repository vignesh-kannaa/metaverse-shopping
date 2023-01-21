import AnimatedBox from "../components/AnimatedBox";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei/core";
import Lights from "../components/Lights";
import Ground from "../components/Ground";
import Trees from "../components/Trees";
import Player from "../components/Player";

export default function Home() {
  const test = false;
  return (
    <div className="container">
      <Canvas shadows>
        {test ? <Stats /> : null}
        {test ? <axesHelper args={[2]} /> : null}
        {test ? <gridHelper args={[100, 10]} /> : null}
        <OrbitControls />
        <Lights isTest={test} />
        {/* <Ground /> */}
        <Trees />
        <Player />
      </Canvas>
    </div>
  );
}
