import { DCRRInfo, FooterValues, tw } from "./DevisDocument";
import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { AvoirSchema } from "./FormAvoir";
import { TabValue } from "./DevisDocument";

export const AvoirDocument: React.FC<{
  data: AvoirSchema;
  tabValues: TabValue[];
  conditionText: string;
  footerValues: FooterValues;
}> = ({ data, tabValues, conditionText, footerValues }) => (
  <Document>
    <Page style={tw("p-2 text-sans")} size="A4">
      <View style={tw("flex flex-row justify-between h-1/5")}>
        {DCRRInfo()}
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
            <Text style={tw("w-10 overflow-hidden text-sm")}>{item.unit}</Text>
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
            Net à déduire: {footerValues.net} €
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);
