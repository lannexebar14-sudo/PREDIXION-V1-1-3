import GenericPage from "../components/GenericPage";

export default function Page() {
  return <GenericPage title='PARI DU JOUR' subtitle='Un pronostic spécial mis en avant chaque jour.' cards=[{'title': 'Question du jour', 'text': 'La cote de popularité dépassera-t-elle 35% d’ici la fin du mois ?', 'button': 'PARIER OUI', 'alert': 'Pari OUI sélectionné'}, {'title': 'Choix opposé', 'text': 'Tu peux aussi pronostiquer que le seuil ne sera pas dépassé.', 'button': 'PARIER NON', 'alert': 'Pari NON sélectionné'}] />;
}
