/**
 * Portfolio visitor tracking — unique browsers via Supabase RPC.
 * Mirrors regradeapp.tech/stats.html pattern.
 */

const VISITOR_STORAGE_KEY = "portfolio_visitor_id";

function getVisitorId() {
    let id = localStorage.getItem(VISITOR_STORAGE_KEY);
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(VISITOR_STORAGE_KEY, id);
    }
    return id;
}

function getConfig() {
    return window.PORTFOLIO_CONFIG || null;
}

async function supabaseRpc(name, body = {}) {
    const cfg = getConfig();
    if (!cfg?.supabaseUrl || !cfg?.supabaseAnonKey) {
        throw new Error("Missing site-config.js");
    }

    const res = await fetch(`${cfg.supabaseUrl}/rest/v1/rpc/${name}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            apikey: cfg.supabaseAnonKey,
            Authorization: `Bearer ${cfg.supabaseAnonKey}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`RPC ${name} failed`);
    return res.json();
}

export async function registerPortfolioVisitor() {
    try {
        await supabaseRpc("register_portfolio_visitor", {
            p_visitor_id: getVisitorId(),
            p_path: window.location.pathname || "/",
        });
    } catch {
        /* Non-blocking */
    }
}

export async function fetchPortfolioVisitorStats() {
    return supabaseRpc("get_portfolio_visitor_stats", {});
}

export function formatVisitorCount(value) {
    return Number(value ?? 0).toLocaleString();
}

export async function initVisitorDashboard({
    statusEl,
    gridEl,
    metaEl,
}) {
    if (!getConfig()?.supabaseUrl) {
        statusEl.className = "stats-error";
        statusEl.textContent = "Missing site-config.js — Supabase credentials not found.";
        return;
    }

    try {
        await registerPortfolioVisitor();
        const data = await fetchPortfolioVisitorStats();

        const cards = [
            { value: data.total, label: "Total unique visitors" },
            { value: data.today, label: "New today" },
            { value: data.week, label: "New this week" },
        ];

        statusEl.hidden = true;
        gridEl.hidden = false;

        gridEl.innerHTML = cards
            .map(
                (c) =>
                    `<div class="stats-card glass-surface"><div class="stats-value">${formatVisitorCount(c.value)}</div><div class="stats-label mono">${c.label}</div></div>`
            )
            .join("");

        if (metaEl && data.updated_at) {
            metaEl.textContent = `Last updated ${new Date(data.updated_at).toLocaleString()} UTC`;
            metaEl.hidden = false;
        }
    } catch {
        statusEl.className = "stats-error";
        statusEl.textContent =
            "Could not load visitor stats. Confirm setup-portfolio-visitors.sql has been run in Supabase.";
    }
}
