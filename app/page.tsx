import CanvasContainer from "@/features/experience/components/CanvasContainer";
import Hero from "@/component/Hero";
import BlendCreativity from "@/component/BlendCreativity";

export default function Home() {
  return (
    <main id="scroll-container" className="min-h-[600vh]">
      <CanvasContainer />
      <Hero />
      <BlendCreativity />
    </main>
  );
}
