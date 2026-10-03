/**
 * 2D fallback for the hero (used when WebGL is unavailable): a gridworld running value iteration in real time.
 * The cursor is the goal; each frame does one Bellman sweep, so value ripples
 * outward and flows around "holes". Little agents follow the greedy policy.
 */

const GAMMA = 0.86;
const ACCENT = [140, 200, 255];
const CREAM = [255, 255, 255];

export function initHeroGrid(canvas, { reduced = false } = {}) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx.roundRect) ctx.roundRect = function (x, y, w, h) { this.rect(x, y, w, h); };
    const hero = canvas.parentElement;

    let dpr = 1;
    let w = 0;
    let h = 0;
    let cell = 44;
    let cols = 0;
    let rows = 0;
    let V = new Float32Array(0);
    let next = new Float32Array(0);
    let holes = new Uint8Array(0);
    let agents = [];
    let goal = { c: 0, r: 0 };
    let pointer = null;
    let running = false;
    let raf = 0;
    let t0 = performance.now();
    let lastAgentStep = 0;

    const idx = (c, r) => r * cols + c;

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = hero.getBoundingClientRect();
        w = rect.width;
        h = rect.height;
        cell = w < 640 ? 34 : 44;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cols = Math.ceil(w / cell);
        rows = Math.ceil(h / cell);
        V = new Float32Array(cols * rows);
        next = new Float32Array(cols * rows);
        holes = new Uint8Array(cols * rows);
        // Deterministic pseudo-random holes so the layout is stable between resizes.
        let seed = 7;
        const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
        for (let i = 0; i < holes.length; i++) holes[i] = rand() < 0.07 ? 1 : 0;
        agents = Array.from({ length: w < 640 ? 3 : 6 }, spawnAgent);
        autoGoal(performance.now());
        if (reduced) {
            for (let i = 0; i < 60; i++) sweep();
            draw(performance.now());
        }
    }

    function spawnAgent() {
        let c, r;
        do {
            c = Math.floor(Math.random() * cols);
            r = Math.floor(Math.random() * rows);
        } while (holes[idx(c, r)]);
        return { c, r, x: c, y: r, trail: [] };
    }

    function setGoal(c, r) {
        goal.c = Math.max(0, Math.min(cols - 1, c));
        goal.r = Math.max(0, Math.min(rows - 1, r));
        holes[idx(goal.c, goal.r)] = 0;
    }

    function autoGoal(now) {
        const t = (now - t0) / 1000;
        const c = Math.floor(cols * (0.62 + 0.26 * Math.sin(t * 0.35)));
        const r = Math.floor(rows * (0.5 + 0.32 * Math.sin(t * 0.53 + 1)));
        setGoal(c, r);
    }

    function sweep() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const i = idx(c, r);
                if (holes[i]) { next[i] = 0; continue; }
                if (c === goal.c && r === goal.r) { next[i] = 1; continue; }
                let best = 0;
                if (c > 0 && V[i - 1] > best) best = V[i - 1];
                if (c < cols - 1 && V[i + 1] > best) best = V[i + 1];
                if (r > 0 && V[i - cols] > best) best = V[i - cols];
                if (r < rows - 1 && V[i + cols] > best) best = V[i + cols];
                next[i] = GAMMA * best;
            }
        }
        const tmp = V; V = next; next = tmp;
    }

    function bestNeighbor(c, r) {
        let best = -1;
        let bc = c;
        let br = r;
        const consider = (nc, nr) => {
            if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) return;
            const v = V[idx(nc, nr)];
            if (v > best) { best = v; bc = nc; br = nr; }
        };
        consider(c - 1, r);
        consider(c + 1, r);
        consider(c, r - 1);
        consider(c, r + 1);
        return { c: bc, r: br, v: best };
    }

    function stepAgents() {
        for (const a of agents) {
            a.trail.push({ x: a.c, y: a.r });
            if (a.trail.length > 6) a.trail.shift();
            if ((a.c === goal.c && a.r === goal.r) || V[idx(a.c, a.r)] < 0.01) {
                Object.assign(a, spawnAgent());
                a.trail = [];
                continue;
            }
            let n = bestNeighbor(a.c, a.r);
            if (Math.random() < 0.12) {
                const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
                const [dc, dr] = dirs[Math.floor(Math.random() * 4)];
                const nc = a.c + dc;
                const nr = a.r + dr;
                if (nc >= 0 && nr >= 0 && nc < cols && nr < rows && !holes[idx(nc, nr)]) n = { c: nc, r: nr };
            }
            a.c = n.c;
            a.r = n.r;
        }
    }

    const rgba = (rgb, a) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

    function draw(now) {
        ctx.clearRect(0, 0, w, h);
        const pad = 5;
        const size = cell - pad * 2;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const i = idx(c, r);
                const x = c * cell;
                const y = r * cell;
                if (holes[i]) {
                    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.roundRect(x + pad + 0.5, y + pad + 0.5, size - 1, size - 1, 6);
                    ctx.stroke();
                    continue;
                }
                const v = V[i];
                if (v > 0.03) {
                    ctx.fillStyle = rgba(ACCENT, Math.min(0.55, v * v * 0.6));
                    ctx.beginPath();
                    ctx.roundRect(x + pad, y + pad, size, size, 6);
                    ctx.fill();
                    if (v > 0.38 && !(c === goal.c && r === goal.r)) {
                        const n = bestNeighbor(c, r);
                        const cx = x + cell / 2;
                        const cy = y + cell / 2;
                        const dx = Math.sign(n.c - c);
                        const dy = Math.sign(n.r - r);
                        ctx.strokeStyle = rgba(CREAM, Math.min(0.7, v * 0.8));
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(cx - dx * 5, cy - dy * 5);
                        ctx.lineTo(cx + dx * 5, cy + dy * 5);
                        ctx.lineTo(cx + dx * 5 - dy * 3 - dx * 3, cy + dy * 5 - dx * 3 - dy * 3);
                        ctx.moveTo(cx + dx * 5, cy + dy * 5);
                        ctx.lineTo(cx + dx * 5 + dy * 3 - dx * 3, cy + dy * 5 + dx * 3 - dy * 3);
                        ctx.stroke();
                    }
                } else {
                    ctx.fillStyle = 'rgba(255,255,255,0.07)';
                    ctx.fillRect(x + cell / 2 - 1, y + cell / 2 - 1, 2, 2);
                }
            }
        }

        // Goal
        const gx = goal.c * cell + cell / 2;
        const gy = goal.r * cell + cell / 2;
        const pulse = (Math.sin(now / 300) + 1) / 2;
        ctx.fillStyle = rgba(ACCENT, 1);
        ctx.beginPath();
        ctx.roundRect(goal.c * cell + pad, goal.r * cell + pad, size, size, 6);
        ctx.fill();
        ctx.strokeStyle = rgba(ACCENT, 0.5 - pulse * 0.4);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(gx, gy, cell * (0.7 + pulse * 0.5), 0, Math.PI * 2);
        ctx.stroke();

        // Agents (eased toward their cell)
        for (const a of agents) {
            a.x += (a.c - a.x) * 0.25;
            a.y += (a.r - a.y) * 0.25;
            a.trail.forEach((p, k) => {
                ctx.fillStyle = rgba(CREAM, (k + 1) / a.trail.length * 0.18);
                ctx.beginPath();
                ctx.arc(p.x * cell + cell / 2, p.y * cell + cell / 2, 3, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.fillStyle = rgba(CREAM, 0.95);
            ctx.beginPath();
            ctx.arc(a.x * cell + cell / 2, a.y * cell + cell / 2, 4.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function frame(now) {
        if (!running) return;
        if (pointer) setGoal(Math.floor(pointer.x / cell), Math.floor(pointer.y / cell));
        else autoGoal(now);
        sweep();
        if (now - lastAgentStep > 110) {
            stepAgents();
            lastAgentStep = now;
        }
        draw(now);
        raf = requestAnimationFrame(frame);
    }

    function start() {
        if (running || reduced) return;
        running = true;
        raf = requestAnimationFrame(frame);
    }
    function stop() {
        running = false;
        cancelAnimationFrame(raf);
    }

    hero.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const rect = hero.getBoundingClientRect();
        pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    });
    hero.addEventListener('pointerleave', () => { pointer = null; });

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
    });

    resize();

    if (!reduced) {
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
}
