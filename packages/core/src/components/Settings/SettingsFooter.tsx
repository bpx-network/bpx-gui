import { Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import guiPackageJson from '../../../package.json';
import useAppVersion from '../../hooks/useAppVersion';
import Flex from '../Flex';

const { productName } = guiPackageJson;

const StyledRoot = styled(Flex)`
  padding: 1rem;
`;

export default function SettingsFooter() {
  const { version } = useAppVersion();

  return (
    <StyledRoot>
      <Typography color="textSecondary" variant="caption">
        {productName} {version}
      </Typography>
    </StyledRoot>
  );
}
