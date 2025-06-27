"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TextInput from "@/components/Reusable/TextInput/TextInput";
import Button from "@/components/Button";
import { updateEmployeeProfile } from "@/api/employee";
import { useQueryClient } from "@tanstack/react-query";
import { locationData } from "../../getting-started/_components/Address/locationData";
import DropdownInput from "@/components/Reusable/DopdownInput/DropdownInput";

type Props = {
  defaultValues: {
    street: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
  };
  onClose: () => void;
};

const UpdateAddressForm = ({ defaultValues, onClose }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
  });

  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(defaultValues.country);
  const [selectedState, setSelectedState] = useState(defaultValues.state);
  const [selectedCity, setSelectedCity] = useState(defaultValues.city);

  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);

  const countryOptions = locationData.map((c) => c.countryName);

  useEffect(() => {
    const foundCountry = locationData.find(c => c.countryName === selectedCountry);
    if (foundCountry) {
      setStateOptions(foundCountry.states.map(s => s.state));
    } else {
      setStateOptions([]);
    }
    setSelectedState("");
    setCityOptions([]);
  }, [selectedCountry]);

  useEffect(() => {
    const foundCountry = locationData.find(c => c.countryName === selectedCountry);
    const foundState = foundCountry?.states.find(s => s.state === selectedState);
    if (foundState) {
      setCityOptions(foundState.cities);
    } else {
      setCityOptions([]);
    }
  }, [selectedState, selectedCountry]);

  const onSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const payload = {
        address: {
          ...formData,
          country: selectedCountry,
          state: selectedState,
          city: selectedCity,
        },
      };
      await updateEmployeeProfile(payload);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      onClose();
    } catch (err) {
      console.error("Failed to update address", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-4"
    >
      <TextInput
        label="Street"
        placeholder="Enter street"
        {...register("street")}
        error={errors?.street}
      />
      <TextInput
        label="Post/ZIP Code"
        placeholder="Enter postal code"
        {...register("postalCode")}
        error={errors?.postalCode}
      />

      <DropdownInput
        label="Country"
        options={countryOptions}
        value={selectedCountry}
        onChange={(e) => {
          setSelectedCountry(e.target.value);
          setSelectedState("");
          setSelectedCity("");
        }}
        error={errors?.country?.message}
      />

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
            error={errors?.state?.message}
          />
        </div>
        <div className="w-full md:w-[50%]">
          <DropdownInput
            label="City"
            options={cityOptions}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            error={errors?.city?.message}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="normal" className="px-5 py-3" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateAddressForm;
