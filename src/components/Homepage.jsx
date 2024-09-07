import { useContext } from "react";
import { FilesContext } from "../context/FilesContext";

export default function HomePage() {
  const filesData = useContext(FilesContext);

  console.log(filesData);

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
}
