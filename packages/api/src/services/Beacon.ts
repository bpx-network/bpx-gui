import Client from '../Client';
import type Message from '../Message';
import ServiceName from '../constants/ServiceName';
import Service from './Service';
import type { Options } from './Service';

export default class Beacon extends Service {
  constructor(client: Client, options?: Options) {
    super(ServiceName.BEACON, client, options);
  }

  async getBlockRecords(start?: number, end?: number) {
    return this.command('get_block_records', {
      start,
      end,
    });
  }

  async getUnfinishedBlockHeaders() {
    return this.command('get_unfinished_block_headers');
  }

  async getBlockchainState() {
    return this.command('get_blockchain_state');
  }

  async getConnections() {
    return this.command('get_connections');
  }

  async openConnection(host: string, port: number) {
    return this.command('open_connection', {
      host,
      port,
    });
  }

  async closeConnection(nodeId: string) {
    return this.command('close_connection', {
      nodeId,
    });
  }

  async getBlock(headerHash: string) {
    return this.command('get_block', {
      headerHash,
    });
  }

  async getBlockRecord(headerHash: string) {
    return this.command('get_block_record', {
      headerHash,
    });
  }
  
  async getNetworkInfo() {
    return this.command('get_network_info');
  }
  
  async getCoinbase() {
    return this.command('get_coinbase');
  }

  async setCoinbase(coinbase: string) {
    return this.command('set_coinbase', {
      coinbase,
    });
  }

  onBlockchainState(callback: (data: any, message: Message) => void, processData?: (data: any) => any) {
    return this.onCommand('get_blockchain_state', callback, processData);
  }

  onConnections(callback: (data: any, message: Message) => void, processData?: (data: any) => any) {
    return this.onCommand('get_connections', callback, processData);
  }

  onNewBlock(callback: (data: any, message: Message) => void, processData?: (data: any) => any) {
    return this.onStateChanged('new_block', callback, processData);
  }

  onNewPeak(callback: (data: any, message: Message) => void, processData?: (data: any) => any) {
    return this.onStateChanged('new_peak', callback, processData);
  }
}
