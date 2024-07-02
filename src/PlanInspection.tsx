import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { fr } from "date-fns/locale";

// Enregistrer la locale française pour le date picker
registerLocale("fr", fr);

// Définir les types pour les valeurs des champs
export interface TableData {
  verificationDate: Date | null;
  section3: string[];
  section4: (string | [string, string])[];
  section5: string[];
  periodicity: {
    months: "24 mois" | "48 mois";
    years: "6 ans" | "12 ans";
  };
  annexes: File[];
}

const PlanInspection: React.FC = () => {
  // Initialiser l'état pour les valeurs des champs
  const [data, setData] = useState<TableData>({
    verificationDate: null,
    section3: Array(4).fill(""),
    section4: ["", "", "", "", "", ["", ""], "", ""],
    section5: Array(5).fill(""),
    periodicity: {
      months: "24 mois",
      years: "6 ans",
    },
    annexes: [],
  });

  // Gérer les modifications des champs de texte
  const handleChange = (
    section: "section3" | "section4" | "section5",
    index: number,
    value: string,
    subIndex?: number
  ) => {
    setData((prevData) => {
      if (section === "section3" || section === "section5") {
        const updatedSection = prevData[section].map((val, i) =>
          i === index ? value : val
        );
        return { ...prevData, [section]: updatedSection };
      } else if (section === "section4") {
        const updatedSection = prevData.section4.map((val, i) => {
          if (i === index) {
            if (Array.isArray(val)) {
              return val.map((subVal, j) =>
                j === subIndex ? value : subVal
              ) as [string, string];
            } else {
              return value;
            }
          }
          return val;
        });
        return { ...prevData, section4: updatedSection };
      }
      return prevData;
    });
  };

  // Gérer les modifications de la date
  const handleDateChange = (date: Date | null) => {
    setData((prevData) => ({
      ...prevData,
      verificationDate: date,
    }));
  };

  // Gérer les modifications des cases à cocher
  const handlePeriodicityChange = (
    type: "months" | "years",
    value: "24 mois" | "48 mois" | "6 ans" | "12 ans"
  ) => {
    setData((prevData) => ({
      ...prevData,
      periodicity: {
        ...prevData.periodicity,
        [type]: value,
      },
    }));
  };

  // Gérer l'importation des fichiers PDF
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const pdfFiles = Array.from(files).filter(
        (file) => file.type === "application/pdf"
      );
      setData((prevData) => ({
        ...prevData,
        annexes: [...prevData.annexes, ...pdfFiles],
      }));
    }
  };

  return (
    <div className="w-full h-screen p-4">
      <h1 className="mb-4 text-2xl font-bold">Plan d'Inspection</h1>
      <div className="mb-8">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Date de vérification
        </label>
        <DatePicker
          selected={data.verificationDate}
          onChange={handleDateChange}
          className="w-full p-2 border"
          dateFormat="dd/MM/yyyy"
          placeholderText="Sélectionnez une date"
          locale="fr"
        />
      </div>

      <h2 className="mb-4 text-xl font-bold">
        Aménagements à la notice d'instructions du fabricant (Section 3)
      </h2>
      <table className="min-w-full mb-8 bg-white">
        <thead>
          <tr className="text-white bg-blue-500">
            <th className="p-2 border">Équipement concerné</th>
            <th className="p-2 border">
              Prescription de la notice d'instructions objet d'un aménagement
            </th>
            <th className="p-2 border">
              Mesures compensatoires de surveillance (le cas échéant)
            </th>
            <th className="p-2 border">Critères d'acceptation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.section3.map((value, colIndex) => (
              <td key={colIndex} className="border">
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleChange("section3", colIndex, e.target.value)
                  }
                  className="w-full p-2 border"
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <h2 className="mt-8 mb-4 text-xl font-bold">
        Modes de dégradation (Section 4)
      </h2>
      <table className="min-w-full mb-8 bg-white">
        <thead>
          <tr className="text-white bg-blue-500">
            <th className="p-2 border">Équipement concerné</th>
            <th className="p-2 border">Modes de dégradation</th>
            <th className="p-2 border">Origine</th>
            <th className="p-2 border">Conséquences</th>
            <th className="p-2 border">Effets</th>
            <th className="p-2 border">Localisation des zones sensibles</th>
            <th className="p-2 border">Mesures de surveillance</th>
            <th className="p-2 border">Critères d'acceptation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.section4.map((value, colIndex) => (
              <td key={colIndex} className="border">
                {Array.isArray(value) ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={value[0]}
                      onChange={(e) =>
                        handleChange("section4", colIndex, e.target.value, 0)
                      }
                      className="w-1/2 p-2 border"
                    />
                    <input
                      type="text"
                      value={value[1]}
                      onChange={(e) =>
                        handleChange("section4", colIndex, e.target.value, 1)
                      }
                      className="w-1/2 p-2 border"
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleChange("section4", colIndex, e.target.value)
                    }
                    className="w-full p-2 border"
                  />
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <h2 className="mt-8 mb-4 text-xl font-bold">
        Conditions opératoires critiques (Section 5)
      </h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-white bg-blue-500">
            <th className="p-2 border">Condition opératoire critique limite</th>
            <th className="p-2 border">
              Référence de la chaîne de mesure ou de la méthode de mesure
            </th>
            <th className="p-2 border">Localisation de la mesure</th>
            <th className="p-2 border">Seuil</th>
            <th className="p-2 border">Actions en cas de dépassement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.section5.map((value, colIndex) => (
              <td key={colIndex} className="border">
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleChange("section5", colIndex, e.target.value)
                  }
                  className="w-full p-2 border"
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <h2 className="mt-8 mb-4 text-xl font-bold">Périodicité</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Périodicité en mois
        </label>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="24mois"
            name="periodicityMonths"
            value="24 mois"
            checked={data.periodicity.months === "24 mois"}
            onChange={() => handlePeriodicityChange("months", "24 mois")}
            className="mr-2"
          />
          <label htmlFor="24mois" className="mr-4">
            24 mois
          </label>
          <input
            type="radio"
            id="48mois"
            name="periodicityMonths"
            value="48 mois"
            checked={data.periodicity.months === "48 mois"}
            onChange={() => handlePeriodicityChange("months", "48 mois")}
            className="mr-2"
          />
          <label htmlFor="48mois">48 mois</label>
        </div>
      </div>
      <div className="mb-8">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Périodicité en années
        </label>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="6ans"
            name="periodicityYears"
            value="6 ans"
            checked={data.periodicity.years === "6 ans"}
            onChange={() => handlePeriodicityChange("years", "6 ans")}
            className="mr-2"
          />
          <label htmlFor="6ans" className="mr-4">
            6 ans
          </label>
          <input
            type="radio"
            id="12ans"
            name="periodicityYears"
            value="12 ans"
            checked={data.periodicity.years === "12 ans"}
            onChange={() => handlePeriodicityChange("years", "12 ans")}
            className="mr-2"
          />
          <label htmlFor="12ans">12 ans</label>
        </div>
      </div>

      <div className="mb-8">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Importer annexe
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="w-full p-2 border"
        />
      </div>
    </div>
  );
};

export default PlanInspection;
