import { Environment } from "@react-three/drei";
import YellowPillScrollAni from "./YellowPillScrollAni";
import WhitePillScrollAni from "./WhitePillScrollAni";
import ArmsModel from "./ArmsModel";
import ThreadMill from "./ThreadMill";

export default function Experience() {
  return (
    <>
      <Environment files="/environment/map.hdr" />

      <YellowPillScrollAni />
      <WhitePillScrollAni />
      <ArmsModel />
      <ThreadMill />
    </>
  );
}
