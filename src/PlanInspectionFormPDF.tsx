import { TableData } from "./PlanInspection";
import { Cellule, H2, LignePDF, TextDoc } from "./PlanInspectionPDF";
import { TableauPDF } from "./PlanInspectionPDF";

export const PlanInspectionFormPDF = ({
  themeColor,
  data,
}: {
  themeColor?: string;
  data: TableData;
}) => {
  return (
    <>
      <H2>3. Aménagements à la notice d'instructions du fabricant</H2>
      <TextDoc>
        Dans le cas où le présent PI déroge à certaines prescriptions de la
        notice d'instructions du fabricant liées à la pression.
      </TextDoc>
      <TableauPDF themeColor={themeColor} className="mb-2">
        <LignePDF>
          <Cellule variant="blue">Équipement concerné</Cellule>

          <Cellule variant="blue">
            Prescription de la notice d'instructions objet d'un aménagement
          </Cellule>
          <Cellule variant="blue">
            Mesures compensatoires de surveillance (le cas échéant)
          </Cellule>
          <Cellule variant="blue">Critères d'acceptation</Cellule>
        </LignePDF>
        <LignePDF>
          <LignePDF>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
          </LignePDF>
          <LignePDF>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
          </LignePDF>
          <LignePDF>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
          </LignePDF>
          <LignePDF>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
          </LignePDF>
        </LignePDF>
      </TableauPDF>

      <H2 className="mt-2">4. Modes de dégradation :</H2>
      <TextDoc>
        Les modes de dégradation potentiels sont définis en Annexe II du CTP «
        Systèmes Frigorifiques ». Autres modes de dégradation : si identifiés
        par l'exploitant ou issus de l'analyse de la notice.
      </TextDoc>
      <TableauPDF themeColor={themeColor}>
        <LignePDF>
          <Cellule variant="blue">Équipement concerné</Cellule>
          <Cellule variant="blue">Modes de dégradation</Cellule>
          <Cellule variant="blue">Origine</Cellule>
          <Cellule variant="blue">Conséquences</Cellule>
          <Cellule variant="blue">Effets</Cellule>
          <Cellule variant="blue">Localisation des zones sensibles</Cellule>
          <Cellule variant="blue">Mesures de surveillance</Cellule>
          <Cellule variant="blue">Critères d'acceptation</Cellule>
        </LignePDF>
        <LignePDF>
          <Cellule>X</Cellule>
          <Cellule>X</Cellule>
          <Cellule>X</Cellule>
          <Cellule>X</Cellule>
          <Cellule>X</Cellule>
          <LignePDF>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
          </LignePDF>

          <Cellule>X</Cellule>
          <Cellule>X</Cellule>
        </LignePDF>
      </TableauPDF>

      <H2 className="mt-2">
        5. Conditions opératoires critiques limites des équipements (COCL) et
        les seuils associés.
      </H2>
      <TextDoc>
        Les COCL éventuellement identifiées sont listées dans le TableauPDF
        ci-dessous.
      </TextDoc>
      <TableauPDF themeColor={themeColor}>
        <LignePDF>
          <Cellule variant="blue">Condition opératoire critique limite</Cellule>
          <Cellule variant="blue">
            Référence de la chaîne de mesure ou de la méthode de mesure
          </Cellule>
          <Cellule variant="blue">Localisation de la mesure</Cellule>
          <Cellule variant="blue">Seuil</Cellule>
          <Cellule variant="blue">Actions en cas de dépassement</Cellule>
        </LignePDF>
        <LignePDF>
          <Cellule>X</Cellule>
          <Cellule>X</Cellule>
          <LignePDF>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
          </LignePDF>
          <LignePDF>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
          </LignePDF>
          <LignePDF>
            <Cellule>X</Cellule>
            <Cellule>X</Cellule>
          </LignePDF>
        </LignePDF>
      </TableauPDF>
    </>
  );
};
