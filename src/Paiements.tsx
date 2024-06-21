import { Input } from "./components/ui/input";
type BankDetails = {
  iban: string;
  companyName: string;
};

const Paiements: React.FC<{
  bankDetails: BankDetails;
  handleBankDetailsChange: (field: string, value: string) => void;
}> = ({ bankDetails, handleBankDetailsChange }) => {
  return (
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
  );
};
export default Paiements;
