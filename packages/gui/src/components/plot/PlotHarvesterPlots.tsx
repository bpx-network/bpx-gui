import { type Plot } from '@bpx-network/api';
import { useGetHarvesterPlotsValidQuery, useGetHarvesterQuery } from '@bpx-network/api-react';
import { TableControlled, Flex, FormatBytes, Tooltip, StateColor } from '@bpx-network/core';
import { Trans } from '@lingui/macro';
import { Warning as WarningIcon } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

import PlotAction from './PlotAction';
import PlotStatus from './PlotStatus';

const StyledWarningIcon = styled(WarningIcon)`
  color: ${StateColor.WARNING};
`;

const cols = [
  {
    field({ fileSize, size, duplicates }: Plot) {
      const hasDuplicates = false;
      const [firstDuplicate] = duplicates || [];

      const duplicateTitle = hasDuplicates ? <Trans>Plot is duplicate of {firstDuplicate.filename}</Trans> : null;

      return (
        <Flex alignItems="center" gap={1}>
          <Box>
            {`K-${size}, `}
            <FormatBytes value={fileSize} precision={3} />
          </Box>
          {hasDuplicates && (
            <Tooltip title={<Box>{duplicateTitle}</Box>} arrow>
              <StyledWarningIcon />
            </Tooltip>
          )}
        </Flex>
      );
    },
    title: <Trans>K-Size</Trans>,
  },
  {
    minWidth: '100px',
    field: 'plotPublicKey',
    tooltip: 'plotPublicKey',
    title: <Trans>Plot Key</Trans>,
  },
  {
    minWidth: '100px',
    field: 'poolPublicKey',
    tooltip: 'poolPublicKey',
    title: <Trans>Pool Key</Trans>,
  },
  {
    minWidth: '100px',
    field: 'poolContractPuzzleHash',
    tooltip: 'poolContractPuzzleHash',
    title: <Trans>Pool Contract Address</Trans>,
  },
  {
    minWidth: '100px',
    field: 'filename',
    tooltip: 'filename',
    title: <Trans>Filename</Trans>,
  },
  {
    field: (plot: Plot) => <PlotStatus plot={plot} />,
    title: <Trans>Status</Trans>,
  },
  {
    field: (plot: Plot) => <PlotAction plot={plot} />,
    title: <Trans>Action</Trans>,
  },
];

export type PlotHarvesterPlotsProps = {
  nodeId: string;
};

export default function PlotHarvesterPlots(props: PlotHarvesterPlotsProps) {
  const { nodeId } = props;
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const {
    plots,
    initialized,
    isLoading: isLoadingHarvester,
  } = useGetHarvesterQuery({
    nodeId,
  });
  const { isLoading: isLoadingHarvesterPlots, data = [] } = useGetHarvesterPlotsValidQuery({
    nodeId,
    page,
    pageSize,
  });

  const isLoading = isLoadingHarvester || isLoadingHarvesterPlots;
  const count = plots ?? 0;

  function handlePageChange(rowsPerPage: number, pageLocal: number) {
    setPageSize(rowsPerPage);
    setPage(pageLocal);
  }

  return (
    <TableControlled
      cols={cols}
      rows={data}
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      page={page}
      rowsPerPage={pageSize}
      count={count}
      onPageChange={handlePageChange}
      isLoading={isLoading || !initialized}
      expandedCellShift={1}
      uniqueField="plotId"
      caption={
        !plots && (
          <Typography variant="body2" align="center">
            {initialized ? <Trans>No plots yet</Trans> : <Trans>Initializing...</Trans>}
          </Typography>
        )
      }
      pages={!!plots}
    />
  );
}
