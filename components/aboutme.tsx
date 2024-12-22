import Image from "next/image";
import ReactJs from "../public/assets/logos/reactjs.svg";
import Bootstrap5 from "../public/assets/logos/bootstrap5.svg";
import Tailwindcss from "../public/assets/logos/tailwindcss.svg";
import Wordpress from "../public/assets/logos/wordpress.svg";
import Typescript from "../public/assets/logos/typescript.svg";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRef } from "react";
import { RefreshCw } from "lucide-react";
import { useCanvas } from "../hooks/useCanvas";
import Section from "../components/Section";

const AboutMe = () => {
    const imageRef = useRef<HTMLImageElement>(null);
    const { canvasRef, showText, hasDrawn, resetCanvas } = useCanvas();

    return (
        <Section id="aboutme" className="dark:bg-neutral-950 ">
            <div className="flex flex-col container mx-auto">
                <div className="m-5">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl">Mathias Grondziel</h2>
                    <span>Développeur ReactJS et Wordpress Since 2022</span>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 mx-5 relative border-2 border-white">
                        <button
                            onClick={resetCanvas}
                            disabled={!hasDrawn}
                            className={`absolute top-4 right-4 z-30 p-2 rounded-full backdrop-blur-sm transition-all ${
                                hasDrawn ? "bg-white/10 hover:bg-white/20 cursor-pointer" : "bg-white/5 cursor-not-allowed"
                            }`}
                            title="Reset canvas">
                            <RefreshCw className={`w-6 h-6 ${hasDrawn ? "text-white" : "text-white/50"}`} />
                        </button>
                        <img
                            ref={imageRef}
                            src="https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="profil"
                            className="object-cover w-full h-[300px] md:h-[500px] absolute top-0 left-0"
                        />
                        <canvas ref={canvasRef} width={800} height={500} className="relative z-10 w-full h-[300px] md:h-[500px]" />
                        {showText && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-4xl font-bold pointer-events-none">
                                DRAW ME
                            </div>
                        )}
                    </div>

                    <div className="relative md:w-1/2 m-5 flex flex-col justify-between">
                        <span>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus suscipit quia, voluptatibus maiores labore perspiciatis, nulla
                            aspernatur eos dolore id saepe ratione exercitationem facere architecto sit sint culpa sed tempore. Officia, similique quia aliquam
                            nisi quasi repellat recusandae veniam voluptas neque ipsa rem deserunt animi laborum! Architecto, iure nobis sequi magnam repellat
                            esse sit ea rem, ut placeat corporis atque. Quos similique, soluta quae voluptate, fuga unde aliquam rerum veniam voluptatum
                            obcaecati minus sapiente. Consectetur error ducimus eveniet hic aspernatur, nam odit placeat numquam libero ad voluptatibus,
                            molestias similique possimus.
                        </span>
                        <div className="flex justify-between mt-5">
                            <Image src={ReactJs} alt="logo react" width={50} height={50} />
                            <Image src={Typescript} alt="logo react" width={50} height={50} />
                            <Image src={Tailwindcss} alt="logo react" width={50} height={50} />
                            <Image src={Wordpress} alt="logo react" width={50} height={50} />
                            <Image src={Bootstrap5} alt="logo react" width={50} height={50} />
                        </div>
                        <div className="flex justify-center pt-5">
                            <Button asChild>
                                <Link target="_blank" href="/">
                                    contact
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default AboutMe;
