"use client";

import Link from "next/link";
import NavShell from "./NavShell";

export default function GenericPage({ title, subtitle, cards = [], action }) {
  return (
    <NavShell>
      <div className="page-wrap">
        <section className="page-hero">
          <div>
            <span className="eyebrow">PREDIXION</span>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <Link href="/" className="back-home">RETOUR À L’ACCUEIL</Link>
        </section>

        <section className="generic-grid">
          {cards.map((card, index) => (
            <article className="generic-card" key={index}>
              <span className="generic-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              {card.href ? <Link href={card.href}>{card.button || "OUVRIR"}</Link> : (
                <button onClick={() => alert(card.alert || "Fonction disponible")}>{card.button || "OUVRIR"}</button>
              )}
            </article>
          ))}
        </section>

        {action && (
          <section className="action-panel">
            <h3>{action.title}</h3>
            <p>{action.text}</p>
            <button onClick={() => alert(action.alert || "Action simulée")}>{action.button}</button>
          </section>
        )}
      </div>
    </NavShell>
  );
}
