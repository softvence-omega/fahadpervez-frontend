import CommonWrapper from "@/common/CommonWrapper";
import PrimaryButton from "../reusable/PrimaryButton";

const Tools = () => {
  return (
    <div>
      <CommonWrapper>
        <div className=" py-10 md:py-16">
          {/* Left Content */}
          <div className=" text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4 md:mb-6 max-w-3xl mx-auto">
              Three powerful tools unlimited possibilities
            </h2>
            <p className="text-[#181818] max-w-2xl mx-auto mb-4 md:mb-6">
              Discover how our AI tools simplify content creation, making
              learning more efficient and tailored to your goals.
            </p>
            <PrimaryButton className="lg:px-8 lg:py-4">
              Get Started
            </PrimaryButton>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Tools;
