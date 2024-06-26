import React, { useState } from "react";
import { Button } from "../components/ui/button";

interface Acompte {
  percentage: number;
  unit: string;
  option: string;
}

interface PercentageInputProps {
  net: number;
  onChange: (acomptes: Acompte[]) => void;
}

const Acompte: React.FC<PercentageInputProps> = ({ net, onChange }) => {
  const [acomptes, setAcomptes] = useState<Acompte[]>([]);
  const [savedData, setSavedData] = useState<string>("");

  const handlePercentageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAcomptes = [...acomptes];
    newAcomptes[index].percentage = Number(event.target.value);
    setAcomptes(newAcomptes);
    onChange(newAcomptes);
  };

  const handleUnitChange = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newAcomptes = [...acomptes];
    newAcomptes[index].unit = event.target.value;
    setAcomptes(newAcomptes);
    onChange(newAcomptes);
  };

  const handleOptionChange = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newAcomptes = [...acomptes];
    newAcomptes[index].option = event.target.value;
    setAcomptes(newAcomptes);
    onChange(newAcomptes);
  };

  const handleAddAcompte = (e: React.MouseEvent) => {
    e.preventDefault();
    const newAcomptes = [
      ...acomptes,
      { percentage: 10, unit: "%", option: "à la commande" },
    ];
    setAcomptes(newAcomptes);
    onChange(newAcomptes);
  };

  const handleClear = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const newAcomptes = acomptes.filter((_, i) => i !== index);
    setAcomptes(newAcomptes);
    onChange(newAcomptes);
  };

  const calculatePercentage = (net: number, percentage: number) => {
    return net * (percentage / 100);
  };

  return (
    <div className="w-1/3 p-3 mt-5 overflow-hidden border rounded-lg border-slate-200 h-fit">
      <h1 className="mb-2">Acompte</h1>

      <div className="flex flex-col items-center justify-center space-x-2">
        {acomptes.map((acompte, index) => (
          <div key={index} className="flex flex-wrap gap-1 mx-2 mt-2">
            <input
              type="number"
              value={acompte.percentage}
              onChange={(e) => handlePercentageChange(index, e)}
              className="w-16 p-1 border border-gray-300 rounded"
            />
            <select
              value={acompte.unit}
              onChange={(e) => handleUnitChange(index, e)}
              className="p-1 border border-gray-300 rounded"
            >
              <option value="%">%</option>
              <option value="HT">HT</option>
              <option value="TTC">TTC</option>
            </select>
            <select
              value={acompte.option}
              onChange={(e) => handleOptionChange(index, e)}
              className="p-1 border border-gray-300 rounded"
            >
              <option value="à la commande">à la commande</option>
              <option value="à la signature">à la signature</option>
              <option value="au début des travaux">au début des travaux</option>
              <option value="à la moitié des travaux">
                à la moitié des travaux
              </option>
            </select>
            <Button
              variant={"outlineB"}
              size={"icon"}
              onClick={(e) => handleClear(index, e)}
              className="bg-white border border-gray-300 hover:bg-slate-200"
            >
              <img
                className="text-white size-6"
                src="./src/assets/trash.png"
                alt="Supprimer"
              />
            </Button>
            {acompte.unit === "%" && (
              <p>
                = {calculatePercentage(net, acompte.percentage).toFixed(2)} €
              </p>
            )}
          </div>
        ))}
        <Button
          onClick={handleAddAcompte}
          className="mt-4 text-lg font-semibold bg-white focus:outline-lime-700 outline-offset-2 text-lime-600 hover:bg-white text-wrap"
        >
          + Ajouter un acompte
        </Button>

        {savedData && <p className="mt-4">{savedData}</p>}
      </div>
    </div>
  );
};

export default Acompte;
