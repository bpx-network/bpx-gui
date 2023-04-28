import { Fingerprint } from '@bpx-network/api';
import { CardStep, Select, StateColor } from '@bpx-network/core';
import { t, Trans } from '@lingui/macro';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useWatch } from 'react-hook-form';

type Props = {
  step: number;
  fingerprints: any;
};

export default function PlotAddChooseFingerprint(props: Props) {
  const { step, fingerprints } = props;
  const fingerprint: Fingerprint | undefined = useWatch<Fingerprint>({ name: 'fingerprint' });
  
  console.log("Fingerprints");
  console.log(fingerprints);
  
  console.log("Fingerprint");
  console.log(fingerprint);

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
            <Select name="fingerprint" value={fingerprint} defaultValue={fingerprints[0].fingerprint}>
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
