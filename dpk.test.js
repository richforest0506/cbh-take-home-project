const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the same result given the same input", () => {
    const object = "input sample";
    const key1 = deterministicPartitionKey(object);
    const key2 = deterministicPartitionKey(object);
    expect(key1).toEqual(key2);
  });
  
  it("Returns a stringified partition key if it isn't string", () => {
    const object = {
      partitionKey: { value: 10 },
    };
    const key = deterministicPartitionKey(object);

    expect(key).toEqual(JSON.stringify(object.partitionKey));
  });

  it("Returns the partition key if it is string and is not longer than MAX_PARTITION_KEY_LENGTH", () => {
    const object = {
      partitionKey: "input key",
    };
    const key = deterministicPartitionKey(object);
    expect(key).toEqual(object.partitionKey);
  });

  it("Returns a hash value if partition key is longer than MAX_PARTITION_KEY_LENGTH", () => {
    const object = {
      partitionKey: "abcdefghijklmnopqrstuvwxyz" +
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz" +
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz" +
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz" + 
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz" + 
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz" + 
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz" + 
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz" + 
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz" + 
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz" +
        "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"
    };
    const key = deterministicPartitionKey(object);

    expect(key.length).toEqual(128);
  });
});
