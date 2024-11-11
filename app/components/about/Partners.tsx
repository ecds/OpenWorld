import { Fragment } from "react/jsx-runtime";

const partners: Array<{
  name: string;
  link: string;
  logo: string;
  description: string;
}> = [
  {
    name: "Emory Center for Digital Scholarship (ECDS), Emory University",
    link: "https://ecds.emory.edu/",
    logo: "/images/LOGO_emory.png",
    description:
      "The Digital Visualization Lab of ECDS is a production focused entity that connects with various faculty projects and includes both graduate and undergraduate students from many departments and the professional schools that engage in learning in a production-focused environment. These students engage in work of the lab and many have contributed to the production of OpenWorld Atlanta and its proceeding development projects that was focused on the development of historical geodatabases and the continued effort of building historical geocoders. The Rose Library Special Collections Library, the Department of Environmental Sciences, and the Department of History, continue to play a role in the development of this project.",
  },
  {
    name: "Department of Information and Interaction Design, Yonsei University",
    link: "https://www.yonsei.ac.kr/",
    logo: "/images/LOGO_Yonsei.jpg",
    description:
      "ECDS is partnering with UI/UX design experts from Yonsei University's department of Creative Technology Management to develop an interactive website for the OpenWorld Atlanta project. The Yonsei team, lead by Dr. Younah Kang and Dr. Keeheon Lee, is helping to improve the user experience and accessibility of the interface. Funded by a collaborative grant from Yonsei's Frontier Lab and Emory's Halle Institute for Global Research, teams from Atlanta and Seoul have been able to visit their counterparts and work together in person.",
  },
];

export const Partners = () => {
  return (
    <>
      <p className="mb-6">
        The OpenWorld Atlanta project is part of a consortium of international
        scholars and practitioners who seek to transform historical-geographical
        data and knowledge of urban settlements, including their development and
        morphology, into innovative and accessible digital resources. This
        website provides a venue for sharing the methodologies that transform
        archival maps, data, and research into visualizations, interfaces, and
        interpretive commentaries. The members of the Urban Spatial History
        consortia engage in each other's projects from consultation to
        production to sharing resources with the aim of producing platforms and
        data sets that are open-access and open-source.
      </p>
      <div className="grid grid-cols-5 gap-4">
        {partners.map((partners) => {
          return (
            <Fragment key={partners.logo}>
              <div className="col-span-2 p-6">
                <img src={partners.logo} alt="" />
              </div>
              <div className="col-span-3">
                <h4 className="text-2xl">{partners.name}</h4>
                <p>{partners.description}</p>
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};
