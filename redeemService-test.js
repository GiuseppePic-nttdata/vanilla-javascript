const { rewardsService, InvalidAccountNumber } = require("./redeemService");
const { CUSTOMER_ELIGIBLE, CUSTOMER_INELIGIBLE } = require("./constants");

describe("Test redeemService", () => {
  it("should return nothing if the customer is not eligible", () => {
    const portfolio = {
      subscriptions: ["SPORTS", "KIDS", "MUSIC", "MOVIES", "NEWS"]
    };

    const eligibilityService = (accountNumber) => {
      return CUSTOMER_INELIGIBLE;
    };
    const result = rewardsService({
      accountNumber: 1,
      portfolio,
      eligibilityService
    });
    expect(result).toMatchObject({ data: [] });
  });

  it("should notify the client that the account number is invalid ", () => {
    const portfolio = {
      subscriptions: ["SPORTS", "KIDS", "MUSIC", "MOVIES", "NEWS"]
    };
    const eligibilityService = (accountNumber) => {
      throw new InvalidAccountNumber("account number is not valid");
    };
    const result = rewardsService({
      accountNumber: 1,
      portfolio,
      eligibilityService
    });
    expect(result).toMatchObject({
      data: [],
      error: "the account number is invalid"
    });
  });

  it("should return no data and a generic error", () => {
    const portfolio = {
      subscriptions: ["SPORTS", "KIDS", "MUSIC", "MOVIES", "NEWS"]
    };
    const eligibilityService = (accountNumber) => {
      throw new Error("");
    };
    const result = rewardsService({
      accountNumber: 1,
      portfolio,
      eligibilityService
    });
    expect(result).toMatchObject({
      data: [],
      error: "technical failure"
    });
  });

  it("should return no data with customer eligible and no subscriptions", () => {
    const portfolio = {
      subscriptions: []
    };
    const eligibilityService = (accountNumber) => {
      return CUSTOMER_ELIGIBLE;
    };
    const result = rewardsService({
      accountNumber: 1,
      portfolio,
      eligibilityService
    });
    expect(result).toMatchObject({
      data: []
    });
  });

  it("should get rewards with SPORTS, MUSIC, MOVIES", () => {
    const portfolio = {
      subscriptions: ["SPORTS", "MUSIC", "MOVIES"]
    };
    const eligibilityService = (accountNumber) => {
      return CUSTOMER_ELIGIBLE;
    };
    const result = rewardsService({
      accountNumber: 1,
      portfolio,
      eligibilityService
    });
    expect(result).toMatchObject({
      data: [
        "CHAMPIONS_LEAGUE_FINAL_TICKET",
        "KARAOKE_PRO_MICROPHONE",
        "PIRATES_OF_THE_CARIBBEAN_COLLECTION"
      ]
    });
  });

  it("should get rewards with SPORT without any duplicates", () => {
    const portfolio = {
      subscriptions: ["SPORTS", "SPORTS", "SPORTS"]
    };
    const eligibilityService = (accountNumber) => {
      return CUSTOMER_ELIGIBLE;
    };
    const result = rewardsService({
      accountNumber: 1,
      portfolio,
      eligibilityService
    });
    expect(result).toMatchObject({
      data: ["CHAMPIONS_LEAGUE_FINAL_TICKET"]
    });
  });

  it("should get no rewards with NEWS and MUSIC", () => {
    const portfolio = {
      subscriptions: ["NEWS", "KIDS"]
    };
    const eligibilityService = (accountNumber) => {
      return CUSTOMER_ELIGIBLE;
    };
    const result = rewardsService({
      accountNumber: 1,
      portfolio,
      eligibilityService
    });
    expect(result).toMatchObject({
      data: []
    });
  });

  it("should only get rewards with SPORTS, MUSIC, MOVIES", () => {
    const portfolio = {
      subscriptions: ["SPORTS", "MUSIC", "MOVIES", "NEWS", "KIDS"]
    };
    const eligibilityService = (accountNumber) => {
      return CUSTOMER_ELIGIBLE;
    };
    const result = rewardsService({
      accountNumber: 1,
      portfolio,
      eligibilityService
    });
    expect(result).toMatchObject({
      data: [
        "CHAMPIONS_LEAGUE_FINAL_TICKET",
        "KARAOKE_PRO_MICROPHONE",
        "PIRATES_OF_THE_CARIBBEAN_COLLECTION"
      ]
    });
  });
});
