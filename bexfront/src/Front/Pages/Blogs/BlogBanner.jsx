// import react from 'react';
import bannerBg from "../../../Images/bb_2.png";

const BlogBanner = () => {
  return (
    <>
      <section className="relative w-full flex items-center px-6 2xl:pl-14 md:px-12 py-10 md:py-14 overflow-hidden social-dark"
      data-hide-scroll
      >
        <div className="flex flex-col md:flex-row min-[992px]:grid-cols-2 items-center gap-10">
          {/* left col content */}
          <div className="flex flex-col justify-center w-full md:w-[55%]">
            <h1 className="font-extrabold mb-6">
              <span className="text-[#3C3838] block text-[50px] md:text-[7.5vw] md:tracking-[-5px] tracking-[-2px] leading-[1.5em]">Insights that</span>
              <span className="text-[#EA3C26]  text-[32px] md:text-[4.6vw] md:tracking-[-3px] tracking-[-2px]">earn back your time.</span>
            </h1>
          </div>
          {/* right col image */}
          <div className="relative w-full md:w-[45%]">
            <img src={bannerBg} alt="Banner Background" className="w-full" />            
          </div>
        </div>
      </section>
    </>
  );
};
export default BlogBanner;