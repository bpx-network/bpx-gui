import { t, Trans } from '@lingui/macro';
import { ExitToApp as ExitToAppIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, AppBar, Toolbar, Drawer, Container, IconButton, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { type ReactNode, useState, Suspense, useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Flex from '../Flex';
import Loading from '../Loading';
import Logo from '../Logo';
import Settings from '../Settings';
import ToolbarSpacing from '../ToolbarSpacing';
import Tooltip from '../Tooltip';
// import LayoutFooter from '../LayoutMain/LayoutFooter';

const StyledRoot = styled(Flex)`
  height: 100%;
  // overflow: hidden;
`;

const StyledAppBar = styled(({ drawer, ...rest }) => <AppBar {...rest} />)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  width: ${({ theme, drawer }) => (drawer ? `calc(100% - ${theme.drawer.width})` : '100%')};
  margin-left: ${({ theme, drawer }) => (drawer ? theme.drawer.width : 0)};
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};};
`;

const StyledDrawer = styled(Drawer)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 2};
  width: ${({ theme }) => theme.drawer.width};
  flex-shrink: 0;

  > div {
    width: ${({ theme }) => theme.drawer.width};
    // border-width: 0px;
  }
`;

const StyledBody = styled(Flex)`
  min-width: 0;
`;

const StyledToolbar = styled(Toolbar)`
  padding-left: calc(${({ theme }) => theme.spacing(3)} - 12px);
  padding-right: ${({ theme }) => theme.spacing(3)};
`;

const StyledInlineTypography = styled(Typography)`
  display: inline-block;
`;

export type LayoutDashboardProps = {
  children?: ReactNode;
  sidebar?: ReactNode;
  outlet?: boolean;
  settings?: ReactNode;
  actions?: ReactNode;
};

export default function LayoutDashboard(props: LayoutDashboardProps) {
  const { children, sidebar, settings, outlet = false, actions } = props;

  const navigate = useNavigate();
  const theme: any = useTheme();
  const isColor = useCallback((color: string) => Object.keys(theme.palette.colors).includes(color), [theme]);
  const isDark = theme.palette.mode === 'dark';

  return (
    <StyledRoot>
      <Suspense fallback={<Loading center />}>
        {sidebar && (
          <StyledDrawer variant="permanent">{sidebar}</StyledDrawer>
        )}

        <StyledBody flexDirection="column" flexGrow={1}>
          <ToolbarSpacing />
          <Flex flexDirection="column" gap={2} flexGrow={1} overflow="auto">
            <Suspense fallback={<Loading center />}>{outlet ? <Outlet /> : children}</Suspense>
          </Flex>
        </StyledBody>
      </Suspense>
    </StyledRoot>
  );
}
