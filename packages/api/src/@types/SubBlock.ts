type SubBlock = {
  challenge_block_info_hash: string;
  challenge_vdf_output: {
    a: string;
  };
  deficit: number;
  finished_challenge_slot_hashes: string | null;
  finished_infused_challenge_slot_hashes: string[] | null;
  finished_reward_slot_hashes: string[] | null;
  header_hash: string;
  height: number;
  infused_challenge_vdf_output: {
    a: string;
  };
  overflow: boolean;
  prev_block_hash: string | null;
  prev_hash: string | null;
  required_iters: string;
  reward_infusion_new_challenge: string;
  signage_point_index: number;
  sub_epoch_summary_included: unknown;
  sub_slot_iters: string;
  timestamp: number | null;
  total_iters: string;
  weight: string;
};

export default SubBlock;
