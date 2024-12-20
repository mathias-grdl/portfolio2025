import Image from "next/image";
import ReactJs from "../public/assets/logos/reactjs.svg";
import Bootstrap5 from "../public/assets/logos/bootstrap5.svg";
import Tailwindcss from "../public/assets/logos/tailwindcss.svg";
import Wordpress from "../public/assets/logos/wordpress.svg";

const AboutMe = () => {
    return (
        <section id="aboutme" className="bg-dark h-full md:h-screen flex flex-col my-5 container mx-auto">
            <div className="m-5">
                <h2 className="text-3xl md:text-4xl lg:text-6xl">Mathias Grondziel</h2>
                <span>Développeur ReactJS et Wordpress Since 2022</span>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 mx-5">
                    <img
                        src="https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="profil"
                        className="object-cover w-full h-[300px] md:h-[500px]"
                    />
                </div>

                <div className="relative md:w-1/2 m-5">
                    <span>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus suscipit quia, voluptatibus maiores labore perspiciatis, nulla
                        aspernatur eos dolore id saepe ratione exercitationem facere architecto sit sint culpa sed tempore. Officia, similique quia aliquam nisi
                        quasi repellat recusandae veniam voluptas neque ipsa rem deserunt animi laborum! Architecto, iure nobis sequi magnam repellat esse sit
                        ea rem, ut placeat corporis atque. Quos similique, soluta quae voluptate, fuga unde aliquam rerum veniam voluptatum obcaecati minus
                        sapiente. Consectetur error ducimus eveniet hic aspernatur, nam odit placeat numquam libero ad voluptatibus, molestias similique
                        possimus.
                    </span>
                    <div className="flex justify-between mt-5">
                        <Image src={ReactJs} alt="logo react" width={50} height={50} />
                        <Image src={Bootstrap5} alt="logo react" width={50} height={50} />
                        <Image src={Tailwindcss} alt="logo react" width={50} height={50} />
                        <Image src={Wordpress} alt="logo react" width={50} height={50} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
