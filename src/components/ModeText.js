import React, { memo } from "react";
import { Text } from "react-native";

const ModeText = () =>
  global.mode != "" ? (
    <Text
      style={{
        justifyContent: "center",
        textAlign: "center",
        color: "#9900cc",
        paddingTop: "5%",
      }}
    >
      {global.mode}
    </Text>
  ) : null;

export default memo(ModeText);
