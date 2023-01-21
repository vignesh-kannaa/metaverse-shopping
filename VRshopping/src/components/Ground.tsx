const Ground = () => {
  return (
    <>
      <mesh rotation-x={Math.PI * -0.5} receiveShadow>
        <planeBufferGeometry args={[1000, 1000]} />
        <meshStandardMaterial color={"green"} />
      </mesh>
    </>
  );
};
export default Ground;
