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
    <div className="w-full flex flex-col items-center">
      <form
        className="bg-white m-8 w-1/3 p-4 rounded-md border border-zinc-300"
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
                    className="focus:outline-lime-700 outline-offset-2 block w-full p-2 border rounded-md text-xl"
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
                className="focus:outline-lime-700 outline-offset-2 w-fit flex items-center text-center justify-center border border-lime-600 text-xl bg-white rounded-lg group hover:bg-lime-500 transition ease-in-out"
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
            className="focus:outline-lime-600 outline-offset-2 border-4 border-lime-600 hover:text-white hover:bg-lime-600 transition ease-in-out text-2xl text-lime-600 font-medium p-1 m-3 rounded-md"
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
  return <h1 className="my-3 font-bold text-2xl">{children}</h1>;
};

// Composant pour les sous-titres
const H1: React.FC<{ children: string }> = ({ children }) => {
  return <h1 className="my-2 font-semibold text-xl">{children}</h1>;
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
      className="pl-2 focus:outline-lime-700 outline-offset-2 border w-full overflow-hidden text-xl h-12 rounded-lg"
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
          className="border focus:outline-lime-700 outline-offset-2 rounded-l-lg pl-2 pr-8 h-12 text-xl bg-white"
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
        className="pl-2 border focus:outline-lime-700 outline-offset-2 w-full overflow-hidden text-xl h-12 rounded-r-lg"
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
      className="m-auto w-fit focus:outline-lime-700 outline-offset-2 text-xl my-3 font-medium text-lime-600"
    >
      {children}
    </button>
  );
};
