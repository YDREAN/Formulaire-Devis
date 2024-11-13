import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { PlazaTabValuesType } from "./PlazaTCG";

// Type DevisSchema
type DevisSchema = {
  objet: string;
  nomAffaire: string;
  donneur: string;
};

type PlazaValues = {
  dateDeNaissance: string;
  total: number;
  moyenDePaiement: string;
  fraisDePorts: number;
  signature: string | null;
};

export const tw = createTw({
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

const TableHeader = () => (
  <View
    style={tw(
      "flex flex-row justify-between bg-red-900 rounded-t-lg p-1 text-white font-bold"
    )}
  >
    <Text style={tw("text-sm pt-2 w-44 ")}>Désignation</Text>
    <Text style={tw("text-center text-sm ml-6 w-20 pt-2 ")}>Qté</Text>

    <Text style={tw("text-center text-sm pt-2 w-24 ")}>Prix</Text>

    <Text style={tw("text-center text-sm pt-2 w-28 ")}>Total</Text>
  </View>
);

// Create Document Component
export const PlazaDocument: React.FC<{
  date: string;
  data: DevisSchema;
  tabValues: PlazaTabValuesType[];

  plazaValues: PlazaValues;
}> = ({ date, data, tabValues, plazaValues }) => {
  const itemsPerPage = 22; // Nombre d'éléments pouvant tenir sur une page (ajustez selon votre mise en page)
  const totalPages = Math.ceil(tabValues.length / itemsPerPage);

  return (
    <Document>
      {[...Array(totalPages)].map((_, pageIndex) => (
        <Page
          renderAnnotationLayer={false}
          renderTextLayer={false}
          style={tw("p-2 text-sans")}
          size="A4"
          key={pageIndex}
        >
          {pageIndex === 0 && (
            <>
              <View style={tw("flex flex-row justify-between")}>
                <View style={tw("flex flex-row items-center")}>
                  <Image src="./src/assets/Plaza.jpeg" style={tw("w-44")} />
                  <View>
                    <Text>PLAZA TCG</Text>
                    <Text style={tw("text-lg opacity-50 italic")}>
                      Boutique TCG
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={tw("text-2xl self-end")}>Plaza TCG</Text>
                  <Text style={tw("text-lg opacity-50   self-end")}>
                    21/23 BOULEVARD DE LA MUETTE
                  </Text>
                  <Text style={tw("text-lg opacity-50   self-end")}>
                    95140 GARGES LES GONESSE
                  </Text>
                  <Text style={tw("text-lg opacity-50   self-end")}>
                    SIRET : 97780068900027
                  </Text>
                </View>
              </View>
              <View style={tw("flex flex-row")}>
                <Text style={tw("  border-b-4 border-red-400 w-1/2")}></Text>
                <Text style={tw("  border-b-4 border-blue-200 w-1/2")}></Text>
              </View>
              <View style={tw("text-sm my-4 mx-8")}>
                <Text style={tw(" mb-4  ")}>Objet : {data.objet}</Text>
                <Text style={tw(" mb-4  ")}>
                  Je soussigné{" "}
                  <Text style={tw(" font-bold ")}>{data.donneur}</Text>, né le{" "}
                  {plazaValues.dateDeNaissance}, certifie sur l'honneur avoir
                  cédé à la société{" "}
                  <Text style={tw(" font-bold ")}>PLAZA TCG </Text> (SIRET :
                  97780068900027) et dont le siège social est situé au{" "}
                  <Text style={tw(" ")}>
                    21/23 BOULEVARD DE LA MUETTE, 95140 - GARGES LES GONESSE,
                  </Text>
                </Text>
                <Text style={tw("  ")}>Le(s) bien(s) suivant(s) :</Text>
              </View>
            </>
          )}
          <View style={tw("mt-5 mx-8")}>
            {/* Ajout de l'en-tête du tableau sur la première page */}
            <TableHeader />
            {tabValues
              .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
              .map((item, index) => (
                <View
                  key={index}
                  style={tw(" flex flex-row justify-between p-1")}
                  wrap={false}
                >
                  <Text
                    style={tw(
                      "self-center  w-44 text-sm text-clip overflow-hidden"
                    )}
                  >
                    {item.designation}
                  </Text>
                  <Text
                    style={tw(
                      "text-center  self-center  overflow-hidden ml-6 text-sm overflow-visible w-20"
                    )}
                  >
                    {item.quantity}
                  </Text>

                  <Text
                    style={tw(
                      "text-center  self-center  overflow-hidden text-sm whitespace-no-wrap w-24"
                    )}
                  >
                    {item.price + "€"}
                  </Text>

                  <Text
                    style={tw(
                      " item-end text-right self-center  text-sm w-28  "
                    )}
                  >
                    {item.total.toFixed(2) + "€"}
                  </Text>
                </View>
              ))}
          </View>

          <View style={tw("text-sm my-4 mx-8")}>
            <Text style={tw("")}>
              Le matériel ci-dessus a été vendu pour la somme de{" "}
              <Text>{plazaValues.total} Euros</Text> dont{" "}
              <Text>{plazaValues.fraisDePorts}</Text> euros de frais de ports.
            </Text>
            <Text style={tw("mt-4")}>
              Le paiement à été effectué par{" "}
              <Text>{plazaValues.moyenDePaiement}</Text>.
            </Text>
            <Text style={tw("text-right")}>
              Fait le <Text>{date}</Text>
            </Text>
          </View>
          <View style={tw("flex flex-row justify-between text-sm my-4 mx-8")}>
            <View style={tw("")}>
              <Text>Signature du vendeur :</Text>{" "}
              {plazaValues.signature && (
                <Image
                  src={plazaValues.signature}
                  style={{ width: 150, height: 70 }}
                />
              )}
            </View>

            <View>
              <Text>Signature de l'acheteur :</Text>
              <Image
                src="./src/assets/PlazaSignature.png"
                style={{ width: 150, height: 70 }}
              />
              <Text style={tw("text-xs self-end -top-6")}>{date}</Text>
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
};
