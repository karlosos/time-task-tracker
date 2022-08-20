import { TimeEntryTextStyled } from "./TimeEntryText.style";

export const TimeEntryText: React.FC<{ timeEntryText: string }> = ({
  timeEntryText,
}) => {
  const pattern = /(DX1-\w+)/
  const jiraInstanceLink = `https://jiradc2.ext.net.nokia.com/browse`

  const jiraId = timeEntryText.split(pattern).map((slice: string, id) => {
    if (slice.match(pattern)) {
      return <a key={id} href={`${jiraInstanceLink}/${slice}`}>{slice}</a>;
    } else {
      return slice;
    }
  });

  return (
    <TimeEntryTextStyled title={timeEntryText}>{jiraId}</TimeEntryTextStyled>
  );
};
