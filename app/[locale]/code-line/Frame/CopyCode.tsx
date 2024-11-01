import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { useCallback, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

interface Props {
  code: string;
}

const CopyCode = (props: Props) => {
  const [copied, setCopied] = useState(false);

  const handleMouseOut = useCallback(() => {
    if (copied) {
      setCopied(false);
    }
  }, [copied]);

  return (
    <CopyToClipboard text={props.code} onCopy={() => setCopied(true)}>
      <Button
        variant={"outline"}
        size="sm"
        className="px-3 h-6"
        onMouseOut={handleMouseOut}
      >
        {copied ? (
          <>
            <CheckIcon className="h-4 w-4" />
            <span>{"Copied"} </span>
          </>
        ) : (
          <>
            <span>{"Copy"} </span>
            {/* <CopyIcon className="h-4 w-4" /> */}
          </>
        )}
      </Button>
    </CopyToClipboard>
  );
};

export default CopyCode;
