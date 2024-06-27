import { ReactNode } from "react"; // Assurez-vous que cette importation est correcte
import { tw } from "./DevisDocument";
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  Image,
} from "@react-pdf/renderer";
import { cn } from "./lib/utils";
import clsx from "clsx";

const themeColor = "bg-black";
// Composant principal pour afficher le visualiseur PDF
export const PlanInspection = () => {
  return (
    <PDFViewer className="w-full h-screen">
      <PlanInspectionPDF themeColor={themeColor} />
    </PDFViewer>
  );
};

// Composant pour créer le document PDF
const PlanInspectionPDF = ({ themeColor }: { themeColor: string }) => {
  return (
    <Document>
      <Page renderTextLayer={false} style={tw("p-2 text-sans")} size="A4">
        <View style={tw("w-full flex items-center")}>
          <Image src="./src/assets/dcrrlogo.png" style={tw("w-44")} />
        </View>
        <Tableau themeColor={themeColor}>
          <Ligne>
            <Cellule variant="blue" className="">
              PLAN D'INSPECTION CONCERNANT UN SYSTEME FRIGORIFIQUE
            </Cellule>
          </Ligne>
        </Tableau>
        <Tableau className="my-4" themeColor={themeColor}>
          <Ligne className="">
            <Cellule variant="blue" className="w-2/12 ">
              installation :
            </Cellule>
            <View style={tw(" items-center bg-white w-full text-xl")}>
              <Text style={tw(" mt-2")}>Groupe Froid sous sol</Text>
            </View>
          </Ligne>
        </Tableau>
        <Tableau className="my-4" themeColor={themeColor}>
          <Ligne className="">
            <Cellule variant="blue" className="">
              Rédacteur{" "}
            </Cellule>
            <Cellule variant="blue" className="">
              Coordonnées Rédacteur{" "}
            </Cellule>
            <Cellule variant="blue" className="">
              Date de rédaction{" "}
            </Cellule>
            <Cellule variant="blue" className="">
              Agence / Siege{" "}
            </Cellule>
            <Cellule variant="blue" className="">
              Adresse Agence / Siege{" "}
            </Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule className="">Sydney Denquin </Cellule>
            <Cellule className="">sidney.denquin@dcrr.fr </Cellule>
            <Cellule className="">30/03/2024 </Cellule>
            <Cellule className="">SIEGE </Cellule>
            <Cellule className="">36 Avenue Adrien Raynal, Orly 94310</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="">
              Date de rédaction PI:{" "}
            </Cellule>
            <Cellule className="">30/03/2024 </Cellule>
            <Cellule variant="blue" className="">
              Référence PI :{" "}
            </Cellule>
            <Cellule className="">PI-LG09582 </Cellule>
            <Ligne>
              <Cellule variant="blue" className="">
                Rev :
              </Cellule>
              <Cellule className="">0</Cellule>
            </Ligne>
          </Ligne>
        </Tableau>

        <Tableau className="my-4" themeColor={themeColor}>
          <Ligne className="">
            <Cellule variant="blue" className="w-2/12 ">
              Intervention du :
            </Cellule>
            <Cellule className={"w-full  "}>18/03/2024</Cellule>
          </Ligne>
          <Ligne>
            <Cellule variant="blue" className="">
              Nom du site
            </Cellule>
            <Cellule variant="blue" className="">
              Lieu d'intervention
            </Cellule>
          </Ligne>
          <Ligne>
            <Cellule className="">Banagrumes</Cellule>
            <Cellule className="">
              5 Rue de Montpellier, 94550 Chevilly-Larue
            </Cellule>
          </Ligne>
        </Tableau>

        <Tableau className="my-4" themeColor={themeColor}>
          <Ligne className="">
            <Cellule variant="blue" className="w-2/12 ">
              Numéro d'affaire :
            </Cellule>
            <Cellule className={"w-full  "}>LG09582</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="w-2/12 ">
              Référence du rapport :
            </Cellule>
            <Cellule className={"w-full  "}>RPT-LG09582-45381</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="w-2/12 ">
              Rédigé le :
            </Cellule>
            <Cellule className={"w-full  "}>30/03/2024</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="w-2/12 ">
              Par :
            </Cellule>
            <Cellule className={"w-full  "}>Sidney Denquin</Cellule>
          </Ligne>
        </Tableau>

        <Tableau className="my-4" themeColor={themeColor}>
          <Ligne>
            <Cellule variant="blue" className="">
              Date, nom et signature de la personne habilitée
            </Cellule>
            <Cellule variant="blue" className="">
              Date, nom et signature de l'exploitant
            </Cellule>
          </Ligne>
          <Ligne>
            <Cellule className="h-20">
              <Image style={tw("size-5")} src={"./src/assets/Sign.png"}></Image>
            </Cellule>
            <Cellule className="">
              5 Rue de Montpellier, 94550 Chevilly-Larue
            </Cellule>
          </Ligne>
        </Tableau>

        <Tableau className="my-4 border-l" themeColor={themeColor}>
          <Ligne>
            <Cellule variant="blue" className="">
              Approbation OH (Date, nom et signature du représentant) :{" "}
            </Cellule>
          </Ligne>
          <Ligne>
            <Cellule className=""> </Cellule>
          </Ligne>
        </Tableau>

        <View style={tw("flex flex-row gap-3 mx-2")}>
          <View style={tw("border-l-2 pl-1 w-1/2")}>
            <Text style={tw("text-xs")}>Je soussigné,</Text>
            <Text style={tw("text-xs")}>PRENOM - NOM</Text>
            <Text style={tw("text-xs")}>FONCTION</Text>
            <Text style={tw("text-xs mb-2")}>
              étant au titre de ce présent PI l'exploitant
            </Text>
            <Text style={tw("text-xs mb-2")}>
              Désigne et reconnait compétente la personne habilitée ayant
              rédigée ce Plan d’Inspection (PI) pour l’élaboration d’un plan
              d’inspection.
            </Text>
            <Text style={tw("text-xs")}>
              - M’engage à lui transmettre les comptes rendus de contrôle prévus
              au PI (si faits par une autre entreprise), les informations
              relatives à la modification des conditions d’utilisation et aux
              évènements (modification d’un des éléments de l’identification du
              système entre autre) ou incidents survenus sur les équipements
              sous pression. Reconnaît avoir pris en compte les informations de
              ce plan d’inspection
            </Text>
            <Text style={tw("text-xs")}>
              - M’engage à assurer la veille réglementaire
            </Text>
            <Text style={tw("text-xs")}>
              - M’engage à assurer le suivi des échéances des contrôles
              réglementaires décrits dans ce PI
            </Text>
            <Text style={tw("text-xs")}>
              - M’engage à transmettre le retour d’expérience (REX) au moins
              tous les deux ans. Voir A.10 du CTP « Systèmes Frigorifiques »
            </Text>
            <Text style={tw("text-xs mt-2")}>
              Ce document a été validé par son auteur
            </Text>
          </View>
          <View style={tw("border-l-2 pl-1 w-1/2")}>
            <Text style={tw("text-xs mb-2")}>
              Désigne un organisme habilité (OH) pour l’Approbation du Plan
              d’Inspection (PI).
            </Text>
            <Text style={tw("text-xs")}>
              - M’engage à ne pas avoir introduit de demande d’approbation sur
              ce système frigorifique auprès d’un autre organisme habilité
              accrédité.
            </Text>
            <Text style={tw("text-xs mb-2")}>
              - M’engage également sur le fait que le plan d’inspection est
              rédigé en application du CTP mentionné en page 2, sur la base de
              son plan d’inspection générique.
            </Text>
            <Text style={tw("text-xs ")}>
              Si ce PI a été approuvé par un organisme habilité (OH), m’engage à
              informer l’OH dans le cas :
            </Text>
            <Text style={tw("text-xs")}>
              - de la parution d’une nouvelle version du Cahier Technique
              Professionnel pour le suivi en service des équipements
              frigorifiques sous pression
            </Text>
            <Text style={tw("text-xs")}>
              - de la modification des conditions d’exploitation
            </Text>
            <Text style={tw("text-xs")}>- d’incidents ou d’événements</Text>
            <Text style={tw("text-xs")}>
              - des résultats des actions de surveillance prévues au PI
            </Text>
            <Text style={tw("text-xs")}>
              - d’interventions (notables ou non notables)
            </Text>
            <Text style={tw("text-xs")}>
              - d’ajout de modes de dégradation non cités dans le CTP « Systèmes
              frigorifiques »
            </Text>
            <Text style={tw("text-xs")}>
              - de modification de la liste des ESP soumis du système
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const Tableau = ({
  themeColor,
  className,
  children,
}: {
  themeColor?: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <View style={tw(themeColor + "  border   " + className)}>{children}</View>
  );
};

const Ligne = ({
  children,
  className,
  themeColor,
}: {
  themeColor?: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <View
      style={tw(themeColor + " w-full overflow-hidden flex-row  " + className)}
    >
      {children}
    </View>
  );
};
const Cellule = ({
  variant,
  children,
  className,
}: {
  variant?: "blue" | "white";
  children: ReactNode;
  className?: string;
}) => {
  return (
    <>
      {variant === "blue" ? (
        <View
          style={tw(
            `w-full flex items-center justify-center overflow-hidden ${className} ${
              variant == "blue" ? "bg-blue-500" : "bg-white"
            }`
          )}
        >
          <Text style={tw("p-1 text-center text-xs text-white")}>
            {children}
          </Text>
        </View>
      ) : (
        <View
          style={tw(
            `w-full flex items-center justify-center overflow-hidden ${className} ${
              variant == "blue" ? "bg-blue-500" : "bg-white"
            }`
          )}
        >
          <Text style={tw("p-1 text-center text-xs text-black")}>
            {children}
          </Text>
        </View>
      )}
    </>
  );
};
