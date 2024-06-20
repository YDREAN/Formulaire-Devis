import React from "react";
import { Link, Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

// Type DevisSchema
type DevisSchema = {
  objetDevis: string;
  nomAffaire: string;
  client: string;
};

// Types du tableau
export type TabValue = {
  designation: string;
  quantity: number;
  unit: string;
  priceHT: number;
  tva: number;
  totalHT: number;
};

// Types du Devis

type BankDetails = {
  iban: string;
  companyName: string;
};

export type FooterValues = {
  totalHT: number;
  net: number;
  totalTVA: number;
};

type Acomptes = {
  percentage: number;
  unit: string;
  option: string;
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
      "flex flex-row justify-between bg-lime-600 rounded-t-lg p-1 text-white font-bold"
    )}
  >
    <Text style={tw("text-sm pt-2 w-48")}>Désignation</Text>
    <Text style={tw("text-sm ml-6 pt-2")}>Qté</Text>
    <Text style={tw("text-sm pt-2")}>Unité</Text>
    <Text style={tw("text-sm pt-2")}>Prix U.HT</Text>
    <Text style={tw("text-sm pt-2")}>TVA</Text>
    <Text style={tw("text-sm pt-2")}>Total HT</Text>
  </View>
);

// Create Document Component
export const DevisDocument: React.FC<{
  id: number;
  data: DevisSchema;
  tabValues: TabValue[];
  bankDetails: BankDetails;
  footerValues: FooterValues;
  acomptes: Acomptes[];
}> = ({ id, data, tabValues, bankDetails, footerValues, acomptes }) => {
  const itemsPerPage = 22; // Nombre d'éléments pouvant tenir sur une page (ajustez selon votre mise en page)
  const totalPages = Math.ceil(tabValues.length / itemsPerPage);

  return (
    <Document>
      {[...Array(totalPages)].map((_, pageIndex) => (
        <Page style={tw("p-2 text-sans")} size="A4" key={pageIndex}>
          {pageIndex === 0 && (
            <View style={tw("flex flex-row justify-between h-1/5")}>
              {DCRRInfo()}
              <View style={tw(" flex flex-col")}>
                <Text style={tw("text-2xl self-end")}>Devis</Text>
                <Text style={tw("text-base text-lime-600 self-end")}>
                  ID: {id}
                </Text>
                <Text style={tw("inline self-end text-sm")}>
                  Objet du devis : {data.objetDevis}
                </Text>
                <Text style={tw("self-end text-sm")}>
                  Nom de l'affaire : {data.nomAffaire}
                </Text>
                <Text style={tw("self-end text-sm")}>
                  Client : {data.client}
                </Text>
              </View>
            </View>
          )}
          <View style={tw("mt-5")}>
            {/* Ajout de l'en-tête du tableau sur la première page */}
            <TableHeader />
            {tabValues
              .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
              .map((item, index) => (
                <View
                  key={index}
                  style={tw("flex flex-row justify-between p-1")}
                  wrap={false}
                >
                  <Text style={tw("w-52 text-sm")}>{item.designation}</Text>
                  <Text
                    style={tw(
                      "w-10 text-right overflow-hidden text-sm overflow-visible"
                    )}
                  >
                    {item.quantity}
                  </Text>
                  <Text style={tw("w-10 overflow-hidden text-sm")}>
                    {item.unit}
                  </Text>
                  <Text
                    style={tw(
                      "w-10 text-right overflow-hidden text-sm whitespace-no-wrap"
                    )}
                  >
                    {item.priceHT + "€"}
                  </Text>
                  <Text style={tw("w-10   text-right overflow-hidden text-sm")}>
                    {item.tva + "%"}
                  </Text>
                  <Text
                    style={tw("w-14  item-end text-right self-end  text-sm   ")}
                  >
                    {item.totalHT.toFixed(2) + "€"}
                  </Text>
                </View>
              ))}
          </View>

          {pageIndex === totalPages - 1 && (
            <View style={tw(" flex flex-row justify-between mx-4")}>
              <View style={tw("")}>
                <View style={tw("mt-5 border border-slate-300 p-2 rounded-lg")}>
                  <Text style={tw("text-lg mb-2")}>Acompte</Text>
                  <View style={tw("flex ")}>
                    {acomptes.length > 0 ? (
                      acomptes.map((acompte, index) => (
                        <Text key={index} style={tw("text-sm pl-2")}>
                          {acompte.unit === "%" ? (
                            <Text style={tw("")}>
                              (
                              {(
                                footerValues.net *
                                (acompte.percentage / 100)
                              ).toFixed(2)}{" "}
                              €) {acompte.percentage} {acompte.unit}{" "}
                              {acompte.option}
                            </Text>
                          ) : (
                            <Text>
                              {acompte.percentage} € {acompte.unit}{" "}
                              {acompte.option}
                            </Text>
                          )}
                        </Text>
                      ))
                    ) : (
                      <Text style={tw("text-sm pl-2")}>Pas d'acompte</Text>
                    )}
                  </View>
                </View>
                <View style={tw("mt-5 border border-slate-300 p-2 rounded-lg")}>
                  <Text style={tw("text-lg mb-2")}>Détails de paiement</Text>
                  <View style={tw("flex flex-row")}>
                    <Image src="./src/assets/banque.png" style={tw("w-5")} />
                    <Text style={tw("text-sm pl-2")}>
                      IBAN : {bankDetails.iban}
                    </Text>
                  </View>
                  <View style={tw("flex flex-row")}>
                    <Image
                      src="./src/assets/cheque-bancaire.png"
                      style={tw("w-5")}
                    />
                    <Text style={tw("text-sm pl-2")}>
                      Nom de l'entreprise : {bankDetails.companyName}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={tw("mt-10  rounded-lg max-w-80")}>
                <Text
                  style={tw(
                    " rounded-t-lg border border-slate-300 text-sm p-1"
                  )}
                >
                  Total HT: {footerValues.totalHT.toFixed(2)} €
                </Text>
                <Text style={tw("text-sm p-1 border border-slate-300")}>
                  Total TVA: {footerValues.totalTVA.toFixed(2)} €
                </Text>
                <Text
                  style={tw(
                    "text-sm rounded-b-lg bg-lime-600 p-1  text-white font-bold"
                  )}
                >
                  Net à payer: {footerValues.net.toFixed(2)} €
                </Text>
              </View>
            </View>
          )}
        </Page>
      ))}
    </Document>
  );
};

export const DCRRInfo = () => {
  return (
    <View style={tw("")}>
      <Image src="./src/assets/dcrrlogo.png" style={tw("w-44")} />
      <Text style={tw("text-sm font-bold")}>
        Denquin & Ciatti Refrigeration Reglementary
      </Text>
      <Text style={tw("text-sm")}>36 Avenue Adrien Raynal, 94310 - ORLY</Text>
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
          <Text style={tw("font-bold ")}>SIRET </Text>
          95105439400014
        </Text>
        <Text style={tw("text-sm")}>
          <Text style={tw("font-bold ")}>TVA </Text>
          FR53951054394
        </Text>
      </View>
    </View>
  );
};
