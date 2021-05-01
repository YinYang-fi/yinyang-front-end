import useFarming from "hooks/useFarming";
import React from "react";
import styled from "styled-components";
import { Box, Button, Notice, NoticeContent, NoticeIcon, Spacer } from "react-neu";


const OutdatedNotice: React.FC = () => {
    const { onUpdateAccount } = useFarming()
  return (
    <Notice>
      <NoticeIcon><span role="img" aria-label="gift">🎁</span></NoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>You are out of date on potential rewards!</span>
          <Box flex={1} />
          <Spacer size="sm" />
          <Button size="sm" text="Update" onClick={onUpdateAccount} />
        </StyledNoticeContentInner>
      </NoticeContent>
    </Notice>
  );
};

const StyledNoticeContentInner = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export default OutdatedNotice;
