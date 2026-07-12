import GenericPage from "../components/GenericPage";

export default function Page() {
  return <GenericPage title='SPORTS' subtitle='Consulte les rencontres disponibles et accède aux cotes.' cards=[{'title': 'Football', 'text': 'Matchs du jour, compétitions et cotes 1/N/2.', 'href': '/'}, {'title': 'Basketball', 'text': 'Section prête à accueillir les rencontres de basketball.', 'button': 'VOIR LES MATCHS'}, {'title': 'Tennis', 'text': 'Section prête à accueillir les rencontres de tennis.', 'button': 'VOIR LES MATCHS'}] />;
}
