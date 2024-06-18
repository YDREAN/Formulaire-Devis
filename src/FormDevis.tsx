import React, { ReactNode, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./components/ui/input";
import { PDFViewer } from "@react-pdf/renderer";
import { DevisDocument } from "./DevisDocument";
import Tableau from "./Tableau";
import Acompte from "./Acompte";

// Définir le schéma de validation avec Zod
// eslint-disable-next-line react-refresh/only-export-components
export const devisSchema = z.object({
  objetDevis: z.string().min(1, "Objet devis est requis"),
  nomAffaire: z.string().min(1, "Nom affaire est requis"),
  client: z.string().min(1, "Client est requis"),
});

// Définir le type basé sur le schéma de validation
type DevisSchema = z.infer<typeof devisSchema>;

export const FormDevis: React.FC = () => {
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
  const [bankDetails, setBankDetails] = useState({ iban: "", companyName: "" });
  const [footerValues, setFooterValues] = useState<{
    totalHT: number;
    net: number;
    totalTVA: number;
  }>({ totalHT: 0, net: 0, totalTVA: 0 });

  const [acomptes, setAcomptes] = useState<
    { percentage: number; unit: string; option: string }[]
  >([]);

  // Utiliser useForm de react-hook-form avec le résolveur zod
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<DevisSchema>({
    resolver: zodResolver(devisSchema),
  });

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

  const handleBankDetailsChange = (field: string, value: string) => {
    setBankDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAcompteChange = (
    newAcomptes: { percentage: number; unit: string; option: string }[]
  ) => {
    setAcomptes(newAcomptes);
  };

  useEffect(() => {
    const totalHT = TabValues.reduce(
      (sum, item) => sum + item.priceHT * item.quantity,
      0
    );
    const totalTVA = TabValues.reduce(
      (sum, item) => sum + (item.priceHT * item.quantity * item.tva) / 100,
      0
    );
    const net = totalHT + totalTVA;

    setFooterValues({ totalHT, net: net, totalTVA });
  }, [TabValues]);

  const calculateTvaAmount = (tva: number, prixHT: number) => {
    return ((tva / 100) * prixHT).toFixed(2);
  };

  const totalHT = TabValues.reduce(
    (sum, item) => sum + item.priceHT * item.quantity,
    0
  ).toFixed(2);

  const totalTVA = TabValues.reduce(
    (sum, item) => sum + (item.priceHT * item.quantity * item.tva) / 100,
    0
  ).toFixed(2);

  const net = (parseFloat(totalHT) + parseFloat(totalTVA)).toFixed(2);

  return (
    <>
      <div className="flex flex-col items-center">
        <form className="w-4/5 p-3 text-xl">
          <div className="my-3">
            <label htmlFor="objetDevis">Objet Devis</label>
            <Input id="objetDevis" {...register("objetDevis")} />
            {errors.objetDevis && (
              <p className="text-sm text-red-500">
                {errors.objetDevis.message}
              </p>
            )}
          </div>

          <div className="my-3">
            <label htmlFor="nomAffaire">Nom Affaire</label>
            <Input id="nomAffaire" {...register("nomAffaire")} />
            {errors.nomAffaire && (
              <p className="text-sm text-red-500">
                {errors.nomAffaire.message}
              </p>
            )}
          </div>

          <div className="my-3">
            <label htmlFor="client">Client</label>
            <Input id="client" {...register("client")} />
            {errors.client && (
              <p className="text-sm text-red-500">{errors.client.message}</p>
            )}
          </div>

          <div className="mt-5">
            <Tableau
              TabValues={TabValues}
              handleAddLine={handleAddLine}
              handleTabValuesChange={handleTabValuesChange}
              lignes={lignes}
            />

            <div className="flex justify-end w-full">
              <div className="flex justify-between w-full">
                <div className="w-full">
                  <div className="w-1/3 p-3 mt-5 border rounded-lg border-slate-200 h-fit">
                    <h1 className="mb-2">Acompte</h1>
                    <div>
                      <Acompte onChange={handleAcompteChange} />
                    </div>
                  </div>
                  <div className="w-1/3 p-3 mt-5 border rounded-lg border-slate-200 h-fit">
                    <h1 className="mb-2">Paiements</h1>
                    <div className="flex flex-col items-center p-2 mb-3 border rounded-lg border-slate-200">
                      <div className="flex">
                        <img
                          src="./src/assets/banque.png"
                          className="my-auto size-6"
                        />
                        <p className="flex justify-center gap-5 p-2">
                          Virement bancaire
                        </p>
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
                          onChange={(e) =>
                            handleBankDetailsChange("iban", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center p-2 mb-3 border rounded-lg border-slate-200">
                      <div className="flex">
                        <img
                          src="./src/assets/cheque-bancaire.png"
                          className="my-auto size-6"
                        />
                        <p className="flex justify-center gap-5 p-2">
                          À l'ordre de
                        </p>
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
                            handleBankDetailsChange(
                              "companyName",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-1/3 mt-3 rounded-lg justify borde">
                  <ul className="flex justify-between p-2 border rounded-t-lg border-slate-200">
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
                    <li className="font-bold">Total TVA</li>
                    <li>{totalTVA} €</li>
                  </ul>
                  <ul className="flex justify-between p-2 font-bold border border-slate-200">
                    <li className="font-bold">Total TTC </li>
                    <li>{net} €</li>
                  </ul>
                  <ul className="flex justify-between w-full p-2 font-bold text-white rounded-b-lg bg-lime-600">
                    <li>Net</li>
                    <li>{net} €</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="w-1/2 h-screen my-5 overflow-hidden pdfView rounded-3xl">
          <PDFViewer className="w-full h-full">
            <DevisDocument
              data={{
                objetDevis: watch("objetDevis"),
                nomAffaire: watch("nomAffaire"),
                client: watch("client"),
              }}
              tabValues={TabValues}
              bankDetails={bankDetails}
              footerValues={footerValues}
              acomptes={acomptes}
            />
          </PDFViewer>
        </div>
      </div>
    </>
  );
};

export const TextClickable: React.FC<{
  className?: string;
  children: ReactNode;
  textOnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ className, children, textOnClick }) => {
  return (
    <button
      onClick={textOnClick}
      className={
        "m-auto my-3 text-xl font-medium w-fit focus:outline-lime-700 outline-offset-2 text-lime-600 " +
        className
      }
    >
      {children}
    </button>
  );
};

export default FormDevis;
