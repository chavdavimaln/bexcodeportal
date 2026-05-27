// Reclaim.jsx
import ReclaimForm from "../../Components/Forms/ReclaimForm";

const Reclaim = () => {

    return (
        <section className="relative w-full flex items-center px-6 2xl:px-14 md:px-12 py-10 md:py-14 overflow-hidden">
            <div className="w-full bg-[#EA3C26] rounded-[24px] sm:rounded-[32px] lg:rounded-[50px] px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12 md:py-14">

                {/* Title */}
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="common-section-title !text-[#fff]">
                        Ready to Reclaim Your Time?
                    </h2>
                </div>

                {/* Form */}
                <ReclaimForm ></ReclaimForm>

            </div>
        </section>
    );
};

export default Reclaim;