import React, { useMemo } from "react";

import { Box, Card, CardContent, Emoji } from "react-neu";
import { useLocation } from "react-router-dom";

import Page from "components/Page";
import PageHeader from "components/PageHeader";

import Question from "./components/Question";
import addresses from "constants/tokenAddresses";
import { startBlock } from "constants/constants";

const FAQ: React.FC = () => {
  const { busd, wbnb, v1, v2 } = addresses;

  const { pathname } = useLocation();
  const pathArr = pathname.split("/");

  const activeSlug = useMemo(() => {
    if (pathArr.length > 2) {
      return pathArr[2];
    }
  }, [pathArr]);

  return (
    <Page>
      <PageHeader
        icon="📖"
        subtitle="Learn about YIN, YANG and ZEN"
        title="FAQ"
      />
      <Box maxWidth={"1024px"}>
        <Card>
          <CardContent>
            <Question
              active={activeSlug === "yinyang-protocol"}
              question="What is the YinYang protocol?"
              slug="yinyang-protocol"
            >
              <span>
                YinYang is a <b>Decentralized Autonomous Organization</b> that
                uses a tax mechanism on{" "}
                <a
                  href={
                    "https://exchange.pancakeswap.finance/#/swap?outputCurrency=" +
                    v2.yin
                  }
                >
                  $YIN
                </a>{" "}
                and{" "}
                <a
                  href={
                    "https://exchange.pancakeswap.finance/#/swap?outputCurrency=" +
                    v2.yang
                  }
                >
                  $YANG
                </a>{" "}
                to raise funds. During each epoch (which lasts 1 day), users
                vote for a token in the <a href="/#/governance">Govern</a>{" "}
                section by burning their{" "}
                <a
                  href={
                    "https://exchange.pancakeswap.finance/#/swap?outputCurrency=" +
                    v2.zen
                  }
                >
                  $ZEN
                </a>{" "}
                tokens. During the next epoch, the treasury can be harvested :
                the token which has the most voices is bought with tokens
                collected from taxes. The tokens bought are then split between
                users who burned{" "}
                <a
                  href={
                    "https://exchange.pancakeswap.finance/#/swap?outputCurrency=" +
                    v2.zen
                  }
                >
                  $ZEN
                </a>
                , proportionnally to the amount burnt for the epoch. If the
                "Skip this epoch" option has the most voices, the treasury will
                not be harvested, the taxes are kept for the next epoch and
                voices spent are automatically transferred to the next epoch
                until a token is chosen.
              </span>
            </Question>

            <Question
              active={activeSlug === "yinyang-yinyang"}
              question="What are $YIN and $YANG"
              slug="yinyang-yinyang"
            >
              <span>
                Yin and Yang are deflationary reflective tokens, meaning that on
                each transaction, a 7% tax is taken:
                <ul>
                  <li>
                    <b>1%</b> is burnt.
                  </li>
                  <li>
                    <b>2%</b> is split between all holders (reflection).
                  </li>
                  <li>
                    <b>2%</b> is sent to the treasury.
                  </li>
                  <li>
                    <b>2%</b> are used to adjust the supplies of Yin and Yang:
                    if one has a higher supply than the other, it burns faster,
                    else, it automatically provides locked liquidity.
                  </li>
                </ul>
                If you wish to trade{" "}
                <a
                  href={
                    "https://exchange.pancakeswap.finance/#/swap?outputCurrency=" +
                    v2.yin
                  }
                >
                  $YIN
                </a>{" "}
                or{" "}
                <a
                  href={
                    "https://exchange.pancakeswap.finance/#/swap?outputCurrency=" +
                    v2.yang
                  }
                >
                  $YANG
                </a>
                , go to Pancakeswap and <b>set the slippage to at least 7%</b>{" "}
                (recommended is 7.5-8%).
              </span>
            </Question>

            <Question
              active={activeSlug === "treasury"}
              question="What is the token distribution of $YIN and $YANG?"
              slug="farms"
            >
              <span>
                There is a supply of <b>1,000,000</b> tokens for both Yin and
                Yang. Starting from{" "}
                <a
                  href={"https://www.bscscan.com/block/countdown/" + startBlock}
                >
                  block {startBlock}
                </a>
                , and for a duration of 4 weeks ,{" "}
                <a href="/#/genesis">Genesis farms</a> will be open. There, you
                can stake tokens to earn{" "}
                <a
                  href={
                    "https://exchange.pancakeswap.finance/#/swap?outputCurrency=" +
                    v2.yin
                  }
                >
                  $YIN
                </a>{" "}
                and{" "}
                <a
                  href={
                    "https://exchange.pancakeswap.finance/#/swap?outputCurrency=" +
                    v2.yang
                  }
                >
                  $YANG
                </a>
                . <b>100%</b> of the supply will be farmed through Genesis
                farms, there are no dev shares.
                <br />
                <br />
                The schedule for token distribution is the following:
                <ul>
                  <li>
                    During the first weeks, only{" "}
                    <a
                      href={
                        "https://exchange.pancakeswap.finance/#/swap?outputCurrency=" +
                        v1.yin
                      }
                    >
                      $YINV1
                    </a>
                    ,{" "}
                    <a
                      href={
                        "https://exchange.pancakeswap.finance/#/swap?outputCurrency=" +
                        v1.yang
                      }
                    >
                      $YANGV1
                    </a>
                    ,{" "}
                    <a
                      href={
                        "https://exchange.pancakeswap.finance/#/add/" +
                        v2.yin +
                        "/" +
                        busd
                      }
                    >
                      $YIN-BUSD LP
                    </a>{" "}
                    and{" "}
                    <a
                      href={
                        "https://exchange.pancakeswap.finance/#/add/" +
                        v2.yang +
                        "/" +
                        wbnb
                      }
                    >
                      $YANG-BNB LP
                    </a>{" "}
                    will be available for farming. This period is used to
                    compensate early YinYang investors for their loss due to the
                    bug in V1, while creating liquidity for V2 tokens. All pools
                    using V1 will have a 100% withdrawal fee: tokens deposited
                    are taken out of circulation to leave room for V2 tokens and
                    minimize confusion. Emission rates during this period are
                    set at 1/block.
                    <li>
                      During week 2 and 3, a lot of pools will open. The tokens
                      used for staking will be decided by our partnerships and
                      by the tokens who were voted for during the first week.{" "}
                      <b>Mobilize your community and vote for your token!</b>{" "}
                      Emission rates will be set at 1.5/block.
                    </li>
                    <li>
                      Finally, during the last week, fewer pools will open and
                      emission rates will be set at 1/block
                    </li>
                  </li>
                </ul>
              </span>
            </Question>

            <Question
              active={activeSlug === "yinyang-token"}
              question="What is $ZEN?"
              slug="yinyang-token"
            >
              <span>
                <a
                  href={
                    "https://pancakeswap.finance/swap?outputCurrency=" + v2.zen
                  }
                >
                  $ZEN
                </a>{" "}
                is the governance token for the YinYang protocol. It is
                inflationary (1 is produced each block) but it is only useful if
                it is burned. By burning their tokens, Zen holders have direct
                influence over the Zen Treasury. They can choose which token to
                buy for the next epoch.
              </span>
              <span>
                ZEN can be farmed by staking your Pancake LP tokens in the Zen
                Garden. At the beggining, only the following pools will be used:{" "}
                <a
                  href={
                    "https://exchange.pancakeswap.finance/#/add/" +
                    v2.yin +
                    "/" +
                    busd
                  }
                >
                  $YIN/$BUSD
                </a>
                ,
                <a
                  href={
                    "https://exchange.pancakeswap.finance/#/add/" +
                    v2.yang +
                    "/" +
                    wbnb
                  }
                >
                  $YANG/$BNB
                </a>
                ,
                <a
                  href={
                    "https://exchange.pancakeswap.finance/#/add/" +
                    v2.zen +
                    "/" +
                    busd
                  }
                >
                  $ZEN/$BUSD
                </a>{" "}
                and{" "}
                <a
                  href={
                    "https://exchange.pancakeswap.finance/#/add/" +
                    v2.zen +
                    "/" +
                    wbnb
                  }
                >
                  $ZEN/$BNB
                </a>
                .
              </span>
            </Question>

            <Question
              active={activeSlug === "treasury"}
              question="How does voting work?"
              slug="votes"
            >
              <span>
                During an epoch, users can burn Zen tokens to vote for a token.
                The number of voices given to the token is equal to the square
                root of the number of Zen tokens burnt. This is called{" "}
                <a href="https://en.wikipedia.org/wiki/Quadratic_voting">
                  Quadratic Voting
                </a>{" "}
                and is used so that every member of the community has influence
                on the vote result. However, since burning a lot of Zen will be
                expensive, the amount of tokens a user will be able to harvest
                depends linearly on the amount burnt. This ensures an engaging
                community while not preventing whales from getting involved.
              </span>
              <span>
                There will always be the option to "Skip the epoch", which if it
                has the most votes, will not spend the treasury and all users
                who voted for this epoch will still have voices to spend in the
                next epoch.
              </span>
            </Question>

            <Question
              active={activeSlug === "treasury"}
              question="When can I harvest my tokens?"
              slug="votes"
            >
              <span>
                If you voted for an epoch, you are entitled to a share of the
                tokens bought by the treasury at the next epoch, proportionnaly
                to the amount of ZEN burnt. The treasury first has to be
                harvested by one user, and all users will then receive their
                share in their account. You can claim these tokens in the{" "}
                <a href="/#/garden">Garden</a>. You do not have to harvest them
                immediately, as they will always be there waiting for you. You
                can for example vote for 10 epochs, and then harvest all the
                tokens you were entitled to. Once per epoch, a single user can
                trigger the harvest. Once harvested, tokens are deposited in
                each users' account.
              </span>
            </Question>

            <Question
              active={activeSlug === "treasury"}
              question="How does YinYang have a treasury?"
              slug="treasury"
            >
              <span>
                On each transaction of YIN and YANG, 2% are sent to the Zen
                Treasury. Tokens accumulate until the next epoch. Then, anyone
                can trigger a harvest. YIN and YANG held by the treasury are
                then sold for the token decided by the community. These tokens
                are then stored to be claimed by users who voted at any time.
              </span>
            </Question>

            <Question
              active={activeSlug === "treasury"}
              question="Wen moon?"
              slug="treasury"
            >
              <span>
                Soon <Emoji emoji="™️" />
              </span>
            </Question>
          </CardContent>
        </Card>
      </Box>
    </Page>
  );
};

export default FAQ;
