import Label from 'components/Label'
import React from 'react'
import { Emoji } from 'react-neu'
import styled from 'styled-components'

export interface ExpandableSectionButtonProps {
  onClick?: () => void
  expanded?: boolean
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const ExpandableSectionButton: React.FC<ExpandableSectionButtonProps> = ({ onClick, expanded }) => {
  return (
    <Wrapper aria-label="Hide or show expandable content" role="button" onClick={() => onClick ? onClick() : null}>
      <Label text={expanded ? 'Hide' : 'Details'} />
      {expanded ? <Emoji emoji="🔼"/> : <Emoji emoji="🔽"/>}
    </Wrapper>
  )
}

ExpandableSectionButton.defaultProps = {
  expanded: false,
}

export default ExpandableSectionButton