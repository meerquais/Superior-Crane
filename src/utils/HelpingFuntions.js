export const DatetoDayNameConverter = (dateStr) => {
  var date = new Date(dateStr);
  const convertion = date.toLocaleDateString("en-US", { weekday: "long" });
  return convertion;
};

export const ArrangedData = (data) => {
  
  var days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  let results = data?.map((v) => ({
    user:  days[new Date(v.jobDate).getDay()],
    clientName: v?.clientName,
    address: v?.address,
    supplierName: v?.supplierName,
    statusCode: v?.statusCode,
    jobTime: v?.jobTime,
    jobDate:v?.jobDate,
    imageFiles:v?.imageFiles,
    equipmentToBeUsed:v?.equipmentToBeUsed,
    notes:v?.notes,
    pdfRigger:v.pdfRigger?v?.pdfRigger:'N.A.N',
    pdfTransportation:v?.pdfTransportation?v.pdfTransportation:"N.A.N",
    riggerAssigned:v?.riggerAssigned,
    supplierName:v?.supplierName,
    jobNumber:v?.jobNumber,
    enterBy:v?.enterBy,
    SCII:v?.isSCCI ? "YES":"NO",
    jobId:v?.jobId,
    isSCCI:v.isSCCI
  }));
  let resultsAll = [];
  const names = results?.map((element) => element.user);
  const uniqueNames = [...new Set(names)];
  uniqueNames?.forEach((element) => {
    let temp = {};
    temp.name = element;
    temp.color = [];
    results?.forEach((element2) => {
      if (element === element2.user) {
        temp.color.push(element2);
      }
    });
    resultsAll.push(temp);
  });
  return resultsAll;
};

export const DateConvertor = (item) => {
  const timeString12hr = new Date(
    "1970-01-01T" + item + "Z"
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  return timeString12hr;
};

export const convertTodayDate = (date) => {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 1).toString();
  var dd = date.getDate().toString();
  var mmChars = mm.split("");
  var ddChars = dd.split("");
  return (
    yyyy +
    "-" +
    (mmChars[1] ? mm : "0" + mmChars[0]) +
    "-" +
    (ddChars[1] ? dd : "0" + ddChars[0])
  );
};
