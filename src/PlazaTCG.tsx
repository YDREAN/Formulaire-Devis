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
import emailjs from "@emailjs/browser";

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
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
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
    setUploadedFile(null); // Réinitialise le fichier PDF
    setUploadedImages([]); // Réinitialise les images
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
    }
  };

  const handleImageUpload = (event) => {
    setUploadedImages([]); // Réinitialise les images
    const files = Array.from(event.target.files);
    const imageFiles = files.filter((file) =>
      ["image/jpeg", "image/png"].includes(file.type)
    );
    setUploadedImages((prev) => [...prev, ...imageFiles]);
  };

  // Initialisation de EmailJS
  emailjs.init("wrVac-7ERDY9cq5AS"); // Remplacez par votre USER_ID

  // Fonction de conversion Blob -> base64
  const convertBlobToBase64 = (blob: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Fonction d'envoi d'email avec pièce jointe
  const sendEmailWithAttachment = async (pdfBlob: Blob) => {
    try {
      const pdfBase64 = await convertBlobToBase64(pdfBlob);
      const templateParams = {
        to_name: "yanndrean1@gmail.com",
        from_name: "zorrozorreo@gmail.com",
        message: "Veuillez trouver ci-joint le document PDF fusionné.",
      };
      await emailjs.send("service_51tn8r4", "template_vquugtq", templateParams);
      alert("Email envoyé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
    }
  };

  const handleDownload = async () => {
    if (!uploadedFile && uploadedImages.length === 0) {
      alert("Veuillez uploader un fichier PDF ou des images.");
      return;
    }

    // Créer le document `PlazaDocument` en PDF
    const plazaDoc = (
      <PlazaDocument
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

    const plazaPdfBytes = await plazaBlob.arrayBuffer();
    const plazaPdfDoc = await PDFDocument.load(plazaPdfBytes);
    const mergedPdfDoc = await PDFDocument.create();

    // Ajout des pages du document `PlazaDocument`
    const plazaPages = await mergedPdfDoc.copyPages(
      plazaPdfDoc,
      plazaPdfDoc.getPageIndices()
    );
    plazaPages.forEach((page) => mergedPdfDoc.addPage(page));

    // Ajout des pages du fichier PDF uploadé
    if (uploadedFile) {
      const uploadedPdfBytes = await uploadedFile.arrayBuffer();
      const uploadedPdfDoc = await PDFDocument.load(uploadedPdfBytes);
      const uploadedPages = await mergedPdfDoc.copyPages(
        uploadedPdfDoc,
        uploadedPdfDoc.getPageIndices()
      );
      uploadedPages.forEach((page) => mergedPdfDoc.addPage(page));
    }

    // Conversion de toutes les images en un seul PDF, ajustant la largeur au format PDF
    if (uploadedImages.length > 0) {
      const imagePdfDoc = await PDFDocument.create();
      const pdfPageWidth = 595; // Largeur d'une page A4 en points

      for (const imageFile of uploadedImages) {
        const imgBytes = await imageFile.arrayBuffer();
        const img =
          imageFile.type === "image/png"
            ? await imagePdfDoc.embedPng(imgBytes)
            : await imagePdfDoc.embedJpg(imgBytes);

        const scaleRatio = pdfPageWidth / img.width;
        const page = imagePdfDoc.addPage([
          pdfPageWidth,
          img.height * scaleRatio,
        ]);
        page.drawImage(img, {
          x: 0,
          y: 0,
          width: pdfPageWidth,
          height: img.height * scaleRatio,
        });
      }

      const imagePdfBytes = await imagePdfDoc.save();
      const imagePdfDocToMerge = await PDFDocument.load(imagePdfBytes);

      const imagePages = await mergedPdfDoc.copyPages(
        imagePdfDocToMerge,
        imagePdfDocToMerge.getPageIndices()
      );
      imagePages.forEach((page) => mergedPdfDoc.addPage(page));
    }

    // Enregistrement et téléchargement du PDF fusionné
    const mergedPdfBytes = await mergedPdfDoc.save();
    const mergedPdfBlob = new Blob([mergedPdfBytes], {
      type: "application/pdf",
    });

    saveAs(mergedPdfBlob, `Document_Fusionne.pdf`);
    sendEmailWithAttachment(mergedPdfBlob); // Envoi de l'email avec pièce jointe
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
            <label>Télécharger une pièce d'identité (PDF ou image)</label>
            <div className="rounded-lg w-fit">
              <input
                type="file"
                className="w-full mt-4"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(event) => {
                  handleFileUpload(event);
                  handleImageUpload(event);
                }}
                multiple // Permet de sélectionner plusieurs images
              />
            </div>
          </div>

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
          <div className="flex justify-between flex-shrink">
            <Button
              className="flex-shrink m-2 "
              type="button"
              onClick={saveSignature}
            >
              Enregistrer la signature
            </Button>
            <Button
              className="flex-shrink m-2 "
              type="button"
              onClick={() => sigCanvas.current?.clear()}
            >
              Effacer la signature
            </Button>
          </div>
        </div>
        <Button className="w-4/5 " type="button" onClick={handleDownload}>
          Télécharger PDF Fusionné
        </Button>
        <div className="flex justify-center w-full h-screen mt-5 overflow-hidden pdfView ">
          {TabValues.length > 0 ? (
            <>
              <PDFViewer className="w-full h-full rounded-r-xl ">
                <PlazaDocument
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
