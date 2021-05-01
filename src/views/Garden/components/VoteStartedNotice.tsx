import React from "react";
import { Box, Button, Notice, NoticeContent, NoticeIcon, Spacer } from "react-neu";
import styled from "styled-components";

const VoteStaredNotice: React.FC = () => (
  <>
    <Notice>
      <NoticeIcon><span role="img" aria-label="Vote">🗳️</span></NoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>Last vote expired, vote for the next token!</span>
          <Box flex={1} />
          <Spacer size="sm" />
          <Button
            size="sm"
            text="Vote"
            to="/governance"
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

export default VoteStaredNotice;
