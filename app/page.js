"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell, ChevronDown, ChevronRight, CircleHelp, Clock3, Coins, History,
  Home, LogOut, Mail, Medal, MessageCircle, ShieldCheck, Trophy,
  User, UserRoundPlus, WalletCards
} from "lucide-react";

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
    setToast(`Pari enregistré : ${stake.toLocaleString("fr-FR")} crédits`);
    setBet(null);
    setTimeout(() => setToast(""), 2500);
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">P</div><div><h1>PREDIXION</h1><small>PRONOSTIQUEZ. GAGNEZ. DOMINEZ.</small></div></div>
        <section className="balance-box"><span>SOLDE</span><strong>{balance.toLocaleString("fr-FR")} <i>●</i></strong><button>+ ACHETER DES CRÉDITS</button></section>
        <nav>
          <a className="active"><Home/> TABLEAU DE BORD</a><a><WalletCards/> MES PARIS</a><a><History/> HISTORIQUE</a>
          <a><User/> PROFIL</a><a><Mail/> MESSAGES <em>2</em></a><a><UserRoundPlus/> PARRAINAGE</a>
          <a><CircleHelp/> COMMENT ÇA MARCHE ?</a><a><LogOut/> DÉCONNEXION</a>
        </nav>
        <section className="ranking-promo"><div><h3>CLASSEMENT<br/>GÉNÉRAL</h3><p>Participez et gagnez des récompenses chaque semaine !</p></div><Trophy/><button>VOIR LE CLASSEMENT</button></section>
      </aside>

      <section className="content">
        <header className="topbar">
          <div className="tabs"><a className="active">ACCUEIL</a><a>SPORTS</a><a>PARI DU JOUR</a><a>ÉVÉNEMENTS</a><a>CLASSEMENT</a></div>
          <div className="top-user"><Bell/><span className="notif">3</span><div className="avatar">JD</div><div><b>John Doe</b><small>Niveau 12</small></div><ChevronDown/></div>
        </header>

        <div className="grid">
          <div className="center">
            <section className="hero">
              <img src="/hero-predixion.jpg" alt="Bannière Predixion"/>
              <div className="hero-copy"><h2>PRONOSTIQUEZ.<br/><span>GAGNEZ.</span><br/><span>DOMINEZ.</span></h2><p>Pariez sur le sport et tous les événements<br/>avec <b>PREDIXION.</b></p><button>PARIER MAINTENANT</button></div>
            </section>

            <section className="section-title"><h3>⚽ MATCHS DU JOUR</h3><div><span className={`source ${apiSource}`}>{apiSource === "oddspapi" ? "DONNÉES API" : "MODE DÉMO"}</span><button>VOIR TOUS <ChevronRight/></button></div></section>
            <div className="matches">{matches.slice(0,3).map(m => <MatchCard key={m.id} match={m} onBet={(match, choice, odd)=>setBet({match,choice,odd})}/>)}</div>

            <div className="lower-grid">
              <section className="daily">
                <div className="card-head"><h3>PARI DU JOUR</h3><span>EXCLUSIF</span></div>
                <div className="daily-body"><div className="portrait">★</div><div className="question"><p>La cote de popularité dépassera-t-elle 35% d’ici la fin du mois ?</p><small>Source : sondage public</small></div></div>
                <div className="binary"><button className="yes">OUI <b>1.80</b></button><button className="no">NON <b>2.10</b></button><button className="purple">VOIR ET PARIER</button></div>
              </section>
              <section className="events">
                <div className="card-head"><h3>ÉVÉNEMENTS SPÉCIAUX</h3><button>VOIR TOUS <ChevronRight/></button></div>
                <div className="event"><Trophy/><div><b>Gagnant d’une grande émission ?</b><small>Fin des paris : 25/07 - 20:00</small><div><span>Candidat A 1.70</span><span>Candidat B 2.25</span></div></div></div>
                <div className="event"><Medal/><div><b>Le Bitcoin dépassera-t-il 100 000 $ ?</b><small>Fin des paris : 30/07 - 23:59</small><div><span>OUI 1.65</span><span>NON 2.40</span></div></div></div>
              </section>
            </div>
          </div>

          <aside className="rightbar">
            <section className="profile-card"><div className="profile-top"><div className="avatar big">JD</div><div><h3>John Doe</h3><small>Niveau 12 &nbsp;&nbsp; 350 / 500 XP</small><div className="progress"><i/></div></div></div><hr/><span>SOLDE</span><strong>{balance.toLocaleString("fr-FR")} <i>●</i></strong><div className="profile-actions"><button>+ CRÉDITS</button><button className="outline">HISTORIQUE</button></div></section>
            <section className="leaders"><h3>TOP JOUEURS</h3><div className="leader-tabs"><b>SEMAINE</b><span>MOIS</span><span>GLOBAL</span></div>
              {[["Baba M.",125450],["QueenB",98230],["Predator",85770],["MamboKing",74500],["John Doe",68300]].map((x,i)=><div className={`leader ${i===4?"me":""}`} key={x[0]}><em>{i+1}</em><div className="mini-avatar">{initials(x[0])}</div><b>{x[0]}</b><span>{x[1].toLocaleString("fr-FR")} ●</span></div>)}
              <button className="full-ranking">VOIR LE CLASSEMENT COMPLET</button>
            </section>
          </aside>
        </div>
      </section>

      <footer><div><ShieldCheck/><span><b>100% SÉCURISÉ</b><small>Vos données sont protégées</small></span></div><div><CircleHelp/><span><b>JEU RESPONSABLE</b><small>Fixez vos limites</small></span></div><div><Medal/><span><b>ÉQUITABLE</b><small>Résultats transparents</small></span></div><div><MessageCircle/><span><b>SUPPORT 24/7</b><small>Notre équipe est là pour vous</small></span></div></footer>

      {bet && <div className="modal-backdrop" onClick={()=>setBet(null)}><div className="bet-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setBet(null)}>×</button><h3>PLACER LE PARI</h3><p>{bet.match.home} — {bet.match.away}</p><div className="selection"><span>Sélection {bet.choice}</span><b>{bet.odd.toFixed(2)}</b></div><label>MISE EN CRÉDITS<input type="number" min="1" max={balance} value={stake} onChange={e=>setStake(Number(e.target.value))}/></label><div className="potential">Gain potentiel <b>{potential.toLocaleString("fr-FR")} crédits</b></div><button className="confirm" onClick={validateBet}>CONFIRMER LE PARI</button></div></div>}
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
