import React from "react";
import { Box, Notice, NoticeContent, NoticeIcon, Spacer } from "react-neu";
import styled from "styled-components";

const BrokenNotice: React.FC = () => (
  <>
    <Notice>
      <NoticeIcon>
        <span role="img" aria-label="Warning">
          ⚠️
        </span>
      </NoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>
            An error in the contract prevents voter from harvesting their share.
            <br />
            Go to <a href="https://t.me/yinyang_community">Telegram</a> for more
            info.
            <br />
            <b>Use V2 instead!</b>
          </span>
          <Box flex={1} />
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

export default BrokenNotice;
