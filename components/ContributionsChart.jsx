export default function ContributionsChart({ contributions }) {
  const styles = {
    body: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: "100%",
      lineHeight: "1.5",
      color: "#24292e",
      backgroundColor: "#fff",
    },
    region: {
      overflow: "auto",
      width: "100%",
      padding: "0.8em 0",
    },
    table: {
      fontSize: "65%",
      borderCollapse: "separate",
      borderSpacing: "0.2em 0",
    },
    caption: {
      textAlign: "left",
      fontSize: "140%",
    },
    th: {
      textAlign: "left",
      fontWeight: "normal",
    },
    td: {
      padding: "0",
      position: "relative",
    },
    tdAfter: {
      content: '""',
      display: "block",
      boxSizing: "border-box",
      width: "1em",
      height: "1em",
      backgroundColor: "#eee",
    },
    tdLink: {
      display: "block",
      boxSizing: "border-box",
      width: "1em",
      height: "1em",
      backgroundColor: "#787878 ",
      zIndex: 1,
      textDecoration: "none",
    },
    tdHover: {
      textDecoration: "none",
      outline: "0.1em solid #00d",
    },
    levels: {
      amta: { backgroundColor: "#c6e48b" },
      amtb: { backgroundColor: "#7bc96f" },
      amtc: { backgroundColor: "#239a3b" },
      amtd: { backgroundColor: "#196127" },
    },
    tooltip: {
      position: "absolute",
      display: "block",
      zIndex: 1,
      bottom: "1.5em",
      left: "-1em",
      width: "12em",
      maxWidth: "57em",
      padding: "0.5em 0.75em",
      border: "0.05em solid rgba(255, 255, 255, 1)",
      borderRadius: "0.2em",
      boxShadow: "0.15em 0.15em 0.5em rgba(0, 0, 0, 1)",
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      color: "rgba(255, 255, 255, 1)",
      fontSize: "110%",
      animation: "TOOLTIP 0.1s ease-out 1",
    },
    keyframes: {
      "@keyframes TOOLTIP": {
        from: {
          bottom: "0.5em",
          backgroundColor: "rgba(0, 0, 0, 0)",
          border: "0.05em solid rgba(255, 255, 255, 0)",
          color: "rgba(255, 255, 255, 0)",
          boxShadow: "0 0 0 rgba(0, 0, 0, 1)",
        },
        to: {
          bottom: "1.5em",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          border: "0.05em solid rgba(255, 255, 255, 1)",
          color: "rgba(255, 255, 255, 1)",
          boxShadow: "0.15em 0.15em 0.5em rgba(0, 0, 0, 1)",
        },
      },
    },
  };

  console.log(contributions);

  return (
    <main style={styles.body}>
      <h1>GitHub Contributions Chart I</h1>
      <label>
        <input type="checkbox" id="Toggle" /> Change fill
      </label>
      <br />
      <label>
        <input type="checkbox" id="Embiggen" /> Make bigger
      </label>
      <br />
      <label>
        <input type="checkbox" id="Borderize" /> Add Borders
      </label>
      {contributions}

      <div role="region" aria-labelledby="Cap1" tabIndex={0} style={styles.region}>
        <table style={styles.table}>
          <caption id="Cap1" style={styles.caption}>
            {contributions.total} contributions in {contributions.year}
          </caption>
          <thead>
            <tr>
              <th rowSpan={2} scope="col" id="w" style={styles.th}>
                <span>Weekday</span>
              </th>
              <th colSpan={49} id="y17" style={styles.th}>
                <span>{contributions.year}</span>
              </th>
              <th colSpan={4} id="y18" style={styles.th}>
                <span>{contributions.year + 1}</span>
              </th>
            </tr>
            <tr>
              {contributions.months.map((month, index) => (
                <th key={index} colSpan={month.days.length} headers={`y17`} id={`${month.name}17`} style={styles.th}>
                  <span aria-hidden="true">{month.name}</span>
                  <span className="sronly">{month.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, dayIndex) => (
              <tr key={dayIndex}>
                <th scope="row" id={day} style={styles.th}>
                  <span className="sronly">{day}</span>
                </th>
                {contributions.months.map((month, monthIndex) =>
                  month.days.map((dayData, dayDataIndex) => (
                    <td key={`${monthIndex}-${dayDataIndex}`} headers={`${month.name}17 y17 ${day}`} style={styles.td}>
                      {dayData.count > 0 ? (
                        <a
                          href="#"
                          aria-label={`${dayData.count} contributions on ${month.name} ${dayData.day}, ${contributions.year}`}
                          style={{
                            ...styles.tdLink,
                            ...styles.levels[`amt${String.fromCharCode(97 + Math.min(dayData.count, 3))}`],
                          }}
                        >
                          <span>{dayData.count} contributions, {dayData.day}</span>
                        </a>
                      ) : (
                        <span style={styles.tdAfter}></span>
                      )}
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <a href="http://adrianroselli.com/2018/02/github-contributions-chart.html">Read the blog post behind this</a>.
      </p>
    </main>
  );
}