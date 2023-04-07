import { useGetKeyQuery } from '@bpx-network/api-react';
import { Trans } from '@lingui/macro';
import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

import {
  AlertDialog,
  Flex,
  Loading,
} from '@bpx-network/core';

const StyledTypographyDD = styled(Typography)`
  word-break: break-all;
`;

export type KeyDetailDialogProps = {
  fingerprint: number;
};

export default function KeyDetailDialog(props: KeyDetailDialogProps) {
  const { fingerprint, ...rest } = props;

  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);
  const [showSeed, setShowSeed] = useState<boolean>(false);

  const { data: keyData, isLoading: isLoading } = useGetKeyQuery({
    fingerprint,
    includeSecrets: true,
  });
  
  console.log(keyData);

  function toggleShowPrivateKey() {
    setShowPrivateKey(!showPrivateKey);
  }

  function toggleShowSeed() {
    setShowSeed(!showSeed);
  }

  if (isLoading) {
    return (
      <AlertDialog
        title={<Trans>Loading details</Trans>}
        confirmTitle={<Trans>Close</Trans>}
        confirmVariant="contained"
        {...rest}
      >
        <Loading center />
      </AlertDialog>
    );
  }

  const { label } = keyData;

  return (
    <AlertDialog
      title={
        <Flex flexDirection="column">
          <Typography variant="h6" noWrap>
            {label || <Trans>Unnamed key</Trans>}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {fingerprint}
          </Typography>
        </Flex>
      }
      confirmTitle={<Trans>Close</Trans>}
      confirmVariant="contained"
      {...rest}
    >
      <Flex flexDirection="column" gap={3}>
        <Grid
          container
          component="dl" // mount a Definition List
          spacing={2}
        >
          <Grid item>
            <Typography component="dt" variant="subtitle2">
              <Trans>Public Key</Trans>
            </Typography>
            <StyledTypographyDD component="dd" variant="body2" color="textSecondary">
              {keyData.pk}
            </StyledTypographyDD>
          </Grid>
          <Grid item>
            <Typography component="dt" variant="subtitle2">
              <Trans>Farmer Public Key</Trans>
            </Typography>
            <StyledTypographyDD component="dd" variant="body2" color="textSecondary">
              {keyData.farmerPk}
            </StyledTypographyDD>
          </Grid>
          <Grid item>
            <Typography component="dt" variant="subtitle2">
              <Trans>Pool Public Key</Trans>
            </Typography>
            <StyledTypographyDD component="dd" variant="body2" color="textSecondary">
              {keyData.poolPk}
            </StyledTypographyDD>
          </Grid>
        </Grid>

        <Typography>
          <Trans>NEVER SHARE THESE WITH ANYONE</Trans>
        </Typography>

        <Flex flexDirection="column" gap={2}>
          <Flex flexDirection="column">
            <Typography component="dt" variant="subtitle2">
              <Trans>Secret Key</Trans>
            </Typography>
            <StyledTypographyDD component="dd" variant="body2" color="textSecondary">
              {showPrivateKey ? (
                keyData.sk
              ) : (
                <Box borderTop="2px dotted" marginTop={1} marginBottom={1} height="1px" />
              )}
            </StyledTypographyDD>
            <Box>
              <Button onClick={toggleShowPrivateKey} variant="outlined">
                {showPrivateKey ? <Trans>Hide</Trans> : <Trans>Reveal</Trans>}
              </Button>
            </Box>
          </Flex>

          <Flex flexDirection="column">
            <Typography component="dt" variant="subtitle2">
              <Trans>Seed Phrase</Trans>
            </Typography>
            <StyledTypographyDD component="dd" variant="body2" color="textSecondary">
              {showSeed ? (
                keyData.seed ? (
                  keyData.seed
                ) : (
                  <Trans>No 24 word seed, since this key is imported.</Trans>
                )
              ) : (
                <Box borderTop="2px dotted" marginTop={1} marginBottom={1} height="1px" />
              )}
            </StyledTypographyDD>
            <Box>
              <Button onClick={toggleShowSeed} variant="outlined">
                {showSeed ? <Trans>Hide</Trans> : <Trans>Reveal</Trans>}
              </Button>
            </Box>
          </Flex>
        </Flex>

        <Grid item />
      </Flex>
    </AlertDialog>
  );
}