 
"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Button from "@/components/Button";
import Input from "@/components/Input";
import GetStartedLayout from "../../(employee)/getting-started/_components/getStartedLayout";
import Successfully from "@/app/(employee)/getting-started/_components/Successfully";
import api from "@/api";
import { toast } from "sonner";

const Page = () => {
  interface FormData {
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    }[];
    companyDetails: {
      companyName: string;
      industryType: string;
      bio: string;
      websiteLink: string;
      companyLocation: string;
      contactEmail: string;
      contactPhone: string;
      soicalLink: {
        linkedin: string;
        github: string;
      };
    }[];
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});
  console.log(formData);

  // Mutation for API call
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      await axios.put(api.updateEmployerCompanyDetails, data, {
        withCredentials: true,
      });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Your information has been successfully updated!");
      setStep(4);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  // Store data for each step without API call
  const handleContinue = (data: any) => {
    setFormData((prevData: any) => {
      const updatedData = { ...prevData };

      if (step === 1 && data.address) {
        // Step 1: Update Address
        updatedData.address = data.address;
      } else if (data.companyDetails) {
        // Step 2 & 3: Merge Company Details into Single Object
        const companyDetails = prevData.companyDetails || [];

        if (companyDetails.length > 0) {
          updatedData.companyDetails = [
            { ...companyDetails[0], ...data.companyDetails[0] },
          ];
        } else {
          updatedData.companyDetails = data.companyDetails;
        }
      }

      return updatedData;
    });

    if (step === 3) {
      setLoading(true);
    } else {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    if (step === 3 && loading) {
      const finalPayload = {
        address: formData.address || [],
        companyDetails: formData.companyDetails || [],
      };

      mutation.mutate(finalPayload);
      setLoading(false);
    }
  }, [formData, step, loading]);

  const handleSkip = () => {
    setFormData((prevData: FormData) => {
      const updatedData = { ...prevData };

      if (step === 1) {
        // Address is an array of one empty object
        updatedData.address = [
          {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
          },
        ];
      } else if (step === 2 || step === 3) {
        // CompanyDetails is also an array of one empty object
        updatedData.companyDetails = [
          {
            companyName: "",
            industryType: "",
            bio: "",
            websiteLink: "",
            companyLocation: "",
            contactEmail: "",
            contactPhone: "",
            soicalLink: {
              linkedin: "",
              github: "",
            },
          },
        ];
      }

      return updatedData;
    });

    if (step === 3) {
      setLoading(true); // triggers mutation in useEffect
    } else {
      setStep(step + 1);
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const organizationType = [
    "Allopathy Hospital",
    "Allopathy Clinic",
    "Ayurveda Hospital",
    "Ayurveda Clinic",
    "Homeopathy Hospital",
    "Homeopathy Clinic",
    "Nursing Home",
    "Diagnostic Centers",
    "Imaging Centers",
  ];

  return (
    <GetStartedLayout progress={step * 25} goToPreviousStep={goToPreviousStep}>
      <div className="flex justify-center w-full">
        <div className="flex justify-center gap-4">
          <form onSubmit={handleSubmit(handleContinue)}>
            {step === 1 && (
              <>
                <div className="flex pt-6 font-plus-jakarta-sans text-3xl max-lg:text-2xl max-md:text-xl pr-4 font-bold">
                  <span>Enter Your Address</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-10 items-center gap-5">
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="companyDetails.industryType">Country</label>
                    <div className="px-2 border text-neutral-400 rounded-lg w-full">
                      <Controller
                        name="address.0.country"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Country is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="py-4 px-2 border-none text-sm w-full border-neutral-300 max-md:text-xs focus:outline-none"
                          >
                            <option value="" selected disabled>
                              Select Country
                            </option>
                            <option value="hospitals_healthcare">India</option>
                            <option value="clinics_outpatient">Germany</option>
                            <option value="nursing_assisted_living">
                              Canada
                            </option>
                          </select>
                        )}
                      />
                    </div>
                    {errors.address?.[0]?.country && (
                      <span className="text-red-500">
                        {errors.address?.[0]?.country.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="address.postalCode">Postal Code</label>
                    <Controller
                      name="address.0.postalCode"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Postal Code is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Postal Code"
                          className="max-md:placeholder:text-xs"
                          type="number"
                        />
                      )}
                    />
                    {errors.address?.[0]?.postalCode && (
                      <span className="text-red-500">
                        {errors.address[0].postalCode.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="address.state">State</label>
                    <Controller
                      name="address.0.state"
                      control={control}
                      defaultValue=""
                      rules={{ required: "State is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="State"
                          className="max-md:placeholder:text-xs"
                        />
                      )}
                    />
                    {errors.address?.[0]?.state && (
                      <span className="text-red-500">
                        {errors.address[0].state.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="address.city">City</label>
                    <Controller
                      name="address.0.city"
                      control={control}
                      defaultValue=""
                      rules={{ required: "City is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="City"
                          className="max-md:placeholder:text-xs"
                        />
                      )}
                    />
                    {errors.address?.[0]?.city && (
                      <span className="text-red-500">
                        {errors.address[0].city.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-5">
                  <label htmlFor="address.street">Street</label>
                  <Controller
                    name="address.0.street"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Street is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Street"
                        className="max-md:placeholder:text-xs"
                      />
                    )}
                  />
                  {errors.address?.[0]?.street && (
                    <span className="text-red-500">
                      {errors.address[0].street.message}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-8">
                  <Button type="submit">Continue</Button>
                  <Button
                    onClick={handleSkip}
                    variant="secondary"
                    type="button"
                    className="max-md:w-[230px] max-lg:w-[400px] ml-4"
                  >
                    Skip
                  </Button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="flex py-6 font-plus-jakarta-sans text-3xl max-md:text-xl pr-4 font-bold">
                  <span>Company Information</span>
                </div>
                <div className="flex gap-10 max-md:flex-col max-md:gap-4 mt-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="companyDetails.companyName">
                      Company Name
                    </label>
                    <Controller
                      name="companyDetails.0.companyName"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Company Name is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="eg., Google"
                          className="max-md:placeholder:text-xs"
                        />
                      )}
                    />
                    {errors.companyDetails?.[0]?.companyName && (
                      <span className="text-red-500">
                        {errors.companyDetails[0].companyName.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="companyDetails.industryType">
                      Industry Type
                    </label>
                    <div className="px-2 border text-neutral-400 rounded-lg w-[200px] max-md:w-full">
                      <Controller
                        name="companyDetails.0.industryType"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Industry Type is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="py-4 px-2 border-none text-sm w-full border-neutral-300 max-md:text-xs focus:outline-none"
                          >
                            <option value="" selected disabled>
                              Organization Type
                            </option>
                            {organizationType?.map((department) => (
                              <option key={department} value={department}>
                                {department}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                    </div>
                    {errors.companyDetails?.[0]?.industryType && (
                      <span className="text-red-500">
                        {errors.companyDetails[0].industryType.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mt-4 gap-2">
                  <label htmlFor="companyDetails.bio">Company Bio</label>
                  <Controller
                    name="companyDetails.0.bio"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Company Bio is required" }}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        placeholder="Bio Here"
                        className="border border-neutral-300 p-4 h-[80px] rounded-xl"
                      />
                    )}
                  />
                  {errors.companyDetails?.[0]?.bio && (
                    <span className="text-red-500">
                      {errors.companyDetails[0].bio.message}
                    </span>
                  )}
                </div>
                <div className="flex gap-10 max-md:flex-col max-md:gap-4 mt-4">
                  <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="companyDetails.websiteLink">
                      Website Link
                    </label>
                    <Controller
                      name="companyDetails.0.websiteLink"
                      control={control}
                      defaultValue=""
                      // rules={{ required: 'Website Link is required' }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="eg., google.com"
                          className="max-md:placeholder:text-xs"
                        />
                      )}
                    />
                    {/* {errors.companyDetails?.[0]?.websiteLink && <span className="text-red-500">{errors.companyDetails[0].websiteLink.message}</span>} */}
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="companyDetails.companyLocation">
                      Location
                    </label>
                    <Controller
                      name="companyDetails.0.companyLocation"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Location is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Location"
                          className="max-md:placeholder:text-xs"
                        />
                      )}
                    />
                    {errors.companyDetails?.[0]?.companyLocation && (
                      <span className="text-red-500">
                        {errors.companyDetails[0].companyLocation.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-8">
                  <Button type="submit">Continue</Button>
                  <Button
                    onClick={handleSkip}
                    variant="secondary"
                    type="button"
                    className="max-md:w-[230px] max-lg:w-[400px] ml-4"
                  >
                    Skip
                  </Button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="flex py-6 font-plus-jakarta-sans text-3xl max-md:text-lg max-md:pr-0 pr-4 font-bold">
                  <span>Company Contact Information</span>
                </div>
                <div className="flex gap-10 max-md:flex-col max-md:gap-5 mt-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="companyDetails.contactEmail">
                      Contact Email
                    </label>
                    <Controller
                      name="companyDetails.0.contactEmail"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Contact Email is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Email"
                          className="max-md:placeholder:text-xs"
                          type="email"
                        />
                      )}
                    />
                    {errors.companyDetails?.[0]?.contactEmail && (
                      <span className="text-red-500">
                        {errors.companyDetails[0].contactEmail.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="companyDetails.contactPhone">
                      Contact Phone
                    </label>
                    <Controller
                      name="companyDetails.0.contactPhone"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Contact Phone is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Phone"
                          className="max-md:placeholder:text-xs"
                          type="number"
                        />
                      )}
                    />
                    {errors.companyDetails?.[0]?.contactPhone && (
                      <span className="text-red-500">
                        {errors.companyDetails[0].contactPhone.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mt-4 gap-2">
                  <label htmlFor="companyDetails.soicalLink.linkedin">
                    LinkedIn
                  </label>
                  <Controller
                    name="companyDetails.0.soicalLink.linkedin"
                    control={control}
                    defaultValue=""
                    // rules={{ required: 'LinkedIn is required' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="LinkedIn Link"
                        className="border border-neutral-300 rounded-xl"
                      />
                    )}
                  />
                  {/* {errors.companyDetails?.[0]?.soicalLink?.linkedin && <span className="text-red-500">{errors.companyDetails[0].soicalLink.linkedin.message}</span>} */}
                </div>
                <div className="flex flex-col mt-4 gap-2">
                  <label htmlFor="companyDetails.soicalLink.github">
                    GitHub
                  </label>
                  <Controller
                    name="companyDetails.0.soicalLink.github"
                    control={control}
                    defaultValue=""
                    // rules={{ required: 'GitHub is required' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="GitHub Link"
                        className="border border-neutral-300 rounded-xl"
                      />
                    )}
                  />
                  {/* {errors.companyDetails?.[0]?.soicalLink?.github && <span className="text-red-500">{errors.companyDetails[0].soicalLink.github.message}</span>} */}
                </div>
                <div className="flex items-center justify-between mt-8">
                  <Button type="submit">Continue</Button>
                  <Button
                    onClick={handleSkip}
                    variant="secondary"
                    type="button"
                    className="max-md:w-[230px] max-lg:w-[400px] ml-4"
                  >
                    Skip
                  </Button>
                </div>
              </>
            )}
            {step === 4 && <Successfully />}
          </form>
        </div>
      </div>
    </GetStartedLayout>
  );
};

export default Page;
