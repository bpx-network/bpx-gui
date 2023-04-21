type Foliage = {
  foliage_block_data_signature: string;
  foliage_block_data: {
    unfinished_reward_block_hash: string;
	timestamp: string;
    execution_block_hash: string;
  };
  prev_block_hash: string;
  reward_block_hash: string;
};

export default Foliage;
