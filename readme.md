## Description of the architecture

In the function rewardsService, the parameter portfolio is an object with an array of subscriptions, it can contain these values: ["SPORTS", "MUSIC", "MOVIES", "NEWS", "KIDS"].
To understand if the customer is eligible for a reward, it's been created the "rewards" object, that is declared in the constants.js file in the "module.exports". The "getRewards" function will use it to get the right reward, when it loops the "portfolio.subscriptions" array.
If the subscription is contained in the array, it'll be added into the "result" set.
The "result" variable is a set, to avoid adding duplicated rewards. After that, the set will be converted into an array and it'll be sent to the client. The "getRewards" will be called only and only if the "eligibilityService" function returns the constant "CUSTOMER_ELIGIBLE". If this function returns something else, an empty array will be sent.

## Handling exceptions

If the "eligibilityService" throws and error, the "handleError" function will handle the exception in the catch block. If the account number is invalid, it's supposed the "eligibilityService" function will throw the InvalidAccountNumber and it'll be sent to the client an empty data array and a specific string error message. The InvalidAccountNumber exception has been declared in the "redeemService.js" file.
If there is a generic error, the "handleError" will send an empty data array and a generic generic string error message.

## Instructions to run the project

First of all, you have to run

### npm install

and then to execute the code

### node redeemService.js

If you want to run the tests

### npm test
