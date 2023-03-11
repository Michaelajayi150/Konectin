import { CustomButton } from "../../../components/button";
import { Link } from "react-router-dom";
import { ResumeHeroImage } from "../../../assets";
import { FAQ, ResumeReview, SliderData } from "./resumeData";
import FAQSection from "./faq";
import TestimonialSection from "./testimonial";
import TipSection from "./tips";
import CTASection from "./cta";
import SliderSection from "./slider";
import HeroSection from "./hero";

function ResumeBuilder() {
  return (
    <main className="flex flex-col gap-2 bg-neutral-1000 text-neutral-100 relative">
      <HeroSection />
      <SliderSection data={SliderData} />
      <CTASection />
      <section className="w-11/12 mx-auto max-w-screen-2xl flex flex-col gap-16">
        <TipSection />
        <TestimonialSection data={ResumeReview} />
        <FAQSection data={FAQ} />
      </section>
    </main>
  );
}

export default ResumeBuilder;
