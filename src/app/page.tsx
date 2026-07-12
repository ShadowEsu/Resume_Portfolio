import { HomeHero } from "@/components/home/HomeHero";
import { WorkGallery } from "@/components/work/WorkGallery";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WorkGallery projects={projects} />
    </>
  );
}
