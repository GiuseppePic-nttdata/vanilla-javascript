const CUSTOMER_ELIGIBLE = "CUSTOMER_ELIGIBLE";
const CUSTOMER_INELIGIBLE = "CUSTOMER_INELIGIBLE";

const CHAMPIONS_LEAGUE_FINAL_TICKET = "CHAMPIONS_LEAGUE_FINAL_TICKET";
const KARAOKE_PRO_MICROPHONE = "KARAOKE_PRO_MICROPHONE";
const PIRATES_OF_THE_CARIBBEAN_COLLECTION =
  "PIRATES_OF_THE_CARIBBEAN_COLLECTION";

module.exports = {
  CUSTOMER_ELIGIBLE,
  CUSTOMER_INELIGIBLE,
  rewards: {
    SPORTS: CHAMPIONS_LEAGUE_FINAL_TICKET,
    MUSIC: KARAOKE_PRO_MICROPHONE,
    MOVIES: PIRATES_OF_THE_CARIBBEAN_COLLECTION
  }
};