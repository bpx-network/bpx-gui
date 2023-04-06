import * as client from './client';
import * as daemon from './daemon';
import * as farmer from './farmer';
import * as beacon from './beacon';
import * as harvester from './harvester';
import * as plotter from './plotter';

export const {
  clientApi,

  useCloseMutation,
  useGetStateQuery,
  useClientStartServiceMutation,
} = client;

// daemon hooks
export const {
  daemonApi,

  useDaemonPingQuery,
  useGetKeyringStatusQuery,
  useStartServiceMutation,
  useStopServiceMutation,
  useIsServiceRunningQuery,
  useRunningServicesQuery,
  useGetVersionQuery,

  useGetPlottersQuery,
  useStopPlottingMutation,
  useStartPlottingMutation,

  useAddPrivateKeyMutation,
  useGetKeyQuery,
  useGetKeysQuery,
  useSetLabelMutation,
  useDeleteLabelMutation,
} = daemon;

// farmer hooks
export const {
  farmerApi,

  useFarmerPingQuery,
  useGetHarvestersQuery,
  useGetHarvestersSummaryQuery,
  useGetHarvesterPlotsValidQuery,
  useGetHarvesterPlotsDuplicatesQuery,
  useGetHarvesterPlotsInvalidQuery,
  useGetHarvesterPlotsKeysMissingQuery,
  useGetFarmerConnectionsQuery,
  useOpenFarmerConnectionMutation,
  useCloseFarmerConnectionMutation,
  useGetSignagePointsQuery,
  useGetFarmingInfoQuery,
  useGenerateMnemonicMutation,
  useGetPublicKeysQuery,
  useDeleteKeyMutation,
  useDeleteAllKeysMutation,
  useGetPrivateKeyQuery,
} = farmer;

// beacon hooks
export const {
  beaconApi,

  useBeaconPingQuery,
  useGetBlockRecordsQuery,
  useGetUnfinishedBlockHeadersQuery,
  useGetBlockchainStateQuery,
  useGetBeaconConnectionsQuery,
  useOpenBeaconConnectionMutation,
  useCloseBeaconConnectionMutation,
  useGetBlockQuery,
  useGetBlockRecordQuery,
  useGetNetworkInfoQuery,
} = beacon;

// harvester hooks
export const {
  harvesterApi,

  useHarvesterPingQuery,
  useGetPlotsQuery,
  useRefreshPlotsMutation,
  useDeletePlotMutation,
  useGetPlotDirectoriesQuery,
  useAddPlotDirectoryMutation,
  useRemovePlotDirectoryMutation,
} = harvester;

// plotter hooks
export const {
  plotterApi,

  useGetPlotQueueQuery,
  // useStopPlottingMutation,
  // useStartPlottingMutation,
} = plotter;
