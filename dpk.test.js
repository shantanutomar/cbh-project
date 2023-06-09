const { determinePartitionKey } = require("./dpk");

describe("determinePartitionKey", () => {

  it("Returns TRIVIAL_PARTITION_KEY = '0' when given no event is being passed", () => {
    const trivialKey = determinePartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns stringifies value of partitionKey when partitionKey is sent as number", () => {
    const trivialKey = determinePartitionKey({
      partitionKey: 27
    })
    expect(trivialKey).toBe("27")
  });

  it("Returns the partitionKey when partitionKey is given as string in event", () => {
    const trivialKey = determinePartitionKey({
      partitionKey: "testPartition12345"
    })
    expect(trivialKey).toBe("testPartition12345");
  });

  it("Returns a random string of 128 chars when partitionKey is not provided", () => {
    const trivialKey = determinePartitionKey({
      data: "321312"
    })
    expect(trivialKey).toHaveLength(128);
  });

  it("Returns a random string of 128 chars when partitionKey is sent as undefined", () => {
    const trivialKey = determinePartitionKey({
      partitionKey: undefined
    })
    expect(trivialKey).toHaveLength(128);
  });

  it("Returns a random string of 128 chars when partitionKey is sent as null", () => {
    const trivialKey = determinePartitionKey({
      partitionKey: null
    })
    expect(trivialKey).toHaveLength(128);
  });

  it("Returns a random string of 128 chars when partitionKey is more then MAX_PARTITION_KEY_LENGTH = 256 chars", () => {
    const trivialKey = determinePartitionKey({
      partitionKey: 'h3Gm0dhkLuYPDBZ3Dka68H69Tie15W48Vh3SShh7aAJkIgOK7F9SQwxiaLGHQwon3REPqOEh8IFRiZ9JIpM7QjLCyXZsQSgssmYfr5HJfmOoekg4cr6LehiLoVCwNpK2qEuuCxSHW7e7h7d3x53INQqcVN61mXoz2L7vCvosVqEk2QHm7oSUAZ7DcwJPktROWsWe5DFApGMH1ARYUqmBcvSd9UROmj9yFKXcEBlwkrXXIxJhzMGNASz9zdMAuq0Iits7pbpTwWeq8nMQdgmdBxQ3\n'
    })
    expect(trivialKey).toHaveLength(128)
  });
});