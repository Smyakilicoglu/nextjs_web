"use client";

import { useRevealer } from "@/hooks/useRevealer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { Cpu, Siren } from "lucide-react";
import Copy from "@/components/Copy";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { ChevronsRight } from "lucide-react";


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

type CardProps = {
  title: string;
  copy: string;
  index: number;
  total: number;
};


const Card: React.FC<CardProps> = ({ title, copy, index, total }) => {
  const cardBg =
    index === 0 ? "bg-[#fad3b0]" : index === 1 ? "bg-[#f5a36f]" : "bg-brand";

  let zIndexValue;
  if (index === 0) zIndexValue = 1; 
  else if (index === 1) zIndexValue = 3;
  else if (index === 2) zIndexValue = 4; 


  return (
    <div
      className={`card ${cardBg} p-6 mb-6 relative`}
      id={`card-${index + 1}`}
      style={{ zIndex: zIndexValue }}
    >
      <div className="card-inner">
        <div className="card-content">
          <h3 className="card-title text-2xl md:text-3xl font-bold mb-4">
            {title}
          </h3>
          <p className="card-copy text-base md:text-lg">{copy}</p>
        </div>
      </div>
    </div>
  );
};



export default function Home() {
  useRevealer();
  const cards = [
    {
      title: "Balerion Firması",
      copy: "Yeni web sitemiz, Balerion'un gücünü ve teknolojisini en iyi şekilde yansıtan bir platform oldu. Müşterilerimize sunduğumuz ürünleri detaylı ve etkileyici bir şekilde sergileyebilmemizi sağladı. Modern tasarımı ve kullanıcı dostu yapısıyla hem satışlarımızda artış hem de marka değerimizde büyük bir gelişme gördük. Proje süresince ekip, tüm taleplerimize hızlı ve yaratıcı çözümler sundu. Bu profesyonel iş birliği için ekibe teşekkür ediyoruz; Balerion'un vizyonuna yakışan bir site ortaya çıktı!"
    },
    {
      title: "Emsal Gayrimenkul",
      copy: "Tarvinina Yazılım Teknoloji ile çalışmak gerçekten etkileyiciydi. Emlak firmamıza sundukları yapay zeka özellikleri ve diğer yenilikçi çözümler bizi fazlasıyla memnun etti."
    },
    {
      title: "Tahsilate Firması",
      copy: "Yeni web sitemiz sayesinde müşterilerimize daha hızlı ve güvenilir bir hizmet sunabiliyoruz. Kullanıcı dostu tasarım ve modern özellikler, iş süreçlerimizi oldukça kolaylaştırdı. Süreç boyunca profesyonel bir ekiple çalışmak büyük bir ayrıcalıktı. Taleplerimizi anında anlayıp hayata geçirdiler. Web sitemiz tam anlamıyla markamızın ihtiyaçlarını karşılıyor ve müşterilerimizden de olumlu geri dönüşler alıyoruz. Bu başarılı çalışmadan dolayı ekibe teşekkür ederiz!"
    },

  ];


  useEffect(() => {
    const fotos = gsap.utils.toArray<HTMLImageElement>(".foto");

    fotos.forEach((foto) => {
      gsap.fromTo(
        foto,
        { scale: 0.8, opacity: 0 }, 
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: foto,    
            start: "top 80%",  
            end: "top 50%",     
            scrub: true,        
          },
        }
      );
    });
  }, []);


  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".kartlar");
      const images = gsap.utils.toArray<HTMLImageElement>(".kartlar img");
      const totalCards = cards.length;

      gsap.set(cards[0], { y: "0%", scale: 1, rotation: 0 });
      gsap.set(images[0], { scale: 1 });

      for (let i = 1; i < totalCards; i++) {
        gsap.set(cards[i], { y: "100%", scale: 1, rotation: 0 });
        gsap.set(images[i], { scale: 1 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".projeler-ana",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cards[i];
        const currentImage = images[i];
        const nextCard = cards[i + 1];
        const position = i;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.5,
            rotation: 10,
            duration: 1,
            ease: "none",
          },
          position
        );

        scrollTimeline.to(
          currentImage,
          {
            scale: 1.5,
            duration: 1,
            ease: "none",
          },
          position
        );

        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position
        );
      }
    },
  );

const container = useRef<HTMLDivElement>(null);

useGSAP(() => {
  const cards = gsap.utils.toArray<HTMLElement>(".card");
  if (cards.length < 2) return;
  const titleEls = cards.map(card => card.querySelector('.card-title') as HTMLElement);
  const titleHeight = titleEls[0] ? titleEls[0].offsetHeight : 60;
  const cardHeight = cards[0].offsetHeight;
  const overlap = cardHeight - titleHeight * 1;
  const totalScroll = (cards.length - 1) * overlap;

  ScrollTrigger.create({
    trigger: ".musterilerimiz",
    start: "top top",
    end: `+=${totalScroll}`,
    pin: true,
    scrub: true,
    pinSpacing: false,
  });

  cards.forEach((card, index) => {
    if (index === 0) return;
    gsap.to(card, {
      y: `-${index * overlap}px`,
      ease: "none",
      scrollTrigger: {
        trigger: ".musterilerimiz",
        start: "top top",
        end: `+=${totalScroll}`,
        scrub: true,
      },
    });
  });


gsap.to(".hero-img img", {
    y: 200, 
    ease: "none",
    scrollTrigger: {
      trigger: ".hero", 
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

});

  return ( 
    <ReactLenis root>
    <main ref={container} >
      <div className="revealer"></div>
      <section className="hero">
        <div className="hero-img">
          <img src="/hero3.jpeg" alt="Hero Image" className="w-full h-full object-cover"/>
        </div>
        <div className="hero-text">
          <Copy>
          <h1 className="text-[4.25rem] font-semibold tracking-[-0.1rem] leading-[1]">Tarvina</h1>
          <h2 style={{ fontFamily: "var(--font-qwitcher-bold)", fontSize: "70px", fontWeight: 500 }} className="text-neutral-800">İnovasyon ve Tasarımın Buluşma Noktası</h2>
          </Copy>
          <Copy>
          <p className="text-neutral-700">Dijital dönüşümünüzü hızlandıracak yenilikçi çözümler ve kişiselleştirilmiş teknolojiler.</p>
          </Copy>
        </div>
      </section>
      <section className="hizmetler flex justify-center items-center py-16">
       <div className="col max-w-md text-center">
        <Copy>
        <h2 className="text-[2rem] font-bold tracking-[-0.04rem] leading-[1.125] antialiased mb-5 text-brand">
          Garanti Ediyoruz
        </h2></Copy>
        <Copy>
        <p>
          Yenilikçi teknolojilerle iş süreçlerinizi güçlendiriyoruz. Modern çözümlerle verimliliğinizi artırmayı garanti ediyoruz.
        </p></Copy>
          <div className="flex justify-center gap-6 text-gray-700">
            <Cpu className="w-8 h-8" />
            <Siren className="w-8 h-8" />
          </div>
        </div>
      </section>
      <section className="hakkimizde grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-16">
        <div className="fotograflar flex justify-center md:justify-start">
        <img src="/robot2.png" className="foto max-w-[350px] h-auto object-cover" />        
        </div>
        <div className="text max-w-md mx-auto md:mx-0">
          <Copy>
          <h5 className="text-[2rem] font-bold tracking-[-0.04rem] leading-[1.125] antialiased mb-5 text-brand">Hakkımızda</h5>
          <h3 className="mt-5 mb-5" style={{ fontFamily: "var(--font-qwitcher-regular)", fontSize: "50px", fontWeight: 500}}>Tarvina Yazılım Teknolojileri ile Dijital Çözümler</h3>
          </Copy>
          <Copy>
          <p>Dijital çözümler geliştirme ve teknoloji tabanlı projelerle iş dünyasına değer katma misyonuyla hareket eden bir yazılım şirketidir. 
            Startuplar, özelleştirilmiş web siteleri ve mobil uygulamalar gibi dijital projelerle müşterilerine özel çözümler sunarak fark yaratır.</p></Copy>
        </div>
      </section>
      <section className="projeler-ana" >
        <Copy>
        <h2 className="text-[2rem] font-bold tracking-[-0.04rem] leading-[1.125] antialiased text-brand">Başarıyla Tamamlanmış Bazı Projeler</h2></Copy>
        <div className="kartlar-container">
          <div className="kartlar">
            <div className="tag">
              <p>Tarvina</p>
            </div>
            <img src="/tarvina_proje.png" alt="Tarvina" />
          </div>
          <div className="kartlar">
            <div className="tag">
              <p>Emsal</p>
            </div>
            <img src="/emsal_proje.png" alt="Emsal" />
          </div>
          <div className="kartlar">
            <div className="tag">
              <p>Tarvip</p>
            </div>
            <img src="/tarvip_proje.png" alt="Tarvip" />
          </div>
        </div>
        <Button className="text-brand hover:text-white hover:bg-brand mt-3 flex items-center gap-2">
          <Link href="/projeler" className="flex items-center gap-2">
            Projeler <ChevronsRight className="w-4 h-4"/>
          </Link>
        </Button>
      </section>
      <section className="vizyonumuz grid grid-cols-2 gap-10 items-center">
        <div className="text ml-10">
          <Copy useObserver delay={0} duration={0.5} stagger={0.05}>
          <h2 className="text-[2rem] font-bold tracking-[-0.04rem] leading-[1.125] antialiased mb-5 text-brand">Vizyonumuz</h2>
            <h3 style={{ fontFamily: "var(--font-qwitcher-bold)", fontSize: "50px", fontWeight: 500 }} className="text-neutral-600">Dijitalleşme çağında sınırları zorlayarak işletmelerin ihtiyaçlarına çözüm üreten ve teknolojiyi bir adım öteye taşıyan global bir teknoloji markası olmayı hedefliyoruz.</h3>
            <h6 className="text-lg mt-2">Bu doğrultuda:</h6>
            <ul className="list-disc list-inside space-y-1">
              <li>Dijital dönüşüm süreçlerini hızlandırıyoruz.</li>
              <li>Modern ve yenilikçi çözümler sunuyoruz.</li>
              <li>Teknolojiyi geleceğe taşıyan bir güç olarak görüyoruz.</li>
              <li>Kullanıcı odaklı yaklaşımlarla fark yaratıyoruz.</li>
              <li>Yerel ve global pazarlarda etkin çözümler üretiyoruz.</li>
              <li>Her sektöre özel, sürdürülebilir teknolojiler geliştiriyoruz.</li>  
            </ul>
          </Copy>
        </div>
        <div className="fotograflar">
            <img src="/foto1.webp" className="foto rounded-lg shadow-lg"/>
        </div>
      </section>
      <section className="misyonumuz grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-16">
        <div className="fotograflar">
            <img src="/foto2.png" className="foto rounded-lg shadow-lg"/>
          </div>
          <div className="text">
          <Copy useObserver delay={0} duration={0.5} stagger={0.05}>
          <h2 className="text-[2rem] font-bold tracking-[-0.04rem] leading-[1.125] antialiased mb-5 text-brand">Misyonumuz</h2>
            <h3 className="text-neutral-600" style={{ fontFamily: "var(--font-qwitcher-bold)", fontSize: "50px", fontWeight: 500 }}>İşletmelere ve girişimcilere dijital dönüşüm yolculuklarında rehberlik ederek, yenilikçi teknolojilerle büyümelerine katkı sağlamaktır. Fikirleri gerçeğe dönüştüren, etkili yazılım çözümleri sunan bir iş ortağıyız.</h3>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Startupları fikir aşamasından ürün aşamasına taşımak.</li>
              <li>Müşterilere, özelleştirilmiş ve etkili yazılım çözümleri sunmak.</li>
              <li>Dijital dönüşüm süreçlerinde işletmelere rehberlik ederek yenilikçi teknolojileri iş dünyasıyla buluşturmak.</li>
              <li>Kullanıcı odaklı yaklaşımlarla fark yaratıyoruz.</li>
              <li>İşletmelere rekabet avantajı sağlayan teknolojik altyapılar geliştirmek.</li>
            </ul>
          </Copy>
        </div>
      </section>
      <section className="musterilerimiz">
        <div className="col">
          <Copy useObserver>
          <h2 className="text-[2rem] font-bold tracking-[-0.04rem] leading-[1.125] antialiased flex justify-center mb-5 text-brand">Müşterilerimiz ne diyor</h2>
          </Copy>
        </div>
        <div className="col">
          {cards.map((card, index) => (
            <Card key={index} {...card} index={index} total={cards.length} />
          ))}
        </div>
      </section>
    </main>
    </ReactLenis>
  );

}


