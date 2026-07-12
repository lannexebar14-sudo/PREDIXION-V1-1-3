import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const API_BASE = "https://api.oddspapi.io/v4";

function firstNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function findDecimalPrices(node, found = []) {
  if (!node || found.length >= 3) return found;
  if (typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (found.length >= 3) break;
      if (["price", "odds", "decimal", "value"].includes(key.toLowerCase())) {
        const n = firstNumber(value);
        if (n && n > 1 && n < 100) found.push(n);
      } else if (typeof value === "object") {
        findDecimalPrices(value, found);
      }
    }
  }
  return [...new Set(found)].slice(0, 3);
}

function participantName(item, side) {
  const direct = side === 1
    ? [item.participant1Name, item.homeName, item.homeTeam, item.participant1]
    : [item.participant2Name, item.awayName, item.awayTeam, item.participant2];

  for (const value of direct) {
    if (typeof value === "string" && value.trim()) return value;
    if (value && typeof value === "object") {
      const name = value.name || value.participantName || value.slug;
      if (name) return name;
    }
  }
  return side === 1 ? "Équipe domicile" : "Équipe extérieure";
}

function normalize(item, index) {
  const prices = findDecimalPrices(item.bookmakerOdds || item.odds || item);
  return {
    id: item.fixtureId || `match-${index}`,
    league:
      item.tournamentName ||
      item.tournament?.name ||
      item.categoryName ||
      "Football",
    startTime: item.startTime || new Date().toISOString(),
    home: participantName(item, 1),
    away: participantName(item, 2),
    odds: [
      prices[0] || 1.85,
      prices[1] || 3.45,
      prices[2] || 4.20
    ]
  };
}

const demo = [
  { id: "demo-1", league: "LIGUE DES CHAMPIONS", startTime: "2026-07-12T21:00:00+02:00", home: "Paris SG", away: "FC Barcelone", odds: [2.10, 3.20, 3.45] },
  { id: "demo-2", league: "PREMIER LEAGUE", startTime: "2026-07-12T17:30:00+02:00", home: "Arsenal", away: "Chelsea", odds: [1.85, 3.60, 4.20] },
  { id: "demo-3", league: "LALIGA", startTime: "2026-07-12T21:00:00+02:00", home: "Real Madrid", away: "Atlético Madrid", odds: [1.86, 4.00, 5.10] }
];

export async function GET() {
  const apiKey = process.env.ODDSPAPI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ matches: demo, source: "demo", warning: "ODDSPAPI_API_KEY absente" });
  }

  const bookmaker = process.env.ODDSPAPI_BOOKMAKER || "pinnacle";
  const tournamentIds = process.env.ODDSPAPI_TOURNAMENT_IDS || "17,8";
  const params = new URLSearchParams({
    apiKey,
    tournamentIds,
    bookmakers: bookmaker,
    language: "fr",
    oddsFormat: "decimal",
    verbosity: "3"
  });

  try {
    const response = await fetch(`${API_BASE}/odds-by-tournaments?${params}`, {
      cache: "no-store",
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      const message = await response.text();
      return NextResponse.json(
        { matches: demo, source: "demo", warning: `OddsPapi ${response.status}: ${message.slice(0, 160)}` },
        { status: 200 }
      );
    }

    const payload = await response.json();
    const rows = Array.isArray(payload) ? payload : payload.data || payload.fixtures || [];
    const matches = rows.slice(0, 12).map(normalize);

    return NextResponse.json({
      matches: matches.length ? matches : demo,
      source: matches.length ? "oddspapi" : "demo"
    });
  } catch (error) {
    return NextResponse.json({
      matches: demo,
      source: "demo",
      warning: error instanceof Error ? error.message : "Erreur API"
    });
  }
}
