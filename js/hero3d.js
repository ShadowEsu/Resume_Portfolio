/**
 * Hero 3D — abstract neural network built from three layered node clusters,
 * connecting edges, and "signal" particles that travel along random edges.
 * One Points + one LineSegments + one Points draw call total.
 */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const MOBILE = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;

const CONFIG = {
    nodes: MOBILE ? 130 : 300,
    signals: MOBILE ? 20 : 55,
    connectDist: MOBILE ? 3.4 : 2.9,
    maxDpr: MOBILE ? 1.5 : 2,
    accent: new THREE.Color('#e0232f'),
    green: new THREE.Color('#f5f7fa'),
    dim: new THREE.Color('#6e2028')
};

function makeCircleSprite() {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.4, 'rgba(255,255,255,0.6)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

/** Nodes arranged as loose vertical "layers" of a network, with organic jitter. */
function buildNodePositions(count) {
    const positions = new Float32Array(count * 3);
    const layers = 5;
    for (let i = 0; i < count; i++) {
        const layer = i % layers;
        const x = (layer - (layers - 1) / 2) * 3.2 + (Math.random() - 0.5) * 1.6;
        // cluster each layer in a squashed disc
        const r = Math.sqrt(Math.random()) * 4.2;
        const theta = Math.random() * Math.PI * 2;
        const y = Math.cos(theta) * r * 0.85;
        const z = Math.sin(theta) * r;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.8;
        positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.8;
    }
    return positions;
}

function buildEdges(positions, count, maxDist) {
    const edges = [];
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

export function initHero(canvas) {
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
        return null; // no WebGL — CSS backdrop stays
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
    camera.position.set(0, 0, 13);

    const group = new THREE.Group();
    scene.add(group);

    // --- nodes ---
    const nodePos = buildNodePositions(CONFIG.nodes);
    const nodeColors = new Float32Array(CONFIG.nodes * 3);
    const nodePhase = new Float32Array(CONFIG.nodes);
    const tmp = new THREE.Color();
    for (let i = 0; i < CONFIG.nodes; i++) {
        const roll = Math.random();
        tmp.copy(roll > 0.92 ? CONFIG.green : roll > 0.55 ? CONFIG.accent : CONFIG.dim);
        nodeColors[i * 3] = tmp.r;
        nodeColors[i * 3 + 1] = tmp.g;
        nodeColors[i * 3 + 2] = tmp.b;
        nodePhase[i] = Math.random() * Math.PI * 2;
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
    nodeGeo.setAttribute('aPhase', new THREE.BufferAttribute(nodePhase, 1));

    const sprite = makeCircleSprite();
    const nodeMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uMap: { value: sprite }, uScale: { value: 1 } },
        vertexShader: `
            attribute float aPhase;
            varying vec3 vColor;
            varying float vTwinkle;
            uniform float uTime;
            uniform float uScale;
            void main() {
                vColor = color;
                vTwinkle = 0.65 + 0.35 * sin(uTime * 1.4 + aPhase);
                vec4 mv = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = (110.0 * uScale / -mv.z) * (0.8 + 0.4 * sin(uTime + aPhase));
                gl_Position = projectionMatrix * mv;
            }`,
        fragmentShader: `
            varying vec3 vColor;
            varying float vTwinkle;
            uniform sampler2D uMap;
            void main() {
                float a = texture2D(uMap, gl_PointCoord).a;
                gl_FragColor = vec4(vColor, a * vTwinkle);
            }`,
        vertexColors: true
    });
    group.add(new THREE.Points(nodeGeo, nodeMat));

    // --- edges ---
    const edges = buildEdges(nodePos, CONFIG.nodes, CONFIG.connectDist);
    const linePos = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], k) => {
        linePos.set(nodePos.subarray(a * 3, a * 3 + 3), k * 6);
        linePos.set(nodePos.subarray(b * 3, b * 3 + 3), k * 6 + 3);
    });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({
        color: CONFIG.accent,
        transparent: true,
        opacity: 0.13,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    // --- signals traveling along edges ---
    const sigCount = Math.min(CONFIG.signals, edges.length);
    const sigPos = new Float32Array(sigCount * 3);
    const sigState = []; // { edge, t, speed }
    for (let i = 0; i < sigCount; i++) {
        sigState.push({
            edge: edges[Math.floor(Math.random() * edges.length)],
            t: Math.random(),
            speed: 0.25 + Math.random() * 0.6
        });
    }
    const sigGeo = new THREE.BufferGeometry();
    sigGeo.setAttribute('position', new THREE.BufferAttribute(sigPos, 3));
    const sigMat = new THREE.PointsMaterial({
        size: 0.14,
        map: sprite,
        color: CONFIG.accent,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    group.add(new THREE.Points(sigGeo, sigMat));

    // --- state ---
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let scrollProgress = 0;
    let running = false;
    let visible = true;
    let rafId = 0;
    const clock = new THREE.Clock();

    function resize() {
        const w = canvas.clientWidth || canvas.parentElement.clientWidth;
        const h = canvas.clientHeight || canvas.parentElement.clientHeight;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, CONFIG.maxDpr));
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }

    function frame() {
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;

        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;

        group.rotation.y = t * 0.05 + mouse.x * 0.28 + scrollProgress * 1.4;
        group.rotation.x = mouse.y * 0.18 + scrollProgress * 0.5;
        camera.position.z = 13 - scrollProgress * 4.5;
        group.position.y = scrollProgress * 2.2;

        nodeMat.uniforms.uTime.value = t;

        for (let i = 0; i < sigCount; i++) {
            const s = sigState[i];
            s.t += s.speed * dt;
            if (s.t >= 1) {
                s.t = 0;
                s.edge = edges[Math.floor(Math.random() * edges.length)];
            }
            const [a, b] = s.edge;
            sigPos[i * 3] = nodePos[a * 3] + (nodePos[b * 3] - nodePos[a * 3]) * s.t;
            sigPos[i * 3 + 1] = nodePos[a * 3 + 1] + (nodePos[b * 3 + 1] - nodePos[a * 3 + 1]) * s.t;
            sigPos[i * 3 + 2] = nodePos[a * 3 + 2] + (nodePos[b * 3 + 2] - nodePos[a * 3 + 2]) * s.t;
        }
        sigGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
        if (running) rafId = requestAnimationFrame(frame);
    }

    function start() {
        if (running || REDUCED) return;
        running = true;
        clock.getDelta();
        rafId = requestAnimationFrame(frame);
    }
    function stop() {
        running = false;
        cancelAnimationFrame(rafId);
    }

    // --- wiring ---
    resize();
    window.addEventListener('resize', resize);

    if (!MOBILE) {
        window.addEventListener('pointermove', (e) => {
            mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
        }, { passive: true });
    }

    // pause when hero is offscreen or tab hidden
    new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start(); else stop();
    }, { threshold: 0.01 }).observe(canvas);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop();
        else if (visible) start();
    });

    if (REDUCED) {
        frame(); // single static frame
    } else {
        start();
    }

    return {
        setScroll(p) {
            scrollProgress = p;
            if (REDUCED) renderer.render(scene, camera);
        }
    };
}
