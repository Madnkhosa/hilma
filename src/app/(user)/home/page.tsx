import ProductCategory from "./homeComponents/ProductCategory";
import FitnessLife from "./homeComponents/FitnessLife";
import SectionTwoForCoach from "./homeComponents/SectionTwoForCoach";
import SectionFourUnitedStrength from "./homeComponents/SectionFourUnitedStrength";
import SectionThreeExploreRange from "./homeComponents/Section-Three-explore-range";
import Modal from "@/components/Modal";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    categoryId?: string;
  };
}) {
  const categoryId = searchParams?.categoryId || "";
  const envUrl=process.env.HOST_URL
  return (
    <>
    <Modal/>
      <div className="pt-16 md:pb-32 bg-[#090909] ">
        <FitnessLife />
      </div>
      <div className="absolute rounded-lg mt-[-30px] z-10  bg-[#ffff] md:w-[96%] w-full left-[50%] flex transform -translate-x-[50%]">
        <ProductCategory envUrl={envUrl} />
      </div>
      <div className="md:pt-[709px] pt-[689px] xs:pt-[1119px] sm:pt-[1066px] bg-[#2B343B] md:px-14 px-5 pb-8">
        <SectionTwoForCoach />
        <SectionThreeExploreRange categoryId={categoryId} />
        <SectionFourUnitedStrength />
      </div>
    </>
  );
}
