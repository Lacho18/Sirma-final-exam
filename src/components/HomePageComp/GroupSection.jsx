export default function GroupSection({ groupData }) {
  return (
    <div className="group-section-main-div">
      <p style={{ fontSize: "1.5em", padding: "5px" }}>
        Group {groupData.group}
      </p>
      <div>
        {groupData.teams.map((indexValue, index) => (
          <div key={indexValue.ID} className="group-section-line">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "50%",
              }}
            >
              <p>{index + 1}</p>
              <img src={indexValue.Image} alt="null" />
              <p>{indexValue.Name}</p>
            </div>
            <p>
              Manager:{" "}
              <span style={{ fontStyle: "italic" }}>
                {indexValue.ManagerFullName}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
