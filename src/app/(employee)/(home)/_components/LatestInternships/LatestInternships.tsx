import Button from "@/components/Button";
import { getLatestInternships } from "@/api/jobs";
import Link from "next/link";
import React from "react";
import NoDataFound from "@/components/NoDataFound";
import SectionHeading from "@/components/Reusable/SectionHeading/SectionHeading";
import Image from "next/image";
import { IMAGES } from "@/assets";
import InternshipCarousel from "./InternshipCarousel";
import Container from "@/components/Container";

const LatestInternships = async () => {
  const internships = await getLatestInternships();
  return (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50 py-10 relative">
      <Image
        src={IMAGES.linnerBg}
        alt=""
        className="absolute top-0 bottom-0 right-0 left-0 z-0 h-full w-full opacity-10"
      />
      <Container>
        <div className="py-section flex flex-col items-center justify-center gap-14">
          <SectionHeading
            highlightedText="Latest Internships"
            normalText="For You"
            align="left"
          />
          {internships?.length < 1 ? (
            <NoDataFound message="No Internship Found" />
          ) : (
            <InternshipCarousel internships={internships} />
          )}
          <Link href="/internships">
            <Button variant="normal" className="px-9 py-4">
              View all openings
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default LatestInternships;
