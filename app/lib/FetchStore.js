export async function fetchAndStore(url, onEventDataReady) {
  try {
    const response = await fetch(url);
    const allEvents = await response.json();

    onEventDataReady(futureEvents(allEvents));
  } catch (e) {
    return e;
  }
}

export function futureEvents(allEvents) {
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
