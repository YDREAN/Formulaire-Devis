import { ReactNode } from "react"; // Assurez-vous que cette importation est correcte
import { tw } from "./DevisDocument";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";

export const themeColor = "bg-black";
// Composant pour créer le document PDF
export const PlanInspectionPDF = ({ themeColor }: { themeColor: string }) => {
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
            <Cellule variant="blue" className="w-3/12 ">
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
              Date de rédaction
            </Cellule>
            <Cellule variant="blue" className="">
              Agence / Siege
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
            <Cellule variant="blue" className="w-3/12 ">
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
            <Cellule variant="blue" className="w-3/12 ">
              Numéro d'affaire :
            </Cellule>
            <Cellule className={"w-full  "}>LG09582</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="w-3/12 ">
              Référence du rapport :
            </Cellule>
            <Cellule className={"w-full  "}>RPT-LG09582-45381</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="w-3/12 ">
              Rédigé le :
            </Cellule>
            <Cellule className={"w-full  "}>30/03/2024</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="w-3/12 ">
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
      <Page renderTextLayer={false} style={tw(" p-16 text-sans")} size="A4">
        <H2>1. Définition de la famille :</H2>
        <TextDoc>SYSTÈMES FRIGORIFIQUES :</TextDoc>
        <TextDoc>
          Unité complète prête à l'emploi contenant du fluide frigorigène,
          utilisée en réfrigération, conditionnement de l'air ou pompe à
          chaleur, composée d'équipements et/ou d'ensembles frigorifiques sous
          pression assemblés entre eux pouvant se présenter sous la forme d'un
          ensemble ou d'une installation frigorifique.
        </TextDoc>
        <TextDoc>CAHIER TECHNIQUE PROFESSIONNEL APPLIQUÉ :</TextDoc>
        <TextDoc className="mb-2 ">
          Cahier Technique Professionnel pour le suivi en service des systèmes
          frigorifiques sous pression du 23 Juillet 2020, approuvé par la
          Décision BSERR n°20-037 du 19 août 2020.
        </TextDoc>
        <H2>2. Caractéristiques de l'équipement ou des équipement(s) : </H2>
        <TextDoc> Identification</TextDoc>
        <Tableau className="my-4" themeColor={themeColor}>
          <Ligne className="">
            <Cellule variant="blue" className="w-3/12 ">
              Type :
            </Cellule>
            <Cellule className={"w-full  "}>LG09582</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="w-3/12 ">
              Identification :
            </Cellule>
            <Cellule className={"w-full  "}>RPT-LG09582-45381</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="w-3/12 ">
              Fabricant :
            </Cellule>
            <Cellule className={"w-full  "}>30/03/2024</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="w-3/12 ">
              Modèle :
            </Cellule>
            <Cellule className={"w-full  "}>Sidney Denquin</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="w-3/12 ">
              N° série :
            </Cellule>
            <Cellule className={"w-full  "}>Sidney Denquin</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="w-3/12 ">
              Désignation :
            </Cellule>
            <Cellule className={"w-full  "}>Sidney Denquin</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="w-3/12 ">
              Fluide Frigorigène :
            </Cellule>
            <Cellule className={"w-full  "}>Sidney Denquin</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="w-3/12 ">
              Groupe :
            </Cellule>
            <Cellule className={"w-full  "}>Sidney Denquin</Cellule>
          </Ligne>
          <Ligne className="">
            <Cellule variant="blue" className="w-3/12 ">
              Toxique :
            </Cellule>
            <Cellule className={"w-full  "}>Sidney Denquin</Cellule>
          </Ligne>
        </Tableau>
        <Tableau className="my-4" themeColor={themeColor}>
          <Ligne>
            <Cellule variant="blue" className="">
              Caractéristiques de construction
            </Cellule>
            <Cellule variant="blue" className="">
              Caractéristiques d'utilisation
            </Cellule>
          </Ligne>
          <Ligne>
            <Cellule variant="blue"> </Cellule>
            <Cellule variant="blue">BP</Cellule>
            <Cellule variant="blue">MP</Cellule>
            <Cellule variant="blue">HP</Cellule>
            <Cellule variant="blue"> </Cellule>
            <Cellule variant="blue">BP</Cellule>
            <Cellule variant="blue">MP</Cellule>
            <Cellule variant="blue">HP</Cellule>
          </Ligne>
          <Ligne>
            <Cellule variant="blue">PS Mini (bar)</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule variant="blue">Pression (bar)</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
          </Ligne>
          <Ligne>
            <Cellule variant="blue">PS Maxi (bar)</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule variant="blue">Température (°C)</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
          </Ligne>
          <Ligne>
            <Cellule variant="blue">TS Mini (°C)</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule variant="blue">Température extérieur (°C)</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
          </Ligne>
          <Ligne>
            <Cellule variant="blue">TS Maxi (°C)</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule variant="blue">Huile</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
          </Ligne>
          <Ligne>
            <Cellule variant="blue">Huile</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule variant="blue"> </Cellule>
            <Cellule variant="blue"> </Cellule>
            <Cellule variant="blue"> </Cellule>
            <Cellule variant="blue"> </Cellule>
          </Ligne>
        </Tableau>{" "}
        <TextDoc> Constituants</TextDoc>
        <Tableau themeColor={themeColor}>
          <Ligne>
            <Cellule variant="blue">Fabricant</Cellule>
            <Cellule variant="blue">Modèle / Type</Cellule>
            <Cellule variant="blue">Volume (L) ou DN</Cellule>
            <Cellule variant="blue">PS (bar)</Cellule>
            <Cellule variant="blue">Chapitre du CTP</Cellule>
            <Cellule variant="blue">Catégorie</Cellule>
            <Cellule variant="blue">DMS</Cellule>
            <Cellule variant="blue">
              Repère ou Identification de l'accessoire de sécurité
            </Cellule>
          </Ligne>
          <Ligne>
            <Cellule variant="blue">Récipients</Cellule>
          </Ligne>
          <Ligne>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
          </Ligne>
          <Ligne>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
          </Ligne>
          <Ligne>
            <Cellule variant="blue">Tuyauteries</Cellule>
          </Ligne>
          <Ligne>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
          </Ligne>
          <Ligne>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
          </Ligne>
        </Tableau>
      </Page>
      <Page renderTextLayer={false} style={tw(" p-16 text-sans")} size="A4">
        <Tableau themeColor={themeColor} className="mb-4">
          <Ligne>
            <Cellule variant="blue">Accessoires de sécurité :</Cellule>
          </Ligne>
          <Ligne>
            <Cellule variant="blue">Fabricant</Cellule>
            <Cellule variant="blue">Repère sur plan</Cellule>
            <Cellule variant="blue">Modèle</Cellule>
            <Cellule variant="blue">Tarage ou Réglage</Cellule>
            <Cellule variant="blue">Type</Cellule>
            <Cellule variant="blue">Nombre</Cellule>
          </Ligne>
          <Ligne>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
          </Ligne>
          <Ligne>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
            <Cellule>data</Cellule>
          </Ligne>
        </Tableau>
        <H2>3. Aménagements à la notice d'instructions du fabricant</H2>
        <TextDoc>
          Dans le cas où le présent PI déroge à certaines prescriptions de la
          notice d'instructions du fabricant liées à la pression.
        </TextDoc>
        <Tableau themeColor={themeColor} className="mb-2">
          <Ligne>
            <Cellule variant="blue">Équipement concerné</Cellule>
            <Cellule variant="blue">
              Prescription de la notice d'instructions objet d'un aménagement
            </Cellule>
            <Cellule variant="blue">
              Mesures compensatoires de surveillance (le cas échéant)
            </Cellule>
            <Cellule variant="blue">Critères d'acceptation</Cellule>
          </Ligne>
          <Ligne>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
          </Ligne>
        </Tableau>

        <H2 className="mt-2">4. Modes de dégradation :</H2>
        <TextDoc>
          Les modes de dégradation potentiels sont définis en Annexe II du CTP «
          Systèmes Frigorifiques ». Autres modes de dégradation : si identifiés
          par l'exploitant ou issus de l'analyse de la notice.
        </TextDoc>
        <Tableau themeColor={themeColor}>
          <Ligne>
            <Cellule variant="blue">Équipement concerné</Cellule>
            <Cellule variant="blue">Modes de dégradation</Cellule>
            <Cellule variant="blue">Origine</Cellule>
            <Cellule variant="blue">Conséquences</Cellule>
            <Cellule variant="blue">Effets</Cellule>
            <Cellule variant="blue">Localisation des zones sensibles</Cellule>
            <Cellule variant="blue">Mesures de surveillance</Cellule>
            <Cellule variant="blue">Critères d'acceptation</Cellule>
          </Ligne>
          <Ligne>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
          </Ligne>
        </Tableau>

        <H2 className="mt-2">
          5. Conditions opératoires critiques limites des équipements (COCL) et
          les seuils associés.
        </H2>
        <TextDoc>
          Les COCL éventuellement identifiées sont listées dans le tableau
          ci-dessous.
        </TextDoc>
        <Tableau themeColor={themeColor}>
          <Ligne>
            <Cellule variant="blue">
              Condition opératoire critique limite
            </Cellule>
            <Cellule variant="blue">
              Référence de la chaîne de mesure ou de la méthode de mesure
            </Cellule>
            <Cellule variant="blue">Localisation de la mesure</Cellule>
            <Cellule variant="blue">Seuil</Cellule>
            <Cellule variant="blue">Actions en cas de dépassement</Cellule>
          </Ligne>
          <Ligne>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
          </Ligne>
        </Tableau>
      </Page>
      <Page renderTextLayer={false} style={tw(" p-16 text-sans")} size="A4">
        <H2>6. Action de surveillance</H2>
        <TextDoc>
          Un schéma du système précise les zones prises en glace en condition
          normale d’exploitation. (Annexe 4)
        </TextDoc>
        <TextDoc>
          Les zones prises en glace ne requièrent aucun contrôle supplémentaire.
        </TextDoc>

        <H2>6.1 Vérification initiale</H2>
        <TextDoc>
          La préparation du système à cette Visite Initiale se fait selon le §
          A.1.4. du CTP « Systèmes Frigorifiques ».
        </TextDoc>
        <TextDoc>
          La VI est réalisée selon les dispositions du § A.1 du CTP « Systèmes
          Frigorifiques » auxquelles se rajoutent, le cas échéant, les mesures
          de surveillance complémentaires listées dans le tableau des points 3
          et 4 ci-dessus.
        </TextDoc>

        <H2>6.2 Inspection périodique</H2>
        <TextDoc>
          La préparation du système à cette Inspection se fait selon le § A.2.4.
          du CTP « Systèmes Frigorifiques ».
        </TextDoc>
        <TextDoc>
          L’IP est réalisée selon les dispositions du § A.2 du CTP « Systèmes
          Frigorifiques » auxquelles se rajoutent, le cas échéant, les mesures
          de surveillance complémentaires listées dans le tableau des points 3
          et 4 ci-dessus.
        </TextDoc>
        <Tableau themeColor={themeColor} className="mb-2">
          <Ligne>
            <Cellule variant="blue" className="">
              INSPECTION PERIODIQUE
            </Cellule>
          </Ligne>
        </Tableau>
        <Tableau themeColor={themeColor}>
          <Ligne>
            <Cellule variant="blue">ÉQUIPEMENTS</Cellule>
            <Cellule variant="blue">PÉRIODICITÉS RETENUES</Cellule>
          </Ligne>
          <Ligne>
            <Cellule>Récipients chapitre C</Cellule>
            <Cellule>
              <View style={tw("flex flex-row items-center")}>
                <View
                  style={tw(
                    "w-4 h-4 border border-black mr-2 flex items-center justify-center"
                  )}
                >
                  <Text>X</Text>
                </View>
                24 mois
              </View>
              <View style={tw("flex flex-row items-center mt-2")}>
                <View
                  style={tw(
                    "w-4 h-4 border border-black mr-2 flex items-center justify-center"
                  )}
                >
                  <Text>X</Text>
                </View>
                48 mois
              </View>
            </Cellule>
          </Ligne>
          <Ligne>
            <Cellule>Système frigorifique, le cas échéant</Cellule>
            <Cellule>
              <View style={tw("flex flex-row items-center")}>
                <View
                  style={tw(
                    "w-4 h-4 border border-black mr-2 flex items-center justify-center"
                  )}
                >
                  <Text>X</Text>
                </View>
                24 mois
              </View>
              <View style={tw("flex flex-row items-center mt-2")}>
                <View
                  style={tw(
                    "w-4 h-4 border border-black mr-2 flex items-center justify-center"
                  )}
                >
                  <Text>X</Text>
                </View>
                48 mois
              </View>
            </Cellule>
          </Ligne>
        </Tableau>

        <H2>6.3 Requalification périodique</H2>
        <TextDoc>
          La préparation du système à cette Requalification se fait selon le
          §A.3.6. du CTP « Systèmes frigorifiques ».
        </TextDoc>
        <TextDoc>
          La RP est réalisée selon les dispositions du § A.3 du CTP « Systèmes
          Frigorifiques » auxquelles se rajoutent, le cas échéant, les mesures
          de surveillance complémentaires listées dans le tableau des points 3
          et 4 ci-dessus.
        </TextDoc>
        <Tableau themeColor={themeColor} className="mb-2">
          <Ligne>
            <Cellule variant="blue" className="">
              REQUALIFICATION PERIODIQUE
            </Cellule>
          </Ligne>
        </Tableau>
        <Tableau themeColor={themeColor}>
          <Ligne>
            <Cellule variant="blue">ÉQUIPEMENTS</Cellule>
            <Cellule variant="blue">PÉRIODICITÉS RETENUES</Cellule>
          </Ligne>
          <Ligne>
            <Cellule>Récipients</Cellule>
            <Cellule>
              <View style={tw("flex flex-row items-center")}>
                <View
                  style={tw(
                    "w-4 h-4 border border-black mr-2 flex items-center justify-center"
                  )}
                >
                  <Text>X</Text>
                </View>
                6 ans
              </View>
              <View style={tw("flex flex-row items-center mt-2")}>
                <View
                  style={tw(
                    "w-4 h-4 border border-black mr-2 flex items-center justify-center"
                  )}
                >
                  <Text>X</Text>
                </View>
                12 ans
              </View>
            </Cellule>
          </Ligne>
          <Ligne>
            <Cellule>Système frigorifique, le cas échéant</Cellule>
            <Cellule>
              <View style={tw("flex flex-row items-center")}>
                <View
                  style={tw(
                    "w-4 h-4 border border-black mr-2 flex items-center justify-center"
                  )}
                >
                  <Text>X</Text>
                </View>
                6 ans
              </View>
              <View style={tw("flex flex-row items-center mt-2")}>
                <View
                  style={tw(
                    "w-4 h-4 border border-black mr-2 flex items-center justify-center"
                  )}
                >
                  <Text>X</Text>
                </View>
                12 ans
              </View>
            </Cellule>
          </Ligne>
        </Tableau>
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
          <Text style={tw("p-1 text-center text-xs  text-white")}>
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

const H2 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <Text style={tw(" text-sm mb-3 " + className)}>{children}</Text>;
};

const TextDoc = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <Text style={tw(" text-xs  mb-2 " + className)}>{children}</Text>;
};
