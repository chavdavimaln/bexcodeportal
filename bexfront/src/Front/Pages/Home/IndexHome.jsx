import Header from "../../Components/Header/Header";
import BannerHome from "./BannerHome";
import CapabilityBuckets from "./CapabilityBuckets";
import EngagementModels from "./EngagementModels";
import HowWeWork from "./HowWeWork";
import FAQs from "./FAQs";
import Footer from "../../Components/Footer/Footer";
import '../../Styles/CssPages/CssCapsule.css';
import Reclaim from "./Reclaim";
import { Helmet } from "react-helmet";

export default function Home() {
    return (
        <>
            <Helmet>
                <title>IT Service - BexCode Services</title>
                <meta
                    name="description"
                    content="From web &amp; app dev to DevOps and data, get dedicated engineers who own delivery — shipped on your timeline."
                />
            </Helmet>
            <Header></Header>
            <main>
                <BannerHome></BannerHome>
                <CapabilityBuckets></CapabilityBuckets>
                <EngagementModels></EngagementModels>
                <HowWeWork></HowWeWork>
                <Reclaim></Reclaim>
                <FAQs></FAQs>
            </main>
            <Footer></Footer>

        </>
    )
}