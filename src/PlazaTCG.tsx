import React, {
  ReactNode,
  useState,
  useEffect,
  useContext,
  MouseEvent,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./components/ui/input";
import { PDFViewer } from "@react-pdf/renderer";
import Tableau from "./Tableau";
import { DevisContexte } from "./DevisContexte";
import PlazaTableau from "./PlazaTableau";
import { PlazaDocument } from "./PlazaDocument";

// Définir le schéma de validation avec Zod
export const devisSchema = z.object({
  objet: z.string().min(1, "Objet  est requis"),
  nomAffaire: z.string().min(1, "Nom affaire est requis"),
  donneur: z.string().min(1, "Un donneur est requis"),
});

// Définir le type basé sur le schéma de validation
type DevisSchema = z.infer<typeof devisSchema>;

// Définir les types pour les autres propriétés
export type PlazaTabValuesType = {
  designation: string;
  quantity: number;
  price: number;
  total: number;
};

export type FooterValuesType = {
  total: number;
};

// Définir le type DevisProps
export type DevisProps = {
  id: number;
  data: DevisSchema;
  tabValues: PlazaTabValuesType[];

  footerValues: FooterValuesType;
};
export const DateGenerator = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("fr-FR", options);
};

export const IdGenerator = () => {
  const now = new Date();
  const Id = now.getTime();

  return Id;
};

export const FormPlazaTCG: React.FC = () => {
  DateGenerator();
  const DevisID = IdGenerator();

  const [lignes, setLignes] = useState<string[]>([]);
  const [TabValues, setTabValues] = useState<PlazaTabValuesType[]>([]);

  const [footerValues, setFooterValues] = useState<FooterValuesType>({
    total: 0,
  });

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
      newValues[index].total =
        newValues[index].quantity * newValues[index].price;
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
        price: 0,
        tva: 0,
        total: 0,
      },
    ]);
  };

  useEffect(() => {
    const total = TabValues.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setFooterValues({ total: total });
  }, [TabValues]);

  const total = TabValues.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ).toFixed(2);

  const { addDevis } = useContext(DevisContexte);

  return (
    <>
      <div className="flex flex-col items-center">
        <form className="w-4/5 p-3 text-xl">
          <div className="my-3">
            <label htmlFor="objet">Objet</label>
            <Input id="objet" {...register("objet")} />
            {errors.objet && (
              <p className="text-sm text-red-500">{errors.objet.message}</p>
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
            <label htmlFor="donneur">Donneur</label>
            <Input id="donneur" {...register("donneur")} />
            {errors.donneur && (
              <p className="text-sm text-red-500">{errors.donneur.message}</p>
            )}
          </div>

          <div className="mt-5">
            <PlazaTableau
              TabValues={TabValues}
              handleAddLine={handleAddLine}
              handleTabValuesChange={handleTabValuesChange}
              lignes={lignes}
            />

            <div className="flex justify-end w-full">
              <div className="flex justify-between w-full">
                <div className="flex flex-col w-1/3 mt-3 rounded-lg justify borde">
                  <ul className="flex justify-between p-2 border rounded-lg border-slate-200">
                    <li>Total </li>
                    <li>{total} €</li>
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
                <PlazaDocument
                  id={0}
                  date={DateGenerator()}
                  data={{
                    objet: watch("objet"),
                    nomAffaire: watch("nomAffaire"),
                    donneur: watch("donneur"),
                  }}
                  tabValues={TabValues}
                  footerValues={footerValues}
                ></PlazaDocument>
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

export default FormPlazaTCG;
