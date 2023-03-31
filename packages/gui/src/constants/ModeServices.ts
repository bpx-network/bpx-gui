import { ServiceName } from '@bpx-network/api';
import { Mode } from '@bpx-network/core';

export default {
  [Mode.NODE]: [ServiceName.BEACON],
  [Mode.FARMING]: [ServiceName.BEACON, ServiceName.FARMER, ServiceName.HARVESTER],
};
