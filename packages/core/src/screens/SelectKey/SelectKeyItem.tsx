import type { KeyData } from '@bpx-network/api';
import { useFingerprintSettings } from '@bpx-network/api-react';
import { Trans } from '@lingui/macro';
import { Delete as DeleteIcon, Visibility as VisibilityIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, Typography, ListItemIcon, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useCallback, useState } from 'react';

import CardListItem from '../../components/CardListItem';
import Flex from '../../components/Flex';
import { MenuItem } from '../../components/MenuItem';
import More from '../../components/More';
import useOpenDialog from '../../hooks/useOpenDialog';
import SelectKeyDetailDialog from './SelectKeyDetailDialog';
import SelectKeyRenameForm from './SelectKeyRenameForm';
import WalletDeleteDialog from './WalletDeleteDialog';

type SelectKeyItemProps = {
  keyData: KeyData;
  index: number;
  disabled?: boolean;
  loading?: boolean;
  onSelect: (fingerprint: number) => void;
};

export default function SelectKeyItem(props: SelectKeyItemProps) {
  const { keyData, onSelect, disabled, loading, index } = props;
  const openDialog = useOpenDialog();
  const [isRenaming, setIsRenaming] = useState<boolean>(false);

  const { fingerprint, label } = keyData;

  function handleShowKey() {
    openDialog(<SelectKeyDetailDialog fingerprint={fingerprint} index={index} />);
  }

  function handleRename() {
    setIsRenaming(true);
  }

  function handleCloseRename() {
    setIsRenaming(false);
  }

  async function handleDeletePrivateKey() {
    await openDialog(<WalletDeleteDialog fingerprint={fingerprint} />);
  }

  function renderOptions() {
    return (
      <Flex
        flexDirection="column"
        alignItems="flex-end"
        gap={0.5}
        sx={{
          svg: {
            path: {
              color: color.accent,
            },
          },
        }}
      >
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
      </Flex>
    );
  }

  function toggleEmojiPicker(e) {
    e.preventDefault();
    e.stopPropagation();
    setShowEmojiPicker(true);
  }

  function preventBubble(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <CardListItem
      onSelect={isRenaming || showEmojiPicker ? undefined : handleLogin}
      data-testid={`SelectKeyItem-fingerprint-${fingerprint}`}
      key={fingerprint}
      disabled={disabled}
      loading={loading}
      noPadding
      sx={{
        border: `1px solid ${color.border}`,
        ':hover': {
          border: `1px solid ${color.border}`,
        },
        overflow: 'initial',
        '> button': {
          borderRadius: '7px',
        },
      }}
    >
      <Flex position="relative" flexDirection="column">
        <Flex sx={{ padding: '8px', minHeight: '55px' }} direction="row">
          <Flex sx={{ padding: '0 10px 0 0', fontSize: '24px', position: 'relative' }}>
            <span
              style={{
                display: showEmojiPicker ? 'inline' : 'none',
                position: 'relative',
                zIndex: 10,
                height: 0,
                width: 0,
                left: '10px',
                top: '6px',
              }}
              onClick={preventBubble}
            >
            </span>
            <Flex
              sx={{
                zIndex: 9,
                ':hover': {
                  backgroundColor: color.main,
                },
                width: '48px',
                height: '48px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                background: 'none',
                transition: 'all .3s linear',
                backgroundColor: 'transparent',
              }}
              onClick={toggleEmojiPicker}
            >
              <Typography variant="h4" sx={{ fontFamily: 'none', paddingTop: '6px' }}>
                {walletKeyTheme.emoji}
              </Typography>
            </Flex>
          </Flex>
          <Flex
            direction="column"
            gap={isRenaming ? 1 : 0}
            minWidth={0}
            flexGrow={1}
            sx={{
              ' > h6': {
                lineHeight: 1.3,
                paddingTop: '2px',
              },
            }}
          >
            {isRenaming ? (
              <Flex
                sx={{
                  input: {
                    padding: '6px',
                  },
                  position: 'relative',
                  top: '2px',
                }}
              >
                <SelectKeyRenameForm keyData={keyData} onClose={handleCloseRename} />
              </Flex>
            ) : (
              <Typography variant="h6" noWrap>
                {label || <Trans>Wallet {index + 1}</Trans>}
              </Typography>
            )}
            {!isRenaming && (
              <Typography variant="body2" color="textSecondary">
                {fingerprint}
              </Typography>
            )}
          </Flex>
        </Flex>
        <Box
          sx={{
            backgroundColor: color.main,
            borderTop: `1px solid ${color.main}`,
            padding: '5px',
            borderRadius: '0 0 7px 7px',
          }}
        >
          {renderOptions()}
        </Box>
      </Flex>
    </CardListItem>
  );
}
