import Container from "@/components/Container";
import AllSkillProgrammes from "./_components/AllSkillProgrammes";
const SkillProgrammesPage = () => {
    return (
        <div>
             <div className="max-width-full h-[175px] md:h-[283px] lg:h-[310px] bg-[#F5F6FA] flex flex-col justify-center items-center mb-20">
        <Container>

        <div className="flex justify-center items-center gap-[17px]">
          <div className=" highlight">
            <p className="text-white font-bold text-center text-[32px] md:text-[56px] lg:text-[64px] font-plus-jakarta-sans">
              Skill
            </p>
          </div>
          <div>
            <p className="text-black font-bold text-center text-[32px] md:text-[56px] lg:text-[64px] font-plus-jakarta-sans">
            Programmes
            </p>
          </div>
        </div>
        </Container>
      </div>
      <AllSkillProgrammes/>
        </div>
    );
};

export default SkillProgrammesPage;