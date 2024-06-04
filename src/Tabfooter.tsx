import { Input } from "./components/ui/input";
import { useEffect } from "react";
import FormDevis from "./FormDevis";

export const TabFooter: React.FC<{
  children: string | undefined;
  TabValues: {
    designation: string;
    quantity: number;
    unit: string;
    priceHT: number;
    tva: number;
    totalHT: number;
  }[];
  onFooterValuesChange: (footerValues: {
    totalHT: number;
    net: number;
  }) => void;
  bankDetails?: { iban: string; companyName: string };
  handleBankDetailsChange?: (field: string, value: string) => void;
}> = ({
  children,
  TabValues,
  onFooterValuesChange,
  bankDetails,
  handleBankDetailsChange,
}) => {
  const calculateTvaAmount = (tva: number, prixHT: number) => {
    return ((tva / 100) * prixHT).toFixed(2);
  };

  const totalHT = TabValues.reduce(
    (sum, item) => sum + item.priceHT * item.quantity,
    0
  ).toFixed(2);

  const net = TabValues.reduce((sum, item) => {
    const tvaAmount = item.priceHT * (item.tva / 100) * item.quantity;
    return sum + item.priceHT * item.quantity + tvaAmount;
  }, 0).toFixed(2);

  // Mise à jour des valeurs du footer
  useEffect(() => {
    onFooterValuesChange({
      totalHT: parseFloat(totalHT),
      net: parseFloat(net),
    });
  }, [totalHT, net, onFooterValuesChange]);

  return (
    <div className="flex justify-between w-full">
      <div className="w-1/3 p-3 mt-5 border rounded-lg border-slate-200 h-fit">
        <h1 className="mb-2">Paiements</h1>
        <div className="flex flex-col items-center p-2 mb-3 border rounded-lg border-slate-200">
          <div className="flex">
            <img src="./src/assets/banque.png" className="my-auto size-6" />
            <p className="flex justify-center gap-5 p-2">Virement bancaire</p>
          </div>
          <div className="w-full pl-20">
            <label className="block" htmlFor="iban">
              IBAN
            </label>
            <Input
              id="iban"
              className="block w-4/5"
              placeholder="FR76XXXXXXXXXXXXXXXXXXXXXXX"
              value={bankDetails.iban}
              onChange={(e) => handleBankDetailsChange("iban", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col items-center p-2 mb-3 border rounded-lg border-slate-200">
          <div className="flex">
            <img
              src="./src/assets/cheque-bancaire.png"
              className="my-auto size-6"
            />
            <p className="flex justify-center gap-5 p-2">À l'ordre de</p>
          </div>
          <div className="w-full pl-20">
            <label className="block" htmlFor="companyName">
              Nom de l'entreprise
            </label>
            <Input
              id="companyName"
              className="block w-4/5"
              placeholder="Wabel GROUP"
              value={bankDetails.companyName}
              onChange={(e) =>
                handleBankDetailsChange("companyName", e.target.value)
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/3 mt-3 rounded-lg justify borde">
        <ul className="flex justify-between p-2 border rounded-t-lg border-slate-200 ">
          <li>Total HT</li>
          <li>{totalHT} €</li>
        </ul>
        {TabValues.map(
          (value, index) =>
            value.priceHT * value.quantity !== 0 && (
              <ul
                key={index}
                className="flex justify-between p-2 border border-slate-200"
              >
                <li>TVA {value.tva}%</li>
                <li>
                  {calculateTvaAmount(
                    value.tva,
                    value.priceHT * value.quantity
                  )}{" "}
                  €
                </li>
              </ul>
            )
        )}
        <ul className="flex justify-between p-2 font-bold border border-slate-200">
          <li className="font-bold">Total TTC </li>
          <li>{net} €</li>
        </ul>
        <ul className="flex justify-between w-full p-2 font-bold text-white rounded-b-lg bg-lime-600">
          <li>{children}</li>
          <li>{net} €</li>
        </ul>
      </div>
    </div>
  );
};

export default FormDevis;
