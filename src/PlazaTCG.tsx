import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./components/ui/input";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import PlazaTableau from "./PlazaTableau";
import { PlazaDocument } from "./PlazaDocument";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "./components/ui/button";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

// Schéma de validation et types de données
export const devisSchema = z.object({
  objet: z.string().min(1, "Objet est requis"),
  nomAffaire: z.string().min(1, "Nom affaire est requis"),
  donneur: z.string().min(1, "Un donneur est requis"),
});

type DevisSchema = z.infer<typeof devisSchema>;
type PlazaTabValuesType = {
  designation: string;
  quantity: number;
  price: number;
  total: number;
};

type PlazaValuesType = {
  dateDeNaissance: string;
  total: number;
  moyenDePaiement: string;
  fraisDePorts: number;
  signature: string | null;
};

export type PlazaProps = {
  id: number;
  data: DevisSchema;
  tabValues: PlazaTabValuesType[];

  plazaValues: PlazaValuesType;
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

export const PlazaTCG: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [lignes, setLignes] = useState<string[]>([]);
  const [TabValues, setTabValues] = useState<PlazaTabValuesType[]>([]);
  const [plazaValues, setPlazaValues] = useState<PlazaValuesType>({
    dateDeNaissance: "jj/mm/aaaa",
    total: 0,
    moyenDePaiement: "",
    fraisDePorts: 0,
    signature: null,
  });

  const {
    register,
    formState: { errors },
    watch,
  } = useForm<DevisSchema>({
    resolver: zodResolver(devisSchema),
  });

  const sigCanvas = useRef<SignatureCanvas>(null);

  const handleTabValuesChange = (index: number, field: string, value) => {
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

    setPlazaValues((prev) => ({ ...prev, total }));
  }, [TabValues]);

  const handlePlazaValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PlazaValuesType
  ) => {
    const value = e.target.value;
    setPlazaValues((prev) => ({ ...prev, [field]: value }));
  };

  const saveSignature = () => {
    const signature = sigCanvas.current?.toDataURL("image/png");
    setPlazaValues((prev) => ({ ...prev, signature }));
  };

  const total = TabValues.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ).toFixed(2);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
    } else {
      alert("Veuillez sélectionner un fichier PDF.");
    }
  };

  const handleDownload = async () => {
    if (!uploadedFile) {
      alert("Veuillez uploader un fichier PDF à fusionner.");
      return;
    }

    // Créer le document `PlazaDocument` en PDF
    const plazaDoc = (
      <PlazaDocument
        id={0}
        date={new Date().toLocaleDateString("fr-FR")}
        data={{
          objet: watch("objet"),
          nomAffaire: watch("nomAffaire"),
          donneur: watch("donneur"),
        }}
        tabValues={TabValues}
        plazaValues={plazaValues}
      />
    );
    const asPdf = pdf();
    asPdf.updateContainer(plazaDoc);
    const plazaBlob = await asPdf.toBlob();

    // Fusion des PDFs
    const plazaPdfBytes = await plazaBlob.arrayBuffer();
    const uploadedPdfBytes = await uploadedFile.arrayBuffer();
    const plazaPdfDoc = await PDFDocument.load(plazaPdfBytes);
    const uploadedPdfDoc = await PDFDocument.load(uploadedPdfBytes);
    const mergedPdfDoc = await PDFDocument.create();

    // Ajout des pages du document `PlazaDocument`
    const plazaPages = await mergedPdfDoc.copyPages(
      plazaPdfDoc,
      plazaPdfDoc.getPageIndices()
    );
    plazaPages.forEach((page) => mergedPdfDoc.addPage(page));

    // Ajout des pages du fichier uploadé
    const uploadedPages = await mergedPdfDoc.copyPages(
      uploadedPdfDoc,
      uploadedPdfDoc.getPageIndices()
    );
    uploadedPages.forEach((page) => mergedPdfDoc.addPage(page));

    // Enregistrement et téléchargement du PDF fusionné
    const mergedPdfBytes = await mergedPdfDoc.save();
    const mergedPdfBlob = new Blob([mergedPdfBytes], {
      type: "application/pdf",
    });
    saveAs(mergedPdfBlob, `Document_Fusionne.pdf`);
  };

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
          <div className="flex justify-between gap-4 ">
            <div className="w-full my-3">
              <label htmlFor="donneur">Donneur</label>
              <Input id="donneur" {...register("donneur")} />
              {errors.donneur && (
                <p className="text-sm text-red-500">{errors.donneur.message}</p>
              )}
            </div>
            <div className="w-full my-3 ">
              <label htmlFor="dateDeNaissance">Date de Naissance</label>
              <Input
                id="dateDeNaissance"
                type="text"
                onChange={(e) => handlePlazaValueChange(e, "dateDeNaissance")}
              />
            </div>
          </div>

          <div className="flex justify-between gap-4 ">
            <div className="w-full my-3">
              <label htmlFor="moyenDePaiement">Moyen de Paiement</label>
              <Input
                id="moyenDePaiement"
                type="text"
                onChange={(e) => handlePlazaValueChange(e, "moyenDePaiement")}
              />
            </div>

            <div className="w-full my-3">
              <label htmlFor="fraisDePorts">Frais de Ports</label>
              <Input
                id="fraisDePorts"
                type="number"
                onChange={(e) => handlePlazaValueChange(e, "fraisDePorts")}
              />
            </div>
          </div>

          <div className="my-5 ">
            <label>Signature</label>
            <div className="border border-black rounded-lg w-fit">
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "sigCanvas",
                }}
              />
            </div>

            <Button className="m-2 " type="button" onClick={saveSignature}>
              Enregistrer la signature
            </Button>
            <Button
              className="m-2 "
              type="button"
              onClick={() => sigCanvas.current?.clear()}
            >
              Effacer la signature
            </Button>
          </div>

          <div className="my-5 ">
            <label>Télécharger sa pièce d'identité</label>
            <div className="rounded-lg w-fit">
              <input
                type="file"
                accept="application/pdf"
                className="w-full mt-4"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          <Button className="m-2" type="button" onClick={handleDownload}>
            Télécharger PDF Fusionné
          </Button>

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
                  plazaValues={plazaValues}
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

export default PlazaTCG;
