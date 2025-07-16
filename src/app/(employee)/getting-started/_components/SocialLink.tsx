"use client";
import { ICONS } from "@/assets";
import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { TSocialLinks } from "../page";


type TSocialLinkProps = {
  setSelectedSocialLinks: Dispatch<SetStateAction<TSocialLinks[]>>;
};

const SocialLink: React.FC<TSocialLinkProps> = ({ setSelectedSocialLinks }) => {
  const [open, setOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<{
    icon: string;
    platform: string;
  } | null>(null);
  
  const [link, setLink] = useState("");
  const [socialLinks, setSocialLinks] = useState<
    { platform: string; icon: string; link: string }[]
  >([]);

  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: { icon: string; platform: string }) => {
    setOpen(false);
    setSelectedPlatform(item);
  };

  const handleAddSocialLink = () => {
    if (!selectedPlatform || !link) return;

    // Prevent duplicate platforms
    if (
      socialLinks.find(
        (item) =>
          item.platform.toLowerCase() === selectedPlatform.platform.toLowerCase()
      )
    )
      return;

    const updatedLinks = [
      ...socialLinks,
      {
        platform: selectedPlatform.platform,
        icon: selectedPlatform.icon,
        link,
      },
    ];

    setSocialLinks(updatedLinks);

    // Transform to backend-friendly object
    const backendLinks: TSocialLinks = {};
    updatedLinks.forEach((item) => {
      backendLinks[item.platform.toLowerCase() as keyof TSocialLinks] = item.link;
    });

    setSelectedSocialLinks((prev) => [...prev, backendLinks]);

    // Reset
    setSelectedPlatform(null);
    setLink("");
  };

  const socialMediaPlatforms = [
    { icon: ICONS.linkedin, platform: "LinkedIn" },
    { icon: ICONS.facebookBlue, platform: "Facebook" },
    { icon: ICONS.instagramLight, platform: "Instagram" },
    { icon: ICONS.twitter, platform: "Twitter" },
    { icon: ICONS.github, platform: "Github" },
    { icon: ICONS.youtube, platform: "YouTube" },
    { icon: ICONS.dribble, platform: "Dribbble" },
    { icon: ICONS.behance, platform: "Behance" },
    { icon: ICONS.medium, platform: "Medium" },
    { icon: ICONS.stackoverflow, platform: "StackOverflow" },
    { icon: ICONS.reddit, platform: "Reddit" },
    { icon: ICONS.tiktok, platform: "TikTok" },
    { icon: ICONS.pinterest, platform: "Pinterest" },
    { icon: ICONS.telegram, platform: "Telegram" },
    { icon: ICONS.discord, platform: "Discord" },
  ];

  return (
    <div className="flex flex-col gap-5 mt-12 font-plus-jakarta-sans">
      <h1 className="registration-form-heading mb-4">Add Social Links</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Dropdown */}
        <div ref={dropDownRef} className="relative font-plus-jakarta-sans">
          <label className="text-neutral-700 font-medium">Social Media</label>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="p-4 rounded-xl bg-white border focus:outline-none focus:border-primary-500 flex items-center justify-between w-full md:w-[210px] mt-2 cursor-pointer transition-all duration-300 ease-in-out transform active:scale-95 text-[#1D293D] font-medium"
          >
            {selectedPlatform?.platform ?? "Select Social Media"}
            <Image
              src={ICONS.downArrow}
              alt="dropdown-icon"
              className="size-6"
            />
          </button>

          <div
            className={`${
              open ? "visible bg-white shadow-secondary-button" : "invisible"
            } absolute top-24 z-50 w-[210px] h-56 overflow-y-auto flex flex-col gap-2 p-3 rounded-b-2xl`}
          >
            {socialMediaPlatforms.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(item)}
                className={`rounded-md bg-neutral-100 text-neutral-700 font-medium text-start py-2 px-3 flex items-center gap-3 ${
                  open ? "opacity-100 duration-500" : "opacity-0 duration-150"
                } hover:bg-neutral-200`}
                style={{
                  transform: `translateY(${open ? 0 : (idx + 1) * 10}px)`,
                }}
              >
                <Image src={item.icon} alt={item.platform} className="size-6" />
                {item.platform}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          {/* Link input */}
        <div className="flex-1">
          <label className="text-neutral-700 font-medium">Profile Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="e.g., https://linkedin.com/in/username"
            className={`p-4 mt-2 rounded-xl bg-white border w-full focus:outline-none focus:border-primary-500 transition duration-300 border-neutral-300`}
          />
        </div>

        {/* Add Button */}
        <button
          type="button"
          onClick={handleAddSocialLink}
          className="size-[55px] rounded-xl mt-[33px] bg-primary-500 flex items-center justify-center active:scale-95 transition"
        >
          <Image src={ICONS.addCircle} alt="add-icon" className="size-7" />
        </button>
        </div>
      </div>

      {/* Display added links */}
      <div className="flex flex-col gap-4">
        {socialLinks.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg bg-neutral-50"
          >
            <div className="flex items-center gap-2">
              <Image src={item?.icon} alt={item?.platform} className="size-6" />
              <span className="font-medium w-[120px]">{item?.platform}:</span>
            </div>
            <a
              href={item?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:underline break-all"
            >
              {item?.link}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLink;
