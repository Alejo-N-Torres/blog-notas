import { useEffect } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { useNotasStore } from "../store/notasStore";

import ItemNota from "./item_nota";

const ListaNotas: React.FC = () => {
  const setNombresNotas = useNotasStore((state) => state.setNombresNotas);
  const NombresNotas = useNotasStore((state) => state.NombresNotas);

  useEffect(() => {
    async function cargarArchivos() {
      const documentPath = await documentDir();
      const resultado = await readDir(`${documentPath}/FilesNotas`);
      const filesNames = resultado.map((file) => file.name!);
      console.log(filesNames);
      const notasnames = filesNames.filter(
        (nombreNota) => nombreNota !== "styles"
      );
      setNombresNotas(notasnames);
    }
    cargarArchivos();
    console.log(NombresNotas);
  }, [setNombresNotas]);
  return (
    <div>
      {NombresNotas.map((nombreNota) => (
        <div key={nombreNota}>
          <ItemNota tituloNota={nombreNota} />
        </div>
      ))}
    </div>
  );
};

export default ListaNotas;
