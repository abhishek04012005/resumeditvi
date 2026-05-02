import { StaticImageData } from "next/image";
import Resume1111Image from "../assets/resume/1111.png";
import Resume1112Image from "../assets/resume/1112.png";
import Resume1113Image from "../assets/resume/1113.png";
import Resume1114Image from "../assets/resume/1114.png";

export interface ResumeItem {
  id: number;
  slug: string;
  name: string;
  image: StaticImageData;
  type: "resume";
  originalPrice: number;
  discountPrice: number;
}

const resumeList: ResumeItem[] = [
  {
    id: 1,
    slug: "resume-1111",
    name: "Resume 1111",
    image: Resume1111Image,
    type: "resume",
    originalPrice: 201,
    discountPrice: 101,
  },
  {
    id: 2,
    slug: "resume-1112",
    name: "Resume 1112",
    image: Resume1112Image,
    type: "resume",
    originalPrice: 201,
    discountPrice: 101,
  },
  {
    id: 3,
    slug: "resume-1113",
    name: "Resume 1113",
    image: Resume1113Image,
    type: "resume",
    originalPrice: 201,
    discountPrice: 101,
  },
  {
    id: 4,
    slug: "resume-1114",
    name: "Resume 1114",
    image: Resume1114Image,
    type: "resume",
    originalPrice: 201,
    discountPrice: 101,
  },
];

export default resumeList;
