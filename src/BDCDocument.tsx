import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import {
  DCRRInfo,
  FooterValues,
  TabValue,
  TableHeader,
  tw,
} from "./DevisDocument";
import { BDCSchema } from "./BonDeCommande";

// Create Document Component
export const BDCDocument: React.FC<{
  id: number;
  data: BDCSchema;
  tabValues: TabValue[];
  footerValues: FooterValues;
}> = ({ id, data, tabValues, footerValues }) => {
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
            <View style={tw("flex flex-row justify-between h-1/5")}>
              <DCRRInfo />
              <View style={tw(" flex flex-col")}>
                <Text style={tw("text-2xl self-end")}>Bon de Commande</Text>
                <Text style={tw("text-base text-lime-600 self-end")}>
                  ID: {id}
                </Text>
                <Text style={tw("inline self-end text-sm")}>
                  Objet du bon de commande : {data.objetBDC}
                </Text>
                <Text style={tw("self-end text-sm")}>
                  Nom de l'affaire : {data.nomAffaire}
                </Text>
                <View>
                  <Text style={tw(" mt-10 mb-2 border border-lime-500")}></Text>
                  <Text style={tw(" text-sm")}>Client : {data.client}</Text>
                </View>
              </View>
            </View>
          )}
          <View style={tw("mt-5 ")}>
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
                      "text-center self-center  overflow-hidden text-sm w-8"
                    )}
                  >
                    {item.unit}
                  </Text>
                  <Text
                    style={tw(
                      "text-center  self-center  overflow-hidden text-sm whitespace-no-wrap w-24"
                    )}
                  >
                    {item.priceHT + "€"}
                  </Text>
                  <Text
                    style={tw(
                      "text-center  self-center    overflow-hidden text-sm w-10"
                    )}
                  >
                    {item.tva + "%"}
                  </Text>
                  <Text
                    style={tw(
                      " item-end text-right self-center  text-sm w-28  "
                    )}
                  >
                    {item.totalHT.toFixed(2) + "€"}
                  </Text>
                </View>
              ))}
          </View>

          {pageIndex === totalPages - 1 && (
            <View style={tw(" flex flex-row justify-between mx-4")}>
              <View style={tw("mt-5  w-1/2 rounded-lg max-w-80")}>
                <Text
                  style={tw(
                    " rounded-t-lg py-1 border border-slate-300 text-xs p-1"
                  )}
                >
                  Total HT: {footerValues.totalHT.toFixed(2)} €
                </Text>
                <Text style={tw("text-xs p-1 py-1 border border-slate-300")}>
                  Total TVA: {footerValues.totalTVA.toFixed(2)} €
                </Text>
                <Text
                  style={tw(
                    "text-sm rounded-b-lg bg-lime-600 p-1   text-white font-bold"
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
