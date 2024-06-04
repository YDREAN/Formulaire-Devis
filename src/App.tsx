import Acceuil from "./Acceuil";
import { TabFooter } from "./Tabfooter";
import Tableau from "./Tableau";

function App() {
  return (
    <>
      <Tableau>
        <TabFooter TabValues={Tabvalues}>Le poulet</TabFooter>
      </Tableau>
    </>
  );
}

export default App;
