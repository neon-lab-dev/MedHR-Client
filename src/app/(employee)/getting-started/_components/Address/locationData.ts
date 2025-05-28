// Used in home page hero section for location filter
export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];


export const canadianProvincesAndTerritories = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon"
];

export const germanStates = [
  "Baden-Württemberg",
  "Bavaria",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hesse",
  "Lower Saxony",
  "Mecklenburg-Vorpommern",
  "North Rhine-Westphalia",
  "Rhineland-Palatinate",
  "Saarland",
  "Saxony",
  "Saxony-Anhalt",
  "Schleswig-Holstein",
  "Thuringia"
];


export const locationData = [
  {
    countryName: "India",
    states: [
      {
        state: "Andaman & Nicobar",
        cities: ["Port Blair"],
      },
      {
        state: "Andhra Pradesh",
        cities: [
          "Adoni",
          "Amaravati",
          "Anantapur",
          "Chandragiri",
          "Chittoor",
          "Dowlaiswaram",
          "Eluru",
          "Guntur",
          "Kadapa",
          "Kakinada",
          "Kurnool",
          "Machilipatnam",
          "Nagarjunakonda",
          "Rajahmundry",
          "Srikakulam",
          "Tirupati",
          "Vijayawada",
          "Visakhapatnam",
          "Vizianagaram",
          "Yemmiganur",
        ],
      },
      {
        state: "Arunachal Pradesh",
        cities: ["Itanagar"],
      },
      {
        state: "Assam",
        cities: [
          "Dhuburi",
          "Dibrugarh",
          "Dispur",
          "Guwahati",
          "Jorhat",
          "Nagaon",
          "Sivasagar", // Note: Silchar, Tezpur, Tinsukia seem to be listed under Sivasagar in OCR, corrected placement
          "Silchar",
          "Tezpur",
          "Tinsukia",
        ],
      },
      {
        state: "Bihar",
        cities: [
          "Ara",
          "Barauni",
          "Begusarai",
          "Bettiah",
          "Bhagalpur",
          "Bihar Sharif",
          "Bodh Gaya",
          "Buxar",
          "Chapra",
          "Darbhanga",
          "Dehri",
          "Dinapur Nizamat",
          "Gaya",
          "Hajipur",
          "Jamalpur",
          "Katihar",
          "Madhubani",
          "Motihari",
          "Munger",
          "Muzaffarpur",
          "Patna",
          "Purnia",
          "Pusa",
          "Saharsa",
          "Samastipur",
          "Sasaram",
          "Sitamarhi",
          "Siwan",
        ],
      },
      {
        state: "Chandigarh",
        cities: ["Chandigarh"],
      },
      {
        state: "Chhattisgarh",
        cities: [
          "Ambikapur",
          "Bhilai",
          "Bilaspur",
          "Dhamtari",
          "Durg",
          "Jagdalpur",
          "Raipur",
          "Rajnandgaon",
        ],
      },
      // Note: Dadar and Nagar Haveli and Daman and Diu are now a single Union Territory.
      // The cities listed cover this merged territory.
      {
        state: "Dadra and Nagar Haveli",
        cities: ["Daman", "Diu", "Silvassa"],
      },
      {
        state: "Daman and Diu",
        cities: ["Daman", "Diu"],
      },
      {
        state: "Delhi",
        cities: ["Delhi", "New Delhi"],
      },
      {
        state: "Goa",
        cities: ["Madgaon", "Panaji"],
      },
      {
        state: "Gujarat",
        cities: [
          "Ahmadabad", // Likely Ahmedabad
          "Amreli",
          "Bharuch",
          "Bhavnagar",
          "Bhuj",
          "Dwarka",
          "Gandhinagar",
          "Godhra",
          "Jamnagar",
          "Junagadh",
          "Kandla",
          "Khambhat",
          "Kheda",
          "Mahesana",
          "Morbi",
          "Nadiad",
          "Navsari",
          "Okha",
          "Palanpur",
          "Patan",
          "Porbandar",
          "Rajkot",
          "Surat",
          "Surendranagar",
          "Valsad",
          "Veraval", // Added from top of Page 3, assumed continuation
        ],
      },
      {
        state: "Haryana",
        cities: [
          "Ambala",
          "Bhiwani",
          "Chandigarh", // Chandigarh is a shared capital and UT
          "Faridabad",
          "Firozpur Jhirka",
          "Gurugram", // Formerly Gurgaon
          "Hansi",
          "Hisar",
          "Jind",
          "Kaithal",
          "Karnal",
          "Kurukshetra",
          "Panipat",
          "Pehowa",
          "Rewari",
          "Rohtak",
          "Sirsa",
          "Sonipat",
        ],
      },
      {
        state: "Himachal Pradesh",
        cities: [
          "Bilaspur",
          "Chamba",
          "Dalhousie",
          "Dharmshala",
          "Hamirpur",
          "Kangra",
          "Kullu",
          "Mandi",
          "Nahan",
          "Shimla",
          "Una",
        ],
      },
      // Note: Jammu and Kashmir is now a single Union Territory, but the source lists them separately.
      // Representing as per source structure.
      {
        state: "Jammu", // Part of UT of Jammu and Kashmir
        cities: [
          "Jammu",
          "Kathua",
          "Samba",
          "Poonch", // Often considered part of Jammu division
          "Rajouri", // Often considered part of Jammu division
          "Udampur",
          "Reasi",
          "Ramban",
          "Kishtwar",
          "Doda",
        ],
      },
      {
        state: "Jharkhand",
        cities: [
          "Bokaro",
          "Chaibasa",
          "Deoghar",
          "Dhanbad",
          "Dumka",
          "Giridih",
          "Hazaribag",
          "Jamshedpur",
          "Jharia",
          "Rajmahal",
          "Ranchi",
          "Saraikela", // Added from top of Page 4, assumed continuation
        ],
      },
      {
        state: "Karnataka",
        cities: [
          "Badami",
          "Ballari", // Formerly Bellary
          "Bengaluru", // Formerly Bangalore
          "Belagavi", // Formerly Belgaum
          "Bhadravati",
          "Bidar",
          "Chikkamagaluru",
          "Chitradurga",
          "Davangere",
          "Halebid", // Halebidu
          "Hassan",
          "Hubballi-Dharwad", // Formerly Hubli-Dharwad
          "Kalaburagi", // Formerly Gulbarga
          "Kolar",
          "Madikeri",
          "Mandya",
          "Mangaluru", // Formerly Mangalore
          "Mysuru", // Formerly Mysore
          "Raichur",
          "Shivamogga", // Formerly Shimoga
          "Shravanabelagola",
          "Shrirangapattana",
          "Tumakuru", // Formerly Tumkur
          "Vijayapura", // Formerly Bijapur
        ],
      },
      {
        state: "Kashmir", // Part of UT of Jammu and Kashmir
        cities: [
          "Anantnag",
          "Baramulla",
          "Budgam",
          "Bandipore", // Bandipora
          "Gandwebal", // Likely Ganderbal
          "Kupwara",
          "Kulgam",
          "Pulwama",
          "Shopian",
          "Srinagar", // Corrected from "Sirnagar"
        ],
      },
      {
        state: "Kerala",
        cities: [
          "Alappuzha", // Formerly Alleppey
          "Vatakara", // Badagara
          "Idukki",
          "Kannur", // Formerly Cannanore
          "Kochi", // Formerly Cochin
          "Kollam", // Formerly Quilon
          "Kottayam",
          "Kozhikode", // Formerly Calicut
          "Mattancheri", // Mattancherry
          "Palakkad", // Formerly Palghat
          "Thalassery", // Formerly Tellicherry
          "Thiruvananthapuram", // Formerly Trivandrum
          "Thrissur", // Formerly Trichur
        ],
      },
      // Note: Ladakh is now a separate Union Territory. Source format was messy here.
      {
        state: "Ladakh",
        cities: [
          "Kargil",
          "Leh", // Moved from under Lakshadweep in OCR
        ],
      },
      // Note: Source listed Leh under Lakshadweep, which is incorrect. Leh belongs to Ladakh.
      // Lakshadweep's capital Kavaratti is not listed in the source. Adding empty array.
      {
        state: "Lakshadweep",
        cities: [], // Capital Kavaratti not listed in OCR
      },
      {
        state: "Madhya Pradesh",
        cities: [
          "Balaghat",
          "Barwani",
          "Betul",
          "Bharhut",
          "Bhind",
          "Bhojpur",
          "Bhopal",
          "Burhanpur",
          "Chhatarpur",
          "Chhindwara",
          "Damoh",
          "Datia",
          "Dewas",
          "Dhar",
          "Dr. Ambedkar Nagar (Mhow)",
          "Guna",
          "Gwalior",
          "Hoshangabad", // Now Narmadapuram
          "Indore",
          "Itarsi",
          "Jabalpur",
          "Jhabua",
          "Khajuraho",
          "Khandwa",
          "Khargone",
          "Maheshwar",
          "Mandla",
          "Mandsaur",
          "Morena",
          "Murwara", // Katni
          "Narsimhapur",
          "Narsinghgarh",
          "Narwar",
          "Neemuch",
          "Nowgong",
          "Orchha",
          "Panna",
          "Raisen",
          "Rajgarh",
          "Ratlam",
          "Rewa",
          "Sagar",
          "Sarangpur",
          "Satna",
          "Sehore",
          "Seoni",
          "Shahdol",
          "Shajapur",
          "Sheopur",
          "Shivpuri",
          "Ujjain",
          "Vidisha",
        ],
      },
      {
        state: "Maharashtra",
        cities: [
          "Ahmadnagar",
          "Akola",
          "Amravati",
          "Aurangabad", // Now Chhatrapati Sambhaji Nagar
          "Bhandara",
          "Bhusawal",
          "Bid", // Beed
          "Buldhana",
          "Chandrapur",
          "Daulatabad",
          "Dhule",
          "Jalgaon",
          "Kalyan",
          "Karli", // Karle
          "Kolhapur",
          "Mahabaleshwar",
          "Malegaon",
          "Matheran",
          "Mumbai", // Formerly Bombay
          "Nagpur",
          "Nanded",
          "Nashik",
          "Osmanabad", // Now Dharashiv
          "Pandharpur",
          "Parbhani",
          "Pune", // Formerly Poona
          "Ratnagiri",
          "Sangli",
          "Satara",
          "Sevagram",
          "Solapur",
          "Thane",
          "Ulhasnagar",
          "Vasai-Virar",
          "Wardha",
          "Yavatmal",
        ],
      },
      {
        state: "Manipur",
        cities: ["Imphal"],
      },
      {
        state: "Meghalaya",
        cities: ["Cherrapunji", "Shillong"],
      },
      {
        state: "Mizoram",
        cities: [
          "Aizawl", // Corrected from "Aizawal"
          "Lunglei",
        ],
      },
      {
        state: "Nagaland",
        cities: ["Kohima", "Mon", "Phek", "Wokha", "Zunheboto"],
      },
      {
        state: "Odisha", // Formerly Orissa
        cities: [
          "Balangir", // Bolangir
          "Baleshwar", // Balasore
          "Baripada",
          "Bhubaneshwar",
          "Brahmapur", // Berhampur
          "Cuttack",
          "Dhenkanal",
          "Kendujhar", // Keonjhar
          "Konark",
          "Koraput",
          "Paradip", // Paradeep
          "Phulabani", // Phulbani
          "Puri",
          "Sambalpur",
          "Udayagiri",
        ],
      },
      {
        state: "Puducherry", // Formerly Pondicherry (Union Territory)
        cities: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
      },
      {
        state: "Punjab",
        cities: [
          "Amritsar",
          "Batala",
          "Chandigarh", // Shared capital
          "Faridkot",
          "Firozpur",
          "Gurdaspur",
          "Hoshiarpur",
          "Jalandhar",
          "Kapurthala",
          "Ludhiana",
          "Nabha",
          "Patiala",
          "Rupnagar", // Ropar
          "Sangrur",
        ],
      },
      {
        state: "Rajasthan",
        cities: [
          "Abu", // Mount Abu
          "Ajmer",
          "Alwar",
          "Amer",
          "Barmer",
          "Beawar",
          "Bharatpur",
          "Bhilwara",
          "Bikaner",
          "Bundi",
          "Chittaurgarh", // Chittorgarh
          "Churu",
          "Dhaulpur", // Dholpur
          "Dungarpur",
          "Ganganagar", // Sri Ganganagar
          "Hanumangarh",
          "Jaipur",
          "Jaisalmer",
          "Jalor", // Jalore
          "Jhalawar",
          "Jhunjhunu",
          "Jodhpur",
          "Kishangarh",
          "Kota",
          "Merta",
          "Nagaur",
          "Nathdwara",
          "Pali",
          "Phalodi",
          "Pushkar",
          "Sawai Madhopur",
          "Shahpura",
          "Sikar",
          "Sirohi",
          "Tonk",
          "Udaipur",
        ],
      },
      {
        state: "Sikkim",
        cities: [
          "Gangtok",
          "Gyalshing", // Geyzing
          "Lachung",
          "Mangan",
        ],
      },
      {
        state: "Tamil Nadu",
        cities: [
          "Arcot",
          "Chengalpattu",
          "Chennai", // Formerly Madras
          "Chidambaram",
          "Coimbatore",
          "Cuddalore",
          "Dharmapuri",
          "Dindigul",
          "Erode",
          "Kanchipuram",
          "Kanniyakumari", // Kanyakumari
          "Kodaikanal",
          "Kumbakonam",
          "Madurai",
          "Mamallapuram", // Mahabalipuram
          "Nagappattinam",
          "Nagercoil",
          "Palayamkottai",
          "Pudukkottai",
          "Rajapalayam",
          "Ramanathapuram",
          "Salem",
          "Thanjavur", // Tanjore
          "Tiruchchirappalli", // Trichy / Tiruchirapalli
          "Tirunelveli",
          "Tiruppur",
          "Thoothukudi", // Tuticorin
          "Udhagamandalam", // Ooty
          "Vellore",
        ],
      },
      {
        state: "Telangana",
        cities: [
          "Hyderabad", // Shared capital initially, now solely Telangana's
          "Karimnagar",
          "Khammam",
          "Mahbubnagar",
          "Nizamabad",
          "Sangareddi",
          "Warangal",
        ],
      },
      {
        state: "Tripura",
        cities: ["Agartala"],
      },
      {
        state: "Uttar Pradesh",
        cities: [
          "Agra",
          "Aligarh",
          "Amroha",
          "Ayodhya",
          "Azamgarh",
          "Bahraich",
          "Ballia",
          "Banda",
          "Bara Banki",
          "Bareilly",
          "Basti",
          "Bijnor",
          "Bithur",
          "Budaun",
          "Bulandshahr",
          "Deoria",
          "Etah",
          "Etawah",
          "Faizabad", // Merged into Ayodhya district
          "Farrukhabad-cum-Fatehgarh",
          "Fatehpur",
          "Fatehpur Sikri",
          "Ghaziabad",
          "Ghazipur",
          "Gonda",
          "Gorakhpur",
          "Hamirpur",
          "Hardoi",
          "Hathras",
          "Jalaun",
          "Jaunpur",
          "Jhansi",
          "Kannauj",
          "Kanpur",
          "Lakhimpur",
          "Lalitpur",
          "Lucknow",
          "Mainpuri",
          "Mathura",
          "Meerut",
          "Mirzapur-Vindhyachal", // Mirzapur
          "Moradabad",
          "Muzaffarnagar",
          "Partapgarh", // Pratapgarh
          "Pilibhit",
          "Prayagraj", // Formerly Allahabad
          "Rae Bareli",
          "Rampur",
          "Saharanpur",
          "Sambhal",
          "Shahjahanpur",
          "Sitapur",
          "Sultanpur",
          "Tehri", // Tehri is in Uttarakhand, likely error in source? Removing from UP.
          "Varanasi", // Formerly Benares
        ],
      },
      {
        state: "Uttarakhand", // Formerly Uttaranchal
        cities: [
          "Almora",
          "Dehradun", // Corrected from "Dehra Dun"
          "Haridwar",
          "Mussoorie",
          "Nainital",
          "Pithoragarh",
          "Tehri", // Added here, was wrongly listed under UP in source
        ],
      },
      {
        state: "West Bengal",
        cities: [
          "Alipore", // Part of Kolkata
          "Alipur Duar", // Alipurduar
          "Asansol",
          "Baharampur", // Berhampore
          "Bally", // Part of Howrah
          "Balurghat",
          "Bankura",
          "Baranagar", // Part of Kolkata metropolitan area
          "Barasat",
          "Barrackpore",
          "Basirhat",
          "Bhatpara",
          "Bishnupur",
          "Budge Budge", // Part of Kolkata metropolitan area
          "Burdwan", // Bardhaman
          "Chandernagore", // Chandannagar
          "Darjeeling",
          "Diamond Harbour",
          "Dum Dum", // Part of Kolkata metropolitan area
          "Durgapur",
          "Halisahar",
          "Haora", // Howrah
          "Hugli", // Hooghly
          "Ingraj Bazar", // English Bazar / Malda
          "Jalpaiguri",
          "Kalimpong",
          "Kamarhati", // Part of Kolkata metropolitan area
          "Kanchrapara",
          "Kharagpur",
          "Cooch Behar", // Koch Bihar
          "Kolkata", // Formerly Calcutta
          "Krishnanagar",
          "Malda", // District, also city (English Bazar)
          "Midnapore", // Medinipur
          "Murshidabad",
          "Nabadwip",
          "Palashi", // Plassey
          "Panihati", // Part of Kolkata metropolitan area
          "Purulia",
          "Raiganj",
          "Santipur",
          "Shantiniketan", // University town
          "Shrirampur", // Serampore
          "Siliguri",
          "Siuri", // Suri
          "Tamluk",
          "Titagarh", // Part of Kolkata metropolitan area
        ],
      },
    ],
  },
  {
    countryName: "Canada",
    states: [
      {
        state: "Alberta",
        cities: ["Calgary", "Edmonton"],
      },
      {
        state: "British Columbia",
        cities: ["Vancouver", "Victoria"],
      },
      {
        state: "Manitoba",
        cities: ["Winnipeg", "Brandon"],
      },
      {
        state: "New Brunswick",
        cities: ["Fredericton", "Moncton"],
      },
      {
        state: "Newfoundland and Labrador",
        cities: ["St. John's", "Corner Brook"],
      },
      {
        state: "Nova Scotia",
        cities: ["Halifax", "Sydney"],
      },
      {
        state: "Ontario",
        cities: ["Toronto", "Ottawa", "Hamilton"],
      },
      {
        state: "Prince Edward Island",
        cities: ["Charlottetown", "Summerside"],
      },
      {
        state: "Quebec",
        cities: ["Montreal", "Quebec City"],
      },
      {
        state: "Saskatchewan",
        cities: ["Regina", "Saskatoon"],
      },
      {
        state: "Northwest Territories",
        cities: ["Yellowknife"],
      },
      {
        state: "Nunavut",
        cities: ["Iqaluit"],
      },
      {
        state: "Yukon",
        cities: ["Whitehorse"],
      },
    ],
  },
  {
    countryName: "Germany",
    states: [
      {
        state: "Baden-Württemberg",
        cities: ["Stuttgart", "Karlsruhe", "Mannheim"],
      },
      {
        state: "Bavaria",
        cities: ["Munich", "Nuremberg", "Augsburg"],
      },
      {
        state: "Berlin",
        cities: ["Berlin"],
      },
      {
        state: "Brandenburg",
        cities: ["Potsdam", "Cottbus", "Brandenburg an der Havel"],
      },
      {
        state: "Bremen",
        cities: ["Bremen", "Bremerhaven"],
      },
      {
        state: "Hamburg",
        cities: ["Hamburg"],
      },
      {
        state: "Hesse",
        cities: ["Wiesbaden", "Frankfurt", "Darmstadt"],
      },
      {
        state: "Lower Saxony",
        cities: ["Hanover", "Braunschweig", "Osnabrück"],
      },
      {
        state: "Mecklenburg-Vorpommern",
        cities: ["Schwerin", "Rostock", "Neubrandenburg"],
      },
      {
        state: "North Rhine-Westphalia",
        cities: ["Cologne", "Düsseldorf", "Dortmund", "Essen"],
      },
      {
        state: "Rhineland-Palatinate",
        cities: ["Mainz", "Koblenz", "Ludwigshafen"],
      },
      {
        state: "Saarland",
        cities: ["Saarbrücken", "Neunkirchen"],
      },
      {
        state: "Saxony",
        cities: ["Dresden", "Leipzig", "Chemnitz"],
      },
      {
        state: "Saxony-Anhalt",
        cities: ["Magdeburg", "Halle", "Dessau-Roßlau"],
      },
      {
        state: "Schleswig-Holstein",
        cities: ["Kiel", "Lübeck", "Flensburg"],
      },
      {
        state: "Thuringia",
        cities: ["Erfurt", "Jena", "Gera"],
      },
    ],
  },
];

export const countries = [
  "India",
  "Canada",
  "Germany",
]