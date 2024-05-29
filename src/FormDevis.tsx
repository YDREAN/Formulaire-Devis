import React, { ReactNode, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./components/ui/input";
import { Link, PDFViewer } from "@react-pdf/renderer";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

// Définir le schéma de validation avec Zod
const devisSchema = z.object({
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
    netAPayer: number;
  }>({ totalHT: 0, netAPayer: 0 });

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

  useEffect(() => {
    const totalHT = TabValues.reduce(
      (sum, item) => sum + item.priceHT * item.quantity,
      0
    );
    const netAPayer = TabValues.reduce((sum, item) => {
      const tvaAmount = item.priceHT * (item.tva / 100) * item.quantity;
      return sum + item.priceHT * item.quantity + tvaAmount;
    }, 0);
    setFooterValues({ totalHT, netAPayer });
  }, [TabValues]);

  const tw = createTw({
    theme: {
      fontFamily: {
        sans: ["Roboto"],
      },
      extend: {
        colors: {
          custom: "#bada55",
        },
      },
    },
  });

  // Create Document Component
  const MyDocument: React.FC<{
    data: DevisSchema;
    tabValues: typeof TabValues;
    bankDetails: typeof bankDetails;
    footerValues: typeof footerValues;
  }> = ({ data, tabValues, bankDetails, footerValues }) => (
    <Document>
      <Page style={tw("p-2 text-sans")} size="A4">
        <View style={tw("flex flex-row justify-between   h-1/5 ")}>
          <View>
            <Image src="./src/assets/dcrrlogo.png" style={tw(" w-44")} />
            <Text style={tw("text-sm")}>
              DCRR (Denquin & Ciatti Refrigeration Reglementary)
            </Text>
            <Text style={tw("text-sm")}>
              Services et conseil aux entreprises
            </Text>
            <Link src="https://dcrr.fr/contact/" style={tw("text-sm")}>
              Contactez-nous
            </Link>
          </View>
          <View style={tw("flex flex-col ")}>
            <Text style={tw("text-sans text-2xl text-right")}>Devis</Text>
            <Text style={tw("  inline text-right text-sm")}>
              Objet du devis : {data.objetDevis}
            </Text>
            <Text style={tw(" text-right  text-sm")}>
              Nom de l'affaire : {data.nomAffaire}
            </Text>
            <Text style={tw("  text-right text-sm")}>
              Client : {data.client}
            </Text>
          </View>
        </View>
        <View style={tw("mt-5")}>
          <View
            style={tw(
              "flex flex-row justify-between bg-lime-600 rounded-t-lg p-1 text-white font-bold"
            )}
          >
            <Text style={tw("text-sm pt-2 w-48 ")}>Désignation</Text>
            <Text style={tw("text-sm ml-6 pt-2")}>Qté</Text>
            <Text style={tw("text-sm pt-2 ")}>Unité</Text>
            <Text style={tw("text-sm pt-2 ")}>Prix U.HT</Text>
            <Text style={tw("text-sm pt-2")}>TVA</Text>
            <Text style={tw("text-sm pt-2 ")}>Total HT</Text>
          </View>

          {tabValues.map((item, index) => (
            <View key={index} style={tw("flex flex-row justify-between  p-1")}>
              <Text style={tw("  w-52  text-sm")}>{item.designation}</Text>
              <Text style={tw("w-10  text-right overflow-hidden  text-sm")}>
                {item.quantity}
              </Text>
              <Text style={tw("w-10    overflow-hidden text-sm")}>
                {item.unit}
              </Text>
              <Text style={tw("w-10  text-right overflow-hidden text-sm")}>
                {item.priceHT} €
              </Text>
              <Text style={tw("w-10 text-right  overflow-hidden text-sm")}>
                {item.tva} %
              </Text>
              <Text style={tw("w-14  text-right overflow-hidden text-sm")}>
                {item.totalHT.toFixed(2)} €
              </Text>
            </View>
          ))}
        </View>

        <View style={tw("flex flex-row justify-between mx-4")}>
          <View style={tw("mt-5 border border-slate-300 p-2 rounded-lg")}>
            <Text style={tw("text-2lg mb-2")}>Détails de paiement</Text>
            <View style={tw("flex flex-row")}>
              <Image src="./src/assets/banque.png" style={tw(" w-5")} />
              <Text style={tw("text-sm pl-2")}>IBAN : {bankDetails.iban}</Text>
            </View>
            <View style={tw("flex flex-row")}>
              <Image
                src="./src/assets/cheque-bancaire.png"
                style={tw(" w-5")}
              />
              <Text style={tw("text-sm pl-2")}>
                Nom de l'entreprise : {bankDetails.companyName}
              </Text>
            </View>
          </View>
          <View style={tw("mt-5 border border-slate-300  rounded-lg")}>
            <Text style={tw("text-2xl mb-2 p-2")}>Résumé</Text>
            <Text style={tw("text-lg p-2")}>
              Total HT: {footerValues.totalHT} €
            </Text>
            <Text
              style={tw(
                "text-lg rounded-b-lg bg-lime-600 pt-2 px-4  text-xl text-white font-bold"
              )}
            >
              Net à payer: {footerValues.netAPayer} €
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <>
      <div className="flex flex-col items-center">
        <form className="text-xl w-4/5 p-3">
          <div className="my-3">
            <label htmlFor="objetDevis">Objet Devis</label>
            <Input id="objetDevis" {...register("objetDevis")} />
            {errors.objetDevis && (
              <p className="text-red-500 text-sm">
                {errors.objetDevis.message}
              </p>
            )}
          </div>

          <div className="my-3">
            <label htmlFor="nomAffaire">Nom Affaire</label>
            <Input id="nomAffaire" {...register("nomAffaire")} />
            {errors.nomAffaire && (
              <p className="text-red-500 text-sm">
                {errors.nomAffaire.message}
              </p>
            )}
          </div>

          <div className="my-3">
            <label htmlFor="client">Client</label>
            <Input id="client" {...register("client")} />
            {errors.client && (
              <p className="text-red-500 text-sm">{errors.client.message}</p>
            )}
          </div>

          <div className="mt-5">
            <table className="w-full text-left border rounded-t-xl overflow-hidden">
              <thead className="bg-lime-600 text-white text-xl">
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
            <div className="w-full flex justify-end">
              <TabFooter
                TabValues={TabValues}
                onFooterValuesChange={setFooterValues}
                bankDetails={bankDetails}
                handleBankDetailsChange={handleBankDetailsChange}
              />
            </div>
          </div>
        </form>

        <div className="pdfView rounded-3xl overflow-hidden my-5 w-1/2 h-screen ">
          <PDFViewer className="w-full h-full over">
            <MyDocument
              data={{
                objetDevis: watch("objetDevis"),
                nomAffaire: watch("nomAffaire"),
                client: watch("client"),
              }}
              tabValues={TabValues}
              bankDetails={bankDetails}
              footerValues={footerValues}
            />
          </PDFViewer>
        </div>
      </div>
    </>
  );
};

const TextClickable: React.FC<{
  children: ReactNode;
  textOnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ children, textOnClick }) => {
  return (
    <button
      onClick={textOnClick}
      className="m-auto w-fit focus:outline-lime-700 outline-offset-2 text-xl my-3 font-medium text-lime-600"
    >
      {children}
    </button>
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
      <td className="somme max-w-10 overflow-hidden text-nowrap">
        {calculateTotal()} €
      </td>
    </tr>
  );
};

const TabFooter: React.FC<{
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
    netAPayer: number;
  }) => void;
  bankDetails: { iban: string; companyName: string };
  handleBankDetailsChange: (field: string, value: string) => void;
}> = ({
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

  const netAPayer = TabValues.reduce((sum, item) => {
    const tvaAmount = item.priceHT * (item.tva / 100) * item.quantity;
    return sum + item.priceHT * item.quantity + tvaAmount;
  }, 0).toFixed(2);

  // Mise à jour des valeurs du footer
  useEffect(() => {
    onFooterValuesChange({
      totalHT: parseFloat(totalHT),
      netAPayer: parseFloat(netAPayer),
    });
  }, [totalHT, netAPayer, onFooterValuesChange]);

  return (
    <div className="flex w-full justify-between">
      <div className="border border-slate-200 rounded-lg w-1/3 p-3 h-fit mt-5">
        <h1 className="mb-2">Paiements</h1>
        <div className="flex flex-col items-center border border-slate-200 rounded-lg p-2 mb-3">
          <div className="flex">
            <img src="./src/assets/banque.png" className="my-auto size-6" />
            <p className="flex justify-center gap-5 p-2">Virement bancaire</p>
          </div>
          <div className="pl-20 w-full">
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
        <div className="flex flex-col items-center border border-slate-200 rounded-lg p-2 mb-3">
          <div className="flex">
            <img
              src="./src/assets/cheque-bancaire.png"
              className="my-auto size-6"
            />
            <p className="flex justify-center gap-5 p-2">À l'ordre de</p>
          </div>
          <div className="pl-20 w-full">
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
      <div className="flex flex-col w-1/3 justify borde rounded-lg mt-3">
        <ul className="flex justify-between border border-slate-200 rounded-t-lg p-2">
          <li>Total HT</li>
          <li>{totalHT} €</li>
        </ul>
        {TabValues.map((value, index) => (
          <ul
            key={index}
            className="flex justify-between border border-slate-200 p-2"
          >
            <li>TVA {value.tva}%</li>
            <li>
              {calculateTvaAmount(value.tva, value.priceHT * value.quantity)} €
            </li>
          </ul>
        ))}
        <ul className="flex justify-between border border-slate-200 p-2 font-bold">
          <li className="font-bold">Total TTC </li>
          <li>{netAPayer} €</li>
        </ul>
        <ul className="flex justify-between w-full text-white p-2 rounded-b-lg bg-lime-600 font-bold">
          <li>Net à payer</li>
          <li>{netAPayer} €</li>
        </ul>
      </div>
    </div>
  );
};

export default FormDevis;
