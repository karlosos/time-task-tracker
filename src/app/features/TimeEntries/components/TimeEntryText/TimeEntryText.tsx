import { useAppSelector } from "../../../../hooks";
import { RootState } from "../../../../store/store";

export const TimeEntryText: React.FC<{ timeEntryText: string }> = ({
  timeEntryText,
}) => {
  const patterns = useAppSelector(
    (state: RootState) => state.settings.patterns,
  );

  // Create a regular expression pattern that matches all the regex patterns from the input array
  const patternRegex = new RegExp(patterns.map(({ regex }) => regex).join("|"));

  // Split the input string into an array of text slices based on the regex pattern
  const textSlices = timeEntryText.split(patternRegex);

  // For each text slice, check if it matches any of the regex patterns in the input array
  const timeEntryTextWithLinks = textSlices.map((slice: string, id) => {
    // If the text slice is empty, return null
    if (!slice) {
      return null;
    }

    // Find the index of the regex pattern that matches the text slice
    const patternIndex = patterns.findIndex(({ regex }) =>
      slice.match(new RegExp(regex)),
    );

    if (patternIndex >= 0) {
      // If a matching regex pattern is found, create an anchor link with the URL
      const { url } = patterns[patternIndex];
      return (
        <a
          key={id}
          href={`${url}${slice}`}
          className="text-indigo-600 hover:underline"
        >
          {slice}
        </a>
      );
    } else {
      // If no matching regex pattern is found, return the original text slice
      return slice;
    }
  });

  return (
    <div
      className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-neutral-800"
      title={timeEntryText}
    >
      {timeEntryTextWithLinks}
    </div>
  );
};
