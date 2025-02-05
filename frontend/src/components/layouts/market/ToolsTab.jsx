import { MarketToolIcons } from "@/components/icons";

export default function ToolsTab({ isVisible }) {
  return (
    <div className={`mt-4 ${!isVisible ? "hidden" : ""}`}>
      <div className="grid gap-2 grid-cols-[repeat(auto-fit,_minmax(80px,1fr))]">
        <article className="flex flex-col justify-center gap-2 border dark:border-light-gray rounded-md p-2 w-full cursor-pointer transition-all hover:dark:bg-light-gray/50 hover:bg-light-gray/15">
          <MarketToolIcons.CrossIcon className="size-8 mx-auto" />
          <span className="inline-block text-center">Cross</span>
        </article>
        <article className="flex flex-col justify-center gap-2 border dark:border-light-gray rounded-md p-2 w-full cursor-pointer transition-all hover:dark:bg-light-gray/50 hover:bg-light-gray/15">
          <MarketToolIcons.TrendLineIcon className="size-8 mx-auto" />
          <span className="inline-block text-center">Trend Line</span>
        </article>
        <article className="flex flex-col justify-center gap-2 border dark:border-light-gray rounded-md p-2 w-full cursor-pointer transition-all hover:dark:bg-light-gray/50 hover:bg-light-gray/15">
          <MarketToolIcons.CursorArrowIcon className="size-8 mx-auto" />
          <span className="inline-block text-center">Arrow</span>
        </article>
      </div>
    </div>
  );
}
