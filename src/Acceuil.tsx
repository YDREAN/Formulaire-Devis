import React, { useState } from "react";

import BonDeCommande from "./BonDeCommande";
import FormAvoir from "./FormAvoir";

import { Button } from "./components/ui/button";
import FormDevis from "./FormDevis";
import DevisList from "./DevisList";
import FormFacture from "./FormFacture";
import SelecteurDevis from "./SelecteurDevis";

type MenuProps = {
  onMenuItemClick: (item: string) => void;
};

const Menu: React.FC<MenuProps> = ({ onMenuItemClick }) => {
  return (
    <div className="flex w-1/6 min-h-screen ml-4 border-r-2">
      <ul className="flex flex-col mt-1">
        <Button
          size={"sm"}
          className="flex justify-start group"
          variant={"outline"}
          asChild
        >
          <li
            className=" text-black/60"
            onClick={() => onMenuItemClick("devis")}
          >
            <img
              className="w-4 mr-2 opacity-60 group-hover:opacity-100"
              src="./src/assets/regle-triangulaire.png"
              alt=""
            />
            Devis
          </li>
        </Button>

        <Button
          size={"sm"}
          variant={"outline"}
          asChild
          className="flex justify-start group"
        >
          <li
            className="text-black/60"
            onClick={() => onMenuItemClick("avoir")}
          >
            <img
              className="w-4 mr-2 opacity-60 group-hover:opacity-100"
              src="./src/assets/service-de-paiement.png"
              alt=""
            />
            Avoir
          </li>
        </Button>

        <Button
          size={"sm"}
          className="flex justify-start group"
          variant={"outline"}
          asChild
        >
          <li
            className="text-black/60 "
            onClick={() => onMenuItemClick("bonDeCommande")}
          >
            <img
              className="w-4 mr-2 opacity-60 group-hover:opacity-100 "
              src="./src/assets/bon-de-commande.png"
              alt=""
            />
            Bon de commande
          </li>
        </Button>

        <Button
          size={"sm"}
          className="flex justify-start group"
          variant={"outline"}
          asChild
        >
          <li
            className="text-black/60 "
            onClick={() => onMenuItemClick("facture")}
          >
            <img
              className="w-4 mr-2 opacity-60 group-hover:opacity-100 "
              src="./src/assets/bon-de-commande.png"
              alt=""
            />
            Facture
          </li>
        </Button>
      </ul>
    </div>
  );
};

const FormView: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("");

  const renderComponent = () => {
    switch (activeComponent) {
      case "devis":
        return (
          <>
            <FormDevis />
          </>
        );
      case "avoir":
        return <FormAvoir />;
      case "facture":
        return (
          <>
            <SelecteurDevis />
          </>
        );
      case "bonDeCommande":
        return <BonDeCommande />;

      default:
        return (
          <div className="flex items-center justify-center w-full h-full ">
            <img
              className="absolute opacity-15"
              src="./src/assets/fichiers-et-documents.png"
              alt=""
            />
            <p className="text-3xl font-bold ">
              Sélectionnez un type de document sur la gauche
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex ">
      <Menu onMenuItemClick={setActiveComponent} />
      <div className="w-full ">{renderComponent()}</div>
    </div>
  );
};

export default FormView;
