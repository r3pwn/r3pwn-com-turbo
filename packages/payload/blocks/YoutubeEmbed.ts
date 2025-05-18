import type { Block } from "payload";

export const YoutubeEmbed: Block = {
  slug: "youtube-embed",
  interfaceName: "YoutubeEmbedBlock",
  fields: [
    {
      type: "text",
      name: "videoId",
      label: "Youtube Video ID",
      required: true,
    },
  ],
};
