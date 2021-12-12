import { useRef, Suspense, useState, useEffect } from 'react';
import S_polymodel from './polymodel.module.scss';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { softShadows, useGLTF, OrbitControls, Stats } from '@react-three/drei';

// Enable soft shadows from drei
softShadows();

const Model = ({ ...props }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF('test-compressed.glb');
  return (
    <group position={[0, -0.5, 0]} ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        geometry={nodes.Head_low.geometry}
        material={materials['Default_Mat.001']}
      />
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight
        position={[1, 3, 0]}
        intensity={1}
        power={5}
        distance={10}
        penumbra={0.3}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <group>
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.53, 0]}
        >
          <planeBufferGeometry attach='geometry' args={[100, 100]} />
          <meshStandardMaterial attach='material' opacity={0.7} color='#000' />
        </mesh>
      </group>

      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </>
  );
};

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();
  useFrame(() => controls.current.update());
  return (
    <OrbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
      enablePan={false}
    />
  );
};

const PolyModel = () => {
  return (
    <div>
      <Canvas
        shadows
        colorManagement
        className={S_polymodel.model_canvas}
        camera={{ position: [2, 0.3, 3], fov: 50 }}
      >
        <CameraControls />
        <Scene />
        <Stats />
      </Canvas>
    </div>
  );
};

export default PolyModel;
