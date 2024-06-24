import React, { createContext, useState, ReactNode } from "react";
import { DevisProps } from "./FormDevis";

// Créer le contexte
const DevisContexte = createContext<{
  devis: DevisProps[];
  addDevis: (item: DevisProps) => void;
}>({
  devis: [],
  addDevis: () => {},
});

// Créer le fournisseur de contexte
const DevisProvider = ({ children }: { children: ReactNode }) => {
  const [devis, setDevis] = useState<DevisProps[]>([]);

  // Méthode pour ajouter un nouvel objet
  const addDevis = (newDevis: DevisProps) => {
    setDevis([...devis, newDevis]);
  };

  return (
    <DevisContexte.Provider value={{ devis, addDevis }}>
      {children}
    </DevisContexte.Provider>
  );
};

export { DevisContexte, DevisProvider };
