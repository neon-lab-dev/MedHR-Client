
export const convertDate = (isoDate: string): string => {
    if (!isoDate) return "";
  
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // Jan, Feb, etc.
    const year = date.getFullYear();
  
    const getOrdinalSuffix = (n: number): string => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
  
    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
  };
  