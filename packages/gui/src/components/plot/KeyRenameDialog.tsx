import type { KeyData } from '@bpx-network/api';
import { useDeleteLabelMutation, useSetLabelMutation } from '@bpx-network/api-react';
import { Trans, t } from '@lingui/macro';
import { Button, Dialog, DialogTitle, DialogContent, Alert, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  ButtonLoading,
  DialogActions,
  Flex,
  Form,
  Loading,
  TextField
} from '@bpx-network/core';

type FormData = {
  label: string;
};

export type KeyRenameDialogProps = {
  keyData: KeyData;
};

export default function KeyRenameDialog(props: KeyRenameDialogProps) {
  const { keyData } = props;
  
  const [deleteLabel] = useDeleteLabelMutation();
  const [setLabel] = useSetLabelMutation();
  const methods = useForm<FormData>({
    defaultValues: {
      label: keyData.label || '',
    },
  });
  
  const { fingerprint } = keyData;
  const { isSubmitting } = methods.formState;

  async function handleSubmit(values: FormData) {
    if (isSubmitting) {
      return;
    }

    const { label } = values;
    const newLabel = label.trim();

    if (keyData.label === newLabel) {
      return;
    }

    if (newLabel) {
      await setLabel({
        fingerprint,
        label: newLabel,
      }).unwrap();
    } else {
      await deleteLabel({
        fingerprint,
      }).unwrap();
    }
  }

  return (
    <Dialog>
      <Form methods={methods} onSubmit={handleSubmit} sx={{ flexGrow: 1 }} noValidate>
        <DialogTitle>
          <Trans>Rename key {fingerprint}</Trans>
        </DialogTitle>
        <DialogContent>
          <Flex flexDirection="column" gap={2}>
            <Typography>
              <Trans>
                This will permanently remove the key from your computer, make sure you have your mnemonic phrase
                backed up.
              </Trans>
            </Typography>
            <TextField
              name="label"
              size="small"
              disabled={!canSubmit}
              data-testid="KeyRenameDialog-label"
              inputProps={{
                maxLength: 64,
              }}
              autoFocus
              fullWidth
            />
          </Flex>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary">
            <Trans>Back</Trans>
          </Button>
          <ButtonLoading
            size="small"
            disabled={!canSubmit}
            type="submit"
            loading={!canSubmit}
            variant="outlined"
            color="secondary"
            data-testid="KeyRenameDialog-save"
          >
            <Trans>Save</Trans>
          </ButtonLoading>
        </DialogActions>
      </Form>
    </Dialog>
  );
}