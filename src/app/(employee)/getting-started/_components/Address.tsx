 
"use client";
import { useEffect, useState } from "react";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import { FieldErrors, FieldError, UseFormRegister } from "react-hook-form";
import { locationData } from "./Address/locationData";
import DropdownInput from "@/components/Reusable/DopdownInput/DropdownInput";

type AddressErrors = {
  address?: {
    street?: FieldError;
    city?: FieldError;
    postalCode?: FieldError;
    state?: FieldError;
    country?: FieldError;
  };
};

type TCurrentlyLookingForFormProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors & AddressErrors;
};

const Address: React.FC<TCurrentlyLookingForFormProps> = ({
  register,
  errors,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);

  // Static country list
  const countryOptions = locationData.map((c) => c.countryName);

  // Update states when country changes
  useEffect(() => {
    const foundCountry = locationData.find(
      (c) => c.countryName === selectedCountry
    );
    if (foundCountry) {
      setStateOptions(foundCountry.states.map((s) => s.state));
    } else {
      setStateOptions([]);
    }
    setSelectedState("");
    setCityOptions([]);
  }, [selectedCountry]);

  // Update cities when state changes
  useEffect(() => {
    const foundCountry = locationData.find(
      (c) => c.countryName === selectedCountry
    );
    const foundState = foundCountry?.states.find(
      (s) => s.state === selectedState
    );
    if (foundState) {
      setCityOptions(foundState.cities);
    } else {
      setCityOptions([]);
    }
  }, [selectedState, selectedCountry]);

  return (
    <div className="flex flex-col gap-5 mt-12 font-plus-jakarta-sans">
      <h1 className="registration-form-heading mb-4">
        Where do you live currently?
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-5">
        <div className="w-full md:w-[50%]">
        <DropdownInput
          label="Country"
          options={countryOptions}
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedState("");
            setSelectedCity("");
          }}
          error={errors.address?.country?.message}
        />
        </div>
        <div className="md:w-[50%] w-full">
        <TextInput
          label="Post/ZIP Code"
          placeholder="ex: 35012"
          error={errors.address?.postalCode}
          {...register("address.postalCode", {
            required: "Post code is required",
          })}
          isRequired={false}
        />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-5">
        <div className="w-full md:w-[50%]">
        <DropdownInput
          label="State"
          options={stateOptions}
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
          }}
          error={errors.address?.state?.message}
        />
        </div>
        <div className="w-full md:w-[50%]">
        <DropdownInput
          label="City"
          options={cityOptions}
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          error={errors.address?.city?.message}
        />
        </div>
      </div>

      <TextInput
        label="Street Address"
        placeholder="ex: 123 Main St"
        error={errors.address?.street}
        {...register("address.street", {
          required: "Street address is required",
        })}
        isRequired={false}
      />
    </div>
  );
};

export default Address;
