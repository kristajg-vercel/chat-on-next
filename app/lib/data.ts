import seedData from '../../server/seedData.json';

interface BuddyData {
  buddyList: any,
}

export async function fetchBuddyList() {
  // TODO: fetch buddy list from api / db
  const { buddyList }: BuddyData = seedData;
  let buddyArray = [];
  let totalOnline = 0;
  for (let key in buddyList) {
    if (buddyList.hasOwnProperty(key)) {
      buddyArray.push({ userName: key, isOnline: buddyList[key].isOnline });
      if (buddyList[key].isOnline) ++totalOnline;
    }
  }
  return {
    buddies: buddyArray,
    totalOnline
  };
}

// Needs to update in real time. Can use websockets or web hooks
// This will also replace some of the temp logic in fetchBuddyList()
// export async function currentlyOnline(buddies) {}