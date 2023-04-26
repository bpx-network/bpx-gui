import { CardStep, Select, StateColor } from '@bpx-network/core';
import { t, Trans } from '@lingui/macro';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useWatch } from 'react-hook-form';

type Props = {
  step: number;
  fingerprints: any;
};

export default function PlotAddChooseFingerprint(props: Props) {
  const { step, fingerprints } = props;
  const fingerprint: string | undefined = useWatch<string>({ name: 'fingerprint' });

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
            <Select name="fingerprint" value={fingerprint}>
              {fingerprints.map((fp) => (
                <MenuItem
                  value={fp.fingerprint}
                  key={fp.fingerprint}
                >
                  {fp.fingerprint}
                  {fp.label && (
                    <>
                      ({fp.label})
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
