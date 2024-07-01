import React, { useState } from "react";

// Définir les types pour les valeurs des champs
interface TableData {
  section3: string[];
  section4: (string | [string, string])[];
  section5: string[];
}

const PlanInspection: React.FC = () => {
  // Initialiser l'état pour les valeurs des champs
  const [data, setData] = useState<TableData>({
    section3: Array(4).fill(""),
    section4: ["", "", "", "", "", ["", ""], "", ""],
    section5: Array(5).fill(""),
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

  return (
    <div className="w-full h-screen p-4">
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
                  <div className="flex">
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
    </div>
  );
};

export default PlanInspection;
