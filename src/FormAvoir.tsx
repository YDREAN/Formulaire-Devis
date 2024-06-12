import React, { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./components/ui/input";
import { Link, PDFViewer } from "@react-pdf/renderer";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { Textarea } from "@/components/ui/textarea";
import { TextClickable } from "./FormDevis";

// Définir le schéma de validation avec Zod
const devisSchema = z.object({
  Devis: z.string().min(1, "Objet devis est requis"),
  nomAffaire: z.string().min(1, "Nom affaire est requis"),
  client: z.string().min(1, "Client est requis"),
});

// Définir le type basé sur le schéma de validation
type DevisSchema = z.infer<typeof devisSchema>;

export const FormAvoir: React.FC = () => {
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

  const [footerValues, setFooterValues] = useState<{
    totalHT: number;
    netADeduire: number;
  }>({ totalHT: 0, netADeduire: 0 });

  const [conditionText, setConditionText] = useState("");

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

  useEffect(() => {
    const totalHT = TabValues.reduce(
      (sum, item) => sum + item.priceHT * item.quantity,
      0
    );
    const netADeduire = TabValues.reduce((sum, item) => {
      const tvaAmount = item.priceHT * (item.tva / 100) * item.quantity;
      return sum + item.priceHT * item.quantity + tvaAmount;
    }, 0);
    setFooterValues({ totalHT, netADeduire: netADeduire });
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
    conditionText: string;
    footerValues: typeof footerValues;
  }> = ({ data, tabValues, conditionText, footerValues }) => (
    <Document>
      <Page style={tw("p-2 text-sans")} size="A4">
        <View style={tw("flex flex-row justify-between h-1/5")}>
          <View style={tw("")}>
            <Image src="./src/assets/dcrrlogo.png" style={tw("w-44")} />
            <Text style={tw("text-sm font-bold")}>
              Denquin & Ciatti Refrigeration Reglementary
            </Text>
            <Text style={tw("text-sm")}>
              36 Avenue Adrien Raynal, 94310 - ORLY
            </Text>
            <Text style={tw("text-sm")}>SAS au capital de 1000€</Text>
            <Link src="https://dcrr.fr/contact/" style={tw("text-sm")}>
              Contactez-nous
            </Link>
            <View>
              <Text style={tw("text-sm")}>
                <Text style={tw("font-bold")}>RCS </Text>
                Créteil B 951 054 394
              </Text>
              <Text style={tw("text-sm")}>
                <Text style={tw("font-bold")}>APE </Text>
                7120B
              </Text>
              <Text style={tw("text-sm")}>
                <Text style={tw("font-bold text-red")}>SIRET </Text>
                95105439400014
              </Text>
              <Text style={tw("text-sm")}>
                <Text style={tw("font-bold ")}>TVA </Text>
                FR53951054394
              </Text>
            </View>
          </View>
          <View style={tw("flex flex-col item-end ")}>
            <Text
              style={tw(
                "text-sans text-2xl text-right justify-end   block self-end"
              )}
            >
              Avoir
            </Text>
            <Text style={tw("inline  text-sm self-end")}>
              Devis n° : {data.Devis}
            </Text>
            <Text style={tw("self-end text-sm")}>
              Nom de l'affaire : {data.nomAffaire}
            </Text>
            <Text style={tw("self-end text-sm")}>Client : {data.client}</Text>
          </View>
        </View>
        <View style={tw("mt-5")}>
          <View
            style={tw(
              "flex flex-row justify-between bg-yellow-600 rounded-t-lg p-1 text-white font-bold"
            )}
          >
            <Text style={tw("text-sm pt-2 w-48")}>Désignation</Text>
            <Text style={tw("text-sm ml-6 pt-2")}>Qté</Text>
            <Text style={tw("text-sm pt-2")}>Unité</Text>
            <Text style={tw("text-sm pt-2")}>Prix U.HT</Text>
            <Text style={tw("text-sm pt-2")}>TVA</Text>
            <Text style={tw("text-sm pt-2")}>Total HT</Text>
          </View>

          {tabValues.map((item, index) => (
            <View key={index} style={tw("flex flex-row justify-between p-1")}>
              <Text style={tw("w-52 text-sm")}>{item.designation}</Text>
              <Text style={tw("w-10 text-right overflow-hidden text-sm")}>
                {item.quantity}
              </Text>
              <Text style={tw("w-10 overflow-hidden text-sm")}>
                {item.unit}
              </Text>
              <Text style={tw("w-10 text-right overflow-hidden text-sm")}>
                {item.priceHT} €
              </Text>
              <Text style={tw("w-10 text-right overflow-hidden text-sm")}>
                {item.tva} %
              </Text>
              <Text style={tw("w-14 text-right overflow-hidden text-sm")}>
                {item.totalHT.toFixed(2)} €
              </Text>
            </View>
          ))}
        </View>

        <View style={tw("flex flex-row justify-between mx-4")}>
          <View style={tw("mt-5 border border-slate-300 p-2 rounded-lg")}>
            <Text style={tw("text-2lg mb-2")}>Conditions de paiement</Text>
            <View>
              <Text style={tw("text-sm")}>{conditionText}</Text>
            </View>
          </View>
          <View style={tw("mt-5 border border-slate-300 rounded-lg")}>
            <Text style={tw("text-2xl mb-2 p-2")}>Résumé</Text>
            <Text style={tw("text-lg p-2")}>
              Total HT: {footerValues.totalHT} €
            </Text>
            <Text
              style={tw(
                "text-lg rounded-b-lg bg-yellow-600 pt-2 px-4 text-xl text-white font-bold"
              )}
            >
              Net à déduire: {footerValues.netADeduire} €
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  const handleConditionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setConditionText(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <form className="w-4/5 p-3 text-xl">
          <div className="my-3 ">
            <label htmlFor="objetDevis">ID du Devis</label>
            <Input id="objetDevis" {...register("Devis")} />
            {errors.Devis && (
              <p className="text-sm text-red-500">{errors.Devis.message}</p>
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
            <table className="w-full overflow-hidden text-left border rounded-t-xl">
              <thead className="text-xl text-white bg-yellow-600 ">
                <tr>
                  <th className="p-3 ">Désignation</th>
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
            <div className="flex justify-end w-full">
              <TabFooter
                TabValues={TabValues}
                onFooterValuesChange={setFooterValues}
                conditionText={conditionText} // Passer conditionText ici
                handleConditionChange={handleConditionChange}
              />
            </div>
          </div>
        </form>

        <div className="w-1/2 h-screen my-5 overflow-hidden pdfView rounded-3xl ">
          <PDFViewer className="w-full h-full over">
            <MyDocument
              data={{
                Devis: watch("Devis"),
                nomAffaire: watch("nomAffaire"),
                client: watch("client"),
              }}
              tabValues={TabValues}
              footerValues={footerValues}
              conditionText={conditionText} // Passer conditionText ici
            />
          </PDFViewer>
        </div>
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
            className="bg-yellow-200 focus:outline-none"
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
    netADeduire: number;
  }) => void;
  conditionText: string;
  handleConditionChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({
  TabValues,
  onFooterValuesChange,
  conditionText,
  handleConditionChange,
}) => {
  const calculateTvaAmount = (tva: number, prixHT: number) => {
    return ((tva / 100) * prixHT).toFixed(2);
  };

  const totalHT = TabValues.reduce(
    (sum, item) => sum + item.priceHT * item.quantity,
    0
  ).toFixed(2);

  const netADeduire = TabValues.reduce((sum, item) => {
    const tvaAmount = item.priceHT * (item.tva / 100) * item.quantity;
    return sum + item.priceHT * item.quantity + tvaAmount;
  }, 0).toFixed(2);

  // Mise à jour des valeurs du footer
  useEffect(() => {
    onFooterValuesChange({
      totalHT: parseFloat(totalHT),
      netADeduire: parseFloat(netADeduire),
    });
  }, [totalHT, netADeduire, onFooterValuesChange]);

  return (
    <div className="flex justify-between w-full">
      <div className="w-1/3 p-3 mt-5 border rounded-lg border-slate-200 h-fit">
        <h1 className="mb-2">Condition de Paiements</h1>
        <Textarea
          value={conditionText}
          onChange={handleConditionChange}
          className="my-2"
          placeholder="Taper les conditions de paiements ici ..."
        />
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
          <li className="font-bold">Total TTC </li>
          <li>{netADeduire} €</li>
        </ul>
        <ul className="flex justify-between w-full p-2 font-bold text-white bg-yellow-600 rounded-b-lg">
          <li>Net à déduire</li>
          <li>{netADeduire} €</li>
        </ul>
      </div>
    </div>
  );
};

export default FormAvoir;
