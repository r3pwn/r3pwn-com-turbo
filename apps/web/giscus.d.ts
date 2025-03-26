import { HTMLAttributes } from "react";

interface GiscusWidgetAttributes extends HTMLAttributes<HTMLElement> {
  id?: string;
  host?: string;
  repo: `${string}/${string}`;
  repoid: string;
  category?: string;
  categoryid?: string;
  mapping: import("./components/blocks/giscus-comments/types").Mapping;
  term?: string;
  theme?: import("./components/blocks/giscus-comments/types").Theme;
  strict?: import("./components/blocks/giscus-comments/types").BooleanString;
  reactionsenabled?: import("./components/blocks/giscus-comments/types").BooleanString;
  emitmetadata?: import("./components/blocks/giscus-comments/types").BooleanString;
  inputposition?: import("./components/blocks/giscus-comments/types").InputPosition;
  lang?: import("./components/blocks/giscus-comments/types").AvailableLanguage;
  loading?: import("./components/blocks/giscus-comments/types").Loading;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "giscus-widget": GiscusWidgetAttributes;
    }
  }
}
