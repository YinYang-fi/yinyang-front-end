import React from "react";
import { Box, Button, Notice, NoticeContent, NoticeIcon, Spacer } from "react-neu";
import styled from "styled-components";

const HarvestReadyNotice: React.FC = () => (
  <>
    <Notice>
      <NoticeIcon><span role="img" aria-label="Harvest">🚜</span></NoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>You have tokens ready to be farmed!</span>
          <Box flex={1} />
          <Spacer size="sm" />
          <Button
            size="sm"
            text="Go to the garden"
            to="/garden"
            variant="secondary"
          />
        </StyledNoticeContentInner>
      </NoticeContent>
    </Notice>
    <Spacer />
  </>
);

const StyledNoticeContentInner = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export default HarvestReadyNotice;
