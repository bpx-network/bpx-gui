import { CardStep, Select, StateColor } from '@bpx-network/core';
import { t, Trans } from '@lingui/macro';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Typography } from '@mui/material';
import React, { useMemo } from 'react';

type Props = {
  step: number;
  fingerprints: any;
};

export default function PlotAddChooseFingerprint(props: Props) {
  const { step, fingerprints } = props;

  return (
    <CardStep step={step} title={<Trans>Choose Fingerprint</Trans>}>
      <Typography variant="subtitle1">
        <Trans>
          Depending on your system configuration, you may find that an alternative plotter produces plots faster than
          the default Chia Proof of Space plotter. If unsure, use the default Chia Proof of Space plotter.
        </Trans>
      </Typography>

      <Grid container>
        <Grid xs={12} sm={10} md={8} lg={6} item>
          <FormControl variant="filled" fullWidth>
            <InputLabel required focused>
              <Trans>Fingerprint</Trans>
            </InputLabel>
            <Select name="fingerprint">
              {fingerprints.map((fingerprint) => (
                <MenuItem
                  value={fingerprint.fingerprint}
                  key={fingerprint.fingerprint}
                >
                  {fingerprint.fingerprint}
                  {fingerprint.label && (
                    ({fingerprint.label})
                  )}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </CardStep>
  );
}
