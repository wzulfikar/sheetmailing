import React from "react";
import upperFirst from "lodash/upperFirst";
import { renderTemplate } from "src/emails";

export default function PreviewMinimalist({ template }) {
  return <div dangerouslySetInnerHTML={{ __html: template }} />;
}

export async function getServerSideProps({ query }) {
  try {
    const { template, ...props } = query;
    const html = await renderTemplate(upperFirst(template), props);
    return {
      props: { template: html },
    };
  } catch (e) {
    if ((e as any).code != "MODULE_NOT_FOUND") {
      console.log("[ERROR] could not preview template:", e);
    }
    return { notFound: true };
  }
}
