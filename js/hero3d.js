/**
 * Hero: a 3D value landscape.
 * A gridworld runs value iteration every frame with the cursor as the goal; each cell is a
 * column whose height and brightness follow its value, so value rises toward the cursor and flows
 * around "holes".
 * Returns false if WebGL / Three.js is unavailable so the caller can fall back to 2D.
 */

const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js';
const GAMMA = 0.9;

export async function initHero3D(canvas, { reduced = false, mobile = false } = {}) {
    let THREE;
    try {
        THREE = await import(THREE_URL);
    } catch {
        return false;
    }

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: (window.devicePixelRatio || 1) < 1.5, alpha: true, powerPreference: 'high-performance' });
    } catch {
        return false;
    }

    const hero = canvas.parentElement;
    const COLS = mobile ? 22 : 44;
    const ROWS = mobile ? 22 : 28;
    const N = COLS * ROWS;
    const idx = (c, r) => r * COLS + c;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x070708, 24, 58);

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 200);
    const camBase = mobile ? new THREE.Vector3(0, 24, 24) : new THREE.Vector3(-2, 17, 29);
    const lookAt = mobile ? new THREE.Vector3(0, 0, 2) : new THREE.Vector3(3, 0, 3);
    camera.position.copy(camBase);
    camera.lookAt(lookAt);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(-8, 18, 10);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x8cc8ff, 0.8);
    rim.position.set(12, 6, -14);
    scene.add(rim);
    const glow = new THREE.PointLight(0x8cc8ff, 50, 14, 1.6);
    scene.add(glow);

    // Columns
    const geo = new THREE.BoxGeometry(0.84, 1, 0.84);
    geo.translate(0, 0.5, 0);
    const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const mesh = new THREE.InstancedMesh(geo, mat, N);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(mesh);

    const offsetX = -(COLS - 1) / 2 + (mobile ? 0 : 4);
    const offsetZ = -(ROWS - 1) / 2;
    const cellPos = (c, r) => [c + offsetX, r + offsetZ];

    // Holes (deterministic)
    const holes = new Uint8Array(N);
    let seed = 11;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < N; i++) holes[i] = rand() < 0.08 ? 1 : 0;

    let V = new Float32Array(N);
    let next = new Float32Array(N);
    const H = new Float32Array(N).fill(0.12);

    const goal = { c: Math.floor(COLS * 0.65), r: Math.floor(ROWS * 0.5) };
    const setGoal = (c, r) => {
        goal.c = Math.max(0, Math.min(COLS - 1, c));
        goal.r = Math.max(0, Math.min(ROWS - 1, r));
        holes[idx(goal.c, goal.r)] = 0;
    };

    function sweep() {
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const i = idx(c, r);
                if (holes[i]) { next[i] = 0; continue; }
                if (c === goal.c && r === goal.r) { next[i] = 1; continue; }
                let best = 0;
                if (c > 0 && V[i - 1] > best) best = V[i - 1];
                if (c < COLS - 1 && V[i + 1] > best) best = V[i + 1];
                if (r > 0 && V[i - COLS] > best) best = V[i - COLS];
                if (r < ROWS - 1 && V[i + COLS] > best) best = V[i + COLS];
                next[i] = GAMMA * best;
            }
        }
        const t = V; V = next; next = t;
    }

    // Pointer → goal via raycast onto the ground plane
    const raycaster = new THREE.Raycaster();
    const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const ndc = new THREE.Vector2();
    const hit = new THREE.Vector3();
    let pointer = null;
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 };
    hero.addEventListener('pointermove', (e) => {
        const rect = canvas.getBoundingClientRect();
        ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        parallax.tx = ndc.x;
        parallax.ty = ndc.y;
        if (e.pointerType === 'mouse') pointer = true;
    });
    hero.addEventListener('pointerleave', () => { pointer = null; parallax.tx = 0; parallax.ty = 0; });

    let scrollProgress = 0;

    const dummy = new THREE.Object3D();
    const cLow = new THREE.Color(0x141418);
    const cMid = new THREE.Color(0x2b3d52);
    const cHigh = new THREE.Color(0x8cc8ff);
    const cGoal = new THREE.Color(0xbfe0ff);
    const cHole = new THREE.Color(0x050506);
    const tmp = new THREE.Color();

    function updateMesh(ease) {
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const i = idx(c, r);
                const isGoal = c === goal.c && r === goal.r;
                const target = holes[i] ? 0.02 : isGoal ? 3.6 : 0.1 + Math.pow(V[i], 2.2) * 3.2;
                H[i] += (target - H[i]) * ease;
                const [x, z] = cellPos(c, r);
                dummy.position.set(x, 0, z);
                dummy.scale.set(1, Math.max(0.02, H[i]), 1);
                dummy.updateMatrix();
                mesh.setMatrixAt(i, dummy.matrix);
                if (holes[i]) tmp.copy(cHole);
                else if (isGoal) tmp.copy(cGoal);
                else {
                    const v = V[i] * V[i];
                    if (v < 0.5) tmp.copy(cLow).lerp(cMid, v / 0.5);
                    else tmp.copy(cMid).lerp(cHigh, (v - 0.5) / 0.5);
                }
                mesh.setColorAt(i, tmp);
            }
        }
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }

    function resize() {
        const rect = hero.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height, false);
        camera.aspect = rect.width / Math.max(1, rect.height);
        camera.updateProjectionMatrix();
    }
    resize();
    let rt = 0;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 120); });

    let running = false;
    let raf = 0;
    const t0 = performance.now();

    let lastFrame = 0;
    function frame(now) {
        if (!running) return;
        raf = requestAnimationFrame(frame);
        // Cap at ~60fps so 120Hz screens don't double the work
        if (now - lastFrame < 15) return;
        lastFrame = now;
        const t = (now - t0) / 1000;
        if (pointer) {
            raycaster.setFromCamera(ndc, camera);
            if (raycaster.ray.intersectPlane(ground, hit)) {
                setGoal(Math.round(hit.x - offsetX), Math.round(hit.z - offsetZ));
            }
        } else {
            setGoal(
                Math.floor(COLS * (0.55 + 0.2 * Math.sin(t * 0.32))),
                Math.floor(ROWS * (0.6 + 0.22 * Math.sin(t * 0.47 + 1)))
            );
        }
        sweep();
        updateMesh(0.12);

        const [gx, gz] = cellPos(goal.c, goal.r);
        glow.position.x += (gx - glow.position.x) * 0.15;
        glow.position.z += (gz - glow.position.z) * 0.15;
        glow.position.y = 7;
        glow.intensity = 46 + Math.sin(t * 3) * 10;

        parallax.x += (parallax.tx - parallax.x) * 0.04;
        parallax.y += (parallax.ty - parallax.y) * 0.04;
        camera.position.set(
            camBase.x + parallax.x * 2.2 + Math.sin(t * 0.15) * 0.8,
            camBase.y + parallax.y * 1.2 + scrollProgress * 10,
            camBase.z - scrollProgress * 6
        );
        camera.lookAt(lookAt);

        renderer.render(scene, camera);
    }

    function start() {
        if (running) return;
        running = true;
        raf = requestAnimationFrame(frame);
    }
    function stop() {
        running = false;
        cancelAnimationFrame(raf);
    }

    if (reduced) {
        for (let i = 0; i < 80; i++) sweep();
        updateMesh(1);
        renderer.render(scene, camera);
    } else {
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !document.hidden) start();
            else stop();
        });
        io.observe(hero);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stop();
            else if (hero.getBoundingClientRect().bottom > 0) start();
        });
    }

    return {
        setScroll(p) { scrollProgress = p; },
    };
}
