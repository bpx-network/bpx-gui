import { LayoutDashboard, Mode, useMode } from '@bpx-network/core';
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import Block from '../block/Block';
import DashboardSideBar from '../dashboard/DashboardSideBar';
import Farm from '../farm/Farm';
import Beacon from '../beacon/Beacon';
import Plot from '../plot/Plot';
import Settings from '../settings/Settings';
import SettingsPanel from '../settings/SettingsPanel';
import AppProviders from './AppProviders';
import AppStatusHeader from './AppStatusHeader';

export default function AppRouter() {
  const [mode] = useMode();

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppProviders outlet />}>
          {mode === Mode.NODE ? (
            <Route
              element={
                <LayoutDashboard
                  settings={<SettingsPanel />}
                  sidebar={<DashboardSideBar simple />}
                  actions={<AppStatusHeader />}
                  outlet
                />
              }
            >
              <Route index path="dashboard" element={<Beacon />} />
              <Route path="dashboard/block/:headerHash" element={<Block />} />
              <Route path="dashboard/settings/*" element={<Settings />} />
            </Route>
          ) : (
            <Route
              element={
                <LayoutDashboard
                  settings={<SettingsPanel />}
                  sidebar={<DashboardSideBar />}
                  actions={<AppStatusHeader />}
                  outlet
                />
              }
            >
              <Route index path="dashboard" element={<Beacon />} />
              <Route path="dashboard/block/:headerHash" element={<Block />} />
              <Route path="dashboard/settings/*" element={<Settings />} />
              <Route path="dashboard/plot/*" element={<Plot />} />
              <Route path="dashboard/farm/*" element={<Farm />} />
            </Route>
          )}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}
