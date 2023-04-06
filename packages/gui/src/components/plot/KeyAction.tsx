import type { KeyData } from '@bpx-network/api';
import { Trans } from '@lingui/macro';
import { Delete as DeleteIcon, Visibility as VisibilityIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, Typography, ListItemIcon } from '@mui/material';
import React, { useCallback, useState } from 'react';
import {
  Flex,
  MenuItem,
  More,
  useOpenDialog
} from '@bpx-network/core';
import KeyDetailDialog from './KeyDetailDialog';
import KeyRenameDialog from './KeyRenameDialog';
import KeyDeleteDialog from './KeyDeleteDialog';

export type KeyActionProps = {
  keyData: KeyData;
};

export default function KeyAction(props: KeyActionProps) {
  const {
    fingerprint: { fingerprint },
  } = props;
  
  function handleShowKey() {
    openDialog(<KeyDetailDialog fingerprint={fingerprint} />);
  }

  function handleRename() {
    await openDialog(<KeyRenameDialog fingerprint={fingerprint} />);
  }

  async function handleDeletePrivateKey() {
    await openDialog(<KeyDeleteDialog fingerprint={fingerprint} />);
  }

  return (
    <More>
      <MenuItem onClick={handleRename} close>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <Typography variant="inherit" noWrap>
          <Trans>Rename</Trans>
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleShowKey} close>
        <ListItemIcon>
          <VisibilityIcon />
        </ListItemIcon>
        <Typography variant="inherit" noWrap>
          <Trans>Details</Trans>
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleDeletePrivateKey} close>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <Typography variant="inherit" noWrap>
          <Trans>Delete</Trans>
        </Typography>
      </MenuItem>
    </More>
  );
}
