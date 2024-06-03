import BonDeCommande from "./BonDeCommande";
import { FormAvoir } from "./FormAvoir";
import { FormClient } from "./FormClient";
import FormDevis from "./FormDevis";

function App() {
  return (
    <>
      <FormClient />

      <FormAvoir />

      <FormDevis />
      <BonDeCommande />
    </>
  );
}

export default App;
