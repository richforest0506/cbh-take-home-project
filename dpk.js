const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;
  if (!event) return TRIVIAL_PARTITION_KEY;
  if (event.partitionKey) {
    candidate = event.partitionKey;
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
    if (candidate.length <= MAX_PARTITION_KEY_LENGTH)
        return candidate;
  } else {
    candidate = JSON.stringify(event);
  }    
  return crypto.createHash("sha3-512").update(candidate).digest("hex");
};