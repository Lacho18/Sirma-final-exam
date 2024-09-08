import { useEffect, useState } from "react"

async function readFile(path) {
    let file = await fetch(path);
    let text = await file.text();

    //Used to find all \r escape sequences in the file 
    let regex = /\r/g;

    //Splits the text on every new line and removes every \r symbol
    let fileRows = text.trim().replace(/\r/g, '').split('\n');

    //Removes the first line of the file, where are the column names and set them to a variable
    //Replace method removes the \r symbol which appeared in every last column name
    let columnNames = fileRows.shift().replace('\r', "").split(',');

    //For every line slits the data by ',' and insert it in object structure, with keys equal to the names of the column
    let allData = fileRows.map(fileRow => {
        let row = fileRow.split(',');

        let objStructure = {};

        row.forEach((columnData, index) => {
            objStructure[columnNames[index]] = columnData;
        });

        return objStructure;
    });

    return allData;
}

const useReadFiles = (filePaths) => {
    const [filesData, setFilesData] = useState([]);

    useEffect(() => {
        async function useEffectFunction() {
            //Every function in map is async. Promise.all() resolves all promises and returns result after every map function has completed
            const data = await Promise.all(
                filePaths.map(async (filePath) => {
                    if (!filePath.includes('.csv')) return { error: "The file should be .csv format!" };

                    let fileType = filePath.slice(filePath.lastIndexOf('/') + 1, filePath.indexOf('.'));

                    let object = {
                        dataType: fileType,
                        data: []
                    }

                    object.data = await readFile(filePath);

                    return object;
                }));

            setFilesData(data);
        }

        useEffectFunction();
    }, []);

    console.log(filesData);

    return filesData;
}

export default useReadFiles;