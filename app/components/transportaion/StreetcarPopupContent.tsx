import type { TStreetcarLine } from "~/types";
import StreetcarLine from "../StreetcarLine";

interface Props {
  lines?: TStreetcarLine[];
  line?: TStreetcarLine;
}

const StreetcarPopupContent = ({ line, lines }: Props) => {
  if (lines) {
    return (
      <>
        {lines.map((line) => {
          return (
            <StreetcarLine
              key={`popup-${line.number}`}
              line={line}
              className="text-xl"
            />
          );
        })}
      </>
    );
  }

  if (line) {
    return <StreetcarLine line={line} />;
  }

  return null;
};

export default StreetcarPopupContent;
