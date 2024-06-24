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
        <DevisList devis={devis} onSelectDevis={handleSelectDevis} />
      )}
    </>
  );
};

export default SelecteurDevis;
