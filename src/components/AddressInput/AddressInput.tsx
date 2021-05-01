import React from "react";
import styled from "styled-components";

import { Button, Input, InputProps } from "react-neu";
import useToken from "hooks/useToken";
import useGovernance from "hooks/useGovernance";

interface AddressInputProps extends InputProps {
  onSelectMax?: () => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ onChange, value }) => {
  const token = useToken(value);
  const { userVote } = useGovernance();
  const addressPattern = /^0x[a-fA-F0-9]{40}$/i;
  const validValue =
    (value?.search(addressPattern) || 0) >= 0 && token.name !== "Unknown token" && userVote?.token !== value;

  return (
    <StyledAddressInput>
      <Input
        endAdornment={
          <StyledAddressAdornmentWrapper>
            <StyledSpacer />
            <div>
              <Button
                size="sm"
                text={validValue ? "✔️" : "❌"}
                variant="secondary"
                disabled
              />
            </div>
          </StyledAddressAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0x..."
        value={value}
      />
    </StyledAddressInput>
  );
};

const StyledAddressInput = styled.div``;

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`;

const StyledAddressAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export default AddressInput;
