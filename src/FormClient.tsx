import React, { ReactNode, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaRegTrashAlt } from "react-icons/fa";

const contactSchema = z.object({
  civilite: z.string().nonempty("Civilité est requise"),
  firstName: z.string().nonempty("Prénom est requis"),
  lastName: z.string().nonempty("Nom est requis"),
  email: z.string().email("Adresse email invalide"),
  phoneNumber: z
    .string()
    .length(10, "Numéro de téléphone doit contenir 10 chiffres"),
});

const formSchema = z.object({
  companyName: z.string().nonempty("Nom de la société est requis"),
  siren: z.string().length(9, "Numéro de SIREN doit contenir 9 chiffres"),
  tva: z.string().length(11, "Numéro de TVA doit contenir 11 chiffres"),
  address: z.string().nonempty("Adresse est requise"),
  contacts: z.array(contactSchema).min(1, "Au moins un contact est requis"),
});

export const FormClient: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      siren: "",
      tva: "",
      address: "",
      contacts: [
        {
          civilite: "",
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  const onSubmit = (data) => {
    alert("Contact créé !");
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <form
        className="w-1/3 p-4 m-8 bg-white border rounded-md border-zinc-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Titre>Ajouter un client</Titre>
        <H1>Nom de la société</H1>
        <Controller
          name="companyName"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="Ex : Microsoft" />
          )}
        />
        {errors.companyName && (
          <span className="text-red-600">{errors.companyName.message}</span>
        )}

        <div className="flex items-center">
          <div className="w-1/2 mr-1">
            <H1>Numéro SIREN/SIRET</H1>
            <Controller
              name="siren"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="9 chiffres attendus" />
              )}
            />
            {errors.siren && (
              <span className="text-red-600">{errors.siren.message}</span>
            )}
          </div>
          <div className="w-1/2 ml-1">
            <H1>Numéro de TVA</H1>
            <Controller
              name="tva"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="11 chiffres attendus" />
              )}
            />
            {errors.tva && (
              <span className="text-red-600">{errors.tva.message}</span>
            )}
          </div>
        </div>
        <H1>Adresse</H1>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Ex : 7 rue St-Germain, Paris, France"
            />
          )}
        />
        {errors.address && (
          <span className="text-red-600">{errors.address.message}</span>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="divContact">
            <H1>Contact n°{index + 1}</H1>
            <div className="flex gap-2 mb-2">
              <Controller
                name={`contacts.${index}.civilite`}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="block w-full p-2 text-xl border rounded-md focus:outline-lime-700 outline-offset-2"
                  >
                    <option className="text-gray-400" value="" disabled>
                      Civilité
                    </option>
                    <option value="F">Mme</option>
                    <option value="M">M.</option>
                  </select>
                )}
              />
              <Controller
                name={`contacts.${index}.firstName`}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Prénom" />
                )}
              />
              <Controller
                name={`contacts.${index}.lastName`}
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nom" />}
              />
              <Button
                className="flex items-center justify-center text-xl text-center transition ease-in-out bg-white border rounded-lg focus:outline-lime-700 outline-offset-2 w-fit border-lime-600 group hover:bg-lime-500"
                onClick={() => remove(index)}
                type="button"
              >
                <FaRegTrashAlt className="min-w-12 group-hover:text-white text-lime-600" />
              </Button>
            </div>
            <Controller
              name={`contacts.${index}.email`}
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Adresse mail" />
              )}
            />
            {errors.contacts?.[index]?.email && (
              <span className="text-red-600">
                {errors.contacts[index].email.message}
              </span>
            )}
            <Controller
              name={`contacts.${index}.phoneNumber`}
              control={control}
              render={({ field }) => <PhoneNumberInput {...field} />}
            />
            {errors.contacts?.[index]?.phoneNumber && (
              <span className="text-red-600">
                {errors.contacts[index].phoneNumber.message}
              </span>
            )}
          </div>
        ))}

        <div className="flex flex-col">
          <TextClickable
            textOnClick={(e) => {
              e.preventDefault();
              append({
                civilite: "",
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
              });
            }}
          >
            + Ajouter un contact
          </TextClickable>

          <Button
            className="p-1 m-3 text-2xl font-medium transition ease-in-out border-4 rounded-md focus:outline-lime-600 outline-offset-2 border-lime-600 hover:text-white hover:bg-lime-600 text-lime-600"
            type="submit"
          >
            Créer le contact
          </Button>
        </div>
      </form>
    </div>
  );
};

// Composant pour le titre
const Titre: React.FC<{ children: string }> = ({ children }) => {
  return <h1 className="my-3 text-2xl font-bold">{children}</h1>;
};

// Composant pour les sous-titres
const H1: React.FC<{ children: string }> = ({ children }) => {
  return <h1 className="my-2 text-xl font-semibold">{children}</h1>;
};

// Composant pour les champs de saisie
const Input: React.FC<{
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  children?: string;
  placeholder?: string;
}> = ({ name, value, onChange, children, placeholder }) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || children}
      type="text"
      className="w-full h-12 pl-2 overflow-hidden text-xl border rounded-lg focus:outline-lime-700 outline-offset-2"
    />
  );
};

// Composant pour les boutons
const Button: React.FC<{
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}> = ({ children, onClick, className, type = "button" }) => {
  return (
    <button type={type} onClick={onClick} className={` ${className}`}>
      {children}
    </button>
  );
};

// Liste des pays et leurs indicatifs téléphoniques
const countryCodes = [
  { code: "FR", name: "France", dialCode: "+33" },
  { code: "US", name: "United States", dialCode: "+1" },
  // Ajoutez ici tous les autres pays et leurs indicatifs téléphoniques
  // ...
];

// Composant pour le champ de saisie de numéro de téléphone
const PhoneNumberInput: React.FC<{
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ name, value, onChange }) => {
  const [phoneNumber, setPhoneNumber] = useState(value || "");
  const [countryCode, setCountryCode] = useState("FR");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
      onChange && onChange(event);
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(event.target.value);
  };

  return (
    <div className="flex items-center w-full my-2">
      <div className="flex items-center">
        <select
          className="h-12 pl-2 pr-8 text-xl bg-white border rounded-l-lg focus:outline-lime-700 outline-offset-2"
          value={countryCode}
          onChange={handleCountryChange}
        >
          {countryCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {country.code} {country.dialCode}
            </option>
          ))}
        </select>
      </div>
      <input
        name={name}
        type="text"
        placeholder="Numéro de téléphone"
        className="w-full h-12 pl-2 overflow-hidden text-xl border rounded-r-lg focus:outline-lime-700 outline-offset-2"
        value={phoneNumber}
        onChange={handleChange}
      />
    </div>
  );
};

// Composant pour les boutons de texte cliquable
const TextClickable: React.FC<{
  children: ReactNode;
  textOnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ children, textOnClick }) => {
  return (
    <button
      onClick={textOnClick}
      className="m-auto my-3 text-xl font-medium w-fit focus:outline-lime-700 outline-offset-2 text-lime-600"
    >
      {children}
    </button>
  );
};
