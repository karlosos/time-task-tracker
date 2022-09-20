import { TimeEntryTextStyled } from "./TimeEntryText.style";

export const TimeEntryText: React.FC<{ timeEntryText: string }> = ({
  timeEntryText,
}) => {
  const pattern = /(DX1-\w+)/
  const jiraInstanceLink = `https://jiradc2.ext.net.nokia.com/browse`

  const timeEntryTextWithLinks = timeEntryText.split(pattern).map((slice: string, id) => {
    if (slice.match(pattern)) {
      return <a key={id} href={`${jiraInstanceLink}/${slice}`} className="text-[#7075E5] font-poppins font-medium text-[16px] hover:underline">{slice}</a>;
    } else {
      return slice;
    }
  });

  return (
    <TimeEntryTextStyled className="max-w-[350px] whitespace-nowrap text-ellipsis overflow-hidden font-poppins font-medium text-[16px] text-[#363942]" title={timeEntryText}>{timeEntryTextWithLinks}</TimeEntryTextStyled>
  );
};
