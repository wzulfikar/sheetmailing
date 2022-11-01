import React, { useState, useContext, useEffect } from "react";
import cx from "classnames";
import { useRouter } from "next/router";

import Header from "./Header";
import HotIFrame from "./HotIFrame";
import MjmlErrors from "./MjmlErrors";
import { hotkeysMap } from "./hooks/usePreviewHotkeys";
import IndexPane from "./IndexPane/IndexPane";
import usePreviewPath from "./hooks/usePreviewPath";
import { HamburgerContext } from "./HamburgerContext";
import CircleLoader from "./CircleLoader";

import MobileHeader from "./MobileHeader";
import HTMLLint from "./HtmlLint";

type Data = {
  preview: ShowPreviewResponseBody;
  previews: PreviewIndexResponseBody["previews"];
  previewText: PreviewIndexResponseBody["previewText"];
};

export type PreviewViewerProps = {
  initialData: Data;
};

const PreviewViewer: React.FC<PreviewViewerProps> = ({ initialData }) => {
  const { query } = useRouter();
  const { path, _extend } = query;

  const { previewFunction, previewClass } = usePreviewPath();
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const { hamburgerOpen } = useContext(HamburgerContext);
  const [fetching, setFetching] = useState(false);
  const [previewText, setPreviewText] = useState(null);

  const [customPreview, setCustomPreview] = useState<Data["preview"] | null>(
    null
  );

  const data = initialData;
  const { preview: initialPreview, previews } = data;

  if (previewText) {
    data.previewText = previewText;
  }

  console.log("aa:", data.previewText);

  const preview = customPreview || initialPreview;

  useEffect(() => {
    fetch("/api/previews/previewText")
      .then((res) => res.json())
      .then(({ previewText }) => setPreviewText(previewText));
  }, []);

  useEffect(() => {
    if (!path?.[0] || !window.location.search) return;

    const isCustomPreview = path?.[1] == "custom_preview";
    const extendPreview = _extend;

    setFetching(true);

    const params =
      isCustomPreview || extendPreview ? window.location.search : "";
    fetch(`/api${window.location.pathname}${params}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setCustomPreview(json.preview);
        }
      })
      .finally(() => {
        setFetching(false);
      });

    return () => {
      setFetching(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return (
    <div className="bg-black h-screen">
      <div
        className={cx(
          "left-pane absolute border-dotted border-r border-gray-600 w-full sm:w-[300px] sm:left-0 transition-all z-40 bg-black mt-[52px] sm:mt-0",
          {
            "opacity-100": hamburgerOpen,
            "opacity-0 sm:opacity-100 pointer-events-none sm:pointer-events-auto":
              !hamburgerOpen,
          }
        )}
      >
        <IndexPane previews={previews} previewText={data?.previewText} />
      </div>
      <div className="right-pane sm:left-[300px] sm:w-[calc(100vw-300px)] h-full flex flex-col">
        {!!preview?.errors?.length && <MjmlErrors errors={preview?.errors} />}
        <div className="sm:hidden">
          <MobileHeader title={previewFunction || previewClass || "Emails"} />
        </div>
        {preview?.html && !preview?.errors.length ? (
          <>
            <div className="hidden sm:block">
              <Header
                previewClass={previewClass as string}
                previewFunction={
                  previewFunction ? (previewFunction as string) : undefined
                }
                viewMode={viewMode}
                setViewMode={setViewMode}
                helpContent={
                  <div
                    className="text-xs w-[190px] space-y-2"
                    aria-label="hotkeys"
                  >
                    <div className="hotkey flex justify-between">
                      <span className="description">Toggle compact view</span>
                      <span className="character">{"`"}</span>
                    </div>
                    <div className="hotkey flex justify-between">
                      <span className="description">Desktop view</span>
                      <span className="character">
                        {hotkeysMap.viewModeDesktop}
                      </span>
                    </div>
                    <div className="hotkey flex justify-between">
                      <span className="description">Mobile view</span>
                      <span className="character">
                        {hotkeysMap.viewModeMobile}
                      </span>
                    </div>
                    <div className="hotkey flex justify-between">
                      <span className="description">HTML view</span>
                      <span className="character">
                        {hotkeysMap.viewModeHTML}
                      </span>
                    </div>
                    <div className="hotkey flex justify-between">
                      <span className="description">Next view mode</span>
                      <span className="character">
                        {hotkeysMap.viewModeNext}
                      </span>
                    </div>
                    <div className="hotkey flex justify-between">
                      <span className="description">Previous view mode</span>
                      <span className="character">
                        {hotkeysMap.viewModePrevious}
                      </span>
                    </div>
                    <div className="hotkey flex justify-between">
                      <span className="description">Toggle full screen</span>
                      <div>
                        <span className="character">&#8984;</span>
                        <span className="character">
                          {hotkeysMap.toggleFullScreen.split("+")[1]}
                        </span>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
            <div className="flex-1">
              <HotIFrame
                srcDoc={preview.html}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />
            </div>
            {!!preview?.htmlLint?.length && (
              <HTMLLint htmlLint={preview.htmlLint} />
            )}
          </>
        ) : (
          <div className="text-2xl grid h-screen place-items-center text-gray-600">
            No preview selected
          </div>
        )}
        {fetching && (
          <div className="loader-position">
            <CircleLoader />
          </div>
        )}
      </div>

      <style jsx>{`
        .left-pane,
        .right-pane {
          overflow: scroll;
          top: 0;
          bottom: 0;
        }
        .right-pane {
          position: relative;
          right: 0;
        }
        .character {
          text-transform: uppercase;
          line-height: 100%;
        }
        .character {
          color: #bbb;
          width: 24px;
          height: 24px;
          border: solid 1px #999;
          border-radius: 2px;
          text-align: center;
          margin-left: 8px;
          display: inline-block;
          line-height: 170%;
        }
        .fetch-indicator {
          z-index: 9999;
          height: 100px;
          width: 100px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          font-size: 48px;
          background-color: pink;
        }
        .loader-position {
          position: absolute;
          bottom: 24px;
          right: 24px;
        }
      `}</style>
    </div>
  );
};

export default PreviewViewer;
