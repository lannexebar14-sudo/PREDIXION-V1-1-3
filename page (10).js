import GenericPage from "../components/GenericPage";

export default function Page() {
  return <GenericPage title='ÉVÉNEMENTS' subtitle='Pronostique sur des événements spéciaux et tendances.' cards=[{'title': 'Télévision', 'text': 'Pronostics sur les grands événements télévisés.', 'button': 'OUVRIR'}, {'title': 'Finance', 'text': 'Pronostics sur les évolutions de marché.', 'button': 'OUVRIR'}, {'title': 'Culture', 'text': 'Pronostics sur les sorties et récompenses.', 'button': 'OUVRIR'}] />;
}
