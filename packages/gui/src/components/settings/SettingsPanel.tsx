/* eslint-disable react/no-unstable-nested-components -- These components are at the edges of the component tree, so no perf issues */

import { useGetKeyringStatusQuery } from '@bpx-network/api-react';
import {
  Button,
  AlertDialog,
  Suspender,
  useOpenDialog,
  SettingsApp,
  SettingsLabel,
  Flex,
  StateTypography,
  State,
  TooltipIcon,
} from '@bpx-network/core';
import { Trans } from '@lingui/macro';
import { Help as HelpIcon } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React from 'react';

import ChangePassphrasePrompt from './ChangePassphrasePrompt';
import RemovePassphrasePrompt from './RemovePassphrasePrompt';
import SetPassphrasePrompt from './SetPassphrasePrompt';

export default function SettingsPanel() {
  const openDialog = useOpenDialog();
  const { data: keyringStatus, isLoading } = useGetKeyringStatusQuery();
  const [changePassphraseOpen, setChangePassphraseOpen] = React.useState(false);
  const [removePassphraseOpen, setRemovePassphraseOpen] = React.useState(false);
  const [addPassphraseOpen, setAddPassphraseOpen] = React.useState(false);

  if (isLoading) {
    return <Suspender />;
  }

  const { userPassphraseIsSet } = keyringStatus;

  async function changePassphraseSucceeded() {
    closeChangePassphrase();
    await openDialog(
      <AlertDialog>
        <Trans>Your passphrase has been updated</Trans>
      </AlertDialog>
    );
  }

  async function setPassphraseSucceeded() {
    closeSetPassphrase();
    await openDialog(
      <AlertDialog>
        <Trans>Your passphrase has been set</Trans>
      </AlertDialog>
    );
  }

  async function removePassphraseSucceeded() {
    closeRemovePassphrase();
    await openDialog(
      <AlertDialog>
        <Trans>Passphrase protection has been disabled</Trans>
      </AlertDialog>
    );
  }

  function closeChangePassphrase() {
    setChangePassphraseOpen(false);
  }

  function closeSetPassphrase() {
    setAddPassphraseOpen(false);
  }

  function closeRemovePassphrase() {
    setRemovePassphraseOpen(false);
  }

  function PassphraseFeatureStatus() {
    let state: State = null;
    let statusMessage: JSX.Element | null = null;
    let tooltipTitle: React.ReactElement;
    const tooltipIconStyle: React.CSSProperties = {
      color: '#c8c8c8',
      fontSize: 12,
    };

	tooltipTitle = <Trans>Secure your keychain using a strong passphrase</Trans>;
	
	if (userPassphraseIsSet) {
	  statusMessage = <Trans>Passphrase protection is enabled</Trans>;
	} else {
	  state = State.WARNING;
	  statusMessage = <Trans>Passphrase protection is disabled</Trans>;
	}

    return (
      <StateTypography variant="body2" state={state} color="textSecondary">
        {statusMessage}
        &nbsp;
        <Tooltip title={tooltipTitle}>
          <HelpIcon style={tooltipIconStyle} />
        </Tooltip>
      </StateTypography>
    );
  }

  function DisplayChangePassphrase() {
    if (userPassphraseIsSet) {
      return (
        <>
          <Button onClick={() => setChangePassphraseOpen(true)} variant="outlined" data-testid="changePassphraseAtt">
            <Trans>Change Passphrase</Trans>
          </Button>
          {changePassphraseOpen && (
            <ChangePassphrasePrompt onSuccess={changePassphraseSucceeded} onCancel={closeChangePassphrase} />
          )}
        </>
      );
    }
    return null;
  }

  function ActionButtons() {
    if (userPassphraseIsSet) {
      return (
        <Button
          onClick={() => setRemovePassphraseOpen(true)}
          variant="outlined"
          data-testid="SettingsPanel-remove-passphrase"
        >
          <Trans>Remove Passphrase</Trans>
        </Button>
      );
    }
    return (
      <Button onClick={() => setAddPassphraseOpen(true)} variant="outlined" data-testid="SettingsPanel-set-passphrase">
        <Trans>Set Passphrase</Trans>
      </Button>
    );
  }

  return (
    <SettingsApp>
      <Flex flexDirection="column" gap={1}>
        <SettingsLabel>
          <Trans>Passphrase</Trans>
        </SettingsLabel>

        <DisplayChangePassphrase />
        <ActionButtons />
        {removePassphraseOpen && (
          <RemovePassphrasePrompt onSuccess={removePassphraseSucceeded} onCancel={closeRemovePassphrase} />
        )}
        {addPassphraseOpen && <SetPassphrasePrompt onSuccess={setPassphraseSucceeded} onCancel={closeSetPassphrase} />}
        <PassphraseFeatureStatus />
      </Flex>
    </SettingsApp>
  );
}
