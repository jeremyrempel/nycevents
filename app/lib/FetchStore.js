import { AsyncStorage } from "react-native";
import moment from "moment";

export async function fetchAndStore(url, onEventDataReady) {
  try {
    let now = Date.now();
    // 3 hrs ago
    let yesterday = now - 3.6e6 * 12;

    let lastFetch = JSON.parse(
      await AsyncStorage.getItem("@nycevents:lastfetch")
    );
    lastFetch = lastFetch ? lastFetch : 0;

    if (lastFetch < yesterday) {
      console.log("getting events from network");

      const response = await fetch(url);
      const allEvents = await response.json();

      // cleanup data
      const eventListFormat = cleanupData(allEvents);

      // save to local storage
      await AsyncStorage.setItem(
        "@nycevents:events",
        JSON.stringify(eventListFormat)
      );

      await AsyncStorage.setItem("@nycevents:lastfetch", JSON.stringify(now));
    } else {
      console.log("getting events from cache");
    }

    // read data from db
    const allEvents = JSON.parse(
      await AsyncStorage.getItem("@nycevents:events")
    );

    // filter out any dates before now
    const eventsAfterNow = allEvents.filter(e => {
      if (e.endDateTime) {
        return now <= new Date(e.endDateTime).getTime();
      } else if (e.startDateTime) {
        return now <= new Date(e.startDateTime).getTime();
      }
      return true;
    });

    onEventDataReady(eventsAfterNow);
  } catch (e) {
    console.error(e);
    return e;
  }
}

// format the correct date/time in the source data and save it
function cleanupData(eventList) {
  eventList.map(e => {
    // update dates
    e.startDateTime = parseDate(e.startdate, e.starttime);
    e.endDateTime = parseDate(e.enddate, e.endtime);

    // update categories
    e.categories = e.categories.split("|");
    e.categories = e.categories.map(c => {
      return c.trim();
    });

    // update lat,long
    const eventCoordSet = e.coordinates.split(";");
    const eventCoord = eventCoordSet[0].split(",");

    const latitude = Number(eventCoord[0]);
    const longitude = Number(eventCoord[1]);

    e.coordinates = { latitude, longitude };

    // strip html description
    e.description = e.description
      .replaceAll("</p>", "\n")
      .replaceAll("<li>", "-")
      .replaceAll("<p>", "")
      .replaceAll("</li>", "")
      .replaceAll("</ul>", "")
      .replaceAll("<ul>", "")
      .replaceAll("&ldquo;", '"')
      .replaceAll("&rdquo;", '"')
      .replaceAll("&rsquo;", "'")
      .decodeHTML()
      .replace(/<(?:.|\n)*?>/gm, "");

    function parseDate(dateStr, timeStr) {
      const dateStrSplit = dateStr.split("-");
      const time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/);
      const hours = parseInt(
        parseInt(time[1]) + (parseInt(time[1]) < 12 && time[3] ? 12 : 0)
      );
      const minutes = parseInt(time[2]) || 0;

      // year, month, date, hour, minute, second, millisecond
      const newDateTime = new Date(
        dateStrSplit[0],
        dateStrSplit[1] - 1,
        dateStrSplit[2],
        hours,
        minutes,
        0,
        0
      );
      return newDateTime;
    }
    return e;
  });

  let newValue = [];
  eventList.forEach(e => {
    const key = moment(e.startdate)
      .set({
        hour: 0,
        minutes: 0,
        second: 0,
        millisecond: 0
      })
      .toISOString();

    const existing = newValue.find(v => v.title === key);

    if (existing) {
      existing.data.push(e);
    } else {
      newValue.push({ title: key, data: [e] });
    }
  });

  return newValue;
}

String.prototype.decodeHTML = function() {
  var map = { gt: ">" /* , … */ };
  return this.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function($0, $1) {
    if ($1[0] === "#") {
      return String.fromCharCode(
        $1[1].toLowerCase() === "x"
          ? parseInt($1.substr(2), 16)
          : parseInt($1.substr(1), 10)
      );
    } else {
      return map.hasOwnProperty($1) ? map[$1] : $0;
    }
  });
};

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};
