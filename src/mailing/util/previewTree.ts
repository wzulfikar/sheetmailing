import { JSXElementConstructor, ReactElement } from "react";

export async function previewTree() {
  let tree: [string, string[]][] = [];
  const previews = await import("src/emails/previews");
  for (const previewClass in previews) {
    let paths: string[] = [];
    for (const path in previews[previewClass]) {
      paths.push(previews[previewClass][path].name);
    }
    tree.push([previewClass, paths]);
  }
  return tree;
}

export async function getPreviewComponent(
  name: string,
  functionName: string
): Promise<ReactElement<any, string | JSXElementConstructor<any>> | undefined> {
  const previews = await import("src/emails/previews");
  const previewModule:
    | {
      [key: string]: () => ReactElement | undefined;
    }
    | undefined = previews[name as keyof typeof previews] as any;
  return previewModule?.[functionName]?.();
}
