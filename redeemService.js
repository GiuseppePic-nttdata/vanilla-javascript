const { CUSTOMER_ELIGIBLE, rewards } = require("./constants");

class InvalidAccountNumber extends Error {}

const handleError = (error) => {
  const returnError = {
    data: []
  };
  if (error instanceof InvalidAccountNumber) {
    returnError.error = "the account number is invalid";
  } else {
    returnError.error = "technical failure";
  }
  return returnError;
};

const getRewards = (portfolio) => {
  const result = new Set();
  portfolio.subscriptions.forEach((subscription) => {
    if (subscription in rewards) {
      result.add(rewards[subscription]);
    }
  });
  return {
    data: [...result]
  };
};

function rewardsService ({
  customerAccountNumber,
  portfolio,
  eligibilityService
}) {
  try {
    if (eligibilityService(customerAccountNumber) === CUSTOMER_ELIGIBLE) {
      return getRewards(portfolio);
    }
    return {
      data: []
    };
  } catch (error) {
    return handleError(error);
  }
}

module.exports = {
  InvalidAccountNumber,
  rewardsService
};
