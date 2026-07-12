import GenericPage from "../components/GenericPage";

export default function Page() {
  return <GenericPage title='MESSAGES' subtitle='Centre de notifications et messages internes.' cards=[{'title': 'Bienvenue sur PREDIXION', 'text': 'Ton compte a bien été créé.', 'button': 'LIRE'}, {'title': 'Nouveau classement', 'text': 'Le classement hebdomadaire est disponible.', 'href': '/classement', 'button': 'VOIR'}] />;
}
