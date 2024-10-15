import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { Button } from "@mui/material";

import styles from "./Tabs.module.css";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  availableTabs: string[];
  extraClass?: string;
}

export const Tabs = ({
  value,
  onValueChange,
  availableTabs,
  extraClass,
}: TabsProps) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tabTextSize = useMemo(
    () =>
      screenWidth > 650
        ? { fontSize: 16 }
        : screenWidth > 375
        ? { fontSize: 14 }
        : { fontSize: 12 },
    [screenWidth]
  );

  return (
    <div className={classNames(styles.container, extraClass)}>
      {availableTabs.map((tab) => (
        <Button
          key={tab}
          sx={{
            color: "#848484",
            padding: "4px 12px",
            textTransform: "none",
            minWidth: "unset",
            ...tabTextSize,
            ...(value === tab
              ? {
                  border: "2px solid #f1e3e2",
                  borderRadius: "5px",
                }
              : {}),
          }}
          onClick={() => onValueChange(tab)}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};
