import React, { useState, useContext } from "react";
import { DevisContexte } from "./DevisContexte";
import DevisList from "./DevisList";
import FormFacture from "./FormFacture";
import { DevisProps } from "./FormDevis"; // Importer le type DevisProps

const SelecteurDevis = () => {
  const { devis } = useContext(DevisContexte);
  const [selectedDevis, setSelectedDevis] = useState<DevisProps | null>(null);

  const handleSelectDevis = (devis: DevisProps) => {
    setSelectedDevis(devis);
  };

  return (
    <>
      {selectedDevis ? (
        <FormFacture initialData={selectedDevis} />
      ) : (
        <>
          <DevisList devis={devis} onSelectDevis={handleSelectDevis} />
          <div className="flex items-center justify-center w-full h-full ">
            <img
              className="absolute opacity-15"
              src="./src/assets/fichiers-et-documents.png"
              alt=""
            />
            <p className="text-3xl font-bold ">
              Sélectionnez un devis finalisée dans la liste ci-dessus pour
              générer la facture associée
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default SelecteurDevis;
