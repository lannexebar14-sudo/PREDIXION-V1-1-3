"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell, ChevronDown, CircleHelp, History, Home, LogOut, Mail,
  Medal, MessageCircle, ShieldCheck, Trophy, User, UserRoundPlus, WalletCards
} from "lucide-react";

const sideLinks = [
  ["/", "TABLEAU DE BORD", Home],
  ["/mes-paris", "MES PARIS", WalletCards],
  ["/historique", "HISTORIQUE", History],
  ["/profil", "PROFIL", User],
  ["/messages", "MESSAGES", Mail],
  ["/parrainage", "PARRAINAGE", UserRoundPlus],
  ["/aide", "COMMENT ÇA MARCHE ?", CircleHelp],
];

const topLinks = [
  ["/", "ACCUEIL"],
  ["/sports", "SPORTS"],
  ["/pari-du-jour", "PARI DU JOUR"],
  ["/evenements", "ÉVÉNEMENTS"],
  ["/classement", "CLASSEMENT"],
];

export default function NavShell({ children, balance = 10450 }) {
  const pathname = usePathname();

  return (
    <main className="shell">
      <aside className="sidebar">
        <Link href="/" className="brand">
          <div className="brand-mark">P</div>
          <div>
            <h1>PREDIXION</h1>
            <small>PRONOSTIQUEZ. GAGNEZ. DOMINEZ.</small>
          </div>
        </Link>

        <section className="balance-box">
          <span>SOLDE</span>
          <strong>{balance.toLocaleString("fr-FR")} <i>●</i></strong>
          <Link className="gold-link" href="/credits">+ ACHETER DES CRÉDITS</Link>
        </section>

        <nav>
          {sideLinks.map(([href, label, Icon]) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""}>
              <Icon /> {label}
              {href === "/messages" && <em>2</em>}
            </Link>
          ))}
          <button className="logout-link" onClick={() => alert("Déconnexion simulée")}>
            <LogOut /> DÉCONNEXION
          </button>
        </nav>

        <section className="ranking-promo">
          <div>
            <h3>CLASSEMENT<br />GÉNÉRAL</h3>
            <p>Participez et gagnez des récompenses chaque semaine !</p>
          </div>
          <Trophy />
          <Link href="/classement">VOIR LE CLASSEMENT</Link>
        </section>
      </aside>

      <section className="content">
        <header className="topbar">
          <div className="tabs">
            {topLinks.map(([href, label]) => (
              <Link key={href} href={href} className={pathname === href ? "active" : ""}>{label}</Link>
            ))}
          </div>
          <div className="top-user">
            <button className="icon-button" onClick={() => alert("3 notifications")}>
              <Bell />
              <span className="notif">3</span>
            </button>
            <Link href="/profil" className="profile-mini">
              <div className="avatar">JD</div>
              <div><b>John Doe</b><small>Niveau 12</small></div>
              <ChevronDown />
            </Link>
          </div>
        </header>

        {children}
      </section>

      <footer>
        <div><ShieldCheck /><span><b>100% SÉCURISÉ</b><small>Vos données sont protégées</small></span></div>
        <div><CircleHelp /><span><b>JEU RESPONSABLE</b><small>Fixez vos limites</small></span></div>
        <div><Medal /><span><b>ÉQUITABLE</b><small>Résultats transparents</small></span></div>
        <div><MessageCircle /><span><b>SUPPORT 24/7</b><small>Notre équipe est là pour vous</small></span></div>
      </footer>
    </main>
  );
}
