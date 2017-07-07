import { AsyncStorage } from "react-native";

export async function fetchAndStore(url, onEventDataReady) {
  try {
    let now = Date.now();
    // 24 hrs ago
    let yesterday = now - 3.6e6 * 24;

    let lastFetch = JSON.parse(
      await AsyncStorage.getItem("@nycevents:lastfetch")
    );
    lastFetch = lastFetch ? lastFetch : 0;

    if (lastFetch < yesterday) {
      console.log("getting events from network");

      const response = await fetch(url);
      const allEvents = await response.json();

      const allEventsFilteredCat = setupCategories(allEvents);

      // save to local storage
      await AsyncStorage.setItem(
        "@nycevents:events",
        JSON.stringify(allEventsFilteredCat)
      );

      await AsyncStorage.setItem("@nycevents:lastfetch", JSON.stringify(now));
    }

    const allEvents = JSON.parse(
      await AsyncStorage.getItem("@nycevents:events")
    );

    const allEventsFiltered = futureEvents(allEvents);
    onEventDataReady(allEventsFiltered);
  } catch (e) {
    console.error(e);
    return e;
  }
}

function setupCategories(eventList) {
  eventList.forEach(e => {
    const catSplit = e.categories.split("|");

    e.categories = [];

    for (let i = 0; i < catSplit.length; i++) {
      const cat = catSplit[i].trim();
      if (cat) {
        e.categories.push(cat);
      }
    }
  });

  return eventList;
}

function futureEvents(allEvents) {
  let dateNow = Date.now();

  // filter out any dates before now
  let eventsAfterNow = allEvents.filter(e => {
    const dateStrSplit = e.startdate.split("-");

    // https://stackoverflow.com/questions/141348/what-is-the-best-way-to-parse-a-time-into-a-date-object-from-user-input-in-javas
    if (e.endtime) {
      const time = e.endtime.match(/(\d+)(?::(\d\d))?\s*(p?)/);
      const hours = parseInt(
        parseInt(time[1]) + (parseInt(time[1]) < 12 && time[3] ? 12 : 0)
      );
      const minutes = parseInt(time[2]) || 0;

      // year, month, date, hour, minute, second, millisecond
      const dateStart = new Date(
        dateStrSplit[0],
        dateStrSplit[1] - 1,
        dateStrSplit[2],
        hours,
        minutes,
        0,
        0
      );

      return dateStart.getTime() >= dateNow;
    } else {
      return true;
    }
  });

  return eventsAfterNow;
}
