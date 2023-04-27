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
          The created plots will be permamently associated with the selected key. If you lose access to this key,
          you won't be able to use these plots to farm BPX anymore.
        </Trans>
      </Typography>

      <Grid container>
        <Grid xs={12} sm={10} md={8} lg={6} item>
          <FormControl variant="filled" fullWidth>
            <InputLabel required focused>
              <Trans>Fingerprint</Trans>
            </InputLabel>
            <Select name="fingerprintxdd" defaultValue={fingerprints[0].fingerprint}>
              {fingerprints.map((fp) => (
                <MenuItem
                  value={fp.fingerprint}
                  key={fp.fingerprint}
                >
                  {fp.fingerprint}
                  {fp.label && (
                    <>
                      &nbsp;({fp.label})
                    </>
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
