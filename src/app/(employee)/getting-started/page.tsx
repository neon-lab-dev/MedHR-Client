"use client";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import PersonalInfoForm from "./_components/PersonalInfoForm";
import LanguagePreference from "./_components/LanguagePreference";
import AreaOfInterests from "./_components/AreaOfInterests";
import CurrentlyLookingFor from "./_components/CurrentlyLookingFor";
import Address from "./_components/Address";
import Education from "./_components/Education/Education";
import ProjectDetails from "./_components/ProjectDetails/ProjectDetails";
import WorkExperience from "./_components/WorkExperience/WorkExperience";
import Certifications from "./_components/Certifications/Certifications";
import Skills from "./_components/Skills";
import ResumeUpload from "./_components/ResumeUpload/ResumeUpload";
import SuccessTab from "./_components/SuccessTab";
import SocialLink from "./_components/SocialLink";
import { toast } from "sonner";
import { useUpdateUserDetails } from "@/api/updateUserDetails";
import { Oval } from "react-loader-spinner";
import ProgressBar from "./_components/ProgressBar";
import { useMutation } from "@tanstack/react-query";
import { uploadResume } from "@/api/employee";

export type TEducationDetails = {
  institutionName: string;
  city: string;
  courseName: string;
  grade: string;
  startDate: string;
  endDate: string;
  designationType: string;
};

export type TProjectDetails = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  link: string;
};

export type TCertificateDetails = {
  name: string;
  issuingOrganization: string;
  issueDate: string;
  credentialID: string;
  credentialURL: string;
};

export type TWorkExperience = {
  designation: string;
  companyName: string;
  workType: string;
  startDate: string;
  endDate: string;
  description: string;
  companyLocation: string;
  projectLinks: string[];
};

export type TSocialLinks = {
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  github?: string;
  youtube?: string;
  dribbble?: string;
  behance?: string;
  medium?: string;
  stackoverflow?: string;
  reddit?: string;
  tiktok?: string;
  snapchat?: string;
  pinterest?: string;
  telegram?: string;
  discord?: string;
};

type TFormValues = {
  full_name: string;
  dob: string;
  designation: string;
  guardian: {
    guardianName: string;
    phoneNumber: string;
    occupation: string;
  };
  address: {
    street: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  };
  education: TEducationDetails[];
  projects: TProjectDetails[];
  experience: TWorkExperience[];
  certifications: TCertificateDetails[];
  socialLinks: TSocialLinks;
  skills: string[];
  languages: string[];
  areasOfInterests: string[];
  currentlyLookingFor: string[];
  interestedDepartments: string;
  interestedCountries: string;
  resume: File | null;
};

const TOTAL_STEPS = 13;

const GettingStarted = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: {
      address: {
        street: "",
        city: "",
        postalCode: "",
        state: "",
        country: "",
      },
      full_name: "",
      dob: "",
      guardian: {
        guardianName: "",
        phoneNumber: "",
        occupation: "",
      },
    },
  });

  const { mutate: uploadResumeMutation } = useMutation({
    mutationFn: uploadResume,
    onSuccess: () => {
      toast.success('Resume uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(`Error uploading file: ${error.response?.data?.message || error.message}`);
    },
  });

  const { mutateAsync: updateUserDetails } = useUpdateUserDetails();

  // Step counter
  const [step, setStep] = useState<number>(1);
  const [skippedSteps, setSkippedSteps] = useState<number[]>([]);
  // For Skip button
  const [isLoading, setIsLoading] = useState(false);
  // For Continue/Submit button
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<string[]>([]);
  const [selectedCurrentlyLookingFor, setSelectedCurrentlyLookingFor] = useState<string[]>([]);
  const [interestedDepartments, setInterestedDepartments] = useState<string[]>([]);
  const [interestedCountries, setInterestedCountries] = useState<string[]>([]);
  const [selectedEducation, setSelectedEducation] = useState<TEducationDetails[]>([]);
  const [selectedProject, setSelectedProject] = useState<TProjectDetails[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<TWorkExperience[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<TCertificateDetails[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedSocialLinks, setSelectedSocialLinks] = useState<TSocialLinks[]>([]);
  const [selectedResume, setSelectedResume] = useState<File | null>(null);

  useEffect(() => {
    console.log("Updated resume:", selectedResume);
  }, [selectedResume]);


  const handleCompleteRegistration = async (data: TFormValues) => {
    const validateStep = () => {
      switch (step) {
        case 2:
          if (!skippedSteps.includes(2) && selectedLanguages.length < 1) {
            toast.error("Please add your preferred language");
            return false;
          }
          break;
        case 3:
          if (!skippedSteps.includes(3) && selectedInterest.length < 1) {
            toast.error("Please add your interest");
            return false;
          }
          break;
        case 4:
          if (
            !skippedSteps.includes(4) &&
            selectedCurrentlyLookingFor.length < 1
          ) {
            toast.error("Please add your current goals");
            return false;
          }
          break;
        case 6:
          if (!skippedSteps.includes(6) && selectedEducation.length < 1) {
            toast.error("Please add your educational details");
            return false;
          }
          break;
        case 7:
          if (!skippedSteps.includes(7) && selectedProject.length < 1) {
            toast.error("Please add your project details");
            return false;
          }
          break;
        case 8:
          if (!skippedSteps.includes(8) && selectedExperience.length < 1) {
            toast.error("Please add your working experience if you have any");
            return false;
          }
          break;
        case 9:
          if (!skippedSteps.includes(9) && selectedCertificate.length < 1) {
            toast.error("Please add your certificates");
            return false;
          }
          break;
        case 10:
          if (!skippedSteps.includes(10) && selectedSkills.length < 1) {
            toast.error("Please add your skills");
            return false;
          }
          break;
        case 11:
          if (!skippedSteps.includes(11) && selectedSocialLinks.length < 1) {
            toast.error("Please add your social links");
            return false;
          }
          break;
        case 12:
          if (!skippedSteps.includes(12) && !selectedResume) {
            toast.error("Please upload your resume");
            return false;
          }
          break;
      }
      return true;
    };

    if (step === 13) {
      if (!validateStep()) return;
      setStep((prev) => prev + 1);
    } else {
      const formData = {
        full_name: data.full_name,
        dob: data.dob,
        designation: data.designation,
        guardian: {
          guardianName: data.guardian.guardianName,
          phoneNumber: data.guardian.phoneNumber,
          occupation: data.guardian.occupation,
        },
        address: {
          street: data.address.street,
          city: data.address.city,
          postalCode: data.address.postalCode,
          state: data.address.state,
          country: data.address.country,
        },
        education: selectedEducation,
        projects: selectedProject,
        experience: selectedExperience,
        certifications: selectedCertificate,
        socialLinks: selectedSocialLinks,
        skills: selectedSkills,
        languages: selectedLanguages,
        areasOfInterests: selectedInterest,
        currentlyLookingFor: selectedCurrentlyLookingFor,
        interestedDepartments: interestedDepartments,
        interestedCountries: interestedCountries,
        resume: selectedResume,
      };

      try {
        setIsSubmitting(true);
        if (step === 12 && selectedResume) {
          await uploadResumeMutation(selectedResume);
        }
        await updateUserDetails(formData);
       if(step !== 12){
        toast.success("Details Updated! Go to next step.");
       } else {
        toast.success("Registration successful!");
       }
        setStep(step + 1);
      } catch (error: any) {
        console.error("Error updating user details:", error);
        toast.error(
          `Error updating user details: ${
            error.response?.data?.message || error.message
          }`
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSkip = async (tab: number) => {
    setSkippedSteps((prev) => [...prev, tab]);

    if (tab === 1) {
      setValue("full_name", "");
      setValue("dob", "");
      setValue("guardian", {
        guardianName: "",
        phoneNumber: "",
        occupation: "",
      });
    } else if (tab === 2) {
      setSelectedLanguages([]);
    } else if (tab === 3) {
      setSelectedInterest([]);
    } else if (tab === 4) {
      setSelectedCurrentlyLookingFor([]);
    } else if (tab === 5) {
      setValue("address", {
        street: "",
        city: "",
        postalCode: "",
        state: "",
        country: "",
      });
    } else if (tab === 6) {
      setSelectedEducation([]);
    } else if (tab === 7) {
      setSelectedProject([]);
    } else if (tab === 8) {
      setSelectedExperience([]);
    } else if (tab === 9) {
      setSelectedCertificate([]);
    } else if (tab === 10) {
      setSelectedSkills([]);
    } else if (tab === 11) {
      setSelectedSocialLinks([]);
    } else if (tab === 12) {
      setSelectedResume(null);
    }

    // If last step is skipped, submit the form
    if (tab === 12) {
      const formData = {
        full_name: getValues("full_name"),
        dob: getValues("dob"),
        designation: getValues("designation"),
        guardian: getValues("guardian"),
        address: getValues("address"),
        education: selectedEducation,
        projects: selectedProject,
        experience: selectedExperience,
        certifications: selectedCertificate,
        socialLinks: selectedSocialLinks,
        skills: selectedSkills,
        languages: selectedLanguages,
        areasOfInterests: selectedInterest,
        currentlyLookingFor: selectedCurrentlyLookingFor,
        resume: null,
      };

      try {
        setIsLoading(true);
        await updateUserDetails(formData);
       if(step !== 12){
        toast.success("Details Updated! Go to next step.");
       } else {
        toast.success("Registration successful!");
       }
        setStep(step + 1);
      } catch (error: any) {
        console.error("Error updating user details:", error);
        toast.error(
          `Error updating user details: ${
            error.response?.data?.message || error.message
          }`
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="pt-12 bg-neutral-450 min-h-screen h-full font-plus-jakarta-sans">
      <div className="bg-white border border-neutral-100 rounded-3xl p-9 max-w-7xl mx-auto px-6 2xl:px-0 min-h-screen h-full">
        <div className="max-w-[900px] w-full mx-auto">
          <ProgressBar step={step} setStep={setStep} progress={progress} />
          <form
            onSubmit={handleSubmit(handleCompleteRegistration)}
            className="max-w-[560px] mx-auto"
          >
            {step === 1 && <PersonalInfoForm register={register} errors={errors} />}
            {step === 2 && <LanguagePreference onChange={setSelectedLanguages} />}
            {step === 3 && <AreaOfInterests onChange={setSelectedInterest} />}
            {step === 4 && <CurrentlyLookingFor onChange={setSelectedCurrentlyLookingFor} interestedDepartments={interestedDepartments} setInterestedDepartments={setInterestedDepartments} setInterestedCountries={setInterestedCountries} interestedCountries={interestedCountries} />}
            {step === 5 && <Address register={register} errors={errors} />}
            {step === 6 && <Education onChange={setSelectedEducation} />}
            {step === 7 && <ProjectDetails onChange={setSelectedProject} />}
            {step === 8 && <WorkExperience onChange={setSelectedExperience} />}
            {step === 9 && <Certifications onChange={setSelectedCertificate} />}
            {step === 10 && <Skills selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills}/>}
            {step === 11 && <SocialLink setSelectedSocialLinks={setSelectedSocialLinks} />}
            {step === 12 && <ResumeUpload selectedResume={selectedResume} setSelectedResume={setSelectedResume}/>}
            {step === 13 && <SuccessTab />}

            {/* Submit & Skip Button */}
            {step !== 13 && (
              <div className="flex items-center gap-3 justify-end mt-5">
                <Button
                  onClick={() => handleSkip(step)}
                  type="button"
                  variant="natural"
                  className="px-6 py-[14px] flex items-center justify-center"
                >
                  {isLoading ? <Oval height="25" width="25" strokeWidth="5" /> : "Skip"}
                </Button>
                <Button
                  type="submit"
                  variant="normal"
                  className="px-6 py-[14px]"
                >
                  {
                   isSubmitting ? <Oval height="25" width="25" color="white" strokeWidth="5" /> :
                   step === 12 ?
                   "Submit" :
                    "Continue"
                    }
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;