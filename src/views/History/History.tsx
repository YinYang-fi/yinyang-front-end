import React, { useMemo, useState } from "react";
import styled from "styled-components";
import {
  Container,
  Spacer,
  Card,
  CardContent,
  Surface,
  Separator,
  CardTitle,
  CardActions,
  Button,
} from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";

import useGovernance from "hooks/useGovernance";

import {
  ProposalEntry,
  StyledProposalContentInner,
} from "./components/Proposal";
import Split from "components/Split";
import SeparatorGrid from "./components/SeparatorWithCSS";
import Box from "./components/BoxWithDisplay";
import { StyledTitle } from "views/Garden/components/TokenHarvest/TokenHarvest";

const History: React.FC = () => {
  const { history } = useGovernance();

  const [pageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(0);

  const pagedHistory = useMemo(() => {
    setMaxPage(Math.floor((history?.length || 0) / pageSize));
    return history?.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  }, [history, currentPage, pageSize]);

  console.log(history)

  return (
    <Page>
      <PageHeader icon={"📚"} title="Vote History" />
      <Container>
        <Spacer />
        <Card>
          <CardTitle text="Past votes" />
          <CardContent>
            {pagedHistory && pagedHistory.length > 0 ? (
              <>
                <Box
                  display="grid"
                  alignItems="center"
                  paddingLeft={4}
                  paddingRight={4}
                  paddingBottom={1}
                  row
                >
                  <StyledProposalContentInner>
                    <SeparatorGrid
                      orientation={"vertical"}
                      stretch={true}
                      gridArea={"spacer0"}
                    />
                    <StyledDescriptionMain>Token name</StyledDescriptionMain>
                    <SeparatorGrid
                      orientation={"vertical"}
                      stretch={true}
                      gridArea={"spacer1"}
                    />
                    <StyledVoicesMain>Voices</StyledVoicesMain>
                    <SeparatorGrid
                      orientation={"vertical"}
                      stretch={true}
                      gridArea={"spacer2"}
                    />
                    <StyledSharesMain>Shares</StyledSharesMain>
                    <SeparatorGrid
                      orientation={"vertical"}
                      stretch={true}
                      gridArea={"spacer3"}
                    />
                    <StyledDateMain>Date</StyledDateMain>
                  </StyledProposalContentInner>
                </Box>
                <Spacer size="sm" />
                <Surface>
                  {pagedHistory.map((prop, i) => {
                    if (i === 0) {
                      return (
                        <ProposalEntry key={prop.epoch.valueOf()} prop={prop} />
                      );
                    } else {
                      return [
                        <Separator key={prop.epoch.valueOf() * 2} />,
                        <ProposalEntry
                          key={prop.epoch.valueOf()}
                          prop={prop}
                        />,
                      ];
                    }
                  })}
                </Surface>
              </>
            ) : (
              <StyledTitle>History has yet to be made</StyledTitle>
            )}
          </CardContent>
          <CardActions>
            <Split>
              <Box column alignItems="center">
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  text="Previous page"
                  variant="default"
                  disabled={currentPage === 0}
                />
              </Box>
              <Box column justifyContent="center" height={"100%"}>
                <StyledPageNumber>
                  {currentPage + 1}/{maxPage + 1}
                </StyledPageNumber>
              </Box>
              <Box column alignItems="center">
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  text="Next Page"
                  variant="default"
                  disabled={currentPage === maxPage}
                />
              </Box>
            </Split>
          </CardActions>
        </Card>
        <Spacer />
      </Container>
    </Page>
  );
};

export const StyledDescriptionMain = styled.span`
  font-weight: 600;
  display: grid;
  grid-area: desc;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledVoicesMain = styled.span`
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: voices;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledSharesMain = styled.span`
font-weight: 600;
margin-left: 5px;
margin-right: 5px;
display: grid;
grid-area: shares;
justify-content: center;
min-width: 67px;
@media (max-width: 768px) {
  flex-flow: column nowrap;
  align-items: flex-start;
}
`;

export const StyledDateMain = styled.div`
  font-weight: 600;
  display: grid;
  grid-area: date;
  margin-left: 10px;
  justify-content: center;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

const StyledPageNumber = styled.span`
  justify-content: center;
  display: flex;
  heigh: 100%;
`;

export default History;
