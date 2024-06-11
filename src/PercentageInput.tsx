import React, { useState } from "react";
import { Button } from "./components/ui/button";

interface Acompte {
  percentage: number;
  unit: string;
  option: string;
}

interface PercentageInputProps {
  onChange: (acomptes: Acompte[]) => void;
}

const PercentageInput: React.FC<PercentageInputProps> = ({ onChange }) => {
  const [acomptes, setAcomptes] = useState<Acompte[]>([
    { percentage: 10, unit: "%", option: "à la commande" },
  ]);
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const data = acomptes
      .map(
        (acompte) => `${acompte.percentage} ${acompte.unit} ${acompte.option}`
      )
      .join(", ");
    setSavedData(data);
    setAcomptes([]);
  };

  const handleClear = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const newAcomptes = acomptes.filter((_, i) => i !== index);
    setAcomptes(newAcomptes);
    onChange(newAcomptes);
  };

  return (
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
        </div>
      ))}
      <Button
        onClick={handleAddAcompte}
        className="mt-4 text-lg font-semibold bg-white focus:outline-lime-700 outline-offset-2 text-lime-600 hover:bg-white"
      >
        + Ajouter un acompte
      </Button>
      <div className="flex mt-4 space-x-2">
        <Button
          variant={"outlineB"}
          onClick={handleSave}
          className="text-lime-600 border-lime-500 hover:bg-lime-600 hover:text-white"
        >
          Enregistrer
        </Button>
      </div>
      {savedData && <p className="mt-4">{savedData}</p>}
    </div>
  );
};

export default PercentageInput;
