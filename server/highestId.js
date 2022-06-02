function higest(json) {
    let newestId;
    let i = 0;
    json.forEach(json => {
        i++
    });
    // console.log(i);

    const newestIssue = json[i - 1];
    // console.log(newestIssue);
    newestId = newestIssue.id;
    // console.log(newestId)

    return(newestId);
}

module.exports = {higest};
