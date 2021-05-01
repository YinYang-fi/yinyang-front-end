import React from "react";

import { Box, Button, Notice, NoticeContent, NoticeIcon, Spacer } from "react-neu";
import styled from "styled-components";

const FarmsNotice: React.FC = () => {
  return (
    <Notice>
      <NoticeIcon><span role="img" aria-label="gift">🚜</span></NoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>Tenet farms are still running.</span>
          <Box flex={1} />
          <Spacer size="sm" />
          <Button size="sm" text="Yin Farm" href="https://bsc.tenet.farm/pool/detail?id=120" />
          <Spacer size="sm" />
          <Button size="sm" text="Yang Farm" href="https://bsc.tenet.farm/pool/detail?id=121" />
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

export default FarmsNotice;
