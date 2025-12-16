/**
 * Certifications data - Single source of truth
 * Each item must have either credentialUrl or pdfPath (or both)
 */

export type Certification = {
  title: string;
  issuer: string;
  issued: string;
  expires?: string;
  credentialId?: string;
  credentialUrl?: string; // Official verification URL (preferred)
  pdfPath?: string;       // "/certificates/<file>.pdf" for local PDFs
  tag?: string;           // short label: "CUDA", "ML", "RCR", "DSA", etc.
};

export const certifications: Certification[] = [
  {
    title: "Fundamentals of Accelerated Computing with CUDA Python",
    issuer: "NVIDIA",
    issued: "Sep 2025",
    credentialId: "fxy9PAM8SDS_Q3KlOR6FiA",
    credentialUrl: "https://learn.nvidia.com/certificates?id=Rea58gHXRHeFoxpKM1gFhQ",
    tag: "CUDA",
  },
  {
    title: "Machine Learning Learning Plan",
    issuer: "AWS Training Online",
    issued: "Sep 2025",
    credentialId: "729fcdb8-f924-4389-ad77-83d277a526ac",
    pdfPath: "/certificates/6824cb6b-ffa4-4e05-bab8-101cf9a94458.pdf",
    tag: "ML",
  },
  {
    title: "Machine Learning Model Development - I",
    issuer: "Databricks",
    issued: "Sep 2025",
    pdfPath: "/certificates/2390_3_1211526_1757537705_Databricks - Generic.pdf",
    tag: "ML",
  },
  {
    title: "Machine Learning Model Development - II",
    issuer: "Databricks",
    issued: "Sep 2025",
    pdfPath: "/certificates/2395_3_1211526_1757628189_Databricks - Generic.pdf",
    tag: "ML",
  },
  {
    title: "Responsible Conduct of Research for Engineers",
    issuer: "CITI Program",
    issued: "Apr 2024",
    expires: "Apr 2028",
    credentialId: "62415719",
    credentialUrl: "https://www.citiprogram.org/verify/?w77b87b81-c510-4f25-846b-2c4df052118d-62415719",
    tag: "RCR",
  },
  {
    title: "Social and Behavioral Research - Basic/Refresher",
    issuer: "CITI Program",
    issued: "Apr 2024",
    expires: "Apr 2027",
    credentialId: "62415718",
    credentialUrl: "https://www.citiprogram.org/verify/?w03b2eb27-7560-4dc0-a234-c65ecdbe85ce-62415718",
    tag: "RCR",
  },
  {
    title: "Data Structures and Algorithms",
    issuer: "GeeksforGeeks",
    issued: "Oct 2022",
    credentialUrl: "https://media.geeksforgeeks.org/courses/certificates/c0a3c0bb9727322a3e274e277df43864.pdf",
    tag: "DSA",
  },
  {
    title: "React, NodeJS, Express & MongoDB - The MERN Fullstack Guide",
    issuer: "Udemy",
    issued: "Sep 2022",
    credentialUrl: "https://www.udemy.com/certificate/UC-f9bf0634-c5d8-4000-87ab-166b89c077c3/",
    tag: "Web",
  },
  {
    title: "2022 Complete Python Bootcamp From Zero to Hero in Python",
    issuer: "Udemy",
    issued: "Aug 2022",
    credentialUrl: "https://www.udemy.com/certificate/UC-91b5712d-6267-453f-abdc-a4458d1ecdb5/",
    tag: "Python",
  },
  {
    title: "Python for Data Science and Machine Learning Bootcamp",
    issuer: "Udemy",
    issued: "Aug 2022",
    credentialUrl: "https://www.udemy.com/certificate/UC-c13612b3-311d-44d1-a0b7-146fe7aa7188/",
    tag: "ML",
  },
  {
    title: "The Data Scientist's Toolbox",
    issuer: "Coursera",
    issued: "Nov 2020",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/GELQAGXD7KP8",
    tag: "DS",
  },
  {
    title: "Python Data Structures",
    issuer: "Coursera",
    issued: "Sep 2020",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/GDNDJE2JXNLJ",
    tag: "Python",
  },
  {
    title: "Programming for Everybody (Getting Started with Python)",
    issuer: "Coursera",
    issued: "Aug 2020",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/94UFF3SJZSVK",
    tag: "Python",
  },
];


