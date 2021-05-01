import React, { useCallback, useState, useMemo } from "react";
import { Line } from "rc-progress";
import numeral from "numeral";
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
  Separator,
  Spacer,
  Card,
  CardContent,
} from "react-neu";

import styled from "styled-components";

import useGovernance from "hooks/useGovernance";
import useToken from "hooks/useToken";
import useBalances from "hooks/useBalances";

import { Proposal } from "../../../contexts/Governance/types";
import Split from "components/Split";
import TokenInput from "components/TokenInput";
import { NULL_ADDR } from "constants/tokenAddresses";
import usePrices from "hooks/usePrices";

interface VoteModalProps extends ModalProps {
  prop: Proposal;
}

const VoteModal: React.FC<VoteModalProps> = ({ prop, isOpen, onDismiss }) => {
  const { onVote } = useGovernance();
  const { name, symbol, BNBPoolDepth } = useToken(prop.token);
  const { prices } = usePrices()
  const { zenBalance } = useBalances();
  const { isVoting } = useGovernance();

  const [tokenAmount, setTokenAmount] = useState<number>();

  const handleVoteClick = useCallback(async () => {
    if (!tokenAmount) return;
    onVote(prop.token, tokenAmount || 0);
    if (onDismiss) onDismiss();
  }, [onVote, onDismiss, prop, tokenAmount]);

  const percentVoices = useMemo(() => {
    const voices = Math.sqrt(tokenAmount || 0);
    return prop.totalVoices
      ? ((prop.voices + voices) / (prop.totalVoices + voices)) * 100
      : voices > 0
      ? 100
      : 0;
  }, [tokenAmount, prop]);
  const percentShares = useMemo(() => {
    const shares = Number(tokenAmount || 0);
    return prop.totalShares
      ? (100 * (prop.shares.valueOf() + shares.valueOf())) /
          (prop.totalShares + shares)
      : shares > 0
      ? 100
      : 0;
  }, [tokenAmount, prop]);

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Token Proposition" />
      <ModalContent>
        <Split>
          <CardContent>
            <StyledTitle>{name || "Unknown token"}</StyledTitle>
            <Spacer size="sm" />
            <StyledSubtitle>${symbol || "???"}</StyledSubtitle>
          </CardContent>
          <Card>
            <CardContent>
              Statistics
              <Separator />
              <Spacer size="sm" />
              <StyledLineHolder>
                Voices: {numeral(percentVoices).format("0.00a") + "%"}
                <Line
                  percent={percentVoices}
                  strokeWidth={1}
                  strokeColor="#ec0e5c"
                />
              </StyledLineHolder>
              <Spacer size="sm" />
              <StyledLineHolder>
                Shares: {numeral(percentShares).format("0.00a") + "%"}
                <Line
                  percent={percentShares}
                  strokeWidth={1}
                  strokeColor="#ec0e5c"
                />
              </StyledLineHolder>
            </CardContent>
          </Card>
        </Split>
        <Spacer size="md" />
        {BNBPoolDepth === 0 && (
          <>
            <StyledSubtitleError>
              Can't vote for this token, there is no BNB pool on Pancakeswap!
            </StyledSubtitleError>
            <Spacer />
          </>
        )}
        {(BNBPoolDepth || 0) > 0 && (
          <>
            <StyledSubtitleInfo>
              There is {numeral((BNBPoolDepth || 0) * (prices.wbnb || 0)).format("0.00a")}$ in this pool.<br /> Low values means more slippage for the treasury.
            </StyledSubtitleInfo>
          </>
        )}
        <TokenInput
          value={tokenAmount?.toString() || ""}
          symbol="ZEN"
          max={zenBalance?.toString() || "0"}
          onChange={(e: any) => setTokenAmount(e.target.value)}
          onSelectMax={() => setTokenAmount(zenBalance?.toNumber() || 0)}
        />
        <StyledSubtitleError>Tokens used will be burnt.</StyledSubtitleError>
      </ModalContent>
      <ModalActions>
        <Button
          size="sm"
          href={"https://bscscan.com/address/" + prop.token}
          text="View On BSCScan"
          variant="tertiary"
        />
        <Button onClick={onDismiss} text="Cancel" variant="tertiary" />
        <Button
          disabled={
            isVoting || (prop.token !== NULL_ADDR ? !BNBPoolDepth : false)
          }
          onClick={handleVoteClick}
          text="Vote"
        />
      </ModalActions>
    </Modal>
  );
};

const StyledTitle = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const StyledSubtitle = styled.h2`
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  opacity: 0.66;
  padding: 0;
`;

const StyledSubtitleError = styled.h2`
  color: #cf3434;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  opacity: 0.66;
  padding: 0;
`;

const StyledSubtitleInfo = styled.h2`
  color: #343434;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  opacity: 0.66;
  padding: 0;
`;

const StyledLineHolder = styled.div`
  width: 80%;
  font-size: 14px;
  display: flex;
  flex-direction: column;
`;

export const StyledParams = styled.div`
  overflow: auto;
  height: 250px;
`;

export default VoteModal;
