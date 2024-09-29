import { NavigationData, Page } from "@repo/payload-common/types";
import { getClient } from "./apolloProvider";
import { gql } from "@apollo/client";

const { CMS_HOST } = process.env;

type AbridgedPageData = {
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
};

type Breadcrumb = {
  label: string;
  url: string;
};

const GET_PAGE_LIST = gql`
  query {
    Pages {
      docs {
        title
        subtitle
        breadcrumbs {
          url
          label
        }
      }
    }
  }
`;

export const getPageList = async () => {
  const { data } = await getClient().query({
    query: GET_PAGE_LIST,
  });
  return (data.Pages.docs as AbridgedPageData[]).map((page) => ({
    ...page,
    url: page.breadcrumbs.at(-1)?.url || "/404",
  }));
};

export const getPageBySlug = async (id: string) => {
  const res = await fetch(`${CMS_HOST}/api/page-details/${id}`);
  return (await res.json()) as Page;
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
