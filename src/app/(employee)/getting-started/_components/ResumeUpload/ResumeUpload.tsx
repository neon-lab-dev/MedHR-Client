import { IMAGES } from "@/assets";
import Image from "next/image";

type TResumeUploadProps = {
  selectedResume :  File | null;
  setSelectedResume : (resume : File | null) => void;
};

const ResumeUpload: React.FC<TResumeUploadProps> = ({ selectedResume, setSelectedResume }) => {

  const handleFileClick = () => {
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedResume(file);
    }
  };


  return (
    <div className="flex flex-col gap-5 mt-12 font-plus-jakarta-sans">
      <h1 className="registration-form-heading mb-4">Upload your resume</h1>
      <div>
        <input
          type="file"
          id="file-upload"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
        type="button"
          className="border border-dashed border-gray-400 rounded-lg w-full h-48 flex flex-col justify-center items-center"
          onClick={handleFileClick}
        >
          <div className="flex flex-col p-10 max-lg:p-0 max-md:w-[250px]">
            <div className="flex justify-center">
              <Image src={IMAGES.papperclip} alt="resume" />
            </div>
            <span className="text-gray-400 p-4">Click here to upload</span>
            {selectedResume && (
              <span className="mt-2 text-blue-500">{selectedResume?.name}</span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ResumeUpload;