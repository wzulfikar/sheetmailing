import cx from "classnames";

import type { TreeRoute } from "./hooks/usePreviewTree";

type ClientViewProps = {
  treeRoutes?: TreeRoute[];
  cursor: number;
  navigate: (nextCursor: number | ((current: number) => number)) => void;
  previewText?: PreviewIndexResponseBody["previewText"];
};

const ClientView: React.FC<ClientViewProps> = ({
  treeRoutes,
  cursor,
  navigate,
  previewText,
}) => {
  return (
    <div
      className="py-4 px-3 text-sm outline-none text-white"
      tabIndex={1}
      role="listbox"
    >
      <h2 className="font-bold text-2xl pt-4 pb-4 mx-3 border-b border-dotted border-gray-600">
        Emails
      </h2>
      {treeRoutes?.map((route, i) => {
        const isCursor = i === cursor;
        return route.level !== 2 ? null : (
          <div
            key={route.path}
            role="option"
            aria-selected={isCursor}
            aria-label={`${route.previewClass} - ${route.previewFunction}`}
            className={cx("rounded-2xl cursor-pointer", {
              "pl-1": route.level === 2,
              "bg-blue text-black -mt-px pt-px": isCursor,
              "hover:bg-neutral-900 hover:-mt-px hover:pt-px": !isCursor,
            })}
            onClick={() => navigate(i)}
          >
            <div
              className={cx("py-4 mx-3 border-b border-dotted", {
                "border-gray-600 hover:border-transparent": !isCursor,
                "border-transparent": isCursor,
              })}
            >
              <div className="font-bold">{route.previewClass}</div>
              <div className="pb-px">{route.previewFunction}</div>
              <div
                className={cx("line-clamp-2 leading-tight", {
                  "text-gray-300": !isCursor,
                  "text-gray-600": isCursor,
                })}
              >
                {previewText && previewText[route.path]}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClientView;
