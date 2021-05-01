import React from "react";
import { Switch, SwitchButton } from "react-neu";

import useVersion from "hooks/useVersion";

const VersionSwitch: React.FC = () => {
  const { usingV2, switchVersion } = useVersion();

  return (
    <Switch>
      <SwitchButton active={!usingV2} onClick={switchVersion} round>
        V1
      </SwitchButton>
      <SwitchButton active={usingV2} onClick={switchVersion} round>
        V2
      </SwitchButton>
    </Switch>
  );
};

export default VersionSwitch;
