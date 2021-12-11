import { useRef, Suspense } from 'react';
import S_polymodel from './polymodel.module.scss';
import { Canvas } from '@react-three/fiber';
import { softShadows, useGLTF, OrbitControls } from '@react-three/drei';

// Enable soft shadows from drei
softShadows();

function Model({ ...props }) {
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
}

const PolyModel = () => {
  return (
    <>
      <Canvas
        shadows
        colorManagement
        className={S_polymodel.model_canvas}
        camera={{ position: [-2, 1, 3], fov: 50 }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 15, 0]}
          intensity={1.5}
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
            <shadowMaterial attach='material' opacity={0.7} />
          </mesh>
        </group>

        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default PolyModel;
