import { useState } from "react";
import { TextClickable } from "./FormDevis";
import { TabValue } from "./DevisDocument";
import { PlazaTabValuesType } from "./PlazaTCG";

const Tableau: React.FC<{
  className?: string;
  TabValues: PlazaTabValuesType[];
  handleTabValuesChange: (index: number, field: string, value: any) => void;
  handleAddLine: (e: { preventDefault: () => void }) => void;
  lignes: string[];
}> = ({
  TabValues,
  handleTabValuesChange,
  handleAddLine,
  lignes,
  className,
}) => {
  return (
    <table className="w-full overflow-hidden text-left border rounded-t-xl">
      <thead className={"text-xl text-white  bg-red-900 " + className}>
        <tr>
          <th className="p-3">Désignation</th>
          <th>Qté</th>

          <th>Prix</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {lignes.map((_, index) => (
          <PlazaLigneTab
            key={index}
            index={index}
            initialValues={TabValues[index]}
            onTabValuesChange={handleTabValuesChange}
          />
        ))}

        <TextClickable className="text-red-900 " textOnClick={handleAddLine}>
          + Ajouter une ligne
        </TextClickable>
      </tbody>
    </table>
  );
};

export const PlazaLigneTab: React.FC<{
  index: number;
  initialValues: {
    designation: string;
    quantity: number;

    price: number;

    total: number;
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
    onTabValuesChange(index, "price", newPrice);
  };

  const calculateTotal = () => {
    return (initialValues.quantity * initialValues.price).toFixed(2);
  };

  return (
    <tr className="border border-b-1 border-slate-200">
      <td className="designation max-w-10" onClick={handleTextClick}>
        {isEditing ? (
          <input
            className="bg-red-100 focus:outline-none"
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

      <td className="text-nowrap">
        <input
          value={initialValues.price}
          onChange={handlePriceChange}
          className="w-9/12 focus:outline-none"
          type="number"
          step="0.01"
          max="10000"
        />
        €
      </td>

      <td className="overflow-hidden somme max-w-10 text-nowrap">
        {calculateTotal()} €
      </td>
    </tr>
  );
};

export default Tableau;
