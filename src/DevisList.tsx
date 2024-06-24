import React from "react";
import { DevisProps } from "./FormDevis"; // Importer le type DevisProps

type DevisListProps = {
  devis: DevisProps[];
  onSelectDevis: (devis: DevisProps) => void;
};

const DevisList: React.FC<DevisListProps> = ({ devis, onSelectDevis }) => {
  return (
    <>
      {devis && devis.length > 0 ? (
        <div className="w-full bg-red-100 h-52">
          <h1 className="text-xl font-bold">Devis récents :</h1>
          {devis.map((devis, index) => (
            <div
              key={index}
              className="flex py-2 bg-white border rounded-lg cursor-pointer"
              onClick={() => onSelectDevis(devis)}
            >
              <p className="mx-4">ID : {devis.id}</p>
              <p className="p-1 mr-2 bg-gray-200 rounded-lg">
                {devis.data.client}
              </p>
              <p className="mr-2">{devis.footerValues.net + " €"}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-2 border-b-2">
          <h1 className="text-xl font-bold">Aucun devis récents</h1>
        </div>
      )}
    </>
  );
};

export default DevisList;
