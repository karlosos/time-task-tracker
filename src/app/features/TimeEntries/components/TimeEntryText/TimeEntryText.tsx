export const TimeEntryText: React.FC<{ timeEntryText: string }> = ({
  timeEntryText,
}) => {
  const pattern = /(DX1-\w+)/;
  const jiraInstanceLink = `https://jiradc2.ext.net.nokia.com/browse`;

  const timeEntryTextWithLinks = timeEntryText
    .split(pattern)
    .map((slice: string, id) => {
      if (slice.match(pattern)) {
        return (
          <a
            key={id}
            href={`${jiraInstanceLink}/${slice}`}
            className="text-indigo-600 font-medium text-base hover:underline"
          >
            {slice}
          </a>
        );
      } else {
        return slice;
      }
    });

  return (
    <div
      className="whitespace-nowrap text-ellipsis overflow-hidden font-medium text-base text-neutral-800"
      title={timeEntryText}
    >
      {timeEntryTextWithLinks}
    </div>
  );
};
