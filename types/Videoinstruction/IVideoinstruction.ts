import type { VideoinstructionId } from "~/types/Videoinstruction/type";

export interface IVideoinstruction {
  id: VideoinstructionId;
  title: string;
  platform: number;
  video_url: string;
}
