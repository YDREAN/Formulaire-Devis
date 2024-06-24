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
        <div className="w-full p-2 h-52">
          <h1 className="text-xl font-bold text-lime-600">Devis récents :</h1>
          {devis.map((devis, index) => (
            <div
              key={index}
              className="flex items-center p-2 my-2 transition ease-in-out transform bg-white border rounded-lg cursor-pointer hover:scale-105"
              onClick={() => onSelectDevis(devis)}
            >
              <p className="mx-4 text-nowrap">ID : {devis.id}</p>
              <p className="p-1 mr-2 rounded-lg bg-lime-200 text-nowrap">
                Client : {devis.data.client}
              </p>
              <p className="mr-2 text-nowrap">
                {devis.footerValues.net + " €"}
              </p>
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
