/**
 * Live tabular Q-learning on a 4×4 FrozenLake, drawn to canvas.
 * Slightly slippery (80% intended move), optional potential-based reward shaping
 * with Φ(s) = −manhattan(s, goal) / 6.
 */

const MAP = ['SFFF', 'FHFH', 'FFFH', 'HFFG'];
const N = 4;
const ACTIONS = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // left, down, right, up as [dc, dr]
const ALPHA = 0.2;
const GAMMA = 0.95;
const MAX_STEPS = 60;
const MAX_EPISODES = 400;
const WINDOW = 50;

const tile = (s) => MAP[Math.floor(s / N)][s % N];
const isTerminal = (s) => tile(s) === 'H' || tile(s) === 'G';
const phi = (s) => -((N - 1 - (s % N)) + (N - 1 - Math.floor(s / N))) / 6;

export function initLake({ canvas, runBtn, resetBtn, shapingInput, episodesEl, successEl, solvedEl, sparkEl, reduced }) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const SIZE = 400;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!ctx.roundRect) ctx.roundRect = function (x, y, w, h) { this.rect(x, y, w, h); };

    let Q;
    let state;
    let steps;
    let episode;
    let epsilon;
    let results;
    let curve;
    let firstSolved;
    let running = false;
    let raf = 0;
    let agentX = 0;
    let agentY = 0;
    let flash = 0;
    let started = false;
    let autoPaused = false;

    function reset() {
        Q = Array.from({ length: N * N }, () => [0, 0, 0, 0]);
        state = 0;
        steps = 0;
        episode = 0;
        epsilon = 1;
        results = [];
        curve = [];
        firstSolved = null;
        agentX = 0;
        agentY = 0;
        updateStats();
        draw();
    }

    function move(s, a) {
        // 80% intended direction, 10% each perpendicular
        const roll = Math.random();
        let act = a;
        if (roll > 0.9) act = (a + 1) % 4;
        else if (roll > 0.8) act = (a + 3) % 4;
        const [dc, dr] = ACTIONS[act];
        const c = Math.min(N - 1, Math.max(0, (s % N) + dc));
        const r = Math.min(N - 1, Math.max(0, Math.floor(s / N) + dr));
        return r * N + c;
    }

    function choose(s) {
        if (Math.random() < epsilon) return Math.floor(Math.random() * 4);
        const q = Q[s];
        const max = Math.max(...q);
        const best = [0, 1, 2, 3].filter((a) => q[a] === max);
        return best[Math.floor(Math.random() * best.length)];
    }

    function step() {
        const a = choose(state);
        const s2 = move(state, a);
        let r = tile(s2) === 'G' ? 1 : 0;
        if (shapingInput.checked) r += GAMMA * phi(s2) - phi(state);
        const target = isTerminal(s2) ? r : r + GAMMA * Math.max(...Q[s2]);
        Q[state][a] += ALPHA * (target - Q[state][a]);
        state = s2;
        steps += 1;
        if (isTerminal(s2) || steps >= MAX_STEPS) endEpisode(tile(s2) === 'G');
    }

    function endEpisode(success) {
        episode += 1;
        results.push(success ? 1 : 0);
        if (results.length > WINDOW) results.shift();
        curve.push(results.reduce((a, b) => a + b, 0) / results.length);
        if (success && firstSolved === null) firstSolved = episode;
        if (success) flash = 1;
        epsilon = Math.max(0.05, epsilon * 0.975);
        state = 0;
        steps = 0;
        updateStats();
        if (episode >= MAX_EPISODES) pause();
    }

    function updateStats() {
        episodesEl.textContent = String(episode);
        const rate = results.length ? results.reduce((a, b) => a + b, 0) / results.length : 0;
        successEl.textContent = `${Math.round(rate * 100)}%`;
        solvedEl.textContent = firstSolved === null ? '—' : `ep ${firstSolved}`;
        const path = sparkEl.querySelector('path');
        if (!curve.length) { path.setAttribute('d', ''); return; }
        const pts = curve.map((v, i) => {
            const x = (i / Math.max(1, MAX_EPISODES - 1)) * 160;
            const y = 46 - v * 44;
            return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
        });
        path.setAttribute('d', pts.join(''));
    }

    function draw() {
        const gap = 6;
        const cell = (SIZE - gap * (N + 1)) / N;
        ctx.clearRect(0, 0, SIZE, SIZE);
        const values = Q.map((q) => Math.max(...q));
        const vmax = Math.max(0.05, ...values.filter((_, s) => !isTerminal(s)));

        for (let s = 0; s < N * N; s++) {
            const c = s % N;
            const r = Math.floor(s / N);
            const x = gap + c * (cell + gap);
            const y = gap + r * (cell + gap);
            const t = tile(s);
            ctx.beginPath();
            ctx.roundRect(x, y, cell, cell, 12);
            if (t === 'H') {
                ctx.fillStyle = '#030304';
                ctx.fill();
                ctx.strokeStyle = 'rgba(255,255,255,0.12)';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                ctx.beginPath();
                ctx.arc(x + cell / 2, y + cell / 2, cell * 0.22, 0, Math.PI * 2);
                ctx.stroke();
                continue;
            }
            if (t === 'G') {
                ctx.fillStyle = `rgba(255,255,255,${0.85 + flash * 0.15})`;
                ctx.fill();
                ctx.fillStyle = '#070708';
                ctx.font = '600 15px "JetBrains Mono", monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('GOAL', x + cell / 2, y + cell / 2);
                continue;
            }
            ctx.fillStyle = '#16161a';
            ctx.fill();
            const v = Math.max(0, values[s]) / vmax;
            if (v > 0.01) {
                ctx.fillStyle = `rgba(140,200,255,${Math.min(0.9, v * 0.85)})`;
                ctx.beginPath();
                ctx.roundRect(x, y, cell, cell, 12);
                ctx.fill();
            }
            if (t === 'S') {
                ctx.fillStyle = 'rgba(255,255,255,0.45)';
                ctx.font = '500 11px "JetBrains Mono", monospace';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText('START', x + 10, y + 10);
            }
            // Policy arrow
            const q = Q[s];
            const max = Math.max(...q);
            if (q.some((val) => val !== max)) {
                const a = q.indexOf(max);
                const [dc, dr] = ACTIONS[a];
                const cx = x + cell / 2;
                const cy = y + cell / 2;
                const L = cell * 0.18;
                ctx.strokeStyle = v > 0.55 ? 'rgba(7,7,8,0.85)' : 'rgba(255,255,255,0.92)';
                ctx.lineWidth = 2.5;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(cx - dc * L, cy - dr * L);
                ctx.lineTo(cx + dc * L, cy + dr * L);
                ctx.lineTo(cx + dc * L * 0.3 - dr * L * 0.6, cy + dr * L * 0.3 + dc * L * 0.6);
                ctx.moveTo(cx + dc * L, cy + dr * L);
                ctx.lineTo(cx + dc * L * 0.3 + dr * L * 0.6, cy + dr * L * 0.3 - dc * L * 0.6);
                ctx.stroke();
            }
        }

        // Agent
        const tc = state % N;
        const tr = Math.floor(state / N);
        agentX += (tc - agentX) * 0.35;
        agentY += (tr - agentY) * 0.35;
        const ax = gap + agentX * (cell + gap) + cell / 2;
        const ay = gap + agentY * (cell + gap) + cell / 2;
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.beginPath();
        ctx.arc(ax, ay, cell * 0.24, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#070708';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(ax, ay, cell * 0.13, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        flash *= 0.9;
    }

    let acc = 0;
    function loop() {
        if (!running) return;
        // Slow at first so you can watch the agent wander, then speed up.
        const perFrame = episode < 6 ? 0.25 : episode < 30 ? 1 : episode < 100 ? 4 : 12;
        acc += perFrame;
        while (acc >= 1 && running) {
            step();
            acc -= 1;
        }
        draw();
        raf = requestAnimationFrame(loop);
    }

    function play() {
        if (episode >= MAX_EPISODES) reset();
        running = true;
        runBtn.textContent = 'Pause';
        raf = requestAnimationFrame(loop);
    }
    function pause() {
        running = false;
        cancelAnimationFrame(raf);
        runBtn.textContent = episode >= MAX_EPISODES ? 'Train again' : 'Train';
        draw();
    }

    runBtn.addEventListener('click', () => {
        autoPaused = false;
        if (running) pause();
        else play();
    });
    resetBtn.addEventListener('click', () => {
        const was = running;
        pause();
        reset();
        if (was) play();
    });
    shapingInput.addEventListener('change', () => {
        const was = running;
        pause();
        reset();
        if (was) play();
    });

    reset();

    // Auto-start the first time the demo scrolls into view.
    if (!reduced) {
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && (!started || autoPaused)) {
                started = true;
                autoPaused = false;
                play();
            } else if (!entry.isIntersecting && running) {
                autoPaused = true;
                pause();
            }
        }, { threshold: 0.4 });
        io.observe(canvas);
    }
}
