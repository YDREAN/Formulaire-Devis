import React, { useState } from "react";
import { TextClickable } from "./FormDevis";

export const Tableau: React.FC = ({ children }) => {
  const [lignes, setLignes] = useState<string[]>([]);
  const [TabValues, setTabValues] = useState<
    {
      designation: string;
      quantity: number;
      unit: string;
      priceHT: number;
      tva: number;
      totalHT: number;
    }[]
  >([]);

  const handleTabValuesChange = (index: number, field: string, value: any) => {
    setTabValues((prev) => {
      const newValues = [...prev];
      newValues[index] = { ...newValues[index], [field]: value };
      newValues[index].totalHT =
        newValues[index].quantity * newValues[index].priceHT;
      return newValues;
    });
  };

  const handleAddLine = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLignes((prev) => [...prev, "Nouvelle ligne"]);
    setTabValues((prev) => [
      ...prev,
      {
        designation: "Nouvelle ligne",
        quantity: 0,
        unit: "m",
        priceHT: 0,
        tva: 0,
        totalHT: 0,
      },
    ]);
  };

  return (
    <>
      <div className="flex items-center justify-center w-full mt-5 ">
        <table className="w-4/5 overflow-hidden text-left border rounded-t-xl">
          <thead className="text-xl text-white bg-lime-600">
            <tr>
              <th className="p-3">Désignation</th>
              <th>Qté</th>
              <th>Unité</th>
              <th>Prix U. HT</th>
              <th>TVA</th>
              <th>Total HT</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((_, index) => (
              <LigneTab
                key={index}
                index={index}
                initialValues={TabValues[index]}
                onTabValuesChange={handleTabValuesChange}
              />
            ))}

            <TextClickable textOnClick={handleAddLine}>
              + Ajouter une ligne
            </TextClickable>
          </tbody>
        </table>
        <div>{children}</div>
      </div>
    </>
  );
};

const LigneTab: React.FC<{
  index: number;
  initialValues: {
    designation: string;
    quantity: number;
    unit: string;
    priceHT: number;
    tva: number;
    totalHT: number;
  };
  onTabValuesChange: (index: number, field: string, value: any) => void;
}> = ({ index, initialValues, onTabValuesChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [designation, setDesignation] = useState(initialValues.designation);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setDesignation(e.target.value);
    onTabValuesChange(index, "designation", e.target.value);
    setIsEditing(false);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    onTabValuesChange(index, "quantity", newQuantity);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(e.target.value);
    onTabValuesChange(index, "priceHT", newPrice);
  };

  const handleTvaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onTabValuesChange(index, "tva", newValue);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value;
    onTabValuesChange(index, "unit", newUnit);
  };

  const calculateTotal = () => {
    return (initialValues.quantity * initialValues.priceHT).toFixed(2);
  };

  return (
    <tr className="border border-b-1 border-slate-200">
      <td className="designation max-w-10" onClick={handleTextClick}>
        {isEditing ? (
          <input
            className="bg-lime-200 focus:outline-none"
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          designation
        )}
      </td>
      <td>
        <input
          value={initialValues.quantity}
          onChange={handleQuantityChange}
          className="w-full focus:outline-none"
          type="number"
          min="0"
          max="100"
        />
      </td>
      <td>
        <select
          className="w-full"
          value={initialValues.unit}
          onChange={handleUnitChange}
        >
          <option value="m">m</option>
          <option value="m²">m²</option>
          <option value="km">km</option>
          <option value="km²">km²</option>
          <option value="V">V</option>
          <option value="W">W</option>
          <option value="h">h</option>
          <option value="pièce">pièce</option>
          <option value="unité">unité</option>
        </select>
      </td>
      <td className="text-nowrap">
        <input
          value={initialValues.priceHT}
          onChange={handlePriceChange}
          className="w-9/12 focus:outline-none"
          type="number"
          step="0.01"
          max="10000"
        />
        €
      </td>
      <td>
        <input
          value={initialValues.tva}
          onChange={handleTvaChange}
          className="w-fit focus:outline-none"
          type="number"
          min="0"
          max="100"
        />
        %
      </td>
      <td className="overflow-hidden somme max-w-10 text-nowrap">
        {calculateTotal()} €
      </td>
    </tr>
  );
};

export default Tableau;
