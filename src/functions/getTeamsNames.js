function getTeamsNames(matches, filesData) {
    if (matches.length === 0) {
        return { error: "Invalid parameters" };
    }
    if (!Array.isArray(matches)) {
        return { error: "Invalid parameters" };
    }

    try {
        //Gets file data for the teams
        let teams = filesData.find(
            (indexValue) => indexValue.dataType === "teams"
        );

        if (teams === undefined) {
            setError({ error: "No teams found" });
            return { error: "No teams found" };
        }

        let structuredMatches = matches.map((match) => {
            //Finds the name of Team A
            let teamA = teams.data.find(
                (indexValue) => indexValue.ID === match.ATeamID
            );
            //Finds the name of Team B
            let teamB = teams.data.find(
                (indexValue) => indexValue.ID === match.BTeamID
            );

            let result = match.Score.split("-");
            let winner = result[0] > result[1] ? teamA.Name : result[0] === result[1] ? "Draw" : teamB.Name;

            if (teamA && teamB) {
                return {
                    ...match,
                    teamAName: teamA.Name,
                    teamAImage: teamA.Image,
                    teamBName: teamB.Name,
                    teamBImage: teamB.Image,
                    winner,
                };
            } else {
                return {
                    ...match,
                    teamAName: "",
                    teamBName: "",
                    teamAImage: "",
                    teamBAImage: "",
                    winner: "",
                };
            }
        });

        if (structuredMatches.length !== 0) {
            return structuredMatches;
        } else {
            return { error: "Invalid parameters" };
        }
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

export default getTeamsNames;