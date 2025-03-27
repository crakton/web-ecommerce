import image from "./assets/images/review.jpg"
import FederalGovernment from "./assets/images/partners/FederalGovernment.png";
import Amahoro from "./assets/images/partners/Amahoro.png";
import Plasmida from "./assets/images/partners/Plasmida.png";
import WesternUnion from "./assets/images/partners/WesternUnionFoundation.png";
import WatsonInstitute from "./assets/images/partners/WatsonInstitute.png";
import Ecowas from "./assets/images/partners/Ecowas.png";
import EnergyGlobe from "./assets/images/partners/EnergyGlobe.jpg";
import Ariel from "./assets/images/partners/ZangGlobal.jpeg";
import NationalWinner from "./assets/images/partners/nationalWinner2022_Nigeria.png";
import Awards from "./assets/images/partners/Awards.jpg";


export const API_URL = process.env.API_URL || "https://api.merabestie.com"

export const RAZORPAY_API = "rzp_live_VfAbr5J2VcLFVc"

export const APP_NAME = "MeraBestie"

export const APP_DESC = ""

export const whyUs = [
    {
        id: 1,
        title: "RELIABILITY",
    },
    {
        id: 2,
        title: "PERSONALIZED APPROACH",
    },
    {
        id: 3,
        title: "TIMELY DELIVERY",
    },
    {
        id: 4,
        title: "HIGH STANDARDS",
    }
]


export const progress = [
    {
        id: 1,
        progress: "",
        title: "RELIABILITY",
    },
    {
        id: 2,
        progress: 8,

        title: "Year in Operation",
    },
    {
        id: 3,
        progress: 30,

        title: "Offices Nationwide",
    },

]



export const testimonialData = [
    {
        img: image,
        name: "Ralph Edwards",
        statement:
            "Odio rhoncus ornare ut quam. Molestie vel duis quis scelerisque ut id. In tortor turpis viverra sagittis ultrices nisi, nec tortor. Vestibulum, ultrices ultricies neque, hac ultricies dolor",
        services: "Math Teacher",
    },
    {
        img: image,
        name: "Alice Smith",
        statement:
            "Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras aliquam. Diam tellus, amet, hac imperdiet. Tellus mi volutpat tellus, congue malesuada sit nisl donec a",
        services: "Manager",
    },
    {
        img: image,
        name: "John Joy",
        statement:
            "Odio rhoncus ornare ut quam. Molestie vel duis quis scelerisque ut id. In tortor turpis viverra sagittis ultrices nisi, nec tortor. Vestibulum, ultrices ultricies neque, hac ultricies dolor",
        services: "Psychology Student",
    },
    {
        img: image,
        name: "Alice idris",
        statement:
            "Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras aliquam. Diam tellus, amet, hac imperdiet. Tellus mi volutpat tellus, congue malesuada sit nisl donec a",
        services: "Frontend Dev",
    },
    {
        img: image,
        name: "Ayuba Alanin",
        statement:
            "Odio rhoncus ornare ut quam. Molestie vel duis quis scelerisque ut id. In tortor turpis viverra sagittis ultrices nisi, nec tortor. Vestibulum, ultrices ultricies neque, hac ultricies dolor",
        services: "Psychologist",
    },
    {
        img: image,
        name: "Olaide idris",
        statement:
            "Sapien, sollicitudin et vitae id et laoreet sapien consectetur. Felis egestas egestas amet aliquam sit euismod. Pellentesque neque, sed ut volutpat. Ullamcorper in at nulla dignissim",
        services: "Manager",
    },
    {
        img: image,
        name: "Akande Abiodun",
        statement:
            "Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras aliquam. Diam tellus, amet, hac imperdiet. Tellus mi volutpat tellus, congue malesuada sit nisl donec a",
        services: "Lawyer",
    },
    {
        img: image,
        name: "Azeezat Smith",
        statement:
            "Sapien, sollicitudin et vitae id et laoreet sapien consectetur. Felis egestas egestas amet aliquam sit euismod. Pellentesque neque, sed ut volutpat. Ullamcorper in at nulla dignissim",
        services: "Backend Dev",
    },
    {
        img: image,
        name: "John sofiyah",
        statement:
            "Odio rhoncus ornare ut quam. Molestie vel duis quis scelerisque ut id. In tortor turpis viverra sagittis ultrices nisi, nec tortor. Vestibulum, ultrices ultricies neque, hac ultricies dolor",
        services: "Accountant",
    },
    {
        img: image,
        name: "Idris Olaide",
        statement:
            "Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras aliquam. Diam tellus, amet, hac imperdiet. Tellus mi volutpat tellus, congue malesuada sit nisl donec a",
        services: "Doctor",
    },
    {
        img: image,
        name: "Adewale Usman",
        statement:
            "Sapien, Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras aliquam. Diam tellus, amet, hac imperdiet. Tellus mi volutpat tellus, congue malesuada sit nisl donec a.id et laoreet sapien consectetur. Felis egestas egestas amet aliquam sit euismod. Pellentesque neque, sed ut volutpat. Ullamcorper in at nulla dignissim",
        services: "Manager",
    },
    {
        img: image,
        name: "Alice Smith",
        statement:
            "Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras aliquam. Diam tellus, amet, hac imperdiet. Tellus mi volutpat tellus, congue malesuada sit nisl donec a",
        services: "Manager",
    },
];



export const partnerAwardData = {
    partners: [
        { name: "Federal Government of Nigeria", image: FederalGovernment },
        { name: "Amahoro", image: Amahoro },
        { name: "Plateau State Microfinance Development Agency (PLASMIDA)", image: Plasmida },
        { name: "Western Union Foundation", image: WesternUnion },
        { name: "Watson Institute USA", image: WatsonInstitute },
        { name: "ECOWAS", image: Ecowas },
        { name: "Energy Globe", image: EnergyGlobe },
        { name: "Ariel", image: Ariel }
      ],
      awards: [
        { title: "Energy Globe National Award", year: 2022, image: NationalWinner },
        { title: "Most Innovative Tech Environmental Solutions", year: 2022, organization: "Alphablue Foundation", image: Awards },
        { title: "Startup Award", year: 2021, organization: "ECOWAS", image: Ecowas },
        { title: "Unsung Heroes Award", year: 2019, image: Awards },
        { title: "National MSMEs Award of Excellence in Technology Innovation", year: 2019, image: Awards },
        { title: "The Future Awards Africa Prize for Technology", year: 2019, image: Awards }
      ]

  };
  