import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./components/ui/input";
import { PDFViewer } from "@react-pdf/renderer";

import Tableau from "./Tableau";

import { FooterValuesType, IdGenerator } from "./FormDevis";
import { BDCDocument } from "./BDCDocument";

// Définir le schéma de validation avec Zod
export const bdcSchema = z.object({
  objetBDC: z.string().min(1, "Objet du bon de commande est requis"),
  nomAffaire: z.string().min(1, "Nom affaire est requis"),
  client: z.string().min(1, "Client est requis"),
});

// Définir le type basé sur le schéma de validation
export type BDCSchema = z.infer<typeof bdcSchema>;

// Définir le type DevisProps
export type BDCProps = {
  id: number;
  data: BDCSchema;
  tabValues: TabValuesType[];

  footerValues: FooterValuesType;
};

export const BonDeCommande: React.FC = () => {
  const BDCID = IdGenerator();

  const [lignes, setLignes] = useState<string[]>([]);
  const [TabValues, setTabValues] = useState<TabValuesType[]>([]);

  const [footerValues, setFooterValues] = useState<FooterValuesType>({
    totalHT: 0,
    net: 0,
    totalTVA: 0,
  });

  // Utiliser useForm de react-hook-form avec le résolveur zod
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<BDCSchema>({
    resolver: zodResolver(bdcSchema),
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

    setFooterValues({ totalHT, net, totalTVA });
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
            <label htmlFor="objetBDC">Objet du Bon de commande</label>
            <Input id="objetBDC" {...register("objetBDC")} />
            {errors.objetBDC && (
              <p className="text-sm text-red-500">{errors.objetBDC.message}</p>
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
                  {
                    //composant text
                  }{" "}
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

        <div className="flex justify-center w-full h-screen mt-5 overflow-hidden pdfView ">
          {TabValues.length > 0 ? (
            <>
              <PDFViewer className="w-full h-full rounded-r-xl ">
                <BDCDocument
                  id={BDCID}
                  data={{
                    objetBDC: watch("objetBDC"),
                    nomAffaire: watch("nomAffaire"),
                    client: watch("client"),
                  }}
                  tabValues={TabValues}
                  footerValues={footerValues}
                />
              </PDFViewer>
            </>
          ) : (
            <p className="text-3xl">
              Ajoutez d'abord une ligne au tableau pour accéder à la
              prévisualisation
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BonDeCommande;
