import { Flex, LayoutDashboardSub } from '@bpx-network/core';
import { Trans } from '@lingui/macro';
import { Typography, Tab, Tabs } from '@mui/material';
import React from 'react';
import { Routes, Route, matchPath, useLocation, useNavigate } from 'react-router-dom';

import SettingsGeneral from './SettingsGeneral';

enum SettingsTab {
  GENERAL = 'general',
}

const SettingsTabsPathMapping = {
  [SettingsTab.GENERAL]: '/dashboard/settings/general',
};

export default function Settings() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const mapping = {
    ...SettingsTabsPathMapping,
  };

  const activeTab =
    Object.entries(mapping).find(([, pattern]) => !!matchPath(pattern, pathname))?.[0] ?? SettingsTab.GENERAL;

  function handleChangeTab(newTab: SettingsTab) {
    const path = SettingsTabsPathMapping[newTab] ?? SettingsTabsPathMapping[SettingsTab.GENERAL];
    navigate(path);
  }

  return (
    <LayoutDashboardSub>
      <Flex flexDirection="column" gap={3}>
        <Typography variant="h5">
          <Trans>Settings</Trans>
        </Typography>
        <Flex gap={3} flexDirection="column">
          <Tabs
            value={activeTab}
            onChange={(_event, newValue) => handleChangeTab(newValue)}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab value={SettingsTab.GENERAL} label={<Trans>General</Trans>} data-testid="Settings-tab-general" />
          </Tabs>

          <Routes>
            <Route path="general" element={<SettingsGeneral />} />
          </Routes>
        </Flex>
      </Flex>
    </LayoutDashboardSub>
  );
}
