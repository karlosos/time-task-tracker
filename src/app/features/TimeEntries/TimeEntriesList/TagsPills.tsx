import { useRef, useState } from "react";
import { useCopyToClipboard } from "../../../hooks/useCopyToClipboard";
import { useFindPatternsInText } from "../components/TimeEntryText/useFindPatternsInText";
import { ClipboardCheckIcon, ClipboardCopyIcon } from "lucide-react";

export const TagsPills = ({ text }: { text: string }) => {
  const tags = useFindPatternsInText(text);

  return (
    <div className="flex flex-row gap-1 text-[10px] leading-none">
      {tags.map((tag) => (
        <TagPill tag={tag} />
      ))}
    </div>
  );
};

const TagPill = ({ tag }: { tag: { url: string; text: string } }) => {
  const [_, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    await copy(tag.text);
    setIsCopied(true);
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      setIsCopied(false);
      timerId.current = null;
    }, 500);
  };

  return (
    <span className="flex flex-row gap-1 items-center bg-neutral-100 rounded-sm border text-indigo-600 font-medium">
      <a
        className="pl-1.5 pr-0.5 py-0.5"
        href={tag.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        {tag.text}
      </a>
      <div
        className="bg-neutral-50 rounded-r-sm px-1 py-0.5 border-l border-l-neutral-200 h-full flex items-center duration-250"
        onClick={handleCopy}
      >
        {isCopied ? (
          <ClipboardCheckIcon className="w-3 h-3 text-neutral-600" />
        ) : (
          <ClipboardCopyIcon className="w-3 h-3 text-neutral-900" />
        )}
      </div>
    </span>
  );
};