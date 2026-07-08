import { ContactShadows } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

type Props = {
  lowPower: boolean;
};

type Edge = [number, number];

function buildNodePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const layers = 5;
  for (let i = 0; i < count; i++) {
    const layer = i % layers;
    const x = (layer - (layers - 1) / 2) * 2.6 + (Math.random() - 0.5) * 1.1;
    const r = Math.sqrt(Math.random()) * 3.6;
    const theta = Math.random() * Math.PI * 2;
    const y = Math.cos(theta) * r * 0.78;
    const z = Math.sin(theta) * r;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.6;
    positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.6;
  }
  return positions;
}

function buildEdges(positions: Float32Array, count: number, maxDist: number): Edge[] {
  const edges: Edge[] = [];
  const maxSq = maxDist * maxDist;
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < maxSq) edges.push([i, j]);
    }
  }
  return edges;
}

export function IntroScene({ lowPower }: Props): JSX.Element {
  const group = useRef<THREE.Group>(null);
  const signals = useRef<THREE.Points>(null);
  const core = useRef<THREE.Mesh>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const rim = useRef<THREE.PointLight>(null);
  const ember = useRef<THREE.PointLight>(null);
  const scroll = useRef({ p: 0, v: 0, prevP: 0 });
  const settle = useRef({ amp: 0 });
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { camera } = useThree();

  const cfg = useMemo(() => {
    const nodes = lowPower ? 120 : 240;
    const connectDist = lowPower ? 3.6 : 3.0;
    const signalCount = lowPower ? 14 : 36;
    return { nodes, connectDist, signalCount };
  }, [lowPower]);

  const geom = useMemo(() => {
    const nodePos = buildNodePositions(cfg.nodes);
    const edges = buildEdges(nodePos, cfg.nodes, cfg.connectDist);

    const linePos = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], k) => {
      linePos.set(nodePos.subarray(a * 3, a * 3 + 3), k * 6);
      linePos.set(nodePos.subarray(b * 3, b * 3 + 3), k * 6 + 3);
    });

    const sigPos = new Float32Array(cfg.signalCount * 3);
    const sigState = new Array(cfg.signalCount).fill(0).map(() => {
      const edge = edges[Math.floor(Math.random() * edges.length)];
      return {
        edge,
        t: Math.random(),
        speed: 0.22 + Math.random() * 0.7,
      };
    });

    return { nodePos, edges, linePos, sigPos, sigState };
  }, [cfg]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.current.set(x, y);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const cameraPath = useMemo(() => {
    // A deliberate dolly with a slight “arc”, not a static camera.
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.6, 0.35, 12.2),
      new THREE.Vector3(-0.8, 0.55, 10.2),
      new THREE.Vector3(0.55, 0.85, 8.2),
      new THREE.Vector3(1.15, 1.15, 6.9),
    ]);
  }, []);

  const lookPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.1, 0.25, 0.2),
      new THREE.Vector3(0.2, 0.35, 0.0),
      new THREE.Vector3(0.45, 0.55, -0.15),
      new THREE.Vector3(0.65, 0.85, -0.25),
    ]);
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    // Read native scroll once per frame (no Lenis / no duplicate ScrollTrigger)
    const hero = document.getElementById('hero');
    let p = scroll.current.p;
    let v = scroll.current.v;
    if (hero) {
      const scrollable = Math.max(1, hero.offsetHeight - window.innerHeight);
      const nextP = THREE.MathUtils.clamp(window.scrollY / scrollable, 0, 1);
      v = (nextP - scroll.current.p) / Math.max(dt, 0.001);
      scroll.current.prevP = scroll.current.p;
      scroll.current.p = nextP;
      scroll.current.v = v;
      p = nextP;
    }
    const rawV = v;
    const vClamped = THREE.MathUtils.clamp(rawV, -3, 3);

    // “camera settle” when the hero section finishes
    if (scroll.current.prevP < 0.99 && p >= 0.99) {
      gsap.fromTo(
        settle.current,
        { amp: 1 },
        { amp: 0, duration: 0.85, ease: 'expo.out' }
      );
    }

    // Scroll velocity awareness — faster scroll = more energy.
    const energy = THREE.MathUtils.clamp(Math.abs(vClamped) * 0.25, 0, 1);

    if (group.current) {
      // posture: slight forward lean + “set designer” angle
      const mx = mouse.current.x;
      const my = mouse.current.y;
      group.current.rotation.y = t * 0.04 + p * 0.55 + mx * 0.08;
      group.current.rotation.x = -0.12 + Math.sin(t * 0.18) * 0.05 + p * 0.16 + my * 0.05;
      group.current.rotation.z = 0.06 + Math.sin(t * 0.11) * 0.02;
      group.current.position.y = p * 0.55;
      group.current.position.x = mx * 0.12;
    }

    // Scroll-driven camera: dolly along curve
    const camP = cameraPath.getPoint(p);
    const lookP = lookPath.getPoint(p);
    const shake =
      (Math.sin(t * 11.0) * 0.004 + Math.sin(t * 7.0 + 1.7) * 0.003) *
      (0.35 + energy) *
      (0.35 + settle.current.amp);

    camera.position.set(camP.x + shake, camP.y + shake * 0.6, camP.z);
    camera.lookAt(lookP.x, lookP.y, lookP.z);

    // signals update
    const posAttr = signals.current?.geometry.getAttribute('position') as THREE.BufferAttribute | undefined;
    if (posAttr) {
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < geom.sigState.length; i++) {
        const s = geom.sigState[i];
        const speedBoost = 1 + energy * 1.25;
        s.t += s.speed * speedBoost * Math.min(dt, 0.05);
        if (s.t >= 1) {
          s.t = 0;
          s.edge = geom.edges[Math.floor(Math.random() * geom.edges.length)];
        }
        const [a, b] = s.edge;
        const ax = geom.nodePos[a * 3];
        const ay = geom.nodePos[a * 3 + 1];
        const az = geom.nodePos[a * 3 + 2];
        const bx = geom.nodePos[b * 3];
        const by = geom.nodePos[b * 3 + 1];
        const bz = geom.nodePos[b * 3 + 2];
        arr[i * 3] = ax + (bx - ax) * s.t;
        arr[i * 3 + 1] = ay + (by - ay) * s.t;
        arr[i * 3 + 2] = az + (bz - az) * s.t;
      }
      posAttr.needsUpdate = true;
    }

    // subtle breathing of space between “ink” and “ember”
    state.scene.fog = state.scene.fog ?? new THREE.Fog(0x07080a, 10, 26);
    (state.scene.fog as THREE.Fog).near = 10 - p * 3;
    (state.scene.fog as THREE.Fog).far = 26 - p * 5;

    // Lighting: clear key + rim + ember “voltage”
    if (key.current) {
      key.current.intensity = (lowPower ? 0.7 : 0.95) + energy * 0.25;
      key.current.position.x = 6 + mouse.current.x * 1.2;
      key.current.position.y = 6 + mouse.current.y * -0.8;
    }
    if (rim.current) {
      rim.current.intensity = (lowPower ? 0.55 : 0.85) + energy * 0.3;
      rim.current.position.x = -5 - mouse.current.x * 0.9;
      rim.current.position.y = 2.5;
      rim.current.position.z = -7;
    }
    if (ember.current) {
      ember.current.intensity = (lowPower ? 1.0 : 1.35) + energy * 0.6;
      ember.current.position.y = -1.4 + Math.sin(t * 0.8) * 0.15;
    }

    // Core object: “alive” but restrained
    if (core.current) {
      core.current.rotation.y = -0.4 + p * 0.9 + Math.sin(t * 0.25) * 0.05;
      core.current.rotation.x = 0.18 + Math.sin(t * 0.2 + 1) * 0.03;
      core.current.position.y = -0.05 + Math.sin(t * 0.35) * 0.08;
    }
  });

  return (
    <>
      <color attach="background" args={['#07080a']} />
      <ambientLight intensity={0.16} />
      <directionalLight
        ref={key}
        position={[6, 6, 7]}
        intensity={0.95}
        color="#e7e4dc"
        castShadow={!lowPower}
        shadow-mapSize-width={lowPower ? 512 : 1024}
        shadow-mapSize-height={lowPower ? 512 : 1024}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight ref={ember} position={[-6, -2, 4]} intensity={1.35} color="#c1121f" distance={18} />
      <pointLight ref={rim} position={[-5, 2.5, -7]} intensity={0.85} color="#dfe8ff" distance={22} />

      {/* A “ground” plane gives weight even when subtle */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -2.35, 0]} receiveShadow={!lowPower}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#07080a" roughness={1} metalness={0} />
      </mesh>

      {!lowPower && (
        <ContactShadows
          opacity={0.38}
          scale={12}
          blur={2.6}
          far={7}
          resolution={256}
          color="#000000"
          position={[0, -2.32, 0]}
        />
      )}

      <group ref={group} position={[0, 0, 0]}>
        <mesh ref={core} castShadow={!lowPower} receiveShadow={!lowPower} position={[0.25, -0.05, -0.25]}>
          <capsuleGeometry args={[0.55, 2.4, 14, 28]} />
          <meshStandardMaterial
            color="#131319"
            metalness={0.55}
            roughness={0.28}
            emissive="#1a080c"
            emissiveIntensity={0.55}
          />
        </mesh>

        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={geom.nodePos.length / 3}
              array={geom.nodePos}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={lowPower ? 0.05 : 0.06}
            sizeAttenuation
            color="#e7e4dc"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={geom.linePos.length / 3}
              array={geom.linePos}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#c1121f"
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>

        <points ref={signals}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={geom.sigPos.length / 3}
              array={geom.sigPos}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={lowPower ? 0.085 : 0.095}
            sizeAttenuation
            color="#e0232f"
            transparent
            opacity={0.95}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>
    </>
  );
}

