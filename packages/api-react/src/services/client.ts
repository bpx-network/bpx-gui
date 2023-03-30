import { ConnectionState, ServiceName } from '@bpx-network/api';

import api, { baseQuery } from '../api';

const apiWithTag = api.enhanceEndpoints({ addTagTypes: [] });

export const clientApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    close: build.mutation<
      boolean,
      {
        force?: boolean;
      }
    >({
      query: ({ force }) => ({
        command: 'close',
        client: true,
        args: [force],
      }),
    }),

    getState: build.query<
      {
        state: ConnectionState;
        attempt: number;
        serviceName?: ServiceName;
      },
      undefined
    >({
      query: () => ({
        command: 'getState',
        client: true,
      }),
      async onCacheEntryAdded(_arg, apiLocal) {
        const { updateCachedData, cacheDataLoaded, cacheEntryRemoved } = apiLocal;
        let unsubscribe;
        try {
          await cacheDataLoaded;

          const response = await baseQuery(
            {
              command: 'onStateChange',
              client: true,
              args: [
                (data: any) => {
                  updateCachedData((draft) => {
                    Object.assign(draft, {
                      ...data,
                    });
                  });
                },
              ],
            },
            apiLocal,
            {}
          );

          unsubscribe = response.data;
        } finally {
          await cacheEntryRemoved;
          if (unsubscribe) {
            unsubscribe();
          }
        }
      },
    }),

    clientStartService: build.mutation<
      boolean,
      {
        service?: ServiceName;
        disableWait?: boolean;
      }
    >({
      query: ({ service, disableWait }) => ({
        command: 'startService',
        args: [service, disableWait],
        client: true,
      }),
    }),
  }),
});

export const { useCloseMutation, useGetStateQuery, useClientStartServiceMutation } = clientApi;
