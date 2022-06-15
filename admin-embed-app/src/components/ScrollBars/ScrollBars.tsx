import { ComponentType, MutableRefObject } from 'react';
import { FC } from 'react';
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars';
import { ViewProps, withStyles } from 'wiloke-react-core';

export interface ScrollBarsProps extends ScrollbarProps {
  innerRef?: MutableRefObject<Scrollbars | null>;
  css?: ViewProps['css'];
}

const ScrollbarsWithStyles = withStyles<any, ScrollbarProps>(Scrollbars as ComponentType);

export const ScrollBars: FC<ScrollBarsProps> = ({ css, children, hideTracksWhenNotNeeded = true, innerRef, ...rest }) => {
  return (
    <ScrollbarsWithStyles {...(rest as any)} ref={innerRef} css={css} hideTracksWhenNotNeeded={hideTracksWhenNotNeeded}>
      {children}
    </ScrollbarsWithStyles>
  );
};
