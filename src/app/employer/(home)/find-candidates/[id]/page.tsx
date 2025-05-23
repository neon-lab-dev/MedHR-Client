"use client"
import { useQuery } from "@tanstack/react-query";
import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import {handleGEtEmployerByIdForEmployer } from "@/api/employer";
import Image from "next/image";
import { ICONS } from "@/assets";
import EducationDetails from "../_components/EducationDetails";
import ProjectDetails from "../_components/ProjectDetails";
import WorkExperience from "../_components/WorkExperience";
import Certification from "../_components/Certification";
import Skills from "../_components/Skills";
import Button from "@/components/Button";
import Link from "next/link";
import { use} from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const EmployeeProfileDetails = ({ params }: Props) => {
    const { id } = use(params);
    // const router = useRouter();
    // const [certificate, setCertificate] = useState();
    const { isLoading, data } = useQuery({
        queryKey: ["employer", "employee", id],
        queryFn: () => handleGEtEmployerByIdForEmployer(id),
      });

    // const { data:employerProfile } = useQuery({
    //     queryKey: ["employerProfileData", id],
    //     queryFn: () => fetchEmployerProfileData(),
    //   });

      // const { mutate } = useMutation({
      //   mutationFn: ({ userId, companyName }: { userId: string; companyName: string }) =>
      //     sendHiredEmail(userId, companyName),
      //   onSuccess: () => {
      //     toast.success("Email sent successfully!");
      //     router.push("/employer/find-candidates");
      //   },
      //   onError: (error: any) => {
      //     toast.error(error?.message || "Failed to send email.");
      //   },
      // });
      
      // const handleSendEmail = async () => {
      //   const blob = await pdf(
      //     <CertificateDocument
      //       name={data?.full_name as string}
      //       from="XXXX"
      //       role="YYY"
      //       company={employerProfile?.user?.companyDetails[0]?.companyName as string}
      //       certId="CH-UIUX-2023-234"
      //       issueDate="SEPTEMBER 6, 2023"
      //     />
      //   ).toBlob();
      
      //   const url = URL.createObjectURL(blob);
      //   const link = document.createElement("a");
      //   link.href = url;
      //   link.download = "Certificate.pdf";
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
      //   URL.revokeObjectURL(url);
      // };
      
      if (isLoading) return <Loading className="h-[60vh] w-full" />;
      if (!data) return <NotFound />;
    return (
      <div className="bg-[#f5f6fa] p-7 font-plus-jakarta-sans">
      {/* {data?.full_name} */}
      <div className="bg-white border border-[#EEEEF0] p-9 rounded-3xl max-w-[1100px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href={"/employer/find-candidates"}>
              <Image
                src={ICONS.leftArrow}
                alt="left-arrow"
                className="size-10"
              />
            </Link>
            <h1 className="text-[28px] font-bold text-[#25252C]">
              Candidate
            </h1>
          </div>
          <Button
          // onClick={handleSendEmail}
            variant="normal"
            className="px-4 py-3 flex items-center gap-1"
          >
            Send Message
            <Image src={ICONS.sendArrow} alt="send-arrow" className="size-5" />
          </Button>
        </div>

          {/* Img and name */}
        <div className="bg-[#EAECF4] border border-[#EEEEF0] rounded-3xl p-8 flex items-center justify-between mt-12 mb-6">
          <div className="flex items-center gap-[10px]">
            <div className="size-[59px] rounded-full border-2 border-[#F7F7F8] flex items-center justify-center text-xl font-semibold">
            {data?.full_name
                  ? data?.full_name
                      .split(" ")
                      .map((letter:string) => letter.charAt(0))
                      .join("")
                  : "?"}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#25252C]">
              {data?.full_name}
              </h1>
              <p className="text-[#5B5C6E] mt-[6px]">CCN Polytechnic</p>
            </div>
          </div>
          {
            data?.resumes?.url ?
            <Link href={data?.resumes?.url ? data?.resumes?.url : ""} className="flex items-center gap-2 px-6 py-4 bg-[#D0D7E7] border border-[#778DB9] text-[#303D5C] font-medium rounded-[14px] cursor-pointer">
            Download Resume
            <Image
              src={ICONS.download2}
              alt="download-icon"
              className="size-4"
            />
          </Link>
          :
          <div className="flex items-center gap-2 px-6 py-4 bg-[#D0D7E7] border border-[#778DB9] text-[#303D5C] font-medium rounded-[14px]">
            No resume added
          </div>
          }
          
        </div>

        {/* Rest sections */}
        <div className="flex flex-col gap-6">
          <EducationDetails education={data?.education? data?.education : []} />
          <ProjectDetails projects={data?.projects? data?.projects : []} />
          <WorkExperience experiences={data?.experience ? data?.experience: []} />
          <Certification certifications={data?.certifications ? data?.certifications : []} />
          <Skills skills={data?.skills} />
        </div>
      </div>
    </div>
    );
};

export default EmployeeProfileDetails;