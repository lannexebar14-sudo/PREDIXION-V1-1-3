"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Medal, Trophy } from "lucide-react";
import NavShell from "./components/NavShell";

const fallback = [
  { id:"1", league:"LIGUE DES CHAMPIONS", startTime:"2026-07-12T21:00:00+02:00", home:"PARIS SG", away:"FC BARCELONE", odds:[2.10,3.20,3.45] },
  { id:"2", league:"PREMIER LEAGUE", startTime:"2026-07-12T17:30:00+02:00", home:"ARSENAL", away:"CHELSEA", odds:[1.85,3.60,4.20] },
  { id:"3", league:"LALIGA", startTime:"2026-07-12T21:00:00+02:00", home:"REAL MADRID", away:"ATLÉTICO MADRID", odds:[1.86,4.00,5.10] }
];

const initials = (name) => name.split(/\s+/).map(x => x[0]).join("").slice(0,3).toUpperCase();

function MatchCard({ match, onBet }) {
  const time = new Date(match.startTime).toLocaleTimeString("fr-FR", {hour:"2-digit", minute:"2-digit"});
  return (
    <article className="match-card">
      <div className="match-meta"><span>{match.league}</span><span>{time}</span></div>
      <div className="teams">
        <div className="team"><div className="crest">{initials(match.home)}</div><b>{match.home}</b></div>
        <strong className="vs">VS</strong>
        <div className="team"><div className="crest alt">{initials(match.away)}</div><b>{match.away}</b></div>
      </div>
      <div className="odds">
        {["1","X","2"].map((label, i) => (
          <button key={label} className={i===0 ? "green" : i===2 ? "gold" : ""} onClick={() => onBet(match, label, match.odds[i])}>
            <span>{label}</span><b>{Number(match.odds[i]).toFixed(2)}</b>
          </button>
        ))}
      </div>
    </article>
  );
}

export default function HomePage() {
  const [matches, setMatches] = useState(fallback);
  const [apiSource, setApiSource] = useState("chargement");
  const [balance, setBalance] = useState(10450);
  const [bet, setBet] = useState(null);
  const [stake, setStake] = useState(100);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetch("/api/matches")
      .then(r => r.json())
      .then(data => { setMatches(data.matches?.length ? data.matches : fallback); setApiSource(data.source || "demo"); })
      .catch(() => setApiSource("demo"));
  }, []);

  const potential = useMemo(() => bet ? Math.round(stake * bet.odd) : 0, [bet, stake]);

  function validateBet() {
    if (!bet || stake <= 0 || stake > balance) return;
    setBalance(v => v - stake);
    const saved = JSON.parse(localStorage.getItem("predixion-bets") || "[]");
    saved.unshift({ ...bet, stake, potential, createdAt: new Date().toISOString() });
    localStorage.setItem("predixion-bets", JSON.stringify(saved));
    setToast(`Pari enregistré : ${stake.toLocaleString("fr-FR")} crédits`);
    setBet(null);
    setTimeout(() => setToast(""), 2500);
  }

  return (
    <NavShell balance={balance}>
      <div className="grid">
        <div className="center">
          <section className="hero">
            <img src="/hero-predixion.jpg" alt="Bannière Predixion"/>
            <div className="hero-copy">
              <h2>PRONOSTIQUEZ.<br/><span>GAGNEZ.</span><br/><span>DOMINEZ.</span></h2>
              <p>Pariez sur le sport et tous les événements<br/>avec <b>PREDIXION.</b></p>
              <Link href="/sports" className="hero-link">PARIER MAINTENANT</Link>
            </div>
          </section>

          <section className="section-title">
            <h3>⚽ MATCHS DU JOUR</h3>
            <div>
              <span className={`source ${apiSource}`}>{apiSource === "oddspapi" ? "DONNÉES API" : "MODE DÉMO"}</span>
              <Link href="/sports" className="small-link">VOIR TOUS <ChevronRight/></Link>
            </div>
          </section>

          <div className="matches">
            {matches.slice(0,3).map(m => <MatchCard key={m.id} match={m} onBet={(match, choice, odd)=>setBet({match,choice,odd})}/>)}
          </div>

          <div className="lower-grid">
            <section className="daily">
              <div className="card-head"><h3>PARI DU JOUR</h3><span>EXCLUSIF</span></div>
              <div className="daily-body">
                <div className="portrait">★</div>
                <div className="question">
                  <p>La cote de popularité dépassera-t-elle 35% d’ici la fin du mois ?</p>
                  <small>Source : sondage public</small>
                </div>
              </div>
              <div className="binary">
                <button className="yes" onClick={()=>alert("Choix OUI sélectionné")}>OUI <b>1.80</b></button>
                <button className="no" onClick={()=>alert("Choix NON sélectionné")}>NON <b>2.10</b></button>
                <Link className="purple-link" href="/pari-du-jour">VOIR ET PARIER</Link>
              </div>
            </section>

            <section className="events">
              <div className="card-head"><h3>ÉVÉNEMENTS SPÉCIAUX</h3><Link href="/evenements">VOIR TOUS <ChevronRight/></Link></div>
              <div className="event"><Trophy/><div><b>Gagnant d’une grande émission ?</b><small>Fin des paris : 25/07 - 20:00</small><div><span>Candidat A 1.70</span><span>Candidat B 2.25</span></div></div></div>
              <div className="event"><Medal/><div><b>Le Bitcoin dépassera-t-il 100 000 $ ?</b><small>Fin des paris : 30/07 - 23:59</small><div><span>OUI 1.65</span><span>NON 2.40</span></div></div></div>
            </section>
          </div>
        </div>

        <aside className="rightbar">
          <section className="profile-card">
            <div className="profile-top"><div className="avatar big">JD</div><div><h3>John Doe</h3><small>Niveau 12 &nbsp;&nbsp; 350 / 500 XP</small><div className="progress"><i/></div></div></div>
            <hr/><span>SOLDE</span><strong>{balance.toLocaleString("fr-FR")} <i>●</i></strong>
            <div className="profile-actions"><Link href="/credits">+ CRÉDITS</Link><Link className="outline" href="/historique">HISTORIQUE</Link></div>
          </section>

          <section className="leaders">
            <h3>TOP JOUEURS</h3>
            <div className="leader-tabs"><b>SEMAINE</b><span>MOIS</span><span>GLOBAL</span></div>
            {[["Baba M.",125450],["QueenB",98230],["Predator",85770],["MamboKing",74500],["John Doe",68300]].map((x,i)=>
              <div className={`leader ${i===4?"me":""}`} key={x[0]}><em>{i+1}</em><div className="mini-avatar">{initials(x[0])}</div><b>{x[0]}</b><span>{x[1].toLocaleString("fr-FR")} ●</span></div>
            )}
            <Link href="/classement" className="full-ranking">VOIR LE CLASSEMENT COMPLET</Link>
          </section>
        </aside>
      </div>

      {bet && <div className="modal-backdrop" onClick={()=>setBet(null)}><div className="bet-modal" onClick={e=>e.stopPropagation()}>
        <button className="close" onClick={()=>setBet(null)}>×</button>
        <h3>PLACER LE PARI</h3>
        <p>{bet.match.home} — {bet.match.away}</p>
        <div className="selection"><span>Sélection {bet.choice}</span><b>{bet.odd.toFixed(2)}</b></div>
        <label>MISE EN CRÉDITS<input type="number" min="1" max={balance} value={stake} onChange={e=>setStake(Number(e.target.value))}/></label>
        <div className="potential">Gain potentiel <b>{potential.toLocaleString("fr-FR")} crédits</b></div>
        <button className="confirm" onClick={validateBet}>CONFIRMER LE PARI</button>
      </div></div>}
      {toast && <div className="toast">{toast}</div>}
    </NavShell>
  );
}
