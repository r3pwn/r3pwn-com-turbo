import { NavigationData, PageData } from "@repo/payload-common/types";
import { getClient } from "./apolloProvider";
import { gql } from "@apollo/client";

const { CMS_HOST } = process.env;

type AbridgedPageData = {
  title: string;
  url: string;
  postedDate: string;
};

export const getPageList = async () => {
  const res = await fetch(`${CMS_HOST}/api/pages/list`);
  return (await res.json()) as AbridgedPageData[];
};

export const getPageBySlug = async (slugs: string[]) => {
  const res = await fetch(`${CMS_HOST}/api/pages/by-slug/${slugs.join(",")}`);
  return (await res.json()) as PageData;
};

const GET_NAVIGATION = gql`
  query {
    Navigation {
      header {
        navigationLinks {
          label
          target {
            breadcrumbs {
              url
            }
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

export const getNavigation = async () => {
  const { data } = await getClient().query({
    query: GET_NAVIGATION,
  });
  return data.Navigation as NavigationData;
};
