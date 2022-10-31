import React from "react";
import { GetStaticProps, NextPage } from "next";
import { flatten } from "lodash";

import PreviewViewer, {
  PreviewViewerProps,
} from "src/mailing/components/PreviewViewer";
import { render } from "src/mailing/util/mjml";
import { getPreviewComponent, previewTree } from "src/mailing/util/previewTree";

type Params = { path: string[] };

export const getStaticPaths = async () => {
  let paths: {
    params: Params;
  }[] = [];

  const previews: [string, string[]][] = await previewTree();

  paths = flatten([
    [], // /previews
    ...previews.map((p) => [
      [p[0]], // /previews/previewClass
      ...p[1].map((previewFunction) => [p[0], previewFunction]), // /previews/previewClass/previewFunction
    ]),
  ]).map((path) => ({
    params: { path },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { path } = context.params as Params;
  const [previewClass, previewFunction] = path || [];

  let preview: ReturnType<typeof render> | null = null;
  if (previewClass && previewFunction) {
    const component = await getPreviewComponent(previewClass, previewFunction);
    if (!component) {
      console.log(
        `previewClass '${previewClass}' or previewFunction '${previewFunction}' not found, redirecting to home`
      );
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    preview = render(component);
  }

  return {
    props: { initialData: { previews: await previewTree(), preview } },
    revalidate: 1,
  };
};

const PreviewIndex: NextPage<PreviewViewerProps> = ({ initialData }) => {
  return <PreviewViewer initialData={initialData} />;
};

export default PreviewIndex;
