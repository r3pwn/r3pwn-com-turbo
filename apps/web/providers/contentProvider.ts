import { NavigationData, Page } from "@repo/payload-common/types";
import { getClient } from "./apolloProvider";
import { gql } from "@apollo/client";
import { unstable_cache } from "next/cache";

const { CMS_HOST } = process.env;

type AbridgedPageData = {
  title: string;
  url: string;
  updatedAt: string;
};

const GET_PAGE_LIST = gql`
  query {
    Pages {
      docs {
        title
        url
        updatedAt
      }
    }
  }
`;

export const getPageList = unstable_cache(
  async () => {
    const { data } = await getClient().query({
      query: GET_PAGE_LIST,
    });
    return data.Pages.docs as AbridgedPageData[];
  },
  ["pages"],
  { revalidate: 3600, tags: ["pages"] }
);

export const getPageByUrl = async (url: string) => {
  try {
    const res = await fetch(
      `${CMS_HOST}/api/page-details/${encodeURIComponent(url)}`
    );
    return (await res.json()) as Page;
  } catch {
    return null;
  }
};

const GET_NAVIGATION = gql`
  query {
    Navigation {
      header {
        navigationLinks {
          label
          target {
            url
          }
        }
      }
      footer {
        socialLinks {
          url
          icon
          ariaLabel
          openInNewTab
        }
        copyrightText
      }
    }
  }
`;

export const getNavigation = unstable_cache(
  async () => {
    const { data } = await getClient().query({
      query: GET_NAVIGATION,
    });
    return data.Navigation as NavigationData;
  },
  ["navigation"],
  { revalidate: 3600, tags: ["navigation"] }
);
